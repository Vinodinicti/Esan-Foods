import React from 'react';
import { 
  Award, 
  Heart, 
  Phone, 
  ArrowRight
} from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { ESAN_WHATSAPP_NUMBER, ESAN_INSTAGRAM_URL } from '../utils/whatsapp';
import MobileAboutView from '../components/MobileAboutView';

export default function AboutPage({ onNavigate }) {
  const steps = [
    {
      title: 'Farmer Sourced',
      desc: 'Native millets and pulses directly sourced from Tamil Nadu farmers.',
      gradient: 'linear-gradient(to right, #74ebd5 0%, #acb6e5 100%)',
      beforeGrad: 'linear-gradient(to bottom right, #f6d365 0%, #fda085 100%)',
      afterGrad: 'linear-gradient(to top right, #84fab0 0%, #8fd3f4 100%)',
      hoverColor: '#74ebd5'
    },
    {
      title: 'Sprouting & Sun Drying',
      desc: 'Naturally sprouted for 24-48 hrs for enhanced nutrition and digestion.',
      gradient: 'linear-gradient(to right, #f6d365 0%, #fda085 100%)',
      beforeGrad: 'linear-gradient(to bottom right, #ffecd2 0%, #fcb69f 100%)',
      afterGrad: 'linear-gradient(to top right, #fbc2eb 0%, #a6c1ee 100%)',
      hoverColor: '#f6d365'
    },
    {
      title: 'Cast-Iron Roasting',
      desc: 'Slow-roasted in cast iron to lock in natural nutty aroma and vitamins.',
      gradient: 'linear-gradient(to right, #ff7e5f 0%, #feb47b 100%)',
      beforeGrad: 'linear-gradient(to bottom right, #f857a6 0%, #ff5858 100%)',
      afterGrad: 'linear-gradient(to top right, #fa709a 0%, #fee140 100%)',
      hoverColor: '#feb47b'
    },
    {
      title: 'Cold Stone Milling',
      desc: 'Low-RPM traditional stone grinding keeps vital enzymes alive.',
      gradient: 'linear-gradient(to right, #84fab0 0%, #8fd3f4 100%)',
      beforeGrad: 'linear-gradient(to bottom right, #74ebd5 0%, #acb6e5 100%)',
      afterGrad: 'linear-gradient(to top right, #a8ff78 0%, #78ffd6 100%)',
      hoverColor: '#84fab0'
    },
    {
      title: 'Fresh Hygienic Packing',
      desc: 'Packed in airtight pouches with zero preservatives or additives.',
      gradient: 'linear-gradient(to right, #a8ff78 0%, #78ffd6 100%)',
      beforeGrad: 'linear-gradient(to bottom right, #84fab0 0%, #8fd3f4 100%)',
      afterGrad: 'linear-gradient(to top right, #f6d365 0%, #fda085 100%)',
      hoverColor: '#a8ff78'
    }
  ];

  return (
    <div className="relative min-h-[85vh] pb-12">
      {/* Fresh Organic Green Herbs & Botanical Leaves Frame Background - Edge-to-Edge */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <img 
          src="/about_herbal_frame.jpg" 
          alt="Fresh Organic Green Herbs and Botanical Leaves Frame" 
          className="w-full h-full object-cover object-center opacity-90"
        />
        {/* Subtle center wash so text cards stand out with clean contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF8F5]/60 to-transparent" />
      </div>

      {/* Mobile Dedicated View - Pure, Lightweight, Tailored for Mobile Screens */}
      <div className="block md:hidden relative z-10">
        <MobileAboutView onNavigate={onNavigate} />
      </div>

      {/* Desktop & Tablet Full View */}
      <div className="hidden md:block pt-24 sm:pt-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1B4332] leading-tight">
          Bringing Traditional Grandmother Wisdom Back to Every Table
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Pure traditional nutrition from native grains, prepared with stone-ground integrity and zero chemicals.
        </p>
      </div>

      {/* Split Story Section on Translucent Glass Panel */}
      <div className="glossy-card rounded-3xl p-6 sm:p-10 border border-white/80 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              Why We Founded <span className="text-[#1E4D2B]">Esan Foods</span>
            </h2>
            <p>
              Decades ago, every South Indian home began the day with fresh Sathu Maavu made with sprouted millets, pulses, and palm jaggery.
            </p>
            <p>
              We created Esan Foods to bring back that authentic, wholesome nourishment without refined sugar, artificial flavors, or chemical preservatives.
            </p>
            <p className="font-medium text-gray-800 bg-[#FAF8F5]/90 p-4 rounded-2xl border border-[#EDE8DE] italic">
              "Our promise: zero chemicals, zero white sugar, and 100% stone-ground nutrition."
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('products')}
                className="px-6 py-3 rounded-full bg-[#1E4D2B] text-white text-xs sm:text-sm font-bold hover:bg-[#2D6A4F] transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Explore Our Authentic Mixes
              </button>
              <a
                href={ESAN_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-white text-gray-800 border border-gray-300 text-xs sm:text-sm font-bold hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm"
              >
                <InstagramIcon size={16} className="text-[#E1306C]" />
                <span>Watch Kitchen Videos on Instagram</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3.8] bg-[#FAF8F5]">
              <img
                src="/brand/about_story.jpg"
                alt="Traditional Wooden Bowls with Fresh Green Herbal Powder"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 hidden sm:flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF7EE] text-[#1E4D2B] flex items-center justify-center font-bold">
                <Award size={24} />
              </div>
              <div>
                <span className="block font-serif font-bold text-sm text-[#1E4D2B]">FSSAI Certified Unit</span>
                <span className="text-[11px] text-gray-500 font-medium">100% Food Safety Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 5-Step Crafting Journey */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E4D2B]">The Artisanal Standard</span>
          <h2 className="font-serif text-3xl font-bold text-gray-900 mt-1">
            How Every Batch of Esan Foods is Made
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Five rigorous steps that differentiate genuine traditional food from mass factory powder.
          </p>
        </div>

        <div className="artisan-card-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-6 justify-items-center py-4 overflow-visible">
          {steps.map((st) => (
            <div 
              key={st.title} 
              className="card artisan-card flex flex-col cursor-pointer"
              style={{
                '--background': st.gradient,
                '--before-bg': st.beforeGrad,
                '--after-bg': st.afterGrad,
                '--hover-color': st.hoverColor
              }}
            >
              <div className="card-info artisan-card-info flex flex-col justify-center items-center text-center p-6 sm:p-7">
                <h3 className="title text-base sm:text-lg font-bold text-white leading-snug mb-3">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sweetener Philosophy - Soft Oatmeal Cards with Shaped Photo Cutouts */}
      <div className="rounded-3xl bg-[#F8FAF8] p-6 sm:p-8 lg:p-10 border border-[#E2EBE5]">
        <div className="max-w-2xl mb-6 sm:mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#BA7A18] block mb-1.5">
            Our Promise
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#183B25] leading-snug">
            Never White Sugar. Only Pure Nature.
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
            Every sweet laddu or mix from Esan Foods uses only unrefined ancestral sweeteners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: Karupatti */}
          <div className="bg-[#F5E5A8] rounded-[28px] p-5 sm:p-6 border border-[#E6D290] shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 group">
            <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
              <div>
                <h4 className="font-serif font-bold text-lg sm:text-xl text-[#183B25] leading-tight">
                  Karupatti
                </h4>
                <p className="text-xs sm:text-[13px] text-[#244F32] font-semibold leading-relaxed mt-2">
                  Pure native palm jaggery, naturally rich in iron and minerals.
                </p>
              </div>
              <div className="mt-4">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[11px] font-semibold text-[#183B25] shadow-2xs border border-[#DFC985]">
                  Native Palm
                </span>
              </div>
            </div>
            <div className="w-24 h-32 sm:w-28 sm:h-36 lg:w-32 lg:h-40 shrink-0 overflow-hidden shadow-2xs relative rounded-[22px] rounded-tl-[44px]">
              <img 
                src="/brand/karupatti.jpg" 
                alt="Karupatti (Pure Palm Jaggery)" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 2: Nattu Sakkarai */}
          <div className="bg-[#F5E5A8] rounded-[28px] p-5 sm:p-6 border border-[#E6D290] shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 group">
            <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
              <div>
                <h4 className="font-serif font-bold text-lg sm:text-xl text-[#183B25] leading-tight">
                  Nattu Sakkarai
                </h4>
                <p className="text-xs sm:text-[13px] text-[#244F32] font-semibold leading-relaxed mt-2">
                  Unbleached traditional cane sugar with natural minerals intact.
                </p>
              </div>
              <div className="mt-4">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[11px] font-semibold text-[#183B25] shadow-2xs border border-[#DFC985]">
                  Unbleached
                </span>
              </div>
            </div>
            <div className="w-24 h-32 sm:w-28 sm:h-36 lg:w-32 lg:h-40 shrink-0 overflow-hidden shadow-2xs relative rounded-full">
              <img 
                src="/brand/nattu_sakkarai.png" 
                alt="Nattu Sakkarai (Traditional Cane Sugar)" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 3: Arabian Dates */}
          <div className="bg-[#F5E5A8] rounded-[28px] p-5 sm:p-6 border border-[#E6D290] shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 group">
            <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
              <div>
                <h4 className="font-serif font-bold text-lg sm:text-xl text-[#183B25] leading-tight">
                  Arabian Dates
                </h4>
                <p className="text-xs sm:text-[13px] text-[#244F32] font-semibold leading-relaxed mt-2">
                  Whole fruit sweetness packed with natural dietary fiber.
                </p>
              </div>
              <div className="mt-4">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[11px] font-semibold text-[#183B25] shadow-2xs border border-[#DFC985]">
                  Whole Fruit
                </span>
              </div>
            </div>
            <div className="w-24 h-32 sm:w-28 sm:h-36 lg:w-32 lg:h-40 shrink-0 overflow-hidden shadow-2xs relative rounded-t-full rounded-b-[20px]">
              <img 
                src="/brand/arabian_dates.jpg" 
                alt="Arabian Dates" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

        </div>
      </div>

    </div>
  );
}
