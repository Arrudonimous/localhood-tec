"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  id: string;
  sender: "client" | "staff";
  senderName: string;
  text: string;
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sender: "client",
        senderName: user?.name ?? "Você",
        text: draft.trim(),
      },
    ]);
    setDraft("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text sm:text-3xl">Mensagens</h1>

      <div className="mt-6 flex h-[420px] flex-col rounded-lg border border-secondary bg-secondary">
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.length === 0 && (
            <p className="text-center text-sm text-text-secondary">
              Nenhuma mensagem ainda. Envie a primeira!
            </p>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[80%] rounded-md px-4 py-2 text-sm ${
                message.sender === "client"
                  ? "ml-auto bg-green text-primary"
                  : "bg-primary text-text"
              }`}
            >
              <p className="text-xs opacity-70">{message.senderName}</p>
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={send}
          className="flex gap-2 border-t border-primary p-4"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Escreva uma mensagem..."
            className="flex-1 rounded-md border border-border bg-primary px-3 py-2 text-sm text-text focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md bg-green px-4 py-2 text-sm font-semibold text-primary transition-colors duration-fast hover:bg-green-hover"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
