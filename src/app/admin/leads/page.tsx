"use client";

import React, { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { db, collection, getDocs, query, orderBy, doc, updateDoc } from "@/utils/firebase";

export default function LeadsCRM() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      console.error("Error fetching leads:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "leads", id), { status: newStatus });
      fetchLeads();
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Lead CRM</h1>
          <p className="text-slate-400 text-sm mt-1">Manage incoming project inquiries from the Homepage.</p>
        </div>
        <button onClick={fetchLeads} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300">
          <Icons.RefreshCw className="w-5 h-5" />
        </button>
      </header>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Icons.Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider font-bold bg-slate-900">
                  <th className="p-4">Contact</th>
                  <th className="p-4">Interest</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">No leads found.</td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white">{lead.name}</div>
                        <div className="text-xs text-slate-500">{lead.email}</div>
                      </td>
                      <td className="p-4 text-sm text-indigo-400 font-medium">
                        {lead.interest || "General"}
                      </td>
                      <td className="p-4 text-sm text-slate-300 max-w-md truncate">
                        {lead.message}
                      </td>
                      <td className="p-4">
                        <select 
                          value={lead.status || "New"}
                          onChange={(e) => updateStatus(lead.id, e.target.value)}
                          className={`text-xs font-bold px-2 py-1 rounded border outline-none ${
                            lead.status === "Closed" ? "bg-slate-800 text-slate-400 border-slate-700" :
                            lead.status === "In Progress" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                            "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors">
                          <Icons.Mail className="w-3.5 h-3.5" /> Reply
                        </a>
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
