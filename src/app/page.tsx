"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickContactForm from "@/components/QuickContactForm";

export default function Home() {
  const [domainSearch, setDomainSearch] = useState("");
  const [domainExt, setDomainExt] = useState(".com");
  
  // Search State
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainSearch.trim()) return;

    setIsSearching(true);
    setSearchResult(null);

    try {
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
    <main className="relative min-h-screen bg-[#020610] text-[#e2e8f0] font-sans overflow-x-hidden pb-20">
      <Header />

      {/* BENTO GRID CONTAINER */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 max-w-[1400px]">
        
        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6 auto-rows-min">

          {/* TILE 1: Domain Hero (Full Width) */}
          <div className="md:col-span-4 lg:col-span-12 bg-gradient-to-br from-[#070d1e] via-[#040815] to-[#020610] rounded-[32px] border border-slate-800/60 shadow-2xl overflow-hidden relative group p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#020610] via-[#020610]/90 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020610] via-transparent to-transparent z-10" />
              <Image src="/stock/bento-domain-bg.png" alt="Background" fill className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000" />
            </div>

            <div className="relative z-20 flex-1 max-w-2xl text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-serif font-black text-white mb-4 tracking-tight leading-tight">
                <span className="text-sm md:text-base font-mono text-[#a855f7] uppercase tracking-widest block mb-4 font-bold">Global IT & Web Services</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#6366f1]">We Build the Internet.</span>
              </h1>
              <p className="text-lg text-slate-300 font-light mb-10 tracking-wide">
                Your Complete IT & Promotion Agency. Domain booking, custom web development, and digital marketing—all in one place.
              </p>

              {/* Domain Search UI */}
              <div className="w-full relative">
                <form 
                  onSubmit={handleSearch}
                  className="w-full flex flex-col sm:flex-row shadow-2xl rounded-2xl overflow-hidden bg-[#040815]/80 backdrop-blur-md group-focus-within:border-[#a855f7]/50 focus-within:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300 border border-slate-700/50"
                >
                  <div className="flex-grow flex items-center bg-transparent px-4 py-2">
                    <Icons.Search className="w-5 h-5 text-[#a855f7] mr-3 shrink-0" />
                    <input 
                      type="text"
                      placeholder="Find your business domain"
                      className="w-full py-3 bg-transparent text-white outline-none placeholder:text-slate-500 font-medium text-base"
                      value={domainSearch}
                      onChange={(e) => setDomainSearch(e.target.value.replace(/[^a-zA-Z0-9-]/g, ''))}
                    />
                  </div>
                  
                  <div className="h-px w-full sm:w-px sm:h-auto bg-slate-700/50"></div>
                  
                  <select 
                    value={domainExt}
                    onChange={(e) => setDomainExt(e.target.value)}
                    className="bg-[#020610]/50 text-slate-300 px-6 py-4 outline-none font-bold cursor-pointer hover:bg-slate-900 transition-colors font-mono text-sm"
                  >
                    <option value=".com">.com</option>
                    <option value=".in">.in</option>
                    <option value=".org">.org</option>
                  </select>

                  <button 
                    type="submit"
                    disabled={isSearching}
                    className="bg-gradient-to-r from-[#a855f7] to-[#6366f1] hover:brightness-110 disabled:opacity-75 text-white px-8 py-4 sm:py-0 font-bold tracking-wider uppercase text-sm transition-all flex items-center justify-center min-w-[160px] font-mono shadow-inner shadow-white/20"
                  >
                    {isSearching ? <Icons.Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
                  </button>
                </form>

                {/* Search Results */}
                {searchResult && (
                  <div className="absolute top-full left-0 w-full mt-4 bg-[#070d1e]/95 border border-[#a855f7]/30 shadow-[0_10px_40px_rgba(168,85,247,0.2)] backdrop-blur-xl rounded-2xl p-6 z-30 animate-in fade-in slide-in-from-top-4 text-left">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-white font-mono">{searchResult.domain}</span>
                      {searchResult.available ? (
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold rounded-full border border-emerald-500/20">AVAILABLE</span>
                      ) : (
                        <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-mono font-bold rounded-full border border-rose-500/20">TAKEN</span>
                      )}
                    </div>
                    {searchResult.available ? (
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-white font-mono">₹{searchResult.price} <span className="text-sm text-slate-400 font-sans font-medium">/yr</span></span>
                        <button className="px-6 py-3 bg-[#a855f7] text-white font-bold rounded-xl text-sm uppercase tracking-wide hover:scale-105 transition-transform shadow-lg shadow-purple-900/50">Book Now</button>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">This domain is registered. Please try another search above.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Decorative Right Side */}
            <div className="relative z-20 hidden lg:block w-[400px] h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-500/20 rounded-full blur-[80px]" />
              <div className="w-full h-full border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md flex items-center justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
                <Icons.Globe className="w-32 h-32 text-purple-400/50" strokeWidth={1} />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              </div>
            </div>
          </div>

          {/* TILE 2: Digital Influencer & Social Promo */}
          <div className="md:col-span-2 lg:col-span-8 bg-[#070d1e]/80 rounded-[32px] border border-slate-800/60 shadow-xl overflow-hidden relative group min-h-[360px] flex flex-col justify-end p-8">
            <div className="absolute inset-0 z-0">
              <Image src="/stock/bento-influencer.png" alt="Digital Promotion" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020610] via-[#020610]/80 to-transparent" />
            </div>
            <div className="relative z-10 w-full max-w-lg">
              <div className="w-12 h-12 bg-pink-500/20 border border-pink-500/30 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                <Icons.Megaphone className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-white mb-2">Digital Influencer & Promotion</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Our in-house team of content creators and digital marketers will skyrocket your brand. From viral social media campaigns to premium video content, we guarantee visibility.
              </p>
              <Link href="/services/promotion" className="inline-flex items-center text-sm font-bold text-pink-400 hover:text-pink-300 transition-colors uppercase tracking-widest font-mono">
                Explore Packages <Icons.ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* TILE 3: Quick Contact */}
          <div className="md:col-span-2 lg:col-span-4 bg-gradient-to-b from-[#111827] to-[#020610] rounded-[32px] border border-slate-800/60 shadow-xl overflow-hidden relative group p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6">
                <Icons.MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white mb-2">Start a Project</h3>
              <p className="text-slate-400 text-xs mb-6">Send us a quick message. Our consultants will get back to you immediately.</p>
              
              <QuickContactForm />
            </div>
          </div>

          {/* TILE 4: IT Consultation (Code) */}
          <div className="md:col-span-2 lg:col-span-6 bg-[#070d1e]/80 rounded-[32px] border border-slate-800/60 shadow-xl overflow-hidden relative group min-h-[300px] p-8 flex flex-col justify-center text-left">
            <div className="absolute inset-0 z-0">
              <Image src="/stock/bento-code.png" alt="IT Consultation" fill className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020610] via-[#020610]/80 to-transparent" />
            </div>
            <div className="relative z-10 w-full max-w-sm text-left">
              <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-4">
                <Icons.Code2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-white mb-2">IT & App Development</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Custom Next.js web applications, React Native mobile apps, and full OS-level integrations. We build the architecture for your vision.
              </p>
              <Link href="/services/development" className="inline-flex items-center text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest font-mono">
                View Tech Stack <Icons.ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* TILE 5: Ecosystem Integration */}
          <div className="md:col-span-2 lg:col-span-6 bg-[#070d1e]/80 rounded-[32px] border border-slate-800/60 shadow-xl overflow-hidden relative group min-h-[300px] p-8 flex flex-col justify-center">
            <div className="absolute inset-0 z-0">
              <Image src="/stock/bento-ecosystem.png" alt="Ecosystem Integration" fill className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#020610] via-[#020610]/80 to-transparent" />
            </div>
            <div className="relative z-10 w-full max-w-sm ml-auto text-right flex flex-col items-end">
              <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-center justify-center mb-4">
                <Icons.Network className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-white mb-2">Ecosystem Integration</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Are you a vendor on Gold Dunia, Sambalpuri Hub, or Dehapa? We offer massive discounts and 1-click platform integrations exclusively for ecosystem members.
              </p>
              <Link href="/portfolio" className="inline-flex items-center text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-widest font-mono">
                See Integrations <Icons.ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
