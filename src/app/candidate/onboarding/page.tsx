"use client";

import React, { useState } from "react";
import { User, MapPin, Briefcase, GraduationCap, Link2, Upload, CheckCircle2, ChevronRight, FileText, XCircle } from "lucide-react";
import Image from "next/image";

const INDUSTRIES = ["IT Services", "Healthcare", "Retail & E-Commerce", "Manufacturing", "Finance", "Hospitality", "Education", "Other"];

export default function CandidateOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 2
    country: "India",
    state: "",
    district: "",
    city: "",
    pincode: "",
    
    // Step 3
    totalExperience: "Fresher",
    currentIndustry: "",
    degree: "",
    institution: "",
    yearOfPassing: "",
    
    // Step 4
    skills: [] as { name: string, proficiency: string }[],
    tempSkill: "",
    tempProf: "Intermediate",
    
    // Step 5
    linkedin: "",
    github: "",
    resumeFileName: ""
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (formData.tempSkill.trim() === "") return;
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: prev.tempSkill.trim(), proficiency: prev.tempProf }],
      tempSkill: "",
      tempProf: "Intermediate"
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Top Navigation */}
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Shyamdash <span className="text-blue-400">Careers</span></h1>
              <p className="text-xs text-slate-400 font-medium">Candidate Profile</p>
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
              className="h-full bg-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>

          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-10 h-10 text-blue-400" />
                </div>
                <h2 className="text-3xl font-black mb-3">Create Candidate Profile</h2>
                <p className="text-slate-400">Build your Universal Shyamdash Profile and apply to jobs with 1-Click.</p>
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
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><MapPin className="text-blue-400" /> Your Location</h2>
                <p className="text-slate-400 text-sm">Where are you based? (5-Tier Address System)</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Country</label>
                  <select value={formData.country} onChange={e=>updateForm('country', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white appearance-none">
                    <option value="India">India</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">State *</label>
                  <input type="text" value={formData.state} onChange={e=>updateForm('state', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">District *</label>
                  <input type="text" value={formData.district} onChange={e=>updateForm('district', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">City / Block *</label>
                  <input type="text" value={formData.city} onChange={e=>updateForm('city', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Pincode *</label>
                  <input type="text" value={formData.pincode} onChange={e=>updateForm('pincode', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Briefcase className="text-blue-400" /> Professional Info</h2>
                <p className="text-slate-400 text-sm">Tell us about your experience and education.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Total Experience</label>
                  <select value={formData.totalExperience} onChange={e=>updateForm('totalExperience', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white appearance-none">
                    <option value="Fresher">Fresher (0 Years)</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5-8 Years">5-8 Years</option>
                    <option value="8+ Years">8+ Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Target Industry</label>
                  <select value={formData.currentIndustry} onChange={e=>updateForm('currentIndustry', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white appearance-none">
                    <option value="">Select an Industry</option>
                    {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-blue-400"/> Highest Education</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Degree / Qualification *</label>
                    <input type="text" value={formData.degree} onChange={e=>updateForm('degree', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white" placeholder="e.g. B.Tech Computer Science" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Institution / University *</label>
                      <input type="text" value={formData.institution} onChange={e=>updateForm('institution', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Year *</label>
                      <input type="text" value={formData.yearOfPassing} onChange={e=>updateForm('yearOfPassing', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white" placeholder="e.g. 2024" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><CheckCircle2 className="text-blue-400" /> Skill Tags</h2>
                <p className="text-slate-400 text-sm">Add your top skills and rate your proficiency.</p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-3">
                <input 
                  type="text" 
                  value={formData.tempSkill} 
                  onChange={e=>updateForm('tempSkill', e.target.value)} 
                  className="flex-1 bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white" 
                  placeholder="e.g. React.js, CPR, Sales" 
                />
                <select 
                  value={formData.tempProf} 
                  onChange={e=>updateForm('tempProf', e.target.value)}
                  className="bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white appearance-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
                <button onClick={addSkill} className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-colors">
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {formData.skills.length === 0 && (
                  <p className="text-slate-500 text-sm text-center w-full py-4 border-2 border-dashed border-white/10 rounded-xl">No skills added yet.</p>
                )}
                {formData.skills.map((skill, idx) => (
                  <div key={idx} className="bg-slate-900 border border-white/10 rounded-xl pl-4 pr-1 py-1.5 flex items-center gap-3">
                    <div>
                      <span className="font-bold text-sm text-white block leading-tight">{skill.name}</span>
                      <span className={`text-[10px] uppercase font-black tracking-wider ${skill.proficiency === 'Expert' ? 'text-teal-400' : skill.proficiency === 'Intermediate' ? 'text-blue-400' : 'text-slate-400'}`}>
                        {skill.proficiency}
                      </span>
                    </div>
                    <button onClick={() => removeSkill(idx)} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Link2 className="text-blue-400" /> Resume & Links</h2>
                <p className="text-slate-400 text-sm">Upload your CV and connect your digital portfolio.</p>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Upload Resume (PDF) *</label>
                <label className="w-full h-32 border-2 border-dashed border-white/20 hover:border-blue-500 rounded-2xl bg-white/5 flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer transition-colors">
                  <input type="file" accept=".pdf" className="hidden" onChange={(e) => {
                    if (e.target.files && e.target.files[0]) updateForm("resumeFileName", e.target.files[0].name);
                  }} />
                  {formData.resumeFileName ? (
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <span className="text-sm font-bold text-white">{formData.resumeFileName}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-400 transition-colors mb-2" />
                      <span className="text-sm font-bold text-slate-400">Click to upload PDF</span>
                    </>
                  )}
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">LinkedIn Profile</label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="url" value={formData.linkedin} onChange={e=>updateForm('linkedin', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-3 text-white" placeholder="https://linkedin.com/in/..." />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">GitHub / Portfolio URL</label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="url" value={formData.github} onChange={e=>updateForm('github', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-3 text-white" placeholder="https://github.com/..." />
                  </div>
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
                <button onClick={nextStep} className="bg-blue-500 hover:bg-blue-400 text-slate-950 px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-400 text-slate-950 px-8 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex items-center gap-2">
                  Create Profile <CheckCircle2 className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
