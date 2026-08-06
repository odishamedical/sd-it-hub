"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Icons from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 1. Parse SSO tokens if arriving from Auth Center
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const email = params.get("sso_email") || params.get("email");
      const name = params.get("sso_name") || params.get("name");
      const role = params.get("sso_role") || params.get("role");

      if (token && email && name) {
        localStorage.setItem("sd_current_user_email", email);
        localStorage.setItem("sd_current_user_name", name);
        if (role) {
          localStorage.setItem("sd_current_user_role", role);
        }
        
        // Clean URL to remove SSO params
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      // Check login status from localStorage
      const currentEmail = localStorage.getItem("sd_current_user_email");
      const currentRole = localStorage.getItem("sd_current_user_role");

      if (!currentEmail) {
        alert("Please log in to access the Admin Panel.");
        router.push("/");
      } else {
        // If it's the master admin, always allow. Otherwise check role.
        if (currentEmail === "odishamedical@gmail.com" || currentRole === "super_admin" || currentRole === "admin") {
          setIsAdmin(true);
        } else {
          alert("Access Denied: You do not have Admin privileges.");
          router.push("/portal");
        }
      }
    }
  }, [router]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Icons.Loader2 className="w-8 h-8 animate-spin text-sky-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-6">
        <Link href="/admin" className="flex items-center gap-3 mb-10 group">
          <div className="w-10 h-10 bg-indigo-500/10 rounded border border-indigo-500/20 flex items-center justify-center">
            <Icons.ShieldAlert className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-white block">SD CONTROL</span>
            <span className="text-[9px] text-indigo-400 tracking-wider uppercase block">Super Admin Center</span>
          </div>
        </Link>

        <nav className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pb-6 pr-2">
          
          {/* Main Dashboard */}
          <div>
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Icons.Activity className="w-4 h-4" />
              <span>Platform Overview</span>
            </Link>
          </div>

          {/* IT Hub Pillar */}
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 mb-3">Pillar 1: IT Hub</h3>
            <div className="space-y-1">
              <Link href="/admin/deployments" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
                <Icons.Server className="w-4 h-4" />
                <span>Tenant Deployments</span>
              </Link>
              <Link href="/admin/templates" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
                <Icons.Database className="w-4 h-4" />
                <span>SaaS Template Library</span>
              </Link>
              <Link href="/admin/domains" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
                <Icons.Globe className="w-4 h-4" />
                <span>Domain Registry</span>
              </Link>
              <Link href="/admin/services" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
                <Icons.Briefcase className="w-4 h-4" />
                <span>IT Services Manager</span>
              </Link>
            </div>
          </div>

          {/* Global Jobs Pillar */}
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 mb-3">Pillar 2: Global Jobs</h3>
            <div className="space-y-1">
              <Link href="/admin/job-scraper" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400">
                <Icons.Bot className="w-4 h-4" />
                <span>Job Aggregator AI</span>
              </Link>
              <Link href="#" className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
                <div className="flex items-center gap-3">
                  <Icons.UserCheck className="w-4 h-4" />
                  <span>Employer Approvals</span>
                </div>
                <span className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[8px] text-amber-950 font-black">3</span>
              </Link>
            </div>
          </div>

          {/* Directory Pillar */}
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 mb-3">Pillar 3: Directory</h3>
            <div className="space-y-1">
              <Link href="/admin/directory" className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
                <div className="flex items-center gap-3">
                  <Icons.MapPin className="w-4 h-4" />
                  <span>Directory Manager</span>
                </div>
                <span className="w-4 h-4 bg-fuchsia-500 rounded-full flex items-center justify-center text-[8px] text-white font-black">0</span>
              </Link>
              <Link href="#" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
                <Icons.ListTree className="w-4 h-4" />
                <span>Category Manager</span>
              </Link>
            </div>
          </div>

          {/* Content Hub */}
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 mb-3">Content Hub</h3>
            <div className="space-y-1">
              <Link href="/admin/blog" className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
                <div className="flex items-center gap-3">
                  <Icons.BookOpen className="w-4 h-4" />
                  <span>Blog Manager</span>
                </div>
              </Link>
            </div>
          </div>

          {/* CRM & Billing */}
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 mb-3">Ecosystem CRM</h3>
            <div className="space-y-1">
              <Link href="/admin/leads" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
                <Icons.Inbox className="w-4 h-4" />
                <span>Global Lead CRM</span>
              </Link>
              <Link href="/admin/partners" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
                <Icons.Users className="w-4 h-4" />
                <span>Partner Agencies</span>
              </Link>
              <Link href="#" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
                <Icons.CreditCard className="w-4 h-4" />
                <span>Subscriptions & Billing</span>
              </Link>
            </div>
          </div>

        </nav>

        <div className="pt-6 border-t border-slate-800 mt-6">
          <button onClick={() => router.push('/portal')} className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors">
            <Icons.ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch to Client View</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 min-w-0 flex flex-col relative z-10 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/95 z-0"></div>
        <div className="relative z-10 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
