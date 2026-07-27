import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PromotionServicePage() {
  return (
    <main className="relative min-h-screen bg-[#020610] text-[#e2e8f0] font-sans overflow-x-hidden flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-3xl w-full bg-[#070d1e] border border-slate-800/60 rounded-[32px] shadow-2xl p-8 md:p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent opacity-50" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-pink-500/20 border border-pink-500/30 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-md shadow-lg shadow-pink-500/20">
              <Icons.Megaphone className="w-10 h-10 text-pink-400" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black font-serif text-white mb-6">Digital Influencer & Promotion</h1>
            <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
              Our comprehensive promotion packages are currently being upgraded. We are building a new portal to showcase our viral social media campaigns and influencer networks.
            </p>
            
            <div className="inline-flex items-center px-4 py-2 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-full font-mono text-sm font-bold tracking-widest uppercase mb-10">
              Coming Soon
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/#contact-section" className="px-8 py-4 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-500/20">
                Contact Sales
              </Link>
              <Link href="/" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
