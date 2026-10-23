import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import { initialProducts, initialOrders } from './data/products';
import { ESAN_WHATSAPP_NUMBER } from './utils/whatsapp';
import { Phone, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './components/Icons';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState('home');

  // Products state (persisted in localStorage with latest images merged and admin products preserved)
  const [products, setProducts] = useState(() => {
    try {
      localStorage.removeItem('esan_products');
      localStorage.removeItem('esan_products_v2');
      localStorage.removeItem('esan_products_v3');
      localStorage.removeItem('esan_products_v4');
      localStorage.removeItem('esan_products_v5');
    } catch (e) {}

    const saved = localStorage.getItem('esan_products_v7') || localStorage.getItem('esan_products_v6');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const initialMap = new Map(initialProducts.map(ip => [ip.id, ip]));
          const merged = parsed.map(p => {
            const init = initialMap.get(p.id);
            if (init) {
              return {
                ...init,
                ...p,
                image: p.image || init.image
              };
            }
            return p; // Keep custom product added by admin
          });

          initialProducts.forEach(init => {
            if (!merged.some(p => p.id === init.id)) {
              merged.push(init);
            }
          });
          return merged;
        }
      } catch (e) {}
    }
    return initialProducts;
  });

  // Orders state (persisted in localStorage)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('esan_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Cart state (persisted in localStorage)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('esan_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: 'esan-men',
        name: "Men's Health Mix",
        selectedWeight: '250g',
        price: 180,
        quantity: 1,
        image: '/products/mens_health_mix.jpg'
      }
    ];
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('esan_products_v7', JSON.stringify(products));
    localStorage.setItem('esan_products_v6', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('esan_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('esan_cart', JSON.stringify(cart));
  }, [cart]);

  // Show brief toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart Handlers
  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const weight = productToAdd.selectedWeight || productToAdd.weight || '500g';
      const existingIndex = prevCart.findIndex(
        (item) => item.id === productToAdd.id && item.selectedWeight === weight
      );

      const addQty = productToAdd.quantity || 1;

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += addQty;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            id: productToAdd.id,
            name: productToAdd.name,
            selectedWeight: weight,
            price: productToAdd.price,
            quantity: addQty,
            image: productToAdd.image
          }
        ];
      }
    });

    showToast(`Added ${productToAdd.name} (${productToAdd.selectedWeight || '500g'}) to Cart!`);
  };

  const handleUpdateQuantity = (productId, selectedWeight, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId, selectedWeight);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedWeight === selectedWeight
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId, selectedWeight) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === productId && item.selectedWeight === selectedWeight)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderPlaced = (newOrder) => {
    setOrders([newOrder, ...orders]);
  };

  // Computed Cart metrics
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7EE] text-[#2D382E]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#1E4D2B] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-bottom-4 duration-200 border border-[#52B788]">
          <CheckCircle2 size={18} className="text-[#A3E635]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar (Hidden in Admin Page) */}
      {activePage !== 'admin' && (
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          cartCount={cartCount}
          cartTotal={cartTotal}
          openCart={() => setIsCartOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      {/* Main Page Routing */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            products={products}
            onAddToCart={handleAddToCart}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              setActivePage('products');
            }}
            onNavigate={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'products' && (
          <ProductsPage
            products={products}
            onAddToCart={handleAddToCart}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {activePage === 'about' && (
          <AboutPage 
            onNavigate={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
          />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}

        {activePage === 'admin' && (
          <AdminPage
            products={products}
            setProducts={setProducts}
            orders={orders}
            setOrders={setOrders}
            onBackToStore={() => setActivePage('home')}
          />
        )}
      </main>

      {/* Slide-out Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Product Quick View Modal */}
      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Floating WhatsApp Action Button - Icon Only in Brand Theme */}
      {activePage !== 'admin' && (
        <a
          href={`https://wa.me/${ESAN_WHATSAPP_NUMBER}?text=${encodeURIComponent("Vanakkam Esan Foods! I would like to order traditional food items.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#183B25] hover:bg-[#224E32] text-[#FABD44] shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-[#FABD44]/50 hover:shadow-black/30 group cursor-pointer"
          title="Direct WhatsApp 9688405829"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon size={28} className="text-[#FABD44] group-hover:scale-105 transition-transform" />
        </a>
      )}

      {/* Footer (Hidden in Admin Page) */}
      {activePage !== 'admin' && (
        <Footer onNavigate={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      )}
    </div>
  );
}
