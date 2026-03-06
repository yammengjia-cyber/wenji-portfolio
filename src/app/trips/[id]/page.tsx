'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/Toast';
import { lucyTripPlan } from '@/lib/mockData';

export default function TripDetailPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const plan = lucyTripPlan;

  return (
    <div className="h-full bg-cream overflow-y-auto pb-16">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-20">
        <button onClick={() => router.back()} className="p-1">
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={plan.avatar}
              alt={plan.user}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <div className="font-semibold text-sm">{plan.user}</div>
            <div className="text-xs text-gray-400">{plan.duration}</div>
          </div>
        </div>
      </div>

      {/* Photo gallery */}
      <div className="flex gap-1 h-[220px]">
        {plan.photos.map((photo, i) => (
          <div key={i} className="relative flex-1 overflow-hidden bg-gray-200">
            <Image
              src={photo}
              alt={`照片 ${i + 1}`}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-3">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
      </div>

      {/* Plan Info */}
      <div className="page-padding mt-4">
        <h2 className="text-xl font-bold text-gray-900">我的计划</h2>
        <p className="text-sm text-gray-500 mt-1">{plan.date}　{plan.location}</p>
      </div>

      {/* Schedule Timeline */}
      <div className="px-5 mt-6 pb-8 space-y-5">
        {plan.schedule.map((item, index) => (
          <div
            key={item.step}
            className="flex gap-4 animate-fadeIn"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="relative w-[100px] h-[90px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="100px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-gray-900">
                {item.step}.{item.title}
              </h3>
              <p className="text-xs text-primary font-medium mt-0.5">{item.time}</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Publish Button */}
      <div className="px-5 pb-24">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 flex-1 text-center">一键上传您的旅行计划</span>
          <button
            onClick={() => showToast('旅行计划已发布！', 'success')}
            className="gold-button px-8 py-3 text-sm"
          >
            发布
          </button>
        </div>
      </div>
    </div>
  );
}
