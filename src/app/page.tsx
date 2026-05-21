"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import EcosystemSwitcher from "@/components/EcosystemSwitcher";
import {
  MOCK_SERVICES,
  MOCK_PORTFOLIO,
  MOCK_PRICING,
  submitITInquiry,
  ITService,
  ITPortfolio,
  ITPricingPlan
} from "../utils/directus";

// Safe Dynamic Icon Resolver
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
}

export default function Home() {
  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState<ITService[]>(MOCK_SERVICES);
  const [portfolioTab, setPortfolioTab] = useState("All");
  
  // Inquiry Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formService, setFormService] = useState("Web Development");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  // Real-time Service Search Filter
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setServices(MOCK_SERVICES);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = MOCK_SERVICES.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query) ||
          s.features.some((f) => f.toLowerCase().includes(query))
      );
      setServices(filtered);
    }
  }, [searchQuery]);

  // Handle Inquiry Submission
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) {
      setSubmitResult({ success: false, message: "Please fill out all mandatory fields." });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    const result = await submitITInquiry({
      name: formName,
      email: formEmail,
      phone: formPhone,
      service_category: formService,
      message: formMessage
    });

    setIsSubmitting(false);
    setSubmitResult(result);

    if (result.success) {
      // Clear form on success
      setFormName("");
      setFormEmail("");
      setFormPhone("");
      setFormMessage("");
    }
  };

  // Portfolio categories helper
  const filteredPortfolio = MOCK_PORTFOLIO.filter((item) => {
    if (portfolioTab === "All") return true;
    if (portfolioTab === "Marketplace") return item.category.includes("Marketplace");
    if (portfolioTab === "Portals") return item.category.includes("Portal");
    if (portfolioTab === "SaaS") return item.category.includes("SaaS") || item.category.includes("Security");
    return true;
  });

  return (
    <main className="relative min-h-screen bg-[#040916] text-[#e2e8f0] font-sans overflow-x-hidden">
      
      {/* Background Dots Mesh */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, #3a4b7c 1px, transparent 0)', 
          backgroundSize: '36px 36px' 
        }} 
      />
      
      {/* Amber & Indigo Ambient Glow Filters */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse-glow" />
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[180px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Header / Sticky Nav */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-[rgba(229,193,88,0.1)] backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" id="logo-link">
            <div className="w-10 h-10 rounded-xl bg-gold-gradient p-[1px]">
              <div className="w-full h-full bg-[#060c18] rounded-xl flex items-center justify-center">
                <Icons.Server className="w-5 h-5 text-[#e5c158] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">SD IT HUB</span>
              <span className="text-[10px] text-[#e5c158] tracking-widest uppercase block -mt-1">Digital Powerhouse</span>
            </div>
          </Link>

          {/* Nav Anchors */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-[#e5c158] transition-colors" id="nav-services">Services</a>
            <a href="#portfolio" className="hover:text-[#e5c158] transition-colors" id="nav-portfolio">Case Studies</a>
            <a href="#pricing" className="hover:text-[#e5c158] transition-colors" id="nav-pricing">Pricing Plans</a>
            <a href="#inquiry" className="hover:text-[#e5c158] transition-colors" id="nav-contact">Contact</a>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <EcosystemSwitcher />
            <Link 
              href="/portal" 
              className="px-5 py-2.5 rounded-xl border border-[#e5c158]/30 hover:border-[#e5c158] bg-transparent text-sm font-semibold text-[#e5c158] shadow-[0_0_15px_rgba(229,193,88,0.03)] hover:shadow-[0_0_15px_rgba(229,193,88,0.15)] transition-all"
              id="header-portal-btn"
            >
              Client Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 pt-24 pb-20 z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="px-4 py-1.5 rounded-full border border-[#e5c158]/20 bg-[#e5c158]/5 text-[#e5c158] text-xs font-semibold tracking-wider uppercase mb-8 shadow-inner animate-float">
            🛡️ Verified SaaS & Domain Infrastructure
          </div>
          
          {/* Main H1 */}
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white mb-8">
            The Digital Engine for <br />
            <span className="text-gold-gradient">Modern IT Services</span>
          </h1>
          
          {/* Paragraph */}
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl leading-relaxed">
            Deploy high-performance web applications, manage custom subdomains, and orchestrate cloud resources—all integrated with the centralized SD Auth SSO terminal.
          </p>

          {/* Search bar integration for SEO Optimization */}
          <div className="w-full max-w-2xl relative mb-12">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icons.Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Find your tech service (e.g. Next.js, hosting, white-label templates)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-12 pr-4 bg-slate-900/60 border border-[rgba(229,193,88,0.2)] rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-[#e5c158] focus:ring-1 focus:ring-[#e5c158] backdrop-blur-md transition-all shadow-xl"
              id="hero-service-search"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="#services" 
              className="px-8 py-4 bg-gold-gradient text-slate-950 font-bold rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(229,193,88,0.3)]"
            >
              Explore Services
            </a>
            <a 
              href="#inquiry" 
              className="px-8 py-4 border border-slate-700 bg-slate-900/40 hover:bg-slate-800/80 text-white font-bold rounded-xl transition-all"
            >
              Consult Architect
            </a>
          </div>
        </div>
      </section>

      {/* Services Showcase Section */}
      <section id="services" className="relative container mx-auto px-6 py-24 border-t border-slate-900 z-10 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tailored Technology Solutions</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Select a service from our dynamic catalogue to scale your enterprise operations.
          </p>
        </div>

        {/* Dynamic Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.length > 0 ? (
            services.map((service) => (
              <div 
                key={service.id} 
                className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col justify-between"
                id={`service-card-${service.id}`}
              >
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 bg-[#e5c158]/10 rounded-xl flex items-center justify-center text-[#e5c158] mb-6">
                    <DynamicIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  
                  {/* Category & Title */}
                  <span className="text-[10px] uppercase tracking-wider text-[#e5c158] font-bold block mb-2">{service.category}</span>
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.description}</p>
                  
                  {/* Features list */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Icons.Check className="w-3.5 h-3.5 text-[#e5c158] flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and CTA */}
                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Starting from</span>
                    <span className="text-lg font-bold text-white">₹{service.price_starting.toLocaleString('en-IN')}</span>
                  </div>
                  <a 
                    href={`#inquiry`} 
                    onClick={() => setFormService(service.category)}
                    className="p-2.5 rounded-lg bg-slate-800 hover:bg-[#e5c158] text-slate-300 hover:text-slate-950 transition-all"
                    title="Inquire about this service"
                  >
                    <Icons.ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center glass-panel rounded-2xl">
              <Icons.HelpCircle className="w-12 h-12 text-[#e5c158] mx-auto mb-4 opacity-50" />
              <p className="text-slate-400">No matching services found. Try searching for something else!</p>
              <button 
                onClick={() => setSearchQuery("")} 
                className="mt-4 text-[#e5c158] underline text-sm"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Case Studies / Portfolio Section */}
      <section id="portfolio" className="relative container mx-auto px-6 py-24 border-t border-slate-900 z-10 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Delivering Digital Excellence</h2>
            <p className="text-slate-400 max-w-md">
              A review of active platform instances built and managed within the Shyam Dash Group.
            </p>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 p-1.5 bg-slate-900/60 rounded-xl border border-slate-800">
            {["All", "Marketplace", "Portals", "SaaS"].map((tab) => (
              <button
                key={tab}
                onClick={() => setPortfolioTab(tab)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  portfolioTab === tab 
                    ? "bg-gold-gradient text-slate-950" 
                    : "text-slate-400 hover:text-white"
                }`}
                id={`portfolio-tab-${tab}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPortfolio.map((project) => (
            <div 
              key={project.id} 
              className="glass-panel p-2 rounded-2xl group overflow-hidden"
              id={`portfolio-card-${project.id}`}
            >
              {/* Virtual Mockup Frame */}
              <div className="relative aspect-video rounded-xl bg-slate-950 overflow-hidden mb-6 flex items-center justify-center p-4 border border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 opacity-70" />
                <Icons.Terminal className="w-16 h-16 text-[#e5c158]/10 group-hover:scale-110 transition-transform duration-500" />
                
                {/* Meta details float */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                  <div>
                    <span className="px-2.5 py-1 rounded bg-[#e5c158]/10 border border-[#e5c158]/30 text-[#e5c158] text-[10px] font-bold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h4 className="text-white font-bold text-lg mt-2">{project.title}</h4>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Est. {project.launch_year}</span>
                </div>
              </div>

              {/* Description */}
              <div className="px-4 pb-6">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider block mb-1">Client</span>
                <span className="text-slate-300 text-sm font-semibold block mb-4">{project.client}</span>
                <p className="text-slate-400 text-xs leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Subscription Section */}
      <section id="pricing" className="relative container mx-auto px-6 py-24 border-t border-slate-900 z-10 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, Scalable Subscriptions</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Choose the subscription package that matches your operational traffic volume.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {MOCK_PRICING.map((plan) => (
            <div 
              key={plan.id}
              className={`glass-panel p-8 rounded-2xl relative flex flex-col justify-between ${
                plan.is_popular 
                  ? "border-[#e5c158] shadow-[0_0_30px_rgba(229,193,88,0.1)] md:scale-105 z-10" 
                  : "border-slate-800"
              }`}
              id={`pricing-card-${plan.id}`}
            >
              {plan.is_popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-gold-gradient text-slate-950 text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-md animate-pulse">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">{plan.description}</p>
                
                {/* Cost */}
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold text-white tracking-tight">{plan.price}</span>
                  <span className="text-slate-400 text-sm">/{plan.period}</span>
                </div>

                {/* Features checklist */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                      <Icons.CheckCircle2 className="w-4 h-4 text-[#e5c158] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Plan CTA */}
              <a 
                href="#inquiry"
                onClick={() => {
                  setFormService(plan.name);
                  setFormMessage(`Hi! I'm interested in deploying the "${plan.name}" plan for my project. Please share next onboarding steps.`);
                }}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center block transition-all ${
                  plan.is_popular
                    ? "bg-gold-gradient text-slate-950 hover:shadow-[0_0_20px_rgba(229,193,88,0.35)]"
                    : "bg-slate-850 hover:bg-slate-800 text-white border border-slate-700"
                }`}
              >
                {plan.button_text}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Form & Split Layout */}
      <section id="inquiry" className="relative container mx-auto px-6 py-24 border-t border-slate-900 z-10 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Orchestrate Your Stack</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Need custom integrations or direct DB migrations? Fill out our service inquiry card and our cloud team will reach out to schedule an architecture session.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-[#e5c158]">
                  <Icons.MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Operational HQ</span>
                  <span className="text-sm font-semibold text-white">Central Technology Wing, Cuttack</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-[#e5c158]">
                  <Icons.Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Email Dispatch</span>
                  <span className="text-sm font-semibold text-white">it-support@shyamdash.com</span>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-900/60">
              <div className="text-left">
                <span className="text-2xl font-black text-white block">99.99%</span>
                <span className="text-[10px] text-slate-400 uppercase">Server Uptime</span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-black text-white block">142+</span>
                <span className="text-[10px] text-slate-400 uppercase">Active Nodes</span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-black text-white block">1.2M+</span>
                <span className="text-[10px] text-slate-400 uppercase">Weekly Req.</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-panel p-8 rounded-2xl" id="inquiry-form-container">
            <h3 className="text-xl font-bold text-white mb-6">Service Inquiry Card</h3>
            
            {submitResult && (
              <div 
                className={`p-4 rounded-xl mb-6 text-sm flex gap-3 border ${
                  submitResult.success 
                    ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400" 
                    : "bg-red-950/40 border-red-500/30 text-red-400"
                }`}
              >
                {submitResult.success ? (
                  <Icons.CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <Icons.AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <span>{submitResult.message}</span>
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="space-y-6">
              
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-2">Representative Name *</label>
                <input 
                  type="text" 
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Priyabrata Dash"
                  className="w-full p-3.5 bg-slate-950/60 border border-slate-800 focus:border-[#e5c158] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e5c158]"
                  id="inquiry-name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-2">Contact Email *</label>
                  <input 
                    type="email" 
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full p-3.5 bg-slate-950/60 border border-slate-800 focus:border-[#e5c158] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e5c158]"
                    id="inquiry-email"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-2">WhatsApp Number (Optional)</label>
                  <input 
                    type="tel" 
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 94370..."
                    className="w-full p-3.5 bg-slate-950/60 border border-slate-800 focus:border-[#e5c158] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e5c158]"
                    id="inquiry-phone"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-2">Target Stack / Service *</label>
                <select 
                  value={formService}
                  onChange={(e) => setFormService(e.target.value)}
                  className="w-full p-3.5 bg-slate-950/60 border border-slate-800 focus:border-[#e5c158] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e5c158]"
                  id="inquiry-service"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="Hosting">Hosting & Cloud Infrastructure</option>
                  <option value="White-Label Templates">White-Label Templates</option>
                  <option value="Starter Suite">Starter Suite Plan</option>
                  <option value="Enterprise Platform">Enterprise Plan</option>
                  <option value="Custom Service">Custom SLA Package</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-2">Brief Project Summary *</label>
                <textarea 
                  rows={4}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Tell us about your target subdomain, domain redirects, or app parameters..."
                  className="w-full p-3.5 bg-slate-950/60 border border-slate-800 focus:border-[#e5c158] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e5c158] resize-none"
                  id="inquiry-message"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-[0_0_15px_rgba(229,193,88,0.25)] flex items-center justify-center gap-2"
                id="inquiry-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <Icons.Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Data...</span>
                  </>
                ) : (
                  <>
                    <Icons.Send className="w-4 h-4" />
                    <span>Submit Inquiry Card</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#020610] text-slate-500 py-12 border-t border-slate-950 z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-sm font-bold text-white block">SD IT HUB</span>
            <span className="text-[10px] text-[#e5c158] tracking-widest uppercase">Shyam Dash Creation Digital Powerhouse</span>
            <p className="text-xs text-slate-600 mt-2">&copy; 2026 Shyam Dash Creation. All rights reserved.</p>
          </div>

          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="https://auth.shyamdash.com" className="hover:text-[#e5c158] transition-colors">SSO Center</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
