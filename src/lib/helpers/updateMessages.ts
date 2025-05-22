import { RefObject, Dispatch, SetStateAction} from 'react'
import type { Message } from '@/types/message'
import { fetchConversationById } from './axios/conversationApi';

export async function updateMessages(
  conversationId: string,
  setMessages: Dispatch<SetStateAction<Message[]>>,
  setConversationId: Dispatch<SetStateAction<string | null>>,
  textareaRef: RefObject<HTMLTextAreaElement>) {

  try {
    const messages = await fetchConversationById(conversationId)
    setMessages(messages); // 💬 load fetched messages into chat
    setConversationId(conversationId); // 💬 update convId
    textareaRef.current?.focus(); // ✅ focus input again
  } catch (error) {
    console.error('Failed to load conversation:', error);
  }
};
