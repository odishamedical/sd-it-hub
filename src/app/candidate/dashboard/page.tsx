"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import * as Icons from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CandidateDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Hardcoded for demo - in production this comes from Auth Context
  const dummySeekerEmail = "seeker@example.com"; 
  const dummySeekerId = "SEEKER_12345";

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const q = query(collection(db, "shyamdash_job_applications"), where("seekerEmail", "==", dummySeekerEmail));
        const snap = await getDocs(q);
        setApplications(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  return (
    <main className="min-h-screen bg-[#020610] text-slate-200">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Candidate Dashboard</h1>
            <p className="text-slate-400">Welcome back, manage your applications and resume here.</p>
          </div>
          
          <div className="flex gap-4">
            <Link 
              href={`/jobs/resume/${dummySeekerId}/pdf`} 
              target="_blank"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all"
            >
              <Icons.FileText className="w-5 h-5" /> View / Generate PDF Resume
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-white">Your Applications</h2>
            
            {loading ? (
              <div className="p-8 text-center bg-slate-900/50 rounded-xl border border-slate-800">
                <Icons.Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-500" />
              </div>
            ) : applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app, i) => (
                  <div key={i} className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-purple-500/30 transition-colors">
                    <div>
                      <h3 className="font-bold text-white text-lg">{app.jobTitle}</h3>
                      <p className="text-sm text-slate-400">Applied to Employer ID: {app.employerId}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded text-xs font-bold ${app.status === 'New' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                        {app.status}
                      </span>
                      <span className="text-xs text-slate-500">
                        {app.appliedAt?.toDate ? app.appliedAt.toDate().toLocaleDateString() : 'Recently'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-900/50 rounded-xl border border-slate-800 text-slate-400">
                You haven't applied to any jobs yet.
                <Link href="/jobs" className="block mt-4 text-purple-400 font-bold hover:underline">Browse Jobs</Link>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">Profile Completion</h3>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{width: '75%'}}></div>
              </div>
              <p className="text-xs text-slate-400 mb-6">Your profile is 75% complete. Add your education history to reach 100%.</p>
              <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors border border-slate-700">
                Update Profile
              </button>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Icons.Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Pro Tip</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Make sure your CV PDF is up to date before applying. Employers can directly download the resume attached to your profile.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
