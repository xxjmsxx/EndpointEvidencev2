// src/hooks/useResearchChat.ts
import { useState, useRef, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  name?: string;
  timer?: number | null;
  createdAt: string | Date;
}

interface UseResearchChatProps {
  bernusApiUrl: string; // Bernus v3 API URL
  onResponse?: (response: Response) => void;
  onFinish?: (message: Message) => void;
  onError?: (error: Error) => void;
}

interface ChatState {
  messages: Message[];
  input: string;
  status: "ready" | "streaming" | "submitted" | "error";
  error: Error | null;
  isLoading: boolean;
}

export function useResearchChat({
  bernusApiUrl,
  onResponse,
  onFinish,
  onError,
}: UseResearchChatProps) {
  const { user } = useAuth();
  const [state, setState] = useState<ChatState>({
    messages: [],
    input: "",
    status: "ready",
    error: null,
    isLoading: false,
  });

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setState((prev) => ({ ...prev, input: e.target.value }));
    },
    []
  );

  const append = useCallback(
    async (message: { role: "user" | "assistant"; content: string }) => {
      const newMessage: Message = {
        id: uuidv4(),
        role: message.role,
        content: message.content,
        createdAt: new Date().toISOString(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        status: "submitted",
        isLoading: true,
      }));

      if (message.role === "user" && message.content.trim()) {
        await startResearch(message.content, newMessage);
      }
    },
    [conversationId]
  );

  const startResearch = async (query: string, userMessage: Message) => {
    try {
      setState((prev) => ({ ...prev, status: "streaming", error: null }));

      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      // Start research process with Bernus v3
      const researchResponse = await axios.post(
        `${bernusApiUrl}/api/v1/research`,
        {
          query,
          user_id: user.id,
          conversation_id: conversationId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { conversation_id, streaming_id } = researchResponse.data;

      // Update conversation ID if new one was created
      if (conversation_id !== "pending") {
        setConversationId(conversation_id);
      }
      setStreamingId(streaming_id);

      // Connect to Bernus v3 streaming endpoint
      const eventSource = new EventSource(
        `${bernusApiUrl}/api/v1/research/stream/${streaming_id}?user_id=${user.id}`
      );

      eventSourceRef.current = eventSource;

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case "connected":
              console.log("Connected to Bernus research stream");
              break;

            case "status":
              // General status updates
              const statusMessage: Message = {
                id: uuidv4(),
                role: "assistant",
                content: `🔄 ${data.content}`,
                createdAt: new Date().toISOString(),
              };

              setState((prev) => ({
                ...prev,
                messages: [...prev.messages, statusMessage],
              }));
              break;

            case "planning":
              // Research planning updates
              const planningMessage: Message = {
                id: uuidv4(),
                role: "assistant",
                content: `📋 ${data.content}`,
                createdAt: new Date().toISOString(),
              };

              setState((prev) => ({
                ...prev,
                messages: [...prev.messages, planningMessage],
              }));
              break;

            case "plan":
              // Research plan created
              const planMessage: Message = {
                id: uuidv4(),
                role: "assistant",
                content: data.content,
                createdAt: new Date().toISOString(),
              };

              setState((prev) => ({
                ...prev,
                messages: [...prev.messages, planMessage],
              }));

              // Trigger custom headers for frontend logic
              if (onResponse) {
                const mockResponse = new Response(null, {
                  headers: {
                    "X-Tool-Name": "Research Planning",
                    "X-Auto-Timer": "3000",
                  },
                });
                onResponse(mockResponse);
              }
              break;

            case "searching":
              // Literature search in progress
              const searchingMessage: Message = {
                id: uuidv4(),
                role: "assistant",
                content: `🔍 ${data.content}`,
                createdAt: new Date().toISOString(),
              };

              setState((prev) => ({
                ...prev,
                messages: [...prev.messages, searchingMessage],
              }));
              break;

            case "search_results":
              // Search results received
              const searchMessage: Message = {
                id: uuidv4(),
                role: "system",
                name: "tool-call",
                content: "PubMed Literature Search",
                timer: 3000,
                createdAt: new Date().toISOString(),
              };

              setState((prev) => ({
                ...prev,
                messages: [...prev.messages, searchMessage],
              }));

              // Add results summary message
              const resultsMessage: Message = {
                id: uuidv4(),
                role: "assistant",
                content: `📚 Found ${
                  data.results_count || 0
                } relevant research articles`,
                createdAt: new Date().toISOString(),
              };

              setState((prev) => ({
                ...prev,
                messages: [...prev.messages, resultsMessage],
              }));
              break;

            case "analyzing":
              // Analysis in progress
              const analyzingMessage: Message = {
                id: uuidv4(),
                role: "assistant",
                content: `🧠 ${data.content}`,
                createdAt: new Date().toISOString(),
              };

              setState((prev) => ({
                ...prev,
                messages: [...prev.messages, analyzingMessage],
              }));
              break;

            case "analysis":
              // Analysis results
              const analysisMessage: Message = {
                id: uuidv4(),
                role: "assistant",
                content: data.content,
                createdAt: new Date().toISOString(),
              };

              setState((prev) => ({
                ...prev,
                messages: [...prev.messages, analysisMessage],
              }));
              break;

            case "step":
              // Research step progress
              const stepMessage: Message = {
                id: uuidv4(),
                role: "assistant",
                content: `📈 Step ${(data.step_index || 0) + 1}: ${
                  data.content
                }`,
                createdAt: new Date().toISOString(),
              };

              setState((prev) => ({
                ...prev,
                messages: [...prev.messages, stepMessage],
              }));
              break;

            case "report":
              // Final research report
              const reportMessage: Message = {
                id: uuidv4(),
                role: "assistant",
                content: data.content,
                createdAt: new Date().toISOString(),
              };

              setState((prev) => ({
                ...prev,
                messages: [...prev.messages, reportMessage],
              }));

              // Add report complete system message
              const reportCompleteMessage: Message = {
                id: uuidv4(),
                role: "system",
                name: "report-complete",
                content: "Research completed successfully",
                createdAt: new Date().toISOString(),
              };

              setState((prev) => ({
                ...prev,
                messages: [...prev.messages, reportCompleteMessage],
                status: "ready",
                isLoading: false,
              }));

              if (onFinish) {
                onFinish(reportMessage);
              }
              break;

            case "complete":
            case "done":
              setState((prev) => ({
                ...prev,
                status: "ready",
                isLoading: false,
              }));
              eventSource.close();
              break;

            case "error":
              throw new Error(data.content || "Research failed");

            default:
              console.log("Unknown event type:", data.type, data);
          }
        } catch (parseError) {
          console.error("Error parsing SSE data:", parseError);
        }
      };

      eventSource.onerror = (error) => {
        console.error("EventSource error:", error);
        setState((prev) => ({
          ...prev,
          status: "error",
          error: new Error("Streaming connection failed"),
          isLoading: false,
        }));
        eventSource.close();

        if (onError) {
          onError(new Error("Streaming connection failed"));
        }
      };
    } catch (error) {
      console.error("Error starting research:", error);
      setState((prev) => ({
        ...prev,
        status: "error",
        error: error as Error,
        isLoading: false,
      }));

      if (onError) {
        onError(error as Error);
      }
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!state.input.trim() || state.status !== "ready") return;

      const userMessage: Message = {
        id: uuidv4(),
        role: "user",
        content: state.input,
        createdAt: new Date().toISOString(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        input: "",
        status: "submitted",
        isLoading: true,
      }));

      await startResearch(state.input, userMessage);
    },
    [state.input, state.status, conversationId]
  );

  const setMessages = useCallback(
    (messages: Message[] | ((prev: Message[]) => Message[])) => {
      setState((prev) => ({
        ...prev,
        messages:
          typeof messages === "function" ? messages(prev.messages) : messages,
      }));
    },
    []
  );

  const reload = useCallback(() => {
    // Close existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // Reset state
    setState((prev) => ({
      ...prev,
      status: "ready",
      error: null,
      isLoading: false,
    }));

    // Retry last user message
    const lastUserMessage = state.messages
      .filter((m) => m.role === "user")
      .pop();
    if (lastUserMessage) {
      startResearch(lastUserMessage.content, lastUserMessage);
    }
  }, [state.messages]);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  return {
    messages: state.messages,
    input: state.input,
    handleInputChange,
    handleSubmit,
    status: state.status,
    error: state.error,
    reload,
    isLoading: state.isLoading,
    setMessages,
    append,
    conversationId,
    cleanup,
  };
}
