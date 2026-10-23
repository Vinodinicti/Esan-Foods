import React, { useState } from 'react';
import { ShoppingBag, Star, Eye, Phone, Check } from 'lucide-react';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

export default function ProductCard({ product, onAddToCart, onQuickView }) {
  const [selectedWeight, setSelectedWeight] = useState(product.weight || '250g');
  const [isAdded, setIsAdded] = useState(false);

  const isOutOfStock = product.inStock === false || (product.stockCount !== undefined && Number(product.stockCount) <= 0);
  const isLowStock = !isOutOfStock && product.stockCount !== undefined && Number(product.stockCount) > 0 && Number(product.stockCount) <= 5;

  // Compute price based on selected weight
  const currentPrice = product.priceByWeight && product.priceByWeight[selectedWeight] 
    ? product.priceByWeight[selectedWeight] 
    : product.price;

  const originalPrice = product.originalPrice || Math.round(currentPrice * 1.15);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart({
      ...product,
      selectedWeight,
      price: currentPrice
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group h-full rounded-xl sm:rounded-3xl bg-white p-2.5 sm:p-4 flex flex-col justify-between transition-all duration-300 relative overflow-hidden border border-[#EBE5D8] hover:border-[#183B25]/30 shadow-xs hover:shadow-xl">
      
      {/* Top Section: Expansive Showcase with User Provided Product Image */}
      <div>
        <div 
          onClick={() => onQuickView(product)}
          className="relative w-full aspect-square rounded-lg sm:rounded-2xl bg-[#FAF7EE] flex items-center justify-center p-0 mb-2 sm:mb-3 cursor-pointer transition-all overflow-hidden border border-[#E8E2D5] shadow-xs group-hover:shadow-md shrink-0"
        >
          {/* Floating Category / Bestseller Badge in GolGappa Reference Style */}
          <span className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 z-10 text-[8px] sm:text-[10px] font-black uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-xs bg-[#183B25] text-[#FABD44] border border-[#FABD44]/30 max-w-[70%] truncate">
            ★ {product.tag || 'Traditional'}
          </span>

          {/* Floating Discount Tag in Warm Yellow */}
          {originalPrice > currentPrice && !isOutOfStock && (
            <span className="absolute bottom-1.5 sm:bottom-auto right-1.5 sm:top-2.5 sm:right-2.5 z-10 text-[8px] sm:text-[10px] font-extrabold text-[#183B25] bg-[#FABD44] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-xs border border-[#FABD44]/40 whitespace-nowrap">
              Save ₹{originalPrice - currentPrice}
            </span>
          )}

          {/* Out of Stock Floating Badge */}
          {isOutOfStock && (
            <span className="absolute bottom-1.5 sm:bottom-auto right-1.5 sm:top-2.5 sm:right-2.5 z-10 text-[8px] sm:text-[10px] font-extrabold text-white bg-red-600 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-xs whitespace-nowrap">
              Out of Stock
            </span>
          )}

          {/* Product Packet Image - Fully Fitting Card Edge-to-Edge */}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out ${
              isOutOfStock ? 'grayscale opacity-75' : ''
            }`}
            loading="lazy"
          />

          {/* Hover Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="hidden sm:flex absolute inset-0 m-auto w-28 h-8 bg-white/95 text-[#183B25] font-bold text-[11px] rounded-full items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md hover:scale-105 border border-[#E8E2D5]"
            title="Inspect packet & ingredients"
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>
        </div>

        {/* Clean, Non-bloated Info Section */}
        <div className="space-y-1">
          {/* Category & Star Rating Row */}
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] sm:text-[11px] font-bold text-[#BA7A18] uppercase tracking-wider truncate">
              {product.category || 'Traditional'}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-bold text-[#183B25] shrink-0">
              <Star size={11} className="text-[#FABD44] fill-current" />
              <span>{product.rating || 4.9}</span>
            </div>
          </div>

          {/* Product Title (Editorial Fraunces Serif) */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif text-xs sm:text-base font-bold text-[#183B25] group-hover:text-[#DEA02C] transition-colors leading-snug cursor-pointer line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] break-words"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Key Health Benefit Badge */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="flex items-center gap-1 text-[9px] sm:text-[11px] text-[#183B25] bg-[#FAF7EE] px-1.5 sm:px-2 py-0.5 rounded-md border border-[#E8E2D5] truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#183B25] shrink-0" />
              <span className="font-semibold truncate">{product.benefits[0]}</span>
            </div>
          )}

          {/* Uniform Weight Selector / Pack Size Row */}
          <div className="h-6 sm:h-7 flex items-center">
            {product.weightOptions && product.weightOptions.length > 1 ? (
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                {product.weightOptions.map((wt) => (
                  <button
                    key={wt}
                    type="button"
                    onClick={() => setSelectedWeight(wt)}
                    className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2.5 py-0.5 rounded-md font-bold transition-all cursor-pointer shrink-0 ${
                      selectedWeight === wt
                        ? 'bg-[#183B25] text-white shadow-2xs'
                        : 'bg-[#FAF7EE] text-[#183B25]/80 hover:bg-[#F0EBE0] border border-[#E8E2D5]'
                    }`}
                  >
                    {wt}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-[9px] sm:text-[10px] font-semibold text-[#183B25]/75 bg-[#FAF7EE] px-1.5 sm:px-2 py-0.5 rounded-md border border-[#E8E2D5]">
                Pack: {selectedWeight}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Pinned Action Section - Strict Equal Height & Alignment */}
      <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-[#EBE5D8] space-y-1.5 sm:space-y-2">
        {/* Price Row */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1 sm:gap-1.5">
            <span className="font-serif text-base sm:text-xl font-extrabold text-[#183B25]">
              ₹{currentPrice}
            </span>
            {originalPrice > currentPrice && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through font-medium">
                ₹{originalPrice}
              </span>
            )}
          </div>
          {isOutOfStock ? (
            <span className="text-[9px] sm:text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="text-[9px] sm:text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 animate-pulse">
              Only {product.stockCount} left
            </span>
          ) : (
            <span className="text-[9px] sm:text-[10px] font-bold text-[#183B25] hidden min-[380px]:flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FABD44]"></span>
              Fresh Milled
            </span>
          )}
        </div>

        {/* Buttons - Strictly Aligned & Zero Overlap */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Main Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex-1 h-8 sm:h-9.5 px-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 shadow-sm ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                : isAdded 
                  ? 'bg-[#183B25] text-[#FABD44] cursor-pointer active:scale-95' 
                  : 'bg-[#183B25] hover:bg-[#235033] text-white cursor-pointer active:scale-95'
            }`}
          >
            {isOutOfStock ? (
              <span>Out of Stock</span>
            ) : isAdded ? (
              <>
                <Check size={13} className="stroke-[3]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span className="sm:hidden">Add</span>
                <span className="hidden sm:inline">Add to Cart</span>
              </>
            )}
          </button>

          {/* Quick WhatsApp Order Button - Square Icon Button to Prevent Text Crushing */}
          <a
            href={getProductWhatsAppUrl(product, selectedWeight)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-9.5 sm:h-9.5 rounded-lg sm:rounded-xl bg-[#FABD44]/25 hover:bg-[#FABD44] text-[#183B25] border border-[#FABD44]/60 transition-all duration-200 flex items-center justify-center active:scale-95 text-center shadow-2xs shrink-0"
            title="Order instantly on WhatsApp"
            aria-label="Order on WhatsApp"
          >
            <Phone size={13} className="fill-current" />
          </a>
        </div>
      </div>

    </div>
  );
}
