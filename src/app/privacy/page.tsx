import React from "react";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Shyam Dash Creation (IT Hub)",
  description: "Privacy Policy for Shyam Dash Creation IT Hub.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-200 font-sans">
      <Header />
      
      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Privacy Policy</h1>
        <p className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-12">Last Updated: July 2026</p>

        <div className="space-y-12 text-slate-300 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.Shield className="text-indigo-500 w-6 h-6" />
              1. Information We Collect
            </h2>
            <p className="mb-4">
              At Shyam Dash Creation ("IT Hub"), we collect information to provide better services to our users. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li><strong>Personal Information:</strong> Name, email address, and contact details provided when you register for a partner account, book a domain, or contact us.</li>
              <li><strong>Usage Data:</strong> Information about how you use our platform, your IP address, browser type, and operating system.</li>
              <li><strong>Cookies & Tracking:</strong> We use cookies and similar tracking technologies (including Google Analytics and Google AdSense) to track activity on our platform and hold certain information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.Eye className="text-indigo-500 w-6 h-6" />
              2. How We Use Your Information
            </h2>
            <p className="mb-4">We use the collected data for various purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li>To provide, maintain, and improve our services (including custom domain booking and SaaS hosting).</li>
              <li>To manage your Partner account and process transactions securely.</li>
              <li>To communicate with you regarding updates, security alerts, and support messages.</li>
              <li>To display personalized advertisements via third-party vendors, including Google AdSense.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.Cookie className="text-indigo-500 w-6 h-6" />
              3. Google AdSense & Advertising Cookies
            </h2>
            <p className="mb-4">
              Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.
            </p>
            <p className="mb-4">
              Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
            </p>
              Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Ads Settings</a>. Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://aboutads.info" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">www.aboutads.info</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.Users className="text-indigo-500 w-6 h-6" />
              4. Third-Party Services
            </h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website (e.g. ResellerClub for domains, Razorpay for payments), so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.Mail className="text-indigo-500 w-6 h-6" />
              5. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: <br/><br/>
              <strong>Email:</strong> shyamdash@gmail.com <br/>
              <strong>Address:</strong> R7/A2 – Jagannath Mandir Colony, Budharaja, Sambalpur, Odisha, PIN - 768004, India
            </p>
          </section>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
