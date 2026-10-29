import { suggestedQuestions } from "../data/knowledgeBase";

// The actual chat UI — message list, input, suggestions — shared between
// the desktop floating widget and the mobile combined dock, so the two
// surfaces can't drift out of sync with each other visually.
const ChatPanel = ({
  messages,
  input,
  setInput,
  loading,
  error,
  listRef,
  sendMessage,
  handleSubmit,
  clearChat,
  onClose,
  className = "",
}) => (
  <div className={className}>
    <div className='flex items-center justify-between px-5 py-4 border-b border-line2'>
      <p className='font-mono text-[11px] tracking-[0.16em] uppercase text-muted'>
        Ask me anything
      </p>
      <div className='flex items-center gap-4'>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className='font-sans text-xs text-muted hover:text-paper transition-colors'
          >
            Clear
          </button>
        )}
        <button
          onClick={onClose}
          aria-label='Close chat'
          className='text-muted hover:text-paper transition-colors text-xl leading-none'
        >
          ×
        </button>
      </div>
    </div>

    <div ref={listRef} className='max-h-96 overflow-y-auto px-5 py-4 space-y-4'>
      {messages.length === 0 && (
        <div className='flex flex-col gap-3'>
          <p className='font-sans text-xs text-muted'>
            Trained on my bio, work, and products. Ask it what you'd ask me.
          </p>
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className='text-left font-sans text-sm text-paper bg-[#141414] border border-line rounded-[10px] px-3.5 py-3 hover:border-accent transition-colors'
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {messages.map((m, i) => (
        <div key={i} className={m.role === "user" ? "text-paper" : "text-muted"}>
          <p className='font-sans text-xs uppercase tracking-wide mb-1 text-muted/70'>
            {m.role === "user" ? "You" : "harshit.exe"}
          </p>
          <p className='font-sans text-sm leading-relaxed'>{m.content}</p>
        </div>
      ))}

      {loading && <p className='font-sans text-sm text-muted italic'>thinking…</p>}
      {error && <p className='font-sans text-sm text-accent'>{error}</p>}
    </div>

    <form onSubmit={handleSubmit} className='flex items-center gap-3 border-t border-line2 px-5 py-3'>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Ask a question…'
        disabled={loading}
        className='flex-1 bg-transparent font-sans text-sm text-paper placeholder:text-muted outline-none disabled:opacity-50'
      />
      <button
        type='submit'
        disabled={loading || !input.trim()}
        className='inline-flex items-center min-h-9 font-sans text-sm font-semibold text-black bg-accent rounded-full px-4 disabled:bg-line disabled:text-muted transition-colors'
      >
        Send
      </button>
    </form>
  </div>
);

export default ChatPanel;
