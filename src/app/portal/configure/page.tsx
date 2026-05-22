"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db, collection, addDoc, serverTimestamp } from "@/utils/firebase";
import * as Icons from "lucide-react";

function ConfigureSiteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateName = searchParams.get("template") || "Custom Site";
  
  const [businessName, setBusinessName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [themeColor, setThemeColor] = useState("#0ea5e9");
  const [isDeploying, setIsDeploying] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("sd_current_user_email");
    if (!email) {
      router.push("/");
    } else {
      setUserEmail(email);
    }
  }, [router]);

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);

    try {
      await addDoc(collection(db, "tenant_deployments"), {
        ownerEmail: userEmail,
        templateName: templateName,
        siteName: businessName || templateName,
        logoUrl: logoUrl,
        themeColor: themeColor,
        status: "Live",
        createdAt: serverTimestamp()
      });
      
      // Artificial delay for UI effect
      setTimeout(() => {
        alert("Deployment Successful! Your new website is now live.");
        router.push("/portal");
      }, 3000);
    } catch (e) {
      console.error("Deploy failed", e);
      alert("Failed to deploy site. Please contact support.");
      setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001529] pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sky-400 mb-2 font-semibold">
            <Icons.Settings className="w-5 h-5" />
            <span>Deployment Configurator</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Build Your {templateName}</h1>
          <p className="text-slate-400">Configure your brand identity before we provision the final node.</p>
        </div>

        <form onSubmit={handleDeploy} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            
            {/* Site Name */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Business / Website Name</label>
              <input 
                required
                type="text" 
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors"
                placeholder="e.g. My Awesome Startup"
              />
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Logo Image URL</label>
              <input 
                type="url" 
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors"
                placeholder="https://..."
              />
              {logoUrl && (
                <div className="mt-4 p-4 border border-slate-800 rounded-lg inline-block bg-white">
                  <img src={logoUrl} alt="Logo Preview" className="h-12 object-contain" onError={(e) => e.currentTarget.style.display='none'} />
                </div>
              )}
            </div>

            {/* Theme Color */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Primary Brand Color</label>
              <div className="flex items-center gap-4">
                <input 
                  type="color" 
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-14 h-14 rounded cursor-pointer bg-transparent border-0"
                />
                <div className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-300 font-mono">
                  {themeColor}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800">
              <button 
                type="submit" 
                disabled={isDeploying}
                className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isDeploying ? (
                  <>
                    <Icons.Loader2 className="w-6 h-6 animate-spin" />
                    Provisioning Node & Deploying...
                  </>
                ) : (
                  <>
                    <Icons.Rocket className="w-6 h-6" />
                    Deploy to Production
                  </>
                )}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default function ConfigureSitePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#001529]"><Icons.Loader2 className="w-8 h-8 animate-spin text-sky-500" /></div>}>
      <ConfigureSiteForm />
    </Suspense>
  );
}
