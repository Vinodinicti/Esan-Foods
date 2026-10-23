import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, Phone } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';
import { ESAN_WHATSAPP_NUMBER } from '../utils/whatsapp';
import { WhatsAppIcon } from '../components/Icons';

export default function ProductsPage({ 
  products, 
  onAddToCart, 
  onQuickView, 
  selectedCategory, 
  setSelectedCategory, 
  searchQuery, 
  setSearchQuery 
}) {
  const [sortBy, setSortBy] = useState('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Dynamic category product count
  const getCategoryCount = (catId) => {
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name && p.name.toLowerCase().includes(query);
        const matchesTamil = p.tamilName && p.tamilName.toLowerCase().includes(query);
        const matchesDesc = p.description && p.description.toLowerCase().includes(query);
        const matchesCategory = p.category && p.category.toLowerCase().includes(query);
        const matchesIngredients = p.ingredients && p.ingredients.some(i => i.toLowerCase().includes(query));
        if (!matchesName && !matchesTamil && !matchesDesc && !matchesCategory && !matchesIngredients) {
          return false;
        }
      }
      // In-stock filter
      if (onlyInStock && !p.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // 'featured' keeps default order
    });
  }, [products, selectedCategory, searchQuery, onlyInStock, sortBy]);

  return (
    <div className="w-full pb-16 space-y-6">
      
      {/* Hero Section (Responsive Viewport Banner) */}
      <section className="relative w-full py-8 sm:py-14 md:py-18 pt-20 sm:pt-24 md:pt-28 overflow-hidden flex items-center border-b border-[#E8E2D5] bg-[#FAF8F5]">
        {/* Dynamic Spice Explosion Background */}
        <div 
          className="absolute inset-0 pointer-events-none select-none overflow-hidden" 
          aria-hidden="true"
        >
          <img 
            src="/brand/products_hero_bg.jpg" 
            alt="Traditional Spices & Herbs" 
            className="w-full h-full object-cover object-right md:object-[80%_50%] mix-blend-multiply opacity-80 sm:opacity-85" 
          />
          {/* Directional gradient wash ensuring text on the left is crisp and completely legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/92 sm:via-[#FAF8F5]/75 to-transparent sm:w-2/3" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5]/95 via-[#FAF8F5]/40 to-transparent sm:hidden" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center">
          <div className="max-w-2xl space-y-2 sm:space-y-3">
            <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full bg-white/90 text-[#183B25] border border-[#E8E2D5] inline-block shadow-2xs">
              ★ 100% Stone Milled • Farm Fresh
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#183B25] leading-tight">
              Traditional Health Mixes, <span className="text-[#DEA02C]">Herbal Podis & Laddus</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-[#183B25]/85 font-medium leading-relaxed max-w-xl">
              100% natural, freshly stone-ground in small batches. Zero preservatives, zero white sugar, authentic home-made goodness.
            </p>
          </div>
        </div>
      </section>

      {/* Main Filter and Product Grid Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">

      {/* Filter and Search Bar Controls */}
      <div className="glossy-card p-3 sm:p-5 rounded-2xl sm:rounded-3xl space-y-3 sm:space-y-4 shadow-xs">
        
        {/* Category Filter Pills with Dynamic Item Counts */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none snap-x -mx-1 px-1">
          {categories.map((cat) => {
            const count = getCategoryCount(cat.id);
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'glossy-button-primary shine-sweep text-white shadow-sm'
                    : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200/80'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Row: Search, Stock toggle, Sort & Total Count */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 pt-2.5 sm:pt-3 border-t border-gray-100 text-xs">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={15} />
            <input
              type="text"
              placeholder="Search by grain, benefit, name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#1E4D2B] transition-colors text-xs sm:text-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Only In Stock Toggle */}
            <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700 select-none text-xs">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-[#1E4D2B] focus:ring-[#1E4D2B] w-4 h-4 cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal size={14} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 outline-none font-semibold text-gray-700 cursor-pointer text-xs"
              >
                <option value="featured">Featured First</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

      </div>

      {/* Active Filter Indicators & Results Count Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs px-1">
        <span className="font-semibold text-gray-500">
          Showing <span className="text-[#1E4D2B] font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
        </span>

        {(selectedCategory !== 'all' || searchQuery || onlyInStock) && (
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-gray-400">Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="px-2 py-0.5 rounded-full bg-[#EBF7EE] text-[#1E4D2B] font-semibold flex items-center gap-1 text-[10px] sm:text-[11px]">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="hover:text-red-500">
                  <X size={12} />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-semibold flex items-center gap-1 text-[10px] sm:text-[11px]">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-red-500">
                  <X size={12} />
                </button>
              </span>
            )}
            {onlyInStock && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold flex items-center gap-1 text-[10px] sm:text-[11px]">
                In Stock Only
                <button onClick={() => setOnlyInStock(false)} className="hover:text-red-500">
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyInStock(false);
              }}
              className="text-red-500 hover:underline font-semibold ml-1 cursor-pointer text-[10px] sm:text-[11px]"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Products Grid - 2 columns on mobile, 3 on tablet, 4 on desktop */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-200 max-w-lg mx-auto space-y-4 shadow-2xs">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FAF7F0] mx-auto flex items-center justify-center text-gray-400">
            <Search size={26} />
          </div>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-gray-900">No matching products found</h3>
          <p className="text-xs text-gray-500">
            Try adjusting your search keywords or resetting the category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setOnlyInStock(false);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#1E4D2B] text-white font-bold text-xs hover:bg-[#163820] transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}

      {/* Custom & Bulk Order Banner for WhatsApp */}
      <div className="bg-[#FEF7EB] rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-[#FFE082] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs text-center sm:text-left">
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-base sm:text-xl text-gray-900">
            Need Custom Wellness Combos or Bulk Event Laddus?
          </h3>
          <p className="text-xs text-gray-600 max-w-xl">
            We prepare custom diabetic packs, postpartum recovery sets, and wedding / housewarming return gift laddu boxes with custom branding.
          </p>
        </div>
        <a
          href={`https://wa.me/${ESAN_WHATSAPP_NUMBER}?text=${encodeURIComponent("Vanakkam! I would like to inquire about custom/bulk order traditional foods and laddus.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-br from-[#1E4D2B] to-[#14361F] hover:from-[#25D366] hover:to-[#128C7E] text-[#A3E635] hover:text-white flex items-center justify-center gap-2 shrink-0 shadow-md hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-emerald-500/30 text-xs font-bold"
          title="Inquire on WhatsApp"
        >
          <WhatsAppIcon size={18} />
          <span>Inquire on WhatsApp</span>
        </a>
      </div>

      </div>
    </div>
  );
}
