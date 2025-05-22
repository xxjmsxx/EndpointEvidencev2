// Not needed anymore -> to keep for reference

import { Message } from '@/types/message';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import {callKnowledgeGraphMicroservice} from "./kgMicroservice"

export async function queryDatabase({ messages }: {
  messages: Message[],
}): Promise<Response> {
  try {

    // needed for KG microservice
    const lastMessage = messages[messages.length - 1]
    const queryRequest = {
      query: lastMessage.content
    }

    const queryResult = await callKnowledgeGraphMicroservice(queryRequest)
    console.log('🧠 Knowledge Graph says:', queryResult)

    const result = await streamText({
      model: openai('gpt-4o'),
      system: `You are a clinical assistant helping doctors make better decisions.
      Use this structured knowledge graph insight to inform your answer:

      "${queryResult.answer.answer}"

      Respond clearly, empathetically, and with markdown formatting (e.g., bolded terms, bullet points).`,
      messages: messages.slice(-4),
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
