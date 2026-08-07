"use client";

import React, { useEffect } from "react";
import * as Icons from "lucide-react";

export default function ResumePDFViewer({ params }: { params: { seekerId: string } }) {
  
  // In production, fetch the Seeker Profile from Firebase using params.seekerId
  const seeker = {
    fullName: "John Doe",
    email: "seeker@example.com",
    phone: "+91 9876543210",
    location: "Bhubaneswar, Odisha",
    title: "Senior Full Stack Developer",
    summary: "Passionate Full Stack Developer with 4+ years of experience building scalable web applications. Expert in React, Next.js, Node.js, and Firebase.",
    experience: [
      {
        role: "Software Engineer",
        company: "TechNova Solutions",
        duration: "2022 - Present",
        description: "Led the frontend architecture for the flagship SaaS product. Improved render performance by 40%."
      },
      {
        role: "Junior Web Developer",
        company: "Creative Nexus",
        duration: "2020 - 2022",
        description: "Developed and maintained 10+ client websites using React and Tailwind CSS."
      }
    ],
    education: [
      {
        degree: "B.Tech in Computer Science",
        institution: "KIIT University",
        year: "2020"
      }
    ],
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Firebase", "Tailwind CSS"]
  };

  useEffect(() => {
    // Automatically trigger print dialog when the page loads
    // For a real PDF, you might use a library like html2pdf.js, but standard browser print to PDF is very common and high quality.
    setTimeout(() => {
      window.print();
    }, 1000);
  }, []);

  return (
    <main className="min-h-screen bg-slate-200 py-8 print:py-0 print:bg-white flex justify-center">
      
      {/* A4 Page Container */}
      <div className="w-full max-w-[210mm] bg-white min-h-[297mm] shadow-2xl print:shadow-none p-12 text-slate-800">
        
        {/* Header Section */}
        <div className="border-b-2 border-slate-800 pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase text-slate-900 mb-2">{seeker.fullName}</h1>
            <p className="text-xl text-purple-600 font-bold">{seeker.title}</p>
          </div>
          <div className="text-sm font-medium text-slate-600 space-y-1 text-right">
            <p className="flex items-center justify-end gap-2"><Icons.Mail className="w-4 h-4" /> {seeker.email}</p>
            <p className="flex items-center justify-end gap-2"><Icons.Phone className="w-4 h-4" /> {seeker.phone}</p>
            <p className="flex items-center justify-end gap-2"><Icons.MapPin className="w-4 h-4" /> {seeker.location}</p>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8">
          <p className="text-slate-700 leading-relaxed">{seeker.summary}</p>
        </div>

        {/* Experience */}
        <div className="mb-8">
          <h2 className="text-xl font-bold uppercase text-slate-900 border-b border-slate-300 pb-2 mb-4 flex items-center gap-2">
            <Icons.Briefcase className="w-5 h-5 text-purple-600" /> Work Experience
          </h2>
          <div className="space-y-6">
            {seeker.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-800 text-lg">{exp.role}</h3>
                  <span className="text-sm font-bold text-slate-500">{exp.duration}</span>
                </div>
                <p className="text-purple-600 font-bold text-sm mb-2">{exp.company}</p>
                <p className="text-slate-600 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Skills */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold uppercase text-slate-900 border-b border-slate-300 pb-2 mb-4 flex items-center gap-2">
              <Icons.GraduationCap className="w-5 h-5 text-purple-600" /> Education
            </h2>
            <div className="space-y-4">
              {seeker.education.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                  <p className="text-slate-600 text-sm">{edu.institution} • {edu.year}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold uppercase text-slate-900 border-b border-slate-300 pb-2 mb-4 flex items-center gap-2">
              <Icons.Wrench className="w-5 h-5 text-purple-600" /> Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {seeker.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded text-slate-700 text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-xs text-slate-400 print:block">
          Generated via ShyamDash Universal Jobs Engine
        </div>

      </div>
    </main>
  );
}
