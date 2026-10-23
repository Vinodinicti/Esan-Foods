import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Phone, 
  Check,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedWeight, setSelectedWeight] = useState(product?.weight || '250g');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const isOutOfStock = product.inStock === false || (product.stockCount !== undefined && Number(product.stockCount) <= 0);

  const currentPrice = product.priceByWeight && product.priceByWeight[selectedWeight] 
    ? product.priceByWeight[selectedWeight] 
    : product.price;

  const originalPrice = product.originalPrice || Math.round(currentPrice * 1.15);
  const savings = (originalPrice - currentPrice) * quantity;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    onAddToCart({
      ...product,
      selectedWeight,
      price: currentPrice,
      quantity
    });
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1100);
  };

  // Top 3 key benefits only (clean & punchy)
  const keyHighlights = product.benefits ? product.benefits.slice(0, 3) : [];
  
  // Clean ingredients summary
  const ingredientsSummary = product.subtitle || (product.ingredients ? product.ingredients.slice(0, 5).join(', ') : '');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm sm:max-w-lg md:max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#E8E2D5] my-auto max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/95 hover:bg-[#FAF7EE] text-[#183B25] border border-[#E8E2D5] flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={15} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          
          {/* Left Column: Visual Packet Showcase */}
          <div className="md:col-span-5 bg-[#FAF7EE] p-3 sm:p-5 md:p-7 flex flex-col justify-between items-center text-center border-b md:border-b-0 md:border-r border-[#E8E2D5]">
            <div className="w-full flex items-center justify-between pr-8 md:pr-0">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#183B25] text-[#FABD44] shadow-2xs">
                ★ {product.tag || 'Traditional'}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#183B25] flex items-center gap-1">
                <ShieldCheck size={13} className="text-[#BA7A18]" />
                <span>Stone Milled</span>
              </span>
            </div>

            {/* Display Image (Scaled neatly on mobile) */}
            <div className="relative w-24 h-24 sm:w-36 sm:h-36 md:w-52 md:h-52 my-1 sm:my-3 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="flex items-center gap-1 text-[9px] sm:text-[11px] font-bold text-[#183B25]/80 bg-white/90 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#E8E2D5]">
              <Truck size={12} className="text-[#BA7A18]" />
              <span>Fresh Batch • Zero Preservatives</span>
            </div>
          </div>

          {/* Right Column: Key Details & Fast Ordering */}
          <div className="md:col-span-7 p-3.5 sm:p-5 md:p-7 flex flex-col justify-between space-y-2.5 sm:space-y-3.5">
            
            {/* Header: Title, Tamil Name, Category & Rating */}
            <div className="space-y-0.5 sm:space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#BA7A18]">
                  {product.category || 'Traditional Food'}
                </span>
                <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#183B25]">
                  <Star size={12} className="text-[#FABD44] fill-[#FABD44]" />
                  <span>{product.rating || 5.0}</span>
                  <span className="text-gray-400 font-normal">({product.reviewCount || 128})</span>
                </div>
              </div>

              <h2 className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#183B25] leading-snug">
                {product.name}
              </h2>
              {product.tamilName && (
                <p className="text-[11px] sm:text-xs font-bold text-[#BA7A18]">
                  {product.tamilName}
                </p>
              )}
            </div>

            {/* Price & Savings Pill */}
            <div className="flex items-baseline justify-between py-1 sm:py-1.5 border-y border-[#EBE5D8]">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-lg sm:text-2xl font-extrabold text-[#183B25]">
                  ₹{currentPrice * quantity}
                </span>
                {originalPrice > currentPrice && (
                  <span className="text-xs sm:text-sm text-gray-400 line-through font-medium">
                    ₹{originalPrice * quantity}
                  </span>
                )}
                {savings > 0 && (
                  <span className="text-[10px] sm:text-[11px] font-black text-[#183B25] bg-[#FABD44] px-2 py-0.5 rounded-full shadow-2xs">
                    Save ₹{savings}
                  </span>
                )}
              </div>
              <span className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                isOutOfStock ? 'text-red-700 bg-red-50' : 'text-emerald-700 bg-emerald-50'
              }`}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>

            {/* Pack Size / Net Weight Options */}
            {product.weightOptions && product.weightOptions.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                  Select Pack Size:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {product.weightOptions.map((wt) => {
                    const wtPrice = product.priceByWeight?.[wt] || currentPrice;
                    const isSelected = selectedWeight === wt;
                    return (
                      <button
                        key={wt}
                        type="button"
                        onClick={() => setSelectedWeight(wt)}
                        className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#183B25] text-white shadow-xs'
                            : 'bg-[#FAF7EE] text-[#183B25] hover:bg-[#F0EBE0] border border-[#E8E2D5]'
                        }`}
                      >
                        {wt} <span className={isSelected ? 'text-[#FABD44]' : 'text-gray-500 font-normal'}>(₹{wtPrice})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Key Benefits (Concise 2-3 bullet items only) */}
            {keyHighlights.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                  Key Health Benefits:
                </span>
                <div className="space-y-1">
                  {keyHighlights.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#183B25] bg-[#FAF7EE] px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl border border-[#E8E2D5]/70">
                      <Check size={11} className="text-[#183B25] stroke-[2.5] shrink-0" />
                      <span className="font-medium leading-tight truncate">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Blend / Ingredients (One clean summary line) */}
            {ingredientsSummary && (
              <div className="text-[10px] sm:text-[11px] text-gray-600 bg-[#FAF7EE] px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-[#E8E2D5]">
                <strong className="text-[#183B25] font-bold">Key Blend: </strong>
                <span>{ingredientsSummary}</span>
              </div>
            )}

            {/* Bottom Actions Row */}
            <div className="pt-2 border-t border-[#EBE5D8] space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2">
                {/* Quantity */}
                <div className="flex items-center border border-[#E8E2D5] rounded-xl bg-[#FAF7EE] overflow-hidden shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isOutOfStock}
                    className="w-7 sm:w-8 h-8 sm:h-9 flex items-center justify-center font-bold text-[#183B25] hover:bg-[#EAE4D7] transition-colors cursor-pointer disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="w-7 sm:w-8 text-center font-bold text-xs text-[#183B25]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isOutOfStock}
                    className="w-7 sm:w-8 h-8 sm:h-9 flex items-center justify-center font-bold text-[#183B25] hover:bg-[#EAE4D7] transition-colors cursor-pointer disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-md ${
                    isOutOfStock
                      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      : addedSuccess
                        ? 'bg-[#183B25] text-[#FABD44] active:scale-95 cursor-pointer'
                        : 'bg-[#183B25] hover:bg-[#235033] text-white active:scale-95 cursor-pointer'
                  }`}
                >
                  <ShoppingBag size={14} />
                  <span>
                    {isOutOfStock 
                      ? 'Out of Stock' 
                      : addedSuccess 
                        ? 'Added to Bag!' 
                        : `Add to Cart • ₹${currentPrice * quantity}`}
                  </span>
                </button>
              </div>

              {/* Direct WhatsApp Order */}
              <a
                href={getProductWhatsAppUrl(product, selectedWeight)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 sm:py-2 px-3 rounded-xl font-bold text-xs bg-[#FABD44]/25 hover:bg-[#FABD44] text-[#183B25] border border-[#FABD44]/60 flex items-center justify-center gap-1.5 transition-all text-center shadow-2xs cursor-pointer"
              >
                <Phone size={12} className="fill-current" />
                <span>Instant WhatsApp Order</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
