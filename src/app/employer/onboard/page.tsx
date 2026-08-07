"use client";

import React, { useState } from "react";
import { db } from "@/utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import * as Icons from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EmployerOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    companyName: "",
    industryCategory: "",
    companySize: "",
    country: "India",
    state: "",
    district: "",
    block: "",
    localAddress: "",
    pincode: "",
    gstin: "",
    hrContactName: "",
    hrContactPhone: "",
    hrContactEmail: "",
    jobTitle: "",
    jobType: "Full-time",
    salaryRange: "",
    workplaceType: "On-site"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // 1. Create Employer Profile
      const employerRef = await addDoc(collection(db, "shyamdash_employer_profiles"), {
        id: `EMP_${Date.now()}`,
        companyName: formData.companyName,
        industryCategory: formData.industryCategory,
        companySize: formData.companySize,
        country: formData.country,
        state: formData.state,
        district: formData.district,
        block: formData.block,
        localAddress: formData.localAddress,
        pincode: formData.pincode,
        gstin: formData.gstin,
        hrContactName: formData.hrContactName,
        hrContactPhone: formData.hrContactPhone,
        hrContactEmail: formData.hrContactEmail,
        isVerified: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // 2. Create Initial Job Post
      await addDoc(collection(db, "shyamdash_jobs"), {
        employerId: employerRef.id,
        employerName: formData.companyName,
        industryCategory: formData.industryCategory,
        title: formData.jobTitle,
        jobType: formData.jobType,
        salaryRange: formData.salaryRange,
        workplaceType: formData.workplaceType,
        country: formData.country,
        state: formData.state,
        district: formData.district,
        block: formData.block,
        status: "Pending Approval",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      toast.success("Onboarding Complete! Your profile is pending approval.");
      setTimeout(() => router.push("/portal"), 2000);

    } catch (error) {
      console.error(error);
      toast.error("Failed to complete onboarding.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-12">
      <div className="flex justify-between relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 -translate-y-1/2 rounded"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-amber-500 -z-10 -translate-y-1/2 transition-all duration-500 rounded" 
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>
        
        {[1, 2, 3, 4].map(num => (
          <div key={num} className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-colors ${step >= num ? "bg-amber-500 border-slate-950 text-white" : "bg-slate-800 border-slate-950 text-slate-400"}`}>
              {step > num ? <Icons.Check className="w-5 h-5" /> : num}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
        <span>Basics</span>
        <span>Location</span>
        <span>Compliance</span>
        <span>First Job</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#02050f] text-slate-200 py-20 px-4">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Partner with Us</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Post your jobs to thousands of active candidates on the Universal Jobs Engine.</p>
        </div>

        {renderStepIndicator()}

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
          
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                <Icons.Building2 className="text-amber-500" />
                Company Basics
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Company Name *</label>
                  <input required name="companyName" value={formData.companyName} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Industry</label>
                    <select name="industryCategory" value={formData.industryCategory} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none">
                      <option value="">Select Industry</option>
                      <option value="IT Services">IT Services</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Company Size</label>
                    <select name="companySize" value={formData.companySize} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none">
                      <option value="">Select Size</option>
                      <option value="1-10">1-10 Employees</option>
                      <option value="11-50">11-50 Employees</option>
                      <option value="51-200">51-200 Employees</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                <Icons.MapPin className="text-amber-500" />
                Location
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">State *</label>
                  <select name="state" value={formData.state} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none">
                    <option value="">Select State</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Maharashtra">Maharashtra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">District *</label>
                  <input name="district" value={formData.district} onChange={handleChange} placeholder="e.g. Cuttack" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">Full Address</label>
                  <input name="localAddress" value={formData.localAddress} onChange={handleChange} placeholder="Building, Street, Area" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                <Icons.ShieldCheck className="text-amber-500" />
                Compliance & HR
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">GSTIN (Optional)</label>
                  <input name="gstin" value={formData.gstin} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">HR Contact Name *</label>
                    <input name="hrContactName" value={formData.hrContactName} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">HR Phone *</label>
                    <input name="hrContactPhone" value={formData.hrContactPhone} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">HR Email *</label>
                  <input name="hrContactEmail" type="email" value={formData.hrContactEmail} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none" />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                <Icons.Briefcase className="text-amber-500" />
                First Job Post
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Job Title *</label>
                  <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g. Senior Frontend Developer" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Job Type</label>
                    <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none">
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Workplace</label>
                    <select name="workplaceType" value={formData.workplaceType} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none">
                      <option value="On-site">On-site</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Salary Range</label>
                  <input name="salaryRange" value={formData.salaryRange} onChange={handleChange} placeholder="e.g. $80k - $100k or ₹8 LPA" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
            <button 
              onClick={prevStep}
              disabled={step === 1 || isSubmitting}
              className="px-6 py-3 rounded-lg font-bold text-slate-400 hover:text-white disabled:opacity-0 transition-colors"
            >
              Back
            </button>
            
            {step < 4 ? (
              <button 
                onClick={nextStep}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-amber-500/20"
              >
                Continue
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-slate-950 px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-green-500/20 flex items-center gap-2"
              >
                {isSubmitting ? <Icons.Loader2 className="w-5 h-5 animate-spin" /> : <Icons.Rocket className="w-5 h-5" />}
                Submit & Complete
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
