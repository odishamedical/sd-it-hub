import React from "react";
import * as Icons from "lucide-react";
import Image from "next/image";

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: any;
  onApplyClick: () => void;
}

export default function JobDetailsModal({ isOpen, onClose, job, onApplyClick }: JobDetailsModalProps) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-slate-400 hover:text-white bg-slate-900/50 p-1 rounded-full backdrop-blur-md">
          <Icons.X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-950/50 shrink-0">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
              {job.logoUrl ? (
                <img src={job.logoUrl} alt={job.employerName} className="w-full h-full object-contain p-2" />
              ) : (
                <Icons.Building2 className="w-10 h-10 text-slate-400" />
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{job.title}</h2>
              <div className="flex items-center gap-2 text-purple-400 font-medium mb-4">
                <Icons.Building className="w-4 h-4" /> {job.employerName}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 rounded-md flex items-center gap-1.5">
                  <Icons.MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.district || job.location || "Not Specified"}
                </span>
                <span className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 rounded-md flex items-center gap-1.5">
                  <Icons.Clock className="w-3.5 h-3.5 text-slate-400" /> {job.jobType || "Full-time"}
                </span>
                <span className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 rounded-md flex items-center gap-1.5">
                  <Icons.Banknote className="w-3.5 h-3.5 text-slate-400" /> {job.salaryRange || "Not Disclosed"}
                </span>
                <span className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 rounded-md flex items-center gap-1.5">
                  <Icons.Laptop className="w-3.5 h-3.5 text-slate-400" /> {job.workplaceType || "On-site"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Description Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Icons.FileText className="w-5 h-5 text-purple-400" /> Job Description
          </h3>
          <div className="prose prose-invert prose-slate max-w-none text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {job.description || "No detailed description provided by the employer."}
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-6 border-t border-slate-800 bg-slate-950 shrink-0 flex justify-end items-center gap-4">
          <button onClick={onClose} className="px-6 py-3 rounded-lg text-slate-400 hover:text-white font-medium transition-colors">
            Cancel
          </button>
          <button 
            onClick={() => {
              onClose();
              onApplyClick();
            }} 
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2"
          >
            Apply for this Job <Icons.ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
