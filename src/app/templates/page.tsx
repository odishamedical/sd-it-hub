"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Icons from "lucide-react";
import { db, collection, getDocs, addDoc, serverTimestamp } from "@/utils/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CATEGORIES = ["All", "Gold Jewelry", "Handloom", "Healthcare", "News Portal", "Corporate"];

export default function TemplatesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTemplateColor, setSelectedTemplateColor] = useState<Record<string, string>>({
    "jewel-classic": "#991b1b",
    "jewel-modern": "#0f172a",
    "jewel-prestige": "#000000"
  });

  React.useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "shyamdash_templates"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTemplates(data);
      } catch (err) {
        console.error("Error fetching templates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

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

  const filteredTemplates = templates.filter((tpl) => 
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(n => (
                <div key={n} className="h-96 rounded-2xl bg-slate-900/50 border border-slate-800 animate-pulse"></div>
              ))}
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/20 border border-slate-800/50 rounded-3xl">
              <div className="w-20 h-20 bg-sky-500/10 rounded-full flex items-center justify-center mb-6 border border-sky-500/20">
                <Icons.LayoutTemplate className="w-10 h-10 text-sky-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No Templates Yet</h3>
              <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
                We are currently building an exclusive collection of next-generation SaaS templates for this category. Check back soon for beautiful, high-conversion layouts.
              </p>
              <button onClick={() => router.push('/contact')} className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                Request Custom Template
              </button>
            </div>
          ) : (
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
                    {template.thumbnailUrl && (
                      <Image 
                        src={template.thumbnailUrl} 
                        alt={template.name || "Template"} 
                        fill sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                      />
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-10">
                      <a 
                        href={template.colors ? `/preview/${template.id}?color=${encodeURIComponent(selectedTemplateColor[template.id] || "")}` : template.previewUrl || "#"} 
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
                        {template.category || "General"}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-extrabold text-white mb-2">{template.name || "Untitled Template"}</h3>
                    <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">
                      {template.description || "No description available for this template."}
                    </p>

                    {/* Color Swatches */}
                    {template.colors && template.colors.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Color Theme</span>
                          <span className="text-[10px] text-sky-400 font-bold">
                            {template.colors.find((c: any) => c.value === selectedTemplateColor[template.id])?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {template.colors.map((color: any) => (
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
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
