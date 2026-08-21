import React from 'react';
import Image from 'next/image';

export default function JewelArtisanTemplate({ config, shop, products, currentRoute = 'home' }: { config: any, shop: any, products: any[], currentRoute?: string }) {
  const primaryColor = config.themeColor || '#654321'; // Earthy brown/copper

  // Multi-page Router Map
  const renderPage = () => {
    switch (currentRoute) {
      case 'workshop':
        return <WorkshopPage shop={shop} config={config} primaryColor={primaryColor} />;
      case 'home':
      default:
        return <HomePage config={config} shop={shop} products={products} primaryColor={primaryColor} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#3e3c38] font-serif selection:bg-[#d8d3c9]">
      {/* ARTISAN HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#f9f8f6]/80 backdrop-blur-md border-b border-[#ece9e2] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <a href="./" className="text-3xl font-normal tracking-tight italic" style={{ color: primaryColor }}>
            {shop.logoUrl ? (
              <Image src={shop.logoUrl} alt={config.shopName} width={140} height={50} className="object-contain" />
            ) : (
              config.shopName
            )}
          </a>
          <nav className="hidden md:flex items-center gap-12 font-medium tracking-wide text-[#5c5a55]">
            <a href="./" className={`hover:text-[#222] transition-colors ${currentRoute === 'home' || currentRoute === '' ? 'text-[#222] italic' : ''}`}>The Collection</a>
            <a href="workshop" className={`hover:text-[#222] transition-colors ${currentRoute === 'workshop' ? 'text-[#222] italic' : ''}`}>Inside the Workshop</a>
            <a href="#" className="hover:text-[#222] transition-colors">Bespoke Inquiries</a>
          </nav>
        </div>
      </header>

      {/* DYNAMIC PAGE INJECTION */}
      <main className="min-h-screen">
        {renderPage()}
      </main>

      {/* ARTISAN FOOTER */}
      <footer className="bg-[#ece9e2] pt-24 pb-12 mt-32 border-t border-[#d8d3c9]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h3 className="text-3xl italic mb-6 text-[#222]">{config.shopName}</h3>
            <p className="text-[#5c5a55] leading-loose max-w-md font-light">
              Handcrafting fine jewelry from sustainably sourced gold and ethically mined stones. 
              Every piece is a dialogue between the artisan and the earth.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 font-light text-[#5c5a55]">
            <div>
              <h4 className="text-[#222] font-medium mb-6 uppercase tracking-widest text-xs">Visit the Studio</h4>
              <ul className="space-y-4">
                <li>{shop.address}</li>
                <li>{shop.location?.city}, {shop.location?.state}</li>
                <li className="pt-4"><a href="#" className="italic border-b border-[#5c5a55] pb-1 hover:text-[#222]">Get Directions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#222] font-medium mb-6 uppercase tracking-widest text-xs">Connect</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-[#222] transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-[#222] transition-colors">Pinterest</a></li>
                <li><a href="#" className="hover:text-[#222] transition-colors">Email Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 pt-12 border-t border-[#d8d3c9] text-center text-sm font-light text-[#8b8882]">
          &copy; {new Date().getFullYear()} {config.shopName}. Powered by ShyamDash.
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------
// PAGE 1: HOME PAGE (Asymmetrical Layout)
// ---------------------------------------------------------
function HomePage({ config, shop, products, primaryColor }: { config: any, shop: any, products: any[], primaryColor: string }) {
  return (
    <>
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-5/12 animate-in fade-in slide-in-from-left-8 duration-1000">
          <h1 className="text-5xl md:text-7xl mb-8 leading-[1.1] text-[#222] tracking-tight">
            {config.tagline || "Jewelry with a Soul."}
          </h1>
          <p className="text-xl text-[#5c5a55] font-light leading-relaxed mb-12 italic">
            Unique, handcrafted gold pieces inspired by nature's beautiful imperfections.
          </p>
          <a href="#gallery" className="inline-block border-b-2 pb-2 text-lg font-medium transition-all hover:pr-4" style={{ borderColor: primaryColor, color: primaryColor }}>
            Explore the works &rarr;
          </a>
        </div>
        <div className="w-full md:w-7/12 relative aspect-[4/3] animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
          <div className="absolute inset-0 bg-[#ece9e2] rounded-[2rem] transform rotate-3 translate-x-4 translate-y-4"></div>
          {shop.coverImages && shop.coverImages.length > 0 ? (
            <Image 
              src={shop.coverImages[0]} 
              alt="Artisan Jewelry" fill className="object-cover rounded-[2rem] shadow-xl relative z-10 hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-500" 
            />
          ) : (
            <div className="absolute inset-0 bg-[#d8d3c9] rounded-[2rem] shadow-xl z-10 flex items-center justify-center"></div>
          )}
        </div>
      </section>

      {/* Asymmetrical Gallery */}
      <section id="gallery" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {products.map((product, index) => {
            // Asymmetrical grid logic
            let colSpan = "md:col-span-4";
            let marginTop = "md:mt-0";
            
            if (index % 4 === 0) {
              colSpan = "md:col-span-7";
            } else if (index % 4 === 1) {
              colSpan = "md:col-span-5";
              marginTop = "md:mt-32";
            } else if (index % 4 === 2) {
              colSpan = "md:col-span-5";
            } else if (index % 4 === 3) {
              colSpan = "md:col-span-7";
              marginTop = "md:-mt-24";
            }

            return (
              <div key={product.id} className={`${colSpan} ${marginTop} group cursor-pointer`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-6 bg-[#ece9e2] flex items-center justify-center">
                  {product.images && product.images.length > 0 ? (
                    <Image 
                      src={product.images[0]} alt={product.title} fill 
                      className="object-cover transition-all duration-[2s] group-hover:scale-105 group-hover:opacity-90" 
                    />
                  ) : (
                    <span className="text-4xl opacity-20 grayscale sepia">💎</span>
                  )}
                  {product.stoneDetails?.hasStones && (
                    <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-[#f9f8f6] flex items-center justify-center shadow-lg text-[9px] uppercase tracking-widest font-bold text-[#5c5a55] transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      {product.stoneDetails.type}
                    </div>
                  )}
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl mb-2 text-[#222] italic">{product.title}</h3>
                    <p className="text-sm font-light text-[#5c5a55] max-w-sm line-clamp-2">{product.description}</p>
                  </div>
                  <span className="text-xl tracking-tight" style={{ color: primaryColor }}>₹{product.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------
// PAGE 2: WORKSHOP PAGE
// ---------------------------------------------------------
function WorkshopPage({ shop, config, primaryColor }: { shop: any, config: any, primaryColor: string }) {
  return (
    <div className="pt-40 pb-20 px-6 max-w-4xl mx-auto animate-in fade-in duration-1000 min-h-screen">
      <h1 className="text-5xl italic text-center mb-16 text-[#222]">Inside the Workshop</h1>
      
      <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-16 shadow-2xl">
        <Image src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=1600" alt="Workshop" fill className="object-cover sepia-[0.3]" />
      </div>
      
      <div className="prose prose-lg prose-stone max-w-2xl mx-auto font-light leading-loose text-[#5c5a55]">
        <p className="first-letter:text-7xl first-letter:font-normal first-letter:text-[#222] first-letter:mr-3 first-letter:float-left">
          Every piece at {config.shopName} begins its journey not in a factory, but on a well-worn jeweler's bench. 
          We believe that jewelry should bear the subtle marks of the hands that made it, giving each ring, necklace, 
          and bracelet a unique soul that cannot be replicated by machines.
        </p>
        <p>
          Our process involves traditional lost-wax casting, hand-forging, and meticulous stone setting. We source only 
          conflict-free gems and recycled gold, ensuring that our commitment to beauty extends to the earth from which 
          these materials came.
        </p>
        <div className="my-16 border-l-4 pl-8 italic text-2xl text-[#222]" style={{ borderColor: primaryColor }}>
          "True luxury is not about perfection, but about authenticity and the human touch."
        </div>
        <p>
          Visit our studio in {shop.location?.city} to witness the magic firsthand and discuss a bespoke commission tailored entirely to your story.
        </p>
      </div>
    </div>
  );
}
