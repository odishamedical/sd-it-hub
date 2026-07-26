"use client";

import React, { useState } from "react";
import { db, collection, addDoc, serverTimestamp } from "@/utils/firebase";

export default function QuickContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("submitting");

    try {
      await addDoc(collection(db, "leads"), {
        name,
        email,
        message,
        status: "New",
        interest: "General Inquiry",
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting lead:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
        <p className="text-emerald-400 text-sm font-bold mb-1">Message Sent!</p>
        <p className="text-slate-400 text-xs">Our consultants will reach out shortly.</p>
        <button onClick={() => setStatus("idle")} className="mt-3 text-xs text-slate-500 hover:text-white transition-colors">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Your Name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={status === "submitting"}
        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-colors disabled:opacity-50" 
      />
      <input 
        type="email" 
        placeholder="Email Address" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "submitting"}
        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-colors disabled:opacity-50" 
      />
      <textarea 
        placeholder="How can we help?" 
        rows={3} 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        disabled={status === "submitting"}
        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-colors resize-none disabled:opacity-50"
      ></textarea>
      
      {status === "error" && (
        <p className="text-red-400 text-xs">Error sending message. Please try again.</p>
      )}

      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-blue-900/20"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
