import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Tag, 
  Phone, 
  QrCode, 
  Store, 
  Check, 
  AlertTriangle,
  Leaf
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ESAN_WHATSAPP_NUMBER, getCartCheckoutWhatsAppUrl } from '../utils/whatsapp';

export default function CartPage({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart, 
  onOrderPlaced, 
  onNavigate 
}) {
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Customer delivery details
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
    paymentMethod: 'UPI' // 'UPI' | 'COD'
  });
  const [formErrors, setFormErrors] = useState({});
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  // Pricing logic
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const freeShippingThreshold = 799;
  const shippingCharge = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 50;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCharge);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'ESAN10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError('');
    } else if (code === 'WELCOME15') {
      setDiscountPercent(15);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid code. Try "ESAN10" for 10% OFF');
    }
  };

  const validateCheckout = () => {
    const errors = {};
    if (!customer.name.trim()) errors.name = 'Please enter your full name';
    if (!customer.phone.trim() || customer.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Valid 10-digit WhatsApp number required';
    }
    if (!customer.address.trim()) errors.address = 'Street address is required';
    if (!customer.city.trim()) errors.city = 'City or town is required';
    if (!customer.pincode.trim() || customer.pincode.replace(/\D/g, '').length < 6) {
      errors.pincode = 'Valid 6-digit Pincode required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (isWhatsAppDirect = false) => {
    if (!validateCheckout()) return;

    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      customerName: customer.name,
      phone: customer.phone,
      email: customer.email || 'N/A',
      address: `${customer.address}, ${customer.city} - ${customer.pincode}`,
      items: cartItems.map(item => ({
        name: item.name,
        weight: item.selectedWeight || item.weight || '500g',
        quantity: item.quantity,
        price: item.price
      })),
      total: grandTotal,
      paymentMethod: isWhatsAppDirect ? 'WhatsApp Order' : customer.paymentMethod,
      orderType: isWhatsAppDirect ? 'WhatsApp Direct' : 'Website Order',
      status: 'Pending',
      date: new Date().toLocaleString(),
      trackingId: 'ESAN-' + Math.floor(1000 + Math.random() * 9000)
    };

    onOrderPlaced(newOrder);
    setLastPlacedOrder(newOrder);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (isWhatsAppDirect) {
      const waUrl = getCartCheckoutWhatsAppUrl(cartItems, customer, grandTotal, discountAmount, shippingCharge);
      window.open(waUrl, '_blank');
    }

    setStep('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -------------------------------------------------------------
  // 1. ORDER SUCCESS VIEW
  // -------------------------------------------------------------
  if (step === 'success' && lastPlacedOrder) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D5] shadow-xl text-center space-y-6">
          
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EBF7EE] text-[#183B25] flex items-center justify-center mx-auto border-2 border-[#C8E6C9] shadow-inner">
            <CheckCircle2 size={40} className="text-[#1E4D2B]" />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#BA7A18] block mb-1">
              Order Confirmed &amp; Queued For Fresh Packing
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#183B25]">
              Nandri! Thank You
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Order ID: <b className="font-mono text-[#183B25]">{lastPlacedOrder.id}</b>
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-[#FAF9F5] p-4 sm:p-5 rounded-2xl border border-[#EDE8DE] text-left text-xs space-y-2.5">
            <div className="flex justify-between border-b border-gray-200/80 pb-2">
              <span className="text-gray-500">Customer Name:</span>
              <span className="font-bold text-gray-800">{lastPlacedOrder.customerName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200/80 pb-2">
              <span className="text-gray-500">WhatsApp Contact:</span>
              <span className="font-bold text-gray-800">{lastPlacedOrder.phone}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200/80 pb-2">
              <span className="text-gray-500">Delivery Address:</span>
              <span className="font-medium text-gray-800 text-right max-w-xs">{lastPlacedOrder.address}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200/80 pb-2">
              <span className="text-gray-500">Payment Option:</span>
              <span className="font-bold text-[#183B25]">{lastPlacedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold">
              <span className="text-gray-800">Total Payable:</span>
              <span className="text-[#183B25] font-serif text-base">₹{lastPlacedOrder.total}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <a
              href={`https://wa.me/${ESAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Vanakkam! I placed order ${lastPlacedOrder.id} for ₹${lastPlacedOrder.total}. Please confirm delivery.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Phone size={16} />
              <span>Track &amp; Confirm on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClearCart();
                onNavigate('products');
              }}
              className="w-full py-3 px-5 rounded-xl bg-[#183B25] hover:bg-[#132E1D] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Store size={15} className="text-[#FABD44]" />
              <span>Continue Shopping</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. EMPTY CART VIEW
  // -------------------------------------------------------------
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-16 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D5] shadow-lg text-center space-y-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FAF7EE] text-[#183B25]/30 flex items-center justify-center mx-auto border border-[#E8E2D5]">
            <ShoppingBag size={44} />
          </div>
          
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#183B25]">
              Your Basket is Empty
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto mt-2 leading-relaxed">
              Experience the genuine taste of cold stone-milled ancestral health mixes, women's wellness care, and authentic herbal rice podis.
            </p>
          </div>

          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#183B25] hover:bg-[#132E1D] text-white text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Leaf size={15} className="text-[#FABD44]" />
            <span>Explore All Traditional Products</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. MAIN CART & CHECKOUT PAGE
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-20 sm:pt-24 pb-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E2D5]">
          <div>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs text-[#183B25] hover:text-[#BA7A18] font-bold inline-flex items-center gap-1.5 mb-1.5 cursor-pointer transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Continue Shopping</span>
            </button>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#183B25] leading-tight">
              Shopping Basket &amp; Checkout
            </h1>
            <p className="text-xs text-gray-600">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your bag • Direct stone-ground purity
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setStep('cart')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                step === 'cart'
                  ? 'bg-[#183B25] text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-[#E8E2D5]'
              }`}
            >
              1. Review Bag
            </button>
            <span className="text-gray-300">→</span>
            <button
              onClick={() => setStep('checkout')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                step === 'checkout'
                  ? 'bg-[#183B25] text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-[#E8E2D5]'
              }`}
            >
              2. Delivery &amp; Pay
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-[#EBF7EE] p-3 sm:p-4 rounded-2xl border border-[#C8E6C9] shadow-2xs">
          {amountNeededForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-[#1E4D2B]">
                <span className="flex items-center gap-1.5">
                  <Truck size={14} className="text-[#BA7A18]" />
                  Add ₹{amountNeededForFreeShipping} more to unlock <b>FREE Delivery</b>!
                </span>
                <span>₹{subtotal} / ₹{freeShippingThreshold}</span>
              </div>
              <div className="w-full bg-white rounded-full h-2 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-[#183B25] to-[#2D6A4F] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-[#183B25]">
              <Truck size={16} className="text-[#BA7A18]" />
              <span>🎉 Congratulations! You have unlocked FREE Express Delivery across India!</span>
            </div>
          )}
        </div>

        {/* Responsive Grid: Left Column (Items / Form) & Right Column (Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT COLUMN: Bag Items OR Checkout Form */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* TAB 1: CART ITEMS */}
            {step === 'cart' && (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#E8E2D5] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h2 className="font-serif font-bold text-base sm:text-lg text-[#183B25]">
                    Items in Your Basket ({cartItems.length})
                  </h2>
                  <button
                    onClick={onClearCart}
                    className="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div 
                      key={`${item.id}-${item.selectedWeight || item.weight}-${index}`}
                      className="flex gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EDE8DE] hover:border-[#D6CEBF] transition-all"
                    >
                      {/* Product Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-black/5 shrink-0 bg-white"
                      />

                      {/* Info & Quantity */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <h3 className="text-xs sm:text-sm font-bold text-[#183B25] leading-snug truncate">
                              {item.name}
                            </h3>
                            <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-white border border-[#E8E2D5] text-[10px] sm:text-[11px] font-bold text-[#BA7A18]">
                              Pack: {item.selectedWeight || item.weight || '500g'}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => onRemoveItem(item.id, item.selectedWeight)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer shrink-0"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Price & Quantity Stepper */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.selectedWeight, Math.max(1, item.quantity - 1))}
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 sm:w-9 text-center text-xs font-bold text-[#183B25]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.selectedWeight, item.quantity + 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <span className="font-serif font-bold text-sm sm:text-base text-[#183B25]">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue to Checkout Button on Mobile & Desktop */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setStep('checkout');
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#183B25] hover:bg-[#132E1D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    <span>Proceed to Delivery Details</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: CHECKOUT & ADDRESS FORM */}
            {step === 'checkout' && (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#E8E2D5] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <button
                    onClick={() => setStep('cart')}
                    className="text-xs text-[#183B25] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft size={13} />
                    <span>Back to Items</span>
                  </button>
                  <span className="text-xs text-gray-500 font-medium">Step 2 of 2</span>
                </div>

                {/* Delivery Information */}
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#183B25]">
                    1. Delivery Address
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Meenakshi Sundaram"
                      value={customer.name}
                      onChange={(e) => setCustomer({...customer, name: e.target.value})}
                      className="w-full p-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:border-[#183B25] focus:ring-1 focus:ring-[#183B25] outline-none transition-all"
                    />
                    {formErrors.name && <p className="text-red-500 text-[11px] mt-1">{formErrors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile"
                        value={customer.phone}
                        onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:border-[#183B25] focus:ring-1 focus:ring-[#183B25] outline-none transition-all"
                      />
                      {formErrors.phone && <p className="text-red-500 text-[11px] mt-1">{formErrors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="for invoice copy"
                        value={customer.email}
                        onChange={(e) => setCustomer({...customer, email: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:border-[#183B25] focus:ring-1 focus:ring-[#183B25] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Street Address / House No / Landmark *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Door No, Street Name, Landmark"
                      value={customer.address}
                      onChange={(e) => setCustomer({...customer, address: e.target.value})}
                      className="w-full p-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:border-[#183B25] focus:ring-1 focus:ring-[#183B25] outline-none transition-all"
                    />
                    {formErrors.address && <p className="text-red-500 text-[11px] mt-1">{formErrors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        City / Town *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Coimbatore"
                        value={customer.city}
                        onChange={(e) => setCustomer({...customer, city: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:border-[#183B25] focus:ring-1 focus:ring-[#183B25] outline-none transition-all"
                      />
                      {formErrors.city && <p className="text-red-500 text-[11px] mt-1">{formErrors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="6-digit pincode"
                        value={customer.pincode}
                        onChange={(e) => setCustomer({...customer, pincode: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:border-[#183B25] focus:ring-1 focus:ring-[#183B25] outline-none transition-all"
                      />
                      {formErrors.pincode && <p className="text-red-500 text-[11px] mt-1">{formErrors.pincode}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Leave with security, call before arrival"
                      value={customer.notes}
                      onChange={(e) => setCustomer({...customer, notes: e.target.value})}
                      className="w-full p-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#183B25]">
                    2. Payment Method
                  </h3>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    customer.paymentMethod === 'UPI'
                      ? 'border-[#183B25] bg-[#EBF7EE]'
                      : 'border-gray-200 bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={customer.paymentMethod === 'UPI'}
                      onChange={() => setCustomer({...customer, paymentMethod: 'UPI'})}
                      className="text-[#183B25] focus:ring-[#183B25]"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-xs sm:text-sm text-gray-800 block">
                        Online UPI / GPay / PhonePe / Paytm
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-gray-500">
                        Zero transaction fee • Instant confirmation
                      </span>
                    </div>
                    <QrCode size={18} className="text-[#183B25]" />
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    customer.paymentMethod === 'COD'
                      ? 'border-[#183B25] bg-[#EBF7EE]'
                      : 'border-gray-200 bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={customer.paymentMethod === 'COD'}
                      onChange={() => setCustomer({...customer, paymentMethod: 'COD'})}
                      className="text-[#183B25] focus:ring-[#183B25]"
                    />
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-gray-800 block">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-gray-500">
                        Pay cash upon safe parcel arrival at your doorstep
                      </span>
                    </div>
                  </label>

                  {/* UPI ID Info Box */}
                  {customer.paymentMethod === 'UPI' && (
                    <div className="p-3 bg-[#FEF7EB] rounded-xl border border-[#FFE082] text-center space-y-1">
                      <p className="font-bold text-xs text-[#8C5806]">Esan Foods Official UPI ID:</p>
                      <p className="font-mono text-xs font-semibold bg-white py-1 px-3 rounded-md border border-[#FDE68A] inline-block text-gray-800">
                        esanfoods@okaxis
                      </p>
                      <p className="text-[10px] text-gray-500">You will also receive instant order updates on WhatsApp.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Heritage Trust Badges */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl bg-white border border-[#E8E2D5] shadow-2xs">
                <span className="block text-base">🌱</span>
                <span className="text-[10px] font-bold text-[#183B25] block mt-0.5">100% Sprouted</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E8E2D5] shadow-2xs">
                <span className="block text-base">🪨</span>
                <span className="text-[10px] font-bold text-[#183B25] block mt-0.5">Cold Stone Milled</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E8E2D5] shadow-2xs">
                <span className="block text-base">🛡️</span>
                <span className="text-[10px] font-bold text-[#183B25] block mt-0.5">No Preservatives</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary & Checkout Actions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#E8E2D5] shadow-xs space-y-4 lg:sticky lg:top-24">
              
              <h2 className="font-serif font-bold text-base sm:text-lg text-[#183B25] pb-2 border-b border-gray-100">
                Order Summary
              </h2>

              {/* Coupon Code Section */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#183B25] block">
                  Have a Coupon Code?
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={13} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Try ESAN10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs uppercase font-medium bg-[#FAF7EE]/60 border border-[#E8E2D5] rounded-xl outline-none focus:border-[#183B25]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-[#183B25] hover:bg-[#132E1D] text-[#FABD44] rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-xs"
                  >
                    Apply
                  </button>
                </div>

                {couponApplied && (
                  <p className="text-[11px] text-[#16A34A] font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    Coupon applied! {discountPercent}% discount active.
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-500 font-medium">
                    {couponError}
                  </p>
                )}
              </div>

              {/* Price Calculation Lines */}
              <div className="space-y-2 text-xs pt-2 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-bold text-gray-800">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#16A34A] font-bold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Shipping &amp; Handling</span>
                  <span>
                    {shippingCharge === 0 ? (
                      <span className="text-[#16A34A] font-bold">FREE Delivery</span>
                    ) : (
                      <span className="font-semibold text-gray-800">₹{shippingCharge}</span>
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-gray-200 text-sm font-bold text-gray-900">
                  <span className="font-serif text-base">Grand Total</span>
                  <span className="font-serif text-xl sm:text-2xl text-[#183B25]">₹{grandTotal}</span>
                </div>
              </div>

              {/* Main Actions */}
              <div className="space-y-2.5 pt-2">
                {step === 'cart' ? (
                  <button
                    onClick={() => {
                      setStep('checkout');
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#183B25] hover:bg-[#132E1D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={15} />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handlePlaceOrder(false)}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#183B25] hover:bg-[#132E1D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
                    >
                      <CheckCircle2 size={16} className="text-[#FABD44]" />
                      <span>Confirm Order • ₹{grandTotal}</span>
                    </button>

                    <button
                      onClick={() => handlePlaceOrder(true)}
                      className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
                    >
                      <Phone size={15} />
                      <span>Order Directly via WhatsApp</span>
                    </button>
                  </>
                )}
              </div>

              {/* Security Trust Note */}
              <div className="flex items-center justify-center gap-3 text-[10px] text-gray-500 pt-2 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-[#183B25]" /> 100% Authentic
                </span>
                <span>•</span>
                <span>Direct Stone Mill Fresh</span>
                <span>•</span>
                <span>Tamil Nadu Heritage</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Floating Bottom Action Strip for Mobile (Quick Checkout Tap) */}
      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E2D5] px-4 py-2.5 shadow-lg">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div>
            <span className="text-[10px] text-gray-500 block uppercase tracking-wider">Total Amount</span>
            <span className="font-serif font-bold text-lg text-[#183B25]">₹{grandTotal}</span>
          </div>

          {step === 'cart' ? (
            <button
              onClick={() => {
                setStep('checkout');
                window.scrollTo({ top: 100, behavior: 'smooth' });
              }}
              className="py-2.5 px-5 rounded-xl bg-[#183B25] hover:bg-[#132E1D] text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
            >
              <span>Checkout</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={() => handlePlaceOrder(false)}
              className="py-2.5 px-5 rounded-xl bg-[#183B25] hover:bg-[#132E1D] text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
            >
              <CheckCircle2 size={14} className="text-[#FABD44]" />
              <span>Confirm</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
