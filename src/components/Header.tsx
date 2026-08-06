"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("User");
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
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
        
        setUserEmail(email);
        setUserName(name);
        setUserRole(role || "user");
      } else {
        // Fallback to local storage if already logged in
        const localEmail = localStorage.getItem("sd_current_user_email");
        if (localEmail) {
          setUserEmail(localEmail);
          setUserName(localStorage.getItem("sd_current_user_name") || "User");
          setUserRole(localStorage.getItem("sd_current_user_role") || "user");
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sd_current_user_email");
    localStorage.removeItem("sd_current_user_name");
    localStorage.removeItem("sd_current_user_role");
    setUserEmail(null);
    setUserName("User");
    setUserRole(null);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[200] bg-[#050B1B]/80 backdrop-blur-md border-b border-slate-900">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-purple-950/20 rounded-xl border border-purple-500/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Icons.Box className="w-6 h-6 text-purple-450" />
            </div>
            <span className="text-xl font-bold tracking-wider text-white font-serif">
              Shyam<span className="text-purple-400">Dash</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-mono font-bold text-slate-300">
            <Link href="/it-services" className="hover:text-cyan-400 transition-colors">IT Services</Link>
            <Link href="/jobs" className="hover:text-purple-400 transition-colors">Global Jobs</Link>
            <Link href="/directory" className="hover:text-purple-400 transition-colors">Directory</Link>
            <Link href="/blog" className="text-indigo-400 hover:text-indigo-300 transition-colors">Blog</Link>
            <Link href="/partner" className="text-purple-400 font-bold flex items-center gap-1 hover:text-purple-300 transition-colors">
              <Icons.BadgeCheck className="w-4 h-4" /> Partner
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {userEmail ? (
              <>
                <Link href={(userRole === "super_admin" || userRole === "admin" || userEmail === "odishamedical@gmail.com") ? "/admin" : "/portal"} className="flex items-center gap-2 px-4 py-2 bg-slate-950/40 border border-slate-900 hover:border-purple-550/50 rounded-xl transition-colors">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-[10px]">
                    {userName.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white">{userName}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-xs font-mono font-bold text-slate-400 hover:text-red-400 transition-colors uppercase tracking-wider"
                >
                  Sign Out
                </button>
                <Link href={(userRole === "super_admin" || userRole === "admin" || userEmail === "odishamedical@gmail.com") ? "/admin" : "/portal"} className="px-5 py-2.5 bg-purple-600 hover:bg-[#8b5cf6] text-white text-sm font-semibold rounded-xl transition-colors shadow-lg ml-2 shadow-purple-950/20">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <button onClick={() => window.location.href = `https://sd-auth-center.vercel.app?redirect_uri=${encodeURIComponent(window.location.origin + '/portal')}`} className="text-xs uppercase tracking-wider font-mono font-bold text-white hover:text-purple-400 transition-colors">Login</button>
                <Link href="/portal" className="px-5 py-2.5 bg-[#a855f7] hover:bg-[#8b5cf6] text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-purple-950/20">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-[#050B1B] border-b border-slate-900 flex flex-col p-4 space-y-4 shadow-xl">
            <Link href="/it-services" className="text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>IT Services</Link>
            <Link href="/jobs" className="text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Global Jobs</Link>
            <Link href="/directory" className="text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Directory</Link>
            <Link href="/blog" className="text-indigo-400 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
            <Link href="/partner" className="text-purple-400 font-bold flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}><Icons.BadgeCheck className="w-5 h-5" /> Partner Program</Link>
            <div className="h-px bg-slate-900 w-full my-2"></div>
            {userEmail ? (
              <>
                <Link href={(userRole === "super_admin" || userRole === "admin" || userEmail === "odishamedical@gmail.com") ? "/admin" : "/portal"} className="text-center py-3 bg-purple-600 text-white font-bold rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Go to Dashboard</Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-center py-3 border border-slate-800 text-red-400 font-bold rounded-lg">Sign Out</button>
              </>
            ) : (
              <>
                <button onClick={() => { setIsMobileMenuOpen(false); window.location.href = `https://sd-auth-center.vercel.app?redirect_uri=${encodeURIComponent(window.location.origin + '/portal')}`; }} className="text-white font-medium text-left">Login</button>
                <Link href="/portal" className="text-center py-3 bg-[#a855f7] text-white font-bold rounded-lg">Get Started</Link>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}
