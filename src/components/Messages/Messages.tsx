import { Message } from "@/types/message";
import { ChunkAnalyzed } from "@/components/Markdown/chunk-analyzed";
import { ToolButton } from "@/components/ToolCall/ToolCall";
import Report from "@/components/UI AI/Report";
import type { Plus } from "@/types/plus";

export default function Messages({
  hasStarted,
  layoutReady,
  messages,
  lastMessageRef,
  isCanvasOpen,
  error,
  plus,
  reload,
  handleToolDoneLoading
}:
{
  hasStarted: boolean;
  plus: Plus;
  layoutReady: boolean;
  messages: Message[];
  lastMessageRef: React.RefObject<HTMLDivElement>;
  isCanvasOpen: boolean;
  error: boolean | undefined;
  reload: () => void;
  handleToolDoneLoading: () => void;
}) {

  const rendered = messages.filter(
    m => !(m.role === "user" && !m.content.trim())
  );

  const renderMessageContent = (message: Message) => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((msg) => msg.role === "user");

    // case #1 - User
    // For fake comparative analysis demo -> && !message.content?.trim() to not show empty user messages
    if (message.role === "user" && !message.content?.trim()) {
      return null;
    } else if (message.role === "user") {
      return (
        <div className="flex flex-col items-end justify-end mb-10">
          <div className="max-w-[80%] bg-zinc-900 p-4 py-3 rounded-4xl text-white font-light">
            {message.content}
          </div>
          {error && lastUserMessage && message.id === lastUserMessage.id && (
            <div className="flex flex-row justify-end gap-2 items-center w-full mt-2 text-right">
              <button
                className="cursor-pointer mt-1 px-2 py-0.5 bg-red-500 text-white rounded hover:bg-red-700 transition"
                type="button"
                onClick={() => reload()}
              >
                An error occurred. Click here to try again
              </button>
            </div>
          )}
        </div>
      );
    }

    // Case #2 - Assistant
    if (message.role === "assistant") {
      return (
        <div className="flex flex-row gap-4 justify-start">

          <div>
            {/* for comparative analysis demo */}
              {/* <ChatIcon /> */}
          </div>


          <div className="w-full flex flex-col gap-2 justify-center font-light text-black">
            <div className="prose space-y-6">
              <ChunkAnalyzed content={message.content} />
            </div>

            {/* {!isThinking && <ChatAssistantOptions />} */}
          </div>
        </div>
      );
    }

    // Case #3 - System
    if (message.role === "system") {
      switch (message.name) {
        case "tool-call":
          return (
            <div className="flex flex-row gap-4 justify-start">
              <div className="invisible pointer-events-none">
                {/* <ChatIcon /> */}
              </div>
              <div className="w-full flex flex-col gap-2 justify-center font-light text-black">
                <div className="prose space-y-6">
                  <ToolButton onDoneLoading={handleToolDoneLoading} timer={message.timer} toolName={message.content} onClick={() => {console.log("tool clicked", message.id, message.content)}} />
                </div>
              </div>
            </div>
          )

        case "report-complete":
          return (
            <div className="flex flex-col gap-5 mb-10">
              {message.name === "report-complete" && (
                <Report plus={plus}/>
              )}
            </div>
          );

        default:
          return null;
      }
    }

    return null;
  };

  return (
    <div
      className={`relative flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-20 ${
        hasStarted ? "pb-60" : ""
      }`}
    >

      {layoutReady &&
      messages
        .filter(m => !(m.role === "user" && !m.content.trim()))
        .map((message, idx) => (
        <div
          key={message.id}
          ref={idx === rendered.length - 1 ? lastMessageRef : null}
          className={`w-full mx-auto ${isCanvasOpen?"max-w-2xl":"max-w-3xl"} px-4 group/message ${
            idx === 0 ? "mt-10" : ""
          }`}

        >
          {renderMessageContent(message)}
        </div>
      ))}

    </div>
  )
}
