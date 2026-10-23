import React from 'react';
import MobileProductCard from './MobileProductCard';
import { ArrowRight } from 'lucide-react';

export default function MobileHomeCards({ 
  products, 
  onAddToCart, 
  onQuickView, 
  onNavigate 
}) {
  const displayedProducts = products.slice(0, 6);

  return (
    <section className="w-full px-3 py-5 bg-gradient-to-b from-[#FAF8F5] to-white/60 rounded-3xl border border-[#EFEAE0] my-4 shadow-2xs">
      {/* Clean Header */}
      <div className="mb-3.5 text-center">
        <span className="eyebrow-gold text-[10px] block mb-0.5">
          → HANDCRAFTED NUTRITION ←
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#183B25]">
          Most Loved <span className="text-[#DEA02C]">Mixes</span>
        </h2>
      </div>

      {/* 2-Column Mobile Grid */}
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
        <div className="pt-3.5 text-center">
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
