import React, { useState } from 'react';
import { ShoppingBag, Star, Phone, Check } from 'lucide-react';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

export default function MobileProductCard({ product, onAddToCart, onQuickView }) {
  const [selectedWeight, setSelectedWeight] = useState(product.weight || '250g');
  const [isAdded, setIsAdded] = useState(false);

  // Compute price based on selected weight
  const currentPrice = product.priceByWeight && product.priceByWeight[selectedWeight] 
    ? product.priceByWeight[selectedWeight] 
    : product.price;

  const originalPrice = product.originalPrice || Math.round(currentPrice * 1.15);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      selectedWeight,
      price: currentPrice
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div 
      className="group h-full rounded-2xl bg-white border border-[#E8E2D5] p-2.5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200 relative overflow-hidden"
    >
      {/* Top Section: Compact Image & Overlays */}
      <div>
        <div 
          onClick={() => onQuickView(product)}
          className="relative w-full aspect-square max-h-36 rounded-xl bg-gradient-to-b from-[#FAF8F5] to-white p-2 flex items-center justify-center overflow-hidden border border-[#F0EBE0] cursor-pointer mb-2"
        >
          {/* Floating Small Tag */}
          <span className={`absolute top-1.5 left-1.5 z-10 text-[8px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md shadow-2xs ${
            product.tagColor || 'bg-[#183B25] text-white'
          }`}>
            {product.tag || 'Traditional'}
          </span>

          {/* Floating Discount Tag */}
          {originalPrice > currentPrice && (
            <span className="absolute top-1.5 right-1.5 z-10 text-[8px] font-bold text-[#DC2626] bg-white/95 px-1.5 py-0.5 rounded-md border border-red-100 shadow-2xs">
              Save ₹{originalPrice - currentPrice}
            </span>
          )}

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-auto h-full max-h-[88%] object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Info Section - Clean, Compact, Absolutely NO '...' ellipsis */}
        <div className="space-y-1">
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] font-bold text-[#BA7A18] uppercase tracking-wider">
              {product.category || 'Traditional'}
            </span>
            <div className="flex items-center gap-0.5 text-[10px] font-bold text-[#183B25] shrink-0">
              <Star size={10} className="text-[#FABD44] fill-current" />
              <span>{product.rating || 4.9}</span>
            </div>
          </div>

          {/* Full Product Name - Complete text, NO '...' truncation */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif text-xs font-bold text-[#183B25] group-hover:text-[#DEA02C] transition-colors leading-snug cursor-pointer break-words"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Weight Options / Pack Badge (No truncation) */}
          <div className="pt-0.5 flex items-center gap-1 flex-wrap">
            {product.weightOptions && product.weightOptions.length > 1 ? (
              product.weightOptions.map((wt) => (
                <button
                  key={wt}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedWeight(wt);
                  }}
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold transition-all ${
                    selectedWeight === wt
                      ? 'bg-[#183B25] text-white'
                      : 'bg-[#FAF7EE] text-[#183B25]/80 border border-[#E8E2D5]'
                  }`}
                >
                  {wt}
                </button>
              ))
            ) : (
              <span className="text-[9px] font-semibold text-gray-500 bg-[#FAF7EE] px-1.5 py-0.5 rounded border border-[#E8E2D5]">
                {selectedWeight}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Pinned Price & Action Buttons */}
      <div className="mt-2.5 pt-2 border-t border-[#F0EBE0] space-y-1.5">
        {/* Price Row */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-sm sm:text-base font-extrabold text-[#183B25]">
              ₹{currentPrice}
            </span>
            {originalPrice > currentPrice && (
              <span className="text-[10px] text-gray-400 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
          <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">
            In Stock
          </span>
        </div>

        {/* Small Touch Buttons Grid */}
        <div className="flex items-center gap-1.5">
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`flex-1 h-8 rounded-lg text-[11px] font-bold transition-all duration-200 flex items-center justify-center gap-1 active:scale-95 cursor-pointer shadow-2xs ${
              isAdded 
                ? 'bg-[#10B981] text-white' 
                : 'bg-[#183B25] hover:bg-[#235334] text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={12} className="stroke-[3]" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={12} />
                <span>Add</span>
              </>
            )}
          </button>

          {/* WhatsApp Instant Order Button */}
          <a
            href={getProductWhatsAppUrl(product, selectedWeight)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/30 transition-all duration-200 flex items-center justify-center active:scale-95 shrink-0 shadow-2xs"
            title="Order on WhatsApp"
          >
            <Phone size={12} className="fill-current" />
          </a>
        </div>
      </div>
    </div>
  );
}
