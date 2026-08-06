"use client";

import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Search, MapPin, Briefcase, Filter, ChevronDown, ChevronLeft, ChevronRight, UserCircle, FileText, LayoutList, MessageSquare, Settings, Bell, CircleUser, MoreVertical, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { db, collection, getDocs } from "@/utils/firebase";

export default function JobPortalATS() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [industryQuery, setIndustryQuery] = useState("Technology");
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "shyamdash_jobs"));
        const jobsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobsList);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const title = (job.title || "").toLowerCase();
    const company = (job.company_name || "").toLowerCase();
    const loc = (job.location || "").toLowerCase();
    const q = searchQuery.toLowerCase();
    const l = locationQuery.toLowerCase();
    
    if (q && !title.includes(q) && !company.includes(q)) return false;
    if (l && !loc.includes(l)) return false;
    return true;
  });

  return (
    <>
      <Header />
      <div className="flex pt-20 h-screen bg-[#0a0e17] text-slate-300 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-[280px] bg-[#0d131f] border-r border-slate-800/50 flex flex-col shrink-0 hidden lg:flex">
        
        {/* Header */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800/50 shrink-0">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Briefcase className="w-6 h-6 text-emerald-400" />
            <span className="text-xl font-bold text-white tracking-wide">Job Board</span>
          </Link>
          <button className="ml-auto text-slate-500 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all">
            <UserCircle className="w-5 h-5" />
            <span className="font-medium text-sm">My Profile</span>
          </a>
          
          <a href="#" className="flex flex-col gap-3 px-4 py-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              <span className="font-bold text-sm">Resumes & Uploads</span>
            </div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#0a0e17] font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-2 uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20">
              <Icons.Upload className="w-3.5 h-3.5" /> Upload CV/Resume
            </button>
          </a>

          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all">
            <LayoutList className="w-5 h-5" />
            <span className="font-medium text-sm">My Applications</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all">
            <Icons.Calendar className="w-5 h-5" />
            <span className="font-medium text-sm">Interviews</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium text-sm">Messages</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </a>

          {/* Candidate Profile Preview */}
          <div className="pt-6 mt-6 border-t border-slate-800/50">
            <div className="flex items-center justify-between px-4 mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Candidate Profile</span>
              <Icons.PlusCircle className="w-4 h-4 text-slate-500 hover:text-emerald-400 cursor-pointer" />
            </div>
            
            <div className="space-y-3 px-2">
              <div className="flex items-center gap-3 p-2 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                <Image src="https://ui-avatars.com/api/?name=Alex+Thompson&background=10b981&color=fff" alt="User" width={32} height={32} className="rounded-full" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-tight">Alex Thompson</span>
                  <span className="text-xs text-emerald-400">(Available)</span>
                </div>
                <div className="ml-auto w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                  <Icons.Check className="w-3 h-3 text-[#0a0e17]" />
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 hover:bg-slate-800/30 rounded-xl transition-colors opacity-60">
                <Image src="https://ui-avatars.com/api/?name=Sarah+Chen&background=6366f1&color=fff" alt="User" width={32} height={32} className="rounded-full" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-tight">Sarah Chen</span>
                  <span className="text-xs text-slate-400">(In Review)</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0a0e17] relative">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

        {/* Top Navbar */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-slate-800/50 z-10 relative">
          <h1 className="text-xl font-bold text-white">Advanced Search</h1>
          <div className="flex items-center gap-6">
            <Icons.LineChart className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border border-[#0a0e17]"></span>
            </div>
            <div className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center cursor-pointer">
              <CircleUser className="w-5 h-5 text-slate-300" />
            </div>
          </div>
        </header>

        {/* Search & Filters */}
        <div className="p-8 pb-4 z-10 relative">
          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            
            <div className="flex-1 min-w-[250px]">
              <label className="text-xs font-bold text-slate-500 mb-2 block">Main keyword</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="e.g. Senior Software Engineer"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-slate-900 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="w-full sm:w-[200px]">
              <label className="text-xs font-bold text-slate-500 mb-2 block">Location</label>
              <div className="relative">
                <select 
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Locations</option>
                  <option value="San Francisco">San Francisco, CA</option>
                  <option value="New York">New York, NY</option>
                  <option value="Remote">Remote</option>
                  <option value="Odisha">Odisha, India</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            <div className="w-full sm:w-[180px]">
              <label className="text-xs font-bold text-slate-500 mb-2 block">Industry</label>
              <div className="relative">
                <select 
                  value={industryQuery}
                  onChange={(e) => setIndustryQuery(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>
            
            <div className="w-full sm:w-[160px]">
              <label className="text-xs font-bold text-slate-500 mb-2 block">Experience Level</label>
              <div className="relative">
                <select className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer">
                  <option>Experience</option>
                  <option>Entry Level</option>
                  <option>Mid Level</option>
                  <option>Senior Level</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            <div className="w-full sm:w-[160px]">
              <label className="text-xs font-bold text-slate-500 mb-2 block">Salary Range</label>
              <div className="relative">
                <select className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer">
                  <option>Salary Range</option>
                  <option>$50k - $100k</option>
                  <option>$100k - $150k</option>
                  <option>$150k+</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Job Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-4 z-10 relative">
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1,2,3,4,5,6,7,8].map(n => (
                <div key={n} className="h-[250px] bg-slate-900/40 rounded-2xl border border-slate-800/50 animate-pulse"></div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Search className="w-12 h-12 text-slate-700 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Jobs Found</h3>
              <p className="text-slate-500">We couldn't find any jobs matching your current filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredJobs.map((job) => (
                <div key={job.id} className="group flex flex-col bg-[#131b2c]/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-5 hover:border-emerald-500/50 hover:bg-[#151f33] transition-all hover:shadow-[0_10px_40px_rgba(16,185,129,0.1)] relative cursor-pointer">
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                        {job.thumbnail ? (
                          <img src={job.thumbnail} alt={job.company_name} className="w-full h-full object-contain p-1 bg-white" />
                        ) : (
                          <Building2 className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider truncate max-w-[120px]">{job.company_name || 'Company Name'}</h4>
                    </div>
                    <button className="text-slate-500 hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Title & Meta */}
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {job.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{job.location || 'Remote'}</span>
                  </div>

                  {/* Salary Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-4 w-fit shadow-inner">
                    <span>$</span>
                    <span>{job.extensions?.[1] || '$150k - $190k/year'}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(job.extensions?.[0] || 'Remote').split(',').map((tag: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-medium border border-slate-700">
                        {tag.trim()}
                      </span>
                    ))}
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-medium border border-slate-700">React</span>
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-medium border border-slate-700">Node.js</span>
                  </div>

                  {/* Apply Button */}
                  <div className="mt-auto">
                    <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-400 text-white font-bold text-sm uppercase tracking-wide hover:brightness-110 transition-all opacity-90 hover:opacity-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      Quick Apply
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && filteredJobs.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-8 pb-8">
              <button className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-slate-400">1 of 25 Pages</span>
              <button className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </main>

      </div>
    </>
  );
}
