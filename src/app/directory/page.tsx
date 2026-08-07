import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DirectoryPage() {
  return (
    <main className="min-h-screen bg-[#020610] text-slate-200 font-sans selection:bg-amber-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/stock/bg.png" alt="Cosmic Tech Background" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020610]/40 via-[#020610]/80 to-[#020610] mix-blend-multiply"></div>
      </div>

      <Header />

      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-4 z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wide text-orange-200 uppercase">ShyamDash Directory</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-xl">
              Find & Claim The Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Local Businesses</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
              Discover top-rated local services, restaurants, and professionals. Or, claim your own business profile to boost your local SEO and get more customers today.
            </p>
            
            {/* Two-Input Search Bar for Directory */}
            <div className="flex flex-col sm:flex-row gap-2 bg-white/10 backdrop-blur-xl p-2 rounded-lg border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] mb-6 w-full">
              <div className="flex-1 relative flex items-center bg-[#0a0f1c]/80 rounded p-1 border border-slate-700 focus-within:border-orange-500 transition-colors">
                <Icons.Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input type="text" placeholder="What are you looking for?" className="w-full bg-transparent border-none text-white p-3 focus:outline-none placeholder-slate-500" />
              </div>
              <div className="flex-1 relative flex items-center bg-[#0a0f1c]/80 rounded p-1 border border-slate-700 focus-within:border-orange-500 transition-colors">
                <Icons.MapPin className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input type="text" placeholder="City, Zip, or Neighborhood" className="w-full bg-transparent border-none text-white p-3 focus:outline-none placeholder-slate-500" />
              </div>
              <button className="px-8 py-3 bg-gradient-to-b from-orange-500 to-orange-700 hover:to-orange-600 text-white font-bold rounded shadow-[0_0_15px_rgba(249,115,22,0.5)] hover:shadow-[0_0_25px_rgba(249,115,22,0.8)] transition-all">
                Search
              </button>
            </div>
            
            <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-1.5"><Icons.CheckCircle className="w-4 h-4 text-orange-400" /> Browse Listings</span>
              <span className="flex items-center gap-1.5"><Icons.CheckCircle className="w-4 h-4 text-orange-400" /> Claim Your Business</span>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="w-full lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-[450px]">
            <Image 
              src="/stock/hero_directory.png" 
              alt="Local Business Directory" 
              fill 
              className="object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
              priority
            />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 relative z-10">
          
          {/* Categories Grid */}
          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Explore Categories</h2>
                <p className="text-slate-400">Find exactly what you need in your neighborhood.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded bg-orange-600/20 text-orange-400 border border-orange-500/30 font-medium text-sm hover:bg-orange-600/40 transition-colors">View All Categories</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <CategoryCard title="Restaurants & Cafes" count="1,245 Listings" icon={<Icons.Utensils className="w-6 h-6 text-orange-400" />} />
              <CategoryCard title="Health & Wellness" count="842 Listings" icon={<Icons.Activity className="w-6 h-6 text-blue-400" />} />
              <CategoryCard title="Home & Services" count="3,105 Listings" icon={<Icons.Wrench className="w-6 h-6 text-amber-400" />} />
              <CategoryCard title="Shopping & Retail" count="950 Listings" icon={<Icons.ShoppingBag className="w-6 h-6 text-purple-400" />} />
            </div>
          </section>

          {/* Featured Listings */}
          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Featured Businesses</h2>
                <p className="text-slate-400">Top-rated establishments recommended by locals.</p>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:px-0 md:pb-0 md:mx-0 hide-scrollbar">
                <button className="whitespace-nowrap px-4 py-2 rounded bg-white/10 text-white font-medium text-sm border border-white/20 backdrop-blur-md">Top Rated</button>
                <button className="whitespace-nowrap px-4 py-2 rounded text-slate-400 hover:bg-white/5 hover:text-white font-medium text-sm transition-colors">New Listings</button>
                <button className="whitespace-nowrap px-4 py-2 rounded text-slate-400 hover:bg-white/5 hover:text-white font-medium text-sm transition-colors">Near Me</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ListingCard 
                title="Cafe Delight" 
                category="Coffee Shop" 
                rating="4.8" 
                reviews="124" 
                location="Downtown Sambalpur"
                tag="Open Now"
              />
              <ListingCard 
                title="Elite Fitness Gym" 
                category="Health & Wellness" 
                rating="4.9" 
                reviews="89" 
                location="Budharaja, Sambalpur"
                tag="Popular"
              />
              <ListingCard 
                title="City Auto Repair" 
                category="Automotive Services" 
                rating="4.7" 
                reviews="210" 
                location="Ainthapali, Sambalpur"
                tag="Trusted"
              />
            </div>
            
            <div className="mt-10 text-center">
              <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded text-white font-medium transition-all hover:border-white/40 shadow-lg">
                View All Businesses
              </button>
            </div>
          </section>

          {/* Claim Business Process */}
          <section className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
            
            <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Claim Your Business on ShyamDash</h2>
              <p className="text-slate-300 text-lg">Take control of your local presence. Join thousands of businesses managing their profiles, responding to reviews, and growing their customer base.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0 z-0"></div>
              
              <ProcessStep 
                number="1" 
                title="Verify Details" 
                desc="Find your listing and claim it by verifying your identity securely."
              />
              <ProcessStep 
                number="2" 
                title="Boost Visibility" 
                desc="Add photos, update hours, and optimize your profile for local SEO."
              />
              <ProcessStep 
                number="3" 
                title="Get More Leads" 
                desc="Respond to customer reviews and track your page analytics."
              />
            </div>

            <div className="mt-12 text-center relative z-10">
              <Link href="/partner" className="inline-block px-10 py-4 bg-gradient-to-b from-orange-500 to-orange-700 hover:to-orange-600 text-white font-bold rounded shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.7)] transition-all hover:-translate-y-1 hover:scale-105">
                Claim My Business Free
              </Link>
            </div>
          </section>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}

function CategoryCard({ title, count, icon }: { title: string, count: string, icon: React.ReactNode }) {
  return (
    <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-orange-500/50 hover:shadow-[0_15px_40px_rgba(234,88,12,0.25)] hover:-translate-y-2 transition-all duration-300 flex items-center gap-4 cursor-pointer relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
      <div className="w-14 h-14 rounded-lg bg-slate-900/80 border border-white/10 flex items-center justify-center shrink-0 relative z-10 group-hover:border-orange-500/50 transition-colors shadow-inner">
        {icon}
      </div>
      <div className="relative z-10">
        <h3 className="font-bold text-white text-lg group-hover:text-orange-400 transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm">{count}</p>
      </div>
    </div>
  );
}

function ListingCard({ title, category, rating, reviews, location, tag }: { title: string, category: string, rating: string, reviews: string, location: string, tag: string }) {
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] group hover:border-orange-500/70 hover:shadow-[0_15px_40px_rgba(234,88,12,0.3)] hover:-translate-y-2 transition-all duration-300 flex flex-col">
      <div className="h-48 relative bg-slate-800 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity"></div>
        <Image src="/stock/directory.png" alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 text-xs font-bold text-white bg-orange-600 rounded shadow-md">{tag}</span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-xl text-white group-hover:text-orange-400 transition-colors">{title}</h3>
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-sm font-bold text-amber-400 border border-white/10 backdrop-blur-md">
              <Icons.Star className="w-3.5 h-3.5 fill-amber-400" /> {rating}
            </div>
          </div>
          <p className="text-orange-300/90 text-sm font-medium mb-4">{category}</p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Icons.MapPin className="w-4 h-4 text-orange-400/70 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Icons.MessageSquare className="w-4 h-4 text-orange-400/70 shrink-0" />
              <span>{reviews} Verified Reviews</span>
            </div>
          </div>
        </div>
        
        <button className="w-full py-2.5 rounded bg-white/5 hover:bg-gradient-to-r hover:from-orange-600 hover:to-orange-500 text-slate-200 hover:text-white border border-white/10 hover:border-orange-400 font-bold transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(234,88,12,0.4)]">
          View Profile
        </button>
      </div>
    </div>
  );
}

function ProcessStep({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center group">
      <div className="w-16 h-16 rounded-full bg-[#0a0f1c] border-2 border-orange-500/50 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(234,88,12,0.2)] group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-orange-600 group-hover:border-orange-400 transition-all duration-500">
        <span className="text-2xl font-bold text-orange-400 group-hover:text-white">{number}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">{title}</h3>
      <p className="text-slate-300 text-sm leading-relaxed max-w-xs">{desc}</p>
    </div>
  );
}
