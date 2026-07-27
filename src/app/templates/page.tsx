"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Icons from "lucide-react";
import { db, collection, addDoc, serverTimestamp } from "@/utils/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock template data
const TEMPLATES = [
  // GOLD JEWELRY
  {
    id: "jewel-classic",
    name: "Classic Elegance",
    category: "Gold Jewelry",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    description: "A traditional, luxurious layout perfect for established heritage jewelers.",
    previewUrl: "https://shyamdash.com",
    colors: [
      { name: "Ruby Red", value: "#991b1b" },
      { name: "Emerald", value: "#065f46" },
      { name: "Royal Blue", value: "#1e3a8a" },
      { name: "Gold", value: "#854d0e" },
    ]
  },
  {
    id: "jewel-modern",
    name: "Modern Minimalist",
    category: "Gold Jewelry",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    description: "Clean, spacious design focusing on high-quality product imagery and contemporary style.",
    previewUrl: "https://shyamdash.com",
    colors: [
      { name: "Slate", value: "#0f172a" },
      { name: "Rose Gold", value: "#b45309" },
      { name: "Sapphire", value: "#0369a1" },
      { name: "Pearl", value: "#d6d3d1" },
    ]
  },
  {
    id: "jewel-prestige",
    name: "Prestige Gallery",
    category: "Gold Jewelry",
    image: "https://images.unsplash.com/photo-1599643478524-fb66f723666a?auto=format&fit=crop&q=80&w=800",
    description: "Dark-themed, high-contrast layout designed for premium, exclusive collections.",
    previewUrl: "https://shyamdash.com",
    colors: [
      { name: "Onyx", value: "#000000" },
      { name: "Crimson", value: "#881337" },
      { name: "Midnight", value: "#172554" },
      { name: "Deep Forest", value: "#14532d" },
    ]
  },
  // SAMBALPURI SAREE
  {
    id: "sar-1",
    name: "Vibrant Ikat",
    category: "Handloom",
    image: "/saree-1.png",
    description: "Colorful and engaging UI highlighting rich Sambalpuri ikat patterns and textiles.",
    previewUrl: "https://bhulia.com",
  },
  {
    id: "sar-2",
    name: "Silk Elegance",
    category: "Handloom",
    image: "/saree-2.png",
    description: "Sophisticated pastel high-fashion boutique for premium silk sarees.",
    previewUrl: "https://bhulia.com",
  },
  {
    id: "sar-3",
    name: "Weaver's Legacy",
    category: "Handloom",
    image: "/saree-3.png",
    description: "Earthy artisan portfolio focusing on storytelling and traditional weaver craftsmanship.",
    previewUrl: "https://bhulia.com",
  },
  // HEALTHCARE (Dehapa)
  {
    id: "hlt-1",
    name: "CareClinic Portal",
    category: "Healthcare",
    image: "/health-1.png",
    description: "Clean medical blue theme with integrated patient appointment booking dashboard.",
    previewUrl: "https://dehapa.com",
  },
  {
    id: "hlt-2",
    name: "Medica Hospital",
    category: "Healthcare",
    image: "/health-2.png",
    description: "Large multi-specialty hospital portal with trustworthy corporate medical design.",
    previewUrl: "https://dehapa.com",
  },
  {
    id: "hlt-3",
    name: "PharmaCorp Sciences",
    category: "Healthcare",
    image: "/health-3.png",
    description: "Clean laboratory scientific aesthetic for pharmaceutical manufacturing companies.",
    previewUrl: "https://dehapa.com",
  },
  // NEWS PORTAL
  {
    id: "nws-1",
    name: "The Daily Express",
    category: "News Portal",
    image: "/news-1.png",
    description: "Dense informational layout with breaking news banners and live ticker integration.",
    previewUrl: "#",
  },
  // CORPORATE / OTHER
  {
    id: "tpl-2",
    name: "Nexus Corporate",
    category: "Corporate",
    image: "/template-corporate.png",
    description: "Sleek, dark-themed corporate website for B2B SaaS and IT agencies.",
    previewUrl: "#",
  },
  {
    id: "tpl-6",
    name: "Local Biz Directory",
    category: "Corporate",
    image: "/business-directory.png",
    description: "Clean layout for local businesses to showcase their services, map, and reviews.",
    previewUrl: "https://directory.bhulia.com",
  }
];

const CATEGORIES = ["All", "Gold Jewelry", "Handloom", "Healthcare", "News Portal", "Corporate"];

export default function TemplatesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");

  const [selectedTemplateColor, setSelectedTemplateColor] = useState<Record<string, string>>({
    "jewel-classic": "#991b1b",
    "jewel-modern": "#0f172a",
    "jewel-prestige": "#000000"
  });

  const handleRequestDeployment = async (template: any) => {
    const email = localStorage.getItem("sd_current_user_email");
    if (!email) {
      alert(`To use the ${template.name} template, please log in and claim your domain bundle. These premium templates are exclusively available for esteemed clients of the ShyamDash ecosystem.`);
      window.location.href = `https://sd-auth-center.vercel.app?redirect_uri=${encodeURIComponent(window.location.href)}`;
      return;
    }
    // If logged in, send them to portal configure
    router.push(`/portal/configure?template=${template.id}`);
  };

  const filteredTemplates = TEMPLATES.filter((tpl) => 
    activeCategory === "All" ? true : tpl.category === activeCategory
  );

  return (
    <main className="relative min-h-screen bg-[#001529] text-white font-sans overflow-x-hidden flex flex-col">
      <Header />

      {/* Page Header */}
      <section className="pt-40 pb-20 bg-[#001529] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-20 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001529] to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Website Templates</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Choose from our collection of premium, SEO-optimized, and lightning-fast web templates built specifically for modern enterprises.
          </p>
        </div>
      </section>

      {/* Notification Banner */}
      <div className="bg-sky-500/10 border-b border-sky-500/20 py-3 px-4 text-center">
        <p className="text-sm text-sky-400 font-medium max-w-4xl mx-auto">
          <Icons.Info className="w-4 h-4 inline-block mr-2 -mt-0.5" />
          These premium templates are exclusively available for esteemed clients of the ShyamDash ecosystem. Claim a subdomain or custom URL on Gold Dunia, Bhulia, or Dehapa to unlock your template.
        </p>
      </div>

      {/* Main Content */}
      <section className="py-16 flex-grow">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#0ea5e9] text-white shadow-lg shadow-sky-500/30"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-sky-500 hover:text-sky-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="glass-panel-dark rounded-2xl shadow-lg border border-slate-800 overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform duration-300">
                {/* Image Preview */}
                <div className="relative h-64 w-full bg-slate-900 border-b border-slate-800 overflow-hidden">
                  {/* Dynamic Color Overlay based on selected swatch */}
                  <div 
                    className="absolute inset-0 mix-blend-color transition-colors duration-500 z-0 opacity-50"
                    style={{ backgroundColor: selectedTemplateColor[template.id] || "transparent" }}
                  />
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-10">
                    <a 
                      href={template.colors ? `/preview/${template.id}?color=${encodeURIComponent(selectedTemplateColor[template.id] || "")}` : template.previewUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-sky-500 text-white font-bold rounded shadow-[0_0_20px_rgba(14,165,233,0.3)] flex items-center gap-2 hover:bg-sky-400 transition-colors"
                    >
                      <Icons.Eye className="w-4 h-4" /> Live Preview
                    </a>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded">
                      {template.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-white mb-2">{template.name}</h3>
                  <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">
                    {template.description}
                  </p>

                  {/* Color Swatches */}
                  {template.colors && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Color Theme</span>
                        <span className="text-[10px] text-sky-400 font-bold">
                          {template.colors.find(c => c.value === selectedTemplateColor[template.id])?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {template.colors.map(color => (
                          <button
                            key={color.value}
                            onClick={() => setSelectedTemplateColor({...selectedTemplateColor, [template.id]: color.value})}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              selectedTemplateColor[template.id] === color.value 
                                ? "border-sky-400 scale-110 shadow-[0_0_10px_rgba(56,189,248,0.5)]" 
                                : "border-transparent hover:scale-110 hover:border-slate-500"
                            }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleRequestDeployment(template)}
                      className="flex-1 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-colors text-sm shadow-lg shadow-sky-500/20"
                    >
                      Claim Template Bundle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <Icons.LayoutTemplate className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>No templates found for this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
