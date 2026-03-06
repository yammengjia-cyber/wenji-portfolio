'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Star, ShoppingCart, BookOpen, Hand, Package } from 'lucide-react';
import { useToast } from '@/components/Toast';
import { activityDetail } from '@/lib/mockData';

const tagIcons = [
  { icon: ShoppingCart, label: '商品购买', color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
  { icon: BookOpen, label: '文化介绍', color: 'text-teal-600', bg: 'bg-teal-50 border-teal-200' },
  { icon: Hand, label: '手工制作', color: 'text-orange-500', bg: 'bg-orange-50 border-orange-200' },
  { icon: Package, label: '作品携带', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
];

export default function ActivityDetailPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const activity = activityDetail;
  const [liked, setLiked] = useState(false);

  return (
    <div className="h-full bg-cream flex flex-col overflow-hidden pb-16">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Image with title overlay */}
        <div className="relative h-[340px] bg-gray-200">
          <Image
            src="/images/activity-hero-dali.png"
            alt={activity.title}
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

          {/* Navigation */}
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <button
              onClick={() => {
                setLiked(!liked);
                if (!liked) showToast('已添加到收藏', 'success');
              }}
              className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center transition-all"
            >
              <Heart size={20} className={liked ? 'text-red-500 fill-red-500' : 'text-white'} />
            </button>
          </div>

          {/* Title overlaid on image bottom */}
          <div className="absolute bottom-6 left-5 right-5">
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">{activity.location}</h1>
          </div>
        </div>

        {/* Content card overlapping image */}
        <div className="relative -mt-4 bg-cream rounded-t-3xl">
          <div className="px-5 pt-5">
            {/* Rating */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map(i => (
                <Star key={i} size={18} className="text-primary fill-primary" />
              ))}
              <Star size={18} className="text-primary fill-primary/30" />
              <span className="text-lg font-semibold text-gray-700 ml-1">{activity.rating}</span>
            </div>

            {/* Quick Info */}
            <div className="flex items-center gap-6 mt-3">
              <div className="text-center">
                <div className="text-xs text-gray-400">难度</div>
                <div className="font-semibold text-sm mt-0.5">{activity.difficulty}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400">人数限制</div>
                <div className="font-semibold text-sm mt-0.5">{activity.groupSize}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400">时间</div>
                <div className="font-semibold text-sm mt-0.5">{activity.duration}</div>
              </div>
            </div>

            {/* Tags - larger text, with border frames, centered */}
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {tagIcons.map(({ icon: Icon, label, color, bg }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border ${bg}`}
                >
                  <Icon size={18} className={color} />
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </div>
              ))}
            </div>

            {/* Activity Photos */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#51463E] mb-3">活动记录</h3>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5">
                {activity.activityPhotos.map((photo, i) => (
                  <div key={i} className="relative flex-shrink-0 w-[120px] h-[90px] rounded-xl overflow-hidden bg-gray-200">
                    <Image src={photo} alt={`活动照片 ${i + 1}`} fill sizes="120px" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#51463E] mb-3">位置</h3>
              <div className="relative h-[160px] rounded-2xl overflow-hidden bg-gray-200">
                <Image
                  src="/images/map-route.png"
                  alt="地图"
                  fill
                  sizes="(max-width: 430px) 100vw, 430px"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              </div>
              {/* Address text below map */}
              <div className="mt-2 text-center">
                <p className="text-xs text-gray-500 font-medium">周城村 (Zhoucheng Village)</p>
                <p className="text-[11px] text-gray-400 mt-0.5">云南省大理白族自治州大理市喜洲镇北部</p>
              </div>
            </div>

            {/* Related Spots */}
            <div className="mt-6 pb-4">
              <h3 className="text-lg font-bold text-[#51463E] mb-3">相关推荐</h3>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-2">
                {activity.relatedSpots.map((spot, i) => (
                  <div key={i} className="flex-shrink-0 w-[140px]">
                    <div className="relative h-[100px] rounded-xl overflow-hidden bg-gray-200">
                      <Image src={spot.image} alt={spot.title} fill sizes="140px" className="object-cover" />
                    </div>
                    <p className="text-xs text-gray-600 mt-1.5 text-center">{spot.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Bar - fixed at bottom, above bottom nav */}
      <div className="px-5 py-3 bg-amber-50/95 backdrop-blur-lg border-t border-amber-100">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-0.5">
            <span className="text-2xl font-bold text-primary">{activity.price}</span>
            <span className="text-sm text-gray-400">/{activity.priceUnit}</span>
          </div>
          <button
            onClick={() => showToast('预定功能即将上线，敬请期待！', 'warning')}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors"
          >
            现在预定
          </button>
        </div>
      </div>
    </div>
  );
}
