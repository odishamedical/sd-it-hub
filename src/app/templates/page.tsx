"use client";

import React, { useState } from "react";
import Image from "next/image";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock template data
const TEMPLATES = [
  {
    id: "tpl-1",
    name: "Lumina Commerce",
    category: "E-Commerce",
    price: "Included in Pro",
    image: "/template-ecommerce.png",
    description: "High-conversion premium store layout with dynamic cart and beautiful product galleries.",
  },
  {
    id: "tpl-2",
    name: "Nexus Corporate",
    category: "Corporate",
    price: "Free",
    image: "/template-corporate.png",
    description: "Sleek, dark-themed corporate website for B2B SaaS and IT agencies.",
  },
  {
    id: "tpl-3",
    name: "Aura Portfolio",
    category: "Portfolio",
    price: "Free",
    image: "/template-portfolio.png",
    description: "Minimalist, typography-driven portfolio for creative professionals and freelancers.",
  },
  {
    id: "tpl-4",
    name: "Velocity SaaS",
    category: "One-Page",
    price: "Included in Pro",
    image: "/template-corporate.png",
    description: "High-speed, single-page landing page designed specifically for SaaS product launches.",
  },
  {
    id: "tpl-5",
    name: "Marketplace Hub",
    category: "E-Commerce",
    price: "Enterprise Only",
    image: "/gold-market.png",
    description: "Multi-vendor architecture supporting thousands of simultaneous sellers.",
  },
  {
    id: "tpl-6",
    name: "Local Biz Listing",
    category: "Directory",
    price: "Free",
    image: "/business-directory.png",
    description: "Clean layout for local businesses to showcase their services, map, and reviews.",
  }
];

const CATEGORIES = ["All", "E-Commerce", "Corporate", "Portfolio", "One-Page", "Directory"];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates = TEMPLATES.filter((tpl) => 
    activeCategory === "All" ? true : tpl.category === activeCategory
  );

  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden flex flex-col">
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
                    : "bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform duration-300">
                {/* Image Preview */}
                <div className="relative h-64 w-full bg-slate-100 border-b border-slate-100 overflow-hidden">
                  <Image 
                    src={template.image} 
                    alt={template.name} 
                    fill 
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button className="px-6 py-2.5 bg-white text-slate-900 font-bold rounded shadow-xl flex items-center gap-2 hover:bg-sky-50 transition-colors">
                      <Icons.Eye className="w-4 h-4" /> Live Preview
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded">
                      {template.category}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{template.price}</span>
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed">
                    {template.description}
                  </p>

                  <button className="w-full py-3 bg-[#001529] hover:bg-[#0ea5e9] text-white font-bold rounded transition-colors text-sm">
                    Use This Template
                  </button>
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
