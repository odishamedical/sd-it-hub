"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Code2, MonitorPlay, TrendingUp, Palette, Server, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ITServicesHub() {
  const services = [
    {
      title: "SaaS Templates & Portals",
      description: "Launch your business instantly with our premium, pre-built Next.js SaaS templates and dynamic portals.",
      icon: <MonitorPlay className="w-8 h-8" />,
      href: "/templates",
      color: "cyan",
      features: ["Custom Domains", "Firebase Auth Ready", "Stripe Integration"]
    },
    {
      title: "Custom Web Development",
      description: "Enterprise-grade web applications engineered from scratch to meet your exact specifications.",
      icon: <Code2 className="w-8 h-8" />,
      href: "/services/development",
      color: "blue",
      features: ["Next.js App Router", "Full-stack Scalability", "API Architecture"]
    },
    {
      title: "SEO & Digital Marketing",
      description: "Dominate search rankings and accelerate growth with our data-driven marketing campaigns.",
      icon: <TrendingUp className="w-8 h-8" />,
      href: "/services/promotion",
      color: "emerald",
      features: ["Technical SEO audits", "Content Strategy", "Ad Campaigns"]
    },
    {
      title: "Brand & UI/UX Design",
      description: "High-conversion, stunning user interfaces that elevate your brand and captivate your audience.",
      icon: <Palette className="w-8 h-8" />,
      href: "/contact",
      color: "fuchsia",
      features: ["Figma Prototyping", "Glassmorphism UI", "Design Systems"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020816] text-slate-200 font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-cyan-950/30">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-bold tracking-wider uppercase mb-8">
            <Zap className="w-4 h-4" />
            Enterprise IT Solutions
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tight">
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Digital Future</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            We are the architectural foundation of the ShyamDash Super-App. Leverage our elite engineering team to build, scale, and market your next big idea.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-[#020816] font-black rounded-xl transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105">
              Book Consultation
            </Link>
            <Link href="/templates" className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold rounded-xl transition-all hover:bg-slate-800">
              Browse SaaS Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Competencies</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">From rapid template deployment to custom enterprise architecture, we handle the entire digital lifecycle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <Link key={idx} href={service.href} className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/60 transition-all duration-300 overflow-hidden">
              <div className={`absolute top-0 right-0 w-64 h-64 bg-${service.color}-500/5 blur-[80px] rounded-full group-hover:bg-${service.color}-500/10 transition-colors`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-${service.color}-500/10 border border-${service.color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`text-${service.color}-400`}>{service.icon}</div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                <p className="text-slate-400 mb-8 h-12">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                      <CheckCircle2 className={`w-4 h-4 text-${service.color}-400`} />
                      {feat}
                    </li>
                  ))}
                </ul>
                
                <div className={`flex items-center gap-2 font-bold text-sm text-${service.color}-400 group-hover:translate-x-2 transition-transform`}>
                  Explore Service <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech Stack Marquee (Static simulation for UI) */}
      <section className="py-20 border-y border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-10">Powered by Enterprise Technologies</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60">
            <div className="flex items-center gap-2 text-xl font-bold text-white"><Server className="w-6 h-6" /> Next.js 15</div>
            <div className="flex items-center gap-2 text-xl font-bold text-white"><ShieldCheck className="w-6 h-6" /> Firebase</div>
            <div className="flex items-center gap-2 text-xl font-bold text-white"><Code2 className="w-6 h-6" /> React</div>
            <div className="flex items-center gap-2 text-xl font-bold text-white"><Palette className="w-6 h-6" /> TailwindCSS</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-3xl p-12 md:p-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to scale your vision?</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
              Stop settling for basic websites. Partner with ShyamDash IT Hub to build scalable, high-performance digital infrastructure.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#020816] font-black text-lg rounded-xl hover:bg-cyan-50 transition-colors shadow-2xl">
              Start Your Project Today <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
