"use client";

import React, { useState } from "react";
import { User, Briefcase, Bookmark, Clock, CheckCircle2, XCircle, MapPin, Search, ChevronRight } from "lucide-react";
import Image from "next/image";

// Mock Data
const MOCK_APPLICATIONS = [
  { id: 1, jobTitle: "Senior React Developer", company: "Acme Corp", location: "Remote", appliedOn: "Oct 12, 2026", status: "Shortlisted", logo: "https://ui-avatars.com/api/?name=Acme+Corp&background=random" },
  { id: 2, jobTitle: "Full Stack Engineer", company: "TechNova", location: "Bengaluru, India", appliedOn: "Oct 10, 2026", status: "Interviewing", logo: "https://ui-avatars.com/api/?name=Tech+Nova&background=random" },
  { id: 3, jobTitle: "Frontend Architect", company: "Global Systems", location: "Pune, India", appliedOn: "Oct 05, 2026", status: "Rejected", logo: "https://ui-avatars.com/api/?name=Global+Systems&background=random" },
  { id: 4, jobTitle: "UI/UX Developer", company: "DesignHub", location: "Remote", appliedOn: "Oct 14, 2026", status: "New", logo: "https://ui-avatars.com/api/?name=Design+Hub&background=random" },
];

const MOCK_SAVED_JOBS = [
  { id: 101, title: "Lead React Developer", company: "InnovateTech", location: "Hyderabad, India", salary: "₹30L - ₹40L", posted: "1d ago" },
  { id: 102, title: "Senior Frontend Engineer", company: "CloudWorks", location: "Remote", salary: "Not Disclosed", posted: "3d ago" },
];

const STATUS_COLORS: Record<string, string> = {
  "New": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Shortlisted": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Interviewing": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Hired": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "Rejected": "bg-red-500/10 text-red-400 border-red-500/20"
};

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("applications");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-white/10 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-slate-950" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">Shyamdash <span className="text-blue-400">Careers</span></h1>
          </div>
        </div>
        <div className="p-4 flex-1 space-y-2">
          <button onClick={() => setActiveTab('applications')} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'applications' ? 'bg-blue-500/10 text-blue-400' : 'hover:bg-white/5 text-slate-300'}`}>My Applications</button>
          <button onClick={() => setActiveTab('saved')} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'saved' ? 'bg-blue-500/10 text-blue-400' : 'hover:bg-white/5 text-slate-300'}`}>Saved Jobs</button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 font-medium text-sm transition-colors">Profile Builder</button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 font-medium text-sm transition-colors">Career Insights</button>
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden shrink-0">
              <Image src="https://ui-avatars.com/api/?name=John+Doe&background=random" alt="User Profile" width={40} height={40} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">John Doe</p>
              <p className="text-xs text-slate-400 truncate">john.doe@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-20 border-b border-white/10 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div>
            <h2 className="text-2xl font-black">{activeTab === 'applications' ? 'My Applications' : 'Saved Jobs'}</h2>
            <p className="text-sm text-slate-400">Track your career progress across the Shyamdash network.</p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all text-sm flex items-center gap-2">
            <Search className="w-4 h-4" /> Find New Jobs
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {activeTab === 'applications' && (
            <div className="max-w-5xl mx-auto space-y-6">
              
              {/* Analytics Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-5">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Applied</p>
                  <h3 className="text-2xl font-black">12</h3>
                </div>
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-5">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">In Review</p>
                  <h3 className="text-2xl font-black text-amber-400">4</h3>
                </div>
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-5">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Interviews</p>
                  <h3 className="text-2xl font-black text-purple-400">2</h3>
                </div>
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-5">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Offers</p>
                  <h3 className="text-2xl font-black text-teal-400">0</h3>
                </div>
              </div>

              {/* Application List */}
              <div className="space-y-4">
                {MOCK_APPLICATIONS.map(app => (
                  <div key={app.id} className="bg-slate-900 border border-white/10 hover:border-white/20 transition-colors rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white/5 rounded-xl border border-white/10 overflow-hidden shrink-0">
                        <Image src={app.logo} alt={app.company} width={56} height={56} className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{app.jobTitle}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm mt-1">
                          <span className="text-slate-300 font-medium">{app.company}</span>
                          <span className="text-slate-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {app.location}</span>
                          <span className="text-slate-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> Applied: {app.appliedOn}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                      <div className={`px-4 py-1.5 rounded-full border text-xs font-bold tracking-wide ${STATUS_COLORS[app.status]}`}>
                        {app.status}
                      </div>
                      <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="max-w-5xl mx-auto space-y-4">
               {MOCK_SAVED_JOBS.map(job => (
                  <div key={job.id} className="bg-slate-900 border border-white/10 hover:border-blue-500/30 transition-colors rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h3 className="font-bold text-lg text-blue-400">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm mt-2">
                        <span className="text-slate-300 font-medium">{job.company}</span>
                        <span className="text-slate-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {job.location}</span>
                        <span className="text-slate-500">💰 {job.salary}</span>
                        <span className="text-slate-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {job.posted}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-bold transition-colors">
                        Unsave
                      </button>
                      <button className="px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
