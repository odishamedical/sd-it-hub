"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CreditCard, Shield, Zap, CheckCircle2, AlertCircle, Building2, Crown, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function MasterBillingHub() {
  const tiers = [
    {
      name: "Free Tier",
      price: "0",
      description: "Basic access to the ecosystem.",
      features: ["Public Directory Listing", "Basic Job Board Access", "Community Support"],
      active: false,
      color: "slate",
    },
    {
      name: "Pro Tier",
      price: "1,499",
      description: "Ideal for growing businesses.",
      features: ["Premium Directory Placement", "Unlimited Job Postings", "Basic Analytics", "Gold Hub Integration", "Email Support"],
      active: true, // Mock active state
      color: "indigo",
    },
    {
      name: "Advance Pro",
      price: "4,999",
      description: "For enterprise-scale operations.",
      features: ["Custom Subdomain & SaaS Engine", "Bhulia Hub CRM Access", "Advanced Team Delegation", "Priority 24/7 Support", "API Access"],
      active: false,
      color: "amber",
    }
  ];

  return (
    <div className="min-h-screen bg-[#050B1B] text-slate-200">
      <Header />
      
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-4">
            <CreditCard className="w-4 h-4" />
            Master Billing & Subscriptions
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Ecosystem Subscription Management</h1>
          <p className="text-slate-400">Manage your active plans, connected applications, and billing methods across ShyamDash, Gold Hub, and Bhulia Hub.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Tier Management */}
          <div className="lg:col-span-2 space-y-8">
            
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-400" />
              SaaS Tier Selection
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tiers.map((tier) => (
                <div key={tier.name} className={`relative flex flex-col p-6 rounded-3xl border transition-all ${tier.active ? `bg-${tier.color}-500/10 border-${tier.color}-500/50 shadow-[0_0_30px_rgba(var(--color-${tier.color}-500),0.1)]` : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}>
                  
                  {tier.active && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full border border-indigo-400">
                      CURRENT PLAN
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white mb-1 mt-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-black text-white">₹{tier.price}</span>
                    <span className="text-slate-500 text-sm">/month</span>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-6 flex-grow">{tier.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${tier.active ? `text-${tier.color}-400` : 'text-slate-500'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={tier.active ? "#" : `/checkout?type=subscription&item=${tier.name}&amount=${tier.price.replace(',', '')}`}
                    className={`w-full py-3 rounded-xl font-bold text-sm text-center transition-colors ${tier.active ? 'bg-slate-800 text-slate-400 cursor-default' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'}`}
                  >
                    {tier.active ? "Active" : "Upgrade Plan"}
                  </Link>
                </div>
              ))}
            </div>

            {/* Billing History */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 mt-12">
              <h3 className="text-xl font-bold text-white mb-6">Recent Invoices</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                  <thead className="text-xs uppercase bg-slate-800/50 text-slate-300">
                    <tr>
                      <th className="px-4 py-3 rounded-l-lg">Date</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3 rounded-r-lg">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-4 py-4">Aug 01, 2026</td>
                      <td className="px-4 py-4 font-medium text-slate-200">Pro Tier Subscription (Monthly)</td>
                      <td className="px-4 py-4">₹1,499</td>
                      <td className="px-4 py-4"><span className="bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full text-xs font-bold border border-green-500/20">PAID</span></td>
                    </tr>
                    <tr className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-4 py-4">Jul 01, 2026</td>
                      <td className="px-4 py-4 font-medium text-slate-200">Pro Tier Subscription (Monthly)</td>
                      <td className="px-4 py-4">₹1,499</td>
                      <td className="px-4 py-4"><span className="bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full text-xs font-bold border border-green-500/20">PAID</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Connected Apps Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                Connected Apps
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/30">
                      <Building2 className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-200 text-sm">Gold Hub</p>
                      <p className="text-xs text-slate-500">Active • 3 Shops</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-fuchsia-500/10 rounded-lg flex items-center justify-center border border-fuchsia-500/30">
                      <Building2 className="w-5 h-5 text-fuchsia-400" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-200 text-sm">Bhulia Hub</p>
                      <p className="text-xs text-slate-500">Inactive • Requires Upgrade</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-400" />
                Payment Method
              </h3>
              
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 mb-4 flex items-center gap-4">
                <div className="w-12 h-8 bg-slate-700 rounded flex items-center justify-center text-xs font-bold text-white">
                  VISA
                </div>
                <div>
                  <p className="font-medium text-slate-200 text-sm">•••• •••• •••• 4242</p>
                  <p className="text-xs text-slate-500">Expires 12/28</p>
                </div>
              </div>
              
              <button className="w-full py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-sm font-medium transition-colors">
                Update Payment Method
              </button>
            </div>

            {/* Quota Usage */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                90-Day Quota
              </h3>
              
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Product Uploads</span>
                <span className="font-bold text-white">45 / 100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
                <div className="bg-emerald-500 h-2 rounded-full w-[45%]"></div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/80 leading-relaxed">
                  Deleted products remain in your quota for 90 days. Upgrade to Advance Pro for unlimited quotas.
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
