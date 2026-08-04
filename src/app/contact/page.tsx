import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickContactForm from "@/components/QuickContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Shyam Dash IT Hub",
  description: "Get in touch with Shyam Dash IT Hub. We're here to help you with your digital needs, from software development to marketing strategies.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Contact Us</h1>
            <p className="text-lg text-slate-400">
              Whether you have a question about our services, need a custom software solution, or just want to discuss your digital strategy, we're ready to answer all your questions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
                <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-indigo-400 mr-4 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Office Address</h4>
                      <p className="text-slate-200">
                        Shyam Dash IT Hub<br />
                        Bhubaneswar, Odisha<br />
                        India - 751001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-indigo-400 mr-4 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Phone</h4>
                      <p className="text-slate-200">+91 99370 00000</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-indigo-400 mr-4 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Email</h4>
                      <p className="text-slate-200">support@shyamdash.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-indigo-400 mr-4 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Business Hours</h4>
                      <p className="text-slate-200">Monday - Friday: 9:00 AM - 6:00 PM (IST)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-white mb-6">Send us a Message</h3>
              <QuickContactForm />
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
