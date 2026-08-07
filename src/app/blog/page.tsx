import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function KnowledgeHubPage() {
  return (
    <main className="min-h-screen bg-[#020610] text-slate-200 font-sans selection:bg-emerald-500/30">
      
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
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wide text-emerald-200 uppercase">ShyamDash Knowledge Hub</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-xl">
              Insights to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Accelerate</span> Your Success
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
              Expert tips, industry analysis, and comprehensive guides to help you grow your business and advance your career.
            </p>
            
            {/* Single Input Search Bar for Blog */}
            <div className="flex flex-col sm:flex-row gap-2 bg-white/10 backdrop-blur-xl p-2 rounded-lg border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] mb-6 w-full">
              <div className="flex-1 relative flex items-center bg-[#0a0f1c]/80 rounded p-1 border border-slate-700 focus-within:border-emerald-500 transition-colors">
                <Icons.Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input type="text" placeholder="Search articles, topics, or authors..." className="w-full bg-transparent border-none text-white p-3 focus:outline-none placeholder-slate-500" />
              </div>
              <button className="px-8 py-3 bg-gradient-to-b from-emerald-500 to-emerald-700 hover:to-emerald-600 text-white font-bold rounded shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.8)] transition-all">
                Search
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-slate-400">Trending Topics:</span>
              <span className="px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 rounded hover:bg-emerald-500/20 cursor-pointer transition-colors">SEO Strategies</span>
              <span className="px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 rounded hover:bg-emerald-500/20 cursor-pointer transition-colors">Web Development</span>
              <span className="px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 rounded hover:bg-emerald-500/20 cursor-pointer transition-colors">Interview Prep</span>
            </div>
          </div>
          
          {/* Right Content - Hero Image (Masked) */}
          <div className="w-full lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-[450px]">
            {/* Fading Masks matching Home Page */}
            <div className="absolute inset-0 left-0 bg-gradient-to-r from-[#020610] via-transparent to-transparent z-10 w-1/3" />
            <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-[#020610] via-transparent to-transparent z-10 h-1/4" />
            <Image 
              src="/stock/hero_knowledge.png" 
              alt="Knowledge Hub & Blog" 
              fill 
              className="object-cover object-right rounded-2xl lg:rounded-l-none lg:rounded-r-2xl"
              priority
            />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 relative z-10">
          
          {/* Categories Row */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ArticleCategoryCard title="Business Growth" icon={<Icons.TrendingUp className="w-5 h-5 text-emerald-400" />} />
              <ArticleCategoryCard title="Tech & Development" icon={<Icons.Code className="w-5 h-5 text-cyan-400" />} />
              <ArticleCategoryCard title="Career Advice" icon={<Icons.Briefcase className="w-5 h-5 text-purple-400" />} />
              <ArticleCategoryCard title="Digital Marketing" icon={<Icons.Megaphone className="w-5 h-5 text-orange-400" />} />
            </div>
          </section>

          {/* Featured Articles */}
          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Featured Guides & Tips</h2>
                <p className="text-slate-400">Our most popular and impactful articles.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded bg-white/10 text-white font-medium text-sm border border-white/20 backdrop-blur-md">Editor's Picks</button>
                <button className="px-4 py-2 rounded text-slate-400 hover:bg-white/5 hover:text-white font-medium text-sm transition-colors">Latest Posts</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ArticleCard 
                title="10 Proven Strategies to Boost Your Local SEO" 
                excerpt="Learn how to rank higher on Google Maps and attract more customers to your storefront this year."
                category="Marketing" 
                author="Sarah Jenkins"
                readTime="5 min read"
                date="Aug 12, 2026"
              />
              <ArticleCard 
                title="The Future of Web Development: Next.js 15" 
                excerpt="An in-depth look at the new features in Next.js 15 and how server components are changing the landscape."
                category="Technology" 
                author="Michael Chen"
                readTime="8 min read"
                date="Aug 10, 2026"
                featured={true}
              />
              <ArticleCard 
                title="How to Ace Your Remote Technical Interview" 
                excerpt="Master the art of virtual whiteboarding and behavioral questions with these expert tips."
                category="Career Advice" 
                author="David Thorne"
                readTime="6 min read"
                date="Aug 05, 2026"
              />
              <ArticleCard 
                title="Building a Scalable Microservices Architecture" 
                excerpt="A step-by-step guide to decoupling your monolithic application into manageable microservices."
                category="Technology" 
                author="Priya Patel"
                readTime="12 min read"
                date="Aug 02, 2026"
              />
              <ArticleCard 
                title="Email Marketing Automation Best Practices" 
                excerpt="Increase your conversion rates by setting up smart, behavior-triggered email campaigns."
                category="Marketing" 
                author="Sarah Jenkins"
                readTime="7 min read"
                date="Jul 28, 2026"
              />
              <ArticleCard 
                title="Navigating Salary Negotiations in 2026" 
                excerpt="Don't leave money on the table. Here is how to research your market value and ask for what you deserve."
                category="Career Advice" 
                author="David Thorne"
                readTime="4 min read"
                date="Jul 22, 2026"
              />
            </div>
            
            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded text-white font-medium transition-all hover:border-white/40 shadow-lg">
                Load More Articles
              </button>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="bg-gradient-to-br from-[#0a1622] to-[#040914] backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-8 md:p-16 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <Icons.Mail className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Never Miss an Update</h2>
              <p className="text-slate-300 mb-8">Join over 10,000 subscribers and get the best business insights, tech tutorials, and career tips delivered straight to your inbox.</p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="email" placeholder="Enter your email address" className="flex-1 bg-white/5 border border-white/10 text-white rounded p-4 focus:outline-none focus:border-emerald-500 transition-colors" />
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 rounded text-white font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]">
                  Subscribe Now
                </button>
              </div>
              <p className="text-slate-500 text-xs mt-4">We care about your data. Read our Privacy Policy.</p>
            </div>
          </section>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}

function ArticleCategoryCard({ title, icon }: { title: string, icon: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-lg hover:border-emerald-500/50 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center gap-3 group">
      <div className="p-2 rounded bg-slate-800/80 border border-white/5 group-hover:border-emerald-500/30 transition-colors">
        {icon}
      </div>
      <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{title}</span>
    </div>
  );
}

function ArticleCard({ title, excerpt, category, author, readTime, date, featured = false }: { title: string, excerpt: string, category: string, author: string, readTime: string, date: string, featured?: boolean }) {
  return (
    <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] group hover:shadow-[0_15px_40px_rgba(16,185,129,0.2)] hover:-translate-y-2 transition-all duration-300 flex flex-col ${featured ? 'border border-emerald-500/50' : 'border border-white/20 hover:border-emerald-500/30'}`}>
      <div className="h-48 relative bg-slate-800 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity"></div>
        <Image src="/stock/job.png" alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal" />
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 text-xs font-bold text-emerald-950 bg-emerald-400 rounded shadow-md">{category}</span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4 z-20">
            <span className="px-2 py-1 text-xs font-bold text-amber-900 bg-amber-400 rounded shadow-md flex items-center gap-1">
              <Icons.Star className="w-3 h-3 fill-amber-900" /> Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-xl text-white group-hover:text-emerald-400 transition-colors leading-tight mb-3 line-clamp-2">{title}</h3>
          <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">{excerpt}</p>
        </div>
        
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
              {author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-white leading-none mb-1">{author}</p>
              <p className="text-xs text-slate-500 leading-none">{date}</p>
            </div>
          </div>
          <div className="text-xs font-medium text-emerald-400/80 bg-emerald-400/10 px-2 py-1 rounded">
            {readTime}
          </div>
        </div>
      </div>
    </div>
  );
}
