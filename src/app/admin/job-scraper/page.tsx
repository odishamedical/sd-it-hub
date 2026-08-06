"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as Icons from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

export default function JobScraperAdmin() {
  const [queries, setQueries] = useState<string[]>([]);
  const [newQuery, setNewQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const MAX_QUERIES = 8;

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
        // Fallback defaults if document doesn't exist yet
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
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
          <Icons.Bot className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Google Jobs Aggregator</h1>
          <p className="text-slate-400 text-sm mt-1">Manage the automated daily search queries for the job board.</p>
        </div>
      </div>

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
    </div>
  );
}
