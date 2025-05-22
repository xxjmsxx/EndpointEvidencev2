import axios from 'axios';
import { prisma } from '@/lib/prisma';
import { Message } from '@/types/message';

/* =============== FRONTEND (Axios) =================== */

/* Create a new conversation via API */
//SHOW ALL
export async function fetchConversations(userId: string) {
  try {
    const res = await axios.get(`/api/conversations?userId=${userId}`)
    return res.data
  } catch (error) {
    handleError(error, 'fetchConversations');
    throw error;
  }
}

//SHOW BY ID
export async function fetchConversationById(conversationId: string) {
  try {
    const res = await axios.get(`/api/conversations/${conversationId}`);
    return res.data.messages

  } catch (error) {
    handleError(error, 'fetchConversationById');
    throw error;
  }
}

// CREATE
export async function createConversationAPI(userId: string, firstMessage: Message): Promise<string> {
  try {
    const res = await axios.post('/api/conversations', {
      userId,
      firstMessage,
    });
    return res.data.conversationId as string;
  } catch (error) {
    handleError(error, 'createConversationAPI');
    throw error;
  }
}

// UPDATE WITH MESSAGES
export async function addMessageToConversationAPI(conversationId: string, message: Message): Promise<void> {
  try {
    await axios.patch(`/api/conversations/${conversationId}`, {
      message
    });
  } catch (error) {
    handleError(error, 'addMessageToConversationAPI');
    throw error;
  }
}

// DELETE BY ID
export async function deleteConversation(conversationId: string): Promise <void> {
  try {
    await axios.delete(`/api/conversations/${conversationId}`,)
  } catch (error) {
    handleError(error, 'deleteConversation')
  }
}

/* =============== BACKEND (Prisma) =================== */

/* Create a new conversation directly */
export async function createConversationDB(userId: string, message: Message) {
  try {
    return await prisma.conversation.create({
      data: {
        userId,
        title: message.content.slice(0, 50) || 'New Conversation',
        messages: {
          create: {
            id: message.id,
            role: message.role,
            content: message.content,
            createdAt: message.createdAt ? new Date(message.createdAt) : undefined,
          },
        },
      },
      include: { messages: true },
    });
  } catch (error) {
    handleError(error, 'createConversationDB');
    throw error;
  }
}

/* Add a message to conversation directly */
export async function addMessageToConversationDB(conversationId: string, message: Message) {
  try {
    return await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        updatedAt: new Date(),
        messages: {
          create: {
            role: message.role,
            content: message.content,
            createdAt: message.createdAt ? new Date(message.createdAt) : new Date(),
          },
        },
      },
    });
  } catch (error) {
    handleError(error, 'addMessageToConversationDB');
    throw error;
  }
}

/* =============== Error handling =================== */

function handleError(error: unknown, context: string) {
  console.error(`❌ ${context} failed:`, error);
  throw error;
}
