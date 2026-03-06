'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: '旅行小助手',
    avatar: null,
    isBot: true,
    lastMessage: '我可以为您制定一个三天的旅行计划...',
    time: '刚刚',
    unread: 1,
  },
  {
    id: 2,
    name: '安妮',
    avatar: '/images/guest-experience.png',
    isBot: false,
    lastMessage: '大理的扎染体验真的很棒，推荐你去试试！',
    time: '18分钟前',
    unread: 2,
  },
  {
    id: 3,
    name: '梅琳达',
    avatar: '/images/culture-weaving.png',
    isBot: false,
    lastMessage: '那个木雕工坊的师傅很有耐心',
    time: '1小时前',
    unread: 0,
  },
  {
    id: 4,
    name: '露西',
    avatar: '/images/woodcarving-1.png',
    isBot: false,
    lastMessage: '我在文昌的木雕体验太棒了，照片发给你看',
    time: '3小时前',
    unread: 0,
  },
  {
    id: 5,
    name: '景德镇陶艺坊',
    avatar: '/images/culture-pottery.png',
    isBot: false,
    lastMessage: '您预约的陶艺体验课已确认，周六上午10点',
    time: '昨天',
    unread: 0,
  },
];

export default function MessagesPage() {
  return (
    <div className="h-full bg-cream overflow-y-auto pb-16">
      <div className="page-padding pt-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">消息</h1>

        {/* Search */}
        <div className="flex items-center bg-white/80 rounded-full px-4 py-2.5 mb-4 border border-gray-200">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="搜索联系人"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="px-5 pb-24">
        {conversations.map((conv, index) => (
          <div
            key={conv.id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Link
              href={conv.isBot ? '/chat' : `/messages/${conv.id}`}
              className="flex items-center gap-3 py-3.5 border-b border-gray-100 last:border-0"
            >
              {/* Avatar */}
              <div className="relative w-12 h-12 flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  {conv.isBot ? (
                    <Image
                      src="/images/avatar-assistant.jpg"
                      alt="旅行小助手"
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <Image
                      src={conv.avatar!}
                      alt={conv.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  )}
                </div>
                {conv.unread > 0 && (
                  <div className="absolute -top-1 -right-1 z-10 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-cream">
                    <span className="text-[10px] text-white font-bold">{conv.unread}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm ${conv.unread > 0 ? 'font-bold' : 'font-medium'} text-gray-900 truncate`}>
                    {conv.name}
                  </h3>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className={`text-xs mt-0.5 truncate ${conv.unread > 0 ? 'text-gray-700' : 'text-gray-400'}`}>
                  {conv.lastMessage}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
