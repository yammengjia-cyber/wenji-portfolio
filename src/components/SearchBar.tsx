'use client';

import { Search } from 'lucide-react';

export default function SearchBar({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 px-4 py-2.5 shadow-sm">
        <span className="text-sm text-primary/60 flex-1">Searching</span>
        <Search size={16} className="text-primary/60" />
      </div>
    </div>
  );
}
