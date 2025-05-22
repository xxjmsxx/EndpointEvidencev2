import { Message } from '@/types/message';
import { Mode } from '@/types/mode'
import { User } from '@/types/User'
import { comparativeAnalysis } from '@/lib/comparativeAnalysis/comparativeAnalysis'
import { Plus } from '@/types/plus';

// Prisma
import { createConversationDB, addMessageToConversationDB } from '@/lib/helpers/axios/conversationApi';

export async function POST(req: Request) {
  try {
    const { messages, mode, user, conversationId, plus }: {
      messages: Message[],
      mode: Mode,
      user: User,
      conversationId: string | null,
      plus: Plus
    } = await req.json();

    // Create or update conversation with new messages
    const lastUserMessage = messages.filter((m) => m.role === 'user').at(-1);

    if (!lastUserMessage) {
      throw new Error('No user message found.');
    }

    const savedConversation = conversationId
      ? await addMessageToConversationDB(conversationId, lastUserMessage)
      : await createConversationDB(user.userId as string, lastUserMessage);

    console.log(`✅ Conversation ${conversationId ? 'updated' : 'created'}:`, savedConversation.id);

    // Orchestration
    switch (mode) {
      // for fake comparative analysis demo
      case 'cohort study': {
        const response = await comparativeAnalysis({ messages, plus });
        response.headers.set('X-Conversation-Id', savedConversation.id);
        return response;
      }

      default:
        return new Response('Invalid mode specified', { status: 400 });
    }

  } catch (error) {
    console.error('❌ Route handler error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
