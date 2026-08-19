import React from 'react';
import Image from 'next/image';

export default function JewelCommerceTemplate({ config, shop, products, currentRoute = 'home' }: { config: any, shop: any, products: any[], currentRoute?: string }) {
  const primaryColor = config.themeColor || '#0ea5e9'; // Retail blue/trust color

  // Multi-page Router Map
  const renderPage = () => {
    switch (currentRoute) {
      case 'catalog':
        return <CatalogPage products={products} primaryColor={primaryColor} />;
      case 'home':
      default:
        return <HomePage config={config} shop={shop} products={products} primaryColor={primaryColor} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* RETAIL HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        {/* Top Utility Bar */}
        <div className="bg-slate-900 text-white text-[11px] py-2 px-4 flex justify-between items-center font-bold tracking-wider uppercase">
          <div className="flex gap-6 animate-pulse">
            <span>🚀 Free Express Shipping on orders above ₹50,000</span>
            <span className="hidden md:inline">💎 100% BIS Hallmarked</span>
          </div>
          <div className="flex gap-4 opacity-80 hover:opacity-100 transition-opacity">
            <a href="#" className="hover:text-sky-400 transition-colors">Track Order</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Support: {shop.phone}</a>
          </div>
        </div>
        
        {/* Main Nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8 lg:gap-12">
            <a href="./" className="text-2xl font-black tracking-tight flex items-center gap-2" style={{ color: primaryColor }}>
              {shop.logoUrl ? (
                <Image src={shop.logoUrl} alt={config.shopName} width={150} height={40} className="object-contain object-left" />
              ) : (
                <>
                  <div className="w-8 h-8 rounded bg-gradient-to-br flex items-center justify-center text-white text-sm" style={{ from: primaryColor, to: '#000' }}>✦</div>
                  {config.shopName}
                </>
              )}
            </a>
            <nav className="hidden md:flex items-center gap-6 font-bold text-slate-600 text-sm uppercase tracking-wide">
              <a href="./" className={`hover:text-slate-900 py-7 ${currentRoute === 'home' || currentRoute === '' ? 'text-slate-900 border-b-[3px]' : 'border-b-[3px] border-transparent'}`} style={{ borderColor: currentRoute === 'home' || currentRoute === '' ? primaryColor : 'transparent' }}>Home</a>
              <a href="catalog" className={`hover:text-slate-900 py-7 ${currentRoute === 'catalog' ? 'text-slate-900 border-b-[3px]' : 'border-b-[3px] border-transparent'}`} style={{ borderColor: currentRoute === 'catalog' ? primaryColor : 'transparent' }}>Shop Catalog</a>
              <a href="#" className="hover:text-slate-900 py-7 border-b-[3px] border-transparent">Best Sellers</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-2.5 border border-slate-200 focus-within:border-sky-300 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(14,165,233,0.1)] transition-all">
              <span className="text-slate-400 mr-2 text-lg">🔍</span>
              <input type="text" placeholder="Search rings, necklaces..." className="bg-transparent border-none focus:outline-none text-sm w-56 font-medium text-slate-700" />
            </div>
            <button className="relative p-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-full transition-colors font-bold text-lg">
              🛒 
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-black text-white flex items-center justify-center border-2 border-white shadow-sm" style={{ backgroundColor: primaryColor }}>0</span>
            </button>
          </div>
        </div>
      </header>

      {/* DYNAMIC PAGE INJECTION */}
      <main className="min-h-screen">
        {renderPage()}
      </main>

      {/* RETAIL FOOTER */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-black text-2xl mb-4 tracking-tight" style={{ color: primaryColor }}>{config.shopName}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">{config.tagline}</p>
            <div className="text-sm font-bold text-slate-800 bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="flex items-center gap-2 mb-2"><span className="text-xl">📍</span> {shop.address}</p>
              <p className="pl-7 text-slate-500">{shop.location?.city}, {shop.location?.state}</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">Customer Service</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-sky-600 transition-colors flex items-center gap-2"><span>&rarr;</span> Contact Us</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors flex items-center gap-2"><span>&rarr;</span> Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors flex items-center gap-2"><span>&rarr;</span> FAQ</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors flex items-center gap-2"><span>&rarr;</span> Store Locator</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">Shop Categories</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="catalog" className="hover:text-sky-600 transition-colors flex items-center gap-2"><span>&rarr;</span> All Products</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors flex items-center gap-2"><span>&rarr;</span> New Arrivals</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors flex items-center gap-2"><span>&rarr;</span> Bridal Collection</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">Join the Club</h4>
            <p className="text-slate-500 text-sm mb-4 font-medium">Subscribe to receive exclusive email offers and early access to sales.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Email Address" className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:border-sky-400 focus:bg-white transition-all shadow-sm" />
              <button className="py-3 text-white text-sm font-black uppercase tracking-widest rounded-lg shadow-lg hover:-translate-y-0.5 transition-all" style={{ backgroundColor: primaryColor, boxShadow: `0 10px 25px -5px ${primaryColor}60` }}>
                Subscribe
              </button>
            </div>
            
            <div className="mt-8 flex items-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
              <span className="text-3xl">🛡️</span>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 leading-tight">
                100% Secure<br/>SSL Encrypted
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-slate-500 font-medium text-sm">
          <span>&copy; {new Date().getFullYear()} {config.shopName}. All rights reserved.</span>
          <span className="mt-4 md:mt-0 text-xs">Powered by ShyamDash IT Services.</span>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------
// PAGE 1: HOME PAGE (Promotional Banners)
// ---------------------------------------------------------
function HomePage({ config, shop, products, primaryColor }: { config: any, shop: any, products: any[], primaryColor: string }) {
  return (
    <>
      <section className="bg-slate-900 text-white relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={shop.coverImages?.[0] || "https://images.unsplash.com/photo-1599643477874-5c91fce90a19?auto=format&fit=crop&q=80&w=1600"} alt="Promo" fill className="object-cover opacity-60 scale-105 animate-[pulse_15s_ease-in-out_infinite_alternate]" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full animate-in slide-in-from-left-8 fade-in duration-1000">
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6 text-sky-300">
            ✨ Festive Collection 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 max-w-2xl leading-[1.1] tracking-tight text-white drop-shadow-lg">
            {config.tagline || "Discover The Latest Collection."}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-xl font-medium leading-relaxed drop-shadow-md">
            Explore our vast inventory of verified, high-quality jewelry. Certified authenticity with every purchase.
          </p>
          <div className="flex gap-4">
            <a href="catalog" className="inline-block px-10 py-4 text-white font-black uppercase tracking-wide rounded-lg shadow-2xl hover:-translate-y-1 transition-all" style={{ backgroundColor: primaryColor, boxShadow: `0 20px 40px -10px ${primaryColor}80` }}>
              Shop Now
            </a>
            <a href="#" className="inline-block px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white font-black uppercase tracking-wide rounded-lg transition-all">
              View Lookbook
            </a>
          </div>
        </div>
      </section>

      {/* Featured Categories Strip */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12 flex justify-between gap-6 overflow-x-auto no-scrollbar">
          {['Necklaces', 'Rings', 'Earrings', 'Bangles', 'Pendants', 'Gold Coins'].map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-3 cursor-pointer group min-w-[100px]">
              <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-transparent group-hover:border-sky-500 flex items-center justify-center text-3xl shadow-sm group-hover:shadow-md transition-all group-hover:scale-105">
                💎
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-sky-600">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-slate-50">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Trending Right Now</h2>
            <p className="text-slate-500 font-medium">Our most loved pieces this week.</p>
          </div>
          <a href="catalog" className="px-6 py-2 bg-white border-2 rounded-full font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm" style={{ borderColor: primaryColor, color: primaryColor }}>
            View All Products
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map(product => (
            <div key={product.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="bg-slate-100 aspect-square relative overflow-hidden">
                <Image src={product.images[0]} alt={product.title} fill className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                
                {/* Sale Badge */}
                {product.price > 100000 && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md z-10">
                    Premium
                  </span>
                )}
                
                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-900/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full py-3 bg-white text-slate-900 font-black rounded-lg shadow-lg hover:bg-slate-50 transition-colors">
                    Quick View
                  </button>
                </div>
              </div>
              <div className="p-6">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 block">{product.categoryId}</span>
                <h3 className="font-bold text-slate-900 mb-2 text-lg truncate group-hover:text-sky-600 transition-colors">{product.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <span className="text-xs text-slate-400 font-medium">(24)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-black text-xl" style={{ color: primaryColor }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <button className="w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full flex items-center justify-center transition-colors font-bold text-lg">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------
// PAGE 2: CATALOG PAGE (Sidebar + Grid)
// ---------------------------------------------------------
function CatalogPage({ products, primaryColor }: { products: any[], primaryColor: string }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 bg-slate-50 min-h-screen">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-72 flex-shrink-0 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit sticky top-28">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-black text-2xl text-slate-900">Filters</h2>
          <button className="text-xs font-bold text-slate-400 hover:text-sky-500 uppercase tracking-widest">Clear All</button>
        </div>
        
        <div className="mb-8 pb-8 border-b border-slate-100">
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-900 mb-5">Categories</h3>
          <ul className="space-y-4">
            {['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Pendants'].map((cat, i) => (
              <li key={cat} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${i === 0 ? 'bg-sky-500 border-sky-500' : 'border-slate-300 group-hover:border-sky-500'}`}>
                    {i === 0 && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm font-medium ${i === 0 ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>{cat}</span>
                </div>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md font-medium">12</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-8">
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-900 mb-5">Price Range</h3>
          <input type="range" className="w-full mb-4 accent-sky-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          <div className="flex justify-between items-center text-sm font-bold text-slate-600">
            <div className="px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200">₹0</div>
            <span>-</span>
            <div className="px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200">₹5L+</div>
          </div>
        </div>
      </aside>

      {/* Main Grid */}
      <div className="flex-1">
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-4">
          <span className="text-slate-600 font-bold text-sm">Showing <span className="text-slate-900">{products.length}</span> products</span>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-500">Sort By:</span>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 shadow-sm cursor-pointer">
              <option>Featured Collection</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 flex flex-col">
              <div className="relative aspect-square bg-slate-100 overflow-hidden p-6">
                <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors z-10"></div>
                <Image src={product.images[0]} alt={product.title} fill className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                
                {product.stoneDetails?.hasStones && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md z-20">
                    {product.stoneDetails.type}
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 block">{product.categoryId}</span>
                <h3 className="font-bold text-slate-900 mb-3 text-lg leading-snug line-clamp-2 flex-1 group-hover:text-sky-600 transition-colors">{product.title}</h3>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold line-through">₹{(product.price * 1.2).toLocaleString('en-IN')}</span>
                    <span className="font-black text-xl" style={{ color: primaryColor }}>
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-black rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-400 hover:border-sky-500 hover:text-sky-500 transition-colors">&lt;</button>
          <button className="w-10 h-10 rounded-lg bg-sky-500 text-white flex items-center justify-center font-black shadow-md">1</button>
          <button className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center font-bold text-slate-600 hover:border-sky-500 hover:text-sky-500 transition-colors">2</button>
          <button className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center font-bold text-slate-600 hover:border-sky-500 hover:text-sky-500 transition-colors">3</button>
          <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:border-sky-500 hover:text-sky-500 transition-colors">&gt;</button>
        </div>
      </div>
    </div>
  );
}
