'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Send, Smile } from 'lucide-react';
import { useToast } from '@/components/Toast';

const chatHistories: Record<string, { name: string; avatar: string; messages: { role: 'me' | 'them'; content: string }[] }> = {
  '2': {
    name: '安妮',
    avatar: '/images/guest-experience.png',
    messages: [
      { role: 'them', content: '你好！我最近刚从大理回来，那边的扎染体验真的太棒了！' },
      { role: 'me', content: '真的吗？我一直想去体验一下，难度大吗？' },
      { role: 'them', content: '完全不难，师傅很有耐心地教。而且做出来的作品可以带走哦～' },
      { role: 'me', content: '听起来好心动！大概需要多长时间？' },
      { role: 'them', content: '大理的扎染体验真的很棒，推荐你去试试！大概两个小时就够了，费用也不贵' },
    ],
  },
  '3': {
    name: '梅琳达',
    avatar: '/images/culture-weaving.png',
    messages: [
      { role: 'me', content: '你之前提到的那个木雕工坊在哪里？' },
      { role: 'them', content: '在文昌市的老街上，叫"海南木雕传习所"' },
      { role: 'me', content: '好的，他们周末开放吗？' },
      { role: 'them', content: '那个木雕工坊的师傅很有耐心，周末也开放的，建议提前预约' },
    ],
  },
  '4': {
    name: '露西',
    avatar: '/images/woodcarving-1.png',
    messages: [
      { role: 'them', content: '我在文昌体验木雕已经三个月了！' },
      { role: 'me', content: '哇，这么久！学到了什么了？' },
      { role: 'them', content: '从基础的刀法开始，现在已经可以做简单的摆件了' },
      { role: 'me', content: '太厉害了，能发几张照片看看吗？' },
      { role: 'them', content: '我在文昌的木雕体验太棒了，照片发给你看' },
    ],
  },
  '5': {
    name: '景德镇陶艺坊',
    avatar: '/images/culture-pottery.png',
    messages: [
      { role: 'them', content: '您好！感谢您对我们陶艺体验课的关注' },
      { role: 'me', content: '你好，请问周六上午有空位吗？' },
      { role: 'them', content: '有的！目前周六上午10点还有2个名额' },
      { role: 'me', content: '好的，帮我预约一个位置' },
      { role: 'them', content: '您预约的陶艺体验课已确认，周六上午10点，请提前10分钟到达' },
    ],
  },
};

export default function MessageDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { showToast } = useToast();
  const id = params.id as string;
  const chat = chatHistories[id];
  const [input, setInput] = useState('');

  if (!chat) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-gray-400">对话不存在</p>
      </div>
    );
  }

  const handleSend = () => {
    if (!input.trim()) return;
    showToast('消息已发送（演示模式）', 'success');
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-cream overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <button onClick={() => router.back()} className="p-1">
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full overflow-hidden relative bg-gray-200">
            <Image src={chat.avatar} alt={chat.name} fill className="object-cover" />
          </div>
          <span className="font-semibold">{chat.name}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
        {chat.messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === 'me' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {msg.role === 'them' && (
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1 relative bg-gray-200">
                <Image src={chat.avatar} alt={chat.name} fill className="object-cover" />
              </div>
            )}
            {msg.role === 'me' && (
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1 bg-gray-200 relative">
                <Image src="/images/guest-experience.png" alt="我" fill className="object-cover" />
              </div>
            )}
            <div
              className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'me'
                  ? 'bg-primary/10 text-gray-800 rounded-tr-sm'
                  : 'bg-white shadow-sm text-gray-700 rounded-tl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 pb-20 bg-white/80 backdrop-blur-lg border-t border-gray-100">
        <div className="flex items-center gap-2">
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
            disabled={!input.trim()}
            className="p-2.5 bg-primary text-white rounded-full disabled:opacity-40 transition-opacity"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
