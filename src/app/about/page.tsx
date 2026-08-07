import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Target, Eye, Users, ChevronRight, Briefcase, Medal, Globe, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us | Shyam Dash IT Hub",
  description: "Innovating & Empowering Your Digital Journey.",
};

// Reusable SVG Silhouette Component
const Silhouette = () => (
  <div className="w-full h-full bg-gradient-to-b from-slate-700 to-slate-900 flex items-end justify-center rounded-t-xl overflow-hidden">
    <svg viewBox="0 0 24 24" fill="none" className="w-3/4 h-3/4 text-slate-500 opacity-50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  </div>
);

// Golden Curved Divider
const CurvedDivider = () => (
  <div className="w-full overflow-hidden leading-none relative z-20" style={{ transform: "rotate(180deg)", marginTop: "-1px" }}>
    <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[#02050f]"></path>
      <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="none" stroke="url(#gold-gradient)" strokeWidth="3"></path>
      <defs>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
    {/* Glowing flare */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-amber-400 shadow-[0_0_30px_10px_rgba(245,158,11,0.6)] blur-[2px]"></div>
  </div>
);

const DownCurveDivider = () => (
  <div className="w-full overflow-hidden leading-none relative z-20">
    <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[#02050f]"></path>
      <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="none" stroke="url(#gold-gradient-down)" strokeWidth="3"></path>
      <defs>
        <linearGradient id="gold-gradient-down" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute bottom-0 left-1/3 -translate-x-1/2 w-1/4 h-[2px] bg-amber-400 shadow-[0_0_30px_10px_rgba(245,158,11,0.6)] blur-[2px]"></div>
  </div>
);


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#02050f] text-slate-200 overflow-hidden font-sans">
      <Header />
      
      {/* 1. HERO SECTION (Matching exactly what we finalized earlier) */}
      <section className="relative w-full min-h-[60vh] flex items-center pt-32 pb-16 overflow-hidden">
        {/* Full Width Hero Image with Fading Masks */}
        <div className="absolute inset-0 z-0">
           <div className="relative w-full h-full">
             <Image 
               src="/stock/hero.png" 
               alt="Team Collaboration" 
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
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-amber-100/90 font-light max-w-xl">
              Innovating & Empowering Your Digital Journey.
            </p>
          </div>
        </div>
      </section>

      {/* Top Curve */}
      <CurvedDivider />

      {/* 2. WHO WE ARE & BADGES */}
      <section className="relative py-20 px-4 bg-[#02050f]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Who We Are</h2>
            <h3 className="text-2xl font-semibold text-amber-400 mb-4">Leading IT Solutions Provider Based in Odisha, India</h3>
            <p className="text-xl text-slate-300 mb-6 font-medium">Delivering Excellence in Web, App, and Digital Services</p>
            <p className="text-slate-400 leading-relaxed text-lg">
              At ShyamDash IT Hub, we are dedicated to driving success for our clients through cutting-edge technology and innovative solutions. With a passion for excellence, we turn ideas into reality.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-end items-center">
            {/* CSS 3D Badge 1 */}
            <div className="relative group perspective">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-yellow-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-8 py-6 bg-gradient-to-b from-slate-800 to-slate-950 border border-amber-500/30 rounded-xl flex flex-col items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.5)] transform-gpu hover:-translate-y-2 transition-all duration-300 w-56">
                <span className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-1">Established</span>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 drop-shadow-lg">2015</span>
              </div>
            </div>

            {/* CSS 3D Badge 2 */}
            <div className="relative group perspective">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 shadow-[0_0_30px_rgba(245,158,11,0.5)]"></div>
              <div className="relative px-8 py-6 bg-gradient-to-br from-amber-400 to-amber-600 border border-amber-300/50 rounded-xl flex flex-col items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_15px_30px_rgba(0,0,0,0.6)] transform-gpu hover:-translate-y-2 transition-all duration-300 w-56">
                <span className="text-amber-950 font-bold text-sm tracking-wide uppercase mb-1 opacity-80">Over</span>
                <span className="text-4xl font-black text-white drop-shadow-md">10K+</span>
                <span className="text-amber-950 font-bold text-xs tracking-wide uppercase mt-1">Projects Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VALUES */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-[#02050f] to-[#050b1a]">
        
        <div className="flex items-center justify-center w-full mb-16">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-500/50 max-w-xs"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white px-8 whitespace-nowrap drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">Our Mission & Values</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-500/50 max-w-xs"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Mission",
              subtitle: "Empowering Your Success",
              desc: "Experience & Commitment.",
              icon: <Target className="w-8 h-8 text-amber-400" />
            },
            {
              title: "Our Vision",
              subtitle: "Innovation & Growth",
              desc: "Experience & Commitment.",
              icon: <Eye className="w-8 h-8 text-amber-400" />
            },
            {
              title: "Our Values",
              subtitle: "Integrity & Commitment",
              desc: "Experience & Commitment.",
              icon: <HeartHandshake className="w-8 h-8 text-amber-400" />
            }
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Golden glowing border effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-b from-amber-400/80 to-transparent rounded-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative h-full bg-[#0a0f1c] p-8 rounded-xl flex flex-col items-center text-center shadow-2xl">
                <div className="flex items-center gap-3 mb-2">
                  {item.icon}
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                </div>
                <h4 className="text-amber-400 font-semibold mb-6">{item.subtitle}</h4>
                <p className="text-slate-400 text-sm">{item.desc}</p>
                <div className="mt-8 px-6 py-2 bg-gradient-to-b from-amber-500 to-amber-700 hover:to-amber-600 rounded text-white font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.4)] cursor-pointer">
                  Read Us
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MEET OUR TEAM */}
      <section className="relative py-24 px-4 bg-[#050b1a]">
        
        <div className="flex items-center justify-center w-full mb-16">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-500/50 max-w-xs"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white px-8 whitespace-nowrap drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">Meet Our Team</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-500/50 max-w-xs"></div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Shyam Dash", role: "Founder" },
            { name: "Binod Agrawalla", role: "Co-Founder" },
            { name: "Satyajit Panda", role: "Chief Architect" },
            { name: "Jyoti Dash", role: "Business Head" }
          ].map((member, idx) => (
            <div key={idx} className="relative group">
              {/* Golden border */}
              <div className="absolute -inset-[1px] bg-gradient-to-b from-amber-400/60 to-transparent rounded-xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-[#0a0f1c] rounded-xl flex flex-col overflow-hidden h-80">
                {/* Silhouette Placeholder */}
                <div className="flex-1 w-full bg-gradient-to-t from-slate-800 to-slate-900 relative">
                  <div className="absolute inset-x-0 bottom-0 h-48 flex items-end justify-center">
                    <Silhouette />
                  </div>
                </div>
                <div className="p-4 text-center bg-[#0a0f1c] border-t border-slate-800 relative z-10">
                  <h4 className="text-lg font-bold text-white">{member.name}</h4>
                  <p className="text-slate-400 text-sm font-medium">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-[#050b1a] to-[#02050f]">
        
        <div className="flex items-center justify-center w-full mb-12">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-500/50 max-w-xs"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-white px-6 whitespace-nowrap drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">Why Choose ShyamDash?</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-500/50 max-w-xs"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Horizontal Banner container */}
          <div className="relative p-[1px] bg-gradient-to-r from-transparent via-amber-500/70 to-transparent rounded-lg">
            <div className="bg-[#0a0f1c] rounded-lg py-8 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-800/50">
              
              <div className="flex flex-col md:flex-row items-center gap-4 px-4 text-center md:text-left">
                <Users className="w-10 h-10 text-amber-400" />
                <span className="text-white font-semibold">Experienced Professionals</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4 px-4 text-center md:text-left">
                <HeartHandshake className="w-10 h-10 text-amber-400" />
                <span className="text-white font-semibold">Client-Centric Approach</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4 px-4 text-center md:text-left">
                <Medallion />
                <span className="text-white font-semibold">Proven Results.</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4 px-4 text-center md:text-left">
                <Globe className="w-10 h-10 text-amber-400" />
                <span className="text-white font-semibold">Global Reach.</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER */}
      <section className="relative py-16 px-4 bg-[#02050f] overflow-hidden">
        {/* Bottom Curve */}
        <div className="absolute inset-x-0 top-0">
          <DownCurveDivider />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center mt-12">
          <h2 className="text-3xl font-bold text-white mb-8">Let's Connect & Grow Together</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="px-10 py-4 bg-gradient-to-b from-amber-400 to-amber-600 hover:to-amber-500 rounded text-amber-950 font-bold text-lg shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all hover:scale-105 w-full sm:w-auto">
              Contact Us
            </Link>
            <Link href="/jobs" className="px-10 py-4 bg-[#0a0f1c] hover:bg-slate-800 border border-slate-700 rounded text-white font-bold text-lg transition-all hover:scale-105 w-full sm:w-auto">
              Join Our Team
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

// Helper icon component for 'Proven Results'
const Medallion = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);
