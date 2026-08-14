"use client";

/**
 * Custom floating Shadow comms window with its own messages, avatars, local
 * portfolio navigation mode, and optional server-side Dify connection.
 */

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

interface ShadowChatProps {
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}

interface ShadowChatResponse {
  answer?: unknown;
  conversationId?: unknown;
  error?: unknown;
  mode?: unknown;
}

const initialMessages: ChatMessage[] = [
  {
    id: "shadow-welcome",
    role: "assistant",
    text: "Comms online. Ask me about Hrudai’s missions, technical stack, or availability.",
  },
];

const suggestedQuestions = [
  "Show me the top missions",
  "What is Hrudai’s stack?",
] as const;

function createMessageId(role: ChatMessage["role"]): string {
  return `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Renders the floating custom Shadow conversation interface. */
export default function ShadowChat({ onClose }: ShadowChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draftMessage, setDraftMessage] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [userId, setUserId] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  const [connectionMode, setConnectionMode] = useState<"connecting" | "dify" | "local">("connecting");
  const messageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setUserId(`portfolio-${crypto.randomUUID()}`);
  }, []);

  useEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages, isResponding]);

  const sendMessage = async (message: string) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isResponding) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: createMessageId("user"), role: "user", text: trimmedMessage },
    ]);
    setDraftMessage("");
    setIsResponding(true);

    try {
      const response = await fetch("/api/shadow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedMessage,
          conversationId,
          userId,
        }),
      });
      const payload = (await response.json()) as ShadowChatResponse;
      if (!response.ok || typeof payload.answer !== "string") {
        const errorMessage =
          typeof payload.error === "string"
            ? payload.error
            : "Shadow’s uplink could not complete the transmission.";
        throw new Error(errorMessage);
      }

      if (typeof payload.conversationId === "string") {
        setConversationId(payload.conversationId);
      }
      setConnectionMode(payload.mode === "dify" ? "dify" : "local");
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createMessageId("assistant"),
          role: "assistant",
          text: payload.answer as string,
        },
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createMessageId("assistant"),
          role: "assistant",
          text:
            error instanceof Error
              ? `Uplink error: ${error.message}`
              : "Uplink error: unable to reach Shadow.",
        },
      ]);
    } finally {
      setIsResponding(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(draftMessage);
  };

  return (
    <aside
      id="shadow-chat-panel"
      role="dialog"
      aria-labelledby="shadow-chat-title"
      className="fixed right-[clamp(0.75rem,2vw,1.5rem)] top-[clamp(7rem,20vh,10rem)] z-[70] h-[min(66.666vh,580px)] w-[min(94vw,440px)] animate-[shadowChatArrive_420ms_cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-[2rem] border-[5px] border-[#08080b] bg-[#eee5cf] shadow-[9px_11px_0_#08080b]"
    >
      <div className="flex h-full flex-col p-2.5">
        <header className="flex items-center justify-between rounded-[1.25rem] border-[4px] border-[#08080b] bg-[#c73b2b] px-3 py-2 text-[#fff7df] shadow-[inset_0_-4px_0_#8d241d]">
          <div className="flex min-w-0 items-center gap-2.5">
            <Image
              src="/shadow-robot-avatar.png"
              alt="Shadow space robot"
              width={38}
              height={38}
              className="size-9 rounded-full border-[3px] border-[#08080b] bg-[#17131f]"
              priority
            />
            <div className="min-w-0">
              <h2 id="shadow-chat-title" className="truncate font-mono text-sm font-black tracking-[0.08em]">
                SHADOW COMMS
              </h2>
              <p className="font-mono text-[9px] font-black tracking-[0.12em] text-[#ffe38b]">
                {connectionMode === "dify"
                  ? "AI UPLINK ONLINE"
                  : connectionMode === "local"
                    ? "LOCAL NAV MODE"
                    : "UPLINK STANDBY"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Shadow chat"
            className="grid size-9 place-items-center rounded-full border-[3px] border-[#08080b] bg-[#f2b90b] font-mono text-lg font-black leading-none text-[#08080b] shadow-[2px_3px_0_#08080b] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
          >
            ×
          </button>
        </header>

        <div className="mx-3 flex items-center justify-between border-x-[3px] border-[#08080b] bg-[#272831] px-3 py-1.5 font-mono text-[9px] font-black tracking-[0.16em] text-[#80da22]">
          <span>CHANNEL 07</span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#80da22] shadow-[0_0_7px_#80da22]" aria-hidden="true" />
            SECURE
          </span>
        </div>

        <div
          ref={messageListRef}
          aria-live="polite"
          aria-busy={isResponding}
          className="min-h-0 flex-1 overflow-y-auto rounded-[1.35rem] border-[4px] border-[#08080b] bg-[#15161b] px-3 py-4 shadow-[inset_0_0_0_3px_#343640]"
        >
          <div className="space-y-4">
            {messages.map((message) => {
              const isUserMessage = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${isUserMessage ? "flex-row-reverse" : ""}`}
                >
                  <Image
                    src={
                      isUserMessage
                        ? "/shadow-pilot-avatar.png"
                        : "/shadow-robot-avatar.png"
                    }
                    alt={isUserMessage ? "Visitor space pilot" : "Shadow space robot"}
                    width={40}
                    height={40}
                    className={`size-9 shrink-0 rounded-full border-[3px] border-[#08080b] ${
                      isUserMessage ? "bg-[#0c3c80]" : "bg-[#271638]"
                    }`}
                  />
                  <div
                    className={`max-w-[76%] border-[3px] border-[#08080b] px-3 py-2.5 font-mono text-[12px] font-bold leading-relaxed shadow-[3px_4px_0_#08080b] ${
                      isUserMessage
                        ? "rounded-[1.1rem_1.1rem_0.25rem_1.1rem] bg-[#238dff] text-white"
                        : "rounded-[1.1rem_1.1rem_1.1rem_0.25rem] bg-[#f0eadc] text-[#17171c]"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              );
            })}

            {isResponding && (
              <div className="flex items-end gap-2">
                <Image
                  src="/shadow-robot-avatar.png"
                  alt="Shadow space robot"
                  width={40}
                  height={40}
                  className="size-9 rounded-full border-[3px] border-[#08080b] bg-[#271638]"
                />
                <div className="rounded-[1.1rem_1.1rem_1.1rem_0.25rem] border-[3px] border-[#08080b] bg-[#f0eadc] px-4 py-2 font-mono text-sm font-black tracking-[0.28em] text-[#5227ff] shadow-[3px_4px_0_#08080b]">
                  ···
                </div>
              </div>
            )}
          </div>
        </div>

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 px-1 py-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => void sendMessage(question)}
                className="shrink-0 rounded-full border-[3px] border-[#08080b] bg-[#f2b90b] px-3 py-1.5 font-mono text-[10px] font-black text-[#111216] shadow-[2px_3px_0_#08080b] transition-transform hover:-translate-y-0.5"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
          <label htmlFor="shadow-message" className="sr-only">
            Message Shadow
          </label>
          <input
            id="shadow-message"
            value={draftMessage}
            onChange={(event) => setDraftMessage(event.target.value)}
            maxLength={1_000}
            placeholder="TYPE TRANSMISSION..."
            className="min-w-0 flex-1 rounded-xl border-[4px] border-[#08080b] bg-white px-3 py-2.5 font-mono text-xs font-black text-[#111216] outline-none placeholder:text-[#77736a] focus:bg-[#fff8df] focus:ring-3 focus:ring-[#5227ff]"
          />
          <button
            type="submit"
            disabled={!draftMessage.trim() || isResponding}
            className="rounded-xl border-[4px] border-[#08080b] bg-[#5227ff] px-4 font-mono text-xs font-black tracking-[0.06em] text-white shadow-[3px_4px_0_#08080b] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:bg-[#77727d]"
          >
            SEND
          </button>
        </form>
      </div>
    </aside>
  );
}
