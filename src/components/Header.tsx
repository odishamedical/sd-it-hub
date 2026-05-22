"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("User");

  useEffect(() => {
    const email = localStorage.getItem("sd_current_user_email");
    if (email) {
      setUserEmail(email);
      setUserName(localStorage.getItem("sd_current_user_name") || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sd_current_user_email");
    localStorage.removeItem("sd_current_user_name");
    localStorage.removeItem("sd_current_user_role");
    setUserEmail(null);
    setUserName("User");
  };

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-[200] bg-[#001529]/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded border border-white/20 flex items-center justify-center">
              <Icons.Box className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wider text-white uppercase">IT HUB</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-200">
            <Link href="/#domains" className="hover:text-sky-400 transition-colors">Domains</Link>
            <Link href="/templates" className="hover:text-sky-400 transition-colors">Templates</Link>
            <Link href="/#services" className="hover:text-sky-400 transition-colors">Services</Link>
            <Link href="/#about" className="hover:text-sky-400 transition-colors">About</Link>
            <Link href="/#contact" className="hover:text-sky-400 transition-colors">Contact</Link>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {userEmail ? (
              <>
                <Link href="/portal" className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 hover:border-sky-500/50 rounded-lg transition-colors">
                  <div className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-[10px]">
                    {userName.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white">{userName}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-xs font-bold text-slate-400 hover:text-red-400 transition-colors uppercase tracking-wider"
                >
                  Sign Out
                </button>
                <Link href="/portal" className="px-5 py-2.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-sm font-semibold rounded transition-colors shadow-lg ml-2">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="https://sd-auth-center.vercel.app?redirect_uri=https://sd-it-hub-w3sk.vercel.app/portal" className="text-sm font-medium text-white hover:text-sky-400">Login</Link>
                <Link href="/portal" className="px-5 py-2.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-sm font-semibold rounded transition-colors shadow-lg">
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
          <div className="lg:hidden absolute top-20 left-0 w-full bg-[#001529] border-b border-white/10 flex flex-col p-4 space-y-4 shadow-xl">
            <Link href="/#domains" className="text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Domains</Link>
            <Link href="/templates" className="text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Templates</Link>
            <Link href="/#services" className="text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
            <div className="h-px bg-white/10 w-full my-2"></div>
            {userEmail ? (
              <>
                <Link href="/portal" className="text-center py-3 bg-[#0ea5e9] text-white font-bold rounded" onClick={() => setIsMobileMenuOpen(false)}>Go to Dashboard</Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-center py-3 border border-slate-700 text-red-400 font-bold rounded">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="https://sd-auth-center.vercel.app?redirect_uri=https://sd-it-hub-w3sk.vercel.app/portal" className="text-white font-medium">Login</Link>
                <Link href="/portal" className="text-center py-3 bg-[#0ea5e9] text-white font-bold rounded">Get Started</Link>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}
