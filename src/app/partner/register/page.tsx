"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { useRouter } from "next/navigation";

export default function PartnerRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    agencyName: "",
    contactName: "",
    email: "",
    phone: "",
    gstNumber: "",
    panFile: null as string | null,
    depositTxn: "",
    agreedToSecrets: false
  });

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => setCurrentStep(prev => prev - 1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, panFile: e.target.files[0].name });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      // Mock save and redirect
      router.push("/portal?partner_pending=true");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#000a14] flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-2xl bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center mb-10 relative z-10">
          <Icons.ShieldCheck className="w-12 h-12 text-sky-400 mx-auto mb-4" />
          <h1 className="text-3xl font-black mb-2">IT Hub Partner Application</h1>
          <p className="text-slate-400 text-sm">Join the exclusive Wholesale Agency Network.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 relative z-10">
          <div className="flex justify-between text-xs font-bold text-sky-400 mb-2 uppercase tracking-wider">
            <span>Step {currentStep} of 4</span>
            <span>
              {currentStep === 1 && "Agency Details"}
              {currentStep === 2 && "KYC Verification"}
              {currentStep === 3 && "Security Deposit"}
              {currentStep === 4 && "Agreements"}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-sky-500 transition-all duration-500"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Forms */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Agency / Business Name</label>
                <input 
                  type="text" required
                  value={formData.agencyName}
                  onChange={e => setFormData({...formData, agencyName: e.target.value})}
                  className="w-full p-4 bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl text-white outline-none"
                  placeholder="e.g. Sambalpur Web Solutions"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Contact Name</label>
                  <input 
                    type="text" required
                    value={formData.contactName}
                    onChange={e => setFormData({...formData, contactName: e.target.value})}
                    className="w-full p-4 bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Phone</label>
                  <input 
                    type="tel" required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-4 bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl text-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">GST Number (Optional)</label>
                <input 
                  type="text"
                  value={formData.gstNumber}
                  onChange={e => setFormData({...formData, gstNumber: e.target.value})}
                  className="w-full p-4 bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl text-white outline-none uppercase"
                  placeholder="21ABCDE1234F1Z5"
                />
              </div>
              <div className="p-6 border border-dashed border-slate-700 rounded-xl bg-slate-950/50 text-center">
                <Icons.UploadCloud className="w-8 h-8 text-sky-400 mx-auto mb-3" />
                <span className="text-sm font-bold block mb-1">Upload PAN / Aadhaar Card</span>
                <span className="text-xs text-slate-500 block mb-4">Required for KYC verification</span>
                <input type="file" id="kyc" className="hidden" onChange={handleFileUpload} />
                <label htmlFor="kyc" className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors">
                  {formData.panFile ? formData.panFile : "Browse Files"}
                </label>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="p-6 bg-sky-500/10 border border-sky-500/20 rounded-xl text-center">
                <span className="text-sm font-bold text-sky-400 block mb-1">Refundable Security Deposit</span>
                <span className="text-3xl font-black text-white">₹10,000</span>
                <p className="text-xs text-slate-400 mt-2">To protect our wholesale network, an upfront deposit is required. It is fully refundable if you choose to exit the program.</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Payment Transaction ID</label>
                <input 
                  type="text" required
                  value={formData.depositTxn}
                  onChange={e => setFormData({...formData, depositTxn: e.target.value})}
                  className="w-full p-4 bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-xl text-white outline-none"
                  placeholder="e.g. TXN90283019"
                />
                <p className="text-[10px] text-slate-500 mt-2">Please transfer to our corporate account and paste the Reference ID here.</p>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="p-6 border border-emerald-500/30 bg-emerald-500/10 rounded-xl">
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Icons.Lock className="w-4 h-4 text-emerald-400" /> Commercial Secret Agreement
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  By joining this program, you agree to keep the Shyam Dash Wholesale pricing catalog strictly confidential. You are prohibited from sharing our B2B buy-rates with end-clients. You maintain the right to set your own retail prices and keep 100% of your retail markup.
                </p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" required
                    checked={formData.agreedToSecrets}
                    onChange={e => setFormData({...formData, agreedToSecrets: e.target.value === 'on'})}
                    className="mt-1"
                  />
                  <span className="text-sm font-bold text-white">I agree to the Commercial Secrecy Policy and Terms of Service.</span>
                </label>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-4 pt-6 border-t border-slate-800">
            {currentStep > 1 && (
              <button type="button" onClick={handleBack} className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors">
                Back
              </button>
            )}
            
            {currentStep < 4 ? (
              <button type="button" onClick={handleNext} className="flex-1 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-colors">
                Continue to Next Step
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting || !formData.agreedToSecrets} className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {isSubmitting ? <Icons.Loader2 className="w-5 h-5 animate-spin" /> : <Icons.CheckCircle className="w-5 h-5" />}
                Submit Partner Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
