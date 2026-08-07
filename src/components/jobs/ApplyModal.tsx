import React, { useState } from "react";
import { db } from "@/utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import * as Icons from "lucide-react";
import { toast } from "react-hot-toast";

export default function ApplyModal({ isOpen, onClose, job }: { isOpen: boolean, onClose: () => void, job: any }) {
  const [step, setStep] = useState<"auth_check" | "register" | "apply">("auth_check");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeFile: null as File | null
  });

  if (!isOpen || !job) return null;

  const handleApply = async () => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "shyamdash_job_applications"), {
        jobId: job.id,
        jobTitle: job.title,
        employerId: job.employerId,
        seekerName: formData.fullName || "Guest Seeker",
        seekerEmail: formData.email,
        seekerPhone: formData.phone,
        status: "New",
        appliedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      toast.success("Application submitted successfully!");
      onClose();
    } catch (e) {
      console.error(e);
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <Icons.X className="w-5 h-5" />
        </button>

        <div className="p-6 border-b border-slate-800 bg-slate-950/50">
          <h2 className="text-xl font-bold text-white mb-1">Apply for {job.title}</h2>
          <p className="text-sm text-purple-400 font-medium">{job.employerName} • {job.district}</p>
        </div>

        <div className="p-6">
          {step === "auth_check" && (
            <div className="space-y-6 animate-in fade-in">
              <p className="text-slate-300">To apply for this position, you need a Candidate profile.</p>
              <div className="grid grid-cols-1 gap-4">
                <button onClick={() => setStep("register")} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Icons.UserPlus className="w-5 h-5" /> Create Candidate Profile
                </button>
                <button onClick={() => setStep("apply")} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Icons.LogIn className="w-5 h-5" /> I Already Have an Account
                </button>
              </div>
            </div>
          )}

          {step === "register" && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                <input value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Upload CV (PDF)</label>
                <input type="file" accept=".pdf" className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer" />
              </div>
              <div className="pt-4 flex justify-between">
                <button onClick={() => setStep("auth_check")} className="text-slate-400 hover:text-white text-sm font-bold">Back</button>
                <button onClick={handleApply} disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
                  {isSubmitting ? <Icons.Loader2 className="w-4 h-4 animate-spin" /> : "Submit Application"}
                </button>
              </div>
            </div>
          )}

          {step === "apply" && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <p className="text-slate-300">You are logged in. We will submit your existing Candidate Profile to <strong>{job.employerName}</strong>.</p>
              <div className="pt-4 flex justify-between">
                <button onClick={() => setStep("auth_check")} className="text-slate-400 hover:text-white text-sm font-bold">Back</button>
                <button onClick={handleApply} disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
                  {isSubmitting ? <Icons.Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Apply"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
