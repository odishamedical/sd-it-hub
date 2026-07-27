"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as Icons from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ECOSYSTEM_ROLES: Record<string, string[]> = {
  ".golddunia.com": ["Shop", "Wholesaler", "Manufacturer"],
  ".bhulia.com": ["Weaver", "Store", "Wholesaler", "Supplier"],
  ".dehapa.com": ["Doctor", "Clinic", "Pharmacy", "Hospital"]
};

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const ODISHA_DISTRICTS = [
  "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack",
  "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur",
  "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar (Keonjhar)",
  "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh",
  "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur (Sonepur)", "Sundargarh"
];

function AdvancedSearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [domainSearch, setDomainSearch] = useState(searchParams.get("q") || "");
  const [domainExt, setDomainExt] = useState(searchParams.get("ext") || ".golddunia.com");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);

  // Trigger search on mount if query exists
  useEffect(() => {
    if (domainSearch && domainExt) {
      handleSearch();
    }
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!domainSearch.trim()) return;

    if (domainExt === "custom") {
      router.push("/#contact-section");
      return;
    }

    setIsSearching(true);
    setSearchResult(null);

    const isSubdomain = domainExt.includes("golddunia") || domainExt.includes("bhulia") || domainExt.includes("dehapa");

    try {
      if (isSubdomain) {
        let url = `/api/subdomains/check?domain=${encodeURIComponent(domainSearch)}&ext=${encodeURIComponent(domainExt)}`;
        if (state) url += `&state=${encodeURIComponent(state)}`;
        if (city) url += `&city=${encodeURIComponent(city)}`;
        if (category) url += `&category=${encodeURIComponent(category)}`;
        
        const res = await fetch(url);
        const data = await res.json();
        setSearchResult({ ...data, type: "subdomain" });
      } else {
        const res = await fetch(`/api/domains/search?domain=${encodeURIComponent(domainSearch)}&tld=${encodeURIComponent(domainExt)}`);
        const data = await res.json();
        setSearchResult({ ...data, type: "custom" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#020610] text-[#e2e8f0] font-sans">
      <Header />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4">
            <Icons.ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-black font-serif text-white mb-4">Domain Marketplace</h1>
          <p className="text-slate-400 max-w-2xl text-lg">Configure your perfect digital address. Filter by state, city, or category to find highly specific, affordable local paths.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 bg-[#070d1e] rounded-[24px] border border-slate-800/60 p-6 shadow-xl h-fit">
            <h2 className="text-lg font-bold text-white font-mono mb-6 flex items-center">
              <Icons.SlidersHorizontal className="w-5 h-5 mr-2 text-purple-400" />
              Advanced Filters
            </h2>
            
            <form onSubmit={handleSearch} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Search Term</label>
                <input 
                  type="text" 
                  value={domainSearch}
                  onChange={(e) => setDomainSearch(e.target.value)}
                  className="w-full bg-[#020610] border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g. dwarika"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Extension</label>
                <select 
                  value={domainExt}
                  onChange={(e) => setDomainExt(e.target.value)}
                  className="w-full bg-[#020610] border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none"
                >
                  <option value=".golddunia.com">.golddunia.com</option>
                  <option value=".bhulia.com">.bhulia.com</option>
                  <option value=".dehapa.com">.dehapa.com</option>
                  <option value="custom">Custom URL</option>
                </select>
              </div>

              {/* Ecosystem Filters */}
              {(domainExt === ".golddunia.com" || domainExt === ".bhulia.com" || domainExt === ".dehapa.com") && (
                <>
                  <div className="pt-4 border-t border-slate-800">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category (Optional)</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#020610] border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none"
                    >
                      <option value="">Any Category</option>
                      {ECOSYSTEM_ROLES[domainExt]?.map(role => (
                        <option key={role} value={role.toLowerCase()}>{role}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">State (Optional)</label>
                    <select 
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        setCity(""); // clear city when state changes
                      }}
                      className="w-full bg-[#020610] border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none"
                    >
                      <option value="">Any State</option>
                      {INDIAN_STATES.map(st => (
                        <option key={st} value={st.toLowerCase()}>{st}</option>
                      ))}
                    </select>
                  </div>

                  {state && (
                    <div className="animate-in fade-in slide-in-from-top-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">District / City (Optional)</label>
                      {state.toLowerCase() === "odisha" ? (
                        <select 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-[#020610] border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none"
                        >
                          <option value="">Any District</option>
                          {ODISHA_DISTRICTS.map(dist => (
                            <option key={dist} value={dist.toLowerCase()}>{dist}</option>
                          ))}
                        </select>
                      ) : (
                        <input 
                          type="text" 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-[#020610] border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                          placeholder="Enter City Name"
                        />
                      )}
                    </div>
                  )}
                </>
              )}

              <button 
                type="submit" 
                disabled={isSearching}
                className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isSearching ? (
                  <><Icons.Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
                ) : (
                  <><Icons.Search className="w-5 h-5" /> Generate Options</>
                )}
              </button>
            </form>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3">
            {isSearching ? (
              <div className="h-64 flex flex-col items-center justify-center bg-[#070d1e] rounded-[24px] border border-slate-800/60">
                <Icons.Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
                <p className="text-slate-400">Scanning registry...</p>
              </div>
            ) : searchResult ? (
              <div className="bg-[#070d1e] rounded-[24px] border border-slate-800/60 p-6 shadow-xl">
                {searchResult.type === "custom" ? (
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Custom Domain Results</h3>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-bold text-white font-mono break-all">{searchResult.domain}{searchResult.tld || domainExt}</span>
                          {searchResult.available ? (
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold rounded-full border border-emerald-500/20">AVAILABLE</span>
                          ) : (
                            <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-mono font-bold rounded-full border border-rose-500/20">TAKEN</span>
                          )}
                        </div>
                      </div>
                      {searchResult.available && (
                        <div className="flex flex-col md:items-end gap-2 shrink-0">
                          <span className="text-3xl font-black text-white font-mono">₹{searchResult.price || "899"} <span className="text-sm text-slate-400 font-sans font-medium">/yr</span></span>
                          <button onClick={() => router.push(`/checkout?type=domain&item=${encodeURIComponent(searchResult.domain + (searchResult.tld || domainExt))}&amount=${searchResult.price || '899'}`)} className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-[#020610] font-bold rounded-xl text-sm uppercase tracking-wide">Book Now</button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white font-mono">Available Name Options</h3>
                      <span className="hidden md:inline text-sm text-slate-400 font-bold uppercase tracking-widest">Pricing Tiers</span>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      {searchResult.suggestions?.map((suggestion: any) => (
                        <div key={suggestion.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-5 rounded-2xl bg-[#020610]/50 border border-slate-700/50 hover:border-purple-500/30 transition-all hover:bg-slate-800/30">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg md:text-xl font-bold text-white font-mono break-all">{suggestion.name}</span>
                              {suggestion.available ? (
                                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] md:text-xs font-mono font-bold rounded shrink-0">AVAILABLE</span>
                              ) : (
                                <span className="px-2 py-1 bg-rose-500/10 text-rose-400 text-[10px] md:text-xs font-mono font-bold rounded shrink-0">TAKEN</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded uppercase tracking-wider">{suggestion.description}</span>
                            </div>
                          </div>
                          
                          {suggestion.available ? (
                            <div className="flex items-center gap-4 shrink-0 justify-between lg:justify-end border-t border-slate-800 pt-4 lg:pt-0 lg:border-t-0">
                              <span className="text-2xl md:text-3xl font-black text-emerald-400 font-mono">₹{suggestion.price} <span className="text-xs md:text-sm text-slate-500 font-sans font-medium uppercase">/yr</span></span>
                              <button onClick={() => router.push(`/checkout?type=domain&item=${encodeURIComponent(suggestion.name)}&amount=${suggestion.price}`)} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-[#020610] font-bold rounded-xl text-xs md:text-sm uppercase tracking-wide hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20 shrink-0">Book Now</button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end border-t border-slate-800 pt-4 lg:pt-0 lg:border-t-0">
                              <span className="text-sm font-bold text-slate-500 font-mono">Unavailable</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center bg-[#070d1e] rounded-[24px] border border-slate-800/60 border-dashed">
                <Icons.Search className="w-12 h-12 text-slate-700 mb-4" />
                <h3 className="text-xl font-bold text-slate-500 font-mono">Configure Your Search</h3>
                <p className="text-slate-600 text-center max-w-sm mt-2 text-sm">Use the filters on the left to generate customized, location-aware URL options.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function AdvancedSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#020610]"><Icons.Loader2 className="w-8 h-8 animate-spin text-purple-600" /></div>}>
      <AdvancedSearchContent />
    </Suspense>
  );
}
