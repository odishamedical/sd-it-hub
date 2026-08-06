import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRight, Mail, Newspaper } from "lucide-react";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Header />
      
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
        
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {children}
        </div>

        {/* Blog Sidebar */}
        <aside className="w-full lg:w-[350px] shrink-0 space-y-8">
          
          {/* Lead Capture Form */}
          <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 rounded-3xl p-6 border border-indigo-500/20 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Mail className="w-24 h-24 text-indigo-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Join Our Newsletter</h3>
            <p className="text-slate-400 text-sm mb-6 relative z-10">Get the latest insights on tech and business delivered straight to your inbox.</p>
            
            <form className="relative z-10 flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-white"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)]"
              >
                Subscribe Now
              </button>
            </form>
          </div>

          {/* Popular Topics List */}
          <div className="bg-slate-900/50 rounded-3xl p-6 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-indigo-400" />
              Popular Topics
            </h3>
            <div className="space-y-1">
              {[
                { name: "Digital Influencing", slug: "digital-influencing" },
                { name: "Social Media Promotion", slug: "social-media-promotion" },
                { name: "Marketing & Sales", slug: "marketing-salesman-training" },
                { name: "Freelancing", slug: "freelancing-digital-age" }
              ].map(topic => (
                <Link 
                  key={topic.slug} 
                  href={`/blog/${topic.slug}`}
                  className="flex items-center justify-between group p-3 hover:bg-slate-800/50 rounded-xl transition-colors"
                >
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white">{topic.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-indigo-600 rounded-3xl p-8 text-center relative overflow-hidden group cursor-pointer hover:bg-indigo-500 transition-colors">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Need Custom IT Solutions?</h3>
            <p className="text-indigo-200 text-sm mb-6 relative z-10">Transform your business with our enterprise-grade services.</p>
            <Link href="/contact" className="inline-block bg-white text-indigo-950 font-bold px-6 py-2.5 rounded-full text-sm hover:scale-105 transition-transform relative z-10">
              Contact Us
            </Link>
          </div>

        </aside>
      </div>
      
      <Footer />
    </div>
  );
}
