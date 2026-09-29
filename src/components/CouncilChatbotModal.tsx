import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  Zap,
  Cpu,
  Compass,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { ChatMessage } from '../types';

interface CouncilChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'model',
    content: `Greetings, Fellow Steward. I am the **Inter-Institutional Council Synthesizer**, attuned to the **Five Libraries of the Human World** and the **Three Centers of Human Progress**.

I advise delegates and partners across **Fiducia Centrale**, **Central Trust Securities (CTS)**, the **UN**, **WHO**, and the **Swiss International Archives**. 

How may I assist your inquiries today regarding our civic architecture, live initiatives, or multi-dimensional planning?`,
    timestamp: 'Connected',
    modelUsed: 'gemini-3.5-flash',
  },
];

const PROMPT_SUGGESTIONS = [
  'How does Project Aegis-Continuum bridge Library II (Meaning) and Library IV (Systems)?',
  'Help me design a 3-month Transitional Center schedule for our institutional goals.',
  'What zero-trust protocols does Central Trust Securities mandate for diplomatic conduits?',
  'Explain how the Returning River of Human Progress handles evidence feedback.',
];

export const CouncilChatbotModal: React.FC<CouncilChatbotModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('collective_council_chat');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [taskType, setTaskType] = useState<'general' | 'fast' | 'complex'>('general');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    localStorage.setItem('collective_council_chat', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const getModelName = (type: 'general' | 'fast' | 'complex') => {
    switch (type) {
      case 'complex':
        return 'gemini-3.1-pro-preview';
      case 'fast':
        return 'gemini-3.1-flash-lite';
      default:
        return 'gemini-3.5-flash';
    }
  };

  const handleSend = async (contentToSend?: string) => {
    const text = (contentToSend || input).trim();
    if (!text || isLoading) return;

    setErrorNotice(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.filter((m) => m.id !== 'welcome').map((m) => ({
            role: m.role,
            content: m.content,
          })),
          taskType,
          model: getModelName(taskType),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || getModelName(taskType),
      };

      setMessages([...newHistory, modelMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorNotice(err.message || 'Unable to connect to Council Synthesis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear conversation history?')) {
      setMessages(INITIAL_MESSAGES);
      localStorage.removeItem('collective_council_chat');
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[90vh] bg-[#FBF9F5] border border-stone-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-100/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-200 flex items-center justify-center shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-xl text-stone-900 font-medium">
                  Council Synthesizer & Steward AI
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 text-stone-700 font-semibold">
                  Multi-Turn Session
                </span>
              </div>
              <div className="text-[11px] font-mono text-stone-500">
                Grounding: Libraries I–V · Three Centers · Inter-Institutional Compacts
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              title="Reset conversation"
              className="p-2 text-stone-400 hover:text-stone-800 hover:bg-stone-200 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-800 hover:bg-stone-200 rounded-lg transition-colors"
              aria-label="Close Advisor Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Model & Task Role Selector Bar */}
        <div className="px-6 py-2.5 bg-white border-b border-stone-200/80 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-1.5 font-mono text-stone-500 text-[11px]">
            <span>Task Optimization:</span>
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded-lg">
            <button
              onClick={() => setTaskType('general')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                taskType === 'general'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Balanced general stewardship and policy synthesis"
            >
              <Compass className="w-3.5 h-3.5 text-stone-700" />
              <span>General (gemini-3.5-flash)</span>
            </button>

            <button
              onClick={() => setTaskType('fast')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                taskType === 'fast'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Rapid dispatches, glossary, and micro-queries"
            >
              <Zap className="w-3.5 h-3.5 text-amber-700" />
              <span>Fast (gemini-3.1-flash-lite)</span>
            </button>

            <button
              onClick={() => setTaskType('complex')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                taskType === 'complex'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Deep multi-system coordination and architectural logic"
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-700" />
              <span>Complex (gemini-3.1-pro-preview)</span>
            </button>
          </div>
        </div>

        {/* Scrollable Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-mono shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-stone-900 text-stone-100'
                    : 'bg-stone-200 text-stone-800'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1 max-w-[85%] sm:max-w-xl">
                <div
                  className={`flex items-center gap-2 text-[10px] font-mono text-stone-400 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span>{msg.role === 'user' ? 'Steward (You)' : 'Council Synthesizer'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{msg.timestamp}</span>
                  {msg.modelUsed && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-800 font-semibold">{msg.modelUsed}</span>
                    </>
                  )}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-stone-900 text-stone-100 rounded-tr-none'
                      : 'bg-white border border-stone-200/90 text-stone-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                  {msg.role === 'model' && (
                    <div className="flex justify-end pt-2 mt-2 border-t border-stone-100">
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="text-stone-400 hover:text-stone-800 p-1 rounded flex items-center gap-1 text-[11px] font-mono"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-3xl mr-auto animate-pulse">
              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
                <RefreshCw className="w-4 h-4 text-stone-500 animate-spin" />
              </div>
              <div className="p-4 bg-white border border-stone-200 rounded-2xl rounded-tl-none shadow-sm text-xs font-mono text-stone-500">
                Synthesizing institutional council response using {getModelName(taskType)}...
              </div>
            </div>
          )}

          {/* Error notice */}
          {errorNotice && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorNotice}</span>
              </div>
              <button
                onClick={() => handleSend()}
                className="px-2.5 py-1 bg-rose-900 text-white rounded text-[11px] font-mono hover:bg-rose-800"
              >
                Retry
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries Pill Strip */}
        <div className="px-4 sm:px-6 py-2 bg-stone-50 border-t border-stone-200 overflow-x-auto whitespace-nowrap flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase text-stone-400 shrink-0">
            Suggested Queries:
          </span>
          {PROMPT_SUGGESTIONS.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sug)}
              disabled={isLoading}
              className="text-[11px] px-2.5 py-1 bg-white border border-stone-200/90 rounded text-stone-700 hover:text-stone-950 hover:border-stone-400 transition-colors shrink-0 disabled:opacity-50"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input Box Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-stone-200 shrink-0">
          <div className="relative flex items-end gap-2">
            <textarea
              ref={inputRef}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask the Council Synthesizer about the 5 Libraries, 3 Centers, or Project Roadmaps..."
              className="w-full text-xs sm:text-sm p-3 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:ring-1 focus:ring-stone-900 resize-none font-sans leading-relaxed"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-40 rounded-xl transition-colors shrink-0"
              title="Send message (Enter)"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mt-2 px-1">
            <span>Press Enter to send, Shift+Enter for newline</span>
            <span>Role: Council Synthesizer & Institutional Advisor</span>
          </div>
        </div>
      </div>
    </div>
  );
};
