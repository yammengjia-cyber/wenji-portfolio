'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  CalendarDays,
  MessageCircle,
  Compass,
  MapPin,
  ShoppingBag,
} from 'lucide-react';

const tabs = [
  { href: '/plan', label: '行程', icon: CalendarDays },
  { href: '/messages', label: '消息', icon: MessageCircle },
  { href: '/', label: '探索', icon: Compass },
  { href: '/trips', label: '旅行', icon: MapPin },
  { href: '/products', label: '文化', icon: ShoppingBag },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/90 backdrop-blur-lg border-t border-gray-100 z-50">
      <div className="flex items-center justify-around h-16 pb-1">
        {tabs.map(tab => {
          const active = isActive(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${
                active ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <div className={`relative ${tab.href === '/' ? 'p-2 -mt-4 rounded-full' : ''} ${
                tab.href === '/' && active ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''
              } ${tab.href === '/' && !active ? 'bg-gray-200 text-gray-500' : ''}`}>
                <Icon size={tab.href === '/' ? 22 : 20} strokeWidth={active ? 2.2 : 1.8} />
              </div>
              <span className={`text-[10px] ${active ? 'font-medium' : ''}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
