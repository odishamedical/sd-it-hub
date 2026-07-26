"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Icons from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let currentRole = null;

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
          currentRole = role;
        }
        
        // Clean URL to remove SSO params
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        currentRole = localStorage.getItem("sd_current_user_role");
      }
    }

    // 2. Validate Super Admin
    if (currentRole !== "super_admin" && currentRole !== "admin") {
      alert("Access Denied: Super Admin privileges required.");
      router.push("/");
    } else {
      setIsAdmin(true);
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

        <nav className="space-y-2 flex-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
            <Icons.Activity className="w-4 h-4" />
            <span>Platform Overview</span>
          </Link>
          <Link href="/admin/leads" className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
            <div className="flex items-center gap-3">
              <Icons.Inbox className="w-4 h-4" />
              <span>Lead CRM</span>
            </div>
          </Link>
          <Link href="/admin/services" className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
            <div className="flex items-center gap-3">
              <Icons.Briefcase className="w-4 h-4" />
              <span>Services Manager</span>
            </div>
          </Link>
          <Link href="/admin/partners" className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
            <div className="flex items-center gap-3">
              <Icons.Users className="w-4 h-4" />
              <span>Partner Agencies</span>
            </div>
          </Link>
          <Link href="/admin/deployments" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
            <Icons.Server className="w-4 h-4" />
            <span>Tenant Deployments</span>
          </Link>
          <Link href="/admin/templates" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-slate-400 hover:bg-slate-800 hover:text-white">
            <Icons.Database className="w-4 h-4" />
            <span>SaaS Template Library</span>
          </Link>
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
