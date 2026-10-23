export const ESAN_WHATSAPP_NUMBER = "919688405829";
export const ESAN_INSTAGRAM_URL = "https://www.instagram.com/esan_foods/";

/**
 * Generate a WhatsApp chat URL for a single product enquiry/order
 */
export const getProductWhatsAppUrl = (product, selectedWeight = null) => {
  const weight = selectedWeight || product.weight;
  const price = product.priceByWeight ? product.priceByWeight[weight] || product.price : product.price;

  const message = `Vanakkam Esan Foods!
I would like to order:
*${product.name}* (${product.tamilName || ''})
Weight: ${weight}
Price: ₹${price}

Please let me know the payment and delivery details. Thank you!`;

  return `https://wa.me/${ESAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

/**
 * Generate a WhatsApp chat URL for an entire cart checkout
 */
export const getCartCheckoutWhatsAppUrl = (cartItems, customerDetails, totalAmount, discount = 0, shipping = 0) => {
  const itemsText = cartItems
    .map((item, idx) => `${idx + 1}. *${item.name}* (${item.selectedWeight || item.weight}) x ${item.quantity} = ₹${item.price * item.quantity}`)
    .join('\n');

  const message = `*NEW ORDER - ESAN FOODS WEBSITE*

*Customer Details:*
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Address: ${customerDetails.address}, ${customerDetails.city} - ${customerDetails.pincode}
${customerDetails.notes ? `Note: ${customerDetails.notes}\n` : ''}
*Order Items:*
${itemsText}

*Billing:*
Subtotal: ₹${totalAmount + discount - shipping}
${discount > 0 ? `Discount: -₹${discount}\n` : ''}Shipping: ${shipping === 0 ? 'FREE' : '₹' + shipping}
*Total Payable: ₹${totalAmount}*
Payment Mode: ${customerDetails.paymentMethod || 'WhatsApp Direct Confirmation'}

Please confirm my order and share delivery tracking once dispatched. Thank you!`;

  return `https://wa.me/${ESAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

/**
 * Quick enquiry WhatsApp link
 */
export const getGeneralEnquiryWhatsAppUrl = (topic = "General Enquiry") => {
  const message = `Vanakkam Esan Foods!\nI have an enquiry regarding *${topic}*. Could you please help me with more details?`;
  return `https://wa.me/${ESAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
