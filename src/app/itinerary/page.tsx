'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import { itineraryDays } from '@/lib/mockData';
import { useToast } from '@/components/Toast';

export default function ItineraryPage() {
  const router = useRouter();
  const { showToast } = useToast();

  return (
    <div className="h-full relative overflow-y-auto pb-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/culture-cseo.png"
          alt="背景"
          fill
          sizes="430px"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-cream/70 backdrop-blur-sm" />
      </div>

      <div className="relative z-10">
        <div className="page-padding pt-3">
          <SearchBar />
        </div>

        <div className="page-padding mt-4">
          <h1 className="text-2xl font-bold text-gray-900">旅行行程推荐</h1>
          <p className="text-sm text-gray-500 mt-1">智能推荐旅行计划</p>
        </div>

        {/* Timeline */}
        <div className="px-5 mt-6 pb-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[52px] top-4 bottom-4 w-0.5 bg-primary/20" />

            <div className="space-y-6">
              {itineraryDays.map((day, index) => (
                <div
                  key={day.day}
                  className="flex gap-4 items-start animate-fadeIn"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Day indicator */}
                  <div className="flex items-center gap-2 flex-shrink-0 w-[65px]">
                    <div className="w-3 h-3 rounded-full bg-primary shadow-md shadow-primary/30 relative z-10" />
                    <div className="text-base font-bold text-gray-800">
                      {day.day} Day
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="glass-card px-4 py-3 flex-1">
                    <ul className="space-y-1.5">
                      {day.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-5 pb-24">
          <button
            onClick={() => {
              showToast('行程已保存，可在「我的旅行」中查看', 'success');
              setTimeout(() => router.push('/trips'), 1500);
            }}
            className="gold-button w-full text-base py-4"
          >
            更改行程
          </button>
        </div>
      </div>
    </div>
  );
}
