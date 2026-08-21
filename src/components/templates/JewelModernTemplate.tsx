import React from 'react';
import Image from 'next/image';

export default function JewelModernTemplate({ config, shop, products, currentRoute = 'home' }: { config: any, shop: any, products: any[], currentRoute?: string }) {
  const primaryColor = config.themeColor || '#0f172a'; // Default modern slate

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      
      {/* MODERN MINIMAL HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="./" className="text-xl font-black tracking-tight" style={{ color: primaryColor }}>
            {shop.logoUrl ? (
              <Image src={shop.logoUrl} alt={config.shopName} width={120} height={40} className="object-contain" />
            ) : (
              config.shopName
            )}
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">Collections</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Bespoke</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Our Story</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium hover:text-slate-600 transition-colors">Search</button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
              <span className="text-lg">🛒</span>
            </button>
          </div>
        </div>
      </header>

      {/* DYNAMIC PAGE INJECTION (Single page focus for now, but ready for multi-page) */}
      <main className="pt-20 min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
        
        {/* HERO SECTION (Apple-esque large typography and image) */}
        <section className="relative h-[85vh] flex flex-col items-center justify-center overflow-hidden px-6">
          <div className="text-center z-10 max-w-4xl mx-auto mb-12 transform hover:scale-105 transition-transform duration-1000">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.9]">
              {config.tagline || "Redefining Minimalist Gold."}
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light">
              Discover the new standard in contemporary jewelry design. Ethically sourced, meticulously crafted.
            </p>
          </div>
          <div className="relative w-full max-w-6xl aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl bg-slate-100 flex items-center justify-center">
            {shop.coverImages && shop.coverImages.length > 0 ? (
              <Image 
                src={shop.coverImages[0]} 
                alt="Hero" fill className="object-cover hover:scale-105 transition-transform duration-[2s] ease-in-out"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300"></div>
            )}
          </div>
        </section>

        {/* PRODUCT GRID SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-32">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-2">Curated Pieces</h2>
              <p className="text-slate-500">The latest arrivals from our studio.</p>
            </div>
            <a href="#" className="hidden md:inline-block text-sm font-bold border-b-2 hover:px-2 transition-all" style={{ borderColor: primaryColor, color: primaryColor }}>
              View All &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
                  {product.images && product.images.length > 0 ? (
                    <Image 
                      src={product.images[0]} 
                      alt={product.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  ) : (
                    <span className="text-4xl opacity-20">💎</span>
                  )}
                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                    <button className="bg-white text-slate-900 font-bold px-6 py-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{product.categoryId}</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 truncate group-hover:text-sky-600 transition-colors">{product.title}</h3>
                  <p className="text-slate-600 font-medium">₹{product.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURE HIGHLIGHT */}
        <section className="bg-slate-50 py-32">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold tracking-tight mb-6">Uncompromising Quality.</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                Every piece in our collection goes through a rigorous 50-point inspection process. We use only conflict-free diamonds and 100% recycled gold to ensure our environmental footprint is as minimal as our designs.
              </p>
              <button className="px-8 py-4 text-white font-bold rounded-full shadow-lg shadow-sky-500/30 hover:-translate-y-1 transition-all" style={{ backgroundColor: primaryColor }}>
                Learn About Our Process
              </button>
            </div>
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-slate-200 rounded-3xl overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800" alt="Process 1" fill className="object-cover hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="aspect-square bg-slate-200 rounded-3xl overflow-hidden relative mt-12">
                <Image src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800" alt="Process 2" fill className="object-cover hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* MODERN FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-black tracking-tight mb-6" style={{ color: primaryColor }}>{config.shopName}</h2>
            <p className="text-slate-500 max-w-sm mb-8">
              Elevating the everyday with minimalist gold jewelry. Designed in {shop.location?.city}.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors">IN</div>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors">FB</div>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors">TW</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-slate-900 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Bridal Collection</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Gifts</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li>{shop.address}</li>
              <li>{shop.location?.city}, {shop.location?.state}</li>
              <li>{shop.phone}</li>
              <li>{shop.email}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} {config.shopName}. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
