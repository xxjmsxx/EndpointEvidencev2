import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId, firstMessage } = await req.json();
    if (!userId || !firstMessage) {
      return new Response('Missing userId or firstMessage', { status: 400 });
    }

    const conversation = await prisma.conversation.create({
      data: {
        userId,
        title: firstMessage.content.slice(0, 50) || 'New Conversation',
        messages: {
          create: {
            id: firstMessage.id,
            role: firstMessage.role,
            content: firstMessage.content,
            createdAt: firstMessage.createdAt ? new Date(firstMessage.createdAt) : undefined,
          },
        },
      },
    });

    return Response.json({ conversationId: conversation.id });
  } catch (error) {
    console.error('POST /api/conversations error:', error);
    return new Response('Server error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // probably to be fixed for vercel deployment
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new Response('Missing userId', { status: 400 });
    }

    const conversations = await prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });

    return Response.json(conversations);
  } catch (error) {
    console.error('GET /api/conversations error:', error);
    return new Response('Server error', { status: 500 });
  }
}
