import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Digital Influencer & Promotion Packages | Shyam Dash IT Hub",
  description: "Skyrocket your brand with our premium digital promotion packages, viral social media campaigns, and extensive influencer networks.",
};

export default function PromotionServicePage() {
  return (
    <main className="relative min-h-screen bg-[#020610] text-[#e2e8f0] font-sans overflow-x-hidden flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="w-20 h-20 bg-pink-500/10 border border-pink-500/20 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-pink-500/20">
              <Icons.Megaphone className="w-10 h-10 text-pink-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6">Digital Influencer & Promotion</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              We leverage our extensive in-house team of content creators, digital marketers, and an exclusive network of influencers to guarantee your brand maximum visibility across all major platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 sm:px-6 bg-[#040815]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Viral Social Media Campaigns",
              desc: "Data-driven, highly targeted social media campaigns designed to maximize engagement, shares, and organic reach on platforms like TikTok, Instagram, and Facebook.",
              icon: <Icons.TrendingUp className="w-8 h-8 text-pink-400" />
            },
            {
              title: "Premium Video Content",
              desc: "From short-form reels to long-form YouTube documentaries, our production team handles scripting, filming, and editing to tell your brand's story powerfully.",
              icon: <Icons.Video className="w-8 h-8 text-pink-400" />
            },
            {
              title: "Influencer Partnerships",
              desc: "Direct access to our vetted network of niche influencers. We handle negotiations, contracts, and creative briefs to ensure authentic brand alignment.",
              icon: <Icons.Users className="w-8 h-8 text-pink-400" />
            }
          ].map((service, idx) => (
            <div key={idx} className="bg-[#070d1e] border border-slate-800/60 p-8 rounded-3xl hover:border-pink-500/30 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
          <h2 className="text-3xl font-bold text-white mb-6">Why Choose Our Promotion Packages?</h2>
          <p className="text-lg text-slate-400 mb-12 leading-relaxed">
            Unlike traditional PR agencies that rely on outdated media lists, we are digital natives. We understand the algorithms that govern visibility today. When you partner with us, you're not just buying ads; you're buying guaranteed attention. Our packages are fully customizable to fit startups and enterprise clients alike.
          </p>
          
          <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 p-10 rounded-[32px] border border-pink-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to go viral?</h3>
            <p className="text-slate-300 mb-8">Reach out to our sales team to request our detailed pricing and package brochure.</p>
            <Link 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(219,39,119,0.3)] hover:scale-105"
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
