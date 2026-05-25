import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050B1B] text-slate-400 py-12 border-t border-slate-900 mt-auto">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-950/20 border border-purple-500/20 rounded flex items-center justify-center">
            <Icons.Box className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-white font-bold tracking-wider">IT HUB</span>
        </div>
        
        <div className="flex gap-6 text-sm">
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="hover:text-white transition-colors">Support</Link>
        </div>

        <p className="text-xs">&copy; {new Date().getFullYear()} Shyam Dash Creation. All rights reserved.</p>
      </div>
    </footer>
  );
}
