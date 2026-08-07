import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }: { params: { state: string, district: string, industry: string } }) {
  const formatText = (str: string) => str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const industry = formatText(params.industry);
  const district = formatText(params.district);
  const state = formatText(params.state);

  return {
    title: `Latest ${industry} Jobs in ${district}, ${state} | ShyamDash Jobs`,
    description: `Find the best ${industry} jobs in ${district}, ${state}. Browse thousands of local and remote opportunities and apply today on ShyamDash.`,
  };
}

export default async function IndustryJobsPage({ params }: { params: { state: string, district: string, industry: string } }) {
  const formatText = (str: string) => str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const industry = formatText(params.industry);
  const district = formatText(params.district);
  const state = formatText(params.state);

  return (
    <main className="min-h-screen bg-[#020610] text-slate-200">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-20 mt-10">
        <div className="mb-12">
          <Link href="/jobs" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-2 mb-4">
            <Icons.ArrowLeft className="w-4 h-4" /> Back to All Jobs
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {industry} Jobs in <span className="text-purple-400">{district}, {state}</span>
          </h1>
          <p className="text-slate-400 text-lg">Browse the latest active roles and apply directly.</p>
        </div>

        {/* TODO: Add Firebase Fetch for shyamdash_jobs where state=params.state, district=params.district, industryCategory=params.industry */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mock Job Card for Layout */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-purple-500/50 transition-colors">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-xl text-white mb-1">Senior {industry} Professional</h3>
                <p className="text-purple-400 font-medium text-sm">TechCorp Local</p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded text-xs font-bold self-start">Active</span>
            </div>
            <div className="flex gap-4 my-4 text-sm text-slate-400">
              <span className="flex items-center gap-1"><Icons.MapPin className="w-4 h-4" /> {district}, {state}</span>
              <span className="flex items-center gap-1"><Icons.Briefcase className="w-4 h-4" /> Full-Time</span>
            </div>
            <Link 
              href={`/jobs/india/${params.state}/${params.district}/${params.industry}/senior-${params.industry.toLowerCase()}-professional`}
              className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded font-bold transition-colors"
            >
              View Job Details
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
