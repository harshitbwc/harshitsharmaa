import { createContext, useContext, useRef, useState } from "react";

// A minimal cross-component signal, not shared chat state: ProductDetail's
// "Ask about X" button needs to tell the globally-mounted FloatingChat
// "open yourself, with this question pre-filled" without the two being
// related in the component tree. openSignal is a counter (not a boolean)
// so firing the same prefill twice in a row still triggers a fresh open.
const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [openSignal, setOpenSignal] = useState(0);
  const prefillRef = useRef("");

  const openChat = (prefill = "") => {
    prefillRef.current = prefill;
    setOpenSignal((s) => s + 1);
  };

  return (
    <ChatContext.Provider value={{ openSignal, prefillRef, openChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
};
