import { useEffect, useRef, useState } from "react";

import { contact } from "../data/knowledgeBase";

const SESSION_KEY = "askai_exchange_count";
const MAX_EXCHANGES_PER_SESSION = 8;

const getExchangeCount = () => {
  try {
    return Number(sessionStorage.getItem(SESSION_KEY) || 0);
  } catch {
    return 0;
  }
};

const bumpExchangeCount = () => {
  try {
    const next = getExchangeCount() + 1;
    sessionStorage.setItem(SESSION_KEY, String(next));
    return next;
  } catch {
    return getExchangeCount() + 1;
  }
};

// Shared chat logic for every place this AI shows up (the inline Ask
// section, the floating global widget). The per-session question cap is
// sessionStorage-backed, so it's genuinely shared across both — asking 5
// questions in the floating widget leaves 3 left in the inline section,
// not a separate quota each. Conversation state itself is NOT shared:
// each call to this hook gets its own messages array, since there's no
// reason the two surfaces should show the same transcript.
export const useAskChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    if (getExchangeCount() >= MAX_EXCHANGES_PER_SESSION) {
      setError(`That's a lot of questions. Email me directly: ${contact.email}`);
      return;
    }

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);
    bumpExchangeCount();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      if (!data.reply) throw new Error("empty reply");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setError(`Having trouble reaching my brain right now. Email me instead: ${contact.email}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Clears the transcript only — deliberately doesn't touch the
  // sessionStorage exchange count, since that's a real usage cap, not
  // something a "clear" click should let someone reset for free.
  const clearChat = () => {
    setMessages([]);
    setError(null);
    setInput("");
  };

  return {
    messages,
    input,
    setInput,
    loading,
    error,
    listRef,
    sendMessage,
    handleSubmit,
    clearChat,
  };
};
