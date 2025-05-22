'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, RefObject } from 'react';
import { Message } from '@/types/message';
import { Plus } from '@/types/plus';

export type UseConversationResetProps = {
  setConversationId: Dispatch<SetStateAction<string | null>>;
  convIdRef: RefObject<string | null>;
  setMessages: (messages: Message[] | ((messages: Message[]) => Message[])) => void;
  setIsCanvasOpen: Dispatch<SetStateAction<boolean>>;
  setMode: Dispatch<SetStateAction<string>>;
  setPlus: Dispatch<SetStateAction<Plus>>;
  resetChatUX: () => void;
};

export function useConversationReset({
  setConversationId,
  convIdRef,
  setMessages,
  setIsCanvasOpen,
  setMode,
  setPlus,
  resetChatUX,
}: UseConversationResetProps) {
  const router = useRouter();
  const pathname = usePathname();

  function reset() {
    setConversationId(null);
    convIdRef.current = null;
    setMessages([]);
    setIsCanvasOpen(false);
    setMode('cohort study');
    setPlus('lung-cancer');
    resetChatUX();

    if (pathname !== '/rwe-chat') {
      router.push('/rwe-chat');
    }
  }

  return { reset };
}
