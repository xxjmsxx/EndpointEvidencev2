// Not needed anymore -> to keep for reference

import { Message } from '@/types/message';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function clinicalAssistant({ messages }: {
  messages: Message[],
}): Promise<Response> {
  try {
      const result = await streamText({
      model: openai('gpt-4o'),
      system: `You are a clinical assistant helping doctors make better decisions,
                especially in managing patients (e.g., treatments, diagnostics, symptom analysis).
                Provide thoughtful, medically sound, and empathetic responses.
                Answer clearly and **use markdown** to structure lists, bold keywords, titles, and organize your responses.`,
      messages: messages.slice(-5),
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('🩺 Clinical Assistant Error:', error);

    return new Response(JSON.stringify({
      error: 'Clinical assistant failed to generate a response',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
