'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Send, Paperclip, Smile } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'user',
    content: '你好小助手，我想做一次大约三天的旅行',
  },
  {
    id: 2,
    role: 'assistant',
    content: '我很高兴能帮助你。你有什么比较感兴趣的方向或者主题，我可以进一步推荐适合短途旅行的景点',
  },
];

function ChatContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tagsParam = searchParams.get('tags');

  const [messages, setMessages] = useState<Message[]>(() => {
    if (tagsParam) {
      const tagLabels = decodeURIComponent(tagsParam).split(',').filter(Boolean);
      return [
        {
          id: 0,
          role: 'user' as const,
          content: `我对这些方面比较感兴趣：${tagLabels.join('、')}`,
        },
        {
          id: 1,
          role: 'assistant' as const,
          content: `了解了！根据你的偏好（${tagLabels.join('、')}），我来为你推荐合适的旅行方案。你有想去的目的地吗？还是让我根据这些标签为你推荐？`,
        },
      ];
    }
    return INITIAL_MESSAGES;
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const systemContext = tagsParam
        ? `用户的旅行偏好标签：${decodeURIComponent(tagsParam)}。请参考这些偏好给出推荐。`
        : '';
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemContext,
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.reply || '抱歉，我暂时无法回复。请稍后再试。',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const fallbackMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '根据您的需求，我推荐去云南大理体验白族文化！大理有丰富的非遗文化体验，包括扎染、银器制作等。我可以为您制定一个三天的旅行计划，让您有一个放松舒心的体验！',
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-cream overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <button onClick={() => router.back()} className="p-1">
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full overflow-hidden shadow-sm">
            <Image
              src="/images/avatar-assistant.jpg"
              alt="旅行小助手"
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="font-semibold">旅行小助手</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-2 animate-fadeIn ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 mt-1 shadow-sm">
                <Image
                  src="/images/avatar-assistant.jpg"
                  alt="助手"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            {msg.role === 'user' && (
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 mt-1 bg-gray-200">
                <Image
                  src="/images/guest-experience.png"
                  alt="用户"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary/10 text-gray-800 rounded-tr-sm'
                  : 'bg-white shadow-sm text-gray-700 rounded-tl-sm'
              }`}
            >
              {msg.content}
              {msg.image && (
                <div className="mt-2 rounded-xl overflow-hidden">
                  <Image src={msg.image} alt="图片" width={200} height={150} className="object-cover" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 shadow-sm">
              <Image
                src="/images/avatar-assistant.jpg"
                alt="助手"
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="bg-white shadow-sm rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 pb-20 bg-white/80 backdrop-blur-lg border-t border-gray-100">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-primary transition-colors">
            <Paperclip size={20} />
          </button>
          <div className="flex-1 flex items-center bg-gray-50 rounded-full px-4 py-2.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="输入消息..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
            <button className="p-1 text-gray-400">
              <Smile size={18} />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-primary text-white rounded-full disabled:opacity-40 transition-opacity"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <ChatContent />
    </Suspense>
  );
}
