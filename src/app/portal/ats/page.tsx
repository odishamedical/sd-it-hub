"use client";

import React, { useState } from "react";
import { Briefcase, Users, Eye, TrendingUp, MoreVertical, MapPin, Calendar, CheckCircle2, XCircle, Search, Filter } from "lucide-react";
import Image from "next/image";

// Mock Data for UI demonstration
const MOCK_STATS = [
  { label: "Active Jobs", value: "3", icon: Briefcase, color: "text-blue-400", bg: "bg-blue-400/10" },
  { label: "Total Applicants", value: "48", icon: Users, color: "text-teal-400", bg: "bg-teal-400/10" },
  { label: "Profile Views", value: "1,204", icon: Eye, color: "text-purple-400", bg: "bg-purple-400/10" },
  { label: "Shortlist Rate", value: "24%", icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-400/10" },
];

const MOCK_JOBS = [
  { id: 1, title: "Senior React Developer", type: "Full-time", location: "Remote", applicants: 24, posted: "2d ago" },
  { id: 2, title: "Product Manager", type: "Full-time", location: "Bhubaneswar, Odisha", applicants: 15, posted: "5d ago" },
  { id: 3, title: "UI/UX Designer", type: "Contract", location: "Remote", applicants: 9, posted: "1w ago" },
];

const KANBAN_STAGES = ["New", "Shortlisted", "Interviewing", "Hired", "Rejected"];

const MOCK_APPLICANTS = [
  { id: 101, name: "Rahul Sharma", role: "React Developer", exp: "5 Yrs", stage: "New", match: "92%" },
  { id: 102, name: "Priya Das", role: "React Developer", exp: "3 Yrs", stage: "New", match: "78%" },
  { id: 103, name: "Amit Kumar", role: "React Developer", exp: "6 Yrs", stage: "Shortlisted", match: "95%" },
  { id: 104, name: "Neha Singh", role: "React Developer", exp: "4 Yrs", stage: "Interviewing", match: "88%" },
  { id: 105, name: "Suresh Patel", role: "React Developer", exp: "2 Yrs", stage: "Rejected", match: "45%" },
];

export default function ATSDashboard() {
  const [selectedJob, setSelectedJob] = useState(MOCK_JOBS[0].id);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
      
      {/* Sidebar Mockup */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-white/10 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-slate-950" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">Shyamdash <span className="text-teal-400">ATS</span></h1>
          </div>
        </div>
        <div className="p-4 flex-1 space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-teal-500/10 text-teal-400 font-bold text-sm">Dashboard Overview</button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 font-medium text-sm transition-colors">Manage Jobs</button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 font-medium text-sm transition-colors">Talent Pool</button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 font-medium text-sm transition-colors">Company Profile</button>
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
              <Image src="https://ui-avatars.com/api/?name=Acme+Corp&background=random" alt="Company Logo" width={40} height={40} />
            </div>
            <div>
              <p className="text-sm font-bold">Acme Corp</p>
              <p className="text-xs text-slate-400">IT Services</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-20 border-b border-white/10 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div>
            <h2 className="text-2xl font-black">ATS Dashboard</h2>
            <p className="text-sm text-slate-400">Manage your jobs and applicants across industries.</p>
          </div>
          <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-teal-500/20 transition-all text-sm">
            + Post New Job
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_STATS.map((stat, idx) => (
              <div key={idx} className="bg-slate-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black">{stat.value}</h3>
                
                {/* Decorative glow */}
                <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity ${stat.bg.replace('/10', '')}`}></div>
              </div>
            ))}
          </div>

          {/* Job Selector & Search */}
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Select Job to View Pipeline</label>
              <select 
                value={selectedJob} 
                onChange={e => setSelectedJob(Number(e.target.value))}
                className="w-full bg-slate-900 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white appearance-none"
              >
                {MOCK_JOBS.map(job => (
                  <option key={job.id} value={job.id}>{job.title} ({job.applicants} Applicants)</option>
                ))}
              </select>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search applicants..." className="w-full bg-slate-900 border border-white/10 focus:border-teal-500 rounded-xl pl-10 pr-4 py-3 text-white text-sm" />
            </div>
            <button className="bg-slate-900 border border-white/10 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <Filter className="w-5 h-5 text-slate-300" />
            </button>
          </div>

          {/* Kanban Board */}
          <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar min-h-[500px]">
            {KANBAN_STAGES.map(stage => {
              const stageApplicants = MOCK_APPLICANTS.filter(a => a.stage === stage);
              return (
                <div key={stage} className="flex-shrink-0 w-80 bg-slate-900/50 rounded-2xl border border-white/5 flex flex-col max-h-full">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900/90 backdrop-blur-md rounded-t-2xl z-10">
                    <h3 className="font-bold flex items-center gap-2">
                      {stage}
                      <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full">{stageApplicants.length}</span>
                    </h3>
                    <MoreVertical className="w-4 h-4 text-slate-500 cursor-pointer hover:text-white" />
                  </div>
                  
                  <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                    {stageApplicants.map(applicant => (
                      <div key={applicant.id} className="bg-slate-800/80 border border-white/5 p-4 rounded-xl hover:border-teal-500/50 hover:shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all cursor-grab active:cursor-grabbing">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden shrink-0">
                               <Image src={`https://ui-avatars.com/api/?name=${applicant.name.replace(' ', '+')}&background=random`} alt={applicant.name} width={40} height={40} />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-white">{applicant.name}</h4>
                              <p className="text-xs text-slate-400">{applicant.exp} Exp</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-black bg-teal-500/10 text-teal-400 px-2 py-1 rounded-full border border-teal-500/20">{applicant.match} Match</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-white/5 pt-3 mt-1">
                           <button className="hover:text-teal-400 font-bold transition-colors">View CV</button>
                           <button className="hover:text-teal-400 font-bold transition-colors">Message</button>
                        </div>
                      </div>
                    ))}
                    
                    {stageApplicants.length === 0 && (
                      <div className="text-center p-8 border-2 border-dashed border-white/5 rounded-xl text-slate-500 text-sm">
                        No candidates here
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </main>
    </div>
  );
}
