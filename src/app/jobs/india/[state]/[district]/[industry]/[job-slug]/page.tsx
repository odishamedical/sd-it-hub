import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export async function generateMetadata({ params }: { params: { state: string, district: string, industry: string, 'job-slug': string } }) {
  const formatText = (str: string) => str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const jobTitle = formatText(params['job-slug']);
  const district = formatText(params.district);
  const state = formatText(params.state);

  return {
    title: `${jobTitle} Job in ${district}, ${state} | ShyamDash Jobs`,
    description: `Apply for the ${jobTitle} role in ${district}, ${state}. View salary, requirements, and apply online today.`,
  };
}

export default async function JobTicketPage({ params }: { params: { state: string, district: string, industry: string, 'job-slug': string } }) {
  const formatText = (str: string) => str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const jobTitle = formatText(params['job-slug']);
  const industry = formatText(params.industry);
  const district = formatText(params.district);
  const state = formatText(params.state);

  // JSON-LD Google Job Posting Schema
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": jobTitle,
    "description": `We are looking for a dedicated ${jobTitle} to join our team in ${district}. Apply now via ShyamDash.`,
    "datePosted": new Date().toISOString(),
    "validThrough": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "TechCorp Local",
      "sameAs": "https://shyamdash.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": district,
        "addressRegion": state,
        "addressCountry": "IN"
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#020610] text-slate-200">
      {/* Inject Google Jobs Schema */}
      <Script
        id="job-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-20 mt-10">
        <Link 
          href={`/jobs/india/${params.state}/${params.district}/${params.industry}`} 
          className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-2 mb-8"
        >
          <Icons.ArrowLeft className="w-4 h-4" /> Back to {industry} Jobs in {district}
        </Link>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-white/10 pb-8">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">{jobTitle}</h1>
              <p className="text-xl text-purple-400 font-medium">TechCorp Local</p>
            </div>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all">
              Apply Now
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <Icons.MapPin className="w-5 h-5 text-slate-400 mb-2" />
              <p className="text-sm text-slate-500 font-medium">Location</p>
              <p className="font-bold text-white">{district}, {state}</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <Icons.Briefcase className="w-5 h-5 text-slate-400 mb-2" />
              <p className="text-sm text-slate-500 font-medium">Job Type</p>
              <p className="font-bold text-white">Full-Time</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <Icons.Banknote className="w-5 h-5 text-slate-400 mb-2" />
              <p className="text-sm text-slate-500 font-medium">Salary</p>
              <p className="font-bold text-white">₹8L - ₹12L</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <Icons.Monitor className="w-5 h-5 text-slate-400 mb-2" />
              <p className="text-sm text-slate-500 font-medium">Workplace</p>
              <p className="font-bold text-white">On-site</p>
            </div>
          </div>
          
          <div className="space-y-6 text-slate-300 leading-relaxed">
            <h2 className="text-2xl font-bold text-white">Job Description</h2>
            <p>
              We are seeking a highly skilled {jobTitle} to join our growing team in {district}. 
              In this role, you will be responsible for building robust scalable architectures and driving 
              product innovation.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-6">Requirements</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>3+ years of proven experience in the {industry} sector.</li>
              <li>Strong communication and analytical skills.</li>
              <li>Ability to work independently and as part of a hyper-local team in {state}.</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
