"use client";

import React, {
  useState,
  RefObject,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import {
  PanelLeftOpen,
  PanelRightOpen,
  Search,
  X,
} from "lucide-react";
import useSWR from "swr";
import {
  fetchConversations,
  deleteConversation,
} from "@/lib/helpers/axios/conversationApi";
import { updateMessages } from "@/lib/helpers/updateMessages";
import { Message, Conversation } from "@/types/message";
import { formatTime } from "@/lib/helpers/formatTime";
import { User } from '@/types/User'

const SIDEBAR_WIDTH = 300;
const HANDLE_WIDTH = 70;

type ChatHistoryProps = {
  reset: () => void;
  mutateConversations: () => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setConversationId: Dispatch<SetStateAction<string | null>>;
  user: User
};

export default function ChatHistory({
  reset,
  mutateConversations,
  textareaRef,
  setMessages,
  setConversationId,
  user,
}: ChatHistoryProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const userId = user?.userId; // cleaner

  /* ------------------------------- data -------------------------------- */
  const { data: conversations = [], error, isLoading } = useSWR<Conversation[]>(
    userId ? `/api/conversations?userId=${userId}` : null,
    () => userId ? fetchConversations(userId) : Promise.resolve([]),
  );

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const handleNewChat = () => {
    reset();
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, 100);
  };

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      await deleteConversation(conversationId);
      mutateConversations();
    } catch (err) {
      console.error("Failed to delete conversation:", err);
    }
  };

  /* ------------------------------- UI ---------------------------------- */
  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-dvh flex-col ${isCollapsed ? "bg-transparent" : "bg-gray-100"} transition-width duration-300`}
      style={{ width: isCollapsed ? HANDLE_WIDTH : SIDEBAR_WIDTH }}
    >
      {/* Header */}
      <div className="mt-16 flex flex-row items-center justify-between p-4">
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1 hover:bg-zinc-200 cursor-pointer"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-5 w-6 text-zinc-600" strokeWidth={1.5} />
          ) : (
            <PanelRightOpen className="h-5 w-6 font-mono text-zinc-600" strokeWidth={1.5} />
          )}
        </button>

        {!isCollapsed && (
          <button className="rounded-md p-1 hover:bg-zinc-200 cursor-pointer">
            <Search className="size-5 text-zinc-600" strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* New Chat Button */}
      {!isCollapsed && (
        <button
          onClick={handleNewChat}
          className="mx-3 rounded-md bg-white px-3 py-2 text-center text-sm font-light shadow-xs hover:bg-gray-50 cursor-pointer"
        >
          <div>
            <span>+</span> New task
          </div>
        </button>
      )}

      {/* Conversations */}
      {!isCollapsed && (
        <div className="my-2 flex-1 overflow-y-auto p-3">
          {/* 🛠 Added check for user loading */}
          {!user ? (
            <div className="flex h-full items-center justify-center text-sm text-zinc-400">
              Loading user info...
            </div>
          ) : isLoading ? (
            <div className="flex h-full items-center justify-center text-sm text-zinc-400">
              Loading conversations...
            </div>
          ) : error ? (
            <div className="flex h-full items-center justify-center text-sm text-red-400">
              Failed to load conversations
            </div>
          ) : conversations?.length === 0 ? (
            <div className="mt-4 text-center text-sm text-zinc-400">
              No conversations yet.
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className="flex w-full items-center justify-between truncate rounded-lg px-2 py-2 text-sm font-light transition hover:bg-gray-200 cursor-pointer"
              >
                <div
                  onClick={async () => {
                    await updateMessages(
                      conv.id,
                      setMessages,
                      setConversationId,
                      textareaRef,
                    );
                  }}
                  className="flex flex-1 cursor-pointer flex-col truncate text-left"
                >
                  <div className="truncate font-medium cursor-pointer">
                    {conv.title || "Untitled"}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {formatTime(conv.updatedAt)}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteConversation(conv.id)}
                  className="ml-2 cursor-pointer text-zinc-400 transition hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </aside>
  );
}
