import React from 'react';
import Image from 'next/image';

export default function JewelClassicTemplate({ config, shop, products }: { config: any, shop: any, products: any[] }) {
  const primaryColor = config.themeColor || '#7f1d1d'; // Default deep burgundy
  const secondaryColor = '#fdfbf7'; // Ivory / light beige background

  return (
    <div className="min-h-screen font-serif" style={{ backgroundColor: secondaryColor, color: '#292524' }}>
      {/* TOP NOTIFICATION BAR */}
      <div className="text-center py-2 text-xs uppercase tracking-widest text-white/90 font-sans" style={{ backgroundColor: primaryColor }}>
        A Heritage of Excellence Since 1995
      </div>

      {/* HEADER */}
      <header className="border-b border-stone-200 sticky top-0 z-50 bg-[#fdfbf7]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {shop.logoUrl ? (
              <div className="relative h-14 w-40">
                <Image src={shop.logoUrl} alt={config.shopName} fill sizes="160px" className="object-contain object-left" />
              </div>
            ) : (
              <div className="flex flex-col items-center md:items-start">
                <h1 className="text-3xl font-bold tracking-wide" style={{ color: primaryColor }}>{config.shopName}</h1>
                <span className="text-xs uppercase tracking-[0.3em] text-stone-500 mt-1">Fine Jewellery</span>
              </div>
            )}
          </div>
          <nav className="flex items-center gap-8 text-sm uppercase tracking-widest text-stone-700 font-medium">
            <a href="#" className="hover:text-black transition-colors border-b border-transparent hover:border-current pb-1">Home</a>
            <a href="#collections" className="hover:text-black transition-colors border-b border-transparent hover:border-current pb-1">Collections</a>
            <a href="#heritage" className="hover:text-black transition-colors border-b border-transparent hover:border-current pb-1">Our Heritage</a>
            <a href="#visit" className="hover:text-black transition-colors border-b border-transparent hover:border-current pb-1">Visit Us</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b-8 border-double" style={{ borderColor: primaryColor }}>
        <div className="absolute inset-0 z-0">
          <Image 
            src={shop.coverImages?.[0] || "https://images.unsplash.com/photo-1599643478524-fb66f723666a?auto=format&fit=crop&q=80&w=1600"} 
            alt="Hero"
            fill sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto bg-[#fdfbf7]/95 p-12 shadow-2xl border border-stone-200">
          <h2 className="text-4xl md:text-5xl font-normal text-stone-900 mb-6 leading-tight italic" style={{ color: primaryColor }}>
            Timeless Elegance. <br/> Masterfully Crafted.
          </h2>
          <div className="w-24 h-px bg-stone-400 mx-auto mb-6"></div>
          <p className="text-lg text-stone-700 mb-8 font-light italic">
            {config.tagline || "Discover our exclusive collection of traditional and modern ornaments."}
          </p>
          <a href="#collections" className="inline-block px-10 py-3 uppercase tracking-widest text-sm text-white transition-all hover:bg-stone-900" style={{ backgroundColor: primaryColor }}>
            View Collection
          </a>
        </div>
      </section>

      {/* HERITAGE SECTION */}
      <section id="heritage" className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h3 className="text-3xl text-stone-800 mb-4" style={{ color: primaryColor }}>Our Heritage</h3>
        <div className="w-16 h-0.5 mx-auto mb-8" style={{ backgroundColor: primaryColor }}></div>
        <p className="text-lg text-stone-600 leading-relaxed max-w-3xl mx-auto">
          For generations, {config.shopName} has been synonymous with trust, purity, and exquisite craftsmanship. 
          Every piece in our collection tells a story of tradition blended with contemporary artistry. We invite you 
          to experience the legacy of authentic jewelry making.
        </p>
      </section>

      {/* LIVE PRODUCTS GRID */}
      <section id="collections" className="py-20 bg-stone-100 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl text-stone-800 mb-4" style={{ color: primaryColor }}>Curated Collections</h3>
            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: primaryColor }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.length > 0 ? products.map(product => (
              <div key={product.id} className="bg-[#fdfbf7] p-4 shadow-sm border border-stone-200 group hover:shadow-xl transition-shadow">
                <div className="relative h-80 overflow-hidden bg-stone-50 border border-stone-100">
                  <Image 
                    src={product.images[0]} 
                    alt={product.title}
                    fill sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  {product.stoneDetails?.hasStones && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 text-[10px] uppercase tracking-widest text-stone-800 border border-stone-200">
                      {product.stoneDetails.type}
                    </div>
                  )}
                </div>
                <div className="pt-6 text-center">
                  <span className="text-[10px] uppercase tracking-[0.2em] block mb-2 text-stone-500">
                    {product.categoryId}
                  </span>
                  <h4 className="text-xl text-stone-900 mb-3">{product.title}</h4>
                  <div className="w-8 h-px bg-stone-300 mx-auto mb-4"></div>
                  <span className="font-medium text-lg" style={{ color: primaryColor }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center py-20 text-stone-400 italic">
                No active products found in inventory.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="visit" className="text-white py-16" style={{ backgroundColor: primaryColor }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-2xl mb-4 font-bold">{config.shopName}</h4>
            <p className="text-white/80 text-sm leading-relaxed italic max-w-xs">{config.tagline}</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg mb-6 uppercase tracking-widest border-b border-white/20 pb-2 inline-block">Visit Our Showroom</h4>
            <p className="text-white/90 text-sm mb-2">{shop.address}</p>
            <p className="text-white/90 text-sm">{shop.location?.city || shop.location?.block}, {shop.location?.state}</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg mb-6 uppercase tracking-widest border-b border-white/20 pb-2 inline-block">Contact Us</h4>
            <p className="text-white/90 text-sm mb-3">📞 {shop.phone}</p>
            <p className="text-white/90 text-sm">✉️ {shop.email}</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-white/20 text-center text-xs tracking-widest text-white/60">
          <span>&copy; {new Date().getFullYear()} {config.shopName}. All Rights Reserved.</span>
          <span className="mx-3">|</span>
          <a href="https://shyamdash.com" className="hover:text-white transition-colors">
            Crafted by ShyamDash IT Services
          </a>
        </div>
      </footer>
    </div>
  );
}
