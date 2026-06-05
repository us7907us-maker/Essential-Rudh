"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft, Plus, Search, Trash2, Edit2, AlertCircle } from "lucide-react";

export function RedirectManager({ projectId }: { projectId: string }) {
  const [redirects, setRedirects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ sourceUrl: '', targetUrl: '', statusCode: 301 });

  useEffect(() => {
    fetchRedirects();
  }, [projectId]);

  const fetchRedirects = async () => {
    try {
      const res = await fetch(`/api/seo/redirects?projectId=${projectId}`);
      const data = await res.json();
      setRedirects(data.redirects || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/seo/redirects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, projectId })
      });
      if (res.ok) {
        setIsAdding(false);
        setFormData({ sourceUrl: '', targetUrl: '', statusCode: 301 });
        fetchRedirects();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this redirect rule?')) return;
    try {
      await fetch(`/api/seo/redirects?id=${id}`, { method: 'DELETE' });
      fetchRedirects();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-card border rounded-[24px] shadow-sm overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center bg-muted/30">
        <div>
            <h3 className="text-xl font-bold font-mono uppercase tracking-widest flex items-center gap-2">
            <ArrowRightLeft size={20} className="text-primary"/> Redirect Engine
            </h3>
            <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">Manage 301/302 Routing Protocols</p>
        </div>
        <div className="flex gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              placeholder="Search routing rules..." 
              className="pl-10 pr-4 py-2 rounded-xl border bg-background text-sm focus:ring-2 focus:ring-primary outline-none min-w-[250px]"
            />
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-background px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-colors"
          >
            <Plus size={16} /> Add Rule
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="p-6 bg-muted/50 border-b">
          <form onSubmit={handleSave} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Source URL Path</label>
              <input 
                required
                value={formData.sourceUrl}
                onChange={e => setFormData({...formData, sourceUrl: e.target.value})}
                placeholder="/old-collection-2023"
                className="w-full bg-background border p-3 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="w-full">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Target Destination URL</label>
              <input 
                required
                value={formData.targetUrl}
                onChange={e => setFormData({...formData, targetUrl: e.target.value})}
                placeholder="https://essentialrush.com/new-collection"
                className="w-full bg-background border p-3 rounded-lg text-sm font-mono text-blue-500 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="w-32">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Type</label>
              <select 
                value={formData.statusCode}
                onChange={e => setFormData({...formData, statusCode: parseInt(e.target.value)})}
                className="w-full bg-background border p-3 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary outline-none"
              >
                <option value={301}>301 Perm</option>
                <option value={302}>302 Temp</option>
              </select>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-3 bg-background border rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-colors">Deploy</button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground font-mono uppercase tracking-widest text-[10px]">
            <tr>
              <th className="p-4">Source Path</th>
              <th className="p-4">Destination</th>
              <th className="p-4 text-center">Type</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y font-mono">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center animate-pulse font-sans">Scanning routing tables...</td></tr>
            ) : redirects.length === 0 ? (
                <tr><td colSpan={5} className="p-12 text-center text-muted-foreground font-sans">
                    <AlertCircle className="mx-auto mb-3 opacity-50" size={32}/>
                    No routing rules deployed.
                </td></tr>
            ) : redirects.map(rule => (
              <tr key={rule.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4 text-muted-foreground">{rule.sourceUrl}</td>
                <td className="p-4 text-blue-500 break-all">{rule.targetUrl}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${rule.statusCode === 301 ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                    {rule.statusCode}
                  </span>
                </td>
                <td className="p-4 text-center">
                    <div className="flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${rule.isActive ? 'bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.5)]' : 'bg-red-500'}`}></div>
                    </div>
                </td>
                <td className="p-4 text-center flex justify-center gap-2">
                  <button className="text-muted-foreground hover:text-primary p-2 rounded-lg transition-colors">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(rule.id)} className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}