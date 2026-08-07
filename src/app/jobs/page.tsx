import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-[#020610] text-slate-200 font-sans selection:bg-purple-500/30">
      
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
                <input type="text" placeholder="Job title, keyword, or company" className="w-full bg-transparent border-none text-white p-3 focus:outline-none placeholder-slate-500" />
              </div>
              <div className="flex-1 relative flex items-center bg-[#0a0f1c]/80 rounded p-1 border border-slate-700 focus-within:border-purple-500 transition-colors">
                <Icons.MapPin className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input type="text" placeholder="City, state, or Remote" className="w-full bg-transparent border-none text-white p-3 focus:outline-none placeholder-slate-500" />
              </div>
              <button className="px-8 py-3 bg-gradient-to-b from-purple-500 to-purple-700 hover:to-purple-600 text-white font-bold rounded shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-all">
                Find Jobs
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-slate-400 font-medium items-center">
              <span>Popular:</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white cursor-pointer transition-colors">Software Engineer</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white cursor-pointer transition-colors">Marketing</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white cursor-pointer transition-colors">Remote</span>
            </div>
          </div>
          
          {/* Right Content - Hero Image (Masked) */}
          <div className="w-full lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-[450px]">
            {/* Fading Masks matching Home Page */}
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
          
          {/* Categories Grid */}
          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Browse by Category</h2>
                <p className="text-slate-400">Find the role that perfectly matches your skills.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded bg-purple-600/20 text-purple-400 border border-purple-500/30 font-medium text-sm hover:bg-purple-600/40 transition-colors">All Categories</button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <JobCategoryCard title="Technology & IT" count="2,415 Jobs" icon={<Icons.Monitor className="w-6 h-6 text-purple-400" />} />
              <JobCategoryCard title="Marketing & Sales" count="1,842 Jobs" icon={<Icons.Megaphone className="w-6 h-6 text-pink-400" />} />
              <JobCategoryCard title="Design & Creative" count="950 Jobs" icon={<Icons.PenTool className="w-6 h-6 text-blue-400" />} />
              <JobCategoryCard title="Finance & Admin" count="1,105 Jobs" icon={<Icons.PieChart className="w-6 h-6 text-emerald-400" />} />
              <JobCategoryCard title="Healthcare" count="3,210 Jobs" icon={<Icons.HeartPulse className="w-6 h-6 text-red-400" />} />
              <JobCategoryCard title="Education" count="875 Jobs" icon={<Icons.BookOpen className="w-6 h-6 text-amber-400" />} />
              <JobCategoryCard title="Customer Support" count="1,540 Jobs" icon={<Icons.Headphones className="w-6 h-6 text-indigo-400" />} />
              <JobCategoryCard title="Human Resources" count="620 Jobs" icon={<Icons.Users className="w-6 h-6 text-orange-400" />} />
            </div>
          </section>

          {/* Featured Jobs */}
          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Featured Opportunities</h2>
                <p className="text-slate-400">Hand-picked premium roles available right now.</p>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:px-0 md:pb-0 md:mx-0 hide-scrollbar">
                <button className="whitespace-nowrap px-4 py-2 rounded bg-white/10 text-white font-medium text-sm border border-white/20 backdrop-blur-md">Latest</button>
                <button className="whitespace-nowrap px-4 py-2 rounded text-slate-400 hover:bg-white/5 hover:text-white font-medium text-sm transition-colors">Remote Only</button>
                <button className="whitespace-nowrap px-4 py-2 rounded text-slate-400 hover:bg-white/5 hover:text-white font-medium text-sm transition-colors">Full-Time</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <JobCard 
                title="Senior React Developer" 
                company="TechVision Corp" 
                location="Remote / Sambalpur" 
                type="Full-Time" 
                salary="₹12L - ₹18L / year"
                posted="2 days ago"
              />
              <JobCard 
                title="Digital Marketing Lead" 
                company="Creative Nexus" 
                location="Bhubaneswar, Odisha" 
                type="Full-Time" 
                salary="₹8L - ₹12L / year"
                posted="5 hours ago"
              />
              <JobCard 
                title="UI/UX Product Designer" 
                company="Innovate Apps" 
                location="Remote" 
                type="Contract" 
                salary="₹60,000 / month"
                posted="1 day ago"
              />
              <JobCard 
                title="Customer Success Manager" 
                company="Global Services Inc" 
                location="Sambalpur, Odisha" 
                type="Full-Time" 
                salary="₹4L - ₹6L / year"
                posted="Just now"
              />
            </div>
            
            <div className="mt-10 text-center">
              <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded text-white font-medium transition-all hover:border-white/40 shadow-lg">
                View All 10,000+ Jobs
              </button>
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

function JobCategoryCard({ title, count, icon }: { title: string, count: string, icon: React.ReactNode }) {
  return (
    <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-white/30 hover:shadow-[0_15px_40px_rgba(168,85,247,0.2)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 cursor-pointer relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
      <div className="w-10 h-10 rounded-lg bg-slate-900/80 border border-white/10 flex items-center justify-center relative z-10 group-hover:border-purple-500/50 transition-colors shadow-inner">
        {icon}
      </div>
      <div className="relative z-10 mt-2">
        <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">{title}</h3>
        <p className="text-slate-400 text-xs mt-1">{count}</p>
      </div>
    </div>
  );
}

function JobCard({ title, company, location, type, salary, posted }: { title: string, company: string, location: string, type: string, salary: string, posted: string }) {
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group hover:border-purple-500/50 hover:shadow-[0_15px_40px_rgba(168,85,247,0.25)] hover:-translate-y-1 transition-all duration-300">
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
        <button className="text-slate-500 hover:text-white transition-colors">
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
        <button className="px-5 py-2 rounded bg-white/5 hover:bg-purple-600 text-slate-300 hover:text-white border border-white/10 hover:border-purple-500 font-medium text-sm transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          Apply Now
        </button>
      </div>
    </div>
  );
}
