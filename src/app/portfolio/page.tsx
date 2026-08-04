import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Ecosystem Integration & Portfolio | Shyam Dash IT Hub",
  description: "Are you a vendor on Gold Dunia, Sambalpuri Hub, or Dehapa? Discover our 1-click platform integrations exclusively for ecosystem members.",
};

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen bg-[#020610] text-[#e2e8f0] font-sans overflow-x-hidden flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-amber-500/20">
              <Icons.Network className="w-10 h-10 text-amber-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6">Ecosystem Integration</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              We operate a massive interconnected network across the Gold Dunia, Bhulia Hub, and Dehapa ecosystems. As a vendor on any of these platforms, you gain exclusive access to our 1-click IT integrations and heavily discounted custom developments.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 sm:px-6 bg-[#040815]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "1-Click Inventory Sync",
              desc: "Instantly sync your local Point of Sale (POS) inventory directly to your digital storefronts across our entire network without manual data entry.",
              icon: <Icons.RefreshCw className="w-8 h-8 text-amber-400" />
            },
            {
              title: "Unified SSO Ecosystem",
              desc: "A single master login to manage your CRM, view analytics, and control your ad campaigns across Gold Dunia, Bhulia Hub, and Dehapa simultaneously.",
              icon: <Icons.ShieldCheck className="w-8 h-8 text-amber-400" />
            },
            {
              title: "Custom Vendor Sites",
              desc: "Need a standalone website for your brand? We can deploy a custom-branded e-commerce site that natively pulls products directly from your ecosystem catalog.",
              icon: <Icons.LayoutTemplate className="w-8 h-8 text-amber-400" />
            }
          ].map((service, idx) => (
            <div key={idx} className="bg-[#070d1e] border border-slate-800/60 p-8 rounded-3xl hover:border-amber-500/30 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us & CTA */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Unlock Your Vendor Benefits</h2>
          <p className="text-lg text-slate-400 mb-12 leading-relaxed">
            By being a registered vendor on our partner platforms, you have already bypassed the hardest part of digital transformation. The infrastructure is already built, and your data is already flowing. Our ecosystem integrations simply flip the switch to maximize your operational efficiency and online sales footprint.
          </p>
          
          <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 p-10 rounded-[32px] border border-amber-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Are you a registered vendor?</h3>
            <p className="text-slate-300 mb-8">Contact our dedicated ecosystem support team to claim your IT benefits and activate your integrations.</p>
            <Link 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105"
            >
              Contact Us <Icons.ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
