import React, { useState } from 'react';
import { Phone, Mail, MapPin, Shield, ShieldCheck, X } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { ESAN_WHATSAPP_NUMBER, ESAN_INSTAGRAM_URL } from '../utils/whatsapp';

export default function Footer({ onNavigate }) {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="relative z-20 bg-[#183B25] text-white border-t border-[#265335] pt-6 sm:pt-10 md:pt-12 pb-5 sm:pb-8 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Vertical Columns Grid: On mobile, brand is compact on top, Links & Support are 2 columns side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 pb-5 sm:pb-8 border-b border-white/10">
          
          {/* Column 1: Brand & Bio (Vertical) */}
          <div className="space-y-2.5 sm:space-y-4">
            <div 
              onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="h-8 sm:h-11 w-auto shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
                <img 
                  src="/brand/esan_logo.png" 
                  alt="Esan Foods" 
                  className="h-8 sm:h-11 w-auto object-contain drop-shadow-md" 
                />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#FABD44] transition-colors">
                Esan Foods
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed max-w-sm">
              Authentic South Indian health mixes &amp; protein laddus. 100% natural, stone-ground, zero chemicals.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <a
                href={`https://wa.me/${ESAN_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-[#FABD44] hover:text-[#183B25] flex items-center justify-center text-white/90 transition-all shadow-xs cursor-pointer"
                title="WhatsApp Support"
                aria-label="WhatsApp"
              >
                <Phone size={13} className="sm:hidden" />
                <Phone size={15} className="hidden sm:block" />
              </a>
              <a
                href={ESAN_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-[#FABD44] hover:text-[#183B25] flex items-center justify-center text-white/90 transition-all shadow-xs cursor-pointer"
                title="Instagram @esan_foods"
                aria-label="Instagram"
              >
                <InstagramIcon size={13} className="sm:hidden" />
                <InstagramIcon size={15} className="hidden sm:block" />
              </a>
              <a
                href="mailto:esanfoodstn@gmail.com"
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-[#FABD44] hover:text-[#183B25] flex items-center justify-center text-white/90 transition-all shadow-xs cursor-pointer"
                title="Email Us"
                aria-label="Email"
              >
                <Mail size={13} className="sm:hidden" />
                <Mail size={15} className="hidden sm:block" />
              </a>
            </div>
          </div>

          {/* Wrapper for Columns 2 & 3: Side-by-side 2-col on mobile, regular cols on desktop */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:contents">
            {/* Column 2: Quick Links */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#FABD44] uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-white/75">
                <li>
                  <button 
                    onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="hover:text-[#FABD44] transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="hover:text-[#FABD44] transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { onNavigate('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="hover:text-[#FABD44] transition-colors cursor-pointer"
                  >
                    Products
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="hover:text-[#A3E635] transition-colors cursor-pointer"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Care & Information */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#FABD44] uppercase tracking-wider">
                Support
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-white/75">
                <li>
                  <button 
                    onClick={() => setShowPrivacy(true)} 
                    className="hover:text-[#FABD44] transition-colors cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <a 
                    href={`https://wa.me/${ESAN_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FABD44] transition-colors"
                  >
                    +91 96884 05829
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:esanfoodstn@gmail.com"
                    className="hover:text-[#FABD44] transition-colors truncate block max-w-[140px] sm:max-w-none"
                    title="esanfoodstn@gmail.com"
                  >
                    esanfoodstn@gmail.com
                  </a>
                </li>
                <li className="text-white/60">
                  Tamil Nadu, India
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Minimal Copyright & Left Corner Admin Portal Icon */}
        <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-3">
          {/* Left Corner: Admin Portal Icon (Static, a little big) + Copyright */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { onNavigate('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-[#FABD44] text-[#FABD44] hover:text-[#183B25] border border-white/15 flex items-center justify-center transition-all shadow-xs cursor-pointer group"
              title="Store Admin Portal"
              aria-label="Store Admin Portal"
            >
              <Shield size={18} className="transition-transform group-hover:scale-110" />
            </button>
            <p>© 2026 Esan Foods. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center text-[10px] sm:text-xs">
            <span>Pure South Indian Nutrition</span>
          </div>
        </div>

      </div>

      {/* Sweet & Clean Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div 
            className="relative w-full max-w-lg bg-white text-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3 border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-[#1E4D2B]" />
                <h3 className="font-serif font-bold text-lg text-[#1E4D2B]">Privacy Policy</h3>
              </div>
              <button 
                onClick={() => setShowPrivacy(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="text-xs text-gray-600 space-y-3 leading-relaxed">
              <p>
                <strong>Esan Foods</strong> respects your privacy. We collect only necessary details (name, delivery address, and phone number) to deliver fresh traditional foods and provide shipment tracking.
              </p>
              <p>
                We do not sell, rent, or share your data with any external advertising networks. All transactions and details are kept strictly confidential.
              </p>
              <p>
                For any questions regarding your data or orders, contact us anytime via WhatsApp at +91 96884 05829 or email esanfoodstn@gmail.com.
              </p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowPrivacy(false)}
                className="px-5 py-2 rounded-full bg-[#1E4D2B] text-white text-xs font-bold hover:bg-[#2D6A4F] transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
