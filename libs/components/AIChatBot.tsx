import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { Messages } from "@/libs/config";
import { sweetErrorAlert } from "@/libs/sweetAlert";

interface AIMessage {
  role: "user" | "assistant";
  text: string;
}

const AIChatBot = () => {
  const chatContentRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  /** Xabarlar o'zgarganda pastga scroll */
  useEffect(() => {
    chatContentRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleOpenChat = () => setOpen((prev) => !prev);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  const handleSend = async () => {
    if (!messageInput.trim()) {
      sweetErrorAlert(Messages.error4);
      return;
    }
    if (loading) return;

    const userMessage = messageInput.trim();
    setMessageInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map((m) => ({ role: m.role, content: m.text })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const retrySec = data.retryAfter;
        const msg = res.status === 429
          ? (retrySec
              ? `So‘rovlar limiti. ${retrySec} soniyadan keyin qayta urinib ko‘ring.`
              : data.error || "So‘rovlar limiti. Keyinroq qayta urinib ko‘ring.")
          : (data.error || "AI xizmatida xatolik yuz berdi.");
        throw new Error(msg);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply || data.message || "" },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "AI xizmatida xatolik yuz berdi.";
      sweetErrorAlert(msg);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const frameContent = (
    <>
      <div
        className={`ai-chat-backdrop ${open ? "open" : ""}`}
        onClick={handleOpenChat}
        aria-hidden
      />
      <Stack className={`ai-chat-frame ${open ? "open" : ""}`}>
        <Box className="ai-chat-top">
          <img src="/img/dealer/cc1.png" alt="AI" className="ai-chat-top-avatar" />
          <Typography component="span" className="ai-chat-top-title">
            AI Assistant
          </Typography>
          <span className="ai-chat-badge">Timory AI</span>
          <button type="button" className="ai-chat-close" onClick={handleOpenChat} aria-label="Close">
            <CloseIcon />
          </button>
        </Box>

        <Box className="ai-chat-content" ref={chatContentRef}>
          <div className="ai-welcome">
            <span>Ask me anything 🤖</span>
            <p className="ai-welcome-subtitle">Powered by AI – get instant answers</p>
          </div>
          {messages.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                mb: 0.5,
              }}
            >
              <div className={msg.role === "user" ? "ai-msg-right" : "ai-msg-left"}>
                {msg.text}
              </div>
            </Box>
          ))}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 0.5 }}>
              <div className="ai-msg-left ai-msg-loading">Typing...</div>
            </Box>
          )}
        </Box>

        <Box className="ai-chat-bott">
          <input
            type="text"
            placeholder="Ask a question..."
            value={messageInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="ai-msg-input"
            disabled={loading}
          />
          <button
            type="button"
            className="ai-send-btn"
            onClick={handleSend}
            disabled={loading}
          >
            <SendIcon sx={{ fontSize: 20 }} />
          </button>
        </Box>
      </Stack>
    </>
  );

  return (
    <>
      {typeof document !== "undefined" &&
        createPortal(frameContent, document.body)}
      <Stack className="ai-chatbot">
        <button type="button" className="ai-chat-button" onClick={handleOpenChat}>
         <img src="/img/dealer/cc1.png" alt="AI" className="ai-chat-avatar" />
        </button>
      </Stack>
    </>
  );
};

export default AIChatBot;
