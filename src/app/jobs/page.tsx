"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { db } from "@/utils/firebase";
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import ApplyModal from "@/components/jobs/ApplyModal";
import JobDetailsModal from "@/components/jobs/JobDetailsModal";

export default function JobsPage() {
  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  
  // Filtering States
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [filterJobType, setFilterJobType] = useState("All");
  const [filterWorkplace, setFilterWorkplace] = useState("All");
  const [filterSalary, setFilterSalary] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, "shyamdash_jobs"), where("status", "==", "Active"));
        const snap = await getDocs(q);
        const jobs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllJobs(jobs);
      } catch(e) {
        console.error("Failed to fetch jobs", e);
      }
    };
    fetchJobs();
  }, []);

  const featuredJobs = allJobs.slice(0, 4);

  // Apply filters
  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchKeyword = searchKeyword ? (job.title?.toLowerCase().includes(searchKeyword.toLowerCase()) || job.employerName?.toLowerCase().includes(searchKeyword.toLowerCase())) : true;
      const matchLocation = searchLocation ? (job.district?.toLowerCase().includes(searchLocation.toLowerCase()) || job.location?.toLowerCase().includes(searchLocation.toLowerCase())) : true;
      const matchJobType = filterJobType !== "All" ? job.jobType === filterJobType : true;
      const matchWorkplace = filterWorkplace !== "All" ? job.workplaceType === filterWorkplace : true;
      
      let matchSalary = true;
      if (filterSalary !== "All") {
        if (filterSalary === "Disclosed") {
          matchSalary = job.salaryRange && job.salaryRange !== "Not Disclosed";
        } else if (filterSalary === "Not Disclosed") {
          matchSalary = !job.salaryRange || job.salaryRange === "Not Disclosed";
        }
      }

      return matchKeyword && matchLocation && matchJobType && matchWorkplace && matchSalary;
    });
  }, [allJobs, searchKeyword, searchLocation, filterJobType, filterWorkplace, filterSalary]);

  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(false);
    setIsApplyModalOpen(true);
  };

  const handleViewDetails = (job: any) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };

  const scrollToAllJobs = () => {
    document.getElementById('all-jobs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#020610] text-slate-200 font-sans selection:bg-purple-500/30">
      <ApplyModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} job={selectedJob} />
      <JobDetailsModal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} job={selectedJob} onApplyClick={() => handleApplyClick(selectedJob)} />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/stock/bg.png" alt="Cosmic Tech Background" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020610]/40 via-[#020610]/80 to-[#020610] mix-blend-multiply"></div>
      </div>

      <Header />

      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-4 z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl">
              <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wide text-purple-200 uppercase">ShyamDash Job Board</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-xl">
              Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Dream Career</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
              Connect with top employers, browse thousands of local opportunities, and take the next big step in your professional journey.
            </p>
            
            {/* Dual Input Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2 bg-white/10 backdrop-blur-xl p-2 rounded-lg border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] mb-6 w-full">
              <div className="flex-1 relative flex items-center bg-[#0a0f1c]/80 rounded p-1 border border-slate-700 focus-within:border-purple-500 transition-colors">
                <Icons.Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Job title, keyword, or company" className="w-full bg-transparent border-none text-white p-3 focus:outline-none placeholder-slate-500" />
              </div>
              <div className="flex-1 relative flex items-center bg-[#0a0f1c]/80 rounded p-1 border border-slate-700 focus-within:border-purple-500 transition-colors">
                <Icons.MapPin className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input type="text" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} placeholder="City, state, or Remote" className="w-full bg-transparent border-none text-white p-3 focus:outline-none placeholder-slate-500" />
              </div>
              <button onClick={scrollToAllJobs} className="px-8 py-3 bg-gradient-to-b from-purple-500 to-purple-700 hover:to-purple-600 text-white font-bold rounded shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-all">
                Find Jobs
              </button>
            </div>
          </div>
          
          {/* Right Content - Hero Image (Masked) */}
          <div className="w-full lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-[450px]">
            <div className="absolute inset-0 left-0 bg-gradient-to-r from-[#020610] via-transparent to-transparent z-10 w-1/3" />
            <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-[#020610] via-transparent to-transparent z-10 h-1/4" />
            <Image 
              src="/stock/hero_job.png" 
              alt="Find Your Dream Job" 
              fill 
              className="object-cover object-right rounded-2xl lg:rounded-l-none lg:rounded-r-2xl"
              priority
            />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 relative z-10">
          
          {/* Featured Jobs */}
          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Featured Opportunities</h2>
                <p className="text-slate-400">Hand-picked premium roles available right now.</p>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:px-0 md:pb-0 md:mx-0 hide-scrollbar">
                <button onClick={scrollToAllJobs} className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded text-white font-medium transition-all hover:border-white/40 shadow-lg">
                  View All Jobs
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredJobs.length > 0 ? (
                featuredJobs.map((job) => (
                  <JobCard 
                    key={job.id}
                    title={job.title} 
                    company={job.employerName} 
                    location={`${job.district || job.location}`} 
                    type={job.jobType} 
                    salary={job.salaryRange}
                    posted="Recently"
                    onView={() => handleViewDetails(job)}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-12 bg-white/5 rounded-xl border border-white/10 text-slate-400">
                  <Icons.Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-500" />
                  Fetching latest opportunities...
                </div>
              )}
            </div>
          </section>

          {/* ALL JOBS & ADVANCED FILTERING */}
          <section id="all-jobs-section" className="scroll-mt-32">
            <div className="mb-10 border-b border-white/10 pb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Explore All Jobs</h2>
              <p className="text-slate-400">Use the filters to find the perfect role for you.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <div className="w-full lg:w-72 shrink-0 space-y-8">
                <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg sticky top-32">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Icons.Filter className="w-5 h-5 text-purple-400" /> Filters
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Job Type Filter */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Job Type</label>
                      <div className="space-y-2">
                        {["All", "Full-time", "Part-time", "Contract", "Internship"].map(type => (
                          <label key={type} className="flex items-center gap-3 cursor-pointer group">
                            <input 
                              type="radio" 
                              name="jobType" 
                              checked={filterJobType === type}
                              onChange={() => setFilterJobType(type)}
                              className="w-4 h-4 text-purple-500 bg-slate-800 border-slate-700 focus:ring-purple-500/50 focus:ring-offset-slate-900" 
                            />
                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Workplace Filter */}
                    <div className="pt-6 border-t border-slate-800">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Workplace Type</label>
                      <div className="space-y-2">
                        {["All", "Remote", "On-site", "Hybrid"].map(type => (
                          <label key={type} className="flex items-center gap-3 cursor-pointer group">
                            <input 
                              type="radio" 
                              name="workplaceType" 
                              checked={filterWorkplace === type}
                              onChange={() => setFilterWorkplace(type)}
                              className="w-4 h-4 text-purple-500 bg-slate-800 border-slate-700 focus:ring-purple-500/50 focus:ring-offset-slate-900" 
                            />
                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Salary Filter */}
                    <div className="pt-6 border-t border-slate-800">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Salary Info</label>
                      <div className="space-y-2">
                        {["All", "Disclosed", "Not Disclosed"].map(type => (
                          <label key={type} className="flex items-center gap-3 cursor-pointer group">
                            <input 
                              type="radio" 
                              name="salaryType" 
                              checked={filterSalary === type}
                              onChange={() => setFilterSalary(type)}
                              className="w-4 h-4 text-purple-500 bg-slate-800 border-slate-700 focus:ring-purple-500/50 focus:ring-offset-slate-900" 
                            />
                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jobs Grid */}
              <div className="flex-1">
                <div className="mb-6 flex justify-between items-center bg-slate-900/50 border border-white/5 rounded-xl p-4">
                  <p className="text-slate-300 font-medium">Showing <span className="text-white font-bold">{filteredJobs.length}</span> opportunities</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <JobCard 
                        key={job.id}
                        title={job.title} 
                        company={job.employerName} 
                        location={`${job.district || job.location}`} 
                        type={job.jobType} 
                        salary={job.salaryRange}
                        posted="Recently"
                        onView={() => handleViewDetails(job)}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-16 bg-slate-900/40 rounded-xl border border-white/10 text-slate-400">
                      <Icons.SearchX className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">No jobs found</h3>
                      <p className="text-slate-400">Try adjusting your filters or search criteria.</p>
                      <button onClick={() => { setSearchKeyword(''); setSearchLocation(''); setFilterJobType('All'); setFilterWorkplace('All'); setFilterSalary('All'); }} className="mt-6 text-purple-400 hover:text-purple-300 font-medium underline">
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Call To Actions (Candidate & Employer) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-purple-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center mb-6">
                  <Icons.UserPlus className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">I'm a Candidate</h3>
                <p className="text-slate-400 mb-8 max-w-sm">Create a stunning profile, upload your resume, and let top companies find you.</p>
                <Link href="/candidate/register" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-purple-400 rounded text-white font-bold transition-all">
                  Create Free Profile
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-pink-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-pink-900/50 border border-pink-500/50 flex items-center justify-center mb-6">
                  <Icons.Briefcase className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">I'm an Employer</h3>
                <p className="text-slate-400 mb-8 max-w-sm">Post a job in minutes and get access to thousands of qualified local professionals.</p>
                <Link href="/employer/post-job" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded text-white font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]">
                  Post a Job Now
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}

function JobCard({ title, company, location, type, salary, posted, onView }: { title: string, company: string, location: string, type: string, salary: string, posted: string, onView: () => void }) {
  return (
    <div 
      onClick={onView}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group hover:border-purple-500/50 hover:shadow-[0_15px_40px_rgba(168,85,247,0.25)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
             <Icons.Building2 className="w-6 h-6 text-slate-300" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors leading-tight mb-1">{title}</h3>
            <p className="text-purple-300/80 text-sm font-medium">{company}</p>
          </div>
        </div>
        <button className="text-slate-500 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); }}>
          <Icons.BookmarkPlus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 rounded flex items-center gap-1.5">
          <Icons.MapPin className="w-3 h-3 text-slate-400" /> {location}
        </span>
        <span className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 rounded flex items-center gap-1.5">
          <Icons.Clock className="w-3 h-3 text-slate-400" /> {type}
        </span>
        <span className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 rounded flex items-center gap-1.5">
          <Icons.Banknote className="w-3 h-3 text-slate-400" /> {salary}
        </span>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-xs text-slate-500">{posted}</span>
        <button onClick={(e) => { e.stopPropagation(); onView(); }} className="px-5 py-2 rounded bg-white/5 hover:bg-purple-600 text-slate-300 hover:text-white border border-white/10 hover:border-purple-500 font-medium text-sm transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          View Details
        </button>
      </div>
    </div>
  );
}
