"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";

interface Ticket {
  id: string;
  title: string;
  category: string;
  status: "Open" | "In-Progress" | "Resolved";
  date: string;
}

export default function ClientPortal() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "domains" | "support">("dashboard");
  
  // Domain availability checker state
  const [domainQuery, setDomainQuery] = useState("");
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [domainResult, setDomainResult] = useState<{ available: boolean; domain: string } | null>(null);

  // Support ticket state
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "TK-402", title: "DB Cache Revalidation Error", category: "Database", status: "Resolved", date: "2026-05-18" },
    { id: "TK-419", title: "Scale bandwidth for Gold Flash Sale", category: "Infrastructure", status: "In-Progress", date: "2026-05-20" }
  ]);
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketCategory, setNewTicketCategory] = useState("Infrastructure");

  // Handle support ticket creation
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;

    const newTicket: Ticket = {
      id: `TK-${Math.floor(100 + Math.random() * 900)}`,
      title: newTicketTitle,
      category: newTicketCategory,
      status: "Open",
      date: new Date().toISOString().split("T")[0]
    };

    setTickets([newTicket, ...tickets]);
    setNewTicketTitle("");
  };

  // Simulate Domain check
  const handleCheckDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainQuery.trim()) return;

    setIsCheckingDomain(true);
    setDomainResult(null);

    setTimeout(() => {
      setIsCheckingDomain(false);
      // Mocking: domains with 'taken' or 'admin' or 'gold' are not available
      const cleanQuery = domainQuery.toLowerCase().replace(/\s+/g, "");
      const isAvailable = !["taken", "admin", "gold", "bhulia", "auth", "shyamdash"].some(kw => cleanQuery.includes(kw));
      
      const domainName = cleanQuery.includes(".") ? cleanQuery : `${cleanQuery}.shyamdash.com`;
      setDomainResult({
        available: isAvailable,
        domain: domainName
      });
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#040916] text-[#e2e8f0] font-sans flex flex-col md:flex-row overflow-x-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#020610] border-b md:border-b-0 md:border-r border-slate-900 flex flex-col justify-between p-6 z-20">
        <div>
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 mb-10 group">
            <div className="w-9 h-9 rounded-xl bg-gold-gradient p-[1px]">
              <div className="w-full h-full bg-[#060c18] rounded-xl flex items-center justify-center">
                <Icons.Server className="w-4.5 h-4.5 text-[#e5c158]" />
              </div>
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white block">SD PORTAL</span>
              <span className="text-[9px] text-[#e5c158] tracking-wider uppercase block">Client Dashboard</span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "dashboard" 
                  ? "bg-gold-gradient text-slate-950 shadow-md" 
                  : "text-slate-400 hover:bg-slate-900/60 hover:text-white"
              }`}
            >
              <Icons.LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => setActiveTab("domains")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "domains" 
                  ? "bg-gold-gradient text-slate-950 shadow-md" 
                  : "text-slate-400 hover:bg-slate-900/60 hover:text-white"
              }`}
            >
              <Icons.Globe2 className="w-4 h-4" />
              <span>Domain Allocator</span>
            </button>
            <button 
              onClick={() => setActiveTab("support")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "support" 
                  ? "bg-gold-gradient text-slate-950 shadow-md" 
                  : "text-slate-400 hover:bg-slate-900/60 hover:text-white"
              }`}
            >
              <Icons.LifeBuoy className="w-4 h-4" />
              <span>Support Desk</span>
            </button>
          </nav>
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-slate-900/80 mt-6">
          <Link href="/" className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors">
            <Icons.ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Landing Page</span>
          </Link>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 flex flex-col min-w-0 z-10">
        
        {/* Header bar */}
        <header className="bg-[#020610]/40 border-b border-slate-900 py-4 px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Connected Node: Cuttack Central
            </span>
          </div>

          {/* User SSO info */}
          <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 py-1.5 px-3 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-[#e5c158]/10 text-[#e5c158] flex items-center justify-center font-bold text-[10px] border border-[#e5c158]/20">
              PD
            </div>
            <div className="text-left">
              <span className="text-[10px] text-white font-bold block leading-none">Priyabrata Dash</span>
              <span className="text-[8px] text-[#e5c158] uppercase font-bold block mt-0.5">Enterprise Member</span>
            </div>
          </div>
        </header>

        {/* Panel Main Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-float-fade">
              {/* Heading */}
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">IT Infrastructure Node</h1>
                <p className="text-slate-400 text-xs mt-1">Real-time status metrics of your active hosting, templates, and subdomains.</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Subdomain Nodes</span>
                    <Icons.Link2 className="w-4 h-4 text-[#e5c158]" />
                  </div>
                  <span className="text-2xl font-black text-white">3 Active</span>
                  <span className="text-[10px] text-emerald-400 block mt-1">● SSL Secured</span>
                </div>

                <div className="glass-panel p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Bandwidth Usage</span>
                    <Icons.Activity className="w-4 h-4 text-[#e5c158]" />
                  </div>
                  <span className="text-2xl font-black text-white">82.4 GB</span>
                  <span className="text-[10px] text-slate-400 block mt-1">of 100 GB limit</span>
                </div>

                <div className="glass-panel p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Avg SLA Response</span>
                    <Icons.Zap className="w-4 h-4 text-[#e5c158]" />
                  </div>
                  <span className="text-2xl font-black text-white">99.98%</span>
                  <span className="text-[10px] text-emerald-400 block mt-1">● Target Exceeded</span>
                </div>
              </div>

              {/* Active Deployments Table */}
              <div className="glass-panel rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-900/60 bg-slate-900/10">
                  <h3 className="font-bold text-white text-sm">Hosted Tenant Deployments</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950/20 text-slate-500 font-bold border-b border-slate-900">
                        <th className="p-4">App/Storefront</th>
                        <th className="p-4">Directus ID</th>
                        <th className="p-4">Domain Route</th>
                        <th className="p-4">SaaS Region</th>
                        <th className="p-4">Deployment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/50">
                      <tr>
                        <td className="p-4 font-bold text-white">Bhulia Weaver Directory</td>
                        <td className="p-4 text-slate-400 font-mono">ithub_bhulia_01</td>
                        <td className="p-4 text-[#e5c158] font-semibold">directory.bhulia.com</td>
                        <td className="p-4 text-slate-400">Asia-South (Mumbai)</td>
                        <td className="p-4"><span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[9px] uppercase">Active</span></td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-white">Gold Marketplace Front</td>
                        <td className="p-4 text-slate-400 font-mono">ithub_gold_02</td>
                        <td className="p-4 text-[#e5c158] font-semibold">shyamdash.com</td>
                        <td className="p-4 text-slate-400">US-East (Virginia)</td>
                        <td className="p-4"><span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[9px] uppercase">Active</span></td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-white">Central SSO Auth Gateway</td>
                        <td className="p-4 text-slate-400 font-mono">ithub_auth_sso</td>
                        <td className="p-4 text-[#e5c158] font-semibold">auth.shyamdash.com</td>
                        <td className="p-4 text-slate-400">Global Edge Nodes</td>
                        <td className="p-4"><span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[9px] uppercase">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOMAIN ALLOCATOR */}
          {activeTab === "domains" && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">Subdomain Allocator Terminal</h1>
                <p className="text-slate-400 text-xs mt-1">Reserve subfolders or subdomains in real time under the shyamdash.com ecosystem.</p>
              </div>

              {/* Form */}
              <div className="glass-panel p-8 rounded-2xl">
                <form onSubmit={handleCheckDomain} className="space-y-6">
                  <div className="max-w-xl">
                    <label className="text-xs text-slate-300 font-bold block mb-2">Configure Subdomain Route</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          required
                          value={domainQuery}
                          onChange={(e) => setDomainQuery(e.target.value)}
                          placeholder="e.g. sambalpur-weavers"
                          className="w-full p-3.5 bg-slate-950/60 border border-slate-800 focus:border-[#e5c158] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e5c158]"
                        />
                      </div>
                      <span className="flex items-center text-slate-400 text-xs font-bold px-4 bg-slate-900 rounded-xl border border-slate-800">
                        .shyamdash.com
                      </span>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isCheckingDomain}
                    className="px-6 py-3.5 bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-[0_0_15px_rgba(229,193,88,0.25)] flex items-center gap-2"
                  >
                    {isCheckingDomain ? (
                      <>
                        <Icons.Loader2 className="w-4 h-4 animate-spin" />
                        <span>Scanning DNS Registries...</span>
                      </>
                    ) : (
                      <>
                        <Icons.Search className="w-4 h-4" />
                        <span>Check DNS Availability</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Results UI */}
                {domainResult && (
                  <div className="mt-8 pt-8 border-t border-slate-900/60">
                    {domainResult.available ? (
                      <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-3">
                          <Icons.CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                          <div>
                            <h4 className="text-white font-bold text-sm">Domain Route is Available!</h4>
                            <p className="text-slate-400 text-xs mt-0.5">You can provision <span className="text-[#e5c158] font-bold font-mono">{domainResult.domain}</span> to a template catalog.</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            alert(`Provisioning route: ${domainResult.domain}...`);
                            setDomainResult(null);
                            setDomainQuery("");
                          }}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all"
                        >
                          Bind Domain
                        </button>
                      </div>
                    ) : (
                      <div className="p-6 rounded-xl bg-red-950/20 border border-red-500/30 flex gap-3">
                        <Icons.AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-bold text-sm">Route Node Already Allocated</h4>
                          <p className="text-slate-400 text-xs mt-0.5">The subdomain path <span className="text-red-400 font-bold font-mono">{domainResult.domain}</span> has already been reserved by another SaaS client. Please try a different name.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SUPPORT TICKETS */}
          {activeTab === "support" && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">Tech Support Desk</h1>
                <p className="text-slate-400 text-xs mt-1">Submit tickets directly to our systems administrators for cloud provisioning.</p>
              </div>

              {/* Grid split */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Form */}
                <div className="glass-panel p-6 rounded-2xl">
                  <h3 className="font-bold text-white text-sm mb-6">Open Support Ticket</h3>
                  <form onSubmit={handleCreateTicket} className="space-y-4">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Issue Headline</label>
                      <input 
                        type="text" 
                        required
                        value={newTicketTitle}
                        onChange={(e) => setNewTicketTitle(e.target.value)}
                        placeholder="e.g. Purge database cache manually"
                        className="w-full p-3.5 bg-slate-950/60 border border-slate-800 focus:border-[#e5c158] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e5c158]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Category</label>
                      <select 
                        value={newTicketCategory}
                        onChange={(e) => setNewTicketCategory(e.target.value)}
                        className="w-full p-3.5 bg-slate-950/60 border border-slate-800 focus:border-[#e5c158] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e5c158]"
                      >
                        <option value="Infrastructure">Infrastructure Scaling</option>
                        <option value="Database">Database Query Error</option>
                        <option value="DNS/SSL">DNS Redirect & SSL Certificate</option>
                        <option value="Security">Role Permissions (SSO)</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Icons.Plus className="w-4 h-4" />
                      <span>Transmit Ticket</span>
                    </button>
                  </form>
                </div>

                {/* Ticket List */}
                <div className="space-y-4">
                  <h3 className="font-bold text-white text-sm">Active Support Tickets</h3>
                  
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="glass-panel p-5 rounded-2xl flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 font-mono font-bold">{ticket.id}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[8px] uppercase tracking-wider font-bold">
                            {ticket.category}
                          </span>
                        </div>
                        <h4 className="text-white text-xs font-bold mt-2">{ticket.title}</h4>
                        <span className="text-[9px] text-slate-500 block mt-1">Created on {ticket.date}</span>
                      </div>

                      <div>
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[9px] uppercase ${
                          ticket.status === "Resolved" 
                            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" 
                            : ticket.status === "In-Progress"
                            ? "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                            : "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
