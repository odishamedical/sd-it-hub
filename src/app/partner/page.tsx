"use client";

import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

// Golden Curved Divider
const CurvedDivider = () => (
  <div className="w-full overflow-hidden leading-none relative z-20" style={{ transform: "rotate(180deg)", marginTop: "-1px" }}>
    <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[#02050f]"></path>
      <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="none" stroke="url(#gold-gradient-partner)" strokeWidth="3"></path>
      <defs>
        <linearGradient id="gold-gradient-partner" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-amber-400 shadow-[0_0_30px_10px_rgba(245,158,11,0.6)] blur-[2px]"></div>
  </div>
);

const DownCurveDivider = () => (
  <div className="w-full overflow-hidden leading-none relative z-20">
    <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[#02050f]"></path>
      <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="none" stroke="url(#gold-gradient-down-partner)" strokeWidth="3"></path>
      <defs>
        <linearGradient id="gold-gradient-down-partner" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute bottom-0 left-1/3 -translate-x-1/2 w-1/4 h-[2px] bg-amber-400 shadow-[0_0_30px_10px_rgba(245,158,11,0.6)] blur-[2px]"></div>
  </div>
);


export default function PartnerLandingPage() {
  return (
    <main className="min-h-screen bg-[#02050f] text-slate-200 overflow-x-hidden font-sans">
      <Header />

      {/* 1. HERO SECTION (Matching exactly what we finalized earlier) */}
      <section className="relative w-full min-h-[60vh] flex items-center pt-32 pb-16 overflow-hidden">
        {/* Full Width Hero Image with Fading Masks */}
        <div className="absolute inset-0 z-0">
           <div className="relative w-full h-full">
             <Image 
               src="/stock/hero.png" 
               alt="Partner With Us" 
               fill 
               className="object-cover object-center opacity-60"
               priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#02050f] via-[#02050f]/80 to-transparent"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-[#02050f] via-transparent to-[#02050f]/50"></div>
           </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-xl">
              <Icons.BadgeCheck className="w-4 h-4" />
              Official Reseller Program
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Build Your Own <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Digital Agency.</span>
            </h1>
            <p className="text-xl md:text-xl text-amber-100/80 font-light max-w-xl mb-8">
              Gain exclusive access to our Wholesale Agency Pricing Tier. Sell premium domains, SaaS templates, and cloud hosting to your local clients at your own retail prices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/partner/register" className="px-8 py-3.5 bg-gradient-to-b from-amber-500 to-amber-700 hover:to-amber-600 text-white font-bold rounded shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:shadow-[0_0_25px_rgba(245,158,11,0.8)] transition-all hover:-translate-y-1">
                Apply Now
              </Link>
              <Link href="#how-it-works" className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded text-white font-medium transition-all shadow-lg hover:border-white/40 backdrop-blur-md">
                How it Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Curve */}
      <CurvedDivider />

      {/* Features / Benefits */}
      <section className="py-24 px-6 lg:px-12 relative bg-[#02050f]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center w-full mb-16">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-500/50 max-w-xs"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white px-8 whitespace-nowrap drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">Why Partner With Us?</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-500/50 max-w-xs"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-b from-amber-400/80 to-transparent rounded-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative h-full bg-[#0a0f1c] p-8 rounded-xl flex flex-col items-center text-center shadow-2xl">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform">
                  <Icons.Tags className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Wholesale Pricing</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Unlock deep discounts of up to 50% off retail prices on domains and templates. We keep our wholesale prices a commercial secret so you can set your own retail margins.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-b from-amber-400/80 to-transparent rounded-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative h-full bg-[#0a0f1c] p-8 rounded-xl flex flex-col items-center text-center shadow-2xl">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform">
                  <Icons.Wallet className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">100% Margin Retention</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  You bill your local clients directly. We never contact your clients or take a cut of your retail price. What you charge them is entirely up to you.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-b from-amber-400/80 to-transparent rounded-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative h-full bg-[#0a0f1c] p-8 rounded-xl flex flex-col items-center text-center shadow-2xl">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform">
                  <Icons.ShieldCheck className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">White-Label Infrastructure</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Provision high-performance SaaS templates for your clients without worrying about server maintenance. Our cloud nodes handle the heavy lifting quietly in the background.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 lg:px-12 bg-gradient-to-b from-[#02050f] to-[#050b1a]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center w-full mb-16">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-500/50 max-w-xs"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white px-8 whitespace-nowrap drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">The Partnership Lifecycle</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-500/50 max-w-xs"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-[40px] left-0 w-full h-[2px] bg-gradient-to-r from-amber-900/50 via-amber-500/50 to-amber-900/50 -translate-y-1/2 z-0"></div>
            
            {[
              { num: 1, title: "Apply & Verify", desc: "Submit your agency KYC and security deposit to join the network." },
              { num: 2, title: "Acquire Clients", desc: "Find local businesses in your city that need digital storefronts." },
              { num: 3, title: "Provision Wholesale", desc: "Log into your Partner Terminal and buy domains/templates at wholesale cost." },
              { num: 4, title: "Bill Retail", desc: "Invoice your client directly for the retail price and keep the profit margin." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center group">
                <div className="w-20 h-20 bg-[#0a0f1c] border-2 border-amber-900/50 rounded-full flex items-center justify-center text-3xl font-black text-amber-700 mb-6 group-hover:border-amber-400 group-hover:text-amber-400 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]">
                  {step.num}
                </div>
                <h4 className="text-amber-100 font-bold mb-2">{step.title}</h4>
                <p className="text-sm text-slate-400 px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Deposit Banner */}
      <section className="py-20 px-6 lg:px-12 relative overflow-hidden bg-[#050b1a]">
        <div className="absolute inset-x-0 top-0">
          <DownCurveDivider />
        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-3xl p-10 md:p-16 text-center relative z-10 shadow-[0_0_50px_rgba(245,158,11,0.1)] backdrop-blur-sm mt-16">
          <Icons.ShieldCheck className="w-12 h-12 text-amber-400 mx-auto mb-6 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Protected Wholesale Network</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            To ensure the integrity of our pricing secrets and protect our partners' retail margins, access to the Wholesale Command Center requires a fully refundable ₹10,000 security deposit and KYC verification.
          </p>
          <Link href="/partner/register" className="inline-block px-10 py-4 bg-gradient-to-b from-amber-400 to-amber-600 hover:to-amber-500 rounded text-amber-950 font-bold text-lg shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all hover:scale-105 uppercase tracking-wider">
            Start Your Application
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
