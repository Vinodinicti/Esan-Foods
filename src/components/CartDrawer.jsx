import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Phone, 
  Truck, 
  ShieldCheck, 
  Tag, 
  CheckCircle2,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getCartCheckoutWhatsAppUrl, ESAN_WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
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

  // Checkout form state
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
    paymentMethod: 'UPI' // 'UPI' | 'COD' | 'WhatsApp'
  });
  const [formErrors, setFormErrors] = useState({});
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const freeShippingThreshold = 799;
  const shippingCharge = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 50;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCharge);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'ESAN10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError('');
    } else if (couponCode.trim().toUpperCase() === 'WELCOME15') {
      setDiscountPercent(15);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try "ESAN10" for 10% OFF');
    }
  };

  const validateCheckout = () => {
    const errors = {};
    if (!customer.name.trim()) errors.name = 'Please enter your full name';
    if (!customer.phone.trim() || customer.phone.length < 10) errors.phone = 'Valid 10-digit WhatsApp number is required';
    if (!customer.address.trim()) errors.address = 'Delivery address is required';
    if (!customer.city.trim()) errors.city = 'City/Town is required';
    if (!customer.pincode.trim() || customer.pincode.length < 6) errors.pincode = 'Valid 6-digit Pincode required';
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
        weight: item.selectedWeight || item.weight,
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

    // Save to parent state and localStorage
    onOrderPlaced(newOrder);
    setLastPlacedOrder(newOrder);

    // Launch confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (isWhatsAppDirect) {
      const waUrl = getCartCheckoutWhatsAppUrl(cartItems, customer, grandTotal, discountAmount, shippingCharge);
      window.open(waUrl, '_blank');
    }

    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-3.5 sm:p-5 border-b border-[#E8E2D5] flex items-center justify-between bg-[#FBF9F4]">
          <div className="flex items-center gap-2.5">
            <div className="h-8 sm:h-9 w-auto flex items-center justify-center shrink-0">
              <img 
                src="/brand/esan_logo.png" 
                alt="Esan Foods" 
                className="h-8 sm:h-9 w-auto object-contain" 
              />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#183B25] leading-tight">
                {step === 'cart' && `Shopping Bag (${cartItems.length})`}
                {step === 'checkout' && 'Delivery & Payment'}
                {step === 'success' && 'Order Confirmed!'}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#BA7A18] font-bold">
                100% Traditional South Indian Nutrition
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {onNavigate && (
              <button
                onClick={() => {
                  onClose();
                  onNavigate('cart');
                }}
                className="text-xs text-[#183B25] hover:text-[#BA7A18] font-bold px-2 py-1 rounded-lg bg-white hover:bg-[#FAF7EE] transition-all cursor-pointer border border-[#E8E2D5] shadow-2xs"
                title="Open dedicated Cart Page"
              >
                Full Page ↗
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Indicator */}
        {step !== 'success' && (
          <div className="px-5 py-2.5 bg-[#EBF7EE] border-b border-[#C8E6C9] text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between font-medium text-[#1E4D2B]">
                  <span>Add ₹{amountNeededForFreeShipping} more for <b>FREE Delivery</b>!</span>
                  <span>₹{subtotal} / ₹{freeShippingThreshold}</span>
                </div>
                <div className="w-full bg-white rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-[#2D6A4F] h-1.5 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[#183B25] font-bold">
                <Truck size={15} className="text-[#BA7A18]" />
                <span>Congratulations! You have unlocked FREE Express Delivery!</span>
              </div>
            )}
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* STEP 1: CART ITEMS */}
          {step === 'cart' && (
            <>
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#FAF7F0] flex items-center justify-center text-gray-300">
                    <ShoppingBag size={40} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-gray-800">Your bag is empty</h4>
                    <p className="text-xs text-gray-500 max-w-xs mt-1">
                      Explore our stone-ground health mixes, women's wellness care, and natural protein laddus!
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-[#1E4D2B] text-white text-xs font-bold hover:bg-[#2D6A4F] transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div 
                      key={`${item.id}-${item.selectedWeight || item.weight}-${index}`}
                      className="flex gap-3 p-3 rounded-2xl bg-[#FAF9F5] border border-[#EDE8DE] hover:border-[#D6CEBF] transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-18 h-18 rounded-xl object-cover border border-black/5 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-gray-800 leading-snug">{item.name}</h4>
                            <span className="text-[11px] font-semibold text-[#52796F] block">
                              Pack: {item.selectedWeight || item.weight}
                            </span>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id, item.selectedWeight)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.selectedWeight, Math.max(1, item.quantity - 1))}
                              className="w-7 h-7 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.selectedWeight, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <span className="font-serif font-bold text-sm text-[#1E4D2B]">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Coupon Code Section */}
                  <div className="pt-2">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={14} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Coupon: try ESAN10"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs uppercase font-medium bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#1E4D2B]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="px-4 py-2 bg-[#1E4D2B] text-white rounded-xl text-xs font-bold hover:bg-[#2D6A4F] transition-all"
                      >
                        Apply
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-[11px] text-[#16A34A] font-semibold mt-1.5 flex items-center gap-1">
                        <CheckCircle2 size={13} />
                        Coupon ESAN10 applied! {discountPercent}% discount active.
                      </p>
                    )}
                    {couponError && (
                      <p className="text-[11px] text-red-500 font-medium mt-1.5">
                        {couponError}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT FORM */}
          {step === 'checkout' && (
            <div className="space-y-4 text-xs">
              <button
                onClick={() => setStep('cart')}
                className="text-[#1E4D2B] font-semibold hover:underline flex items-center gap-1 mb-2"
              >
                ← Back to Bag
              </button>

              <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#EDE8DE] space-y-3">
                <h4 className="font-serif font-bold text-sm text-gray-900 border-b pb-2">
                  1. Delivery Details
                </h4>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Meenakshi Sundaram"
                    value={customer.name}
                    onChange={(e) => setCustomer({...customer, name: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#1E4D2B]"
                  />
                  {formErrors.name && <p className="text-red-500 text-[10px] mt-0.5">{formErrors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      placeholder="10-digit number"
                      value={customer.phone}
                      onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                      className="w-full p-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#1E4D2B]"
                    />
                    {formErrors.phone && <p className="text-red-500 text-[10px] mt-0.5">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="for invoice copy"
                      value={customer.email}
                      onChange={(e) => setCustomer({...customer, email: e.target.value})}
                      className="w-full p-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#1E4D2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Complete Street Address *</label>
                  <textarea
                    rows={2}
                    placeholder="House/Flat No, Street, Landmark"
                    value={customer.address}
                    onChange={(e) => setCustomer({...customer, address: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#1E4D2B]"
                  />
                  {formErrors.address && <p className="text-red-500 text-[10px] mt-0.5">{formErrors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">City / Town *</label>
                    <input
                      type="text"
                      placeholder="e.g. Coimbatore"
                      value={customer.city}
                      onChange={(e) => setCustomer({...customer, city: e.target.value})}
                      className="w-full p-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#1E4D2B]"
                    />
                    {formErrors.city && <p className="text-red-500 text-[10px] mt-0.5">{formErrors.city}</p>}
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Pincode *</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="6 digits"
                      value={customer.pincode}
                      onChange={(e) => setCustomer({...customer, pincode: e.target.value})}
                      className="w-full p-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#1E4D2B]"
                    />
                    {formErrors.pincode && <p className="text-red-500 text-[10px] mt-0.5">{formErrors.pincode}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Special Delivery Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Ring bell, deliver in morning"
                    value={customer.notes}
                    onChange={(e) => setCustomer({...customer, notes: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white outline-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#EDE8DE] space-y-2">
                <h4 className="font-serif font-bold text-sm text-gray-900 border-b pb-2">
                  2. Select Payment Method
                </h4>

                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  customer.paymentMethod === 'UPI' ? 'border-[#1E4D2B] bg-[#EBF7EE]' : 'border-gray-200 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={customer.paymentMethod === 'UPI'}
                    onChange={() => setCustomer({...customer, paymentMethod: 'UPI'})}
                    className="text-[#1E4D2B] focus:ring-[#1E4D2B]"
                  />
                  <div className="flex-1">
                    <span className="font-bold text-gray-800 block">Online UPI / GPay / PhonePe / Paytm</span>
                    <span className="text-[10px] text-gray-500">Scan QR Code or direct UPI payment</span>
                  </div>
                  <QrCode size={18} className="text-[#1E4D2B]" />
                </label>

                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  customer.paymentMethod === 'COD' ? 'border-[#1E4D2B] bg-[#EBF7EE]' : 'border-gray-200 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={customer.paymentMethod === 'COD'}
                    onChange={() => setCustomer({...customer, paymentMethod: 'COD'})}
                    className="text-[#1E4D2B] focus:ring-[#1E4D2B]"
                  />
                  <div>
                    <span className="font-bold text-gray-800 block">Cash on Delivery (COD)</span>
                    <span className="text-[10px] text-gray-500">Pay cash upon safe parcel arrival</span>
                  </div>
                </label>
              </div>

              {/* UPI Modal / QR preview if UPI is selected */}
              {customer.paymentMethod === 'UPI' && (
                <div className="p-3 bg-[#FEF7EB] rounded-2xl border border-[#FFE082] text-center space-y-1">
                  <p className="font-bold text-[#8C5806]">Esan Foods Official UPI ID:</p>
                  <p className="font-mono text-xs font-semibold bg-white py-1 px-3 rounded-lg border border-[#FDE68A] inline-block text-gray-800">
                    esanfoods@okaxis
                  </p>
                  <p className="text-[10px] text-gray-500">You can also confirm via WhatsApp payment screenshot.</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: ORDER SUCCESS */}
          {step === 'success' && lastPlacedOrder && (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">Order Placed Successfully!</span>
                <h4 className="font-serif text-2xl font-bold text-gray-900 mt-1">Nandri! Thank You</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Order ID: <b className="font-mono text-gray-900">{lastPlacedOrder.id}</b>
                </p>
              </div>

              <div className="w-full bg-[#FAF9F5] p-4 rounded-2xl border border-[#EDE8DE] text-left text-xs space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Customer:</span>
                  <span className="font-bold text-gray-800">{lastPlacedOrder.customerName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">WhatsApp:</span>
                  <span className="font-bold text-gray-800">{lastPlacedOrder.phone}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Total Amount:</span>
                  <span className="font-bold text-[#1E4D2B] text-sm">₹{lastPlacedOrder.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment:</span>
                  <span className="font-medium text-gray-800">{lastPlacedOrder.paymentMethod}</span>
                </div>
              </div>

              <div className="w-full space-y-2 pt-2">
                <a
                  href={`https://wa.me/${ESAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Vanakkam! I placed order ${lastPlacedOrder.id} for ₹${lastPlacedOrder.total}. Please confirm delivery.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#20BA5A] transition-all"
                >
                  <Phone size={16} />
                  <span>Track & Chat on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    onClearCart();
                    onClose();
                    setStep('cart');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer (Pricing & Buttons) */}
        {cartItems.length > 0 && step !== 'success' && (
          <div className="p-5 border-t border-gray-100 bg-[#FBF9F4] space-y-3">
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-semibold text-gray-800">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#16A34A] font-semibold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charges</span>
                <span className="font-semibold text-gray-800">
                  {shippingCharge === 0 ? <span className="text-[#16A34A] font-bold">FREE</span> : `₹${shippingCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span className="font-serif">Total Payable</span>
                <span className="font-serif text-lg text-[#1E4D2B]">₹{grandTotal}</span>
              </div>
            </div>

            {/* Next Action Buttons */}
            {step === 'cart' ? (
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#183B25] hover:bg-[#132E1D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>

                {/* Direct 1-Click WhatsApp Order */}
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/40 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone size={15} />
                  <span>1-Click Order on WhatsApp (9688405829)</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => handlePlaceOrder(false)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#183B25] hover:bg-[#132E1D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 size={16} />
                  <span>Confirm Order • ₹{grandTotal}</span>
                </button>

                <button
                  onClick={() => handlePlaceOrder(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#20BA5A] transition-all"
                >
                  <Phone size={15} />
                  <span>Confirm via WhatsApp (Fastest)</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-[#1E4D2B]" /> 100% Secure
              </span>
              <span>•</span>
              <span>Direct Stone Mill Fresh</span>
              <span>•</span>
              <span>Tamil Nadu Heritage</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
