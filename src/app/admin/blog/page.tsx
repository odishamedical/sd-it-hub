"use client";

import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { db, collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "@/utils/firebase";

export default function BlogManager() {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newTopic, setNewTopic] = useState({
    title: "",
    slug: "",
    description: "",
    iconName: "BookOpen",
    color: "from-indigo-500/20 to-purple-500/20",
    border: "border-indigo-500/30"
  });

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "shyamdash_blog_topics"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTopics(data);
    } catch (err) {
      console.error("Error fetching blog topics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleAddTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.title || !newTopic.slug) return alert("Title and Slug are required.");
    
    try {
      await addDoc(collection(db, "shyamdash_blog_topics"), {
        ...newTopic,
        createdAt: serverTimestamp()
      });
      setIsAdding(false);
      setNewTopic({
        title: "", slug: "", description: "", iconName: "BookOpen", color: "from-indigo-500/20 to-purple-500/20", border: "border-indigo-500/30"
      });
      fetchTopics();
    } catch (error) {
      console.error("Error adding topic:", error);
      alert("Failed to add topic.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this topic?")) {
      try {
        await deleteDoc(doc(db, "shyamdash_blog_topics", id));
        fetchTopics();
      } catch (error) {
        console.error("Error deleting topic:", error);
        alert("Failed to delete topic.");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Blog & Content Manager</h1>
          <p className="text-slate-400">Manage knowledge hub topics and articles.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]"
        >
          <Icons.Plus className="w-5 h-5" /> Add Topic
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 relative">
          <button onClick={() => setIsAdding(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white">
            <Icons.X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-white mb-6">Create New Knowledge Topic</h2>
          
          <form onSubmit={handleAddTopic} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Topic Title</label>
              <input type="text" required value={newTopic.title} onChange={e => setNewTopic({...newTopic, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" placeholder="e.g. Digital Marketing" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">URL Slug</label>
              <input type="text" required value={newTopic.slug} onChange={e => setNewTopic({...newTopic, slug: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" placeholder="e.g. digital-marketing" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Short Description</label>
              <textarea required value={newTopic.description} onChange={e => setNewTopic({...newTopic, description: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" placeholder="Describe what this topic covers..."></textarea>
            </div>
            
            <div className="md:col-span-2 flex justify-end mt-4">
              <button type="submit" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-colors">
                Save Topic
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Topic</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">URL Slug</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading topics...</td></tr>
            ) : topics.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">No blog topics created yet.</td></tr>
            ) : (
              topics.map((item) => (
                <tr key={item.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
                         <Icons.BookOpen className="w-5 h-5 text-indigo-400" />
                      </div>
                      <span className="font-bold text-white">{item.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-400 font-mono text-sm">/{item.slug}</td>
                  <td className="p-4 text-slate-500 text-sm max-w-[300px] truncate">{item.description}</td>
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
