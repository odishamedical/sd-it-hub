"use client";

import React, { useState } from "react";
import { Search, MapPin, Briefcase, Filter, ChevronDown, Clock, Building2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const INDUSTRIES = ["All", "IT Services", "Healthcare", "Retail & E-Commerce", "Finance", "Manufacturing"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Remote"];

const MOCK_JOBS = [
  { id: "job-1", title: "Senior React Developer", company: "Acme Corp", location: "Remote", type: "Full-time", industry: "IT Services", salary: "₹30L - ₹40L", posted: "2d ago", logo: "https://ui-avatars.com/api/?name=Acme+Corp&background=random", verified: true },
  { id: "job-2", title: "ICU Head Nurse", company: "Apollo Care", location: "Bhubaneswar, Odisha", type: "Full-time", industry: "Healthcare", salary: "Not Disclosed", posted: "5h ago", logo: "https://ui-avatars.com/api/?name=Apollo+Care&background=random", verified: true },
  { id: "job-3", title: "Retail Store Manager", company: "MegaMart", location: "Cuttack, Odisha", type: "Contract", industry: "Retail & E-Commerce", salary: "₹5L - ₹8L", posted: "1w ago", logo: "https://ui-avatars.com/api/?name=Mega+Mart&background=random", verified: false },
  { id: "job-4", title: "Backend Systems Architect", company: "TechNova", location: "Remote", type: "Full-time", industry: "IT Services", salary: "₹45L - ₹60L", posted: "3d ago", logo: "https://ui-avatars.com/api/?name=Tech+Nova&background=random", verified: true },
];

export default function GlobalJobSearch() {
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const filteredJobs = MOCK_JOBS.filter(job => {
    if (activeIndustry !== "All" && job.industry !== activeIndustry) return false;
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (locationQuery && !job.location.toLowerCase().includes(locationQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Great Opportunity</span></h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Search thousands of jobs across IT, Healthcare, Retail, and more on the Universal Shyamdash ATS.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 md:p-3 flex flex-col md:flex-row gap-3 shadow-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Job title, skills, or company" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-white pl-12 pr-4 py-3 md:py-4 placeholder-slate-500"
              />
            </div>
            <div className="hidden md:block w-px bg-white/10 my-2"></div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="City, State, or 'Remote'" 
                value={locationQuery}
                onChange={e => setLocationQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-white pl-12 pr-4 py-3 md:py-4 placeholder-slate-500"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold px-8 py-3 md:py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Search Jobs
            </button>
          </div>

          {/* Industry Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {INDUSTRIES.map(ind => (
              <button 
                key={ind}
                onClick={() => setActiveIndustry(ind)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${activeIndustry === ind ? 'bg-white text-slate-950 border-white' : 'bg-slate-900 border-white/10 text-slate-300 hover:border-white/30'}`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-8">
          <div className="flex items-center justify-between lg:hidden">
            <h3 className="font-bold text-lg">Filters</h3>
            <button className="p-2 bg-slate-900 rounded-lg border border-white/10"><Filter className="w-5 h-5"/></button>
          </div>

          <div className="hidden lg:block space-y-8">
            <div>
              <h3 className="font-bold text-white mb-4">Job Type</h3>
              <div className="space-y-3">
                {JOB_TYPES.map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-white/20 bg-slate-900 group-hover:border-blue-500 transition-colors flex items-center justify-center"></div>
                    <span className="text-slate-300 text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="font-bold text-white mb-4">Salary Range</h3>
              <input type="range" className="w-full accent-blue-500" />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>₹1L</span>
                <span>₹50L+</span>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/10">
              <h3 className="font-bold text-white mb-4">Experience Level</h3>
              <div className="space-y-3">
                {["Fresher", "1-3 Years", "3-5 Years", "5+ Years"].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-white/20 bg-slate-900 group-hover:border-blue-500 transition-colors"></div>
                    <span className="text-slate-300 text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Job Listings Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{filteredJobs.length} Jobs Found</h2>
            <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              Sort by: Newest <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map(job => (
              <Link href={`/jobs/${job.id}`} key={job.id} className="bg-slate-900 border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 transition-all group hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] block">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/5 rounded-xl border border-white/10 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                      <Image src={job.logo} alt={job.company} width={56} height={56} className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors line-clamp-1">{job.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-400 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{job.company}</span>
                        {job.verified && <span title="Verified Employer"><ShieldCheck className="w-4 h-4 text-teal-400" /></span>}
                      </div>
                    </div>
                  </div>
                  <button className="text-slate-500 hover:text-blue-400 transition-colors p-2" onClick={(e) => { e.preventDefault(); }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300 flex items-center gap-1.5"><MapPin className="w-3 h-3"/>{job.location}</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300 flex items-center gap-1.5"><Briefcase className="w-3 h-3"/>{job.type}</span>
                  <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-medium">💰 {job.salary}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {job.posted}</span>
                  <span className="font-bold text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Apply Now &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-white/5">
              <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No jobs found</h3>
              <p className="text-slate-400">Try adjusting your filters or search terms.</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
