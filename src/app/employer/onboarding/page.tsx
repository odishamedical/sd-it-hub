"use client";

import React, { useState } from "react";
import { Building2, Upload, MapPin, ShieldCheck, CheckCircle2, ChevronRight, Briefcase } from "lucide-react";
import Image from "next/image";

const INDUSTRIES = ["IT Services", "Healthcare", "Retail & E-Commerce", "Manufacturing", "Finance", "Hospitality", "Education", "Other"];
const SIZES = ["1-10 Employees", "11-50 Employees", "51-200 Employees", "201-500 Employees", "500+ Employees"];

export default function EmployerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Handled by Google Auth in real app, we mock here for UI
    
    // Step 2
    industry: "",
    companySize: "",
    
    // Step 3
    companyName: "",
    websiteUrl: "",
    aboutCompany: "",
    logoPreview: "",
    
    // Step 4
    gstin: "",
    pan: "",
    hrName: "",
    hrPhone: "",
    hrEmail: "",
    
    // Step 5
    country: "India",
    state: "",
    district: "",
    city: "",
    pincode: "",
    localAddress: ""
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateForm("logoPreview", URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Top Navigation */}
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Shyamdash <span className="text-teal-400">ATS</span></h1>
              <p className="text-xs text-slate-400 font-medium">Employer Portal</p>
            </div>
          </div>
          <div className="text-sm font-medium text-slate-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            Step {currentStep} of 5
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 py-12">
        <div className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
            <div 
              className="h-full bg-teal-500 transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>

          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-10 h-10 text-teal-400" />
                </div>
                <h2 className="text-3xl font-black mb-3">Create Employer Account</h2>
                <p className="text-slate-400">Join Shyamdash ATS to post jobs and find top talent across all industries.</p>
              </div>

              <div className="space-y-4">
                <button onClick={nextStep} className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-white/5">
                  <svg className="w-6 h-6" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>
                <p className="text-center text-xs text-slate-500 mt-4">By continuing, you agree to our Terms of Service & Privacy Policy.</p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Building2 className="text-teal-400" /> Industry & Scale</h2>
                <p className="text-slate-400 text-sm">Help us configure your ATS dynamically based on your sector.</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Primary Industry</label>
                  <select value={formData.industry} onChange={e=>updateForm('industry', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white appearance-none">
                    <option value="">Select an Industry</option>
                    {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Company Size</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SIZES.map(size => (
                      <button 
                        key={size}
                        onClick={() => updateForm('companySize', size)}
                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${formData.companySize === size ? 'bg-teal-500/10 border-teal-500 text-teal-400' : 'bg-slate-950/50 border-white/10 text-slate-300 hover:border-white/30'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div>
                <h2 className="text-2xl font-bold mb-2">Company Profile</h2>
                <p className="text-slate-400 text-sm">This is how candidates will see your brand.</p>
              </div>
              
              <div className="flex gap-6 items-center">
                <label className="w-24 h-24 shrink-0 border-2 border-dashed border-white/20 hover:border-teal-500 rounded-2xl bg-white/5 flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer transition-colors">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  {formData.logoPreview ? (
                    <Image src={formData.logoPreview} alt="Logo" fill className="object-cover" />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-slate-400 group-hover:text-teal-400 transition-colors mb-1" />
                      <span className="text-[10px] font-bold text-slate-400">Upload Logo</span>
                    </>
                  )}
                </label>
                <div className="flex-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Company Name *</label>
                  <input type="text" value={formData.companyName} onChange={e=>updateForm('companyName', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white" placeholder="e.g. Acme Corp" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Website URL</label>
                <input type="url" value={formData.websiteUrl} onChange={e=>updateForm('websiteUrl', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white" placeholder="https://" />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">About Company</label>
                <textarea rows={4} value={formData.aboutCompany} onChange={e=>updateForm('aboutCompany', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white custom-scrollbar" placeholder="Briefly describe what your company does..."></textarea>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><ShieldCheck className="text-teal-400" /> Compliance & HR</h2>
                <p className="text-slate-400 text-sm">Required for verification to prevent spam postings.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">GSTIN (Optional)</label>
                  <input type="text" value={formData.gstin} onChange={e=>updateForm('gstin', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">PAN (Optional)</label>
                  <input type="text" value={formData.pan} onChange={e=>updateForm('pan', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h3 className="font-bold mb-4 text-white">HR Contact Person</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Full Name *</label>
                    <input type="text" value={formData.hrName} onChange={e=>updateForm('hrName', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Phone *</label>
                      <input type="tel" value={formData.hrPhone} onChange={e=>updateForm('hrPhone', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Official Email *</label>
                      <input type="email" value={formData.hrEmail} onChange={e=>updateForm('hrEmail', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><MapPin className="text-teal-400" /> Headquarters Address</h2>
                <p className="text-slate-400 text-sm">Please follow the strict 5-Tier address structure.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Country</label>
                  <select value={formData.country} onChange={e=>updateForm('country', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white appearance-none">
                    <option value="India">India</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">State *</label>
                  <input type="text" value={formData.state} onChange={e=>updateForm('state', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">District *</label>
                  <input type="text" value={formData.district} onChange={e=>updateForm('district', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">City / Block *</label>
                  <input type="text" value={formData.city} onChange={e=>updateForm('city', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Local Address</label>
                  <input type="text" value={formData.localAddress} onChange={e=>updateForm('localAddress', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Pincode</label>
                  <input type="text" value={formData.pincode} onChange={e=>updateForm('pincode', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          {currentStep > 1 && (
            <div className="mt-10 flex justify-between items-center pt-6 border-t border-white/10">
              <button onClick={prevStep} className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                Back
              </button>
              
              {currentStep < 5 ? (
                <button onClick={nextStep} className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-8 py-3 rounded-xl font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2">
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-8 py-3 rounded-xl font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2">
                  Submit Profile <CheckCircle2 className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
