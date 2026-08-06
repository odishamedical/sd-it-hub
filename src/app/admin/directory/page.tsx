"use client";

import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { db, collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "@/utils/firebase";

export default function DirectoryManager() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newBusiness, setNewBusiness] = useState({
    name: "",
    category: "Healthcare",
    location: "",
    image: "",
    rating: "5.0",
    reviews: "0"
  });

  const fetchListings = async () => {
    setLoading(true);
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

  useEffect(() => {
    fetchListings();
  }, []);

  const handleAddBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBusiness.name || !newBusiness.location) return alert("Name and Location are required.");
    
    try {
      await addDoc(collection(db, "shyamdash_directory"), {
        ...newBusiness,
        createdAt: serverTimestamp()
      });
      setIsAdding(false);
      setNewBusiness({ name: "", category: "Healthcare", location: "", image: "", rating: "5.0", reviews: "0" });
      fetchListings();
    } catch (error) {
      console.error("Error adding business:", error);
      alert("Failed to add business.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this business?")) {
      try {
        await deleteDoc(doc(db, "shyamdash_directory", id));
        fetchListings();
      } catch (error) {
        console.error("Error deleting business:", error);
        alert("Failed to delete business.");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Directory Manager</h1>
          <p className="text-slate-400">Manage all business listings on the Global Directory.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)]"
        >
          <Icons.Plus className="w-5 h-5" /> Add Business
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 relative">
          <button onClick={() => setIsAdding(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white">
            <Icons.X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-white mb-6">Add New Business</h2>
          
          <form onSubmit={handleAddBusiness} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Business Name</label>
              <input type="text" required value={newBusiness.name} onChange={e => setNewBusiness({...newBusiness, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500" placeholder="e.g. Apollo Hospital" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category</label>
              <select value={newBusiness.category} onChange={e => setNewBusiness({...newBusiness, category: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500">
                <option value="Healthcare">Healthcare</option>
                <option value="Repairs">Repairs</option>
                <option value="Tech Agencies">Tech Agencies</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Real Estate">Real Estate</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Location (City, State)</label>
              <input type="text" required value={newBusiness.location} onChange={e => setNewBusiness({...newBusiness, location: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500" placeholder="e.g. Bhubaneswar, Odisha" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Image URL (Optional)</label>
              <input type="text" value={newBusiness.image} onChange={e => setNewBusiness({...newBusiness, image: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500" placeholder="https://..." />
            </div>
            <div className="md:col-span-2 flex justify-end mt-4">
              <button type="submit" className="px-8 py-3 bg-fuchsia-600 text-white font-bold rounded-xl hover:bg-fuchsia-500 transition-colors">
                Save Listing
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Business</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading directory...</td></tr>
            ) : listings.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">No businesses listed yet. Click "Add Business" to begin.</td></tr>
            ) : (
              listings.map((item) => (
                <tr key={item.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500"><Icons.Image className="w-4 h-4" /></div>
                        )}
                      </div>
                      <span className="font-bold text-white">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-400">{item.location}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-fuchsia-500/10 text-fuchsia-400 rounded text-xs font-bold border border-fuchsia-500/20">{item.category}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Icons.Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
