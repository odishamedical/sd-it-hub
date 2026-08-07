import React, { useState, useEffect } from "react";
import { db, storage } from "@/utils/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as Icons from "lucide-react";
import { toast } from "react-hot-toast";
import { INDIAN_STATES, ODISHA_DISTRICTS, ODISHA_DISTRICT_BLOCKS } from "@/utils/locations";

export default function ApplyModal({ isOpen, onClose, job }: { isOpen: boolean, onClose: () => void, job: any }) {
  const [step, setStep] = useState<"loading" | "auth_check" | "wizard_1" | "wizard_2" | "wizard_3" | "success">("auth_check");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Basic Info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  // Files
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [resumeFileUrl, setResumeFileUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  // Professional
  const [education, setEducation] = useState("Bachelor's Degree");
  const [experience, setExperience] = useState("0-2 Years");
  const [skills, setSkills] = useState("");

  // Location (5-tier)
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Odisha");
  const [district, setDistrict] = useState("");
  const [block, setBlock] = useState("");
  const [localAddress, setLocalAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const [existingCandidateId, setExistingCandidateId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkExistingProfile();
    }
  }, [isOpen]);

  const checkExistingProfile = async () => {
    setStep("loading");
    // In a real app, you'd check auth.currentUser.uid. 
    // Since we are mocking auth/localStorage for simplicity, we just prompt to create.
    // If they were logged in, we'd do a query:
    // const q = query(collection(db, "shyamdash_candidates"), where("uid", "==", currentUser.uid));
    // const snap = await getDocs(q);
    // if (!snap.empty) { setExistingCandidateId(snap.docs[0].id); setStep("success"); } else { setStep("auth_check"); }
    
    // For now, always require filling it out if they don't have one cached
    const cachedCandidate = localStorage.getItem("sd_cached_candidate_id");
    if (cachedCandidate) {
      setExistingCandidateId(cachedCandidate);
      setStep("success");
    } else {
      setStep("auth_check");
    }
  };

  if (!isOpen || !job) return null;

  const uploadFile = async (file: File, path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, 
        (error) => reject(error), 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleFinalize = async () => {
    setIsSubmitting(true);
    try {
      let finalImgUrl = "";
      let finalCvUrl = "";

      if (profileImage) {
        toast.loading("Uploading Profile Image...", { id: "upload" });
        finalImgUrl = await uploadFile(profileImage, "candidate_profiles");
      }
      
      if (resumeFile) {
        toast.loading("Uploading Resume PDF...", { id: "upload" });
        finalCvUrl = await uploadFile(resumeFile, "candidate_resumes");
      }

      toast.loading("Saving Candidate Profile...", { id: "upload" });

      // Save to Candidates
      const candidateRef = await addDoc(collection(db, "shyamdash_candidates"), {
        fullName,
        email,
        phone,
        whatsappNumber: whatsapp,
        country,
        state,
        district,
        block,
        localAddress,
        pincode,
        educationLevel: education,
        yearsExperience: experience,
        skills,
        profileImageUrl: finalImgUrl,
        resumeFileUrl: finalCvUrl,
        createdAt: serverTimestamp()
      });

      localStorage.setItem("sd_cached_candidate_id", candidateRef.id);
      
      // Save Application Ledger
      await addDoc(collection(db, "shyamdash_job_applications"), {
        candidateId: candidateRef.id,
        jobId: job.id,
        employerId: job.employerId || "SYSTEM_SCRAPER",
        appliedAt: serverTimestamp()
      });

      toast.success("Profile completed & application saved!", { id: "upload" });
      setStep("success");
    } catch (e) {
      console.error(e);
      toast.error("Failed to complete profile", { id: "upload" });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleApplyWithExisting = async () => {
    if (!existingCandidateId) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "shyamdash_job_applications"), {
        candidateId: existingCandidateId,
        jobId: job.id,
        employerId: job.employerId || "SYSTEM_SCRAPER",
        appliedAt: serverTimestamp()
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

  const resetAndClose = () => {
    setStep("auth_check");
    onClose();
  };

  const renderProgressBar = (current: number) => {
    return (
      <div className="w-full bg-slate-800 h-2 mt-4 rounded-full overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500" style={{ width: `${(current / 3) * 100}%` }}></div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0b0f19] border border-slate-700 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col">
        <button onClick={resetAndClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10 bg-slate-800/50 p-1.5 rounded-full backdrop-blur-md">
          <Icons.X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-900/50 shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Apply for {job.title}</h2>
          <p className="text-sm text-purple-400 font-medium flex items-center gap-2">
            <Icons.Building className="w-4 h-4" /> {job.employerName}
          </p>
          {(step === "wizard_1" || step === "wizard_2" || step === "wizard_3") && renderProgressBar(step === "wizard_1" ? 1 : step === "wizard_2" ? 2 : 3)}
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
          {step === "loading" && (
            <div className="flex flex-col items-center justify-center py-12">
              <Icons.Loader2 className="w-8 h-8 animate-spin text-purple-500 mb-4" />
              <p className="text-slate-400">Checking profile...</p>
            </div>
          )}

          {step === "auth_check" && (
            <div className="space-y-6 animate-in fade-in py-4 text-center">
              <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.UserCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Create Your Talent Profile</h3>
              <p className="text-slate-300 max-w-md mx-auto">
                Before applying, you need to complete your candidate profile. This 3-step process helps employers find you easily!
              </p>
              <div className="pt-4">
                <button onClick={() => setStep("wizard_1")} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-purple-500/25">
                  Start Profile Builder <Icons.ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === "wizard_1" && (
            <div className="space-y-5 animate-in slide-in-from-right-4 pb-20">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Step 1: Basic Info & Documents</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Profile Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files?.[0] || null)} className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer border border-slate-800 rounded-lg" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name <span className="text-red-500">*</span></label>
                  <input value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:border-purple-500 outline-none" placeholder="John Doe" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:border-purple-500 outline-none" placeholder="john@example.com" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number <span className="text-red-500">*</span></label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:border-purple-500 outline-none" placeholder="+91 9876543210" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">WhatsApp Number</label>
                  <input type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:border-purple-500 outline-none" placeholder="Same as phone" />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Upload CV / Resume (PDF) <span className="text-red-500">*</span></label>
                  <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer border border-slate-800 rounded-lg" />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex justify-end">
                <button onClick={() => setStep("wizard_2")} disabled={!fullName || !email || !phone} className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2">
                  Next Step <Icons.ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === "wizard_2" && (
            <div className="space-y-5 animate-in slide-in-from-right-4 pb-20">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Step 2: Professional & Location Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="col-span-1 md:col-span-2 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-bold text-purple-400 mb-4">Location (5-Tier Address)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Country</label>
                      <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 outline-none">
                        <option value="India">India</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    {country === "India" && (
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">State</label>
                        <select value={state} onChange={(e) => { setState(e.target.value); setDistrict(""); setBlock(""); }} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 outline-none">
                          <option value="">Select State</option>
                          {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    )}
                    
                    {state === "Odisha" && (
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">District</label>
                        <select value={district} onChange={(e) => { setDistrict(e.target.value); setBlock(""); }} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 outline-none">
                          <option value="">Select District</option>
                          {ODISHA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                    )}

                    {state === "Odisha" && district && ODISHA_DISTRICT_BLOCKS[district] && (
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Block / City</label>
                        <select value={block} onChange={(e) => setBlock(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 outline-none">
                          <option value="">Select Block</option>
                          {ODISHA_DISTRICT_BLOCKS[district].map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                    )}

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Local Address (House No, Street)</label>
                      <input type="text" value={localAddress} onChange={e => setLocalAddress(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 outline-none" placeholder="123 Main Street, Unit 4B" />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Pincode</label>
                      <input type="text" value={pincode} onChange={e => setPincode(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:border-purple-500 outline-none" placeholder="751001" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Highest Education</label>
                  <select value={education} onChange={(e) => setEducation(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:border-purple-500 outline-none">
                    <option value="High School">High School</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Experience</label>
                  <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:border-purple-500 outline-none">
                    <option value="Fresher">Fresher (0 Years)</option>
                    <option value="0-2 Years">0-2 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5-10 Years">5-10 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Skills (Comma separated)</label>
                  <input value={skills} onChange={e => setSkills(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:border-purple-500 outline-none" placeholder="React, Python, Project Management, SEO" />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex justify-between">
                <button onClick={() => setStep("wizard_1")} className="text-slate-400 hover:text-white font-bold py-3 px-6 rounded-xl transition-colors">
                  Back
                </button>
                <button onClick={() => setStep("wizard_3")} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2">
                  Review Profile <Icons.ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === "wizard_3" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 pb-20">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Step 3: Review & Finalize</h3>
              
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800 space-y-4">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center overflow-hidden border border-slate-700 shrink-0">
                    {profileImage ? (
                      <img src={URL.createObjectURL(profileImage)} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                      <Icons.User className="w-8 h-8 text-slate-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{fullName}</h4>
                    <p className="text-slate-400 text-sm">{email} • {phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500 block mb-1">Location</span>
                    <span className="text-slate-200">{district ? `${district}, ${state}` : state}, {country}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Education</span>
                    <span className="text-slate-200">{education}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Experience</span>
                    <span className="text-slate-200">{experience}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Resume Attached</span>
                    <span className="text-slate-200 flex items-center gap-1">
                      {resumeFile ? <><Icons.FileCheck className="w-4 h-4 text-emerald-400"/> {resumeFile.name}</> : <span className="text-red-400">None</span>}
                    </span>
                  </div>
                </div>
              </div>

              {isSubmitting && (
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <p className="text-purple-300 text-sm text-center font-medium mb-2">Uploading files and finalizing profile...</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex justify-between">
                <button onClick={() => setStep("wizard_2")} disabled={isSubmitting} className="text-slate-400 hover:text-white font-bold py-3 px-6 rounded-xl transition-colors">
                  Back
                </button>
                <button onClick={handleFinalize} disabled={isSubmitting} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 shadow-lg">
                  {isSubmitting ? <Icons.Loader2 className="w-5 h-5 animate-spin" /> : <><Icons.CheckCircle className="w-5 h-5" /> Finalize & Apply</>}
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="space-y-6 text-center animate-in zoom-in-95 py-10">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <Icons.CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-white">Ready to Apply!</h3>
              <p className="text-slate-300 max-w-md mx-auto leading-relaxed">
                Your Candidate Profile has been validated. You can now securely proceed to the employer's website to finalize your application.
              </p>
              
              <div className="pt-8 flex flex-col gap-4 max-w-sm mx-auto">
                {job.sourceUrl ? (
                  <a href={job.sourceUrl} target="_blank" rel="noreferrer" onClick={handleApplyWithExisting} className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:-translate-y-1">
                    Continue to Employer Website <Icons.ExternalLink className="w-5 h-5" />
                  </a>
                ) : (
                  <button onClick={handleApplyWithExisting} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all">
                    Submit Internal Application
                  </button>
                )}
                <button onClick={resetAndClose} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
