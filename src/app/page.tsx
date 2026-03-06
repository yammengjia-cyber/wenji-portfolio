'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, MapPin } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { festivals, tripRecommendation } from '@/lib/mockData';

const wheelImages = [
  { src: '/images/spot-ellipse-30.png', title: '佩特拉古城' },
  { src: '/images/spot-ellipse-128.png', title: '古镇集市' },
  { src: '/images/spot-ellipse-center.jpg', title: '传统工艺' },
  { src: '/images/spot-ellipse-31.png', title: '丽江古城' },
  { src: '/images/spot-ellipse-32.png', title: '阆中古城' },
  { src: '/images/spot-ellipse-33.png', title: '大理古镇' },
];

export default function HomePage() {
  const [wheelAngle, setWheelAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [lastX, setLastX] = useState(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setLastX(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    setWheelAngle(prev => prev + dx * 0.5);
    setLastX(e.clientX);
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  const count = wheelImages.length;
  const sliceAngle = 360 / count;
  const gapDeg = 8;
  const R = 210;
  const cx = 210;
  const cy = 210;

  return (
    <div className="h-full bg-cream flex flex-col overflow-hidden">
      <div className="px-5 pt-3 pb-1">
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <MapPin size={14} className="text-primary" />
          <span>杭州</span>
          <ChevronRight size={14} />
        </div>
        <SearchBar />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-16">
        {/* Cultural Festivals */}
        <section className="pt-2">
          <div className="flex items-center justify-between mb-2 px-5">
            <h2 className="text-lg font-bold text-[#51463E]">文化节日</h2>
            <Link href="/products" className="text-xs text-gray-400 flex items-center gap-0.5">
              查看全部 <ChevronRight size={12} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-1">
            {festivals.map(festival => (
              <Link href={`/activity/${festival.id}`} key={festival.id} className="flex-shrink-0 w-[56%]">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden group">
                  <Image
                    src={festival.image}
                    alt={festival.title}
                    fill
                    sizes="60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1.5 min-w-[44px] text-center shadow-sm">
                    <div className="text-[10px] text-primary font-medium leading-tight">
                      {festival.dateRange.includes('月') ? festival.dateRange.split(/(\d+-\d+)/)[0] : '4月'}
                    </div>
                    <div className="text-base font-bold text-[#51463E] leading-tight">
                      {festival.dateRange.replace(/^\d+月\s*/, '')}
                    </div>
                  </div>
                </div>
                <div className="mt-1.5">
                  <h3 className="font-semibold text-sm text-[#51463E]">{festival.title}</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">{festival.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trip Recommendation */}
        <section className="px-5 mt-2">
          <h2 className="text-lg font-bold text-[#51463E] mb-2">旅程推荐</h2>
          <Link href="/plan" className="block">
            <div className="relative rounded-2xl overflow-hidden h-[144px]">
              <Image src={tripRecommendation.mapImage} alt="路线地图" fill sizes="100vw" className="object-cover" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 144" preserveAspectRatio="xMidYMid meet">
                <path d="M280,16 C265,28 240,34 225,44 C210,54 195,58 185,68 C175,78 155,86 140,94 C125,102 115,110 105,118 C95,126 85,132 80,138" fill="none" stroke="#C8963E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="280" cy="16" r="4" fill="#C8963E" />
                <circle cx="225" cy="44" r="3" fill="#C8963E" />
                <circle cx="185" cy="68" r="3" fill="#C8963E" />
                <circle cx="140" cy="94" r="3" fill="#C8963E" />
                <circle cx="105" cy="118" r="3" fill="#C8963E" />
                <circle cx="80" cy="138" r="4" fill="#C8963E" />
              </svg>
              <div className="absolute right-0 top-0 bottom-0 w-[110px] bg-white/90 backdrop-blur-sm flex flex-col justify-between px-2.5 py-2.5">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xl font-bold text-[#51463E]">{tripRecommendation.days}</span>
                  <span className="text-gray-400 text-[10px]">天</span>
                </div>
                <div className="space-y-0">
                  <div>
                    <div className="text-[8px] text-gray-400 tracking-wide">From</div>
                    <div className="font-bold text-base text-[#51463E] leading-tight">{tripRecommendation.from}</div>
                  </div>
                  <div className="flex items-center gap-0.5 py-0.5">
                    <div className="w-0.5 h-0.5 rounded-full bg-primary/50" />
                    <div className="w-0.5 h-0.5 rounded-full bg-primary/50" />
                    <div className="w-0.5 h-0.5 rounded-full bg-primary/50" />
                    <div className="flex-1 h-px bg-primary/20" />
                  </div>
                  <div>
                    <div className="text-[8px] text-gray-400 tracking-wide">To</div>
                    <div className="font-bold text-primary text-base leading-tight">{tripRecommendation.to}</div>
                  </div>
                </div>
                <div className="bg-primary text-white text-center text-[10px] py-1.5 rounded-lg font-semibold tracking-wide">
                  制定计划
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Famous Cultural Spots - Rotatable Wheel */}
        <section className="px-5 mt-3 pb-4">
          <h2 className="text-lg font-bold text-[#51463E] mb-2">著名文化景点</h2>
          <div
            className="relative overflow-hidden mx-auto"
            style={{ width: '420px', height: '230px' }}
          >
            <svg className="absolute" style={{ width: 0, height: 0 }}>
              <defs>
                {wheelImages.map((_, i) => {
                  const innerR = 40;
                  const gapW = 6;
                  const halfGapOuter = Math.atan2(gapW / 2, R) * (180 / Math.PI);
                  const halfGapInner = Math.atan2(gapW / 2, innerR) * (180 / Math.PI);
                  const toRad = (d: number) => (d * Math.PI) / 180;

                  const oStart = i * sliceAngle + halfGapOuter;
                  const oEnd = (i + 1) * sliceAngle - halfGapOuter;
                  const iStart = i * sliceAngle + halfGapInner;
                  const iEnd = (i + 1) * sliceAngle - halfGapInner;

                  const ox1 = cx + R * Math.cos(toRad(oStart));
                  const oy1 = cy + R * Math.sin(toRad(oStart));
                  const ox2 = cx + R * Math.cos(toRad(oEnd));
                  const oy2 = cy + R * Math.sin(toRad(oEnd));
                  const ix1 = cx + innerR * Math.cos(toRad(iStart));
                  const iy1 = cy + innerR * Math.sin(toRad(iStart));
                  const ix2 = cx + innerR * Math.cos(toRad(iEnd));
                  const iy2 = cy + innerR * Math.sin(toRad(iEnd));

                  const la = (oEnd - oStart) > 180 ? 1 : 0;
                  const d = [
                    `M${ix1},${iy1}`,
                    `L${ox1},${oy1}`,
                    `A${R},${R} 0 ${la},1 ${ox2},${oy2}`,
                    `L${ix2},${iy2}`,
                    `A${innerR},${innerR} 0 ${la},0 ${ix1},${iy1}`,
                    'Z',
                  ].join(' ');
                  return (
                    <clipPath key={i} id={`wslice-${i}`}>
                      <path d={d} />
                    </clipPath>
                  );
                })}
              </defs>
            </svg>

            <div
              className="absolute touch-none select-none"
              style={{
                width: '420px',
                height: '420px',
                top: '0',
                left: '0',
                transform: `rotate(${wheelAngle}deg)`,
                transition: dragging ? 'none' : 'transform 0.3s ease-out',
                transformOrigin: '210px 210px',
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <div className="absolute rounded-full border-4 border-white shadow-xl" style={{ inset: '0' }} />

              {wheelImages.map((item, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{ clipPath: `url(#wslice-${i})` }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: `rotate(${-wheelAngle}deg)`,
                      transformOrigin: '210px 210px',
                      transition: dragging ? 'none' : 'transform 0.3s ease-out',
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="420px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Center circle - empty, large */}
            <div
              className="absolute z-20 pointer-events-none"
              style={{ left: '50%', top: '210px', transform: 'translate(-50%, -50%)' }}
            >
              <div className="w-16 h-16 rounded-full bg-primary shadow-lg border-3 border-white" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
