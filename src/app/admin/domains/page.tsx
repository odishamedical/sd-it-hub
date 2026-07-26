"use client";

import React, { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { db, collection, getDocs, query, orderBy } from "@/utils/firebase";

export default function AdminDomainRegistry() {
  const [domains, setDomains] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "domains"), orderBy("purchasedAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDomains(data);
      } catch (e) {
        console.error("Error fetching domains:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDomains();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Icons.Globe className="w-8 h-8 text-sky-400" />
            Master Domain Registry
          </h1>
          <p className="text-slate-400 mt-2 text-sm max-w-2xl">
            Manage all domain names registered across the ShyamDash ecosystem. View ownership, status, and ResellerClub API synchronization.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300">
            Total Active: <span className="text-sky-400">{domains.length}</span>
          </div>
          <button className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-bold rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2">
            <Icons.RefreshCw className="w-4 h-4" /> Sync ResellerClub
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-widest border-b border-slate-800">
                <th className="p-4 font-bold">Domain Name</th>
                <th className="p-4 font-bold">Client / Owner</th>
                <th className="p-4 font-bold">Registration Date</th>
                <th className="p-4 font-bold">Expiry Date</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <Icons.Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Fetching registry data...
                  </td>
                </tr>
              ) : domains.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No domains found in the registry.
                  </td>
                </tr>
              ) : (
                domains.map((dom) => (
                  <tr key={dom.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                          <Icons.Globe className="w-4 h-4 text-sky-400" />
                        </div>
                        <span className="font-bold text-white">{dom.domainName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-300 font-medium">{dom.ownerEmail}</div>
                      <div className="text-xs text-slate-500 mt-0.5 uppercase">{dom.source || "System"}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-400">
                      {dom.purchasedAt ? new Date(dom.purchasedAt.seconds * 1000).toLocaleDateString() : "Pending"}
                    </td>
                    <td className="p-4 text-sm text-slate-400">
                      {dom.purchasedAt ? new Date((dom.purchasedAt.seconds + (dom.duration * 31536000)) * 1000).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="p-4">
                      {dom.isAllocated ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> Pending setup
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <Icons.Settings className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
