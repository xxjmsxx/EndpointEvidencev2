// Not needed anymore -> to keep for reference

import { Message } from "@/types/message"
import { TypeClassificationSchema, classificationSchema, picotSchema } from "@/types/classificationSchema"
import { openai } from '@ai-sdk/openai';
import { streamText, generateObject, generateText } from 'ai';
import { sanitizeHeaderValue } from '@/utils/querySanitizer'

const fieldHints: Record<string, string> = {
  population: "Include age range, disease or condition, setting (e.g., inpatient, outpatient), and location if relevant.",
  intervention: "Include treatment name, dosage, frequency, duration, or procedure type.",
  control: "Specify the comparison (e.g., placebo, standard of care, no intervention).",
  outcome: "Describe the clinical or measurable outcome (e.g., mortality rate, hospital readmission, symptom improvement).",
  timeframe: "Indicate how long the outcome will be measured (e.g., 30 days, 6 months, 1 year)."
};

export async function handlePicotFlow({ messages, picotState }: {
  messages: Message[],
  picotState: TypeClassificationSchema
}): Promise<Response> {

  try {

    // 1. Initialize state
    let currentState = picotState
    const lastMessage = messages[messages.length - 1];

    // 2. Force JSON response
    const {object: validatedData} = await generateObject({
      model: openai("gpt-4o-mini"),
      system:
      `You are an ex-clinician turned researcher in the medical domain.
      You know how to structure research questions in PICOT format and what information
      are critically needed for a good formulation of a question`,

      prompt:
      `This is the current PICOT state:
      ${JSON.stringify(currentState, null, 2)}

      Here is the recent conversation:
      ${messages.slice(-3).map(m => `${m.role}: ${m.content}`).join('\n')}

      Now classify the following message into the PICOT format:
      ${lastMessage.role}: ${lastMessage.content}`,

      schema:
      classificationSchema,
    });

    // 3. Update state
    const fullExtracted = {
      ...currentState.extracted,
      ...Object.fromEntries(
        Object.entries(validatedData.extracted)
          .filter(([, v]) => v?.trim())
      )
    };

    const missingFields = Object.keys(picotSchema.shape).filter(
      (field) => !fullExtracted[field as keyof typeof fullExtracted]
    ) as TypeClassificationSchema["missingFields"];

    currentState = {
      extracted: fullExtracted,
      missingFields
    };

    const nextField = currentState.missingFields[0];

    // 5. Generate guarded response only if needed
    let response: Response;

    if (nextField) {
      const result = await streamText({
        model: openai('gpt-4o'),
        system: `You are a clinical research assistant helping extract PICOT (Population, Intervention, Control, Outcome, Timeframe) information from a user.

        RULES:
        - ONLY ask about this missing field: "${nextField || 'NOTHING'}"
        - Ask for relevant details related to that PICOT component (see hint below).
        - NEVER ask about more than one field at a time.
        - NEVER say more than one sentence.
        - DO NOT mention the words "PICOT", "JSON", "structure", or anything technical.
        - If all 5 PICOT fields are already filled, do not respond anything.

        Already known:
        ${JSON.stringify(currentState.extracted, null, 2)}

        HINT for what to ask about:
        ${fieldHints[nextField]}`,
        messages
      });

      response = result.toDataStreamResponse();
    } else {
      response = new Response(null, { status: 200 });
    }

    // Safe string for headers
    const sanitizedExtracted = sanitizeHeaderValue(JSON.stringify(currentState.extracted));
    response.headers.set('X-PICOT-Data', sanitizedExtracted);

    if (nextField) {
      response.headers.set('X-PICOT-Next', nextField);
    }

    if (currentState.missingFields.length === 0) {
      response.headers.set('X-PICOT-Complete', 'true');
      response.headers.set("X-PICOT-State", sanitizeHeaderValue(JSON.stringify(currentState)));

      // Step 6: Generate natural language research question from full PICOT
      const { text: naturalQuestion } = await generateText({
        model: openai("gpt-4o"),
        system: `You are a medical researcher generating clear, concise clinical research questions from fully completed PICOT data.`,
        prompt: `Given the following structured PICOT data, write the complete research question in one natural sentence:

        ${JSON.stringify(currentState.extracted, null, 2)}

        Start your sentence directly — do not say "This is a PICOT question".`
        });

        response.headers.set("X-PICOT-Question", sanitizeHeaderValue(naturalQuestion));
    }
    console.log("check the response for the picot flow💸", response)
    return response;

  } catch (error) {
    console.error('PICOT Processing Error❗️❗️💥:', error);
    return new Response(JSON.stringify({
      error: 'Failed to process medical query',
      details: error instanceof Error ? error.message : 'Invalid response format'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
