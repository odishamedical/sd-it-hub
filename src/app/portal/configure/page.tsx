"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db, collection, addDoc, serverTimestamp } from "@/utils/firebase";
import * as Icons from "lucide-react";

function ConfigureSiteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateName = searchParams.get("template") || "Custom Site";
  
  const [userEmail, setUserEmail] = useState("");
  const [userDomains, setUserDomains] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [hubId, setHubId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [tagline, setTagline] = useState("");
  const [themeColor, setThemeColor] = useState("#0ea5e9");
  const [isDeploying, setIsDeploying] = useState(false);
  const [isLoadingDomains, setIsLoadingDomains] = useState(true);

  // Determine Industry from template prefix
  const isGold = templateName.startsWith("gld-");
  const isHandloom = templateName.startsWith("sar-");
  const isHealth = templateName.startsWith("hlt-");
  
  const hubName = isGold ? "Gold Dunia" : isHandloom ? "Bhulia Hub" : isHealth ? "Dehapa Hub" : "Master Hub";
  const idLabel = isGold ? "Shop ID" : isHandloom ? "Weaver ID" : isHealth ? "Clinic ID" : "Entity ID";

  useEffect(() => {
    const email = localStorage.getItem("sd_current_user_email");
    if (!email) {
      router.push("/");
    } else {
      setUserEmail(email);
      // Fetch user's booked domains from tenant_deployments
      import("@/utils/firebase").then(({ getDocs, query, collection, where, db }) => {
        const q = query(collection(db, "tenant_deployments"), where("ownerEmail", "==", email));
        getDocs(q).then((snapshot) => {
          const domains = snapshot.docs.map(doc => doc.data().siteName);
          setUserDomains(domains);
          if (domains.length > 0) setSelectedDomain(domains[0]);
          setIsLoadingDomains(false);
        }).catch((err) => {
          console.error("Failed to fetch domains", err);
          setIsLoadingDomains(false);
        });
      });
    }
  }, [router]);

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDomain || !hubId) {
      alert("Please select a domain and provide your " + idLabel);
      return;
    }
    setIsDeploying(true);

    try {
      const { setDoc, doc, db, serverTimestamp } = await import("@/utils/firebase");
      
      // Write the master routing doc to deployments collection
      await setDoc(doc(db, "deployments", selectedDomain), {
        domain: selectedDomain,
        ownerEmail: userEmail,
        templateId: templateName,
        hubId: hubId,
        shopName: businessName,
        tagline: tagline,
        themeColor: themeColor,
        status: "ACTIVE",
        deployedAt: serverTimestamp()
      });
      
      // Artificial delay for UI effect
      setTimeout(() => {
        alert(`Deployment Successful! Your template is now mapped to ${selectedDomain}.`);
        router.push("/portal");
      }, 3000);
    } catch (e) {
      console.error("Deploy failed", e);
      alert("Failed to deploy site. Please contact support.");
      setIsDeploying(false);
    }
  };

  if (isLoadingDomains) {
    return <div className="min-h-screen bg-[#001529] flex items-center justify-center"><Icons.Loader2 className="w-8 h-8 animate-spin text-sky-500" /></div>;
  }

  return (
    <div className="min-h-screen bg-[#001529] pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sky-400 mb-3 font-semibold uppercase tracking-widest text-sm">
            <Icons.Settings className="w-5 h-5" />
            <span>Universal Deployment Configurator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Build Your Site</h1>
          <p className="text-slate-400 text-lg">Map your {hubName} data to your custom domain.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">

        {userDomains.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
            <Icons.Globe2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No Domains Found</h2>
            <p className="text-slate-400 mb-6">Templates are exclusively bundled with domains. You must claim a subdomain or custom URL in your dashboard first.</p>
            <button onClick={() => router.push("/portal#domains")} className="px-6 py-3 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-400 transition-colors">
              Go to Domain Allocator
            </button>
          </div>
        ) : (
          <form onSubmit={handleDeploy} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <div className="space-y-6">
              
              {/* Target Domain */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Target Domain</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.Globe2 className="h-5 w-5 text-slate-500" />
                  </div>
                  <select 
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500 appearance-none"
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                  >
                    {userDomains.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Data Source */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-xl">
                <h3 className="font-bold text-emerald-400 flex items-center gap-2 mb-4">
                  <Icons.Database className="w-4 h-4" /> Connect Data Source ({hubName})
                </h3>
                <label className="block text-sm font-bold text-slate-300 mb-2">Your {idLabel}</label>
                <input 
                  required
                  type="text"
                  placeholder={`e.g. ${isGold ? 'SHOP' : isHandloom ? 'WEAV' : 'CLIN'}-8F392A`}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  value={hubId}
                  onChange={(e) => setHubId(e.target.value)}
                />
                <p className="text-xs text-slate-400 mt-2">
                  This uniquely identifies you in the Master Database. The template will dynamically pull your live inventory and contact details automatically.
                </p>
              </div>

              {/* Branding */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Brand Display Name</label>
                  <input 
                    required
                    type="text" 
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors"
                    placeholder="e.g. My Awesome Startup"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Hero Tagline</label>
                  <input 
                    type="text" 
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors"
                    placeholder="e.g. Quality you can trust."
                  />
                </div>
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
          )}
          </div>
          
          {/* Visual Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl sticky top-28">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Icons.LayoutTemplate className="w-5 h-5 text-sky-400" /> Selected Template
              </h3>
              <div className="aspect-[4/3] bg-slate-800 rounded-xl mb-4 overflow-hidden relative border border-slate-700">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
                <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                  <Icons.Image className="w-12 h-12 opacity-20" />
                </div>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{templateName}</h4>
              <p className="text-sm text-slate-400 mb-6">This template is optimized for {isGold ? 'Gold Jewelry catalogs' : isHandloom ? 'Handloom Saree stores' : isHealth ? 'Medical Clinics' : 'General Business'}.</p>
              
              <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-xl">
                <p className="text-xs text-sky-300 flex items-center gap-2 font-medium leading-relaxed">
                  <Icons.Info className="w-4 h-4 shrink-0" />
                  Your site will go live instantly on {selectedDomain || 'your domain'} after deployment.
                </p>
              </div>
            </div>
          </div>
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
