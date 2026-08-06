"use client";

import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { db, collection, getDocs, doc, updateDoc, deleteDoc, query, where } from "@/utils/firebase";

export default function JobApprovalsManager() {
  const [pendingJobs, setPendingJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingJobs = async () => {
    setLoading(true);
    try {
      // Query jobs where status is pending
      const q = query(collection(db, "shyamdash_jobs"), where("status", "==", "pending"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPendingJobs(data);
    } catch (err) {
      console.error("Error fetching pending jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await updateDoc(doc(db, "shyamdash_jobs", id), {
        status: "active"
      });
      // Remove from local state
      setPendingJobs(pendingJobs.filter(job => job.id !== id));
      alert("Job approved and is now live!");
    } catch (error) {
      console.error("Error approving job:", error);
      alert("Failed to approve job.");
    }
  };

  const handleReject = async (id: string) => {
    if (confirm("Are you sure you want to reject and delete this job posting?")) {
      try {
        await deleteDoc(doc(db, "shyamdash_jobs", id));
        setPendingJobs(pendingJobs.filter(job => job.id !== id));
      } catch (error) {
        console.error("Error rejecting job:", error);
        alert("Failed to reject job.");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Employer Job Approvals</h1>
          <p className="text-slate-400">Review and approve jobs submitted by external employers before they go live.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Job Details</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Salary / Type</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading pending jobs...</td></tr>
            ) : pendingJobs.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-16 text-center text-slate-500">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <Icons.CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">All Caught Up!</h3>
                  <p>There are no pending jobs waiting for approval.</p>
                </td>
              </tr>
            ) : (
              pendingJobs.map((job) => (
                <tr key={job.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                         <Icons.Briefcase className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <span className="font-bold text-white block">{job.title || "Untitled Job"}</span>
                        <span className="text-xs text-slate-500">{job.location || "Remote"} • {job.experience || "Experience Not Specified"}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300 font-medium">
                    {job.company || "Unknown Company"}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-emerald-400 font-bold text-sm">{job.salary || "Not Specified"}</span>
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-bold uppercase w-max">{job.type || "Full-time"}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleApprove(job.id)} className="px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white font-bold rounded-lg transition-colors border border-emerald-500/20">
                        Approve
                      </button>
                      <button onClick={() => handleReject(job.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Icons.X className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
