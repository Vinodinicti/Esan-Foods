import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Heart, 
  Sparkles, 
  Truck, 
  Leaf, 
  Award, 
  Clock, 
  Flame,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Eye,
  Check
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import MobileHomeCards from '../components/MobileHomeCards';
import { ESAN_WHATSAPP_NUMBER, getProductWhatsAppUrl } from '../utils/whatsapp';
import { 
  StoneMillIcon, 
  PureOrganicLeafIcon, 
  ImmunityShieldIcon, 
  DoorstepDeliveryIcon 
} from '../components/Icons';

export default function HomePage({ 
  products, 
  onAddToCart, 
  onQuickView, 
  onSelectCategory, 
  onNavigate 
}) {
  const valuePillars = [
    {
      id: 'cold-stone-milled',
      title: 'Cold Stone Milled',
      desc: 'Maximum Nutrition',
      image: '/brand/pillars/cold_stone_milled.jpg',
      imageFit: 'object-cover object-center',
      cardBg: 'bg-[#FFF3E0]',
      icon: <StoneMillIcon size={30} className="text-[#B45309]" />
    },
    {
      id: 'no-preservatives',
      title: 'No Preservatives',
      desc: '100% Traditional',
      image: '/brand/pillars/no_preservatives.png',
      imageFit: 'object-contain p-4 pb-14',
      cardBg: 'bg-white',
      icon: <PureOrganicLeafIcon size={30} className="text-[#1E4D2B]" />
    },
    {
      id: 'rich-in-vitamins',
      title: 'Rich in Vitamins',
      desc: 'Boosts Immunity',
      image: '/brand/pillars/rich_vitamins.jpg',
      imageFit: 'object-cover object-center',
      cardBg: 'bg-white',
      icon: <ImmunityShieldIcon size={30} className="text-[#BE185D]" />
    },
    {
      id: 'delivered-fresh',
      title: 'Delivered Fresh',
      desc: 'At Your Doorstep',
      image: '/brand/pillars/delivered_fresh.png',
      imageFit: 'object-cover object-center',
      cardBg: 'bg-[#F4ECE1]',
      icon: <DoorstepDeliveryIcon size={30} className="text-[#0284C7]" />
    },
    {
      id: 'zero-white-sugar',
      title: 'Zero White Sugar',
      desc: 'Pure Palm Jaggery',
      image: '/brand/pillars/zero_sugar.jpg',
      imageFit: 'object-cover object-[55%_65%]',
      cardBg: 'bg-[#FFF8E1]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#C2410C]" fill="none" stroke="currentColor" strokeWidth="1.8">
          <ellipse cx="12" cy="16" rx="7" ry="3.5" fill="currentColor" fillOpacity="0.2" />
          <path d="M5 16c1-5 4-8 7-8s6 3 7 8" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" />
        </svg>
      )
    }
  ];

  const boostCategories = [
    {
      id: 'Traditional Health Mixes',
      name: 'Stamina & Muscle',
      image: '/products/mens_health_mix.jpg',
      tag: "Men's Mix"
    },
    {
      id: "Women's Care",
      name: "Women's Care",
      image: '/products/womens_health_mix.jpg',
      tag: "Hormone Care"
    },
    {
      id: 'Traditional Health Mixes',
      name: 'Bone Strength',
      image: '/products/bone_strong_mix.jpg',
      tag: "Bamboo Rice"
    },
    {
      id: 'Traditional Health Mixes',
      name: 'Sugar Control',
      image: '/products/sugar_control_mix.jpg',
      tag: "Low Glycemic"
    },
    {
      id: 'Herbal Soups & Podis',
      name: 'Pirandai Combos',
      image: '/products/pirandai_satham_podi_card.jpg',
      tag: "Bone Healing"
    },
    {
      id: 'Herbal Soups & Podis',
      name: 'Moringa Immunity',
      image: '/products/murungai_keerai_podi_card.jpg',
      tag: "Farm Keerai"
    }
  ];

  const customerReviews = [
    {
      id: 1,
      name: "Kavitha Rajendran",
      city: "Coimbatore",
      avatarBg: "bg-[#183B25]",
      initials: "KR",
      product: "Women's Hormonal Care Mix",
      rating: 5,
      time: "Verified Buyer • 3 days ago",
      text: "I started taking the women's health mix after my sister recommended it. The taste is very natural with no artificial smell. Within a month I feel much more energetic and less tired throughout the day."
    },
    {
      id: 2,
      name: "Murugan Annamalai",
      city: "Madurai",
      avatarBg: "bg-[#BA7A18]",
      initials: "MA",
      product: "Traditional Sathu Maavu",
      rating: 5,
      time: "Verified Buyer • 1 week ago",
      text: "Reminds me of my mother's homemade kanji from our village. My two school-going sons drink it every morning with country palm jaggery. Very good quality and clean packing."
    },
    {
      id: 3,
      name: "Meenakshi Sundaram",
      city: "Chennai",
      avatarBg: "bg-[#183B25]",
      initials: "MS",
      product: "Dry Fruit & Seed Protein Laddus",
      rating: 5,
      time: "Verified Buyer • 5 days ago",
      text: "Zero white sugar laddus are truly 100% natural. The sweetness from dates and nuts is perfect for evening tea time. Delivered to my flat in Chennai in just two days."
    },
    {
      id: 4,
      name: "Priya Senthil",
      city: "Tiruchirappalli",
      avatarBg: "bg-[#BA7A18]",
      initials: "PS",
      product: "Sprouted Ragi Baby Porridge",
      rating: 5,
      time: "Verified Buyer • 2 weeks ago",
      text: "My 10-month-old baby loves this porridge. No stomach bloating or gas issues because the ragi is fully sprouted. I order two packets every month regularly."
    },
    {
      id: 5,
      name: "Selvaraj Muthukumar",
      city: "Salem",
      avatarBg: "bg-[#183B25]",
      initials: "SM",
      product: "Bone Strong Mix (Bamboo Rice)",
      rating: 5,
      time: "Verified Buyer • 1 week ago",
      text: "I work long hours standing and had knee stiffness. Drinking this traditional bamboo rice mix with warm buttermilk has helped me feel much stronger and active."
    },
    {
      id: 6,
      name: "Deepa Karthikeyan",
      city: "Tirunelveli",
      avatarBg: "bg-[#BA7A18]",
      initials: "DK",
      product: "Moringa Herbal Soup Mix",
      rating: 5,
      time: "Verified Buyer • 4 days ago",
      text: "Very refreshing pepper and moringa taste. Whenever anyone has a cold in our family we prepare this hot soup. Ordering on WhatsApp was so easy and quick."
    }
  ];

  // The 5 authentic herbal podis for the Coverflow showcase matching reference image
  const herbalPodisList = [
    products.find(p => p.id === 'esan-murungai-podi'),
    products.find(p => p.id === 'esan-mudakathan-podi'),
    products.find(p => p.id === 'esan-pirandai-satham-podi'), // Center highlighted bestseller
    products.find(p => p.id === 'esan-vallarai-podi'),
    products.find(p => p.id === 'esan-pirandai-thuvaiyal')
  ].filter(Boolean);

  const [activePodiIndex, setActivePodiIndex] = useState(2);
  const [addedPodiId, setAddedPodiId] = useState(null);
  const [likedPodis, setLikedPodis] = useState({});

  return (
    <div className="space-y-8 sm:space-y-12 lg:space-y-16 pb-16">
      
      {/* 1. HERO SECTION (Edge-to-Edge Background Image, No Cards or Extra Details) */}
      <section 
        className="relative w-full h-[350px] sm:h-[420px] md:h-screen md:max-h-screen overflow-hidden bg-cover bg-center sm:bg-[length:100%_100%] bg-no-repeat border-b border-[#E8E2D5] bg-[#F5EFE6] flex items-center justify-center"
        style={{ backgroundImage: "url('/brand/hero_banner.jpg')" }}
      >
        <h1 className="sr-only">
          Esan Foods - Pure Food, Ancestral Health &amp; Honest Taste
        </h1>
      </section>

      {/* 2. VALUE PROPOSITION STRIP (Small, Compact Capsule Cards on Mobile) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-20">
        <div className="rounded-2xl sm:rounded-3xl lg:rounded-[40px] bg-gradient-to-b from-[#EBF7EE] to-[#E1F2E5] p-3 sm:p-5 lg:p-8 border border-[#C8E6C9] shadow-lg relative overflow-hidden">
          
          {/* Subtle Ambient Mandala Line Art Watermark */}
          <div className="absolute -top-16 -right-16 w-56 h-56 pointer-events-none opacity-[0.07] text-[#1E4D2B] select-none">
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="100" cy="100" r="90" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="70" />
              <circle cx="100" cy="100" r="50" />
              <circle cx="100" cy="100" r="30" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line key={deg} x1="100" y1="10" x2="100" y2="190" transform={`rotate(${deg} 100 100)`} />
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 lg:gap-4 items-stretch justify-items-center relative z-10">
            {valuePillars.map((item, idx) => (
              <div 
                key={item.id}
                className={`relative w-full max-w-[165px] sm:max-w-[205px] h-[145px] sm:h-[200px] lg:h-[275px] rounded-2xl sm:rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group ${item.cardBg} border-2 border-white/90 select-none ${
                  idx === 4 ? 'col-span-2 sm:col-span-1 max-w-[165px]' : ''
                }`}
              >
                {/* Full Card Image (filling the card completely) */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className={`w-full h-full ${item.imageFit} group-hover:scale-106 transition-transform duration-500`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden items-center justify-center w-full h-full">
                  {item.icon}
                </div>

                {/* Bottom Frosted Gradient Overlay with Title & Description - Small on mobile */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-6 sm:pt-10 pb-2 sm:pb-3.5 px-1.5 sm:px-2.5 text-center pointer-events-none">
                  <h4 className="font-serif font-bold text-[11px] sm:text-xs lg:text-[13px] text-gray-900 group-hover:text-[#1E4D2B] transition-colors leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[9px] sm:text-[10px] lg:text-[11px] text-emerald-800 font-semibold leading-tight mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CHOOSE YOUR BOOST (Auto-Scrolling Marquee) */}
      <section className="w-full py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <span className="eyebrow-gold block mb-1">
            → DISCOVER YOUR BOOST ←
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183B25]">
            Choose Your Daily Nourishment
          </h2>
        </div>

        {/* Auto-scrolling Infinite Marquee Row */}
        <div className="relative w-full overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF7EE] via-[#FAF7EE]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF7EE] via-[#FAF7EE]/80 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex items-center gap-8 sm:gap-12 py-3 px-4">
            {[...boostCategories, ...boostCategories].map((cat, idx) => (
              <div
                key={`${cat.name}-${idx}`}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onNavigate('products');
                }}
                className="flex flex-col items-center text-center cursor-pointer group/item shrink-0 select-none transition-transform duration-300 hover:scale-105"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1.5 shadow-md border-2 border-[#E8E2D5] group-hover/item:border-[#FABD44] group-hover/item:shadow-xl transition-all duration-300 overflow-hidden flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full group-hover/item:scale-110 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#183B25] group-hover/item:text-[#DEA02C] transition-colors mt-2.5 whitespace-nowrap">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS ("Our Most Loved Health Mixes") */}
      {/* Mobile Dedicated View: Small cards in 2*2 or 3*2 formats, No '...' */}
      <div className="block md:hidden max-w-7xl mx-auto px-4">
        <MobileHomeCards
          products={products}
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
          onNavigate={onNavigate}
        />
      </div>

      {/* Desktop & Tablet View: 4-Column Grid */}
      <section className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="eyebrow-gold block">
            → HANDCRAFTED NUTRITION ←
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183B25]">
            Our Most Loved <span className="text-[#DEA02C]">Health Mixes</span>
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* 4.5 TRADITIONAL HERBAL REMEDIES (5-Card Coverflow Carousel matching user's reference image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-6">
        
        {/* Section Header (matching reference layout & typography) */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
          <span className="eyebrow-gold block">
            → BOTANICAL WELLNESS • உணவே மருந்து ←
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183B25] tracking-tight">
            Traditional Herbal Rice Podis & Thuvaiyal
          </h2>
          <p className="text-xs sm:text-sm text-[#556358] leading-relaxed max-w-lg mx-auto font-medium">
            Grandmother's daily botanical medicine served on hot steaming rice with cold-pressed gingelly oil.
          </p>
        </div>

        {/* 5 Compact Cards Grid - All 5 Cards Fit in Page Side-by-Side (No details, Main Heading only) */}
        <div className="relative">
          
          {/* Floating Left Arrow (cycles highlighted card) */}
          <button
            onClick={() => setActivePodiIndex((prev) => (prev === 0 ? herbalPodisList.length - 1 : prev - 1))}
            className="hidden xl:flex absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white hover:bg-[#FAF7EE] text-gray-700 hover:text-[#183B25] border border-[#E8E2D5] shadow-md items-center justify-center transition-all active:scale-90 cursor-pointer"
            aria-label="Previous Product"
          >
            <ChevronLeft size={18} />
          </button>

          {/* 5 Cards Row - Fits 5 on Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-3.5 items-stretch py-2">
            {herbalPodisList.map((product, idx) => {
              const isActive = idx === activePodiIndex;
              const badgeLabels = ["NEW", "TRENDING", "BEST SELLER", "POPULAR", "NEW"];
              const badgeText = badgeLabels[idx] || "POPULAR";
              const isLiked = likedPodis[product.id];
              const isAdded = addedPodiId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => setActivePodiIndex(idx)}
                  className={`rounded-2xl sm:rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between p-3 sm:p-3.5 select-none cursor-pointer relative ${
                    isActive
                      ? 'shadow-xl border-[#FABD44]/70 ring-1 ring-[#FABD44]/40 scale-[1.02] z-10'
                      : 'shadow-xs hover:shadow-md border-[#EBE5D8] opacity-90 hover:opacity-100 hover:border-gray-300'
                  }`}
                >
                  {/* Top Badge & Wishlist Heart */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FAF7EE] text-[#BA7A18] border border-[#E8E2D5]">
                      {badgeText}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLikedPodis(prev => ({ ...prev, [product.id]: !prev[product.id] }));
                      }}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-red-500 cursor-pointer"
                      title="Add to Wishlist"
                    >
                      <Heart size={14} className={isLiked ? "fill-red-500 text-red-500" : ""} />
                    </button>
                  </div>

                  {/* Compact Product Image Area */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="relative w-full aspect-square rounded-xl sm:rounded-2xl bg-[#FAF8F5] p-2 flex items-center justify-center overflow-hidden mb-1.5 border border-[#EFEAE0]/80 group/img"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-300 group-hover/img:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* 3 Pagination Dots below Image (like reference image) */}
                  <div className="flex items-center justify-center gap-1 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BA8C59]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5DFD1]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5DFD1]"></span>
                  </div>

                  {/* Main Heading ONLY - Full text without '...' */}
                  <div className="mt-1 flex-1 flex items-center justify-center text-center min-h-[2rem]">
                    <h3 className="font-serif font-bold text-xs sm:text-[13px] text-[#183B25] leading-tight break-words">
                      {product.name}
                    </h3>
                  </div>

                  {/* Star Rating Row */}
                  <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-gray-700 py-1">
                    <Star size={11} className="text-[#FABD44] fill-[#FABD44]" />
                    <span>{product.rating || 5.0}</span>
                    <span className="text-gray-400 font-normal">({product.reviewCount || 94})</span>
                  </div>

                  {/* Bottom Price & Button Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#F0EBE0] mt-1 gap-1">
                    <span className="font-serif text-sm sm:text-lg font-extrabold text-[#183B25] shrink-0">
                      ₹{product.price}
                    </span>

                    {isActive ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                          setAddedPodiId(product.id);
                          setTimeout(() => setAddedPodiId(null), 1500);
                        }}
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-bold text-[10px] sm:text-[11px] flex items-center gap-1 transition-all shadow-2xs active:scale-95 cursor-pointer shrink-0 ${
                          isAdded
                            ? 'bg-[#183B25] text-[#FABD44]'
                            : 'bg-[#BA8C59] hover:bg-[#A87B49] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={11} className="stroke-[3]" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={11} />
                            <span className="sm:hidden">Add</span>
                            <span className="hidden sm:inline">Add to Cart</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                          setAddedPodiId(product.id);
                          setTimeout(() => setAddedPodiId(null), 1500);
                        }}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FAF7EE] hover:bg-[#BA8C59] hover:text-white text-[#BA8C59] border border-[#E8E2D5] flex items-center justify-center transition-all active:scale-90 shadow-2xs cursor-pointer shrink-0"
                        title="Add to Cart"
                      >
                        <ShoppingBag size={13} />
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Floating Right Arrow (cycles highlighted card) */}
          <button
            onClick={() => setActivePodiIndex((prev) => (prev === herbalPodisList.length - 1 ? 0 : prev + 1))}
            className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white hover:bg-[#FAF7EE] text-gray-700 hover:text-[#183B25] border border-[#E8E2D5] shadow-md items-center justify-center transition-all active:scale-90 cursor-pointer"
            aria-label="Next Product"
          >
            <ChevronRight size={18} />
          </button>

        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-4">
          {herbalPodisList.map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePodiIndex(i)}
              className={`transition-all duration-300 cursor-pointer ${
                i === activePodiIndex
                  ? 'w-5 h-1.5 rounded-full bg-[#BA8C59]'
                  : 'w-1.5 h-1.5 rounded-full bg-[#DCD6C8] hover:bg-[#BA8C59]/60'
              }`}
              aria-label={`Select product ${i + 1}`}
            />
          ))}
        </div>

        {/* Catalog Navigation Button */}
        <div className="text-center pt-8">
          <button
            onClick={() => onNavigate('products')}
            className="btn-pill-green text-xs uppercase tracking-wider group"
          >
            <span>Explore All 10 Authentic Products in Catalog</span>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>

      </section>

      {/* 4.75 HOW IT WORKS (Full Bleed Lighter Green, Compact & Sleek Format) */}
      <section className="w-full bg-[#245E38] text-white py-6 sm:py-8 border-y border-[#2E7446] shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-1 mb-4 sm:mb-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FABD44]">
              → HOW IT WORKS ←
            </span>
            <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight">
              Fresh Stone Ground From Our Mill to Your Kitchen
            </h3>
          </div>

          {/* 4 Steps Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
            {[
              { num: 1, title: 'Choose Mix', desc: 'Select authentic blends' },
              { num: 2, title: 'Stone Milled', desc: 'Ground in small batches' },
              { num: 3, title: 'Quick Delivery', desc: 'Airtight direct courier' },
              { num: 4, title: 'Pure Health', desc: 'Nourish your family' }
            ].map((st) => (
              <div 
                key={st.num} 
                className="bg-white/10 hover:bg-white/15 rounded-xl p-3 sm:p-3.5 border border-white/15 hover:border-[#FABD44]/60 text-center space-y-1.5 transition-all group backdrop-blur-xs"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FABD44] text-[#183B25] font-serif font-black text-xs flex items-center justify-center mx-auto shadow-2xs group-hover:scale-105 transition-transform">
                  {st.num}
                </div>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-white leading-tight">
                  {st.title}
                </h4>
                <p className="text-[11px] text-[#D8EADB] leading-snug">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Understated Bulk Inquiry Footer */}
          <div className="mt-4 pt-3 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-center text-[11px] text-white/80">
            <span>Planning a family function, wedding, or bulk order?</span>
            <a
              href={`https://wa.me/${ESAN_WHATSAPP_NUMBER}?text=${encodeURIComponent("Vanakkam Esan Foods! I would like to enquire about bulk/event orders.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FABD44] hover:text-white font-bold underline transition-colors inline-flex items-center gap-1"
            >
              Custom Event Packs on WhatsApp →
            </a>
          </div>

        </div>
      </section>

      {/* 5. SUBSCRIBE & SAVE (Warm Golden Amber Banner like 'Add Some Chatpata to Your Day!') */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#DF9B28] via-[#EAA832] to-[#D58C18] text-[#183B25] p-4 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden border border-[#E5A329]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-2 sm:space-y-3.5">
              <span className="eyebrow-gold text-[#183B25] text-[9px] sm:text-[11px] font-extrabold">
                → MONTHLY FAMILY SUBSCRIPTION ←
              </span>
              <h2 className="font-serif text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#183B25] leading-snug">
                Subscribe & Save 10% on Family Packs!
              </h2>
              <p className="text-[11px] sm:text-xs text-[#183B25]/90 max-w-md leading-relaxed font-medium">
                Get fresh stone-ground health mixes and protein laddus delivered to your doorstep every month with zero delivery fee.
              </p>

              {/* Quick WhatsApp Subscription Button */}
              <div className="pt-1 sm:pt-2">
                <a
                  href={`https://wa.me/${ESAN_WHATSAPP_NUMBER}?text=${encodeURIComponent("Vanakkam Esan Foods! I would like to subscribe to monthly family health pack for 10% discount.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#183B25] hover:bg-[#224E32] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Phone size={12} className="shrink-0" />
                  <span>Subscribe on WhatsApp • 10% Off</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-[#183B25]/90 pt-0.5 font-bold">
                <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md">
                  <CheckCircle2 size={11} className="text-[#183B25]" /> Easy to Pause
                </span>
                <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md">
                  <CheckCircle2 size={11} className="text-[#183B25]" /> Cancel Anytime
                </span>
                <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md">
                  <CheckCircle2 size={11} className="text-[#183B25]" /> Free Delivery
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center sm:justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/products/mens_health_mix.jpg"
                  alt="Esan Foods Traditional Health Packets"
                  className="w-28 h-28 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-xl sm:rounded-2xl shadow-md object-cover border-2 sm:border-4 border-white"
                />
                <div className="absolute top-1.5 -right-1.5 bg-[#183B25] text-[#FABD44] text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md">
                  100% Fresh
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. VERIFIED CUSTOMER REVIEWS */}
      <section className="w-full py-6 sm:py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-5 sm:mb-8 space-y-1">
          <span className="eyebrow-gold text-[10px] sm:text-xs block">
            → REAL CUSTOMER REVIEWS ←
          </span>
          <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-[#183B25]">
            Loved by 10,000+ <span className="text-[#DEA02C]">Traditional Homes</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-[#4A554D] max-w-md mx-auto font-medium">
            Genuine reviews from families across Tamil Nadu enjoying our daily stone-ground nutrition.
          </p>
        </div>

        {/* Animated Infinite Marquee Reviews Track */}
        <div className="relative w-full overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-r from-[#FAF7EE] via-[#FAF7EE]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-l from-[#FAF7EE] via-[#FAF7EE]/80 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee-reviews flex items-stretch gap-3 sm:gap-6 py-2 sm:py-4 px-2 sm:px-4">
            {[...customerReviews, ...customerReviews].map((rev, idx) => (
              <div
                key={`${rev.name}-${idx}`}
                className="w-[220px] sm:w-[320px] bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-[#EBE5D8] shadow-2xs hover:shadow-lg hover:border-[#183B25]/30 transition-all duration-300 flex flex-col justify-between shrink-0 select-none group/card"
              >
                <div className="space-y-2">
                  {/* Top: 5 Stars + Verified Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#FABD44] gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#183B25] bg-[#FAF7EE] px-1.5 py-0.5 rounded-full border border-[#E8E2D5]">
                      <CheckCircle2 size={10} className="text-[#183B25]" /> Verified
                    </span>
                  </div>

                  {/* Product Tag */}
                  <div className="text-[9px] sm:text-[10px] font-bold text-[#BA7A18] bg-[#FAF7EE] px-2 py-0.5 rounded-md inline-block border border-[#E8E2D5]">
                    {rev.product}
                  </div>

                  {/* Review Text */}
                  <p className="text-[11px] sm:text-xs text-gray-700 leading-relaxed font-normal">
                    "{rev.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-2 pt-2.5 border-t border-[#EBE5D8] mt-3">
                  <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full ${rev.avatarBg} text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shadow-2xs shrink-0`}>
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#183B25] group-hover/card:text-[#DEA02C] transition-colors leading-tight">
                      {rev.name}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium">
                      {rev.city} • <span className="text-gray-400">{rev.time.split('•')[1]?.trim() || 'Verified'}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
