import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-50 overflow-hidden font-sans">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Glow Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
            Enterprise SaaS Infrastructure
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            The Digital Engine for <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Modern IT Services.</span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl">
            Scale your IT operations with a professional client portal, automated billing, 
            and real-time service monitoring. Built for the SD Ecosystem.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20">
              Launch Client Portal
            </button>
            <button className="px-8 py-4 border border-slate-700 hover:bg-slate-800 text-white font-bold rounded-xl transition-all">
              View Service Plans
            </button>
          </div>

          {/* Preview Image */}
          <div className="relative w-full max-w-5xl group">
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
             <div className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden p-2">
                <Image 
                  src="/it-hub-preview.png" 
                  alt="SaaS Dashboard Preview" 
                  width={1200} 
                  height={800} 
                  className="rounded-xl shadow-2xl"
                />
             </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="container mx-auto px-6 py-20 border-t border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 mb-6 font-bold text-xl">01</div>
            <h3 className="text-xl font-bold mb-4">Auto Billing</h3>
            <p className="text-slate-400">Seamless Stripe integration for monthly subscriptions and service invoices.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400 mb-6 font-bold text-xl">02</div>
            <h3 className="text-xl font-bold mb-4">Client Isolation</h3>
            <p className="text-slate-400">Professional multi-tenant architecture ensures data privacy for every company.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center text-violet-400 mb-6 font-bold text-xl">03</div>
            <h3 className="text-xl font-bold mb-4">Support OS</h3>
            <p className="text-slate-400">Advanced ticketing and real-time project tracking for your IT service delivery.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
