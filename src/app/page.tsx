"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [domainSearch, setDomainSearch] = useState("");
  const [domainExt, setDomainExt] = useState(".com");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Search State
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainSearch.trim()) return;

    setIsSearching(true);
    setSearchResult(null);

    try {
      // Call our mock Next.js backend
      const res = await fetch(`/api/domains/search?domain=${encodeURIComponent(domainSearch)}&tld=${encodeURIComponent(domainExt)}`);
      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#020610] text-[#e2e8f0] font-sans overflow-x-hidden">
      <Header />

      {/* HERO SECTION */}
      <section className="relative w-full pt-32 pb-40 lg:pt-48 lg:pb-56 bg-gradient-to-b from-[#050B1B] via-[#030714] to-[#020610]">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-screen"
          style={{ 
            backgroundImage: 'url(/hero-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B1B]/80 via-[#030714]/60 to-[#020610] pointer-events-none" />

        <div className="container relative z-[100] mx-auto px-4 lg:px-8 text-center flex flex-col items-center">
          <span className="text-[10px] font-mono tracking-widest text-[#a855f7] uppercase font-bold block mb-3 bg-[#a855f7]/10 px-3 py-1 rounded-full border border-[#a855f7]/20">
            Next-Gen Tech Infrastructure
          </span>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-2xl text-center leading-tight">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#6366f1]">Online Success</span>
          </h1>
          <p className="text-base lg:text-lg text-slate-400 mb-10 max-w-xl font-light leading-relaxed">
            Premium Domain Registration, High-Performance Hosting & Custom Full-Stack Web Development.
          </p>

          {/* Domain Search UI */}
          <div className="w-full max-w-3xl relative">
            <form 
              onSubmit={handleSearch}
              className="w-full flex flex-col sm:flex-row shadow-2xl rounded-2xl overflow-hidden bg-slate-950/60 backdrop-blur-md group border border-slate-900 focus-within:border-[#a855f7]/50 focus-within:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 relative z-20"
            >
              <div className="flex-grow flex items-center bg-transparent px-4 py-1">
                <Icons.Search className="w-5 h-5 text-slate-500 mr-2 flex-shrink-0" />
                <input 
                  type="text"
                  placeholder="Find your success (e.g. mybusiness)"
                  className="w-full py-4 bg-transparent text-white outline-none placeholder:text-slate-600 font-medium text-sm"
                  value={domainSearch}
                  onChange={(e) => setDomainSearch(e.target.value.replace(/[^a-zA-Z0-9-]/g, ''))} // only allow valid domain chars
                />
              </div>
              
              <div className="h-px w-full sm:w-px sm:h-auto bg-slate-900"></div>
              
              <select 
                value={domainExt}
                onChange={(e) => setDomainExt(e.target.value)}
                className="bg-slate-950/80 text-slate-350 px-6 py-4 outline-none font-bold cursor-pointer hover:bg-slate-900 transition-colors border-l border-slate-900 font-mono text-xs"
              >
                <option value=".com">.com</option>
                <option value=".in">.in</option>
                <option value=".org">.org</option>
                <option value=".net">.net</option>
                <option value=".co">.co</option>
              </select>

              <button 
                type="submit"
                disabled={isSearching}
                className="bg-gradient-to-r from-[#a855f7] to-[#6366f1] hover:opacity-90 disabled:opacity-75 text-white px-8 py-4 sm:py-0 font-bold tracking-wider uppercase text-xs transition-all whitespace-nowrap flex items-center justify-center min-w-[160px] font-mono shadow-lg shadow-purple-950/30"
              >
                {isSearching ? <Icons.Loader2 className="w-5 h-5 animate-spin" /> : "Search Domain"}
              </button>
            </form>

            {/* Results Dropdown Container */}
            {searchResult && (
              <div className="absolute top-full left-0 w-full mt-4 bg-[#070d1e]/90 border border-slate-900 shadow-2xl backdrop-blur-md rounded-2xl overflow-hidden z-30 text-left animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="p-6 border-b border-slate-900">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-white font-mono">{searchResult.domain}</span>
                    {searchResult.available ? (
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-450 text-[10px] font-mono font-bold rounded-full border border-emerald-500/20 tracking-wider">AVAILABLE</span>
                    ) : (
                      <span className="px-3 py-1 bg-rose-500/10 text-rose-450 text-[10px] font-mono font-bold rounded-full border border-rose-500/20 tracking-wider">TAKEN</span>
                    )}
                  </div>
                  
                  {searchResult.available ? (
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-3xl font-extrabold text-white font-mono">₹{searchResult.price} <span className="text-sm text-slate-500 font-medium font-sans">/yr</span></span>
                      <button className="px-6 py-2.5 bg-gradient-to-r from-[#a855f7] to-[#6366f1] text-[#020610] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        Add to Cart
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">This domain is currently registered by someone else. Check out these alternatives below!</p>
                  )}
                </div>

                {/* Alternatives Section if taken */}
                {!searchResult.available && searchResult.alternatives && (
                  <div className="bg-slate-950/40 p-6">
                    <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-4">Recommended Alternatives</h4>
                    <div className="space-y-3">
                      {searchResult.alternatives.map((alt: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3.5 bg-[#040815]/90 border border-slate-900 rounded-xl hover:border-purple-500/20 transition-all group">
                          <span className="font-bold text-slate-300 font-mono text-sm group-hover:text-white">{alt.domain}</span>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-white font-mono text-sm">₹{alt.price}</span>
                            <button className="px-4 py-1.5 bg-slate-900 hover:bg-purple-600 hover:text-[#020610] text-slate-400 hover:border-purple-500 text-xs font-bold rounded-lg border border-slate-800 transition-colors">
                              Select
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FLOATING SERVICES CARDS */}
      <section className="relative z-20 container mx-auto px-4 lg:px-8 -mt-20 lg:-mt-32 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-[#070d1e]/80 via-[#040815]/90 to-[#020610]/95 rounded-3xl p-8 shadow-2xl border border-slate-900 hover:border-[#a855f7]/30 transition-all group hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#a855f7] rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-purple-950/20 rounded-xl flex items-center justify-center shrink-0 border border-purple-500/20">
                <Icons.Server className="w-7 h-7 text-[#a855f7]" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white mb-1 font-serif">Domain & Hosting</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Secure registration, 99.9% uptime cloud hosting, and enterprise DNS management.</p>
              </div>
            </div>
            <button className="w-auto px-5 py-2.5 bg-[#a855f7]/10 hover:bg-[#a855f7] text-[#a855f7] hover:text-[#020610] border border-[#a855f7]/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-mono">
              Learn More
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-[#070d1e]/80 via-[#040815]/90 to-[#020610]/95 rounded-3xl p-8 shadow-2xl border border-slate-900 hover:border-emerald-500/30 transition-all group hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px] opacity-5 group-hover:opacity-15 transition-opacity"></div>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-emerald-950/20 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Icons.LayoutTemplate className="w-7 h-7 text-emerald-450" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white mb-1 font-serif">Website Templates</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Beautifully crafted, SEO-optimized starter sites ready for instant deployment.</p>
              </div>
            </div>
            <button className="w-auto px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-450 hover:text-[#020610] border border-emerald-500/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-mono">
              Learn More
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-[#070d1e]/80 via-[#040815]/90 to-[#020610]/95 rounded-3xl p-8 shadow-2xl border border-slate-900 hover:border-amber-500/30 transition-all group hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/10 rounded-full blur-[80px] opacity-5 group-hover:opacity-15 transition-opacity"></div>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-amber-950/20 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/20">
                <Icons.Code2 className="w-7 h-7 text-amber-450" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white mb-1 font-serif">Custom Development</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Full-stack web apps, complex API integrations, and scalable architectures.</p>
              </div>
            </div>
            <button className="w-auto px-5 py-2.5 bg-amber-500/10 hover:bg-amber-500 text-amber-450 hover:text-[#020610] border border-amber-500/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-mono">
              Learn More
            </button>
          </div>

        </div>
      </section>

      {/* EXPLORE OUR SOLUTIONS (Ecosystem) */}
      <section className="py-20 bg-[#020610] border-t border-slate-900/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-serif font-bold text-white whitespace-nowrap">Explore Our Solutions</h2>
            <div className="h-[1px] bg-slate-900 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gold Marketplace */}
            <div className="bg-[#070d1e]/40 rounded-3xl border border-slate-900 overflow-hidden flex flex-col group hover:border-[#a855f7]/30 transition-all duration-300">
              <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                <Image src="/gold-market.png" alt="Gold Marketplace" fill className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-6 flex-grow flex flex-col text-left">
                <h3 className="text-lg font-bold text-white mb-2 font-serif">Gold Marketplace</h3>
                <p className="text-xs text-slate-400 mb-6 flex-grow leading-relaxed">Multi-vendor jewelry platform. Premium designs, dynamic pricing, and secure vendor portals.</p>
                <div className="flex justify-end">
                  <button className="px-5 py-2 bg-slate-900 hover:bg-[#a855f7] text-slate-300 hover:text-[#020610] border border-slate-800 hover:border-purple-500 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Handloom Marketplace */}
            <div className="bg-[#070d1e]/40 rounded-3xl border border-slate-900 overflow-hidden flex flex-col group hover:border-[#a855f7]/30 transition-all duration-300">
              <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                <Image src="/handloom-market.png" alt="Handloom Marketplace" fill className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-6 flex-grow flex flex-col text-left">
                <h3 className="text-lg font-bold text-white mb-2 font-serif">Handloom Marketplace</h3>
                <p className="text-xs text-slate-400 mb-6 flex-grow leading-relaxed">Empowering local weavers. Direct-to-consumer Sambalpuri textile storefronts and legacy pages.</p>
                <div className="flex justify-end">
                  <button className="px-5 py-2 bg-slate-900 hover:bg-[#a855f7] text-slate-300 hover:text-[#020610] border border-slate-800 hover:border-purple-500 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Business Directory */}
            <div className="bg-[#070d1e]/40 rounded-3xl border border-slate-900 overflow-hidden flex flex-col group hover:border-[#a855f7]/30 transition-all duration-300">
              <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                <Image src="/business-directory.png" alt="Business Directory" fill className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-6 flex-grow flex flex-col text-left">
                <h3 className="text-lg font-bold text-white mb-2 font-serif">Business Directory</h3>
                <p className="text-xs text-slate-400 mb-6 flex-grow leading-relaxed">Comprehensive local listings, mini-sites, reviews, and lead generation for small businesses.</p>
                <div className="flex justify-end">
                  <button className="px-5 py-2 bg-slate-900 hover:bg-[#a855f7] text-slate-300 hover:text-[#020610] border border-slate-800 hover:border-purple-500 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES (Dark Cards) */}
      <section className="py-20 bg-slate-950/20 border-t border-slate-900/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-serif font-bold text-white whitespace-nowrap">Our Services</h2>
            <div className="h-[1px] bg-slate-900 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Service 1 */}
            <div className="bg-[#070d1e]/60 border border-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group hover:border-purple-500/20 hover:shadow-[0_0_25px_rgba(168,85,247,0.03)] transition-all duration-300 text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] group-hover:bg-purple-500/10 transition-colors"></div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl">
                  <Icons.MonitorSmartphone className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold font-serif">Web Development</h3>
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">High-performance Next.js architectures, React frontends, and dynamic cloud databases.</p>
              <button className="bg-slate-900 hover:bg-[#a855f7] border border-slate-800 hover:border-purple-500 text-slate-350 hover:text-[#020610] px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-colors">
                View Details
              </button>
            </div>

            {/* Service 2 */}
            <div className="bg-[#070d1e]/60 border border-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group hover:border-amber-500/10 hover:shadow-[0_0_25px_rgba(245,158,11,0.03)] transition-all duration-300 text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] group-hover:bg-amber-500/10 transition-colors"></div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl">
                  <Icons.Smartphone className="w-6 h-6 text-amber-450" />
                </div>
                <h3 className="text-xl font-bold font-serif">Mobile Apps</h3>
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">Cross-platform React Native and Capacitor apps ready for iOS App Store and Google Play.</p>
              <button className="bg-slate-900 hover:bg-amber-500 border border-slate-800 hover:border-amber-500 text-slate-350 hover:text-[#020610] px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-colors">
                View Details
              </button>
            </div>

            {/* Service 3 */}
            <div className="bg-[#070d1e]/60 border border-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group hover:border-purple-500/20 hover:shadow-[0_0_25px_rgba(168,85,247,0.03)] transition-all duration-300 text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] group-hover:bg-purple-500/10 transition-colors"></div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl">
                  <Icons.Building2 className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold font-serif">White Label Solutions</h3>
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">Turnkey SaaS platforms tailored for your brand. We build the engine, you own the platform.</p>
              <button className="bg-slate-900 hover:bg-[#a855f7] border border-slate-800 hover:border-purple-500 text-slate-350 hover:text-[#020610] px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-colors">
                View Details
              </button>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
