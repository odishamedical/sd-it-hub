"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import EcosystemSwitcher from "@/components/EcosystemSwitcher";

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
    <main className="relative min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
      
      {/* HEADER / NAVIGATION */}
      <header className="absolute top-0 left-0 w-full z-50 bg-[#001529]/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded border border-white/20 flex items-center justify-center">
              <Icons.Box className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wider text-white uppercase">IT HUB</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-200">
            <Link href="#domains" className="hover:text-sky-400 transition-colors">Domains</Link>
            <Link href="#templates" className="hover:text-sky-400 transition-colors">Templates</Link>
            <Link href="#services" className="hover:text-sky-400 transition-colors">Services</Link>
            <Link href="#about" className="hover:text-sky-400 transition-colors">About</Link>
            <Link href="#contact" className="hover:text-sky-400 transition-colors">Contact</Link>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="https://auth.shyamdash.com" className="text-sm font-medium text-white hover:text-sky-400">Login</Link>
            <Link href="/portal" className="px-5 py-2.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-sm font-semibold rounded transition-colors shadow-lg">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-[#001529] border-b border-white/10 flex flex-col p-4 space-y-4 shadow-xl">
            <Link href="#domains" className="text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Domains</Link>
            <Link href="#templates" className="text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Templates</Link>
            <Link href="#services" className="text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
            <div className="h-px bg-white/10 w-full my-2"></div>
            <Link href="https://auth.shyamdash.com" className="text-white font-medium">Login</Link>
            <Link href="/portal" className="text-center py-3 bg-[#0ea5e9] text-white font-bold rounded">Get Started</Link>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full pt-32 pb-40 lg:pt-48 lg:pb-56 bg-[#001529]">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{ 
            backgroundImage: 'url(/hero-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001529]/80 via-[#001529]/60 to-[#001529] pointer-events-none" />

        <div className="container relative z-[100] mx-auto px-4 lg:px-8 text-center flex flex-col items-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            Build Your Online Success
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 mb-10 max-w-2xl font-medium drop-shadow-md">
            Domain Registration, Website Solutions & Custom Development
          </p>

          {/* Domain Search UI */}
          <div className="w-full max-w-3xl relative">
            <form 
              onSubmit={handleSearch}
              className="w-full flex flex-col sm:flex-row shadow-2xl rounded overflow-hidden bg-white group border-2 border-transparent focus-within:border-[#0ea5e9] transition-colors relative z-20"
            >
              <div className="flex-grow flex items-center bg-white px-4 py-1">
                <Icons.Search className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
                <input 
                  type="text"
                  placeholder="Find your success (e.g. mybusiness)"
                  className="w-full py-4 text-slate-800 outline-none placeholder:text-slate-400 font-medium"
                  value={domainSearch}
                  onChange={(e) => setDomainSearch(e.target.value.replace(/[^a-zA-Z0-9-]/g, ''))} // only allow valid domain chars
                />
              </div>
              
              <div className="h-px w-full sm:w-px sm:h-auto bg-slate-200"></div>
              
              <select 
                value={domainExt}
                onChange={(e) => setDomainExt(e.target.value)}
                className="bg-slate-50 text-slate-700 px-6 py-4 outline-none font-bold cursor-pointer hover:bg-slate-100 transition-colors"
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
                className="bg-[#0ea5e9] hover:bg-[#0284c7] disabled:bg-[#0ea5e9]/70 text-white px-8 py-4 sm:py-0 font-bold tracking-wide transition-colors whitespace-nowrap flex items-center justify-center min-w-[160px]"
              >
                {isSearching ? <Icons.Loader2 className="w-5 h-5 animate-spin" /> : "Search Domain"}
              </button>
            </form>

            {/* Results Dropdown Container */}
            {searchResult && (
              <div className="absolute top-full left-0 w-full mt-4 bg-white rounded-xl shadow-2xl overflow-hidden z-30 border border-slate-100 text-left animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black text-slate-900">{searchResult.domain}</span>
                    {searchResult.available ? (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">AVAILABLE</span>
                    ) : (
                      <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full border border-rose-200">TAKEN</span>
                    )}
                  </div>
                  
                  {searchResult.available ? (
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-3xl font-extrabold text-slate-800">₹{searchResult.price} <span className="text-sm text-slate-400 font-medium">/yr</span></span>
                      <button className="px-6 py-2 bg-slate-900 hover:bg-[#0ea5e9] text-white font-bold rounded transition-colors shadow-md">
                        Add to Cart
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 mt-2">This domain is currently registered by someone else. Check out these alternatives below!</p>
                  )}
                </div>

                {/* Alternatives Section if taken */}
                {!searchResult.available && searchResult.alternatives && (
                  <div className="bg-slate-50 p-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Recommended Alternatives</h4>
                    <div className="space-y-3">
                      {searchResult.alternatives.map((alt: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded hover:border-sky-300 transition-colors">
                          <span className="font-bold text-slate-700">{alt.domain}</span>
                          <div className="flex items-center gap-4">
                            <span className="font-extrabold text-slate-800">₹{alt.price}</span>
                            <button className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded border border-slate-300 transition-colors">
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
          <div className="bg-navy-gradient rounded-xl p-8 shadow-2xl border border-white/10 hover:border-[#0ea5e9]/50 transition-all group hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#0ea5e9] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                <Icons.Server className="w-7 h-7 text-[#0ea5e9]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Domain & Hosting</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Secure registration, 99.9% uptime cloud hosting, and enterprise DNS management.</p>
              </div>
            </div>
            <button className="w-auto px-6 py-2 bg-[#0ea5e9]/10 hover:bg-[#0ea5e9] text-[#0ea5e9] hover:text-white border border-[#0ea5e9]/30 rounded text-sm font-semibold transition-all">
              Learn More
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-navy-gradient rounded-xl p-8 shadow-2xl border border-white/10 hover:border-[#0ea5e9]/50 transition-all group hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#0ea5e9] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                <Icons.LayoutTemplate className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Website Templates</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Beautifully crafted, SEO-optimized starter sites ready for instant deployment.</p>
              </div>
            </div>
            <button className="w-auto px-6 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 rounded text-sm font-semibold transition-all">
              Learn More
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-navy-gradient rounded-xl p-8 shadow-2xl border border-white/10 hover:border-[#0ea5e9]/50 transition-all group hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#0ea5e9] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                <Icons.Code2 className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Custom Development</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Full-stack web apps, complex API integrations, and scalable architectures.</p>
              </div>
            </div>
            <button className="w-auto px-6 py-2 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-white border border-amber-500/30 rounded text-sm font-semibold transition-all">
              Learn More
            </button>
          </div>

        </div>
      </section>

      {/* EXPLORE OUR SOLUTIONS (Ecosystem) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#001529] mb-10">Explore Our Solutions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gold Marketplace */}
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col group">
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image src="/gold-market.png" alt="Gold Marketplace" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Gold Marketplace</h3>
                <p className="text-sm text-slate-500 mb-6 flex-grow">Multi-vendor jewelry platform. Premium designs, dynamic pricing, and secure vendor portals.</p>
                <div className="flex justify-end">
                  <button className="px-6 py-2 bg-[#001529] hover:bg-[#0ea5e9] text-white rounded text-sm font-bold transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Handloom Marketplace */}
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col group">
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image src="/handloom-market.png" alt="Handloom Marketplace" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Handloom Marketplace</h3>
                <p className="text-sm text-slate-500 mb-6 flex-grow">Empowering local weavers. Direct-to-consumer Sambalpuri textile storefronts and legacy pages.</p>
                <div className="flex justify-end">
                  <button className="px-6 py-2 bg-[#001529] hover:bg-[#0ea5e9] text-white rounded text-sm font-bold transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Business Directory */}
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col group">
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image src="/business-directory.png" alt="Business Directory" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Business Directory</h3>
                <p className="text-sm text-slate-500 mb-6 flex-grow">Comprehensive local listings, mini-sites, reviews, and lead generation for small businesses.</p>
                <div className="flex justify-end">
                  <button className="px-6 py-2 bg-[#001529] hover:bg-[#0ea5e9] text-white rounded text-sm font-bold transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES (Dark Cards) */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#001529] mb-10">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Service 1 */}
            <div className="bg-[#0f172a] rounded-xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-[40px]"></div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/10 rounded">
                  <Icons.MonitorSmartphone className="w-6 h-6 text-sky-400" />
                </div>
                <h3 className="text-xl font-bold">Web Development</h3>
              </div>
              <p className="text-sm text-slate-400 mb-6">High-performance Next.js architectures, React frontends, and dynamic cloud databases.</p>
              <button className="bg-white text-slate-900 px-5 py-2 rounded text-sm font-bold hover:bg-sky-400 hover:text-white transition-colors">
                View Details
              </button>
            </div>

            {/* Service 2 */}
            <div className="bg-[#0f172a] rounded-xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px]"></div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/10 rounded">
                  <Icons.Smartphone className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold">Mobile Apps</h3>
              </div>
              <p className="text-sm text-slate-400 mb-6">Cross-platform React Native and Capacitor apps ready for iOS App Store and Google Play.</p>
              <button className="bg-white text-slate-900 px-5 py-2 rounded text-sm font-bold hover:bg-amber-400 hover:text-white transition-colors">
                View Details
              </button>
            </div>

            {/* Service 3 */}
            <div className="bg-[#0f172a] rounded-xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px]"></div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/10 rounded">
                  <Icons.Building2 className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">White Label Solutions</h3>
              </div>
              <p className="text-sm text-slate-400 mb-6">Turnkey SaaS platforms tailored for your brand. We build the engine, you own the platform.</p>
              <button className="bg-white text-slate-900 px-5 py-2 rounded text-sm font-bold hover:bg-purple-400 hover:text-white transition-colors">
                View Details
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#001529] text-slate-400 py-12 border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
              <Icons.Box className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold tracking-wider">IT HUB</span>
          </div>
          
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Support</Link>
          </div>

          <p className="text-xs">&copy; 2026 Shyam Dash Creation. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}
