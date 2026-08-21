import React from 'react';
import Image from 'next/image';

export default function JewelPrestigeTemplate({ config, shop, products, currentRoute = 'home' }: { config: any, shop: any, products: any[], currentRoute?: string }) {
  const primaryColor = config.themeColor || '#050505'; // Default pitch black luxury

  // Multi-page Router Map
  const renderPage = () => {
    switch (currentRoute) {
      case 'collections':
        return <CollectionsPage products={products} primaryColor={primaryColor} />;
      case 'about':
        return <AboutPage shop={shop} config={config} primaryColor={primaryColor} />;
      case 'home':
      default:
        return <HomePage config={config} shop={shop} products={products} primaryColor={primaryColor} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-serif selection:bg-white/20 selection:text-white">
      
      {/* GLOBAL HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#050505]/60 backdrop-blur-2xl border-b border-white/5 transition-all duration-700 hover:bg-[#050505]/90">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <a href="./" className="text-2xl tracking-[0.4em] font-light uppercase hover:opacity-70 transition-opacity">
            {shop.logoUrl ? (
              <Image src={shop.logoUrl} alt={config.shopName} width={120} height={40} className="object-contain invert" />
            ) : (
              config.shopName
            )}
          </a>
          <nav className="hidden md:flex items-center gap-12 text-[11px] tracking-[0.3em] uppercase">
            <a href="./" className={`relative pb-1 group transition-colors ${currentRoute === 'home' || currentRoute === '' ? 'text-white' : 'text-white/40 hover:text-white'}`}>
              Exhibition
              <span className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-300 ${currentRoute === 'home' || currentRoute === '' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
            <a href="collections" className={`relative pb-1 group transition-colors ${currentRoute === 'collections' ? 'text-white' : 'text-white/40 hover:text-white'}`}>
              Collections
              <span className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-300 ${currentRoute === 'collections' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
            <a href="about" className={`relative pb-1 group transition-colors ${currentRoute === 'about' ? 'text-white' : 'text-white/40 hover:text-white'}`}>
              The Maison
              <span className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-300 ${currentRoute === 'about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          </nav>
          <div className="hidden md:block w-24"></div> {/* Balance spacer */}
        </div>
      </header>

      {/* DYNAMIC PAGE INJECTION */}
      <main className="min-h-screen">
        {renderPage()}
      </main>

      {/* GLOBAL FOOTER */}
      <footer className="bg-black py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-8 text-center flex flex-col items-center">
          <h2 className="text-4xl font-light tracking-[0.3em] uppercase mb-16 text-white/90">{config.shopName}</h2>
          <div className="flex flex-col md:flex-row gap-16 text-xs tracking-[0.2em] uppercase text-white/40 mb-20">
            <a href="#" className="hover:text-white transition-colors duration-300">Client Services</a>
            <a href="about" className="hover:text-white transition-colors duration-300">Boutique Appointments</a>
            <a href="collections" className="hover:text-white transition-colors duration-300">High Jewellery</a>
          </div>
          <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent mb-16"></div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/20">
            &copy; {new Date().getFullYear()} {config.shopName}. <span className="mx-4 text-white/10">|</span> 
            Powered by ShyamDash IT Services
          </p>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------
// PAGE 1: HOME PAGE (Single Focus, Cinematic)
// ---------------------------------------------------------
function HomePage({ config, shop, products, primaryColor }: { config: any, shop: any, products: any[], primaryColor: string }) {
  const featured = products[0] || null;

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={shop.coverImages?.[0] || "https://images.unsplash.com/photo-1605100804763-247f6612d486?auto=format&fit=crop&q=80&w=1600"} 
            alt="Hero" fill sizes="100vw" className="object-cover opacity-50 scale-105 animate-[pulse_10s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-32">
          <span className="text-[10px] uppercase tracking-[0.8em] text-white/50 mb-8 block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-forwards opacity-0">The New Collection</span>
          <h1 className="text-6xl md:text-8xl font-light text-white mb-12 leading-tight uppercase tracking-[0.15em] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-forwards opacity-0">
            {config.tagline || "Redefining Luxury"}
          </h1>
          <a href="collections" className="px-12 py-5 text-[11px] uppercase tracking-[0.3em] border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-500 animate-in fade-in duration-1000 delay-700 fill-mode-forwards opacity-0">
            Discover The Pieces
          </a>
        </div>
      </section>

      {featured && (
        <section className="py-40 px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[3/4] overflow-hidden rounded shadow-2xl shadow-white/5 flex items-center justify-center bg-[#111]">
              {featured.images && featured.images.length > 0 ? (
                <Image src={featured.images[0]} alt={featured.title} fill className="object-cover grayscale hover:grayscale-0 scale-105 hover:scale-100 transition-all duration-[2s] ease-out" />
              ) : (
                <span className="text-4xl opacity-20 grayscale">💎</span>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 mb-6 block">Masterpiece</span>
            <h3 className="text-5xl font-light uppercase tracking-widest mb-8 leading-tight">{featured.title}</h3>
            <div className="w-12 h-px bg-white/20 mb-8"></div>
            <p className="text-white/40 leading-loose font-light mb-12 max-w-md text-sm">
              {featured.description}
            </p>
            <a href={`collections#${featured.id}`} className="text-xs uppercase tracking-[0.3em] border-b border-white/20 pb-2 hover:border-white hover:text-white text-white/60 transition-colors">
              Explore the Piece
            </a>
          </div>
        </section>
      )}

      {/* Cinematic Banner */}
      <section className="relative h-[60vh] overflow-hidden my-32">
        <Image src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=1600" alt="Cinematic" fill className="object-cover opacity-30 grayscale blur-sm scale-110" />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-4">
          <h2 className="text-4xl md:text-5xl font-light tracking-[0.4em] uppercase leading-relaxed text-white max-w-4xl">
            Perfection is not an act, but a habit.
          </h2>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------
// PAGE 2: COLLECTIONS PAGE (Multi-Product Grid)
// ---------------------------------------------------------
function CollectionsPage({ products, primaryColor }: { products: any[], primaryColor: string }) {
  return (
    <div className="py-40 px-8 max-w-7xl mx-auto animate-in fade-in duration-1000">
      <div className="text-center mb-32">
        <h1 className="text-5xl font-light uppercase tracking-[0.4em] mb-6">High Jewellery</h1>
        <p className="text-white/40 text-[11px] tracking-[0.5em] uppercase">The Complete Archive</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
        {products.map((product, i) => (
          <div key={product.id} id={product.id} className={`group cursor-pointer ${i % 2 === 1 ? 'md:mt-32' : ''}`}>
            <div className="relative aspect-[3/4] overflow-hidden bg-[#111] mb-8 flex items-center justify-center">
              {product.images && product.images.length > 0 ? (
                <Image 
                  src={product.images[0]} alt={product.title} fill 
                  className="object-cover opacity-60 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-[1.5s] ease-out grayscale group-hover:grayscale-0" 
                />
              ) : (
                <span className="text-4xl opacity-20 grayscale">💎</span>
              )}
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-4">{product.categoryId}</span>
              <h3 className="text-2xl font-light tracking-widest uppercase text-white/80 mb-4 group-hover:text-white transition-colors">{product.title}</h3>
              <div className="w-8 h-px bg-white/10 mb-4"></div>
              <span className="text-xs tracking-widest text-white/40">₹{product.price.toLocaleString('en-IN')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// PAGE 3: ABOUT / THE MAISON
// ---------------------------------------------------------
function AboutPage({ shop, config, primaryColor }: { shop: any, config: any, primaryColor: string }) {
  return (
    <div className="py-40 px-8 max-w-4xl mx-auto text-center animate-in fade-in duration-1000 min-h-[80vh] flex flex-col justify-center">
      <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 mb-8 block">About Us</span>
      <h1 className="text-5xl md:text-6xl font-light uppercase tracking-[0.3em] mb-16 leading-tight">The Maison</h1>
      
      <p className="text-xl md:text-2xl text-white/60 leading-loose font-light mb-24 text-justify px-4 md:px-12" style={{ textIndent: '3rem' }}>
        Founded on the principles of absolute perfection, {config.shopName} represents the pinnacle of high jewelry. 
        Each creation is a testament to our relentless pursuit of beauty, sourcing only the most exceptional stones 
        and employing master artisans who breathe life into precious metals.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-xs tracking-[0.3em] uppercase text-white/40 border-t border-white/5 pt-24 mt-8">
        <div>
          <h4 className="text-white/80 mb-6 font-light">The Boutique</h4>
          <p className="leading-loose">{shop.address}<br/>{shop.location?.city}, {shop.location?.state}</p>
        </div>
        <div>
          <h4 className="text-white/80 mb-6 font-light">Private Appointments</h4>
          <p className="leading-loose">Tel: {shop.phone}<br/>{shop.email}</p>
        </div>
      </div>
    </div>
  );
}
