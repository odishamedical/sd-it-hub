import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Award, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About Us | Shyam Dash IT Hub",
  description: "Learn about the mission, vision, and team behind Shyam Dash IT Hub. We build the internet.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About Us</h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              We are a team of passionate technologists, designers, and marketers dedicated to helping businesses navigate and dominate the digital landscape.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            <div className="bg-slate-900/50 p-10 rounded-3xl border border-slate-800">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-indigo-500/20">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-slate-400 leading-relaxed">
                To empower organizations of all sizes with enterprise-grade digital tools, cutting-edge software solutions, and data-driven marketing strategies that fuel sustainable growth in a digital-first world.
              </p>
            </div>
            
            <div className="bg-slate-900/50 p-10 rounded-3xl border border-slate-800">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-purple-500/20">
                <ShieldCheck className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-slate-400 leading-relaxed">
                We envision a future where every business, regardless of technical background, has seamless access to the powerful digital infrastructure needed to connect authentically with their audience globally.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Human-Centric Approach",
                  desc: "Technology should serve people, not the other way around. We build tools and strategies that prioritize human connection.",
                  icon: <Users className="w-8 h-8 text-blue-400" />
                },
                {
                  title: "Uncompromising Quality",
                  desc: "From the first line of code to the final marketing campaign, we hold ourselves to the highest standards of excellence.",
                  icon: <Award className="w-8 h-8 text-amber-400" />
                },
                {
                  title: "Continuous Innovation",
                  desc: "The digital world moves fast. We stay ahead of the curve so our clients don't have to worry about becoming obsolete.",
                  icon: <Zap className="w-8 h-8 text-emerald-400" />
                }
              ].map((value, idx) => (
                <div key={idx} className="text-center p-8 bg-slate-900/30 rounded-3xl border border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <div className="inline-flex justify-center mb-6">{value.icon}</div>
                  <h4 className="text-xl font-semibold text-white mb-4">{value.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
