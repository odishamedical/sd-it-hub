import React from "react";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Shyam Dash Creation (IT Hub)",
  description: "Terms of Service for Shyam Dash Creation IT Hub.",
};

export default function TermsOfServicePage() {
  return (
    <main className="relative min-h-screen bg-[#020610] text-[#e2e8f0] font-sans">
      <Header />
      
      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black font-serif text-white mb-6">Terms of Service</h1>
        <p className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-12">Last Updated: July 2026</p>

        <div className="space-y-12 text-slate-300 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.FileText className="text-purple-500 w-6 h-6" />
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing and using Shyam Dash Creation ("IT Hub", "we", "us", or "our"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.Globe className="text-purple-500 w-6 h-6" />
              2. Description of Services
            </h2>
            <p className="mb-4">
              IT Hub provides digital services including, but not limited to, custom domain booking, sub-domain leasing across our ecosystem (.golddunia.com, .bhulia.com, .dehapa.com), pre-built SaaS templates, and website hosting. We reserve the right to modify or discontinue any part of the service with or without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.CreditCard className="text-purple-500 w-6 h-6" />
              3. Payments, Renewals, and Refunds
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li>All domain registrations and hosting services are billed on a recurring annual basis unless stated otherwise.</li>
              <li>Domains registered via our API partners (e.g., ResellerClub) are subject to ICANN regulations and the registrar's specific refund policies. Usually, domain name registrations are final and non-refundable.</li>
              <li>You must maintain active payment methods. Failure to pay renewal fees may result in domain suspension or loss.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.ShieldAlert className="text-purple-500 w-6 h-6" />
              4. User Conduct and Content
            </h2>
            <p className="mb-4">
              You agree not to use our services for any unlawful purpose. You may not host, display, or distribute content that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li>Is illegal, abusive, defamatory, or promotes violence/hate speech.</li>
              <li>Violates intellectual property rights.</li>
              <li>Violates the Google AdSense Publisher Policies (as we may display ads across our networks).</li>
            </ul>
            <p className="mt-4 text-sm text-slate-500">We reserve the right to suspend or terminate services immediately for policy violations.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.Settings className="text-purple-500 w-6 h-6" />
              5. Limitation of Liability
            </h2>
            <p className="mb-4">
              In no event shall Shyam Dash Creation be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services (including loss of data, downtime, or business interruption).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.MapPin className="text-purple-500 w-6 h-6" />
              6. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Sambalpur, Odisha.
            </p>
          </section>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
