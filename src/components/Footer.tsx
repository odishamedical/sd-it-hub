import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#020610] text-slate-400 py-16 border-t border-slate-900 mt-auto">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Firm Statement */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-950/20 border border-purple-500/20 rounded flex items-center justify-center shrink-0">
                <Icons.Box className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-white font-bold tracking-wider text-lg">Shyam<span className="text-purple-400">Dash</span> Creation</span>
            </div>
            <p className="text-sm text-slate-500 mb-2 font-mono text-purple-300/70 uppercase tracking-widest text-[10px]">Tradition Meets Technology</p>
            <p className="text-sm leading-relaxed text-slate-400">
              An authoritative multi-disciplinary entity delivering state-of-the-art information systems alongside classic Indian regional textile production infrastructure.
            </p>
          </div>

          {/* Operational Facility */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Operational HQ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-slate-400">
                <Icons.MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" />
                <span>R7/A2 – Jagannath Mandir Colony,<br />Budharaja, Sambalpur,<br />Odisha, PIN - 768004, India</span>
              </li>
            </ul>
          </div>

          {/* Communication Nodes */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Communication Nodes</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:shyamdash@gmail.com" className="flex items-center gap-3 hover:text-purple-400 transition-colors">
                  <Icons.Mail className="w-4 h-4 shrink-0 text-slate-500" /> shyamdash@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+917683811120" className="flex items-center gap-3 hover:text-purple-400 transition-colors">
                  <Icons.Phone className="w-4 h-4 shrink-0 text-slate-500" /> +91 76838 11120
                </a>
              </li>
              <li>
                <a href="https://www.shyamdash.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-purple-400 transition-colors">
                  <Icons.Globe className="w-4 h-4 shrink-0 text-slate-500" /> www.shyamdash.com
                </a>
              </li>
            </ul>
          </div>

          {/* Statutory Credentials */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Statutory Credentials</h4>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Icons.ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-400 leading-relaxed">
                  We are a recognized Indian startup, operating with an authorized Udyam registration and a verified D-U-N-S® Number. We proudly maintain strict compliance with all applicable Indian laws and regulatory frameworks.
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-900">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <Link href="/blog" className="hover:text-white transition-colors text-indigo-400">Knowledge Hub / Blog</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
            <a href="https://facebook.com/shyamdash" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors flex items-center gap-1">
              Facebook
            </a>
            <span className="text-slate-800">|</span>
            <a href="https://instagram.com/shyamdash" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors flex items-center gap-1">
              Instagram
            </a>
            <span className="text-slate-800">|</span>
            <a href="https://youtube.com/@shyamdashlive" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors flex items-center gap-1">
              YouTube
            </a>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} Shyam Dash Creation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
