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
    <main className="relative min-h-screen bg-[#020610] text-[#e2e8f0] font-sans">
      <Header />
      
      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black font-serif text-white mb-6">Privacy Policy</h1>
        <p className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-12">Last Updated: July 2026</p>

        <div className="space-y-12 text-slate-300 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.Shield className="text-purple-500 w-6 h-6" />
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
              <Icons.Eye className="text-purple-500 w-6 h-6" />
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
              <Icons.Cookie className="text-purple-500 w-6 h-6" />
              3. Google AdSense & DoubleClick DART Cookie
            </h2>
            <p className="mb-4">
              Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet. 
            </p>
            <p>
              Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy at the following URL: <a href="https://policies.google.com/technologies/ads" className="text-purple-400 hover:underline">https://policies.google.com/technologies/ads</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.Users className="text-purple-500 w-6 h-6" />
              4. Third-Party Services
            </h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website (e.g. ResellerClub for domains, Razorpay for payments), so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Icons.Mail className="text-purple-500 w-6 h-6" />
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
