"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [searchCategory, setSearchCategory] = useState("all");

  return (
    <main className="relative min-h-screen bg-[#02050f] text-[#e2e8f0] font-sans overflow-x-hidden">
      {/* Global Abstract Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image 
          src="/stock/bg.png" 
          alt="Abstract Background" 
          fill 
          className="object-cover opacity-40 mix-blend-screen"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02050f]/80 via-[#02050f]/60 to-[#02050f]/95" />
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 px-4 z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1] drop-shadow-2xl">
            One Hub for All Your Digital Needs
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light mb-8 max-w-2xl drop-shadow-lg">
            Empower Your Business & Career with ShyamDash IT Hub
          </p>

          {/* Search Bar */}
          <div className="flex w-full max-w-xl bg-white rounded-lg overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.2)] mb-8">
            <div className="flex items-center pl-4 bg-gray-100 text-gray-500">
              <Icons.Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search for services, jobs, or businesses..." 
              className="flex-1 px-4 py-4 outline-none text-slate-800 placeholder-slate-400 bg-white"
            />
            <div className="bg-amber-500 flex items-center justify-center px-4 cursor-pointer hover:bg-amber-600 transition-colors">
              <Icons.ChevronDown className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Triple CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/jobs" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-blue-700 to-blue-950 hover:to-blue-900 border border-blue-500/50 rounded shadow-[0_0_15px_rgba(37,99,235,0.4)] text-white font-medium transition-all">
              <Icons.Briefcase className="w-4 h-4 text-blue-300" />
              Explore Jobs
            </Link>
            <Link href="/directory" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-orange-600 to-orange-950 hover:to-orange-900 border border-orange-500/50 rounded shadow-[0_0_15px_rgba(234,88,12,0.4)] text-white font-medium transition-all">
              <Icons.Building2 className="w-4 h-4 text-orange-300" />
              View Listings
            </Link>
            <Link href="/portal" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-amber-500 to-amber-800 hover:to-amber-700 border border-amber-400/50 rounded shadow-[0_0_15px_rgba(245,158,11,0.4)] text-white font-medium transition-all">
              <Icons.MonitorPlay className="w-4 h-4 text-amber-200" />
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Hero Image (Masked) */}
        <div className="w-full lg:w-1/2 relative h-[300px] lg:h-[450px]">
          {/* Fading Masks */}
          <div className="absolute inset-0 left-0 bg-gradient-to-r from-[#02050f] via-transparent to-transparent z-10 w-1/3" />
          <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-[#02050f] via-transparent to-transparent z-10 h-1/4" />
          <Image 
            src="/stock/hero.png" 
            alt="Professionals Collaborating" 
            fill 
            className="object-cover object-right rounded-2xl lg:rounded-l-none lg:rounded-r-2xl"
          />
        </div>
      </section>

      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 pb-24 space-y-16">
        
        {/* Hub Categories (3 Cards) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HubCard 
            title="Find Your Dream Job" 
            subtitle="Browse top job opportunities" 
            btnText="Browse Jobs" 
            btnColor="blue"
            href="/jobs"
          />
          <HubCard 
            title="Discover Local Businesses" 
            subtitle="Explore & claim business listings" 
            btnText="View Directory" 
            btnColor="orange"
            href="/directory"
          />
          <HubCard 
            title="IT & Digital Solutions" 
            subtitle="Web, Apps & Marketing Services" 
            btnText="Our Services" 
            btnColor="amber"
            href="/services"
          />
        </section>

        {/* Section Divider */}
        <div className="flex items-center justify-center py-4">
          <div className="h-px bg-slate-600 flex-1"></div>
          <h2 className="px-6 text-xl font-bold text-slate-200 tracking-wide uppercase">Our Core Services</h2>
          <div className="h-px bg-slate-600 flex-1"></div>
        </div>

        {/* Core Services (3 Cards) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard 
            icon={<Icons.MonitorSmartphone className="w-8 h-8 text-blue-400" />}
            title="Web & App Development" 
            subtitle="Modern Websites & Mobile Apps" 
            btnText="Learn More"
          />
          <ServiceCard 
            icon={<Icons.PieChart className="w-8 h-8 text-orange-400" />}
            title="Digital Marketing" 
            subtitle="SEO, PPC & Social Media" 
            btnText="View Details"
          />
          <ServiceCard 
            icon={<Icons.ShieldCheck className="w-8 h-8 text-amber-400" />}
            title="IT Solutions & Support" 
            subtitle="Cloud & IT Management" 
            btnText="Get Support"
          />
        </section>

        {/* Section Divider */}
        <div className="flex items-center justify-center py-4">
          <div className="h-px bg-slate-600 flex-1"></div>
          <h2 className="px-6 text-xl font-bold text-slate-200 tracking-wide uppercase">Featured Listings</h2>
          <div className="h-px bg-slate-600 flex-1"></div>
        </div>

        {/* Featured Listings */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Job Listing */}
          <div className="bg-gradient-to-b from-[#1a2235] to-[#0a0f1c] rounded-xl border border-slate-700/50 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-amber-500/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center shrink-0">
                  <Icons.Award className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Software Engineer</h3>
                  <p className="text-slate-400 text-sm">Google | San Francisco, CA</p>
                </div>
              </div>
              <p className="text-amber-400 font-semibold mb-6 text-lg">$100k - $130k / Year</p>
            </div>
            <button className="w-full py-2 bg-gradient-to-b from-amber-500 to-amber-700 hover:to-amber-600 rounded text-white font-medium border border-amber-500/30">Learn More</button>
          </div>

          {/* Business Listing */}
          <div className="bg-gradient-to-b from-[#1a2235] to-[#0a0f1c] rounded-xl border border-slate-700/50 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-orange-500/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-400"></div>
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center shrink-0">
                  <Icons.Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Cafe Delight</h3>
                  <p className="text-slate-400 text-sm">Popular Coffee Spot</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-semibold mb-6">
                <span>4.8</span>
                <Icons.Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm text-slate-400 font-normal border-l border-slate-600 pl-2 ml-2">Top Rated</span>
              </div>
            </div>
            <button className="w-full py-2 bg-gradient-to-b from-orange-600 to-orange-800 hover:to-orange-700 rounded text-white font-medium border border-orange-500/30">View Details</button>
          </div>

          {/* Project Listing */}
          <div className="bg-gradient-to-b from-[#1a2235] to-[#0a0f1c] rounded-xl border border-slate-700/50 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-amber-500/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center shrink-0">
                  <Icons.Layers className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">FICGOcerice Website</h3>
                  <p className="text-slate-400 text-sm">Online Store</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-6 line-clamp-2">Complete end-to-end e-commerce solution with inventory management.</p>
            </div>
            <button className="w-full py-2 bg-gradient-to-b from-amber-500 to-amber-700 hover:to-amber-600 rounded text-white font-medium border border-amber-500/30">Read More</button>
          </div>
        </section>

        {/* View All Button */}
        <div className="flex justify-center mt-6">
          <button className="px-8 py-3 bg-[#0f1629] hover:bg-[#1a2235] border border-slate-700 rounded text-white transition-colors font-medium text-lg">
            View All Listings
          </button>
        </div>

        {/* Trust Banner */}
        <section className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-2xl p-8 my-12 text-slate-800 shadow-xl relative overflow-hidden border border-slate-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-slate-300 relative z-10">
            
            <div className="px-6 pt-4 md:pt-0">
              <h3 className="text-xl font-bold mb-4 text-slate-900">Why Choose ShyamDash?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="bg-amber-400 p-1 rounded-sm"><Icons.Check className="w-3 h-3 text-white" /></div>
                  <span className="font-medium text-slate-700">Trusted by Thousands</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="bg-amber-400 p-1 rounded-sm"><Icons.ThumbsUp className="w-3 h-3 text-white" /></div>
                  <span className="font-medium text-slate-700">Expert IT Team</span>
                </li>
              </ul>
            </div>

            <div className="px-6 pt-4 md:pt-0">
              <h3 className="text-xl font-bold mb-4 text-slate-900 text-center md:text-left">Expert IT Team</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="text-amber-500"><Icons.Mail className="w-5 h-5" /></div>
                  <span className="font-medium text-slate-700">Managed Servers</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="text-blue-600"><Icons.Shield className="w-5 h-5" /></div>
                  <span className="font-medium text-slate-700">Secure Support</span>
                </li>
              </ul>
            </div>

            <div className="px-6 pt-4 md:pt-0">
              <h3 className="text-xl font-bold mb-4 text-slate-900 text-center md:text-left flex justify-center md:justify-start items-center gap-2">
                <span className="bg-[#0f1629] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-md">1</span>
                24/7 Support
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="text-amber-500"><Icons.Trophy className="w-5 h-5" /></div>
                  <span className="font-medium text-slate-700">Proven Results</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="text-amber-500"><Icons.LineChart className="w-5 h-5" /></div>
                  <span className="font-medium text-slate-700">Premium Consulting</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* Section Divider */}
        <div className="flex items-center justify-center py-4">
          <div className="h-px bg-slate-600 flex-1"></div>
          <h2 className="px-6 text-xl font-bold text-slate-200 tracking-wide uppercase">Success Stories & Insights</h2>
          <div className="h-px bg-slate-600 flex-1"></div>
        </div>

        {/* Success Stories */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Story 1 */}
          <div className="bg-slate-100 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b-4 border-amber-500 shadow-xl group hover:shadow-2xl transition-all">
            <div className="w-full sm:w-1/3 aspect-video sm:aspect-square relative rounded-lg overflow-hidden shrink-0 bg-slate-200 border border-slate-300">
              <Image src="/stock/job.png" alt="Interview Tips" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex-1 flex flex-col justify-between h-full w-full py-2">
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1 leading-tight">Ace Your Job Interview: Top Tips</h3>
                <p className="text-slate-600 text-sm font-medium">Career Tips</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-1.5 bg-gradient-to-b from-amber-400 to-amber-600 text-white rounded text-sm font-bold shadow-md hover:to-amber-500 transition-colors">
                  READ MORE
                </button>
              </div>
            </div>
          </div>

          {/* Story 2 */}
          <div className="bg-slate-100 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b-4 border-amber-500 shadow-xl group hover:shadow-2xl transition-all">
            <div className="w-full sm:w-1/3 aspect-video sm:aspect-square relative rounded-lg overflow-hidden shrink-0 bg-slate-200 border border-slate-300">
              <Image src="/stock/directory.png" alt="Cafe Business" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex-1 flex flex-col justify-between h-full w-full py-2">
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1 leading-tight">Local Business Success:</h3>
                <p className="text-slate-700 text-sm font-medium">How We Helped Cafe Delight Grow</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-1.5 bg-gradient-to-b from-amber-400 to-amber-600 text-white rounded text-sm font-bold shadow-md hover:to-amber-500 transition-colors">
                  CASE STUDY
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Trust Footer Highlights */}
      <div className="bg-[#0b101d] border-t border-slate-800 py-4 z-20 relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-medium text-slate-400">
            <div className="flex items-center gap-2">
              <Icons.Search className="w-4 h-4 text-amber-500" />
              SEO Optimized
            </div>
            <div className="flex items-center gap-2">
              <Icons.ShieldCheck className="w-4 h-4 text-amber-500" />
              Secure Reliable
            </div>
            <div className="flex items-center gap-2">
              <Icons.HeartHandshake className="w-4 h-4 text-amber-500" />
              Dedicated Support
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Icons.Globe className="w-4 h-4 hover:text-white cursor-pointer" />
            <Icons.Mail className="w-4 h-4 hover:text-white cursor-pointer" />
            <Icons.Phone className="w-4 h-4 hover:text-white cursor-pointer" />
            <Icons.MessageCircle className="w-4 h-4 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

// Reusable Components

function HubCard({ title, subtitle, btnText, btnColor, href }: { title: string, subtitle: string, btnText: string, btnColor: 'blue'|'orange'|'amber', href: string }) {
  const colorMap = {
    blue: 'from-blue-700 to-blue-950 border-blue-500/50 hover:border-blue-400 shadow-[0_4px_20px_rgba(37,99,235,0.2)]',
    orange: 'from-orange-600 to-orange-950 border-orange-500/50 hover:border-orange-400 shadow-[0_4px_20px_rgba(234,88,12,0.2)]',
    amber: 'from-amber-500 to-amber-900 border-amber-500/50 hover:border-amber-400 shadow-[0_4px_20px_rgba(245,158,11,0.2)]'
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white via-slate-100 to-slate-900 rounded-xl overflow-hidden shadow-2xl relative group border border-slate-700/50 hover:border-slate-500 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-0"></div>
      
      {/* Top Light Section */}
      <div className="p-8 text-center relative z-10 flex-1 flex flex-col justify-center items-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight drop-shadow-sm">{title}</h3>
        <p className="text-slate-700 text-sm font-medium">{subtitle}</p>
      </div>
      
      {/* Bottom Dark Section */}
      <div className="p-6 relative z-10 bg-gradient-to-t from-black/80 to-transparent flex justify-center pb-8 pt-12">
        <Link href={href} className={`w-3/4 py-3 text-center rounded bg-gradient-to-b text-white font-medium border transition-all hover:scale-105 ${colorMap[btnColor]}`}>
          {btnText}
        </Link>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, subtitle, btnText }: { icon: React.ReactNode, title: string, subtitle: string, btnText: string }) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white via-slate-200 to-slate-900 rounded-xl overflow-hidden shadow-2xl relative group border border-slate-700/50 hover:border-slate-500 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a1122]/90 z-0"></div>
      
      {/* Top Light Section */}
      <div className="p-6 text-center relative z-10 flex-1 flex flex-col justify-center items-center pt-8">
        <div className="mb-4 drop-shadow-md">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{title}</h3>
        <p className="text-slate-700 text-sm font-medium">{subtitle}</p>
      </div>
      
      {/* Bottom Dark Section */}
      <div className="p-4 relative z-10 bg-gradient-to-t from-[#0a1122] to-transparent flex justify-center pb-6">
        <button className="w-full py-2 rounded bg-gradient-to-b from-[#1a2235] to-[#0f1629] border border-slate-600 hover:border-slate-400 text-slate-200 font-medium transition-all text-sm shadow-lg">
          {btnText}
        </button>
      </div>
    </div>
  );
}
