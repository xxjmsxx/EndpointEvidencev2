// src/app/(main)/rwe-chat/page.tsx - Updated for Bernus v3
"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  RefObject,
} from "react";
import { useChatUX } from "@/hooks/useChatUx";
import { useCurrentUser } from "@/components/UI AI/User";
import { useResearchChat } from "@/hooks/useResearchChat";

// Components
import InputField from "@/components/UI AI/InputField";
import ChatHistory from "@/components/ChatHistory/ChatHistory";
import Messages from "@/components/Messages/Messages";
import EndpointMonitor from "@/components/UI AI/EndpointMonitor";

// Conversations logic
import { useConversationReset } from "@/hooks/useConversationReset";
import useSWR from "swr";
import { fetchConversations } from "@/lib/helpers/axios/conversationApi";

// For fake comparative analysis demo
import { fakeSteps } from "@/lib/comparativeAnalysis/monitorSteps";

// Types
import { User } from "@/types/User";
import { Message } from "@/types/message";
import { Plus } from "@/types/plus";

// Configuration - Bernus v3 API
const BERNUS_API_URL =
  process.env.NEXT_PUBLIC_BERNUS_API_URL || "http://localhost:8000";

export default function Chat() {
  // ================ Retrieve user info and SWR for convs history =================
  const user: User | null = useCurrentUser();
  const userId = user?.userId;
  const { mutate: mutateConversations } = useSWR(
    () => (userId ? `/api/conversations?userId=${userId}` : null),
    () => fetchConversations(userId!)
  );
  // ===============================================================================

  const [toolCall, setToolCall] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // conv history WIP
  const [conversationId, setConversationId] = useState<string | null>(null);
  const convIdRef = useRef<string | null>(null);

  // Added state to track if the canvas is open (work in progress)
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);

  // Handle modes for assistant
  const [mode, setMode] = useState("cohort study");

  // For fake comparative analysis demo
  const autoContinueRef = useRef(false);
  const toolTimerRef = useRef(2000);
  const toolNameRef = useRef<string | null>(null);
  const flowCompleteRef = useRef(false);
  const [plus, setPlus] = useState<Plus>("lung-cancer");

  // Use Bernus v3 research chat hook
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error,
    reload,
    isLoading,
    setMessages,
    append,
    conversationId: chatConversationId,
    cleanup,
  } = useResearchChat({
    bernusApiUrl: BERNUS_API_URL,
    onResponse(response) {
      // Handle custom headers from Bernus v3
      const toolName = response.headers.get("X-Tool-Name");
      const toolTimer = response.headers.get("X-Auto-Timer");
      const autoContinue = response.headers.get("X-Auto-Continue");
      const flowComplete = response.headers.get("X-End-Of-Stream");

      if (toolName) {
        toolNameRef.current = toolName;
      }
      if (toolTimer) {
        toolTimerRef.current = parseInt(toolTimer) || 2000;
      }
      if (autoContinue === "true") {
        autoContinueRef.current = true;
      }
      if (flowComplete) {
        flowCompleteRef.current = true;
      }
    },
    onFinish(message) {
      // Handle research completion
      if (toolNameRef.current) {
        setToolCall(toolNameRef.current);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `tool-call-${Date.now()}`,
              role: "system",
              name: "tool-call",
              content: `${toolNameRef.current}`,
              timer: toolTimerRef.current,
              createdAt: new Date().toISOString(),
            },
          ]);
          toolNameRef.current = null;
        }, 1000);
      }

      if (autoContinueRef.current) {
        setTimeout(() => {
          append({
            role: "user",
            content: "",
          });
        }, 2000);
      }

      if (flowCompleteRef.current) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: `report-complete-${Date.now()}`,
            role: "system",
            name: "report-complete",
            content: "Research completed successfully",
            createdAt: new Date().toISOString(),
          },
        ]);
      }

      // Update conversation ID from chat - This now comes from EndpointEvidence Prisma DB
      if (chatConversationId && chatConversationId !== conversationId) {
        setConversationId(chatConversationId);
        mutateConversations(); // Refresh conversation list
      }
    },
    onError(error) {
      console.error("Bernus research chat error:", error);
    },
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // Prevent empty or whitespace-only submits
  const customHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await handleSubmit(e);
  };

  // Debug
  if (error) {
    console.log("Bernus research chat error:", error);
  }

  // hook for managing layout and UX
  const { hasStarted, layoutReady, lastMessageRef, resetChatUX, textareaRef } =
    useChatUX({ mode, messages, status, isLoading });

  // hook to reset conv
  const { reset } = useConversationReset({
    setConversationId,
    convIdRef,
    setMessages: setMessages as unknown as (
      messages: Message[] | ((messages: Message[]) => Message[])
    ) => void,
    setIsCanvasOpen,
    setMode,
    setPlus,
    resetChatUX,
  });

  // For fake comparative analysis demo
  const [loadingStatus, setLoadingStatus] = useState({});
  const handleToolDoneLoading = useCallback(
    (toolName: string) => {
      setLoadingStatus((prev) => ({ ...prev, [toolName]: true }));
      append({
        role: "user",
        content: "", // simulate user follow-up after tool is done
      });
    },
    [append]
  );

  // For fake comparative analysis demo -> To control the opening of the monitor
  useEffect(() => {
    if (!toolCall) return;

    // Open monitor if closed
    if (!isCanvasOpen) {
      setIsCanvasOpen(true);
    }

    // Normalize and find matching step
    const normalized = toolCall.trim().toLowerCase();
    const matchIndex = fakeSteps.findIndex(
      (step) => step.title.trim().toLowerCase() === normalized
    );

    if (matchIndex !== -1) {
      setCurrentStep(matchIndex);
    }
  }, [toolCall, isCanvasOpen]);

  return (
    <>
      <ChatHistory
        user={user as User}
        setMessages={
          setMessages as unknown as (
            messages: Message[] | ((messages: Message[]) => Message[])
          ) => void
        }
        setConversationId={setConversationId}
        textareaRef={textareaRef as unknown as RefObject<HTMLTextAreaElement>}
        reset={reset}
        mutateConversations={mutateConversations}
      />

      <div className="flex h-dvh overflow-hidden">
        <div
          className={`flex flex-col transition-all duration-300 ${
            isCanvasOpen ? "w-[50%]" : "w-full"
          }`}
        >
          <Messages
            plus={plus}
            hasStarted={hasStarted}
            layoutReady={layoutReady}
            messages={messages as Message[]}
            lastMessageRef={
              lastMessageRef as unknown as RefObject<HTMLDivElement>
            }
            isCanvasOpen={isCanvasOpen}
            error={error as boolean | undefined}
            reload={reload}
            handleToolDoneLoading={
              handleToolDoneLoading as unknown as () => void
            }
          />

          <InputField
            textareaRef={textareaRef}
            customHandleSubmit={customHandleSubmit}
            isCanvasOpen={isCanvasOpen}
            setIsCanvasOpen={setIsCanvasOpen}
            append={append}
            mode={mode}
            setMode={setMode}
            input={input}
            status={status}
            error={error}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            centered={!hasStarted}
            plus={plus}
            setPlus={setPlus}
          />
        </div>

        {isCanvasOpen && (
          <div className="flex flex-col justify-end w-[50%]">
            <EndpointMonitor
              plus={plus as Plus}
              toolCall={toolCall as string}
              loadingStatus={loadingStatus}
              setLoadingStatus={setLoadingStatus}
              canvasOpen={isCanvasOpen}
              setCanvasOpen={setIsCanvasOpen}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>
        )}
      </div>
    </>
  );
}
