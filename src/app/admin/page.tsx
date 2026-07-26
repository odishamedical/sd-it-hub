"use client";

import React, { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { db, collection, getDocs, query, orderBy, limit, addDoc, serverTimestamp, where } from "@/utils/firebase";

export default function AdminDashboard() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Domain Search States
  const [domainQuery, setDomainQuery] = useState("");
  const [domainExtension, setDomainExtension] = useState(".com");
  const [domainDuration, setDomainDuration] = useState("1");
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [domainResult, setDomainResult] = useState<{ available: boolean; domain: string } | null>(null);
  const [targetUserEmail, setTargetUserEmail] = useState("");
  const [isBookingDomain, setIsBookingDomain] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        // Fetch all tenant deployments across all partners
        const qDeploy = query(collection(db, "tenant_deployments"), orderBy("createdAt", "desc"), limit(20));
        const snapshotD = await getDocs(qDeploy);
        
        const dataD = snapshotD.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setTenants(dataD);
      } catch (e) {
        console.error("Error fetching admin data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleCheckDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainQuery.trim()) return;

    setIsCheckingDomain(true);
    setDomainResult(null);

    try {
      const cleanQuery = domainQuery.toLowerCase().replace(/\s+/g, "");
      const domainName = cleanQuery.includes(".") ? cleanQuery : `${cleanQuery}${domainExtension}`;

      const restricted = ["taken", "admin", "gold", "bhulia", "auth", "shyamdash"];
      if (restricted.some(kw => cleanQuery.includes(kw))) {
        setDomainResult({ available: false, domain: domainName });
        setIsCheckingDomain(false);
        return;
      }

      const q = query(collection(db, "domains"), where("domainName", "==", domainName));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        setDomainResult({ available: false, domain: domainName });
      } else {
        setDomainResult({ available: true, domain: domainName });
      }
    } catch (e) {
      console.error("Error checking domain", e);
    } finally {
      setIsCheckingDomain(false);
    }
  };

  const handleAdminProvisionDomain = async () => {
    if (!domainResult?.domain || !targetUserEmail.trim()) {
      alert("Please enter a target user email.");
      return;
    }

    setIsBookingDomain(true);
    try {
      // 1. Mark domain as owned
      await addDoc(collection(db, "domains"), {
        domainName: domainResult.domain,
        ownerEmail: targetUserEmail,
        isAllocated: true,
        duration: parseInt(domainDuration),
        purchasedAt: serverTimestamp(),
        source: "admin_provision"
      });

      // 2. Create tenant deployment entry
      await addDoc(collection(db, "tenant_deployments"), {
        ownerEmail: targetUserEmail,
        siteName: domainResult.domain,
        templateName: "Pending Setup",
        status: "Provisioning DNS...",
        createdAt: serverTimestamp()
      });

      alert(`Domain ${domainResult.domain} successfully provisioned for ${targetUserEmail}`);
      
      // Reset form
      setDomainQuery("");
      setDomainResult(null);
      setTargetUserEmail("");
      
      // Refresh deployments
      window.location.reload();
    } catch (e) {
      console.error("Error provisioning domain:", e);
      alert("Failed to provision domain. Check console.");
    } finally {
      setIsBookingDomain(false);
    }
  };

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Global Command Center</h1>
        <p className="text-slate-400 text-sm mt-1">Monitor all wholesale partner activity and infrastructure allocations.</p>
      </header>

      {/* High Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Icons.Server className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Nodes</span>
          </div>
          <span className="text-3xl font-black text-white">{tenants.length}</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Icons.Users className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Partners</span>
          </div>
          <span className="text-3xl font-black text-white">1</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Icons.Inbox className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">New Leads</span>
          </div>
          <span className="text-3xl font-black text-white flex items-center gap-2">
            View
            <a href="/admin/leads" className="text-xs text-amber-400 ml-2 hover:underline">CRM &rarr;</a>
          </span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Icons.Briefcase className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Services</span>
          </div>
          <span className="text-3xl font-black text-white flex items-center gap-2">
            Mgmt
            <a href="/admin/services" className="text-xs text-purple-400 ml-2 hover:underline">Manage &rarr;</a>
          </span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Icons.Activity className="w-4 h-4 text-sky-400" />
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Platform Status</span>
          </div>
          <span className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            All Systems Nominal
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Global Tenants Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Recent Global Deployments</h3>
            <button onClick={() => window.location.reload()} className="p-2 hover:bg-slate-800 rounded text-slate-400">
              <Icons.RefreshCw className="w-4 h-4" />
            </button>
          </div>
          
          {loading ? (
            <div className="p-12 flex justify-center flex-1 items-center">
              <Icons.Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
            </div>
          ) : (
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider font-bold bg-slate-900">
                    <th className="p-4">Owner (Partner)</th>
                    <th className="p-4">Domain / Node Name</th>
                    <th className="p-4">Current Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {tenants.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-slate-500 text-sm">
                        No deployments found in the network.
                      </td>
                    </tr>
                  ) : (
                    tenants.map((dep, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="p-4">
                          <div className="text-sm font-bold text-white max-w-[150px] truncate">{dep.ownerEmail || 'Unknown'}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5 font-mono">ID: {dep.id?.substring(0,8)}</div>
                        </td>
                        <td className="p-4 font-bold text-sky-400 flex items-center gap-2">
                          <Icons.Globe2 className="w-4 h-4" />
                          <span className="truncate max-w-[150px]">{dep.siteName}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full border ${
                            dep.status === "Domain Secured" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            dep.status?.includes("Provisioning") ? "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse" :
                            "bg-slate-800 text-slate-300 border-slate-700"
                          }`}>
                            {dep.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Domain Provisioning Widget */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Icons.Search className="w-4 h-4 text-sky-400" />
              Manual Domain Provisioning
            </h3>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center">
            <form onSubmit={handleCheckDomain} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-bold block mb-2">Search Global Domain Name</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    required
                    value={domainQuery}
                    onChange={(e) => setDomainQuery(e.target.value)}
                    placeholder="e.g. newsportal"
                    className="flex-1 p-3 bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                  />
                  <select 
                    value={domainExtension}
                    onChange={(e) => setDomainExtension(e.target.value)}
                    className="p-3 bg-slate-900 border border-slate-800 focus:border-sky-500 rounded-lg text-sm text-sky-400 font-bold focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors cursor-pointer w-24"
                  >
                    <option value=".com">.com</option>
                    <option value=".in">.in</option>
                    <option value=".org">.org</option>
                    <option value=".net">.net</option>
                    <option value=".co">.co</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isCheckingDomain}
                className="w-full px-6 py-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {isCheckingDomain ? (
                  <>
                    <Icons.Loader2 className="w-4 h-4 animate-spin" />
                    <span>Scanning Registries...</span>
                  </>
                ) : (
                  <>
                    <Icons.Search className="w-4 h-4" />
                    <span>Check Availability</span>
                  </>
                )}
              </button>
            </form>

            {/* Results UI */}
            {domainResult && (
              <div className="mt-6 pt-6 border-t border-slate-800 animate-in fade-in slide-in-from-bottom-2">
                {domainResult.available ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                      <Icons.CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-bold text-sm">Domain is Available</h4>
                        <p className="text-slate-400 text-xs mt-0.5"><span className="text-sky-400 font-bold font-mono">{domainResult.domain}</span> can be provisioned.</p>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Allocation Details</h4>
                      
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Target User Email</label>
                        <input 
                          type="email" 
                          required
                          value={targetUserEmail}
                          onChange={(e) => setTargetUserEmail(e.target.value)}
                          placeholder="client@example.com"
                          className="w-full p-2.5 bg-slate-900 border border-slate-800 focus:border-sky-500 rounded text-sm text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Registration Duration</label>
                        <select 
                          value={domainDuration}
                          onChange={(e) => setDomainDuration(e.target.value)}
                          className="w-full p-2.5 bg-slate-900 border border-slate-800 focus:border-sky-500 rounded text-sm text-white focus:outline-none"
                        >
                          <option value="1">1 Year Allocation</option>
                          <option value="2">2 Year Allocation</option>
                          <option value="3">3 Year Allocation</option>
                        </select>
                      </div>

                      <button 
                        onClick={handleAdminProvisionDomain}
                        disabled={isBookingDomain || !targetUserEmail.trim()}
                        className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-lg transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isBookingDomain ? (
                          <>
                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                            <span>Provisioning...</span>
                          </>
                        ) : (
                          <>
                            <Icons.Zap className="w-4 h-4" />
                            <span>Force Provision Domain</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                    <Icons.XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-bold text-sm">Domain Unavailable</h4>
                      <p className="text-slate-400 text-xs mt-0.5"><span className="text-sky-400 font-bold font-mono">{domainResult.domain}</span> is already registered or restricted.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
