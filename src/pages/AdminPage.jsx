import React, { useState } from 'react';
import { 
  Shield, 
  Package, 
  ShoppingBag, 
  AlertTriangle, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Search, 
  Phone, 
  Eye, 
  EyeOff,
  Filter,
  LogOut,
  Store,
  CheckCircle2,
  Boxes,
  MapPin,
  MessageCircle,
  Clock,
  ArrowUpDown
} from 'lucide-react';
import { ESAN_WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function AdminPage({ 
  products, 
  setProducts, 
  orders, 
  setOrders, 
  onBackToStore 
}) {
  // Authentication state (admin / admin123)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('esan_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('esan_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('esan_admin_auth');
    setUsername('');
    setPassword('');
    setAuthError('');
  };

  // Admin View State: Only 2 essential tabs!
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockStatusFilter, setStockStatusFilter] = useState('all'); // 'all' | 'low' | 'out'
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Modal state for Add/Edit product (streamlined to essentials)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    category: 'Traditional Health Mixes',
    price: 180,
    weight: '250g',
    stockCount: 30,
    inStock: true,
    image: '/products/mens_health_mix.jpg',
    tag: 'Fresh Arrival',
    description: ''
  });

  // Preset image gallery for easy selection
  const presetImages = [
    { label: "Men's Mix", path: '/products/mens_health_mix.jpg' },
    { label: "Women's Mix", path: '/products/womens_health_mix.jpg' },
    { label: "Bone Strong", path: '/products/bone_strong_mix.jpg' },
    { label: "Sugar Control", path: '/products/sugar_control_mix.jpg' },
    { label: "Pirandai Podi", path: '/products/pirandai_satham_podi_card.jpg' },
    { label: "Murungai Podi", path: '/products/murungai_keerai_podi_card.jpg' },
    { label: "Mudakathan", path: '/products/mudakathan_keerai_podi_card.jpg' },
    { label: "Vallarai Podi", path: '/products/vallarai_keerai_podi_card.jpg' },
    { label: "Thuvaiyal Podi", path: '/products/pirandai_thuvaiyal_podi_card.jpg' }
  ];

  // Essential Stats
  const totalProducts = products.length;
  const inStockCount = products.filter(p => p.inStock && (p.stockCount === undefined || p.stockCount > 0)).length;
  const outOfStockCount = products.filter(p => !p.inStock || p.stockCount === 0).length;
  const lowStockCount = products.filter(p => p.inStock && p.stockCount > 0 && p.stockCount <= 10).length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  // Filtered Products
  const filteredProducts = products.filter(product => {
    // Category filter
    if (categoryFilter !== 'all' && product.category !== categoryFilter) return false;
    // Stock filter
    if (stockStatusFilter === 'out' && (product.inStock && product.stockCount > 0)) return false;
    if (stockStatusFilter === 'low' && (!product.inStock || product.stockCount > 10 || product.stockCount <= 0)) return false;
    // Search filter
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      const matchName = product.name && product.name.toLowerCase().includes(q);
      const matchCat = product.category && product.category.toLowerCase().includes(q);
      if (!matchName && !matchCat) return false;
    }
    return true;
  });

  // Filtered Orders
  const filteredOrders = orders.filter(order => {
    if (orderStatusFilter !== 'all' && order.status !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        (order.id && order.id.toLowerCase().includes(q)) ||
        (order.customerName && order.customerName.toLowerCase().includes(q)) ||
        (order.phone && order.phone.includes(q))
      );
    }
    return true;
  });

  // Stock Adjustment (Direct inline)
  const handleAdjustStock = (productId, delta) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        const current = p.stockCount !== undefined ? Number(p.stockCount) : 20;
        const newCount = Math.max(0, current + delta);
        return { 
          ...p, 
          stockCount: newCount, 
          inStock: newCount > 0 
        };
      }
      return p;
    });
    setProducts(updated);
  };

  // Quick In-Stock Toggle
  const handleToggleStock = (productId) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        const nextInStock = !p.inStock;
        return { 
          ...p, 
          inStock: nextInStock,
          stockCount: nextInStock && (p.stockCount === 0 || p.stockCount === undefined) ? 20 : p.stockCount
        };
      }
      return p;
    });
    setProducts(updated);
  };

  // Open modal to add product
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      category: 'Traditional Health Mixes',
      price: 180,
      weight: '250g',
      stockCount: 30,
      inStock: true,
      image: '/products/mens_health_mix.jpg',
      tag: 'Fresh Arrival',
      description: 'Slow roasted ancestral grains, 100% stone ground.'
    });
    setIsProductModalOpen(true);
  };

  // Open modal to edit product
  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductFormData({
      name: prod.name || '',
      category: prod.category || 'Traditional Health Mixes',
      price: prod.price || 180,
      weight: prod.weight || '250g',
      stockCount: prod.stockCount !== undefined ? prod.stockCount : 25,
      inStock: prod.inStock !== false,
      image: prod.image || '/products/mens_health_mix.jpg',
      tag: prod.tag || 'Traditional',
      description: prod.description || ''
    });
    setIsProductModalOpen(true);
  };

  // Save product (Add or Edit)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productFormData.name.trim()) return;

    if (editingProduct) {
      // Edit existing product
      const updated = products.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: productFormData.name.trim(),
            category: productFormData.category,
            price: Number(productFormData.price),
            weight: productFormData.weight,
            stockCount: Number(productFormData.stockCount),
            inStock: Boolean(productFormData.inStock) && Number(productFormData.stockCount) > 0,
            image: productFormData.image,
            tag: productFormData.tag,
            description: productFormData.description
          };
        }
        return p;
      });
      setProducts(updated);
    } else {
      // Add new product
      const newId = 'esan-prod-' + Date.now().toString().slice(-6);
      const newProd = {
        id: newId,
        name: productFormData.name.trim(),
        category: productFormData.category,
        price: Number(productFormData.price),
        originalPrice: Math.round(Number(productFormData.price) * 1.15),
        weight: productFormData.weight || '250g',
        weightOptions: [productFormData.weight || '250g'],
        priceByWeight: { [productFormData.weight || '250g']: Number(productFormData.price) },
        stockCount: Number(productFormData.stockCount),
        inStock: Boolean(productFormData.inStock) && Number(productFormData.stockCount) > 0,
        image: productFormData.image,
        tag: productFormData.tag || 'Fresh Arrival',
        description: productFormData.description || 'Authentic traditional recipe prepared with care.',
        benefits: ['100% Traditional Stone Milled', 'Zero Preservatives', 'Direct Farm Sourced'],
        ingredients: ['Native Tamil Millets & Ancestral Grains'],
        rating: 5.0,
        reviewCount: 1
      };
      setProducts([newProd, ...products]);
    }
    setIsProductModalOpen(false);
  };

  // Delete product
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Remove this product from store?")) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
  };

  // -------------------------------------------------------------
  // 1. BRAND THEMED LOGIN SCREEN (Mobile-Optimized & Desktop)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-[#FAF7EE] flex flex-col justify-center items-center p-3.5 sm:p-6 relative overflow-hidden">
        
        {/* Subtle Ambient Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#183B25]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#FABD44]/10 blur-3xl pointer-events-none" />

        {/* Top Floating Back to Store Bar for Mobile & Desktop */}
        <div className="w-full max-w-sm sm:max-w-md mb-2.5 sm:mb-3 flex items-center justify-between px-1">
          <button
            type="button"
            onClick={onBackToStore}
            className="text-xs text-[#183B25] hover:text-[#BA7A18] font-bold inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white/90 border border-[#E8E2D5] shadow-2xs hover:bg-white transition-all cursor-pointer active:scale-95"
          >
            <Store size={13} className="text-[#BA7A18]" />
            <span>Return to Store</span>
          </button>
          
          <span className="text-[10px] text-gray-500 font-medium">
            Authorized Staff
          </span>
        </div>

        {/* Main Login Card */}
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-[#E8E2D5] overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-[#183B25] p-5 sm:p-8 text-center text-white relative">
            <div className="h-10 sm:h-14 w-auto mx-auto mb-2 sm:mb-3 flex items-center justify-center">
              <img 
                src="/brand/esan_logo.png" 
                alt="Esan Foods" 
                className="h-10 sm:h-14 w-auto object-contain drop-shadow-md" 
              />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FABD44] leading-tight">
              Esan Foods
            </h2>
            <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-xs text-white/90 font-semibold uppercase tracking-wider">
              <Shield size={11} className="text-[#FABD44]" />
              <span>Store Admin Portal</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="p-4 sm:p-7 space-y-3.5 sm:space-y-4">
            {authError && (
              <div className="p-2.5 sm:p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertTriangle size={15} className="shrink-0 text-red-500" />
                <span className="leading-tight">{authError}</span>
              </div>
            )}

            {/* Username Input */}
            <div className="space-y-1">
              <label className="text-[11px] sm:text-xs font-bold text-[#183B25] uppercase tracking-wider block">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                className="w-full px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183B25]/20 focus:border-[#183B25] transition-all bg-[#FAF7EE]/50"
                autoFocus
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-[11px] sm:text-xs font-bold text-[#183B25] uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full pl-3.5 sm:pl-4 pr-10 py-2.5 rounded-xl border border-[#E8E2D5] text-sm focus:outline-none focus:ring-2 focus:ring-[#183B25]/20 focus:border-[#183B25] transition-all bg-[#FAF7EE]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 rounded-xl bg-[#183B25] hover:bg-[#235033] text-[#FABD44] font-bold text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Shield size={16} />
              <span>Login to Dashboard</span>
            </button>

            {/* Bottom Return Link */}
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={onBackToStore}
                className="text-xs text-gray-600 hover:text-[#183B25] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
              >
                <Store size={13} />
                <span>Return to Customer Storefront</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. MAIN STREAMLINED ADMIN DASHBOARD (Mobile & Desktop)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAF7EE] text-gray-800 flex flex-col font-sans">
      
      {/* Brand Header */}
      <header className="sticky top-0 z-30 bg-[#183B25] text-white border-b border-[#E8E2D5]/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          
          {/* Logo & Store Title */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="h-10 w-auto shrink-0 flex items-center justify-center">
              <img 
                src="/brand/esan_logo.png" 
                alt="Esan Foods" 
                className="h-10 w-auto object-contain drop-shadow-sm" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                  Esan Foods
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FABD44] text-[#183B25]">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-white/75 hidden sm:block">
                Storefront Inventory &amp; Orders
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToStore}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              title="View Live Store"
            >
              <Store size={14} className="text-[#FABD44]" />
              <span className="hidden sm:inline">Storefront</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-red-600/90 hover:bg-red-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
              title="Logout"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        
        {/* 4 Essential Summary Metrics (Mobile 2x2 Grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          
          {/* Card 1: Total Products */}
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-[#E8E2D5] shadow-2xs">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#BA7A18]">
                Catalog
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FAF7EE] text-[#183B25] flex items-center justify-center">
                <Package size={15} />
              </div>
            </div>
            <p className="font-serif text-xl sm:text-2xl font-bold text-[#183B25]">
              {totalProducts}
            </p>
            <span className="text-[10px] sm:text-xs text-gray-500 block truncate">
              {inStockCount} active in store
            </span>
          </div>

          {/* Card 2: Low / Out of Stock Alert */}
          <div 
            onClick={() => {
              setActiveTab('products');
              setStockStatusFilter(outOfStockCount > 0 ? 'out' : 'low');
            }}
            className="bg-white p-3.5 sm:p-5 rounded-2xl border border-[#E8E2D5] shadow-2xs cursor-pointer hover:border-amber-400 transition-all"
          >
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-700">
                Stock Alerts
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <AlertTriangle size={15} />
              </div>
            </div>
            <p className="font-serif text-xl sm:text-2xl font-bold text-amber-700">
              {outOfStockCount + lowStockCount}
            </p>
            <span className="text-[10px] sm:text-xs text-gray-500 block truncate">
              {outOfStockCount > 0 ? `${outOfStockCount} Out of stock` : `${lowStockCount} Low stock`}
            </span>
          </div>

          {/* Card 3: Pending Orders */}
          <div 
            onClick={() => {
              setActiveTab('orders');
              setOrderStatusFilter('Pending');
            }}
            className="bg-white p-3.5 sm:p-5 rounded-2xl border border-[#E8E2D5] shadow-2xs cursor-pointer hover:border-[#183B25] transition-all"
          >
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#183B25]">
                Pending Orders
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FAF7EE] text-[#183B25] flex items-center justify-center">
                <ShoppingBag size={15} />
              </div>
            </div>
            <p className="font-serif text-xl sm:text-2xl font-bold text-[#183B25]">
              {pendingOrders}
            </p>
            <span className="text-[10px] sm:text-xs text-gray-500 block truncate">
              Of {totalOrders} total orders
            </span>
          </div>

          {/* Card 4: Revenue */}
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-[#E8E2D5] shadow-2xs">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#BA7A18]">
                Store Revenue
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FAF7EE] text-[#BA7A18] flex items-center justify-center">
                ₹
              </div>
            </div>
            <p className="font-serif text-xl sm:text-2xl font-bold text-[#183B25]">
              ₹{totalRevenue.toLocaleString()}
            </p>
            <span className="text-[10px] sm:text-xs text-gray-500 block truncate">
              Direct &amp; WhatsApp
            </span>
          </div>

        </div>

        {/* Streamlined Tab Switcher (Mobile Friendly Full Width) */}
        <div className="flex items-center justify-between gap-3 border-b border-[#E8E2D5] pb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1 bg-white rounded-2xl border border-[#E8E2D5] shadow-2xs w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'products'
                  ? 'bg-[#183B25] text-[#FABD44] shadow-xs'
                  : 'text-gray-600 hover:text-[#183B25]'
              }`}
            >
              <Package size={15} />
              <span>Products &amp; Stock</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-current">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'orders'
                  ? 'bg-[#183B25] text-[#FABD44] shadow-xs'
                  : 'text-gray-600 hover:text-[#183B25]'
              }`}
            >
              <ShoppingBag size={15} />
              <span>Orders</span>
              {pendingOrders > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400 text-[#183B25] font-extrabold">
                  {pendingOrders}
                </span>
              )}
            </button>
          </div>

          {/* Quick Add Product Button on Desktop Header */}
          {activeTab === 'products' && (
            <button
              onClick={handleOpenAddProduct}
              className="hidden sm:flex px-4 py-2 rounded-xl bg-[#183B25] hover:bg-[#235033] text-[#FABD44] font-bold text-xs items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer shrink-0"
            >
              <Plus size={16} />
              <span>Add New Product</span>
            </button>
          )}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: PRODUCTS & STOCK INVENTORY                         */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            
            {/* Filter Controls Row */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#E8E2D5] shadow-2xs flex flex-col md:flex-row gap-2.5 sm:gap-3 items-stretch md:items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search product by name..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E8E2D5] text-xs sm:text-sm bg-[#FAF7EE]/40 focus:outline-none focus:border-[#183B25]"
                />
              </div>

              {/* Filters & Mobile Add Button */}
              <div className="flex items-center gap-2 overflow-x-auto pb-0.5 md:pb-0">
                {/* Category Select */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-2.5 py-2 rounded-xl border border-[#E8E2D5] text-xs font-semibold bg-white text-[#183B25] focus:outline-none cursor-pointer shrink-0"
                >
                  <option value="all">All Categories</option>
                  <option value="Traditional Health Mixes">Health Mixes</option>
                  <option value="Herbal Soups & Podis">Herbal Podis</option>
                  <option value="Energy & Protein Laddus">Laddus</option>
                  <option value="Women's Care">Women's Care</option>
                  <option value="Kids Nutrition">Kids Nutrition</option>
                </select>

                {/* Stock Quick Filter */}
                <select
                  value={stockStatusFilter}
                  onChange={(e) => setStockStatusFilter(e.target.value)}
                  className="px-2.5 py-2 rounded-xl border border-[#E8E2D5] text-xs font-semibold bg-white text-[#183B25] focus:outline-none cursor-pointer shrink-0"
                >
                  <option value="all">All Stock Status</option>
                  <option value="low">Low Stock (&le; 10)</option>
                  <option value="out">Out of Stock</option>
                </select>

                {/* Mobile Add Product Button */}
                <button
                  onClick={handleOpenAddProduct}
                  className="sm:hidden px-3 py-2 rounded-xl bg-[#183B25] text-[#FABD44] font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                >
                  <Plus size={15} />
                  <span>Add</span>
                </button>
              </div>

            </div>

            {/* Empty Search Result */}
            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center border border-[#E8E2D5] text-gray-500 space-y-2">
                <Package size={32} className="mx-auto text-gray-300" />
                <p className="font-semibold text-sm">No products found matching filters.</p>
                <button
                  onClick={() => {
                    setProductSearch('');
                    setCategoryFilter('all');
                    setStockStatusFilter('all');
                  }}
                  className="text-xs text-[#183B25] font-bold underline cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* MOBILE VIEW: Touch-friendly Product Cards (< 768px)    */}
            {/* ------------------------------------------------------ */}
            <div className="grid grid-cols-1 gap-3 md:hidden">
              {filteredProducts.map((prod) => {
                const stock = prod.stockCount !== undefined ? prod.stockCount : 20;
                const isOut = !prod.inStock || stock === 0;
                const isLow = !isOut && stock <= 10;

                return (
                  <div 
                    key={prod.id}
                    className="bg-white rounded-2xl p-3.5 border border-[#E8E2D5] shadow-2xs space-y-3"
                  >
                    {/* Top Row: Thumbnail + Title + Price */}
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FAF7EE] border border-[#E8E2D5] shrink-0 relative">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className={`w-full h-full object-cover ${isOut ? 'grayscale opacity-70' : ''}`}
                        />
                        {isOut && (
                          <span className="absolute inset-x-0 bottom-0 bg-red-600 text-white text-[8px] font-black uppercase text-center py-0.5">
                            Out
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#BA7A18] uppercase tracking-wider block truncate">
                          {prod.category}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-[#183B25] truncate">
                          {prod.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-serif font-extrabold text-sm text-[#183B25]">
                            ₹{prod.price}
                          </span>
                          <span className="text-[11px] text-gray-500">
                            • {prod.weight || '250g'}
                          </span>
                        </div>
                      </div>

                      {/* Edit / Delete Icon Buttons */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleOpenEditProduct(prod)}
                          className="w-8 h-8 rounded-lg bg-[#FAF7EE] text-[#183B25] hover:bg-[#E8E2D5] flex items-center justify-center cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Row: Stock Stepper & Status Toggle */}
                    <div className="pt-2 border-t border-[#E8E2D5]/60 flex items-center justify-between gap-2">
                      {/* Stepper */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-gray-500 font-medium">Stock:</span>
                        <div className="flex items-center border border-[#E8E2D5] rounded-xl overflow-hidden bg-[#FAF7EE]">
                          <button
                            onClick={() => handleAdjustStock(prod.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-[#183B25] font-bold hover:bg-[#E8E2D5] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-[#183B25]">
                            {stock}
                          </span>
                          <button
                            onClick={() => handleAdjustStock(prod.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#183B25] font-bold hover:bg-[#E8E2D5] cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        {isLow && (
                          <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                            Low
                          </span>
                        )}
                      </div>

                      {/* Status Toggle Button */}
                      <button
                        onClick={() => handleToggleStock(prod.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isOut
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {isOut ? 'Out of Stock' : 'In Stock'}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* ------------------------------------------------------ */}
            {/* DESKTOP VIEW: Clean Table (>= 768px)                   */}
            {/* ------------------------------------------------------ */}
            <div className="hidden md:block bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7EE] border-b border-[#E8E2D5] text-[#183B25] font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-4 text-center">Stock Units</th>
                    <th className="py-3 px-4 text-center">Storefront Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2D5]/70">
                  {filteredProducts.map((prod) => {
                    const stock = prod.stockCount !== undefined ? prod.stockCount : 20;
                    const isOut = !prod.inStock || stock === 0;
                    const isLow = !isOut && stock <= 10;

                    return (
                      <tr key={prod.id} className="hover:bg-[#FAF7EE]/40 transition-colors">
                        
                        {/* Product Info */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FAF7EE] border border-[#E8E2D5] shrink-0">
                              <img 
                                src={prod.image} 
                                alt={prod.name} 
                                className={`w-full h-full object-cover ${isOut ? 'grayscale opacity-75' : ''}`}
                              />
                            </div>
                            <div>
                              <h4 className="font-serif font-bold text-sm text-[#183B25]">
                                {prod.name}
                              </h4>
                              <span className="text-[11px] text-gray-500">
                                Pack: {prod.weight || '250g'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-3">
                          <span className="text-[11px] font-semibold text-[#BA7A18] bg-[#FAF7EE] px-2 py-1 rounded-md border border-[#E8E2D5]">
                            {prod.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-3 font-serif font-bold text-sm text-[#183B25]">
                          ₹{prod.price}
                        </td>

                        {/* Stock Stepper */}
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1.5">
                            <div className="flex items-center border border-[#E8E2D5] rounded-xl overflow-hidden bg-[#FAF7EE]">
                              <button
                                onClick={() => handleAdjustStock(prod.id, -1)}
                                className="w-7 h-7 flex items-center justify-center text-[#183B25] font-bold hover:bg-[#E8E2D5] transition-colors cursor-pointer"
                                title="Decrease stock"
                              >
                                -
                              </button>
                              <span className="w-9 text-center text-xs font-bold text-[#183B25]">
                                {stock}
                              </span>
                              <button
                                onClick={() => handleAdjustStock(prod.id, 1)}
                                className="w-7 h-7 flex items-center justify-center text-[#183B25] font-bold hover:bg-[#E8E2D5] transition-colors cursor-pointer"
                                title="Increase stock"
                              >
                                +
                              </button>
                            </div>
                            {isLow && (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                Low
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Status Toggle */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggleStock(prod.id)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                              isOut 
                                ? 'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200' 
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-200'
                            }`}
                          >
                            {isOut ? '● Out of Stock' : '✓ In Stock'}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-1.5 rounded-lg bg-[#FAF7EE] text-[#183B25] hover:bg-[#E8E2D5] cursor-pointer"
                              title="Edit product"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ORDERS & INQUIRIES                                 */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#E8E2D5] shadow-2xs flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {['all', 'Pending', 'Packed', 'Shipped', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      orderStatusFilter === st
                        ? 'bg-[#183B25] text-[#FABD44] shadow-xs'
                        : 'bg-[#FAF7EE] text-[#183B25] hover:bg-[#E8E2D5]'
                    }`}
                  >
                    {st === 'all' ? `All (${orders.length})` : `${st} (${orders.filter(o => o.status === st).length})`}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customer, phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#E8E2D5] text-xs bg-[#FAF7EE]/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Orders List (Responsive Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredOrders.map((order) => {
                const customerMsg = encodeURIComponent(
                  `Vanakkam ${order.customerName || 'Customer'}! Regarding your Esan Foods order #${order.id} for ₹${order.total}. Status is currently: ${order.status}.`
                );
                const waUrl = `https://wa.me/91${(order.phone || '').replace(/[^0-9]/g, '')}?text=${customerMsg}`;

                return (
                  <div 
                    key={order.id}
                    className="bg-white rounded-2xl p-4 border border-[#E8E2D5] shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#183B25]">
                          #{order.id}
                        </span>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className={`text-xs font-bold px-2 py-1 rounded-lg border cursor-pointer ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : order.status === 'Shipped'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-base text-[#183B25]">
                          {order.customerName || 'Direct Customer'}
                        </h4>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Phone size={11} className="text-[#BA7A18]" />
                          <span>{order.phone}</span>
                          {order.city && <span>• {order.city}</span>}
                        </p>
                      </div>

                      {/* Items */}
                      <div className="bg-[#FAF7EE] p-2.5 rounded-xl border border-[#E8E2D5] text-xs space-y-1">
                        {order.items && order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-gray-700">
                            <span className="truncate pr-2">{item.quantity}x {item.name}</span>
                            <span className="font-semibold shrink-0">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E8E2D5] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase">Total</span>
                        <span className="font-serif font-extrabold text-base text-[#183B25]">
                          ₹{order.total}
                        </span>
                      </div>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-[#183B25] hover:bg-[#235033] text-[#FABD44] text-xs font-bold flex items-center gap-1.5 shadow-2xs active:scale-95"
                      >
                        <MessageCircle size={13} />
                        <span>Chat WhatsApp</span>
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* STREAMLINED ADD / EDIT PRODUCT MODAL (Touch & Mobile Ready)*/}
      {/* ========================================================= */}
      {isProductModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setIsProductModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#E8E2D5] shadow-2xl p-5 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#183B25]">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <p className="text-xs text-gray-500">
                  Updates instantly sync to customer storefront
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF7EE] text-[#183B25] flex items-center justify-center hover:bg-[#E8E2D5] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="space-y-3.5">
              
              {/* Product Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#183B25] uppercase tracking-wider block">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mappillai Samba Kanji Mix"
                  value={productFormData.name}
                  onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-xs sm:text-sm bg-[#FAF7EE]/50 focus:outline-none focus:border-[#183B25]"
                />
              </div>

              {/* Category & Weight in 2 columns */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#183B25] uppercase tracking-wider block">
                    Category *
                  </label>
                  <select
                    value={productFormData.category}
                    onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E8E2D5] text-xs sm:text-sm bg-[#FAF7EE]/50 focus:outline-none focus:border-[#183B25] cursor-pointer"
                  >
                    <option value="Traditional Health Mixes">Health Mixes</option>
                    <option value="Herbal Soups & Podis">Herbal Podis</option>
                    <option value="Energy & Protein Laddus">Laddus</option>
                    <option value="Women's Care">Women's Care</option>
                    <option value="Kids Nutrition">Kids Nutrition</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#183B25] uppercase tracking-wider block">
                    Pack Size *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="250g / 500g"
                    value={productFormData.weight}
                    onChange={(e) => setProductFormData({ ...productFormData, weight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-xs sm:text-sm bg-[#FAF7EE]/50 focus:outline-none focus:border-[#183B25]"
                  />
                </div>
              </div>

              {/* Price & Stock Count in 2 columns */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#183B25] uppercase tracking-wider block">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={productFormData.price}
                    onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-xs sm:text-sm bg-[#FAF7EE]/50 focus:outline-none focus:border-[#183B25]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#183B25] uppercase tracking-wider block">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={productFormData.stockCount}
                    onChange={(e) => setProductFormData({ ...productFormData, stockCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] text-xs sm:text-sm bg-[#FAF7EE]/50 focus:outline-none focus:border-[#183B25]"
                  />
                </div>
              </div>

              {/* Image Selector: Preset Click or Custom URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#183B25] uppercase tracking-wider block">
                  Product Image
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <img 
                    src={productFormData.image} 
                    alt="Preview" 
                    className="w-12 h-12 rounded-xl object-cover border border-[#E8E2D5] bg-[#FAF7EE] shrink-0" 
                  />
                  <input
                    type="text"
                    value={productFormData.image}
                    onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
                    placeholder="/products/mens_health_mix.jpg"
                    className="flex-1 px-3 py-2 rounded-xl border border-[#E8E2D5] text-xs bg-[#FAF7EE]/50 focus:outline-none"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-gray-500 font-semibold self-center mr-1">Presets:</span>
                  {presetImages.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setProductFormData({ ...productFormData, image: preset.path })}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                        productFormData.image === preset.path 
                          ? 'bg-[#183B25] text-[#FABD44]' 
                          : 'bg-[#FAF7EE] text-[#183B25] hover:bg-[#E8E2D5]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#183B25] uppercase tracking-wider block">
                  Short Description
                </label>
                <textarea
                  rows="2"
                  value={productFormData.description}
                  onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                  placeholder="Fresh stone milled native ingredients..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E2D5] text-xs sm:text-sm bg-[#FAF7EE]/50 focus:outline-none focus:border-[#183B25]"
                />
              </div>

              {/* Stock Active Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7EE] border border-[#E8E2D5]">
                <div>
                  <span className="text-xs font-bold text-[#183B25] block">
                    Available in Store
                  </span>
                  <span className="text-[10px] text-gray-500">
                    Turn off to immediately show 'Out of Stock' in storefront
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={productFormData.inStock}
                  onChange={(e) => setProductFormData({ ...productFormData, inStock: e.target.checked })}
                  className="w-5 h-5 accent-[#183B25] cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E8E2D5]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-xs font-bold text-gray-600 hover:bg-[#FAF7EE] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#183B25] hover:bg-[#235033] text-[#FABD44] text-xs font-bold shadow-md cursor-pointer active:scale-95"
                >
                  {editingProduct ? 'Update Product' : 'Add to Catalog'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
