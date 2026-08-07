import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ITServicesPage() {
  return (
    <main className="min-h-screen bg-[#020610] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/stock/bg.png" alt="Cosmic Tech Background" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020610]/40 via-[#020610]/80 to-[#020610] mix-blend-multiply"></div>
      </div>

      <Header />

      <div className="relative z-10">
        
        {/* HERO SECTION (21:9 Aspect Ratio Focus) */}
        <section className="w-full relative min-h-[60vh] flex items-center pt-24 pb-16 overflow-hidden">
          {/* Right-aligned Hero Image with Left Fade */}
          <div className="absolute inset-0 z-0 flex justify-end">
             <div className="relative w-full lg:w-3/4 h-full">
               <Image 
                 src="/stock/hero_it.png" 
                 alt="IT Services & Solutions" 
                 fill 
                 className="object-cover object-right"
                 priority
               />
               <div className="absolute inset-0 bg-gradient-to-r from-[#020610] via-[#020610]/80 to-transparent"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#020610] via-transparent to-transparent"></div>
             </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex">
            <div className="w-full lg:w-3/5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="text-xs font-semibold tracking-wide text-blue-200 uppercase">ShyamDash IT Services</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-xl">
                Transforming Ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Digital Reality</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
                We provide state-of-the-art web development, mobile applications, and enterprise IT solutions designed to scale your business.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="#services" className="px-8 py-3.5 bg-gradient-to-b from-blue-500 to-blue-700 hover:to-blue-600 text-white font-bold rounded shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] transition-all hover:-translate-y-1">
                  Explore Services
                </Link>
                <Link href="/contact" className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded text-white font-medium transition-all shadow-lg hover:border-white/40 backdrop-blur-md">
                  Request a Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 relative z-10" id="services">
          
          {/* Core Services Grid */}
          <section>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">Our Core Services</h2>
              <h3 className="text-4xl font-extrabold text-white mb-4">Comprehensive IT Solutions</h3>
              <p className="text-slate-400 text-lg">We deliver end-to-end technology solutions tailored to your unique business requirements.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceDetailCard 
                icon={<Icons.MonitorSmartphone className="w-10 h-10 text-blue-400" />}
                title="Web & App Development"
                desc="Custom websites, progressive web apps, and native mobile applications built with modern frameworks like React and Next.js."
                features={["Responsive Design", "E-commerce Solutions", "API Integration"]}
              />
              <ServiceDetailCard 
                icon={<Icons.BarChart className="w-10 h-10 text-orange-400" />}
                title="Digital Marketing"
                desc="Data-driven SEO, PPC, and social media campaigns designed to increase your visibility and drive high-quality leads."
                features={["Search Engine Optimization", "Content Marketing", "Performance Analytics"]}
              />
              <ServiceDetailCard 
                icon={<Icons.ShieldCheck className="w-10 h-10 text-amber-400" />}
                title="IT Solutions & Support"
                desc="Secure cloud infrastructure, network management, and 24/7 technical support to keep your operations running smoothly."
                features={["Cloud Migration", "Cybersecurity", "Managed IT Services"]}
              />
            </div>
          </section>

          {/* Development Process */}
          <section className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-white mb-6">Our Proven Agile Process</h2>
                <p className="text-slate-300 mb-8 text-lg">We believe in transparency and collaboration. Our methodology ensures that your project is delivered on time, within budget, and exceeds expectations.</p>
                
                <div className="space-y-6">
                  <ProcessRow number="01" title="Discovery & Planning" desc="We analyze your requirements and map out a comprehensive project architecture." />
                  <ProcessRow number="02" title="Design & Prototyping" desc="Creating stunning UI/UX wireframes and interactive prototypes for your approval." />
                  <ProcessRow number="03" title="Agile Development" desc="Writing clean, scalable code with regular sprints and progress updates." />
                  <ProcessRow number="04" title="Testing & Deployment" desc="Rigorous QA testing followed by a seamless launch to production servers." />
                </div>
              </div>
              
              <div className="w-full md:w-1/2 relative h-[500px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <Image src="/stock/hero_it.png" alt="Development Process" fill className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 to-transparent mix-blend-multiply"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(59,130,246,0.5)] cursor-pointer hover:scale-110 transition-transform">
                     <Icons.Play className="w-8 h-8 text-white ml-1" />
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-8">
              <div className="bg-[#020610] rounded-full px-6 py-2 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-slate-300">Available for new projects</span>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">Ready to scale your business?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Let's discuss how our technology solutions can help you achieve your goals faster.</p>
            
            <Link href="/contact" className="inline-block px-10 py-4 bg-white text-[#020610] font-bold rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all hover:-translate-y-1 hover:scale-105">
              Get a Free Proposal
            </Link>
          </section>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}

function ServiceDetailCard({ icon, title, desc, features }: { icon: React.ReactNode, title: string, desc: string, features: string[] }) {
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/20 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group hover:border-blue-500/50 hover:shadow-[0_15px_40px_rgba(59,130,246,0.2)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
      
      <div className="mb-6 relative z-10 bg-slate-900/50 w-16 h-16 flex items-center justify-center rounded-2xl border border-white/10 group-hover:border-blue-500/50 transition-colors">
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4 relative z-10 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-slate-300 mb-8 relative z-10 flex-grow">{desc}</p>
      
      <ul className="space-y-3 mb-8 relative z-10">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm text-slate-400">
            <Icons.CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      
      <button className="w-full py-3 rounded bg-white/5 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 text-white border border-white/10 hover:border-blue-400 font-bold transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] mt-auto relative z-10">
        Learn More
      </button>
    </div>
  );
}

function ProcessRow({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4 group cursor-default">
      <div className="font-mono text-2xl font-bold text-slate-600 group-hover:text-blue-500 transition-colors pt-1 shrink-0">
        {number}
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{title}</h4>
        <p className="text-slate-400 text-sm">{desc}</p>
      </div>
    </div>
  );
}
