import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "IT & App Development | Shyam Dash IT Hub",
  description: "Custom Next.js web applications, React Native mobile apps, and full OS-level integrations. We build the architecture for your vision.",
};

export default function DevelopmentServicePage() {
  return (
    <main className="relative min-h-screen bg-[#020610] text-[#e2e8f0] font-sans overflow-x-hidden flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-emerald-500/20">
              <Icons.Code2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-serif text-white mb-6">IT & App Development</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              We design and engineer scalable web applications, native mobile apps, and robust backend architectures. Stop worrying about technical debt and start focusing on growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 sm:px-6 bg-[#040815]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Next.js Web Applications",
              desc: "Lightning-fast, highly optimized web applications built on React and Next.js. We prioritize SEO, accessibility, and Core Web Vitals to deliver unparalleled user experiences.",
              icon: <Icons.Globe className="w-8 h-8 text-emerald-400" />
            },
            {
              title: "React Native Mobile Apps",
              desc: "Cross-platform mobile application development for iOS and Android. Deliver native performance and a unified codebase to significantly reduce time-to-market.",
              icon: <Icons.Smartphone className="w-8 h-8 text-emerald-400" />
            },
            {
              title: "Full OS-Level Integrations",
              desc: "Complex backend architectures, custom APIs, and secure database management. We seamlessly integrate your new applications with your existing legacy systems.",
              icon: <Icons.Database className="w-8 h-8 text-emerald-400" />
            }
          ].map((service, idx) => (
            <div key={idx} className="bg-[#070d1e] border border-slate-800/60 p-8 rounded-3xl hover:border-emerald-500/30 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack & CTA */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Tech Stack</h2>
          <p className="text-lg text-slate-400 mb-12 leading-relaxed">
            We exclusively use modern, proven technologies that are actively maintained by the open-source community and backed by major tech giants. Our core stack revolves around TypeScript, React, Next.js, Node.js, and Firebase/Supabase for rapidly scalable infrastructure. We don't just write code; we engineer solutions.
          </p>
          
          <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 p-10 rounded-[32px] border border-emerald-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Have a project in mind?</h3>
            <p className="text-slate-300 mb-8">Discuss your technical requirements with our engineering team and get a detailed proposal.</p>
            <Link 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105"
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
