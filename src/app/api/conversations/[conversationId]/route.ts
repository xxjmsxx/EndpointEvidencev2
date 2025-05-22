import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type Params = Promise<{ conversationId: string }>

/* ---------- GET --------------------------------------------------------- */
export async function GET(request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params
    const conversationId = params.conversationId

    if (!conversationId) {
      return new NextResponse('Missing conversationId', { status: 400 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: true },
    });

    if (!conversation) {
      return new NextResponse('Conversation not found', { status: 404 });
    }

    return NextResponse.json(conversation);
  } catch (error) {
    console.error('❌ GET conversation error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

/* ---------- PATCH ------------------------------------------------------- */
export async function PATCH(request: Request, segmentData: { params: Params }
) {
  try {
    const params = await segmentData.params
    const conversationId = params.conversationId
    if (!conversationId) {
      return new NextResponse('Missing conversationId', { status: 400 });
    }

    const { message } = await request.json();

    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        updatedAt: new Date(),
        messages: {
          create: {
            id: message.id,
            role: message.role,
            content: message.content,
            createdAt: message.createdAt
              ? new Date(message.createdAt)
              : new Date(),
          },
        },
      },
      include: { messages: true },
    });

    return NextResponse.json(updatedConversation);
  } catch (error) {
    console.error('❌ PATCH conversation error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

/* ---------- DELETE ------------------------------------------------------ */
export async function DELETE(
  request: Request, segmentData: { params: Params }
) {
  try {
    const params = await segmentData.params
    const conversationId = params.conversationId
    if (!conversationId) {
      return new NextResponse('Missing conversationId', { status: 400 });
    }

    await prisma.conversation.delete({ where: { id: conversationId } });
    return new NextResponse('Conversation deleted', { status: 200 });
  } catch (error) {
    console.error('❌ DELETE conversation error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
