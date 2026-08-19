"use client";

import React from 'react';
import JewelModernTemplate from '@/components/templates/JewelModernTemplate';
import JewelClassicTemplate from '@/components/templates/JewelClassicTemplate';
import JewelPrestigeTemplate from '@/components/templates/JewelPrestigeTemplate';
import JewelCommerceTemplate from '@/components/templates/JewelCommerceTemplate';
import JewelArtisanTemplate from '@/components/templates/JewelArtisanTemplate';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';

const MOCK_SHOP = {
  id: "shop_preview",
  name: "Boutique Preview",
  location: { city: "Mumbai", state: "Maharashtra", district: "Mumbai City", block: "Bandra" },
  address: "123 Heritage Lane, Bandra West",
  phone: "+91 98765 43210",
  email: "hello@boutiquepreview.com",
  coverImages: ["https://images.unsplash.com/photo-1599643478524-fb66f70a9210?auto=format&fit=crop&q=80&w=2000"],
};

const MOCK_PRODUCTS = [
  { 
    id: "prod_1", 
    title: "22K Gold Bridal Necklace", 
    price: 145000, 
    categoryId: "Necklaces",
    images: ["https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800"],
    description: "An exquisite 22-karat gold bridal necklace featuring intricate temple motifs and a brilliant polished finish.",
    stoneDetails: { hasStones: false, type: "none" }
  },
  { 
    id: "prod_2", 
    title: "Diamond Solitaire Ring", 
    price: 85000, 
    categoryId: "Rings",
    images: ["https://images.unsplash.com/photo-1605100804763-247f6612d486?auto=format&fit=crop&q=80&w=800"],
    description: "A breathtaking 1-carat diamond solitaire ring set in 18k white gold, designed for eternity.",
    stoneDetails: { hasStones: true, type: "Diamond" }
  },
  { 
    id: "prod_3", 
    title: "Antique Gold Bangles", 
    price: 120000, 
    categoryId: "Bangles",
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800"],
    description: "A pair of antique-finish 22k gold bangles with delicate filigree work.",
    stoneDetails: { hasStones: true, type: "Ruby" }
  },
  {
    id: "prod_4",
    title: "Emerald Drop Earrings",
    price: 65000,
    categoryId: "Earrings",
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800"],
    description: "Stunning emerald drop earrings encased in a halo of natural diamonds.",
    stoneDetails: { hasStones: true, type: "Emerald" }
  }
];

import { Suspense, useState, useEffect } from 'react';

function TemplatePreviewInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const templateId = params?.templateId as string;
  const slug = params?.slug as string[] | undefined;
  const currentRoute = slug ? slug.join('/') : 'home';
  
  // State for customization engine
  const [themeColor, setThemeColor] = useState(searchParams?.get('color') || "#0f172a");
  const [fontFamily, setFontFamily] = useState("sans");
  const [heroLayout, setHeroLayout] = useState("center");

  // Sync state with URL params if they exist on initial load
  useEffect(() => {
    const urlColor = searchParams?.get('color');
    if (urlColor) setThemeColor(urlColor);
  }, [searchParams]);

  const config = {
    shopName: "Jewel Craft Mockup",
    tagline: "Experience the elegance of our masterfully crafted collections.",
    themeColor: themeColor,
    templateId: templateId,
    fontFamily: fontFamily,
    heroLayout: heroLayout
  };

  return (
    <>
      {/* PREVIEW BANNER */}
      <div className="fixed top-0 inset-x-0 h-16 bg-slate-900 border-b border-sky-500/30 z-[100] flex items-center justify-between px-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3 w-1/4">
          <div className="bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            Preview Mode
          </div>
          <span className="text-white text-sm font-bold border-l border-slate-700 pl-3 hidden md:block">
            {templateId === 'jewel-classic' ? 'Classic Elegance' : templateId === 'jewel-modern' ? 'Modern Minimalist' : 'Prestige Gallery'}
          </span>
        </div>
        
        {/* Center: Customization Engine Toolbar */}
        <div className="flex-1 flex items-center justify-center gap-6">
          
          {/* Color Picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden lg:block">Color:</span>
            <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-lg border border-slate-700">
              {['#0f172a', '#991b1b', '#065f46', '#7e22ce', '#b45309'].map(c => (
                <button 
                  key={c}
                  onClick={() => setThemeColor(c)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${themeColor === c ? 'border-white scale-110' : 'border-transparent hover:scale-110'}`}
                  style={{ backgroundColor: c }}
                  title={`Color: ${c}`}
                />
              ))}
              {/* Custom Color Input */}
              <input 
                type="color" 
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-6 h-6 rounded-full border-none cursor-pointer bg-transparent ml-1"
                title="Pick Custom Color"
              />
            </div>
          </div>

          {/* Font Toggle */}
          <div className="flex items-center gap-2 hidden sm:flex">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden lg:block">Font:</span>
            <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
              <button 
                onClick={() => setFontFamily('sans')}
                className={`px-3 py-1 text-xs font-bold rounded ${fontFamily === 'sans' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'} font-sans`}
              >
                Sans
              </button>
              <button 
                onClick={() => setFontFamily('serif')}
                className={`px-3 py-1 text-xs font-bold rounded ${fontFamily === 'serif' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'} font-serif`}
              >
                Serif
              </button>
            </div>
          </div>

        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-4 w-1/4">
          <button onClick={() => window.close()} className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20">
            <Icons.Check className="w-4 h-4" /> <span className="hidden sm:inline">Use Template</span>
          </button>
        </div>
      </div>

      {/* RENDER TEMPLATE (Push down by 16 = 64px) */}
      <div className="pt-[64px] min-h-screen transition-all duration-500" style={{ fontFamily: fontFamily === 'serif' ? 'Georgia, serif' : 'Inter, sans-serif' }}>
        {templateId === 'jewel-modern' ? (
          <JewelModernTemplate 
            config={config} 
            shop={MOCK_SHOP} 
            products={MOCK_PRODUCTS} 
            currentRoute={currentRoute}
          />
        ) : templateId === 'jewel-classic' ? (
          <JewelClassicTemplate 
            config={config} 
            shop={MOCK_SHOP} 
            products={MOCK_PRODUCTS} 
            currentRoute={currentRoute}
          />
        ) : templateId === 'jewel-prestige' ? (
          <JewelPrestigeTemplate 
            config={config} 
            shop={MOCK_SHOP} 
            products={MOCK_PRODUCTS} 
            currentRoute={currentRoute}
          />
        ) : templateId === 'jewel-commerce' ? (
          <JewelCommerceTemplate 
            config={config} 
            shop={MOCK_SHOP} 
            products={MOCK_PRODUCTS} 
            currentRoute={currentRoute}
          />
        ) : templateId === 'jewel-artisan' ? (
          <JewelArtisanTemplate 
            config={config} 
            shop={MOCK_SHOP} 
            products={MOCK_PRODUCTS} 
            currentRoute={currentRoute}
          />
        ) : (
          <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Template Not Found</h1>
              <p className="text-slate-400">The requested template '{templateId}' does not exist or is not available for preview.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function TemplatePreview() {
  return (
    <Suspense fallback={<div className="bg-slate-950 min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <TemplatePreviewInner />
    </Suspense>
  );
}
