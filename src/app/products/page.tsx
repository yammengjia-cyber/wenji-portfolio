'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { useToast } from '@/components/Toast';
import { culturalProducts, productItems } from '@/lib/mockData';

const cardImages = [
  '/images/product-card-2.png',
  '/images/product-card-3.png',
  '/images/product-card-culture.jpg',
  '/images/product-card-guest.png',
  '/images/product-card-4.png',
];

const experiencePhotos = [
  '/images/woodcarving-1.png',
  '/images/woodcarving-2.png',
  '/images/culture-vsre.png',
];

export default function ProductsPage() {
  const { showToast } = useToast();
  const mainProduct = culturalProducts[0];
  const [activeCard, setActiveCard] = useState(2);

  const getCardStyle = (index: number) => {
    const offset = index - activeCard;
    const absOffset = Math.abs(offset);

    const rotation = offset * 8;
    const translateX = offset * 55;
    const translateY = absOffset * 8;
    const scale = absOffset === 0 ? 1 : absOffset === 1 ? 0.9 : 0.8;
    const zIndex = 10 - absOffset;
    const brightness = absOffset === 0 ? 1.05 : absOffset === 1 ? 0.75 : 0.55;
    const opacity = absOffset > 2 ? 0.4 : 1;

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
      zIndex,
      opacity,
      filter: `brightness(${brightness})`,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div className="h-full bg-cream overflow-y-auto pb-16">
      <div className="page-padding pt-3">
        <SearchBar />
      </div>

      {/* Card Stack Gallery */}
      <section className="mt-4">
        <h2 className="section-title mb-4 px-5">文化产品展示</h2>

        {/* 3D Card Stack - like image 4 reference */}
        <div className="relative h-[320px] flex items-center justify-center overflow-hidden">
          {cardImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveCard(i)}
              className="absolute"
              style={getCardStyle(i)}
            >
              <div className={`relative w-[180px] h-[260px] rounded-2xl overflow-hidden bg-white shadow-xl ${
                i === activeCard ? 'ring-2 ring-primary/30' : ''
              }`}>
                <Image
                  src={img}
                  alt={`产品 ${i + 1}`}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-3">
          {cardImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveCard(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeCard ? 'w-3 h-3 bg-primary' : 'w-2 h-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Main Product Detail */}
      <section className="page-padding mt-4">
        <h3 className="text-xl font-bold text-[#51463E]">{mainProduct.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{mainProduct.location}</p>

        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4].map(i => (
            <Star key={i} size={14} className="text-primary fill-primary" />
          ))}
          <Star size={14} className="text-gray-300" />
          <span className="text-sm text-gray-500 ml-1">{mainProduct.rating}</span>
        </div>

        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          {mainProduct.description}
        </p>
      </section>

      {/* Experience Content Section */}
      <section className="page-padding mt-6">
        <h3 className="text-lg font-bold text-[#51463E] mb-3">体验内容</h3>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-2">
          {experiencePhotos.map((photo, i) => (
            <div key={i} className="relative flex-shrink-0 w-[160px] h-[120px] rounded-2xl overflow-hidden bg-gray-200 shadow-sm">
              <Image src={photo} alt={`体验 ${i + 1}`} fill sizes="160px" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Plan Button */}
      <section className="page-padding mt-1">
        <Link href="/chat">
          <div className="gold-button w-full text-center text-base py-3.5">
            制定一个旅行计划
          </div>
        </Link>
      </section>

      {/* Product Grid */}
      <section className="page-padding mt-6 pb-24">
        <h3 className="text-lg font-bold text-[#51463E] mb-3">文化产品</h3>
        <div className="grid grid-cols-2 gap-3">
          {productItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => showToast('已加入收藏', 'success')}
              className="relative h-[130px] rounded-2xl overflow-hidden group animate-fadeIn bg-gray-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="200px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 text-white text-sm font-medium">
                {item.title}
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
