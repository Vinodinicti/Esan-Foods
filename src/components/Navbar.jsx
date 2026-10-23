import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Phone
} from 'lucide-react';
import { ESAN_WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  cartCount, 
  cartTotal, 
  openCart, 
  searchQuery, 
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll state on page navigation
  useEffect(() => {
    setIsScrolled(false);
  }, [activePage]);

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Our Story' },
    { id: 'products', label: 'Products' },
    { id: 'contact', label: 'Contact' }
  ];

  const isHome = activePage === 'home';
  const isHomeHero = isHome && !isScrolled;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b-2 border-[#FABD44] shadow-md text-[#183B25]'
          : 'bg-transparent border-b-0 shadow-none'
      }`}
    >
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none"
        >
          <div className="h-7 sm:h-11 w-auto shrink-0 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
            <img 
              src="/brand/esan_logo.png" 
              alt="Esan Foods" 
              className="h-7 sm:h-11 w-auto object-contain drop-shadow-xs" 
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-serif text-lg sm:text-2xl font-bold tracking-tight transition-colors leading-none ${
              isHomeHero 
                ? 'text-[#183B25] md:text-[#FABD44] md:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                : 'text-[#183B25] group-hover:text-[#DEA02C]'
            }`}>
              Esan Foods
            </span>
            <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
              isHomeHero 
                ? 'text-[#BA7A18] md:text-[#FEE599] md:drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]' 
                : 'text-[#BA7A18]'
            }`}>
              Traditional & Pure
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors py-1 relative cursor-pointer outline-none focus:outline-none ${
                  isHomeHero
                    ? isActive 
                      ? 'text-[#FABD44] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                      : 'text-[#FFF2C6] hover:text-[#FABD44] font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                    : isActive
                      ? 'text-[#183B25] font-bold'
                      : 'text-[#183B25]/85 hover:text-[#DEA02C]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FABD44] rounded-full animate-in fade-in duration-200 shadow-sm" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions: Call Icon + Cart Icon in Reference Image Style */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`https://wa.me/${ESAN_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-xs ${
              isHomeHero
                ? 'bg-[#FAF7EE] md:bg-black/35 text-[#183B25] md:text-[#FABD44] border border-[#E8E2D5] md:border-[#FABD44]/60 hover:bg-[#183B25] md:hover:bg-[#FABD44] hover:text-white md:hover:text-[#183B25] shadow-xs md:shadow-sm'
                : isScrolled 
                  ? 'bg-[#FAF7EE] text-[#183B25] border border-[#E8E2D5] hover:bg-[#183B25] hover:text-white' 
                  : 'bg-white/80 text-[#183B25] border border-[#E8E2D5] hover:bg-[#183B25] hover:text-white backdrop-blur-xs'
            }`}
            title="Call or WhatsApp Us"
            aria-label="Call or WhatsApp Us"
          >
            <Phone size={14} className="sm:hidden" />
            <Phone size={17} className="hidden sm:block" />
          </a>

          <button
            onClick={openCart}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer relative shadow-xs outline-none focus:outline-none ${
              isHomeHero
                ? 'bg-[#FAF7EE] md:bg-black/35 text-[#183B25] md:text-[#FABD44] border border-[#E8E2D5] md:border-[#FABD44]/60 hover:bg-[#F3EFE3] md:hover:bg-[#FABD44] md:hover:text-[#183B25] shadow-xs md:shadow-sm'
                : isScrolled 
                  ? 'bg-[#FAF7EE] text-[#183B25] border border-[#E8E2D5] hover:bg-[#F3EFE3]' 
                  : 'bg-white/80 text-[#183B25] border border-[#E8E2D5] hover:bg-white backdrop-blur-xs'
            }`}
            aria-label="View Shopping Cart"
          >
            <ShoppingBag size={15} className="sm:hidden" />
            <ShoppingBag size={18} className="hidden sm:block" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FABD44] text-[#183B25] text-[9px] sm:text-[10px] font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-1.5 sm:border-2 border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-1.5 rounded-xl transition-colors cursor-pointer outline-none focus:outline-none ${
              isHomeHero
                ? 'text-[#183B25] hover:bg-[#EAE4D7]'
                : 'text-[#183B25] hover:bg-[#EAE4D7]'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-lg border-b-2 border-[#FABD44] px-4 py-4 space-y-2 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                activePage === link.id
                  ? 'bg-[#183B25] text-white font-bold'
                  : 'text-[#183B25] hover:bg-[#FAF7EE]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href={`https://wa.me/${ESAN_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-full border border-[#183B25] text-[#183B25] hover:bg-[#183B25] hover:text-white font-bold text-xs mt-3 transition-colors"
          >
            <Phone size={15} />
            <span>Call / WhatsApp Us</span>
          </a>
        </div>
      )}
    </header>
  );
}
