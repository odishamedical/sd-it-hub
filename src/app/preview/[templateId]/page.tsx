"use client";

import React from 'react';
import JewelModernTemplate from '@/components/templates/JewelModernTemplate';
import JewelClassicTemplate from '@/components/templates/JewelClassicTemplate';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';

const MOCK_SHOP = {
  id: "mock-shop-001",
  name: "Jewel Craft Mockup",
  email: "hello@jewelcraft.com",
  address: "123 Heritage Lane, Diamond District",
  location: { city: "Mumbai", state: "Maharashtra" },
  phone: "+91 98765 43210",
  coverImages: ["https://images.unsplash.com/photo-1599643477874-5c91fce90a19?auto=format&fit=crop&q=80&w=1600"],
};

const MOCK_PRODUCTS = [
  {
    id: "prod-1",
    categoryId: "Necklaces",
    title: "22K Antique Temple Necklace",
    description: "Intricately designed temple necklace crafted in pure 22K gold featuring traditional motifs.",
    price: 125000,
    images: ["https://images.unsplash.com/photo-1599643478524-fb66f723666a?auto=format&fit=crop&q=80&w=800"],
    stoneDetails: { hasStones: true, type: "Kundan" }
  },
  {
    id: "prod-2",
    categoryId: "Earrings",
    title: "Diamond Studded Jhumkas",
    description: "Classic gold jhumkas adorned with brilliant cut diamonds for elegant occasions.",
    price: 45000,
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800"],
    stoneDetails: { hasStones: true, type: "Diamond" }
  },
  {
    id: "prod-3",
    categoryId: "Bangles",
    title: "Bridal Gold Kada Set",
    description: "A pair of heavy 24K gold kadas perfect for bridal wear and grand celebrations.",
    price: 210000,
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800"],
    stoneDetails: { hasStones: false }
  },
  {
    id: "prod-4",
    categoryId: "Rings",
    title: "Solitaire Engagement Ring",
    description: "A timeless solitaire diamond set in an 18K rose gold band.",
    price: 85000,
    images: ["https://images.unsplash.com/photo-1605100804763-247f6612d486?auto=format&fit=crop&q=80&w=800"],
    stoneDetails: { hasStones: true, type: "Diamond" }
  },
];

import { Suspense } from 'react';

function TemplatePreviewInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const templateId = params?.templateId as string;
  const themeColor = searchParams?.get('color') || "#0f172a";

  const config = {
    shopName: "Jewel Craft Mockup",
    tagline: "Experience the elegance of our masterfully crafted collections.",
    themeColor: themeColor,
    templateId: templateId
  };

  return (
    <>
      {/* PREVIEW BANNER */}
      <div className="fixed top-0 inset-x-0 h-14 bg-slate-900 border-b border-sky-500/30 z-[100] flex items-center justify-between px-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <div className="bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            Preview Mode
          </div>
          <span className="text-white text-sm font-bold border-l border-slate-700 pl-3">
            {templateId === 'jewel-classic' ? 'Classic Elegance' : templateId === 'jewel-modern' ? 'Modern Minimalist' : 'Prestige Gallery'}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-xs hidden md:inline-block">
            Theme Color: <span className="font-mono bg-slate-800 px-1 rounded">{themeColor}</span>
          </span>
          <button onClick={() => window.close()} className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20">
            <Icons.Check className="w-4 h-4" /> Use This Template
          </button>
        </div>
      </div>

      {/* RENDER TEMPLATE (Push down by 14 = 56px so banner doesn't cover top) */}
      <div className="pt-[56px] min-h-screen">
        {templateId === 'jewel-modern' ? (
          <JewelModernTemplate 
            config={config} 
            shop={MOCK_SHOP} 
            products={MOCK_PRODUCTS} 
          />
        ) : templateId === 'jewel-classic' ? (
          <JewelClassicTemplate 
            config={config} 
            shop={MOCK_SHOP} 
            products={MOCK_PRODUCTS} 
          />
        ) : templateId === 'jewel-prestige' ? (
          <JewelModernTemplate // Fallback until built
            config={config} 
            shop={MOCK_SHOP} 
            products={MOCK_PRODUCTS} 
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
