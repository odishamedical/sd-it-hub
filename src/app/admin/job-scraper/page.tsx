"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { doc, getDoc, setDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import * as Icons from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

type Mode = "auto" | "manual";

export default function JobScraperAdmin() {
  const [mode, setMode] = useState<Mode>("auto");

  // Auto Mode State
  const [queries, setQueries] = useState<string[]>([]);
  const [newQuery, setNewQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const MAX_QUERIES = 8;

  // Manual Mode State
  const [manualKeyword, setManualKeyword] = useState("");
  const [manualLocation, setManualLocation] = useState("");
  const [manualJobType, setManualJobType] = useState("");
  const [manualIndustry, setManualIndustry] = useState("");
  const [manualExperience, setManualExperience] = useState("");
  
  const [scrapedResults, setScrapedResults] = useState<any[]>([]);
  const [isScraping, setIsScraping] = useState(false);
  const [grabbingJobs, setGrabbingJobs] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const docRef = doc(db, "shyamdash_scraper_settings", "global");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().queries) {
        setQueries(docSnap.data().queries);
      } else {
        setQueries([
          "IT Services jobs in Odisha",
          "Healthcare jobs in Bhubaneswar",
          "Retail Management jobs in India"
        ]);
      }
    } catch (error) {
      console.error("Error fetching queries:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedQueries: string[]) => {
    setSaving(true);
    try {
      const docRef = doc(db, "shyamdash_scraper_settings", "global");
      await setDoc(docRef, { queries: updatedQueries }, { merge: true });
      setQueries(updatedQueries);
      toast.success("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving queries:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleAddQuery = () => {
    if (!newQuery.trim()) return;
    if (queries.length >= MAX_QUERIES) {
      toast.error(`Maximum of ${MAX_QUERIES} queries allowed.`);
      return;
    }
    if (queries.includes(newQuery.trim())) {
      toast.error("Query already exists.");
      return;
    }
    const updated = [...queries, newQuery.trim()];
    handleSave(updated);
    setNewQuery("");
  };

  const handleRemoveQuery = (indexToRemove: number) => {
    const updated = queries.filter((_, idx) => idx !== indexToRemove);
    handleSave(updated);
  };

  const handleManualSearch = async () => {
    if(!manualKeyword) return toast.error("Keyword is required");
    setIsScraping(true);
    setScrapedResults([]);
    
    // TODO: Connect to actual scraping backend API here
    // Simulating scraped data for now
    setTimeout(() => {
      setScrapedResults([
        { title: "Senior React Developer", company: "TechNova Solutions", location: manualLocation || "Bhubaneswar", salary: "$120k - $150k", jobType: manualJobType || "Full-time", url: "https://example.com/job1" },
        { title: "Frontend Engineer", company: "NextGen Apps", location: manualLocation || "Cuttack", salary: "₹8 LPA - ₹12 LPA", jobType: manualJobType || "Full-time", url: "https://example.com/job2" },
      ]);
      setIsScraping(false);
      toast.success("Found 2 jobs!");
    }, 2000);
  };

  const handleGrabJob = async (job: any, index: number) => {
    setGrabbingJobs(prev => ({...prev, [index]: true}));
    
    try {
      const jobsCol = collection(db, "shyamdash_jobs");
      
      // ANTI-DUPLICATION CHECK
      const q = query(
        jobsCol, 
        where("title", "==", job.title),
        where("employerName", "==", job.company),
        where("district", "==", job.location) // Using district as a generic location container for scraped jobs
      );
      
      const existing = await getDocs(q);
      
      if (!existing.empty) {
        toast.error("Duplicate detected! Job already exists.");
        setGrabbingJobs(prev => ({...prev, [index]: false}));
        return;
      }
      
      // Inject into DB
      await addDoc(jobsCol, {
        employerId: "SYSTEM_SCRAPER",
        employerName: job.company,
        title: job.title,
        jobType: job.jobType,
        salaryRange: job.salary,
        district: job.location,
        country: "India",
        state: "Odisha",
        block: "",
        industryCategory: manualIndustry || "Other",
        status: 'Active',
        sourceUrl: job.url,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      toast.success("Job grabbed successfully!");
      // Remove from list
      setScrapedResults(prev => prev.filter((_, i) => i !== index));
      
    } catch (e) {
      console.error(e);
      toast.error("Failed to grab job");
    } finally {
      setGrabbingJobs(prev => ({...prev, [index]: false}));
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center h-full">
        <Icons.Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  const progressPercentage = (queries.length / MAX_QUERIES) * 100;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Toaster position="top-right" />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
            <Icons.Bot className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Jobs Aggregator Engine</h1>
            <p className="text-slate-400 text-sm mt-1">Manage automated daily queries and manually grab specific jobs.</p>
          </div>
        </div>
        
        {/* Mode Switcher */}
        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
          <button 
            onClick={() => setMode("auto")}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${mode === "auto" ? "bg-emerald-500 text-slate-950 shadow-lg" : "text-slate-400 hover:text-white"}`}
          >
            Auto Scraper (Cron)
          </button>
          <button 
            onClick={() => setMode("manual")}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${mode === "manual" ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
          >
            Manual Grabber
          </button>
        </div>
      </div>

      {mode === "auto" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Active Daily Queries</h2>
              
              <div className="space-y-3 mb-6">
                {queries.length === 0 ? (
                  <div className="p-4 text-center rounded-xl bg-slate-800/50 border border-slate-700/50 border-dashed text-slate-400 text-sm">
                    No active queries. Add one below to start scraping jobs.
                  </div>
                ) : (
                  queries.map((q, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-400 font-medium">
                          {idx + 1}
                        </div>
                        <span className="text-slate-300 text-sm font-medium">{q}</span>
                      </div>
                      <button 
                        onClick={() => handleRemoveQuery(idx)}
                        disabled={saving}
                        className="text-slate-400 hover:text-red-400 p-1 transition-colors"
                        title="Remove Query"
                      >
                        <Icons.Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={newQuery}
                  onChange={(e) => setNewQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddQuery()}
                  placeholder="e.g., Receptionist jobs in Cuttack"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  disabled={queries.length >= MAX_QUERIES || saving}
                />
                <button 
                  onClick={handleAddQuery}
                  disabled={queries.length >= MAX_QUERIES || saving || !newQuery.trim()}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  {saving ? <Icons.Loader2 className="w-4 h-4 animate-spin" /> : <Icons.Plus className="w-4 h-4" />}
                  Add Query
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Capacity Tracker</h3>
              
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-white">{queries.length}</span>
                <span className="text-sm text-slate-500 font-medium mb-1">/ {MAX_QUERIES} queries</span>
              </div>
              
              <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${queries.length >= MAX_QUERIES ? 'bg-amber-400' : 'bg-emerald-500'}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Your free tier allows approximately 8 searches per day to stay safely under the 250 requests/month limit.
              </p>
            </div>
            
            <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-5">
              <div className="flex gap-3">
                <Icons.Info className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-sky-400 mb-1">How it works</h4>
                  <p className="text-xs text-sky-200/70 leading-relaxed">
                    The Google Cloud engine wakes up every night at 2:00 AM IST. It reads these queries and scrapes Google for fresh jobs matching them, then automatically updates your Universal Job Board.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === "manual" && (
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Manual Search Grabber</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Job Keyword *</label>
              <input type="text" value={manualKeyword} onChange={e => setManualKeyword(e.target.value)} placeholder="e.g. Software Engineer" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Location</label>
              <input type="text" value={manualLocation} onChange={e => setManualLocation(e.target.value)} placeholder="e.g. Bhubaneswar" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Industry</label>
              <select value={manualIndustry} onChange={e => setManualIndustry(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none">
                <option value="">Any Industry</option>
                <option value="IT Services">IT Services</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Retail">Retail</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Job Type</label>
              <select value={manualJobType} onChange={e => setManualJobType(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none">
                <option value="">Any Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Experience</label>
              <select value={manualExperience} onChange={e => setManualExperience(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none">
                <option value="">Any Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1-3 Years">1-3 Years</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={handleManualSearch}
                disabled={isScraping || !manualKeyword}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isScraping ? <Icons.Loader2 className="w-4 h-4 animate-spin" /> : <Icons.Search className="w-4 h-4" />}
                Search Jobs
              </button>
            </div>
          </div>

          {/* Results List */}
          {scrapedResults.length > 0 && (
            <div className="mt-8 border-t border-slate-800 pt-6">
              <h3 className="text-sm font-bold text-white mb-4">Scraped Results ({scrapedResults.length})</h3>
              <div className="space-y-4">
                {scrapedResults.map((job, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <h4 className="font-bold text-indigo-400">{job.title}</h4>
                      <p className="text-sm text-slate-400">{job.company} • {job.location}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[10px] uppercase font-bold px-2 py-1 bg-slate-800 rounded text-slate-300">{job.jobType}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-1 bg-slate-800 rounded text-slate-300">{job.salary}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleGrabJob(job, idx)}
                      disabled={grabbingJobs[idx]}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                      {grabbingJobs[idx] ? <Icons.Loader2 className="w-4 h-4 animate-spin" /> : <Icons.Download className="w-4 h-4" />}
                      Grab to DB
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
