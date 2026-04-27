"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, Key, Copy, Trash2, Eye, EyeOff, Check, 
  Calendar, ShieldCheck, AlertTriangle, Shield, CheckCircle2, Bot 
} from "lucide-react";
import { cn } from "@/lib/utils";

type KeyRecord = {
  id: number;
  name: string;
  key: string;
  created: string;
  status: "Active" | "Revoked";
  lastUsed: string;
};

type ProviderKeyRecord = {
  id: string;
  provider: string;
  key: string;
  status: "Configured" | "Not Configured";
  lastUpdated: string;
  icon: typeof Bot;
};

const INITIAL_KEYS: KeyRecord[] = [
  { id: 1, name: "Production Gateway", key: "sk-or-v1-7a8f9c2e-4b6d-4f1a-8c9e-1d2f3a4b5c6d", created: "2024-03-15", status: "Active", lastUsed: "2 mins ago" },
  { id: 2, name: "Development SDK", key: "sk-or-v1-4d2b1f8e-9c3a-4e2d-7b1f-6a5c4d3e2f1a", created: "2024-03-20", status: "Active", lastUsed: "1 hour ago" },
  { id: 3, name: "Testing Suite", key: "sk-or-v1-x9a3c4f2-7e1d-4b9c-8a2f-5d6e7f8a9b0c", created: "2024-03-25", status: "Revoked", lastUsed: "5 days ago" },
];

const INITIAL_PROVIDERS: ProviderKeyRecord[] = [
  { id: "openai", provider: "OpenAI", key: "sk-proj-9f8e7d...2b1a", status: "Configured", lastUpdated: "Updated 12 days ago", icon: Bot },
  { id: "anthropic", provider: "Anthropic", key: "sk-ant-api03...9182", status: "Configured", lastUpdated: "Updated 1 month ago", icon: Shield },
  { id: "google", provider: "Google Gemini", key: "", status: "Not Configured", lastUpdated: "Never configured", icon: Key },
];

export default function ApiKeysClient() {
  const [keys, setKeys] = useState<KeyRecord[]>(INITIAL_KEYS);
  const [providers, setProviders] = useState<ProviderKeyRecord[]>(INITIAL_PROVIDERS);
  
  // Interaction State
  const [visibleKeys, setVisibleKeys] = useState<Set<number | string>>(new Set());
  const [copiedId, setCopiedId] = useState<number | string | null>(null);
  
  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKeyData, setCreatedKeyData] = useState<KeyRecord | null>(null);
  
  const [deleteData, setDeleteData] = useState<{ id: number | string, type: "router" | "provider" } | null>(null);

  const toggleVisibility = (id: number | string) => {
    const next = new Set(visibleKeys);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setVisibleKeys(next);
  };

  const copyToClipboard = (id: number | string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const maskKey = (key: string, id: number | string) => {
    if (!key) return "No key configured";
    if (visibleKeys.has(id)) return key;
    if (key.startsWith("sk-or-v1-")) {
      return `sk-or-v1-****...${key.slice(-4)}`;
    }
    return `${key.slice(0, 7)}****...${key.slice(-4)}`;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    
    // Mock new key generation
    const mockHash = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    const newKey: KeyRecord = {
      id: Date.now(),
      name: newKeyName,
      key: `sk-or-v1-${mockHash}`,
      created: new Date().toISOString().slice(0, 10),
      status: "Active",
      lastUsed: "Never",
    };
    
    setKeys([newKey, ...keys]);
    setCreatedKeyData(newKey);
    setNewKeyName("");
  };

  const closeCreateFlow = () => {
    setIsCreateOpen(false);
    setCreatedKeyData(null);
  };

  const executeDelete = () => {
    if (!deleteData) return;
    if (deleteData.type === "router") {
      setKeys(keys.filter(k => k.id !== deleteData.id));
    } else {
      setProviders(providers.map(p => 
        p.id === deleteData.id 
          ? { ...p, key: "", status: "Not Configured", lastUpdated: "Key removed just now" } 
          : p
      ));
    }
    setDeleteData(null);
  };

  return (
    <div className="space-y-12">
      {/* Header section is in page.tsx */}

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Orbyt API Keys</h2>
            <p className="text-sm text-muted-foreground mt-1">Keys used to authenticate your application with the routing gateway.</p>
          </div>
          <Button size="sm" onClick={() => setIsCreateOpen(true)} className="shadow-[0_0_15px_rgba(201,168,78,0.3)] bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-1" /> Create New Key
          </Button>
        </div>

        {/* Router Keys List */}
        <Card className="border-white/5 bg-white/5 backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-black/20">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Name</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Secret Key</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {keys.map((key) => (
                  <tr key={key.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="font-bold text-foreground">{key.name}</div>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                          <Calendar className="w-3 h-3" /> Created {key.created}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <code className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors min-w-[240px]">
                          {maskKey(key.key, key.id)}
                        </code>
                        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                          <Button 
                            variant="ghost" size="icon" 
                            className="h-8 w-8 hover:bg-white/10 text-muted-foreground hover:text-foreground"
                            onClick={() => toggleVisibility(key.id)}
                          >
                            {visibleKeys.has(key.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button 
                            variant="ghost" size="icon" 
                            className="h-8 w-8 hover:bg-primary/10 text-muted-foreground hover:text-primary"
                            onClick={() => copyToClipboard(key.id, key.key)}
                          >
                            {copiedId === key.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                        key.status === "Active" 
                          ? "bg-green-500/10 border-green-500/20 text-green-400" 
                          : "bg-red-500/10 border-red-500/20 text-red-500"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full", key.status === "Active" ? "bg-green-400" : "bg-red-500")} />
                        {key.status}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1.5 ml-1">
                        Last use: {key.lastUsed}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-muted-foreground hover:bg-red-500/10 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        onClick={() => setDeleteData({ id: key.id, type: "router" })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {keys.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-muted-foreground text-sm font-medium">
                      No active API keys. Create one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Provider Keys List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Provider Keys</h2>
            <p className="text-sm text-muted-foreground mt-1">Configure your own billing keys for specific model providers.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((p) => (
            <Card key={p.id} className="border-white/5 bg-white/5 backdrop-blur-md hover:border-white/10 transition-colors group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                    <p.icon className="w-5 h-5 group-hover:text-primary" />
                  </div>
                  <div className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                    p.status === "Configured" 
                      ? "bg-green-500/10 border-green-500/20 text-green-400" 
                      : "bg-white/5 border-white/10 text-muted-foreground"
                  )}>
                    {p.status}
                  </div>
                </div>
                <CardTitle className="mt-4 text-base font-bold">{p.provider}</CardTitle>
                <CardDescription className="text-xs">{p.lastUpdated}</CardDescription>
              </CardHeader>
              <CardContent>
                {p.status === "Configured" ? (
                  <div className="space-y-3">
                     <code className="block w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-muted-foreground truncate">
                        {maskKey(p.key, p.id)}
                     </code>
                     <div className="flex gap-2">
                        <Button 
                           variant="outline" 
                           size="sm" 
                           onClick={() => setDeleteData({ id: p.id, type: "provider" })}
                           className="w-full text-xs hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/10"
                        >
                          Remove
                        </Button>
                     </div>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="w-full text-xs bg-white/5 hover:bg-white/10">
                    <Plus className="w-4 h-4 mr-2" /> Add Key
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Revocation Warning */}
      <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/5 text-xs text-red-500 font-medium flex items-center gap-3">
         <AlertTriangle className="w-5 h-5 shrink-0" />
         <div>
           <strong className="block mb-0.5">Keep your keys secure</strong>
           <span>Do not expose your API keys in frontend code or public repositories. Use environment variables.</span>
         </div>
      </div>

      {/* Create Modal */}
      {isCreateOpen && !createdKeyData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121212] shadow-2xl overflow-hidden slide-in-from-bottom-4 animate-in">
            <form onSubmit={handleCreate}>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-1">Create API Key</h3>
                <p className="text-sm text-muted-foreground mb-6">Create a new authentication key for your application.</p>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-gray-300">Name</label>
                  <input
                    type="text"
                    required
                    maxLength={32}
                    placeholder="e.g. Production Web App"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={!newKeyName.trim()} className="bg-primary text-black font-bold">Create Key</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal (Show Once) */}
      {createdKeyData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-primary/30 bg-[#121212] shadow-[0_0_50px_rgba(201,168,78,0.1)] overflow-hidden">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Key Created Successfully</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Please copy this key and store it securely. For security reasons, <strong>you will not be able to view it again.</strong>
              </p>
              
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4 mb-6 relative">
                 <code className="text-sm font-mono text-primary break-all">
                   {createdKeyData.key}
                 </code>
                 <Button 
                   onClick={() => copyToClipboard('newkey', createdKeyData.key)}
                   className="shrink-0 h-10 px-4"
                 >
                   {copiedId === 'newkey' ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                   {copiedId === 'newkey' ? 'Copied!' : 'Copy'}
                 </Button>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={closeCreateFlow} variant="outline" className="w-full border-white/10 font-bold">
                  I have saved this key safely
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete/Revoke Confirmation Modal */}
      {deleteData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#121212] shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {deleteData.type === 'router' ? 'Revoke API Key' : 'Remove Provider Key'}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {deleteData.type === 'router' 
                  ? "Are you absolutely sure? This action cannot be undone and will instantly break any systems relying on this key."
                  : "Are you sure you want to remove this provider key? Requests routed to this provider will fall back to standard billing."}
              </p>
              
              <div className="flex justify-end gap-3 mt-8">
                <Button variant="ghost" onClick={() => setDeleteData(null)}>Cancel</Button>
                <Button variant="destructive" onClick={executeDelete} className="bg-red-500 hover:bg-red-600 font-bold text-white">
                  Yes, {deleteData.type === 'router' ? 'Revoke Key' : 'Remove Key'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
