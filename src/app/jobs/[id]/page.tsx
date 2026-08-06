"use client";

import React from "react";
import { MapPin, Briefcase, Clock, Building2, ShieldCheck, Share2, Bookmark, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock Data
const JOB = {
  id: "job-1", 
  title: "Senior React Developer", 
  company: "Acme Corp", 
  aboutCompany: "Acme Corp is a leading IT Services provider specializing in cloud-native applications and enterprise digital transformation. We work with Fortune 500 companies to deliver scalable solutions.",
  location: "Remote (India)", 
  type: "Full-time", 
  industry: "IT Services", 
  salary: "₹30L - ₹40L", 
  posted: "2 days ago", 
  logo: "https://ui-avatars.com/api/?name=Acme+Corp&background=random", 
  verified: true,
  applicants: 124,
  vacancies: 2,
  experience: "5-8 Years",
  skills: ["React", "TypeScript", "Node.js", "Redux", "AWS", "System Design"],
  description: `We are looking for an experienced Senior React Developer to lead our frontend architecture and mentor junior developers. 

**Key Responsibilities:**
- Architect and develop scalable, high-performance web applications using React and Next.js.
- Collaborate with cross-functional teams (Design, Product, Backend) to deliver intuitive user experiences.
- Optimize application performance and ensure high availability.
- Mentor junior engineers and conduct code reviews.
- Participate in agile ceremonies and sprint planning.

**What We Offer:**
- Competitive salary and performance bonuses.
- Comprehensive health insurance for you and your family.
- Flexible working hours and remote-first culture.
- Annual learning and development budget.`
};

export default function JobDetail() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-24">
      
      {/* Navbar Mockup */}
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/jobs" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-slate-950" />
            </div>
            <h1 className="font-bold text-xl tracking-tight">Shyamdash <span className="text-blue-400">Jobs</span></h1>
          </Link>
          <div className="flex items-center gap-4">
             <Link href="/candidate/onboarding" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Sign In</Link>
             <Link href="/employer/onboarding" className="text-sm font-bold bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors">Post a Job</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-12">
        
        {/* Back Link */}
        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors">
           &larr; Back to all jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Card */}
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
               {/* Decorative Glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>

               <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                  <div className="flex items-start gap-6">
                     <div className="w-20 h-20 bg-white/5 rounded-2xl border border-white/10 overflow-hidden shrink-0">
                        <Image src={JOB.logo} alt={JOB.company} width={80} height={80} className="object-cover" />
                     </div>
                     <div>
                        <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{JOB.title}</h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-400 font-medium">
                           <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {JOB.company} {JOB.verified && <ShieldCheck className="w-4 h-4 text-teal-400"/>}</span>
                           <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {JOB.location}</span>
                           <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Posted {JOB.posted}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                     <button className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                        <Share2 className="w-5 h-5" />
                     </button>
                     <button className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                        <Bookmark className="w-5 h-5" />
                     </button>
                  </div>
               </div>

               <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-4">
                  <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 flex-1 min-w-[140px]">
                     <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Salary</span>
                     <span className="font-bold text-green-400">{JOB.salary}</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 flex-1 min-w-[140px]">
                     <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Experience</span>
                     <span className="font-bold text-white">{JOB.experience}</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 flex-1 min-w-[140px]">
                     <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Job Type</span>
                     <span className="font-bold text-white">{JOB.type}</span>
                  </div>
               </div>
            </div>

            {/* Description & Skills */}
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-8">
               <div>
                  <h2 className="text-xl font-bold mb-4">Required Skills</h2>
                  <div className="flex flex-wrap gap-2">
                     {JOB.skills.map(skill => (
                        <span key={skill} className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-sm font-bold">
                           {skill}
                        </span>
                     ))}
                  </div>
               </div>

               <div>
                  <h2 className="text-xl font-bold mb-4">Job Description</h2>
                  <div className="prose prose-invert max-w-none text-slate-300">
                     <p className="whitespace-pre-wrap leading-relaxed">{JOB.description}</p>
                  </div>
               </div>
            </div>
            
          </div>
          
          {/* Right Sidebar */}
          <aside className="space-y-6">
             {/* Sticky Apply Box */}
             <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                   <div className="text-sm">
                      <span className="block text-slate-400 mb-1">Applicants</span>
                      <span className="font-bold text-white text-lg">{JOB.applicants}</span>
                   </div>
                   <div className="w-px h-10 bg-white/10"></div>
                   <div className="text-sm">
                      <span className="block text-slate-400 mb-1">Vacancies</span>
                      <span className="font-bold text-white text-lg">{JOB.vacancies}</span>
                   </div>
                </div>
                
                <button className="w-full bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2 group">
                   1-Click Apply
                   <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-center text-slate-500 mt-4">
                   Your Universal Shyamdash Profile will be securely shared with the employer.
                </p>
             </div>

             {/* About Company */}
             <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
                <h3 className="font-bold text-lg mb-4">About the Employer</h3>
                <div className="flex items-center gap-4 mb-4">
                   <Image src={JOB.logo} alt={JOB.company} width={48} height={48} className="rounded-xl" />
                   <div>
                      <h4 className="font-bold">{JOB.company}</h4>
                      <Link href="#" className="text-xs text-blue-400 hover:underline">View Profile</Link>
                   </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                   {JOB.aboutCompany}
                </p>
             </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
