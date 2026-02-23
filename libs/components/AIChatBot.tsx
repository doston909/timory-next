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

function getSelfIntroReply(raw: string): string | null {
  const text = raw.toLowerCase();

  // Uzbek triggers
  const uzTriggers = [
    "kimsan",
    "kimsiz",
    "kim san",
    "kim siz",
    "o'zing haqida",
    "o‘zing haqida",
    "ozing haqida",
    "o'zing haqingda",
    "o‘zing haqingda",
    "ozing haqingda",
    "o'zing haqingda ayt",
    "o‘zing haqingda ayt",
    "ozing haqingda ayt",
    "o'zing haqingda gapir",
    "o‘zing haqingda gapir",
    "ozing haqingda gapir",
  ];
  if (uzTriggers.some((k) => text.includes(k))) {
    return "Men Timory platformasi uchun maxsus o‘qitilgan AI yordamchisiman. Soatlar, dilerlar va Timory servislari haqida savollaringizga javob berishga yordam beraman.";
  }

  // English triggers
  const enTriggers = [
    "who are you",
    "what are you",
    "who r u",
    "tell me about yourself",
    "about yourself",
    "tell me about you",
    "about you",
    "what can you do",
  ];
  if (enTriggers.some((k) => text.includes(k))) {
    return "I am an AI assistant trained specifically for Timory. I help you with watches, dealers, and anything related to the Timory platform.";
  }

  // Korean triggers
  const koTriggers = [
    "너는 누구",
    "당신은 누구",
    "누구세요",
    "자기소개",
    "너 뭐야",
  ];
  if (koTriggers.some((k) => text.includes(k))) {
    return "저는 Timory를 위해 특별히 학습된 AI 어시스턴트입니다. 시계, 딜러, 그리고 Timory 플랫폼과 관련된 질문을 도와드립니다.";
  }

  // Russian triggers
  const ruTriggers = [
    "кто ты",
    "кто вы",
    "расскажи о себе",
    "скажи о себе",
    "кто такой ты",
  ];
  if (ruTriggers.some((k) => text.includes(k))) {
    return "Я — AI‑ассистент, специально обученный для платформы Timory. Помогаю с вопросами о часах, дилерах и сервисах Timory.";
  }

  return null;
}

function getOutOfDomainReply(raw: string): string | null {
  const text = raw.toLowerCase();

  // Hech bo'lmaganda bitta soatga oid keyword bo'lsa — ruxsat beramiz
  const watchKeywords = [
    // English
    "watch",
    "watches",
    "timepiece",
    "chronograph",
    "bezel",
    "dial",
    "strap",
    "bracelet",
    "automatic",
    "mechanical",
    "quartz",
    "water resistance",
    "water-resistant",
    "dealer",
    "brand",
    "timory",
    // Uzbek / Russian translit
    "soat",
    "soatlar",
    "remeshok",
    "diler",
    // Russian
    "часы",
    "хронограф",
    "браслет",
    "ремешок",
    "водонепроницаем",
    "дилер",
    // Korean
    "시계",
    "워치",
    "브랜드",
    "딜러",
    // Some common brand names
    "rolex",
    "omega",
    "patek",
    "audemars",
    "ap ",
    "audemars piguet",
    "cartier",
    "seiko",
    "tissot",
    "longines",
  ];

  const isWatchRelated = watchKeywords.some((k) => text.includes(k));
  if (isWatchRelated) return null;

  // Language detection (very simple heuristics)
  const hasKorean = /[가-힣]/.test(raw);
  const hasCyrillic = /[А-Яа-яЁё]/.test(raw);
  const looksUzbek = text.includes("soat") || text.includes("kim") || text.includes("haqida");

  if (hasKorean) {
    return "저는 시계와 Timory 플랫폼과 관련된 질문에만 답변할 수 있습니다.";
  }
  if (hasCyrillic) {
    return "Я отвечаю только на вопросы, связанные с часами и платформой Timory.";
  }
  if (looksUzbek) {
    return "Men faqat soatlar va Timory platformasiga oid savollarga javob beraman.";
  }

  // Default: English
  return "I only answer questions related to watches and the Timory platform.";
}

const AIChatBot = () => {
  const chatContentRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

    const selfIntro = getSelfIntroReply(userMessage);
    if (selfIntro) {
      setMessages((prev) => [...prev, { role: "assistant", text: selfIntro }]);
      return;
    }

    const outOfDomain = getOutOfDomainReply(userMessage);
    if (outOfDomain) {
      setMessages((prev) => [...prev, { role: "assistant", text: outOfDomain }]);
      return;
    }

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
        const retrySec = data.retryAfter ?? 60;
        const isLimit = res.status === 429;
        const msg = isLimit
          ? `Rate limit reached. Please try again in ${retrySec} seconds.`
          : (data.error || "An error occurred with the AI service.");
        if (isLimit) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", text: `⏳ ${msg}` },
          ]);
        }
        const err = new Error(msg) as Error & { isLimit?: boolean };
        err.isLimit = isLimit;
        throw err;
      }

      const replyText = data.reply ?? data.message ?? "";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: replyText || "Reply is empty. Try asking again or rephrase your question.",
        },
      ]);
    } catch (err: unknown) {
      const e = err as Error & { isLimit?: boolean };
      const msg = e?.message || "An error occurred with the AI service.";
      if (!e?.isLimit) {
        sweetErrorAlert(msg);
        setMessages((prev) => prev.slice(0, -1));
      }
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
      {mounted && typeof document !== "undefined" &&
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
