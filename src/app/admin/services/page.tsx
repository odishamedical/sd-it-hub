"use client";

import React, { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { db, collection, getDocs, query, orderBy, doc, updateDoc, addDoc, deleteDoc } from "@/utils/firebase";

export default function ServicesManager() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState({ title: "", description: "", priceRange: "", category: "Development", order: 0, isActive: true });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "services"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      console.error("Error fetching services:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "services"), newService);
      setIsAdding(false);
      setNewService({ title: "", description: "", priceRange: "", category: "Development", order: services.length, isActive: true });
      fetchServices();
    } catch (e) {
      console.error("Error adding service:", e);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, "services", id), { isActive: !currentStatus });
      fetchServices();
    } catch (e) {
      console.error("Error toggling status:", e);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteDoc(doc(db, "services", id));
      fetchServices();
    } catch (e) {
      console.error("Error deleting service:", e);
    }
  };

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Services Manager</h1>
          <p className="text-slate-400 text-sm mt-1">Manage the services displayed on the public website.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchServices} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300">
            <Icons.RefreshCw className="w-5 h-5" />
          </button>
          <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors">
            {isAdding ? "Cancel" : <><Icons.Plus className="w-4 h-4" /> Add Service</>}
          </button>
        </div>
      </header>

      {isAdding && (
        <form onSubmit={handleAddService} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-white mb-4">Add New Service</h3>
          </div>
          <input type="text" placeholder="Service Title" required value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-indigo-500" />
          <select value={newService.category} onChange={e => setNewService({...newService, category: e.target.value})} className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-indigo-500">
            <option value="Development">Development</option>
            <option value="Promotion">Promotion</option>
            <option value="Consulting">Consulting</option>
          </select>
          <input type="text" placeholder="Price Range (e.g. ₹50k - ₹1L)" value={newService.priceRange} onChange={e => setNewService({...newService, priceRange: e.target.value})} className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-indigo-500" />
          <input type="number" placeholder="Display Order (0, 1, 2...)" value={newService.order} onChange={e => setNewService({...newService, order: parseInt(e.target.value)})} className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-indigo-500" />
          <textarea placeholder="Description" required value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} rows={2} className="md:col-span-2 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-indigo-500 resize-none"></textarea>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors">Save Service</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-12 flex justify-center">
            <Icons.Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
          </div>
        ) : services.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-2xl">
            No services found. Click 'Add Service' to create one.
          </div>
        ) : (
          services.map(service => (
            <div key={service.id} className={`bg-slate-900/80 border rounded-2xl p-6 transition-colors ${service.isActive ? 'border-slate-700' : 'border-red-900/30 opacity-60'}`}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">{service.category}</span>
                <div className="flex gap-2">
                  <button onClick={() => toggleStatus(service.id, service.isActive)} title="Toggle Visibility" className={`p-1.5 rounded hover:bg-slate-800 ${service.isActive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {service.isActive ? <Icons.Eye className="w-4 h-4" /> : <Icons.EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => deleteService(service.id)} title="Delete" className="p-1.5 rounded hover:bg-slate-800 text-red-500">
                    <Icons.Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-3">{service.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-sm font-mono text-emerald-400">{service.priceRange || 'Contact for price'}</span>
                <span className="text-xs text-slate-500">Order: {service.order}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
