import React from 'react';
import Image from 'next/image';

export default function JewelArtisanTemplate({ config, shop, products, currentRoute = 'home' }: { config: any, shop: any, products: any[], currentRoute?: string }) {
  const primaryColor = config.themeColor || '#a16207'; // Earthy artisan gold/brown

  // Multi-page Router Map
  const renderPage = () => {
    switch (currentRoute) {
      case 'gallery':
        return <GalleryPage products={products} primaryColor={primaryColor} />;
      case 'studio':
        return <StudioPage shop={shop} config={config} primaryColor={primaryColor} />;
      case 'home':
      default:
        return <HomePage config={config} shop={shop} products={products} primaryColor={primaryColor} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-stone-800 font-serif overflow-x-hidden">
      
      {/* ARTISAN HEADER (Asymmetrical & Organic) */}
      <header className="relative z-50 pt-8 pb-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center">
        <a href="./" className="mb-6 md:mb-0 group">
          {shop.logoUrl ? (
            <Image src={shop.logoUrl} alt={config.shopName} width={100} height={40} className="object-contain" />
          ) : (
            <div>
              <h1 className="text-3xl font-normal italic tracking-wider text-stone-800 group-hover:text-stone-500 transition-colors">{config.shopName}</h1>
              <span className="text-[9px] uppercase tracking-[0.4em] text-stone-400 block mt-1">Handcrafted with Soul</span>
            </div>
          )}
        </a>
        
        <nav className="flex gap-8 text-xs uppercase tracking-widest text-stone-500 font-sans">
          <a href="./" className={`relative pb-1 ${currentRoute === 'home' || currentRoute === '' ? 'text-stone-900' : 'hover:text-stone-900'} transition-colors`}>
            The Work
            {(currentRoute === 'home' || currentRoute === '') && <span className="absolute bottom-0 left-0 w-full h-px" style={{ backgroundColor: primaryColor }}></span>}
          </a>
          <a href="gallery" className={`relative pb-1 ${currentRoute === 'gallery' ? 'text-stone-900' : 'hover:text-stone-900'} transition-colors`}>
            Archive
            {currentRoute === 'gallery' && <span className="absolute bottom-0 left-0 w-full h-px" style={{ backgroundColor: primaryColor }}></span>}
          </a>
          <a href="studio" className={`relative pb-1 ${currentRoute === 'studio' ? 'text-stone-900' : 'hover:text-stone-900'} transition-colors`}>
            Studio
            {currentRoute === 'studio' && <span className="absolute bottom-0 left-0 w-full h-px" style={{ backgroundColor: primaryColor }}></span>}
          </a>
        </nav>
      </header>

      {/* DYNAMIC PAGE INJECTION */}
      <main className="min-h-screen">
        {renderPage()}
      </main>

      {/* ARTISAN FOOTER */}
      <footer className="mt-24 pt-24 pb-12 px-6 md:px-12 border-t border-stone-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-sm">
            <h2 className="text-2xl italic text-stone-800 mb-6">{config.shopName}</h2>
            <p className="text-stone-500 text-sm leading-loose mb-6">
              "We believe jewelry is not just an accessory, but a wearable piece of art, carrying the energy of the hands that forged it."
            </p>
            <p className="text-xs uppercase tracking-widest text-stone-400">Handmade in {shop.location?.city || shop.location?.state}</p>
          </div>
          
          <div className="flex flex-col gap-4 font-sans text-xs uppercase tracking-widest text-stone-500">
            <span className="font-bold text-stone-800 mb-2">Connect</span>
            <a href={`mailto:${shop.email}`} className="hover:text-stone-800 transition-colors">Inquiries</a>
            <a href="#" className="hover:text-stone-800 transition-colors">Instagram</a>
            <a href="#" className="hover:text-stone-800 transition-colors">Pinterest</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------
// PAGE 1: HOME PAGE (Asymmetrical Storytelling)
// ---------------------------------------------------------
function HomePage({ config, shop, products, primaryColor }: { config: any, shop: any, products: any[], primaryColor: string }) {
  return (
    <div className="px-6 md:px-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mt-12 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-5/12 order-2 md:order-1 relative z-10">
          <h1 className="text-5xl md:text-6xl text-stone-800 leading-[1.1] mb-8 relative">
            <span className="absolute -left-8 -top-8 text-[120px] text-stone-200 opacity-50 font-sans italic z-[-1]">"</span>
            {config.tagline || "Artistry Cast in Precious Metal."}
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed mb-10 font-sans max-w-md">
            Every piece is forged by hand in our studio, embracing the natural imperfections and raw beauty of ethically sourced materials.
          </p>
          <a href="gallery" className="inline-block border-b-2 pb-1 text-sm uppercase tracking-widest font-sans font-bold hover:px-2 transition-all duration-300" style={{ borderColor: primaryColor, color: primaryColor }}>
            Explore the Archive &rarr;
          </a>
        </div>
        
        <div className="w-full md:w-7/12 order-1 md:order-2">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-stone-200">
            <Image src={shop.coverImages?.[0] || "https://images.unsplash.com/photo-1579965611488-8250c60da089?auto=format&fit=crop&q=80&w=1600"} alt="Studio Work" fill className="object-cover" />
          </div>
          <div className="mt-4 flex justify-end">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-sans">The Studio Process</span>
          </div>
        </div>
      </section>

      {/* Featured Pieces (Offset Grid) */}
      <section className="mt-32">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-sans text-stone-500 block mb-4">Latest Forgings</span>
          <div className="w-px h-12 bg-stone-300 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-32 max-w-5xl mx-auto">
          {products.slice(0, 4).map((product, idx) => (
            <div key={product.id} className={`group ${idx % 2 === 1 ? 'md:mt-32' : ''}`}>
              <div className="relative aspect-[3/4] bg-stone-100 mb-6 overflow-hidden">
                <Image src={product.images[0]} alt={product.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                {product.stoneDetails?.hasStones && (
                  <div className="absolute bottom-4 left-4 right-4 text-center py-2 bg-[#f8f5f2]/90 backdrop-blur text-[10px] uppercase tracking-widest font-sans text-stone-800">
                    {product.stoneDetails.type} Focus
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl text-stone-800 mb-2 group-hover:italic transition-all">{product.title}</h3>
                <span className="font-sans text-sm text-stone-500">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------
// PAGE 2: GALLERY PAGE (Masonry/Mosaic Style)
// ---------------------------------------------------------
function GalleryPage({ products, primaryColor }: { products: any[], primaryColor: string }) {
  return (
    <div className="px-6 md:px-12 max-w-7xl mx-auto py-16 animate-in fade-in duration-1000">
      <h1 className="text-4xl text-stone-800 italic mb-16 border-b border-stone-200 pb-8">The Archive</h1>
      
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {products.map((product, i) => (
          <div key={product.id} className="break-inside-avoid relative group cursor-pointer bg-white p-3 shadow-sm border border-stone-100">
            {/* Randomize aspect ratio slightly for the masonry effect */}
            <div className={`relative w-full ${i % 3 === 0 ? 'aspect-square' : i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'} bg-stone-100 overflow-hidden`}>
              <Image src={product.images[0]} alt={product.title} fill className="object-cover group-hover:opacity-90 transition-opacity duration-300" />
            </div>
            <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-stone-800 text-lg mb-1">{product.title}</h3>
              <p className="font-sans text-xs text-stone-500 mb-2">₹{product.price.toLocaleString('en-IN')}</p>
              <button className="text-[10px] uppercase tracking-widest border-b pb-0.5" style={{ borderColor: primaryColor, color: primaryColor }}>Request Piece</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// PAGE 3: STUDIO (About & Process)
// ---------------------------------------------------------
function StudioPage({ shop, config, primaryColor }: { shop: any, config: any, primaryColor: string }) {
  return (
    <div className="px-6 md:px-12 max-w-4xl mx-auto py-16 animate-in fade-in duration-1000">
      <div className="text-center mb-20">
        <h1 className="text-4xl text-stone-800 italic mb-6">Inside the Studio</h1>
        <div className="w-12 h-px mx-auto" style={{ backgroundColor: primaryColor }}></div>
      </div>

      <div className="prose prose-stone lg:prose-lg mx-auto font-serif text-stone-600 leading-loose">
        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:mr-3 first-letter:float-left">
          The art of jewelry making is an ancient dialogue between creator and material. Here at {config.shopName}, 
          we honor that dialogue by taking our time. There are no rush jobs. There are no mass production lines.
        </p>
        <p>
          Every piece begins as an idea, sketched roughly onto paper, before it is slowly coaxed into reality using 
          fire, hammers, and infinite patience. We source our metals and stones ethically, ensuring that the raw 
          materials carry as much good intention as the final design.
        </p>
        <blockquote className="border-l-4 pl-6 italic text-stone-800 my-10" style={{ borderColor: primaryColor }}>
          "A piece of jewelry should look like it was dug out of the earth, perfectly formed, carrying the warmth of the sun."
        </blockquote>
      </div>

      <div className="mt-24 border-t border-stone-200 pt-16 flex flex-col items-center text-center">
        <h3 className="text-xl text-stone-800 mb-8 italic">Visit the Workbench</h3>
        <p className="font-sans text-sm text-stone-500 uppercase tracking-widest leading-loose">
          {shop.address} <br/>
          {shop.location?.city}, {shop.location?.state} <br/>
          {shop.phone}
        </p>
      </div>
    </div>
  );
}
