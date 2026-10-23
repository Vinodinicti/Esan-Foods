import React, { useState } from 'react';
import MobileProductCard from './MobileProductCard';
import { ArrowRight } from 'lucide-react';

export default function MobileHomeCards({ 
  products, 
  onAddToCart, 
  onQuickView, 
  onNavigate 
}) {
  // Support both 2*2 (4 cards) and 3*2 (6 cards) formats
  const [format, setFormat] = useState('3x2'); // '2x2' | '3x2'

  const displayCount = format === '2x2' ? 4 : 6;
  const displayedProducts = products.slice(0, displayCount);

  return (
    <section className="w-full px-3 py-6 bg-gradient-to-b from-[#FAF8F5] to-white/60 rounded-3xl border border-[#EFEAE0] my-4 shadow-2xs">
      {/* Header & Format Toggle Row */}
      <div className="flex flex-col gap-2.5 mb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="eyebrow-gold text-[10px] block">
              → HANDCRAFTED NUTRITION ←
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#183B25]">
              Most Loved <span className="text-[#DEA02C]">Mixes</span>
            </h2>
          </div>

          {/* Format Switcher: 2x2 vs 3x2 */}
          <div className="flex items-center gap-1 bg-[#FAF7EE] p-1 rounded-xl border border-[#E8E2D5] shadow-2xs">
            <button
              type="button"
              onClick={() => setFormat('2x2')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                format === '2x2'
                  ? 'bg-[#183B25] text-white shadow-2xs'
                  : 'text-[#183B25]/70 hover:text-[#183B25]'
              }`}
              title="2x2 format (4 small cards)"
            >
              2×2
            </button>
            <button
              type="button"
              onClick={() => setFormat('3x2')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                format === '3x2'
                  ? 'bg-[#183B25] text-white shadow-2xs'
                  : 'text-[#183B25]/70 hover:text-[#183B25]'
              }`}
              title="3x2 format (6 small cards)"
            >
              3×2
            </button>
          </div>
        </div>

        <p className="text-[11px] text-[#556358] font-medium leading-tight">
          Showing <span className="font-bold text-[#183B25]">{displayCount} small cards</span> in {format} mobile format with full labels.
        </p>
      </div>

      {/* 2-Column Mobile Grid (2x2 or 3x2) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 items-stretch">
        {displayedProducts.map((product) => (
          <MobileProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}
      </div>

      {/* View All Button */}
      {onNavigate && (
        <div className="pt-4 text-center">
          <button
            onClick={() => onNavigate('products')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7EE] hover:bg-[#183B25] text-[#183B25] hover:text-white border border-[#E8E2D5] text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs active:scale-98 cursor-pointer"
          >
            <span>Explore All Traditional Products ({products.length})</span>
            <ArrowRight size={13} />
          </button>
        </div>
      )}
    </section>
  );
}
