import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  Send, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { ESAN_WHATSAPP_NUMBER, ESAN_INSTAGRAM_URL } from '../utils/whatsapp';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: 'Traditional Multigrain Sathu Maavu',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const text = `Vanakkam Esan Foods!
*Customer Enquiry:*
Name: ${formData.name || 'Anonymous'}
Phone: ${formData.phone || 'N/A'}
Product Interest: ${formData.product}
Message: ${formData.message || 'I would like more information about your products.'}`;

    window.open(`https://wa.me/${ESAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const faqs = [
    {
      q: 'How long do Esan Foods products stay fresh?',
      a: 'Health mixes stay fresh for 6 months in an airtight container. Protein laddus are best within 45 to 60 days.'
    },
    {
      q: 'Can infants and toddlers eat Esan Sathu Maavu?',
      a: 'Yes, our Sprouted Ragi Porridge is gentle for 8+ months. Multigrain Sathu Maavu is ideal for children 2+ years.'
    },
    {
      q: 'How does WhatsApp ordering work?',
      a: 'Tap "Order on WhatsApp" to send your cart details directly. We confirm instantly and dispatch with tracking.'
    },
    {
      q: 'Do you offer Cash on Delivery (COD) & shipping?',
      a: 'Yes, we deliver pan-India via express courier with both UPI and Cash on Delivery options.'
    },
    {
      q: 'Is there any white sugar in laddus or mixes?',
      a: 'Zero white sugar. We exclusively use pure palm jaggery (Karupatti), organic country sugar, and Arabian dates.'
    },
    {
      q: 'Are any preservatives or chemicals added?',
      a: '100% preservative-free, zero chemicals or artificial colors. All batches are stone milled fresh from native grains.'
    }
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-12 sm:pt-28">
      {/* Botanical Leaves Background Image for Contact Page */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <img 
          src="/contact_bg.png" 
          alt="Botanical Leaves Background" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#EBF7EE] text-[#183B25] border border-[#C8E6C9] inline-block">
          Get in Touch With Us
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#183B25]">
          We’d Love to Hear <span className="text-[#DEA02C]">From You</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Reach out for ingredient queries, personalized wellness packs, or custom orders.
        </p>
      </div>

      {/* Main Grid: Contact Cards & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* WhatsApp Direct Card */}
          <div className="bg-[#EBF7EE] p-6 rounded-3xl border border-[#C8E6C9] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1E4D2B]">WhatsApp Ordering & Help</h3>
                <p className="text-xs text-gray-600">Fastest way to order & ask questions</p>
              </div>
            </div>

            <p className="text-xs text-gray-700">
              Message our master milling team directly on WhatsApp for instant confirmation and dispatch updates.
            </p>

            <a
              href={`https://wa.me/${ESAN_WHATSAPP_NUMBER}?text=${encodeURIComponent("Vanakkam Esan Foods! I would like to enquire about your products.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Phone size={16} />
              <span>Chat with +91 96884 05829</span>
            </a>
          </div>

          {/* Instagram Card */}
          <div className="bg-[#FDF1ED] p-6 rounded-3xl border border-[#FFCCBC] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E1306C] text-white flex items-center justify-center shadow-md">
                <InstagramIcon size={24} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-900">Instagram Community</h3>
                <p className="text-xs text-gray-600">@esan_foods</p>
              </div>
            </div>

            <p className="text-xs text-gray-700">
              Watch authentic roasting videos, customer cooking stories, and health tips on our official Instagram page.
            </p>

            <a
              href={ESAN_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-[#E1306C] hover:bg-[#C13584] text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <InstagramIcon size={16} />
              <span>Follow @esan_foods on Instagram</span>
            </a>
          </div>

          {/* Address & Timings */}
          <div className="bg-white/90 backdrop-blur-xs p-6 rounded-3xl border border-gray-200/90 shadow-xs space-y-4 text-xs text-gray-700">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#1E4D2B] mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-gray-900 block">Artisanal Production & Milling Facility:</span>
                <p className="text-gray-600 mt-0.5">Esan Foods Unit, Tamil Nadu, India. (FSSAI Reg: 22423589000142)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={18} className="text-[#1E4D2B] mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-gray-900 block">Working & Dispatch Hours:</span>
                <p className="text-gray-600 mt-0.5">Monday to Saturday: 9:00 AM – 7:30 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={18} className="text-[#1E4D2B] mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-gray-900 block">Official Support Email:</span>
                <p className="text-gray-600 mt-0.5">esanfoodstn@gmail.com</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Enquiry Form */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-sm p-6 sm:p-10 rounded-3xl border border-gray-200/90 shadow-sm space-y-6">
          <div>
            <h3 className="font-serif font-bold text-2xl text-gray-900">
              Send an Enquiry or Feedback
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Fill in your details below and we will get back to you within 2 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-[#EBF7EE] rounded-2xl border border-[#C8E6C9] text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-[#10B981] text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-serif font-bold text-xl text-[#1E4D2B]">
                Nandri! Enquiry Submitted
              </h4>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                Thank you, <b>{formData.name}</b>. We have received your message regarding <i>{formData.product}</i>.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={handleSendToWhatsApp}
                  className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Phone size={14} />
                  <span>Also Send via WhatsApp</span>
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200"
                >
                  Send Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Selvi Murugan"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-[#FAF9F5] outline-none focus:border-[#1E4D2B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">WhatsApp / Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 bg-[#FAF9F5] outline-none focus:border-[#1E4D2B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="youremail@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 bg-[#FAF9F5] outline-none focus:border-[#1E4D2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Product of Interest</label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-[#FAF9F5] outline-none focus:border-[#1E4D2B] font-medium"
                >
                  <option value="Traditional Multigrain Sathu Maavu">Traditional Multigrain Sathu Maavu</option>
                  <option value="Women's Hormonal Care Health Mix">Women's Hormonal Care Health Mix</option>
                  <option value="Royal Dry Fruit & Seed Protein Laddu">Royal Dry Fruit & Seed Protein Laddu</option>
                  <option value="Karuppu Ulundu Kali Mix">Traditional Karuppu Ulundu Kali Mix</option>
                  <option value="Karuppu Ellu Urundai (Sesame Laddu)">Karuppu Ellu Urundai (Sesame Laddu)</option>
                  <option value="Sprouted Ragi Baby Mix">Sprouted Ragi & Almond Baby Porridge</option>
                  <option value="Fresh Moringa Soup Mix">Fresh Moringa Leaf Herbal Soup Mix</option>
                  <option value="Custom Gift Hamper / Bulk Order">Custom Gift Hamper / Bulk Order</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Message / Specific Health Question</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help? (e.g. Looking for breakfast mix for diabetic elders, or customized laddu boxes for a wedding)"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-[#FAF9F5] outline-none focus:border-[#1E4D2B]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#1E4D2B] hover:bg-[#2D6A4F] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                >
                  <Send size={15} />
                  <span>Submit Enquiry Online</span>
                </button>
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                >
                  <Phone size={15} />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

      {/* Frequently Asked Questions (Collapsible Accordion) */}
      <div className="bg-white/90 backdrop-blur-xs rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#E9E4D6] shadow-xs space-y-5">
        <div className="text-center max-w-xl mx-auto space-y-0.5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DEA02C]">
            Got Questions?
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#183B25]">
            Frequently Asked <span className="text-[#DEA02C]">Questions</span>
          </h2>
          <p className="text-xs text-gray-500 pt-0.5">
            Click on any question to view the answer
          </p>
        </div>

        {/* Collapsible Accordion Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden self-start ${
                  isOpen 
                    ? 'bg-white border-[#FABD44] shadow-sm' 
                    : 'bg-[#FAF8F5]/90 hover:bg-white border-[#E8E2D5] hover:border-[#FABD44]/70 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 cursor-pointer select-none transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                      isOpen ? 'bg-[#DEA02C]' : 'bg-[#183B25]/30'
                    }`} />
                    <h4 className="font-bold text-xs sm:text-sm text-[#183B25] leading-snug">
                      {faq.q}
                    </h4>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#FABD44]/25 text-[#183B25]' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <ChevronDown size={14} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 pl-8.5 animate-in fade-in duration-200 border-t border-gray-100/90">
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      </div>

    </div>
  );
}
