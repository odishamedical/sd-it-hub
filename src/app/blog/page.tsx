import React from "react";
import Link from "next/link";
import { BookOpen, TrendingUp, MonitorPlay, Target, Laptop, Smartphone, Database, Users, Briefcase } from "lucide-react";

export const metadata = {
  title: "Knowledge Hub | Shyam Dash IT Hub",
  description: "Explore our comprehensive library of insights on digital marketing, software development, content creation, and modern business technology.",
};

const topics = [
  {
    title: "Digital Influencing & Content Creation",
    slug: "digital-influencing",
    description: "Understand the mechanics of the creator economy and how authentic content drives modern brand awareness.",
    icon: <MonitorPlay className="w-8 h-8 text-indigo-400" />,
    color: "from-indigo-500/20 to-purple-500/20",
    border: "border-indigo-500/30"
  },
  {
    title: "Social Media Promotion",
    slug: "social-media-promotion",
    description: "Deep dive into organic growth strategies, algorithmic reach, and targeted advertising on today's platforms.",
    icon: <TrendingUp className="w-8 h-8 text-pink-400" />,
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30"
  },
  {
    title: "Graphic & Video Generation",
    slug: "graphic-video-generation",
    description: "The psychology of visual storytelling. Learn how compelling imagery and video capture human attention.",
    icon: <Target className="w-8 h-8 text-emerald-400" />,
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30"
  },
  {
    title: "Marketing & Salesman Training",
    slug: "marketing-salesman-training",
    description: "Modern sales psychology meets digital tools. Empowering human connection in a digital-first world.",
    icon: <Users className="w-8 h-8 text-amber-400" />,
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30"
  },
  {
    title: "Freelancing in the Digital Age",
    slug: "freelancing-digital-age",
    description: "Navigating the gig economy, remote work culture, and how independence fuels global innovation.",
    icon: <Briefcase className="w-8 h-8 text-blue-400" />,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30"
  },
  {
    title: "Website & Software Development",
    slug: "website-software-development",
    description: "From simple landing pages to complex SaaS architectures. Understanding the backbone of the digital web.",
    icon: <Laptop className="w-8 h-8 text-slate-300" />,
    color: "from-slate-500/20 to-gray-500/20",
    border: "border-slate-500/30"
  }
];

export default function KnowledgeHub() {
  return (
    <>
      <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center justify-center p-2 bg-indigo-500/10 rounded-2xl mb-6 ring-1 ring-indigo-500/20">
              <BookOpen className="w-5 h-5 text-indigo-400 mr-2" />
              <span className="text-sm font-medium text-indigo-300">Open Resource Library</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Technology & Digital Business Knowledge Hub
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Explore our curated collection of insights, strategies, and deep dives into the technologies shaping modern business. Written by humans, for humans.
            </p>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <Link 
                href={`/blog/${topic.slug}`} 
                key={topic.slug}
                className={`group relative flex flex-col p-8 rounded-3xl bg-slate-900/50 backdrop-blur-sm border ${topic.border} hover:bg-slate-800/50 transition-all duration-300 overflow-hidden`}
              >
                {/* Background Gradient Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                
                <div className="mb-6 p-4 rounded-2xl bg-slate-950/50 inline-flex self-start ring-1 ring-white/5 group-hover:scale-110 transition-transform duration-300">
                  {topic.icon}
                </div>
                
                <h3 className="text-2xl font-semibold text-slate-100 mb-3 group-hover:text-white">
                  {topic.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                  {topic.description}
                </p>

                <div className="mt-8 flex items-center text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  Read Article
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action for more content */}
          <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-slate-900 border border-indigo-500/20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">Need personalized guidance?</h2>
              <p className="text-slate-400 mb-8">
                While our knowledge hub provides foundational understanding, every organization's digital journey is unique. Reach out to our experts for a tailored consultation.
              </p>
              <Link 
                href="/contact"
                className="inline-flex justify-center px-8 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
              >
                Speak with an Expert
              </Link>
            </div>
          </div>

    </>
  );
}
