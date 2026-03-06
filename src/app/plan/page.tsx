'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import { planTags } from '@/lib/mockData';
import { MessageCircle } from 'lucide-react';

const bubbleCenters = [
  { cx: 80,  cy: 24 },
  { cx: 215, cy: 34 },
  { cx: 350, cy: 22 },
  { cx: 145, cy: 82 },
  { cx: 280, cy: 90 },
  { cx: 390, cy: 72 },
  { cx: 60,  cy: 134 },
  { cx: 200, cy: 144 },
  { cx: 340, cy: 132 },
  { cx: 130, cy: 192 },
  { cx: 270, cy: 200 },
  { cx: 395, cy: 184 },
  { cx: 68,  cy: 248 },
  { cx: 210, cy: 258 },
  { cx: 350, cy: 244 },
  { cx: 130, cy: 306 },
  { cx: 270, cy: 314 },
  { cx: 395, cy: 298 },
  { cx: 68,  cy: 360 },
  { cx: 210, cy: 368 },
  { cx: 350, cy: 354 },
];

export default function PlanPage() {
  const router = useRouter();
  const [tags, setTags] = useState(planTags);

  const toggleTag = (index: number) => {
    setTags(prev =>
      prev.map((tag, i) => (i === index ? { ...tag, selected: !tag.selected } : tag))
    );
  };

  const handleChat = () => {
    const selectedLabels = tags.filter(t => t.selected).map(t => t.label);
    const query = selectedLabels.length > 0
      ? `?tags=${encodeURIComponent(selectedLabels.join(','))}`
      : '';
    router.push(`/chat${query}`);
  };

  return (
    <div className="h-full bg-cream flex flex-col overflow-hidden pb-16">
      <div className="px-5 pt-3 pb-0">
        <SearchBar />
      </div>

      <div className="px-5 mt-2">
        <h1 className="text-xl font-bold text-[#51463E]">快速制定计划</h1>
        <p className="text-xs text-gray-500 mt-0.5">选择不同的标签，快速推荐行程</p>
      </div>

      <div className="relative flex-1 mt-1 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-[75%] z-0">
          <Image
            src="/images/plan-bg-street.png"
            alt="背景"
            fill
            sizes="430px"
            className="object-cover object-bottom opacity-50"
            priority
          />
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-cream to-transparent" />
        </div>

        <div className="relative z-10 w-full overflow-y-auto h-full pb-16" style={{ paddingTop: '16px' }}>
          <div className="relative" style={{ height: '400px' }}>
            {tags.map((tag, index) => {
              const pos = bubbleCenters[index];
              if (!pos) return null;
              const isSelected = tag.selected;
              const size = isSelected ? 86 : 64;
              return (
                <button
                  key={tag.label}
                  onClick={() => toggleTag(index)}
                  className={`absolute rounded-full flex items-center justify-center transition-all duration-300 font-medium ${
                    isSelected
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-white/90 text-gray-600 shadow-md backdrop-blur-sm border border-white/40'
                  }`}
                  style={{
                    top: `${pos.cy}px`,
                    left: `${pos.cx}px`,
                    transform: 'translate(-50%, -50%)',
                    width: `${size}px`,
                    height: `${size}px`,
                    fontSize: isSelected ? '15px' : '13px',
                  }}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-4 left-5 right-5 z-10">
          <button
            onClick={handleChat}
            className="gold-button w-full flex items-center justify-center gap-2 text-sm py-3"
          >
            和旅行助手聊天 <MessageCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
