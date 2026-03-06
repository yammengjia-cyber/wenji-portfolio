'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MoreHorizontal, Bookmark } from 'lucide-react';
import { myTrips, communityPosts } from '@/lib/mockData';

export default function TripsPage() {
  return (
    <div className="h-full bg-cream overflow-y-auto pb-16">
      <div className="page-padding pt-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-5">我的旅行</h1>
      </div>

      {/* My Past Trips - horizontally scrollable */}
      <div className="px-5 mb-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-2 cursor-grab active:cursor-grabbing">
          {myTrips.map((trip) => (
            <Link href={`/trips/${trip.id}`} key={trip.id} className="block flex-shrink-0">
              <div className="relative w-[240px] h-[160px] rounded-2xl overflow-hidden bg-gray-200">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  sizes="200px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2.5 left-2.5 text-white/80 text-xs bg-black/30 px-2 py-0.5 rounded-full">
                  {trip.daysAgo}
                </div>
                <div className="absolute bottom-3 left-3 text-white font-semibold text-sm">
                  {trip.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Community Posts */}
      <div className="px-5 space-y-6 pb-24">
        {communityPosts.map((post) => (
          <div key={post.id}>
            {/* User info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={post.avatar}
                    alt={post.user}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="font-semibold text-sm">{post.user}</div>
                  <div className="text-xs text-gray-400">{post.time}</div>
                </div>
              </div>
              <button className="p-1 text-gray-400">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Post image */}
            <Link href={`/trips/${post.id}`}>
              <div className="relative h-[200px] rounded-2xl overflow-hidden bg-gray-200">
                <Image
                  src={post.image}
                  alt="旅行照片"
                  fill
                  sizes="(max-width: 430px) 100vw, 430px"
                  className="object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  参考行程 <span className="text-primary">&gt;</span>
                </div>
                <button className="absolute top-3 right-3 p-2 bg-white/30 backdrop-blur-sm rounded-full">
                  <Bookmark size={16} className="text-white" />
                </button>
              </div>
            </Link>

            {/* Post info */}
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-xs text-gray-500">{post.location}</span>
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-primary/20 border border-white" />
                  <div className="w-5 h-5 rounded-full bg-primary/30 border border-white" />
                </div>
                <span className="text-xs text-gray-400">{post.likes} 参考行程</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
