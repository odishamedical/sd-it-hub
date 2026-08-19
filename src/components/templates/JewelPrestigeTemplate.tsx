import React from 'react';
import Image from 'next/image';

export default function JewelPrestigeTemplate({ config, shop, products, currentRoute = 'home' }: { config: any, shop: any, products: any[], currentRoute?: string }) {
  const primaryColor = config.themeColor || '#000000'; // Default pitch black luxury

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
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-serif selection:bg-white/20">
      
      {/* GLOBAL HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <a href="./" className="text-2xl tracking-[0.3em] font-light uppercase">
            {shop.logoUrl ? (
              <Image src={shop.logoUrl} alt={config.shopName} width={120} height={40} className="object-contain invert" />
            ) : (
              config.shopName
            )}
          </a>
          <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.2em] uppercase">
            <a href="./" className={`hover:text-white/60 transition-colors ${currentRoute === 'home' || currentRoute === '' ? 'text-white' : 'text-white/40'}`}>Exhibition</a>
            <a href="collections" className={`hover:text-white/60 transition-colors ${currentRoute === 'collections' ? 'text-white' : 'text-white/40'}`}>Collections</a>
            <a href="about" className={`hover:text-white/60 transition-colors ${currentRoute === 'about' ? 'text-white' : 'text-white/40'}`}>The Maison</a>
          </nav>
          <div className="hidden md:block w-24"></div> {/* Balance spacer */}
        </div>
      </header>

      {/* DYNAMIC PAGE INJECTION */}
      <main className="pt-24 min-h-screen">
        {renderPage()}
      </main>

      {/* GLOBAL FOOTER */}
      <footer className="bg-black py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-8 text-center flex flex-col items-center">
          <h2 className="text-3xl font-light tracking-[0.2em] uppercase mb-12 text-white/90">{config.shopName}</h2>
          <div className="flex flex-col md:flex-row gap-12 text-xs tracking-[0.15em] uppercase text-white/40 mb-16">
            <a href="#" className="hover:text-white/80 transition-colors">Client Services</a>
            <a href="about" className="hover:text-white/80 transition-colors">Boutique Appointments</a>
            <a href="collections" className="hover:text-white/80 transition-colors">High Jewellery</a>
          </div>
          <div className="w-px h-16 bg-white/10 mb-16"></div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/30">
            &copy; {new Date().getFullYear()} {config.shopName}. <span className="mx-2">|</span> 
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
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={shop.coverImages?.[0] || "https://images.unsplash.com/photo-1605100804763-247f6612d486?auto=format&fit=crop&q=80&w=1600"} 
            alt="Hero" fill sizes="100vw" className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-20">
          <span className="text-xs uppercase tracking-[0.5em] text-white/50 mb-6 block">The New Collection</span>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-10 leading-tight uppercase tracking-[0.1em]">
            {config.tagline || "Redefining Luxury"}
          </h1>
          <a href="collections" className="px-12 py-4 text-xs uppercase tracking-[0.2em] border border-white/30 hover:bg-white hover:text-black transition-all duration-500">
            Discover
          </a>
        </div>
      </section>

      {featured && (
        <section className="py-32 px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square">
              <Image src={featured.images[0]} alt={featured.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <span className="text-xs uppercase tracking-[0.4em] text-white/40 mb-4 block">Masterpiece</span>
            <h3 className="text-4xl font-light uppercase tracking-widest mb-6">{featured.title}</h3>
            <p className="text-white/50 leading-relaxed font-light mb-10 max-w-md text-sm">
              {featured.description}
            </p>
            <a href={`collections#${featured.id}`} className="text-xs uppercase tracking-[0.2em] border-b border-white/30 pb-1 hover:border-white transition-colors">
              Explore the Piece
            </a>
          </div>
        </section>
      )}
    </>
  );
}

// ---------------------------------------------------------
// PAGE 2: COLLECTIONS PAGE (Multi-Product Grid)
// ---------------------------------------------------------
function CollectionsPage({ products, primaryColor }: { products: any[], primaryColor: string }) {
  return (
    <div className="py-24 px-8 max-w-7xl mx-auto animate-in fade-in duration-1000">
      <div className="text-center mb-24">
        <h1 className="text-4xl font-light uppercase tracking-[0.3em] mb-4">High Jewellery</h1>
        <p className="text-white/40 text-sm tracking-widest uppercase">The Complete Collection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {products.map(product => (
          <div key={product.id} id={product.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#111] mb-6">
              <Image 
                src={product.images[0]} alt={product.title} fill 
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">{product.categoryId}</span>
              <h3 className="text-lg font-light tracking-widest uppercase text-white/90 mb-3">{product.title}</h3>
              <span className="text-sm tracking-widest text-white/50">₹{product.price.toLocaleString('en-IN')}</span>
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
    <div className="py-24 px-8 max-w-4xl mx-auto text-center animate-in fade-in duration-1000 min-h-[60vh] flex flex-col justify-center">
      <h1 className="text-4xl font-light uppercase tracking-[0.3em] mb-12">The Maison</h1>
      <p className="text-lg text-white/60 leading-loose font-light mb-16">
        Founded on the principles of absolute perfection, {config.shopName} represents the pinnacle of high jewelry. 
        Each creation is a testament to our relentless pursuit of beauty, sourcing only the most exceptional stones 
        and employing master artisans who breathe life into precious metals.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm tracking-widest uppercase text-white/50 border-t border-white/10 pt-16 mt-8">
        <div>
          <h4 className="text-white mb-4">The Boutique</h4>
          <p className="leading-loose">{shop.address}<br/>{shop.location?.city}, {shop.location?.state}</p>
        </div>
        <div>
          <h4 className="text-white mb-4">Private Appointments</h4>
          <p className="leading-loose">Phone: {shop.phone}<br/>Email: {shop.email}</p>
        </div>
      </div>
    </div>
  );
}
