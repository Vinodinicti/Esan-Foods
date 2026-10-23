import React from 'react';
import { Award, ArrowRight, Phone, Sparkles } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { ESAN_WHATSAPP_NUMBER, ESAN_INSTAGRAM_URL } from '../utils/whatsapp';

export default function MobileAboutView({ onNavigate }) {
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

  const sweeteners = [
    {
      name: 'Karupatti',
      desc: 'Pure native palm jaggery, naturally rich in iron and minerals.',
      tag: 'Native Palm',
      image: '/brand/karupatti.jpg',
      shape: 'rounded-[16px] rounded-tl-[32px]'
    },
    {
      name: 'Nattu Sakkarai',
      desc: 'Unbleached traditional cane sugar with natural minerals intact.',
      tag: 'Unbleached',
      image: '/brand/nattu_sakkarai.png',
      shape: 'rounded-full'
    },
    {
      name: 'Arabian Dates',
      desc: 'Whole fruit sweetness packed with natural dietary fiber.',
      tag: 'Whole Fruit',
      image: '/brand/arabian_dates.jpg',
      shape: 'rounded-t-full rounded-b-[16px]'
    }
  ];

  return (
    <div className="space-y-8 pb-8 pt-20 px-3">
      {/* 1. Mobile Hero Story Header */}
      <div className="text-center space-y-2 px-1">
        <span className="eyebrow-gold text-[10px] inline-flex items-center gap-1">
          <Sparkles size={11} className="text-[#DEA02C]" />
          <span>OUR ANCESTRAL STORY</span>
        </span>
        <h1 className="font-serif text-2xl font-extrabold text-[#1B4332] leading-tight">
          Bringing Grandmother's Wisdom Back to Every Table
        </h1>
        <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
          Pure traditional nutrition from native grains, stone-ground in small batches with zero preservatives.
        </p>
      </div>

      {/* 2. Split Story Section: Why We Founded Esan Foods */}
      <div className="glossy-card rounded-2xl p-4 sm:p-5 border border-white/90 shadow-md space-y-4">
        {/* Story Photo with Floating FSSAI Badge */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#FAF8F5] shadow-xs border-2 border-white">
          <img
            src="/brand/about_story.jpg"
            alt="Traditional Wooden Bowls with Fresh Green Herbal Powder"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-xs rounded-full px-2.5 py-1 shadow-md border border-gray-100 flex items-center gap-1.5">
            <Award size={13} className="text-[#1E4D2B]" />
            <span className="text-[10px] font-bold text-[#1E4D2B]">FSSAI Certified Unit</span>
          </div>
        </div>

        {/* Story Narrative */}
        <div className="space-y-2.5 text-xs text-gray-700 leading-relaxed">
          <h2 className="font-serif text-lg font-bold text-gray-900 leading-snug">
            Why We Founded <span className="text-[#1E4D2B]">Esan Foods</span>
          </h2>
          <p>
            Decades ago, every South Indian home began the day with fresh Sathu Maavu made with sprouted millets, pulses, and palm jaggery.
          </p>
          <p>
            We created Esan Foods to bring back that authentic, wholesome nourishment without refined sugar, artificial flavors, or chemical preservatives.
          </p>
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EDE8DE] text-xs font-semibold text-[#183B25] italic leading-normal">
            "Our promise: zero chemicals, zero white sugar, and 100% stone-ground nutrition."
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => {
              onNavigate('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1E4D2B] text-white text-xs font-bold transition-all shadow-xs active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Explore Authentic Mixes</span>
            <ArrowRight size={13} />
          </button>
          <a
            href={ESAN_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-white text-gray-800 border border-gray-200 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-95"
          >
            <InstagramIcon size={14} className="text-[#E1306C]" />
            <span>Watch Kitchen Videos on Instagram</span>
          </a>
        </div>
      </div>

      {/* 3. The 5-Step Artisanal Standard - Compact Animated Cards */}
      <div className="space-y-3.5">
        <div className="text-center px-2 space-y-1">
          <span className="eyebrow-gold text-[10px] block">THE ARTISANAL STANDARD</span>
          <h2 className="font-serif text-xl font-bold text-gray-900">
            How Every Batch is Made
          </h2>
          <p className="text-[11px] text-gray-600 leading-tight">
            Five rigorous steps that differentiate genuine traditional food from mass factory powder.
          </p>
        </div>

        {/* 2-Column Mobile Grid for the 5 Animated Cards */}
        <div className="artisan-card-wrapper grid grid-cols-2 gap-2.5 items-stretch justify-items-center py-2 overflow-visible">
          {steps.map((st, idx) => (
            <div 
              key={st.title} 
              className={`card artisan-card flex flex-col cursor-pointer ${
                idx === 4 ? 'col-span-2 w-full max-w-[190px] justify-self-center' : ''
              }`}
              style={{
                '--background': st.gradient,
                '--before-bg': st.beforeGrad,
                '--after-bg': st.afterGrad,
                '--hover-color': st.hoverColor,
                minHeight: '190px',
                maxWidth: idx === 4 ? '190px' : '100%'
              }}
            >
              <div className="card-info artisan-card-info flex flex-col justify-center items-center text-center p-3 sm:p-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/70 mb-1">
                  Step 0{idx + 1}
                </span>
                <h3 className="title text-xs sm:text-[13px] font-bold text-white leading-tight mb-1.5">
                  {st.title}
                </h3>
                <p className="text-[10px] text-gray-300 leading-tight font-normal">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Sweetener Philosophy - Compact Mobile Cards */}
      <div className="rounded-2xl bg-[#F8FAF8] p-4 border border-[#E2EBE5] space-y-3.5 shadow-2xs">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA7A18] block">
            OUR PROMISE
          </span>
          <h3 className="font-serif text-lg font-bold text-[#183B25] leading-snug">
            Never White Sugar. Only Pure Nature.
          </h3>
          <p className="text-[11px] text-gray-600 leading-normal">
            Every sweet laddu or mix from Esan Foods uses only unrefined ancestral sweeteners.
          </p>
        </div>

        <div className="space-y-2.5">
          {sweeteners.map((sw) => (
            <div 
              key={sw.name}
              className="bg-[#F5E5A8] rounded-2xl p-3 border border-[#E6D290] flex items-center justify-between gap-2.5 shadow-2xs"
            >
              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="font-serif font-bold text-sm text-[#183B25] leading-tight">
                  {sw.name}
                </h4>
                <p className="text-[11px] text-[#244F32] font-semibold leading-tight">
                  {sw.desc}
                </p>
                <div className="pt-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white text-[9px] font-bold text-[#183B25] shadow-2xs border border-[#DFC985]">
                    {sw.tag}
                  </span>
                </div>
              </div>
              <div className={`w-18 h-20 shrink-0 overflow-hidden shadow-2xs ${sw.shape}`}>
                <img 
                  src={sw.image} 
                  alt={sw.name} 
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Direct Master Miller WhatsApp Consultation Card */}
      <div className="bg-[#FEF7EB] rounded-2xl p-4 border border-[#FFE082] text-center space-y-2 shadow-2xs">
        <h4 className="font-serif font-bold text-sm text-[#183B25]">
          Questions About Ancient Recipes or Health Mixes?
        </h4>
        <p className="text-[11px] text-gray-600 leading-tight">
          Talk directly with our Master Miller for custom diabetic, postpartum, or kids mixes.
        </p>
        <div className="pt-1">
          <a
            href={`https://wa.me/${ESAN_WHATSAPP_NUMBER}?text=${encodeURIComponent("Vanakkam Esan Foods! I would like to consult with the master miller regarding traditional ingredients and mixes.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
          >
            <Phone size={13} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
