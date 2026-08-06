"use client";

import React, { useState } from "react";
import * as Icons from "lucide-react";

export default function SubscriptionsBillingManager() {
  const [activeTab, setActiveTab] = useState("overview");

  // Since Stripe API isn't fully wired yet, these are placeholder metrics 
  // that represent the future structure of the SaaS billing engine.
  const metrics = [
    { label: "Monthly Recurring Revenue (MRR)", value: "₹ 1,24,500", trend: "+12.5%", isPositive: true, icon: <Icons.TrendingUp className="w-5 h-5" /> },
    { label: "Active Pro Subscribers", value: "342", trend: "+24", isPositive: true, icon: <Icons.Users className="w-5 h-5" /> },
    { label: "Partner Agency Revenue", value: "₹ 45,000", trend: "+5.2%", isPositive: true, icon: <Icons.Briefcase className="w-5 h-5" /> },
    { label: "Churn Rate", value: "2.4%", trend: "-0.8%", isPositive: true, icon: <Icons.Activity className="w-5 h-5" /> },
  ];

  const recentTransactions = [
    { id: "tx_1", user: "TechNova Solutions", amount: "₹2,500", date: "Aug 06, 2026", status: "succeeded", plan: "Pro SaaS Bundle" },
    { id: "tx_2", user: "Apollo MedCare", amount: "₹1,500", date: "Aug 05, 2026", status: "succeeded", plan: "Directory Premium" },
    { id: "tx_3", user: "Global HR Tech", amount: "₹4,500", date: "Aug 05, 2026", status: "failed", plan: "ATS Master Tier" },
    { id: "tx_4", user: "Odisha Handloom Co.", amount: "₹2,500", date: "Aug 04, 2026", status: "succeeded", plan: "Pro SaaS Bundle" },
    { id: "tx_5", user: "City Auto Repairs", amount: "₹1,500", date: "Aug 04, 2026", status: "succeeded", plan: "Directory Premium" },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Subscriptions & Billing</h1>
          <p className="text-slate-400">Track ecosystem revenue, SaaS tiers, and partner agency payouts.</p>
        </div>
        <button className="px-6 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center gap-2 transition-colors">
          <Icons.Download className="w-5 h-5" /> Export CSV
        </button>
      </div>

      {/* High Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-sky-500/30 transition-colors">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/10 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/20">
                {metric.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${metric.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {metric.trend}
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">{metric.label}</h3>
            <p className="text-3xl font-black text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Data Tabs */}
      <div className="flex items-center gap-4 border-b border-slate-800 mb-6">
        <button onClick={() => setActiveTab("overview")} className={`pb-4 text-sm font-bold transition-colors ${activeTab === "overview" ? "text-sky-400 border-b-2 border-sky-400" : "text-slate-500 hover:text-slate-300"}`}>
          Recent Transactions
        </button>
        <button onClick={() => setActiveTab("plans")} className={`pb-4 text-sm font-bold transition-colors ${activeTab === "plans" ? "text-sky-400 border-b-2 border-sky-400" : "text-slate-500 hover:text-slate-300"}`}>
          SaaS Plans Matrix
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction / User</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Plan Subscribed</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white">{tx.user}</div>
                    <div className="text-xs text-slate-500 font-mono mt-1">{tx.id}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs font-medium border border-slate-700">
                      {tx.plan}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-200">{tx.amount}</td>
                  <td className="p-4 text-slate-400 text-sm">{tx.date}</td>
                  <td className="p-4 text-right">
                    {tx.status === "succeeded" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Icons.CheckCircle className="w-3.5 h-3.5" /> Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                        <Icons.XCircle className="w-3.5 h-3.5" /> Failed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "plans" && (
        <div className="text-center py-20 text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
          <Icons.Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-bold text-white mb-2">Stripe API Disconnected</h3>
          <p className="max-w-md mx-auto">The live Stripe Pricing Matrix cannot be loaded because the production API keys are currently missing from the environment variables.</p>
        </div>
      )}
    </div>
  );
}
