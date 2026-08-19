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
        <div className="bg-slate-900 text-white text-xs py-1.5 px-4 flex justify-between items-center">
          <span>Free shipping on all orders above ₹50,000</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Track Order</a>
            <a href="#" className="hover:text-slate-300">Support: {shop.phone}</a>
          </div>
        </div>
        
        {/* Main Nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="./" className="text-2xl font-black tracking-tight" style={{ color: primaryColor }}>
              {shop.logoUrl ? (
                <Image src={shop.logoUrl} alt={config.shopName} width={150} height={40} className="object-contain object-left" />
              ) : (
                config.shopName
              )}
            </a>
            <nav className="hidden md:flex items-center gap-6 font-semibold text-slate-600 text-sm">
              <a href="./" className={`hover:text-slate-900 ${currentRoute === 'home' || currentRoute === '' ? 'text-slate-900 border-b-2' : ''}`} style={{ borderColor: currentRoute === 'home' || currentRoute === '' ? primaryColor : 'transparent' }}>Home</a>
              <a href="catalog" className={`hover:text-slate-900 ${currentRoute === 'catalog' ? 'text-slate-900 border-b-2' : ''}`} style={{ borderColor: currentRoute === 'catalog' ? primaryColor : 'transparent' }}>Shop Catalog</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200 focus-within:border-slate-300 focus-within:bg-white transition-colors">
              <span className="text-slate-400 mr-2">🔍</span>
              <input type="text" placeholder="Search products..." className="bg-transparent border-none focus:outline-none text-sm w-48" />
            </div>
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              🛒 <span className="absolute top-0 right-0 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center" style={{ backgroundColor: primaryColor }}>0</span>
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
            <h3 className="font-bold text-xl mb-4" style={{ color: primaryColor }}>{config.shopName}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">{config.tagline}</p>
            <div className="text-sm font-semibold text-slate-800">
              <p>📍 {shop.address}</p>
              <p>{shop.location?.city}, {shop.location?.state}</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">Customer Service</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-slate-900">Contact Us</a></li>
              <li><a href="#" className="hover:text-slate-900">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-slate-900">FAQ</a></li>
              <li><a href="#" className="hover:text-slate-900">Store Locator</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">Shop</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="catalog" className="hover:text-slate-900">All Products</a></li>
              <li><a href="#" className="hover:text-slate-900">New Arrivals</a></li>
              <li><a href="#" className="hover:text-slate-900">Best Sellers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">Newsletter</h4>
            <p className="text-slate-500 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:border-slate-300" />
              <button className="px-4 py-2 text-white text-sm font-bold rounded-lg transition-colors" style={{ backgroundColor: primaryColor }}>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-100 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} {config.shopName}. Powered by ShyamDash IT Services.
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
      <section className="bg-slate-900 text-white relative">
        <div className="absolute inset-0 z-0 opacity-50">
          <Image src={shop.coverImages?.[0] || "https://images.unsplash.com/photo-1573408301145-b98c4af06b58?auto=format&fit=crop&q=80&w=1600"} alt="Promo" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
          <span className="font-bold tracking-widest text-xs uppercase mb-4 block" style={{ color: primaryColor }}>New Arrivals</span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 max-w-2xl leading-tight">
            {config.tagline || "Discover The Latest Collection"}
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-xl">
            Explore our vast inventory of verified, high-quality jewelry. Certified authenticity with every purchase.
          </p>
          <a href="catalog" className="inline-block px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-lg">
            Shop The Catalog
          </a>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black text-slate-900">Trending Now</h2>
          <a href="catalog" className="font-semibold text-sm hover:underline" style={{ color: primaryColor }}>View All &rarr;</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map(product => (
            <div key={product.id} className="group cursor-pointer">
              <div className="bg-slate-100 aspect-square rounded-xl overflow-hidden relative mb-4">
                <Image src={product.images[0]} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-xl hover:scale-110 transition-transform">
                  +
                </button>
              </div>
              <h3 className="font-bold text-slate-900 mb-1 truncate">{product.title}</h3>
              <p className="text-sm font-semibold" style={{ color: primaryColor }}>₹{product.price.toLocaleString('en-IN')}</p>
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
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <h2 className="font-black text-xl mb-6 text-slate-900">Filters</h2>
        
        <div className="mb-8 border-b border-slate-200 pb-8">
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">Categories</h3>
          <ul className="space-y-3">
            {['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Pendants'].map(cat => (
              <li key={cat} className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-slate-700 text-sm">{cat}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-8 border-b border-slate-200 pb-8">
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">Price Range</h3>
          <input type="range" className="w-full mb-2 accent-blue-600" />
          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>₹0</span>
            <span>₹5,00,000+</span>
          </div>
        </div>
      </aside>

      {/* Main Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8 bg-slate-100 p-4 rounded-xl">
          <span className="text-slate-600 font-medium text-sm">Showing {products.length} products</span>
          <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300">
              <div className="relative aspect-square bg-slate-100">
                <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                {product.stoneDetails?.hasStones && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase rounded shadow-sm">
                    {product.stoneDetails.type}
                  </span>
                )}
              </div>
              <div className="p-5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 block">{product.categoryId}</span>
                <h3 className="font-bold text-slate-900 mb-3 text-lg leading-snug">{product.title}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-black text-xl" style={{ color: primaryColor }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-bold rounded-lg transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
