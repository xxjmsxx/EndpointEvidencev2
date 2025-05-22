import { useEffect, useRef, useState } from 'react';

export function useChatUX({mode, messages, status, isLoading}) {
  const [hasStarted, setHasStarted] = useState(false);
  const [layoutReady, setLayoutReady] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const lastMessageRef = useRef(null);
  const hasStartedRef = useRef(false);
  const textareaRef = useRef(null)

  // ✅ Detect user start
  useEffect(() => {
    if (!hasStartedRef.current && messages.some((msg) => msg.role === 'user')) {
      hasStartedRef.current = true;
      setHasStarted(true);
    }
  }, [messages]);

  // ✅ Trigger layout-ready animation
  useEffect(() => {
    if (hasStarted) {

      const timeout = setTimeout(() => setLayoutReady(true), 400);
      return () => clearTimeout(timeout);
    }
  }, [hasStarted]);

  // ✅ Scroll to last message after animation
  // to fix -> it renders constantly during streaming
  useEffect(() => {
      if (layoutReady && lastMessageRef.current) {

        const timeout = setTimeout(() => {
          const el = lastMessageRef.current;

          if (!el) return;

          const container = el.closest('.overflow-y-scroll');
          if (el && container) {
            const offset = 80;
            container.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
          }
        }, 300);
        return () => clearTimeout(timeout);
      }

  }, [messages, layoutReady]);

  // ✅ Focus textarea on assistant follow-up
  useEffect(() => {
    if (mode === 'rwe report generation') {

      if (!isLoading && messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.role === 'assistant' && lastMessage.metadata?.missingField) {
          document.querySelector('textarea')?.focus();
        }
      }
    }
  }, [isLoading, messages]);

  // ✅ Track streaming message
  useEffect(() => {
    if (status === 'streaming' && messages.length > 0) {

      const latestId = messages[messages.length - 1].id;
      if (streamingMessageId !== latestId) {
        setStreamingMessageId(latestId);
      }
    }

    if (status !== 'streaming' && streamingMessageId !== null) {
      setStreamingMessageId(null);
    }
  }, [messages, status]);

  function resetChatUX() {
    setHasStarted(false);
    setLayoutReady(false);
    hasStartedRef.current = false;
  }

  return {
    hasStarted,
    layoutReady,
    lastMessageRef,
    streamingMessageId,
    resetChatUX,
    textareaRef,
  };
}
