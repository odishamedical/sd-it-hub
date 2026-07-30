import React from 'react';
import Image from 'next/image';

export default function JewelModernTemplate({ config, shop, products }: { config: any, shop: any, products: any[] }) {
  const primaryColor = config.themeColor || '#0f172a';

  return (
    <div className="min-h-screen bg-slate-50 font-sans" style={{ '--primary': primaryColor } as any}>
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {shop.logoUrl ? (
              <div className="relative h-10 w-32">
                <Image src={shop.logoUrl} alt={config.shopName} fill sizes="128px" className="object-contain object-left" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: primaryColor }}>
                {config.shopName.charAt(0)}
              </div>
            )}
            <h1 className="text-xl font-bold" style={{ color: primaryColor }}>{config.shopName}</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-black transition-colors">Home</a>
            <a href="#collections" className="hover:text-black transition-colors">Collections</a>
            <a href="#about" className="hover:text-black transition-colors">About</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={shop.coverImages?.[0] || "https://images.unsplash.com/photo-1588444650733-d0767b753cb8?auto=format&fit=crop&q=80&w=1600"} 
            alt="Hero"
            fill sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 opacity-80" style={{ backgroundColor: primaryColor }} />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <span className="text-white/80 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Welcome to</span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">{config.shopName}</h2>
          <p className="text-xl text-white/90 mb-8 font-light">{config.tagline}</p>
          <a href="#collections" className="inline-block bg-white px-8 py-4 rounded-full font-bold transition-transform hover:scale-105" style={{ color: primaryColor }}>
            Explore Collection
          </a>
        </div>
      </section>

      {/* LIVE PRODUCTS GRID */}
      <section id="collections" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Featured Collections</h3>
            <div className="w-16 h-1 mx-auto rounded" style={{ backgroundColor: primaryColor }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length > 0 ? products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="relative h-80 overflow-hidden bg-slate-100">
                  <Image 
                    src={product.images[0]} 
                    alt={product.title}
                    fill sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {product.stoneDetails?.hasStones && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold rounded-full text-slate-800">
                      {product.stoneDetails.type}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color: primaryColor }}>
                    {product.categoryId}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{product.title}</h4>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="font-bold text-lg text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                    <button className="text-sm font-bold hover:opacity-80" style={{ color: primaryColor }}>
                      View Details &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center py-20 text-slate-400">
                No active products found in inventory.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">{config.shopName}</h4>
            <p className="text-slate-400 text-sm">{config.tagline}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-slate-300">Location</h4>
            <p className="text-slate-400 text-sm">{shop.address}</p>
            <p className="text-slate-400 text-sm">{shop.location?.city || shop.location?.block}, {shop.location?.state}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-slate-300">Contact</h4>
            <p className="text-slate-400 text-sm mb-2">{shop.phone}</p>
            <p className="text-slate-400 text-sm">{shop.email}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col items-center gap-2">
          <span>&copy; {new Date().getFullYear()} {config.shopName}. All rights reserved.</span>
          <a href="https://shyamdash.com" className="text-xs text-sky-500 hover:text-sky-400 transition-colors">
            Powered by ShyamDash IT Services
          </a>
        </div>
      </footer>
    </div>
  );
}
