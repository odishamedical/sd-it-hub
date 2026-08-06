import { db } from "./firebase";
import { collection } from "firebase/firestore";

export const SHYAMDASH_JOBS_COL = collection(db, "shyamdash_jobs");
export const SHYAMDASH_EMPLOYER_PROFILES_COL = collection(db, "shyamdash_employer_profiles");
export const SHYAMDASH_JOB_SEEKERS_COL = collection(db, "shyamdash_job_seekers");
export const SHYAMDASH_JOB_APPLICATIONS_COL = collection(db, "shyamdash_job_applications");

export interface UniversalEmployerProfile {
  id: string; // Firebase Auth UID
  companyName: string;
  industryCategory: string; // e.g. "IT", "Healthcare", "Retail", "Manufacturing", "Other"
  companySize: string;
  websiteUrl?: string;
  aboutCompany?: string;
  
  // Branding
  logoUrl?: string;
  bannerUrl?: string;
  
  // Compliance & Contact
  gstin?: string;
  pan?: string;
  hrContactName: string;
  hrContactPhone: string;
  hrContactEmail: string;

  // 5-Tier Location
  country: string;
  state: string;
  district: string;
  block: string;
  localAddress: string;
  pincode: string;

  isVerified: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface UniversalJob {
  id?: string;
  employerId: string;
  employerName: string;
  employerLogoUrl?: string;
  
  industryCategory: string;
  title: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
  vacancies: number;
  deadline: string;
  
  // Modular specifics
  dynamicRequirements: {
    skills: string[];
    experienceRequired: string;
    qualificationRequired?: string;
  };
  
  salaryRange: string;
  workplaceType: 'On-site' | 'Remote' | 'Hybrid';
  
  // 5-Tier Location
  country: string;
  state: string;
  district: string;
  block: string;
  
  description: string;
  status: 'Active' | 'Closed' | 'Draft' | 'Pending Approval';
  createdAt: any;
  updatedAt: any;
}

export interface UniversalJobSeeker {
  id: string; // Firebase Auth UID
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  profilePictureUrl?: string;
  
  // 5-Tier Location
  country: string;
  state: string;
  district: string;
  block: string;
  localAddress: string;
  pincode: string;
  
  totalExperience: string;
  currentIndustry: string;
  isFresher: boolean;
  
  education: {
    degree: string;
    institution: string;
    yearOfPassing: string;
  }[];
  
  skills: {
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Expert';
  }[];
  
  // Resume & Links
  resumeUrl?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
  
  // Preferences
  desiredRole: string;
  expectedSalary: string;
  preferredWorkplace: 'On-site' | 'Remote' | 'Hybrid' | 'Any';
  
  createdAt: any;
  updatedAt: any;
}

export interface UniversalJobApplication {
  id?: string;
  jobId: string;
  jobTitle: string;
  employerId: string;
  seekerId: string;
  
  // Snapshot of seeker at time of application
  seekerName: string;
  seekerEmail: string;
  seekerPhone: string;
  seekerResumeUrl?: string;
  
  status: 'New' | 'Shortlisted' | 'Interviewing' | 'Hired' | 'Rejected';
  appliedAt: any;
  updatedAt: any;
}
