"use client";

import React, { useState } from "react";
import { Briefcase, Building2, MapPin, AlignLeft, CheckCircle2, ChevronRight, X } from "lucide-react";

// Modular Industry Configurations
const INDUSTRY_CONFIG: Record<string, { roles: string[], skills: string[] }> = {
  "IT Services": {
    roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "Product Manager", "UI/UX Designer", "QA Tester"],
    skills: ["React", "Node.js", "Python", "AWS", "Figma", "Docker", "Kubernetes", "TypeScript", "SQL"]
  },
  "Healthcare": {
    roles: ["General Physician", "Surgeon", "ICU Nurse", "Pharmacist", "Medical Representative", "Lab Technician"],
    skills: ["Patient Care", "BLS / CPR", "ICU Management", "Medical Billing", "Diagnostic Imaging", "Phlebotomy"]
  },
  "Retail & E-Commerce": {
    roles: ["Store Manager", "Sales Executive", "Cashier", "Supply Chain Manager", "Customer Support", "Merchandiser"],
    skills: ["Inventory Management", "Customer Service", "POS Systems", "Supply Chain", "Sales Targets"]
  }
};

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const WORKPLACE_TYPES = ["On-site", "Remote", "Hybrid"];

export default function PostJobWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState("IT Services"); // Mocked from employer profile

  const [formData, setFormData] = useState({
    title: "",
    customTitle: "",
    jobType: "Full-time",
    vacancies: 1,
    deadline: "",
    
    selectedSkills: [] as string[],
    experienceRequired: "1-3 Years",
    qualification: "",
    
    salaryRange: "",
    workplaceType: "On-site",
    country: "India",
    state: "",
    district: "",
    city: "",
    
    description: ""
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => {
      const skills = prev.selectedSkills;
      if (skills.includes(skill)) {
        return { ...prev, selectedSkills: skills.filter(s => s !== skill) };
      } else {
        return { ...prev, selectedSkills: [...skills, skill] };
      }
    });
  };

  const currentConfig = INDUSTRY_CONFIG[selectedIndustry] || { roles: [], skills: [] };

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col md:flex-row">
      {/* Sidebar - Wizard Progress */}
      <aside className="w-full md:w-80 bg-slate-900 border-r border-white/10 p-8 flex flex-col shrink-0">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-slate-950" />
            </div>
            <h1 className="font-bold text-xl tracking-tight">Post a Job</h1>
          </div>
          <button className="md:hidden p-2 bg-white/5 rounded-full"><X className="w-5 h-5"/></button>
        </div>

        <div className="space-y-8 flex-1 hidden md:block">
          <div className={`flex gap-4 ${currentStep >= 1 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${currentStep === 1 ? 'bg-teal-500 text-slate-950 shadow-[0_0_15px_rgba(20,184,166,0.3)]' : currentStep > 1 ? 'bg-teal-500/20 text-teal-400 border border-teal-500/50' : 'bg-slate-800 text-slate-400'}`}>1</div>
            <div>
              <h3 className="font-bold text-white">Job Basics</h3>
              <p className="text-xs text-slate-400">Title, Type, Vacancies</p>
            </div>
          </div>
          
          <div className={`flex gap-4 ${currentStep >= 2 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${currentStep === 2 ? 'bg-teal-500 text-slate-950 shadow-[0_0_15px_rgba(20,184,166,0.3)]' : currentStep > 2 ? 'bg-teal-500/20 text-teal-400 border border-teal-500/50' : 'bg-slate-800 text-slate-400'}`}>2</div>
            <div>
              <h3 className="font-bold text-white">Roles & Skills</h3>
              <p className="text-xs text-slate-400">Modular Industry Config</p>
            </div>
          </div>
          
          <div className={`flex gap-4 ${currentStep >= 3 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${currentStep === 3 ? 'bg-teal-500 text-slate-950 shadow-[0_0_15px_rgba(20,184,166,0.3)]' : currentStep > 3 ? 'bg-teal-500/20 text-teal-400 border border-teal-500/50' : 'bg-slate-800 text-slate-400'}`}>3</div>
            <div>
              <h3 className="font-bold text-white">Location & Salary</h3>
              <p className="text-xs text-slate-400">Workplace and Compensation</p>
            </div>
          </div>
          
          <div className={`flex gap-4 ${currentStep >= 4 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${currentStep === 4 ? 'bg-teal-500 text-slate-950 shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'bg-slate-800 text-slate-400'}`}>4</div>
            <div>
              <h3 className="font-bold text-white">Description</h3>
              <p className="text-xs text-slate-400">Detailed requirements</p>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-400 text-xs mt-auto">
          <strong className="block mb-1">Modular Context:</strong>
          Since your company is in <strong>{selectedIndustry}</strong>, this wizard has automatically adapted the required skills and roles for you.
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-slate-950 relative overflow-hidden">
        
        {/* Dynamic decorative glow */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar flex items-center justify-center">
          <div className="w-full max-w-2xl">
            
            {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div>
                  <h2 className="text-3xl font-black mb-2 text-white">Job Basics</h2>
                  <p className="text-slate-400 text-sm">Let's start with the fundamental details of the position.</p>
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Job Title *</label>
                  <select 
                    value={formData.title} 
                    onChange={e => updateForm('title', e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-4 text-white appearance-none"
                  >
                    <option value="">Select a standard role...</option>
                    {currentConfig.roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                    <option value="Other">Other (Custom Role)</option>
                  </select>
                </div>

                {formData.title === "Other" && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">Custom Job Title *</label>
                    <input type="text" value={formData.customTitle} onChange={e=>updateForm('customTitle', e.target.value)} className="w-full bg-slate-900 border border-teal-500/50 focus:border-teal-400 rounded-xl px-4 py-4 text-white shadow-[0_0_15px_rgba(20,184,166,0.1)]" placeholder="e.g. Specialized Data Architect" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Job Type</label>
                    <select value={formData.jobType} onChange={e=>updateForm('jobType', e.target.value)} className="w-full bg-slate-900 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-4 text-white appearance-none">
                      {JOB_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Vacancies</label>
                    <input type="number" min="1" value={formData.vacancies} onChange={e=>updateForm('vacancies', e.target.value)} className="w-full bg-slate-900 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-4 text-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Application Deadline *</label>
                  <input type="date" value={formData.deadline} onChange={e=>updateForm('deadline', e.target.value)} className="w-full bg-slate-900 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-4 text-white" style={{colorScheme:'dark'}} />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div>
                  <h2 className="text-3xl font-black mb-2 text-white flex items-center gap-3"><Building2 className="text-teal-400 w-8 h-8"/> Roles & Skills</h2>
                  <p className="text-slate-400 text-sm">Suggested skills based on your industry <strong>({selectedIndustry})</strong>.</p>
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Select Required Skills</label>
                  <div className="flex flex-wrap gap-3">
                    {currentConfig.skills.map(skill => (
                      <button 
                        key={skill} 
                        onClick={() => toggleSkill(skill)}
                        className={`px-4 py-2.5 rounded-full border text-sm font-bold transition-all ${formData.selectedSkills.includes(skill) ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'bg-slate-900 border-white/10 text-slate-400 hover:border-white/30'}`}
                      >
                        {skill}
                      </button>
                    ))}
                    <button className="px-4 py-2.5 rounded-full border border-dashed border-white/20 text-slate-400 hover:border-white/40 text-sm font-bold transition-colors">
                      + Add Custom Skill
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Experience Required</label>
                    <select value={formData.experienceRequired} onChange={e=>updateForm('experienceRequired', e.target.value)} className="w-full bg-slate-900 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-4 text-white appearance-none">
                      <option value="Fresher (0 Years)">Fresher (0 Years)</option>
                      <option value="1-3 Years">1-3 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5-8 Years">5-8 Years</option>
                      <option value="8+ Years">8+ Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Minimum Qualification</label>
                    <input type="text" value={formData.qualification} onChange={e=>updateForm('qualification', e.target.value)} className="w-full bg-slate-900 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-4 text-white" placeholder="e.g. B.Tech, M.B.B.S" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div>
                  <h2 className="text-3xl font-black mb-2 text-white flex items-center gap-3"><MapPin className="text-teal-400 w-8 h-8"/> Location & Salary</h2>
                  <p className="text-slate-400 text-sm">Define the logistics of the role.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Workplace Type</label>
                    <select value={formData.workplaceType} onChange={e=>updateForm('workplaceType', e.target.value)} className="w-full bg-slate-900 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-4 text-white appearance-none">
                      {WORKPLACE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Salary Range</label>
                    <input type="text" value={formData.salaryRange} onChange={e=>updateForm('salaryRange', e.target.value)} className="w-full bg-slate-900 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-4 text-white" placeholder="e.g. ₹30k - ₹50k / month" />
                  </div>
                </div>

                {formData.workplaceType !== 'Remote' && (
                  <div className="p-6 bg-slate-900 border border-white/10 rounded-2xl space-y-4">
                    <h3 className="font-bold text-teal-400">Job Location (5-Tier)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">State *</label>
                        <input type="text" value={formData.state} onChange={e=>updateForm('state', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">District *</label>
                        <input type="text" value={formData.district} onChange={e=>updateForm('district', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">City / Block *</label>
                        <input type="text" value={formData.city} onChange={e=>updateForm('city', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div>
                  <h2 className="text-3xl font-black mb-2 text-white flex items-center gap-3"><AlignLeft className="text-teal-400 w-8 h-8"/> Detailed Description</h2>
                  <p className="text-slate-400 text-sm">Provide a comprehensive description of the role, responsibilities, and benefits.</p>
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Job Description *</label>
                  <textarea 
                    rows={12} 
                    value={formData.description} 
                    onChange={e=>updateForm('description', e.target.value)} 
                    className="w-full bg-slate-900 border border-white/10 focus:border-teal-500 rounded-xl px-4 py-4 text-white custom-scrollbar leading-relaxed" 
                    placeholder="We are looking for a highly motivated..."
                  ></textarea>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer Navigation */}
        <div className="h-20 shrink-0 bg-slate-900 border-t border-white/10 flex justify-between items-center px-6 md:px-12 z-20">
          <div>
            {currentStep > 1 && (
              <button onClick={prevStep} className="px-6 py-2.5 rounded-xl font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm">
                Back
              </button>
            )}
          </div>
          <div>
            {currentStep < 4 ? (
              <button onClick={nextStep} className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-8 py-3 rounded-xl font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 text-sm">
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-8 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all flex items-center gap-2 text-sm">
                Publish Job <CheckCircle2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
