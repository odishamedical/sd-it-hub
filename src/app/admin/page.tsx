"use client";

import React, { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { db, collection, getDocs, query, orderBy, limit } from "@/utils/firebase";

export default function AdminDashboard() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Global Command Center</h1>
        <p className="text-slate-400 text-sm mt-1">Monitor all wholesale partner activity and infrastructure allocations.</p>
      </header>

      {/* High Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Icons.Server className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Active Nodes</span>
          </div>
          <span className="text-3xl font-black text-white">{tenants.length}</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Icons.Users className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Wholesale Partners</span>
          </div>
          <span className="text-3xl font-black text-white">1</span>
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

      {/* Global Tenants Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Recent Global Deployments</h3>
          <button onClick={() => window.location.reload()} className="p-2 hover:bg-slate-800 rounded text-slate-400">
            <Icons.RefreshCw className="w-4 h-4" />
          </button>
        </div>
        
        {loading ? (
          <div className="p-12 flex justify-center">
            <Icons.Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider font-bold bg-slate-900">
                  <th className="p-4">Owner (Partner)</th>
                  <th className="p-4">Domain / Node Name</th>
                  <th className="p-4">Template Stack</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {tenants.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 text-sm">
                      No deployments found in the network.
                    </td>
                  </tr>
                ) : (
                  tenants.map((dep, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="p-4">
                        <div className="text-sm font-bold text-white">{dep.ownerEmail || 'Unknown'}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 font-mono">ID: {dep.id?.substring(0,8)}</div>
                      </td>
                      <td className="p-4 font-bold text-sky-400 flex items-center gap-2">
                        <Icons.Globe2 className="w-4 h-4" />
                        {dep.siteName}
                      </td>
                      <td className="p-4 text-slate-300 text-xs">{dep.templateName}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full border ${
                          dep.status === "Domain Secured" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          dep.status?.includes("Provisioning") ? "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse" :
                          "bg-slate-800 text-slate-300 border-slate-700"
                        }`}>
                          {dep.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-all">
                          <Icons.Settings className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
