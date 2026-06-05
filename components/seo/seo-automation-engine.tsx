"use client";

import { useState, useEffect } from "react";
import { Zap, Plus, Trash2, Power, PowerOff } from "lucide-react";

export function SeoAutomationEngine({ projectId }: { projectId: string }) {
  const [automations, setAutomations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAutomations();
  }, [projectId]);

  const fetchAutomations = async () => {
    try {
      const res = await fetch(`/api/seo/automations?projectId=${projectId}`);
      const data = await res.json();
      setAutomations(data.automations || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleAutomation = async (id: string, currentState: boolean) => {
    try {
      await fetch(`/api/seo/automations`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: !currentState })
      });
      fetchAutomations();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteAutomation = async (id: string) => {
    if(!confirm('Delete this automation?')) return;
    try {
      await fetch(`/api/seo/automations?id=${id}`, { method: 'DELETE' });
      fetchAutomations();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-card border rounded-[24px] shadow-sm overflow-hidden mt-10">
      <div className="p-6 border-b flex justify-between items-center bg-muted/30">
        <div>
            <h3 className="text-xl font-bold font-mono uppercase tracking-widest flex items-center gap-2">
            <Zap size={20} className="text-primary"/> Automation Engine
            </h3>
            <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">IF/THEN Logic Handlers</p>
        </div>
        <button 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-colors"
        >
          <Plus size={16} /> New Node
        </button>
      </div>

      <div className="p-6 space-y-4">
        {loading ? (
           <div className="animate-pulse flex gap-4"><div className="h-20 bg-muted w-full rounded-xl"></div></div>
        ) : automations.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground border border-dashed rounded-xl">
             No logic nodes deployed.
          </div>
        ) : (
          automations.map(auto => (
            <div key={auto.id} className={`flex items-center justify-between p-5 border rounded-xl transition-all ${auto.isActive ? 'bg-background border-primary/30 shadow-[0_0_15px_rgba(0,240,255,0.05)]' : 'bg-muted/50 border-border opacity-60'}`}>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-sm uppercase tracking-widest">{auto.name}</h4>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${auto.isActive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {auto.isActive ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-muted-foreground">IF</span>
                  <span className="bg-muted px-2 py-1 rounded text-foreground">{auto.triggerEvent}</span>
                  <span className="text-muted-foreground">THEN</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20">{auto.actionType}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleAutomation(auto.id, auto.isActive)}
                  className={`p-3 rounded-lg border transition-colors ${auto.isActive ? 'text-green-500 border-green-500/30 hover:bg-green-500/10' : 'text-gray-400 border-gray-400/30 hover:bg-gray-400/10'}`}
                >
                  {auto.isActive ? <Power size={16} /> : <PowerOff size={16} />}
                </button>
                <button onClick={() => deleteAutomation(auto.id)} className="p-3 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}