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
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-3">
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-bold">D&B D-U-N-S® Number</span>
                <span className="text-sm font-mono text-purple-300 font-bold">581779723</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Udyam Registration</span>
                <span className="text-sm font-mono text-slate-300">UDYAM-OD-28-0024355</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Income Tax PAN</span>
                <span className="text-sm font-mono text-slate-300">AFSPD2630L</span>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-900">
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com/shyamdash" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-purple-400 transition-colors">
              <Icons.Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/shyamdash" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-purple-400 transition-colors">
              <Icons.Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com/@shyamdashlive" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-purple-400 transition-colors">
              <Icons.Youtube className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} Shyam Dash Creation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
