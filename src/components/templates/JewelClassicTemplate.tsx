import React from 'react';
import Image from 'next/image';

export default function JewelClassicTemplate({ config, shop, products, currentRoute = 'home' }: { config: any, shop: any, products: any[], currentRoute?: string }) {
  const primaryColor = config.themeColor || '#7f1d1d'; // Rich heritage red

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-[#2d1b11] font-serif selection:bg-[#7f1d1d] selection:text-[#fcf9f2]">
      
      {/* CLASSIC ELEGANCE HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#fcf9f2]/90 backdrop-blur-md border-b-4 shadow-sm" style={{ borderColor: primaryColor }}>
        {/* Top bar */}
        <div className="bg-[#2d1b11] text-[#fcf9f2] text-xs py-2 text-center tracking-widest font-sans uppercase">
          Celebrating 25 Years of Purity & Trust
        </div>
        
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-semibold text-[#4a2c1d]">
            <a href="#" className="hover:text-[#7f1d1d] transition-colors">Heritage</a>
            <a href="#" className="hover:text-[#7f1d1d] transition-colors">Bridal</a>
          </nav>
          
          <a href="./" className="text-3xl font-bold tracking-wider text-center flex-1" style={{ color: primaryColor }}>
            {shop.logoUrl ? (
              <div className="relative w-48 h-16 mx-auto">
                <Image src={shop.logoUrl} alt={config.shopName} fill className="object-contain" />
              </div>
            ) : (
              config.shopName
            )}
          </a>

          <div className="hidden md:flex items-center justify-end gap-8 text-sm uppercase tracking-widest font-semibold text-[#4a2c1d]">
            <a href="#" className="hover:text-[#7f1d1d] transition-colors">Stores</a>
            <a href="#" className="hover:text-[#7f1d1d] transition-colors">Contact</a>
          </div>
        </div>
      </header>

      <main className="pt-32 min-h-screen">
        
        {/* HERO SECTION (Warm, ornate, traditional) */}
        <section className="relative px-4 lg:px-12 py-12">
          <div className="max-w-[1400px] mx-auto bg-[#4a2c1d] rounded-[2rem] overflow-hidden relative shadow-2xl flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 p-12 lg:p-24 text-center md:text-left z-10">
              <span className="text-[#d4af37] text-sm uppercase tracking-[0.3em] font-bold mb-6 block">The Maharanis Collection</span>
              <h1 className="text-4xl lg:text-6xl text-[#fcf9f2] leading-tight mb-8">
                {config.tagline || "Where Heritage Meets Elegance."}
              </h1>
              <p className="text-[#e8dccb] text-lg mb-10 max-w-md mx-auto md:mx-0">
                Adorn yourself in 22-karat traditions crafted by generations of master artisans.
              </p>
              <button className="px-10 py-4 text-[#fcf9f2] font-bold uppercase tracking-widest text-sm rounded hover:bg-opacity-90 transition-all border border-transparent hover:border-[#d4af37]" style={{ backgroundColor: primaryColor }}>
                Explore Collection
              </button>
            </div>
            
            <div className="w-full md:w-1/2 h-[60vh] md:h-[80vh] relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4a2c1d] to-transparent z-10 hidden md:block"></div>
              {shop.coverImages && shop.coverImages.length > 0 ? (
                <Image 
                  src={shop.coverImages[0]} 
                  alt="Bridal Gold" fill className="object-cover object-right"
                />
              ) : (
                <div className="absolute inset-0 bg-[#d4af37]/20"></div>
              )}
            </div>
          </div>
        </section>

        {/* ORNATE PRODUCT GRID */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-20">
            <h2 className="text-5xl text-[#2d1b11] mb-6">Our Legacy Pieces</h2>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: primaryColor }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <div key={product.id} className="group bg-white p-6 rounded shadow-sm border border-[#e8dccb] hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
                <div className="relative w-full aspect-square mb-8 overflow-hidden rounded border border-[#f0e8d9] flex items-center justify-center bg-[#fcf9f2]">
                  {product.images && product.images.length > 0 ? (
                    <Image 
                      src={product.images[0]} 
                      alt={product.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]" 
                    />
                  ) : (
                    <span className="text-4xl opacity-20">💎</span>
                  )}
                  {product.stoneDetails?.hasStones && (
                    <div className="absolute top-4 right-4 bg-[#fcf9f2] text-[#4a2c1d] px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-md">
                      {product.stoneDetails.type}
                    </div>
                  )}
                </div>
                
                <span className="text-xs uppercase tracking-widest text-[#8c6b5d] mb-2">{product.categoryId}</span>
                <h3 className="text-xl text-[#2d1b11] mb-4 group-hover:text-[#7f1d1d] transition-colors">{product.title}</h3>
                <div className="w-12 h-px bg-[#e8dccb] mb-4"></div>
                <p className="text-2xl font-bold" style={{ color: primaryColor }}>₹{product.price.toLocaleString('en-IN')}</p>
                
                <button className="mt-8 w-full py-3 border text-sm uppercase tracking-widest font-bold text-[#4a2c1d] hover:text-[#fcf9f2] transition-colors" style={{ borderColor: primaryColor }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = primaryColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* HERITAGE BANNER */}
        <section className="py-24 px-6 bg-[#2d1b11] text-[#fcf9f2] mt-12 border-y-8" style={{ borderColor: primaryColor }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl mb-8 leading-tight">Trust Built Over Decades.</h2>
            <p className="text-lg lg:text-xl text-[#dcbba6] font-light leading-relaxed mb-12">
              Our gold is 100% BIS Hallmarked. When you buy from {config.shopName}, you are bringing home purity, prosperity, and a promise that lasts generations.
            </p>
            <button className="px-12 py-4 bg-[#d4af37] text-[#2d1b11] font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">
              Read Our Story
            </button>
          </div>
        </section>

      </main>

      {/* CLASSIC FOOTER */}
      <footer className="bg-[#1a0f0a] text-[#dcbba6] py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl text-white mb-6" style={{ color: primaryColor }}>{config.shopName}</h2>
            <p className="leading-relaxed mb-8 max-w-sm">
              Crafting exquisite traditional jewelry since the beginning. Your trusted family jeweler.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-[#dcbba6] flex items-center justify-center hover:bg-[#dcbba6] hover:text-[#1a0f0a] transition-colors">FB</a>
              <a href="#" className="w-12 h-12 rounded-full border border-[#dcbba6] flex items-center justify-center hover:bg-[#dcbba6] hover:text-[#1a0f0a] transition-colors">IG</a>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white text-lg mb-6 uppercase tracking-widest font-bold">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">Temple Jewelry</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bridal Sets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gold Coins</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Book a Video Call</a></li>
            </ul>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white text-lg mb-6 uppercase tracking-widest font-bold">Visit Us</h4>
            <ul className="space-y-4">
              <li>{shop.address}</li>
              <li>{shop.location?.city}, {shop.location?.state}</li>
              <li className="text-white font-bold text-xl mt-4">{shop.phone}</li>
              <li>{shop.email}</li>
            </ul>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-[#2d1b11] text-center text-sm font-sans tracking-widest uppercase">
          &copy; {new Date().getFullYear()} {config.shopName}. Powered by ShyamDash IT Services.
        </div>
      </footer>
    </div>
  );
}
