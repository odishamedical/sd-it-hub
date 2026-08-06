"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  // Mock data for tickets matching the mockup
  const tickets = {
    itIncidents: {
      activeCases: 1402,
      networkStatus: "99.8% Uptime",
      resolvedTickets: 1
    },
    jobTrends: {
      newOpenings: "+781",
      topRoles: "AI Dev, Cloud Eng.",
      applicationsProcessed: "4,510"
    },
    businessHub: {
      verifiedCompanies: "15,200+",
      activeConnections: "67k",
      leadsGenerated: "1.2M+"
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050B1B] text-[#e2e8f0] font-sans overflow-x-hidden pb-20">
      <Header />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 flex flex-col items-center justify-center text-center px-4 z-10">
        
        {/* Background Space Effect */}
        <div className="absolute inset-0 z-0">
          <Image src="/stock/bento-domain-bg.png" alt="Space Background" fill className="object-cover opacity-30 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050B1B]/80 to-[#050B1B] z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-black text-white mb-6 tracking-tight leading-[1.1] drop-shadow-2xl">
            UNLEASH THE NEXT GENERATION <br className="hidden md:block" />
            GLOBAL SUPER-APP ECOSYSTEM
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light mb-16 max-w-3xl">
            Seamlessly integrate IT Solutions, find Elite Talent, and connect with Businesses Worldwide.
          </p>

          {/* 3 Pillar Gateway Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-12">
            
            {/* Pillar 1: IT Services */}
            <Link href="/#it-services" className="group relative overflow-hidden rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 p-10 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Icons.Network className="w-16 h-16 text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide uppercase">IT Services</h3>
              <p className="text-slate-400 text-sm">Build. Scale. Secure.</p>
            </Link>

            {/* Pillar 2: Global Jobs */}
            <Link href="/jobs" className="group relative overflow-hidden rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 p-10 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Icons.Globe2 className="w-16 h-16 text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide uppercase">Global Jobs</h3>
              <p className="text-slate-400 text-sm">Hire & Discover Talent.</p>
            </Link>

            {/* Pillar 3: Business Directory */}
            <Link href="/directory" className="group relative overflow-hidden rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 p-10 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Icons.Building2 className="w-16 h-16 text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide uppercase">Business Directory</h3>
              <p className="text-slate-400 text-sm">Find. Network. Grow.</p>
            </Link>

          </div>

          {/* Dynamic Tickets Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            
            {/* Ticket 1 */}
            <div className="bg-[#0c1226]/80 backdrop-blur-md rounded-2xl border border-purple-500/30 p-6 shadow-lg shadow-purple-900/20 text-left hover:border-purple-500/60 transition-colors">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-4 border-b border-purple-500/20">Live IT Incidents</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">active cases</span>
                  <span className="text-sky-400 font-mono font-bold text-lg">{tickets.itIncidents.activeCases.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Network status</span>
                  <span className="text-sky-400 font-mono font-bold text-lg">{tickets.itIncidents.networkStatus}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Resolved tickets</span>
                  <span className="text-sky-400 font-mono font-bold text-lg">{tickets.itIncidents.resolvedTickets}</span>
                </div>
              </div>
            </div>

            {/* Ticket 2 */}
            <div className="bg-[#0c1226]/80 backdrop-blur-md rounded-2xl border border-purple-500/30 p-6 shadow-lg shadow-purple-900/20 text-left hover:border-purple-500/60 transition-colors">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-4 border-b border-purple-500/20">Global Job Trends</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">New Openings (24h):</span>
                  <span className="text-white font-mono font-bold text-lg">{tickets.jobTrends.newOpenings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Top Roles:</span>
                  <span className="text-indigo-300 font-bold text-sm bg-indigo-900/30 px-2 py-1 rounded">{tickets.jobTrends.topRoles}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Applications Processed:</span>
                  <span className="text-white font-mono font-bold text-lg">{tickets.jobTrends.applicationsProcessed}</span>
                </div>
              </div>
            </div>

            {/* Ticket 3 */}
            <div className="bg-[#0c1226]/80 backdrop-blur-md rounded-2xl border border-purple-500/30 p-6 shadow-lg shadow-purple-900/20 text-left hover:border-purple-500/60 transition-colors">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-4 border-b border-purple-500/20">Business Hub Activity</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Verified Companies:</span>
                  <span className="text-white font-mono font-bold text-lg">{tickets.businessHub.verifiedCompanies}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Active Connections:</span>
                  <span className="text-white font-mono font-bold text-lg">{tickets.businessHub.activeConnections}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Leads Generated:</span>
                  <span className="text-emerald-400 font-mono font-bold text-lg">{tickets.businessHub.leadsGenerated}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
