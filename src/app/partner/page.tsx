"use client";

import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PartnerLandingPage() {
  return (
    <main className="min-h-screen bg-[#000a14] text-white selection:bg-sky-500/30 overflow-x-hidden font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 flex flex-col items-center justify-center text-center border-b border-white/5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/20 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest mx-auto">
            <Icons.BadgeCheck className="w-4 h-4" />
            Official Reseller Program
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Build Your Own <br /> <span className="text-sky-400">Digital Agency.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Gain exclusive access to our Wholesale Agency Pricing Tier. Sell premium domains, SaaS templates, and cloud hosting to your local clients at your own retail prices. Keep 100% of your markup.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/partner/register" className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(14,165,233,0.5)] flex items-center gap-2 text-lg">
              Apply Now <Icons.ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#how-it-works" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-colors text-lg">
              How it Works
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Benefits */}
      <section className="py-24 px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-white">Why Partner With Us?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We provide the raw infrastructure at deep B2B discounts so you can focus on sales and scaling your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-sky-500/30 transition-colors group">
              <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icons.Tags className="w-7 h-7 text-sky-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Wholesale Pricing</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Unlock deep discounts of up to 50% off retail prices on domains and templates. We keep our wholesale prices a commercial secret so you can set your own retail margins.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-sky-500/30 transition-colors group">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icons.Wallet className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% Margin Retention</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                You bill your local clients directly. We never contact your clients or take a cut of your retail price. What you charge them is entirely up to you.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-sky-500/30 transition-colors group">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icons.ShieldCheck className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">White-Label Infrastructure</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Provision high-performance SaaS templates for your clients without worrying about server maintenance. Our cloud nodes handle the heavy lifting quietly in the background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 lg:px-12 bg-slate-900/30 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-16">The Partnership Lifecycle</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-800 -translate-y-1/2 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center group">
              <div className="w-16 h-16 bg-[#001529] border-2 border-slate-700 rounded-full flex items-center justify-center text-2xl font-black text-slate-500 mb-6 group-hover:border-sky-500 group-hover:text-sky-400 transition-colors shadow-xl">1</div>
              <h4 className="text-white font-bold mb-2">Apply & Verify</h4>
              <p className="text-xs text-slate-400 px-4">Submit your agency KYC and security deposit to join the network.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center group">
              <div className="w-16 h-16 bg-[#001529] border-2 border-slate-700 rounded-full flex items-center justify-center text-2xl font-black text-slate-500 mb-6 group-hover:border-sky-500 group-hover:text-sky-400 transition-colors shadow-xl">2</div>
              <h4 className="text-white font-bold mb-2">Acquire Clients</h4>
              <p className="text-xs text-slate-400 px-4">Find local businesses in your city that need digital storefronts.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center group">
              <div className="w-16 h-16 bg-[#001529] border-2 border-slate-700 rounded-full flex items-center justify-center text-2xl font-black text-slate-500 mb-6 group-hover:border-sky-500 group-hover:text-sky-400 transition-colors shadow-xl">3</div>
              <h4 className="text-white font-bold mb-2">Provision Wholesale</h4>
              <p className="text-xs text-slate-400 px-4">Log into your Partner Terminal and buy domains/templates at wholesale cost.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center group">
              <div className="w-16 h-16 bg-[#001529] border-2 border-slate-700 rounded-full flex items-center justify-center text-2xl font-black text-slate-500 mb-6 group-hover:border-sky-500 group-hover:text-sky-400 transition-colors shadow-xl">4</div>
              <h4 className="text-white font-bold mb-2">Bill Retail</h4>
              <p className="text-xs text-slate-400 px-4">Invoice your client directly for the retail price and keep the profit margin.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Deposit Banner */}
      <section className="py-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-sky-900/20 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/30 rounded-3xl p-10 md:p-16 text-center relative z-10 shadow-2xl backdrop-blur-sm">
          <Icons.ShieldCheck className="w-12 h-12 text-sky-400 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Protected Wholesale Network</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            To ensure the integrity of our pricing secrets and protect our partners' retail margins, access to the Wholesale Command Center requires a fully refundable ₹10,000 security deposit and KYC verification.
          </p>
          <Link href="/partner/register" className="inline-block px-8 py-4 bg-white text-slate-900 hover:bg-slate-200 font-bold rounded-xl transition-colors shadow-xl text-sm uppercase tracking-wider">
            Start Your Application
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
