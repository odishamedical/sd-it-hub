"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, MapPin, Stethoscope, Wrench, Laptop, Utensils, Home, Car, Star, Navigation, Map } from "lucide-react";
import Image from "next/image";
import { db, collection, getDocs } from "@/utils/firebase";

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const categories = [
    { name: "Hospitals & Clinics", icon: <Stethoscope className="w-8 h-8" />, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30" },
    { name: "Plumbers & Repairs", icon: <Wrench className="w-8 h-8" />, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
    { name: "Tech Agencies", icon: <Laptop className="w-8 h-8" />, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30" },
    { name: "Restaurants & Cafes", icon: <Utensils className="w-8 h-8" />, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
    { name: "Real Estate", icon: <Home className="w-8 h-8" />, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/30" },
    { name: "Automotive Services", icon: <Car className="w-8 h-8" />, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30" },
  ];

  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "shyamdash_directory"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListings(data);
      } catch (err) {
        console.error("Error fetching directory listings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-[#050B1B] text-slate-200 font-sans pb-20">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 flex flex-col items-center justify-center overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-fuchsia-500/20 blur-[150px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-500/20 blur-[150px] rounded-full pointer-events-none z-0"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full">
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
            The Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">Business Hub</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Search thousands of verified businesses, services, and professionals across our master directory ecosystem.
          </p>

          {/* Master Search Bar (JustDial Style) */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-fuchsia-500/30 p-2 md:p-3 rounded-2xl flex flex-col md:flex-row gap-2 shadow-[0_0_40px_rgba(217,70,239,0.15)] mx-auto max-w-4xl">
            
            <div className="flex-1 relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="What are you looking for? (e.g. Plumber, IT Agency)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 py-3 md:py-4 pl-12 pr-4 text-base placeholder-slate-500"
              />
            </div>
            
            <div className="hidden md:block w-px bg-slate-700/50 my-2"></div>
            
            <div className="flex-1 relative flex items-center">
              <MapPin className="absolute left-4 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="City, State, or Pincode"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 py-3 md:py-4 pl-12 pr-4 text-base placeholder-slate-500"
              />
            </div>
            
            <button className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-lg px-10 py-3 md:py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(217,70,239,0.4)]">
              Search
            </button>
          </div>
          
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Categories Grid */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Popular Categories</h2>
            <button className="text-fuchsia-400 hover:text-fuchsia-300 font-medium text-sm transition-colors">View All &rarr;</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer flex flex-col items-center justify-center p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl hover:bg-slate-800 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-fuchsia-900/20 hover:border-fuchsia-500/50">
                <div className={`w-16 h-16 rounded-2xl ${category.bg} ${category.color} ${category.border} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-sm font-bold text-center text-slate-300 group-hover:text-white">{category.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Dual Layout: Listings + Map Placeholder */}
        <section className="flex flex-col lg:flex-row gap-8">
          
          {/* Featured Listings */}
          <div className="w-full lg:w-3/5 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Trending near you</h2>
            
            {loading ? (
              <div className="space-y-4">
                {[1,2,3].map(n => (
                  <div key={n} className="h-32 bg-slate-900/40 rounded-2xl border border-slate-800/50 animate-pulse"></div>
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
                <div className="w-16 h-16 bg-fuchsia-500/10 rounded-full flex items-center justify-center mb-4 border border-fuchsia-500/20">
                  <MapPin className="w-8 h-8 text-fuchsia-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Businesses Found</h3>
                <p className="text-slate-500 max-w-sm mb-6">Our global directory is currently empty. Be the very first to claim your business listing in this area!</p>
                <button className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                  Add Your Business
                </button>
              </div>
            ) : (
              listings.map((listing) => (
                <div key={listing.id} className="flex flex-col sm:flex-row gap-6 p-6 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl hover:border-fuchsia-500/30 transition-all group cursor-pointer">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-slate-700 bg-slate-800">
                    {listing.image ? (
                      <Image src={listing.image} alt={listing.name || "Business"} width={128} height={128} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                        <Home className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-400 transition-colors">{listing.name || "Unnamed Business"}</h3>
                        <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-500/20">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          {listing.rating || "New"}
                        </div>
                      </div>
                      
                      <span className="inline-block px-3 py-1 bg-slate-800 text-slate-300 text-xs font-medium rounded-full border border-slate-700 mb-3">
                        {listing.category || "Uncategorized"}
                      </span>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <MapPin className="w-4 h-4" />
                        {listing.location || "Location not specified"}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-sm text-slate-500">{listing.reviews || 0} verified reviews</span>
                      <button className="text-sm font-bold text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        View Profile <Navigation className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Interactive Map Placeholder */}
          <div className="w-full lg:w-2/5 relative">
            <div className="sticky top-28 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden h-[600px] flex flex-col items-center justify-center p-8 text-center group">
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=20.2961,85.8245&zoom=12&size=600x600&maptype=roadmap&style=feature:all|element:geometry|color:0x202c3e&style=feature:all|element:labels.text.fill|color:0x8ba975&key=YOUR_API_KEY')] bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity blur-[2px] grayscale"></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B1B] via-transparent to-[#050B1B]/50"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-fuchsia-500/20 rounded-full flex items-center justify-center mb-6 border border-fuchsia-500/50 shadow-[0_0_30px_rgba(217,70,239,0.3)] animate-pulse">
                  <Map className="w-8 h-8 text-fuchsia-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Map Integration</h3>
                <p className="text-slate-400 mb-8 max-w-sm">
                  Interactive geographic search is currently disabled in Phase 4. It will be wired to the Gold and Bhulia Hubs in future updates.
                </p>
                <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl border border-slate-700 transition-colors cursor-not-allowed opacity-50">
                  Search this area
                </button>
              </div>
            </div>
          </div>
          
        </section>

      </main>

      <Footer />
    </div>
  );
}
