"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Icons from "lucide-react";
import { db, collection, getDocs, addDoc, serverTimestamp, query, orderBy, where, doc, updateDoc } from "@/utils/firebase";

interface Ticket {
  id: string;
  title: string;
  category: string;
  status: "Open" | "In-Progress" | "Resolved";
  status: "Open" | "In-Progress" | "Resolved";
  date: string;
}

const TEMPLATES = [
  {
    id: "jewel-classic",
    name: "Classic Elegance",
    industry: "Gold Jewellery",
    description: "A traditional, luxurious layout perfect for established heritage jewelers.",
    image: "https://images.unsplash.com/photo-1599643477874-5c91fce90a19?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Ruby Red", value: "#991b1b" },
      { name: "Emerald", value: "#065f46" },
      { name: "Royal Blue", value: "#1e3a8a" },
      { name: "Gold", value: "#854d0e" },
    ]
  },
  {
    id: "jewel-modern",
    name: "Modern Minimalist",
    industry: "Gold Jewellery",
    description: "Clean, spacious design focusing on high-quality product imagery and contemporary style.",
    image: "https://images.unsplash.com/photo-1588444650733-d0767b753cb8?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Slate", value: "#0f172a" },
      { name: "Rose Gold", value: "#b45309" },
      { name: "Sapphire", value: "#0369a1" },
      { name: "Pearl", value: "#d6d3d1" },
    ]
  },
  {
    id: "jewel-prestige",
    name: "Prestige Gallery",
    industry: "Gold Jewellery",
    description: "Dark-themed, high-contrast layout designed for premium, exclusive collections.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Onyx", value: "#000000" },
      { name: "Crimson", value: "#881337" },
      { name: "Midnight", value: "#172554" },
      { name: "Deep Forest", value: "#14532d" },
    ]
  }
];

export default function ClientPortal() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "domains" | "support" | "reseller" | "templates">("dashboard");
  const [isPartner, setIsPartner] = useState(false);

  // Sync tab with URL Hash
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash && ["dashboard", "domains", "support", "reseller", "templates"].includes(hash)) {
        setActiveTab(hash as any);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "#" + activeTab);
    }
  }, [activeTab]);
  
  const [domainQuery, setDomainQuery] = useState("");
  const [domainExtension, setDomainExtension] = useState(".com");
  const [domainDuration, setDomainDuration] = useState("1");
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [domainResult, setDomainResult] = useState<{ available: boolean; domain: string } | null>(null);
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisioningDomain, setProvisioningDomain] = useState("");

  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [deployments, setDeployments] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("Client");
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketCategory, setNewTicketCategory] = useState("Infrastructure");
  const [loadingTickets, setLoadingTickets] = useState(true);

  // Template Library States
  const [selectedTemplateColor, setSelectedTemplateColor] = useState<Record<string, string>>({
    "jewel-classic": "#991b1b",
    "jewel-modern": "#0f172a",
    "jewel-prestige": "#000000"
  });

  // Domain Management States
  const [selectedDomain, setSelectedDomain] = useState<any | null>(null);
  const [ns1, setNs1] = useState("ns1.shyamdash.com");
  const [ns2, setNs2] = useState("ns2.shyamdash.com");
  const [dnsRecords, setDnsRecords] = useState<{type:string, name:string, value:string}[]>([{ type: "A", name: "@", value: "192.168.1.1" }]);
  const [newDnsRecord, setNewDnsRecord] = useState({ type: "A", name: "", value: "" });
  const [eppCode, setEppCode] = useState("");
  const [autoRenew, setAutoRenew] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 4000);
  };

  // Auth Check & Fetch User Data
  useEffect(() => {
    // 1. Check URL for incoming SSO session
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const sso_email = params.get("sso_email");
    const sso_name = params.get("sso_name");
    const sso_role = params.get("sso_role");

    if (sso_email) {
      localStorage.setItem("sd_current_user_email", sso_email);
      localStorage.setItem("sd_current_user_name", sso_name || "User");
      localStorage.setItem("sd_current_user_role", sso_role || "user");
      // Clean the URL so the parameters disappear for security/aesthetics
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Auto-route admins to the command center on initial login
      if (sso_role === "super_admin" || sso_role === "admin" || sso_email === "odishamedical@gmail.com") {
        router.push("/admin");
        return;
      }
    }

    // 2. Enforce Auth
    const email = localStorage.getItem("sd_current_user_email");
    if (!email) {
      window.location.href = `https://sd-auth-center.vercel.app?redirect_uri=${encodeURIComponent(window.location.href)}`;
      return;
    }
    setUserEmail(email);
    setUserName(localStorage.getItem("sd_current_user_name") || "Client");
    
    if (localStorage.getItem("sd_current_user_role") === "partner") {
      setIsPartner(true);
    }

    // 3. Process Domain Payment Success
    const paymentSuccess = params.get("payment_success");
    const domainPaid = params.get("domain");

    if (paymentSuccess === "true" && domainPaid) {
      const saveBookedDomain = async () => {
        try {
          const qCheck = query(collection(db, "tenant_deployments"), where("ownerEmail", "==", email), where("siteName", "==", domainPaid));
          const snap = await getDocs(qCheck);
          let domainDocId = "";
          
          if (snap.empty) {
            // Add a temporary 'Provisioning' state
            const docRef = await addDoc(collection(db, "tenant_deployments"), {
              ownerEmail: email,
              siteName: domainPaid,
              templateName: "Pending Setup",
              status: "Provisioning DNS...",
              createdAt: serverTimestamp()
            });
            domainDocId = docRef.id;
          } else {
            // If it already exists (user testing same domain), update its status to trigger flow again
            domainDocId = snap.docs[0].id;
            const existingDocRef = doc(db, "tenant_deployments", domainDocId);
            await updateDoc(existingDocRef, {
              status: "Provisioning DNS..."
            });
          }

          setRefreshTrigger(prev => prev + 1);
          showToast("Initializing domain provisioning sequence...");
          setIsProvisioning(true);
          setProvisioningDomain(domainPaid);

          // Call the mock domain service
          const { DomainService } = await import('@/services/domain.service');
          const result = await DomainService.registerDomainMock(domainPaid, email);

          // Update status after API returns
          import('firebase/firestore').then(({ doc, updateDoc }) => {
            const domainDocRef = doc(db, "tenant_deployments", domainDocId);
            updateDoc(domainDocRef, {
              status: result.success ? "Domain Secured" : "Registration Failed"
            }).then(() => {
              setRefreshTrigger(prev => prev + 1);
              setIsProvisioning(false);
              setProvisioningDomain("");
              showToast(result.message);
              router.replace('/portal');
            });
          });
        } catch (e) {
          console.error("Error saving domain:", e);
          setIsProvisioning(false);
          router.replace('/portal');
        }
      };
      saveBookedDomain();
    }

    // 4. Process Franchise Activation
    const franchiseActivated = params.get("franchise_activated");
    if (franchiseActivated === "true") {
      window.history.replaceState({}, document.title, window.location.pathname);
      localStorage.setItem("sd_current_user_role", "partner");
      setIsPartner(true);
      setActiveTab("reseller");
    }
  }, []);

  // Fetch Tickets & Deployments
  useEffect(() => {
    if (!userEmail) return;

    const fetchData = async () => {
      try {
        setLoadingTickets(true);
        // Fetch Tickets
        const qTickets = query(collection(db, "support_tickets"), orderBy("createdAt", "desc"));
        const snapshotT = await getDocs(qTickets);
        const dataT = snapshotT.docs.map(doc => ({
          id: doc.id.substring(0, 6).toUpperCase(), // Short ID
          title: doc.data().title,
          category: doc.data().category,
          status: doc.data().status || "Open",
          date: doc.data().createdAt?.toDate().toISOString().split("T")[0] || new Date().toISOString().split("T")[0]
        })) as Ticket[];
        setTickets(dataT);

        // Fetch Deployments
        const qDeploy = query(collection(db, "tenant_deployments"), where("ownerEmail", "==", userEmail));
        const snapshotD = await getDocs(qDeploy);
        const dataD = snapshotD.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDeployments(dataD);

      } catch (e) {
        console.error("Error fetching data", e);
      } finally {
        setLoadingTickets(false);
      }
    };
    fetchData();
  }, [activeTab, userEmail, refreshTrigger]);

  // Handle support ticket creation
  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;

    try {
      await addDoc(collection(db, "support_tickets"), {
        title: newTicketTitle,
        category: newTicketCategory,
        status: "Open",
        createdAt: serverTimestamp()
      });
      
      const newTicket: Ticket = {
        id: `TK-${Math.floor(100 + Math.random() * 900)}`,
        title: newTicketTitle,
        category: newTicketCategory,
        status: "Open",
        date: new Date().toISOString().split("T")[0]
      };
      setTickets([newTicket, ...tickets]);
      setNewTicketTitle("");
    } catch (e) {
      console.error("Error creating ticket", e);
    }
  };

  // Simulate Domain check against DB
  const handleCheckDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainQuery.trim()) return;

    setIsCheckingDomain(true);
    setDomainResult(null);

    try {
      const cleanQuery = domainQuery.toLowerCase().replace(/\s+/g, "");
      // Call the live API
      const res = await fetch(`/api/domains/search?domain=${encodeURIComponent(cleanQuery)}&tld=${encodeURIComponent(domainExtension)}`);
      const data = await res.json();

      if (res.ok) {
        setDomainResult({ available: data.available, domain: data.domain });
      } else {
        setDomainResult({ available: false, domain: cleanQuery + domainExtension });
      }
    } catch (e) {
      console.error("Error checking domain", e);
      setDomainResult({ available: false, domain: domainQuery + domainExtension });
    } finally {
      setIsCheckingDomain(false);
    }
  };

  const handleProvisionDomain = async () => {
    if (!domainResult?.domain) return;
    
    let amount = 1499;
    if (domainDuration === "2") amount = 2499;
    else if (domainDuration === "3") amount = 3999;
    else if (domainDuration === "5") amount = 6499;

    router.push(`/checkout?type=domain&item=${encodeURIComponent(domainResult.domain)}&amount=${amount}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("sd_current_user_email");
    localStorage.removeItem("sd_current_user_name");
    localStorage.removeItem("sd_current_user_role");
    // Also optional: you could ping auth.shyamdash.com/logout if you want a global logout, but local clearing is fine for now
    window.location.href = "/";
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col md:flex-row overflow-x-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between p-6 z-20">
        <div>
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 mb-10 group">
            <div className="w-10 h-10 bg-sky-500/10 rounded border border-sky-500/20 flex items-center justify-center">
              <Icons.Box className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white block">Shyam<span className="text-sky-400">Dash</span></span>
              <span className="text-[9px] text-sky-400 tracking-wider uppercase block">Client Portal</span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "dashboard" 
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icons.LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => setActiveTab("domains")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "domains" 
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icons.Globe2 className="w-4 h-4" />
              <span>Domain Allocator</span>
            </button>
            <button 
              onClick={() => setActiveTab("support")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "support" 
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icons.LifeBuoy className="w-4 h-4" />
              <span>Support Desk</span>
            </button>
            <button 
              onClick={() => setActiveTab("templates")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "templates" 
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icons.LayoutTemplate className="w-4 h-4" />
              <span>Template Library</span>
            </button>
            {isPartner && (
              <button 
                onClick={() => setActiveTab("reseller")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all mt-4 border border-emerald-500/30 ${
                  activeTab === "reseller" 
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                    : "text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                }`}
              >
                <Icons.Briefcase className="w-4 h-4" />
                <span>Reseller Panel</span>
              </button>
            )}
          </nav>
        </div>

          {/* Back Link & Logout */}
          <div className="pt-6 border-t border-slate-800 mt-6 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors">
              <Icons.ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs text-red-500/70 hover:text-red-400 transition-colors"
            >
              <Icons.LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 flex flex-col min-w-0 z-10 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat relative">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-slate-950/90 mix-blend-multiply z-0"></div>

        {/* Header bar */}
        <header className="relative z-10 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 py-4 px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Connected Node: Global Edge
            </span>
          </div>

          {/* User SSO info */}
          <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 py-1.5 px-3 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-[10px] border border-sky-500/20">
              {userName.substring(0, 2).toUpperCase()}
            </div>
            <div className="text-left">
              <span className="text-[10px] text-white font-bold block leading-none">{userName}</span>
              <span className="text-[8px] text-sky-400 uppercase font-bold block mt-0.5">Verified Client</span>
            </div>
          </div>
        </header>

        {/* Panel Main Area */}
        <div className="relative z-10 flex-1 p-8 overflow-y-auto">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Heading */}
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">IT Infrastructure Node</h1>
                <p className="text-slate-400 text-sm mt-1">Real-time status metrics of your active hosting, templates, and subdomains.</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel-dark p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Subdomain Nodes</span>
                    <Icons.Link2 className="w-4 h-4 text-sky-400" />
                  </div>
                  <span className="text-2xl font-black text-white">5 Active</span>
                  <span className="text-[10px] text-emerald-400 block mt-1 flex items-center gap-1"><Icons.CheckCircle2 className="w-3 h-3" /> SSL Secured</span>
                </div>

                <div className="glass-panel-dark p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Bandwidth Usage</span>
                    <Icons.Activity className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-xl font-bold text-white mb-1">Welcome, {userName}</div>
                  <div className="text-slate-400 text-sm">Manage your web infrastructure and active nodes</div>
                </div>

                <div className="glass-panel-dark p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Avg SLA Response</span>
                    <Icons.Zap className="w-4 h-4 text-sky-400" />
                  </div>
                  <span className="text-2xl font-black text-white">99.99%</span>
                  <span className="text-[10px] text-emerald-400 block mt-1 flex items-center gap-1"><Icons.ArrowUpRight className="w-3 h-3" /> Target Exceeded</span>
                </div>
              </div>

              {/* Moved Franchise Banner Below */}

              {/* Active Deployments Table */}
              <div className="glass-panel-dark rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                  <h3 className="font-bold text-white text-sm">Hosted Tenant Deployments</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold">Service Name</th>
                        <th className="p-4 font-semibold">Architecture</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {loadingTickets ? (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-slate-500 italic">
                            <div className="flex items-center justify-center gap-3">
                              <Icons.Loader2 className="w-5 h-5 animate-spin text-sky-400" /> 
                              <span>Connecting to Edge Nodes...</span>
                            </div>
                          </td>
                        </tr>
                      ) : deployments.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-slate-500 italic">
                            No active deployments. Select a template to build your site!
                          </td>
                        </tr>
                      ) : (
                        deployments.map((dep, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 font-bold text-white flex items-center gap-3">
                              {dep.logoUrl ? (
                                <img src={dep.logoUrl} className="w-6 h-6 object-contain rounded bg-white" alt="logo" />
                              ) : (
                                <Icons.LayoutTemplate className="w-6 h-6 text-sky-400" />
                              )}
                              {dep.siteName}
                            </td>
                            <td className="p-4 text-slate-400 text-sm">{dep.templateName}</td>
                            <td className="p-4">
                              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs rounded-full">
                                {dep.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              {dep.status === "Domain Secured" ? (
                                <button onClick={() => setSelectedDomain(dep)} className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded shadow-lg shadow-sky-500/20 transition-all">
                                  Manage Domain
                                </button>
                              ) : (
                                <button onClick={() => setSelectedDomain(dep)} className="text-sky-400 hover:text-sky-300 text-sm font-semibold">Manage</button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Franchise Promotional Banner (Moved to Bottom with Special Effect) */}
              {!isPartner && (
                <div className="mt-12 bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-indigo-500/20 border border-sky-500/50 rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] transition-all duration-500 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-white/5 to-indigo-500/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
                  <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                    <Icons.Briefcase className="w-32 h-32 text-sky-400" />
                  </div>
                  <div className="relative z-10 max-w-2xl">
                    <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
                      <Icons.Rocket className="w-6 h-6 text-emerald-400 animate-pulse" />
                      Scale your business. Become a ShyamDash Partner.
                    </h3>
                    <p className="text-sm text-sky-200 leading-relaxed">
                      Join our exclusive wholesale network. Get deep B2B discounts on domains and premium SaaS templates. Resell them to your local clients at your own retail prices and keep <strong className="text-white">100% of the margin</strong>.
                    </p>
                  </div>
                  <div className="relative z-10 shrink-0">
                    <Link href="/partner" className="px-8 py-4 bg-white hover:bg-sky-50 text-sky-600 font-black rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)] block text-center whitespace-nowrap uppercase tracking-wider text-sm">
                      Activate Partner Mode
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DOMAIN ALLOCATOR */}
          {activeTab === "domains" && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Left Column: Search & Results */}
              <div className="lg:col-span-3 space-y-8">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white">Domain Search Terminal</h1>
                  <p className="text-slate-400 text-sm mt-1">Search, book, and reserve global domains for your SaaS templates.</p>
                </div>

                {/* Form */}
                <div className="glass-panel-dark p-8 rounded-2xl border border-slate-800">
                <form onSubmit={handleCheckDomain} className="space-y-6">
                  <div className="max-w-xl">
                    <label className="text-xs text-slate-300 font-bold block mb-2">Search Global Domain Name</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          required
                          value={domainQuery}
                          onChange={(e) => setDomainQuery(e.target.value)}
                          placeholder="e.g. sambalpurweavers"
                          className="w-full p-3.5 bg-slate-900 border border-slate-700 focus:border-sky-500 rounded-l-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                        />
                      </div>
                      <select 
                        value={domainExtension}
                        onChange={(e) => setDomainExtension(e.target.value)}
                        className="p-3.5 bg-slate-800 border-y border-r border-slate-700 focus:border-sky-500 rounded-r-xl text-sm text-sky-400 font-bold focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors cursor-pointer"
                      >
                        <option value=".com">.com</option>
                        <option value=".in">.in</option>
                        <option value=".org">.org</option>
                        <option value=".net">.net</option>
                        <option value=".co">.co</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isCheckingDomain}
                    className="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-sky-500/20 flex items-center gap-2"
                  >
                    {isCheckingDomain ? (
                      <>
                        <Icons.Loader2 className="w-4 h-4 animate-spin" />
                        <span>Scanning DNS Registries...</span>
                      </>
                    ) : (
                      <>
                        <Icons.Search className="w-4 h-4" />
                        <span>Check DNS Availability</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Results UI */}
                {domainResult && (
                  <div className="mt-8 pt-8 border-t border-slate-800">
                    {domainResult.available ? (
                      <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-3">
                          <Icons.CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                          <div>
                            <h4 className="text-white font-bold text-sm">Domain is Available!</h4>
                            <p className="text-slate-400 text-xs mt-0.5">You can book <span className="text-sky-400 font-bold font-mono">{domainResult.domain}</span> now.</p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <select 
                            value={domainDuration}
                            onChange={(e) => setDomainDuration(e.target.value)}
                            className="w-full sm:w-auto p-2.5 bg-slate-800 border border-slate-700 focus:border-sky-500 rounded-lg text-xs text-white font-medium focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors cursor-pointer"
                          >
                            <option value="1">1 Year - ₹1499</option>
                            <option value="2">2 Years - ₹2499 (Save ₹499)</option>
                            <option value="3">3 Years - ₹3999 (Save ₹498)</option>
                            <option value="5">5 Years - ₹6499 (Save ₹996)</option>
                          </select>
                          <button 
                            onClick={handleProvisionDomain}
                            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm rounded-lg transition-all shadow-lg shadow-emerald-500/20 whitespace-nowrap"
                          >
                            Book Domain
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30 flex gap-3">
                        <Icons.AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-bold text-sm">Route Node Already Allocated</h4>
                          <p className="text-slate-400 text-xs mt-0.5">The subdomain path <span className="text-red-400 font-bold font-mono">{domainResult.domain}</span> has already been reserved by another SaaS client. Please try a different name.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column: Promotional Banner */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-500/30 rounded-2xl p-8 relative overflow-hidden h-full min-h-[300px] flex flex-col justify-center shadow-[0_0_30px_rgba(14,165,233,0.15)] group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Icons.Tag className="w-48 h-48 text-sky-400" />
                </div>
                <div className="relative z-10">
                  <span className="px-4 py-1.5 bg-sky-500 text-white text-xs font-black uppercase tracking-widest rounded-full mb-4 inline-block shadow-lg shadow-sky-500/30 animate-pulse">
                    Flash Offer
                  </span>
                  <h3 className="text-3xl font-black text-white mb-3 leading-tight">Grab Your Domain<br/>at ₹1499/year!</h3>
                  <p className="text-base text-sky-200 mb-6">
                    Lock in your brand identity and establish your global presence instantly.
                  </p>
                  <div className="bg-slate-900/50 border border-sky-500/20 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-sm text-slate-300">
                      <strong className="text-white flex items-center gap-2 mb-1"><Icons.Star className="w-4 h-4 text-amber-400" /> Special 2-Year Plan:</strong> 
                      Book for 2 years at just ₹2499 and save big. Limited time only.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

          {/* TAB 3: SUPPORT TICKETS */}
          {activeTab === "support" && (
            <div className="space-y-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">Tech Support Desk</h1>
                <p className="text-slate-400 text-sm mt-1">Submit tickets directly to our systems administrators for cloud provisioning.</p>
              </div>

              {/* Grid split */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Form */}
                <div className="glass-panel-dark p-6 rounded-2xl border border-slate-800">
                  <h3 className="font-bold text-white text-sm mb-6">Open Support Ticket</h3>
                  <form onSubmit={handleCreateTicket} className="space-y-4">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Issue Headline</label>
                      <input 
                        type="text" 
                        required
                        value={newTicketTitle}
                        onChange={(e) => setNewTicketTitle(e.target.value)}
                        placeholder="e.g. Purge database cache manually"
                        className="w-full p-3.5 bg-slate-900 border border-slate-700 focus:border-sky-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Category</label>
                      <select 
                        value={newTicketCategory}
                        onChange={(e) => setNewTicketCategory(e.target.value)}
                        className="w-full p-3.5 bg-slate-900 border border-slate-700 focus:border-sky-500 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                      >
                        <option value="Infrastructure">Infrastructure Scaling</option>
                        <option value="Database">Database Query Error</option>
                        <option value="DNS/SSL">DNS Redirect & SSL Certificate</option>
                        <option value="Security">Role Permissions (SSO)</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
                    >
                      <Icons.Plus className="w-4 h-4" />
                      <span>Transmit Ticket</span>
                    </button>
                  </form>
                </div>

                {/* Ticket List */}
                <div className="space-y-4">
                  <h3 className="font-bold text-white text-sm flex items-center justify-between">
                    <span>Active Support Tickets</span>
                    {loadingTickets && <Icons.Loader2 className="w-4 h-4 animate-spin text-sky-400" />}
                  </h3>
                  
                  {tickets.length === 0 && !loadingTickets && (
                    <div className="text-slate-500 text-sm italic p-4 border border-slate-800 rounded-xl bg-slate-900/50">
                      No support tickets found. Create one to get started.
                    </div>
                  )}

                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="glass-panel-dark p-5 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-mono font-bold">{ticket.id}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[8px] uppercase tracking-wider font-bold">
                            {ticket.category}
                          </span>
                        </div>
                        <h4 className="text-white text-sm font-bold mt-2">{ticket.title}</h4>
                        <span className="text-[10px] text-slate-500 block mt-1">Created on {ticket.date}</span>
                      </div>

                      <div>
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[9px] uppercase ${
                          ticket.status === "Resolved" 
                            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" 
                            : ticket.status === "In-Progress"
                            ? "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                            : "bg-sky-500/10 border border-sky-500/30 text-sky-400"
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RESELLER PANEL */}
          {activeTab === "reseller" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
                  <Icons.Briefcase className="w-8 h-8 text-emerald-400" />
                  Wholesale Command Center
                </h1>
                <p className="text-slate-400 text-sm mt-1">Manage your local clients, buy domains at wholesale rates, and track your agency profits.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Icons.DollarSign className="w-20 h-20 text-emerald-400" /></div>
                  <div className="relative z-10">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">Total Retail Value Sold</span>
                    <span className="text-3xl font-black text-white block mt-2">₹0</span>
                    <span className="text-[10px] text-slate-400 block mt-1">across 0 active clients</span>
                  </div>
                </div>

                <div className="glass-panel-dark p-6 rounded-2xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Wholesale Discount Level</span>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-3xl font-black text-white">Tier 1</span>
                    <span className="text-sm font-bold text-sky-400 mb-1">(40% Off)</span>
                  </div>
                </div>

                <div className="glass-panel-dark p-6 rounded-2xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Wholesale Wallet Balance</span>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-3xl font-black text-white">₹0</span>
                  </div>
                  <button className="mt-3 text-xs font-bold text-sky-400 hover:text-sky-300">Top up wallet &rarr;</button>
                </div>
              </div>

              <div className="glass-panel-dark rounded-2xl overflow-hidden border border-slate-800">
                <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white">Your Agency Clients</h3>
                    <p className="text-xs text-slate-400 mt-1">Provision and manage infrastructure for your customers.</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-lg transition-colors">
                    + Add New Client
                  </button>
                </div>
                <div className="p-12 text-center">
                  <Icons.Users className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-400 text-sm">You haven't added any clients yet.</p>
                  <p className="text-slate-500 text-xs mt-1">Click "Add New Client" to start building their website.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TEMPLATE LIBRARY */}
          {activeTab === "templates" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
                  <Icons.LayoutTemplate className="w-8 h-8 text-sky-400" />
                  SaaS Template Library
                </h1>
                <p className="text-slate-400 text-sm mt-1">Browse, select, and customize beautiful templates for your connected domains.</p>
              </div>
              
              {/* Template Placeholder UI */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {TEMPLATES.map(template => (
                  <div key={template.id} className="glass-panel-dark rounded-2xl overflow-hidden border border-slate-800 flex flex-col group">
                    
                    {/* Image Preview */}
                    <div className="relative h-48 overflow-hidden bg-slate-900 border-b border-slate-800">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                      
                      {/* Dynamic Color Overlay based on selected swatch */}
                      <div 
                        className="absolute inset-0 mix-blend-color transition-colors duration-500 z-0 opacity-50"
                        style={{ backgroundColor: selectedTemplateColor[template.id] }}
                      />
                      
                      <img 
                        src={template.image} 
                        alt={template.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      <div className="absolute top-3 right-3 z-20">
                        <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[9px] font-bold uppercase tracking-wider text-amber-400 rounded-md">
                          {template.industry}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-6 flex-1">
                        {template.description}
                      </p>

                      {/* Color Swatches */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Color Theme</span>
                          <span className="text-[10px] text-sky-400 font-bold">
                            {template.colors.find(c => c.value === selectedTemplateColor[template.id])?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {template.colors.map(color => (
                            <button
                              key={color.value}
                              onClick={() => setSelectedTemplateColor({...selectedTemplateColor, [template.id]: color.value})}
                              className={`w-8 h-8 rounded-full border-2 transition-all ${
                                selectedTemplateColor[template.id] === color.value 
                                  ? "border-sky-400 scale-110 shadow-[0_0_10px_rgba(56,189,248,0.5)]" 
                                  : "border-transparent hover:scale-110 hover:border-slate-500"
                              }`}
                              style={{ backgroundColor: color.value }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Action */}
                      <button className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2">
                        <Icons.Download className="w-4 h-4" />
                        Install Template
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* PROVISIONING OVERLAY */}
      {isProvisioning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-sky-500/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(14,165,233,0.2)] max-w-md w-full text-center flex flex-col items-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-sky-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center">
                <Icons.Globe2 className="w-8 h-8 text-sky-400 animate-[spin_4s_linear_infinite]" />
              </div>
            </div>
            
            <h2 className="text-2xl font-black text-white mb-2">Configuring Domain</h2>
            <p className="text-sky-400 font-mono text-sm mb-6 bg-sky-500/10 px-4 py-2 rounded-lg border border-sky-500/20">
              {provisioningDomain}
            </p>
            
            <div className="w-full space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm">
                <Icons.CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Payment Verified</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Icons.CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Registering DNS Records</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Icons.Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                <span className="text-white font-bold animate-pulse">Propagating Edge Network...</span>
              </div>
            </div>
            
            <p className="mt-8 text-[10px] text-slate-500 uppercase tracking-widest font-bold">Please do not close this window</p>
          </div>
        </div>
      )}

      {/* DOMAIN MANAGEMENT MODAL */}
      {selectedDomain && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/90 backdrop-blur-md rounded-t-2xl z-10">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Icons.Globe2 className="w-5 h-5 text-sky-400" />
                  Manage {selectedDomain.siteName}
                </h2>
                <p className="text-xs text-slate-400 mt-1">Advanced DNS and Domain Settings</p>
              </div>
              <button onClick={() => setSelectedDomain(null)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            {/* Toast Notification */}
            {toastMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-400 px-6 py-3 text-sm font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
                <Icons.CheckCircle2 className="w-4 h-4" /> {toastMsg}
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              
              {/* Auto Renew Toggle */}
              <div className="glass-panel-dark p-6 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Icons.RefreshCw className="w-4 h-4 text-sky-400" /> Auto-Renew Domain
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-md">Automatically bill your card 15 days before expiration to prevent downtime.</p>
                  {!autoRenew && (
                    <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-2">
                      <Icons.AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                      <p className="text-[10px] text-red-300 leading-tight">Warning: Your domain will expire and be deleted unless manually renewed. It cannot be recovered after deletion.</p>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => setAutoRenew(!autoRenew)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoRenew ? 'bg-sky-500' : 'bg-slate-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoRenew ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Nameservers */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Icons.Server className="w-4 h-4 text-sky-400" /> Nameservers
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Point your domain to external hosting servers.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nameserver 1</label>
                    <input type="text" value={ns1} onChange={e => setNs1(e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-700 focus:border-sky-500 rounded-lg text-sm text-white outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nameserver 2</label>
                    <input type="text" value={ns2} onChange={e => setNs2(e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-700 focus:border-sky-500 rounded-lg text-sm text-white outline-none" />
                  </div>
                </div>
                <button 
                  onClick={() => { setIsSaving(true); setTimeout(() => { setIsSaving(false); showToast("Nameservers updated. Please allow 24 hours for DNS propagation."); }, 1000); }}
                  disabled={isSaving}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                  {isSaving ? <Icons.Loader2 className="w-3 h-3 animate-spin" /> : <Icons.Save className="w-3 h-3" />} Save Nameservers
                </button>
              </div>

              {/* DNS Zone Editor */}
              <div className="space-y-4 pt-6 border-t border-slate-800">
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Icons.List className="w-4 h-4 text-sky-400" /> DNS Zone Editor
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Manage A, CNAME, TXT, and MX records.</p>
                </div>
                
                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-900 border-b border-slate-800">
                      <tr>
                        <th className="p-3 text-[10px] uppercase font-bold text-slate-400">Type</th>
                        <th className="p-3 text-[10px] uppercase font-bold text-slate-400">Name</th>
                        <th className="p-3 text-[10px] uppercase font-bold text-slate-400">Value</th>
                        <th className="p-3 text-[10px] uppercase font-bold text-slate-400 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {dnsRecords.map((rec, i) => (
                        <tr key={i} className="hover:bg-slate-800/20">
                          <td className="p-3 font-bold text-sky-400">{rec.type}</td>
                          <td className="p-3 text-white">{rec.name}</td>
                          <td className="p-3 text-slate-400 font-mono text-xs">{rec.value}</td>
                          <td className="p-3 text-right">
                            <button onClick={() => setDnsRecords(dnsRecords.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                          </td>
                        </tr>
                      ))}
                      {/* Add New Record Row */}
                      <tr className="bg-slate-900/50">
                        <td className="p-2">
                          <select value={newDnsRecord.type} onChange={e => setNewDnsRecord({...newDnsRecord, type: e.target.value})} className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-xs text-white">
                            <option>A</option><option>CNAME</option><option>TXT</option><option>MX</option>
                          </select>
                        </td>
                        <td className="p-2">
                          <input type="text" placeholder="@" value={newDnsRecord.name} onChange={e => setNewDnsRecord({...newDnsRecord, name: e.target.value})} className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-xs text-white" />
                        </td>
                        <td className="p-2">
                          <input type="text" placeholder="Value" value={newDnsRecord.value} onChange={e => setNewDnsRecord({...newDnsRecord, value: e.target.value})} className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-xs text-white font-mono" />
                        </td>
                        <td className="p-2 text-right">
                          <button 
                            onClick={() => {
                              if(newDnsRecord.name && newDnsRecord.value) {
                                setDnsRecords([...dnsRecords, newDnsRecord]);
                                setNewDnsRecord({ type: "A", name: "", value: "" });
                                showToast("DNS Record added successfully.");
                              }
                            }}
                            className="px-3 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded text-xs font-bold"
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* EPP Code */}
              <div className="space-y-4 pt-6 border-t border-slate-800">
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Icons.ShieldAlert className="w-4 h-4 text-amber-400" /> Transfer Domain (EPP Code)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">You need an Authorization (EPP) code to transfer this domain to another registrar. Do not share this code with anyone you do not trust.</p>
                </div>
                
                {eppCode ? (
                  <div className="p-4 bg-slate-950 border border-slate-700 rounded-xl max-w-md flex items-center justify-between">
                    <code className="text-emerald-400 font-mono font-bold tracking-widest">{eppCode}</code>
                    <button className="text-xs text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1">
                      <Icons.Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setEppCode("IT" + Math.random().toString(36).substring(2, 10).toUpperCase() + "X!")}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 hover:border-amber-500/30 text-xs font-bold rounded-lg transition-all"
                  >
                    Reveal Authorization Code
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
