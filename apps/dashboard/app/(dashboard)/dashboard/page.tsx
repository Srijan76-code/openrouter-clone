import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Plus, 
  ArrowUpRight, 
  TrendingUp, 
  Zap, 
  Cpu, 
  Activity, 
  Box, 
  ChevronRight,
  Search,
  LayoutDashboard,
  AlertCircle
} from "lucide-react";
import Playground from "@/components/dashboard/Playground";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            Dashboard
          </h1>
          <p className="text-muted-foreground font-medium">Welcome back, Alex. Here&apos;s your API overview.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10">
            Export Logs
          </Button>
          <Button size="sm" className="shadow-[0_0_15px_rgba(201,168,78,0.3)]">
            <Plus className="w-4 h-4 mr-1" /> Create API Key
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Requests", value: "24,592", change: "+18%", icon: Activity, color: "text-blue-400" },
          { label: "Tokens Used", value: "8.4M", change: "+12%", icon: Zap, color: "text-purple-400" },
          { label: "Cost Estimate", value: "$142.50", change: "+$24.20", icon: TrendingUp, color: "text-green-400" },
          { label: "Avg. Latency", value: "82ms", change: "-4ms", icon: Cpu, color: "text-amber-400" }
        ].map((stat, i) => (
          <Card key={i} className="group bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all shadow-xl relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={cn("w-4 h-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">{stat.value}</div>
              <p className="text-[10px] font-bold text-muted-foreground mt-1 flex items-center gap-1">
                <span className={cn(stat.change.startsWith("+") ? "text-green-400" : "text-red-400")}>
                  {stat.change}
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        
        {/* Core Interaction Area */}
        <div className="lg:col-span-2 space-y-8">
          <Playground />
          
          {/* Model Quick Actions */}
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Top Models</CardTitle>
              <CardDescription>Your most used model endpoints this week.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-bold">View All <ChevronRight className="w-4 h-4 ml-1" /></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Claude 3.5 Sonnet", cost: "$0.003 / 1k", perf: "99.9%", status: "Active" },
                { name: "GPT-4o mini", cost: "$0.00015 / 1k", perf: "99.8%", status: "Active" },
                { name: "Llama 3 70B", cost: "$0.0006 / 1k", perf: "99.2%", status: "Healthy" },
                { name: "Gemini 1.5 Pro", cost: "$0.0035 / 1k", perf: "99.7%", status: "Active" }
              ].map((model, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-white/10 group-hover:bg-primary/10 transition-colors">
                        <Box className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold">{model.name}</div>
                        <div className="text-xs text-muted-foreground">{model.cost} tokens</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-8">
                     <div className="text-right hidden sm:block">
                        <div className="text-xs font-black text-muted-foreground uppercase tracking-widest">Reliability</div>
                        <div className="text-sm font-bold text-green-400">{model.perf}</div>
                     </div>
                     <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase">
                       {model.status}
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        </div>

        {/* System Health / Logs */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10 h-fit">
          <CardHeader>
            <CardTitle className="text-xl font-bold">System Health</CardTitle>
            <CardDescription>Live status of your deployments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
               {[
                 { label: "API Gateway", status: "Operational", color: "bg-green-400" },
                 { label: "US-East-1 Cluster", status: "Operational", color: "bg-green-400" },
                 { label: "EU-West-1 Static", status: "Operational", color: "bg-green-400" },
                 { label: "Global CDN", status: "Re-routing", color: "bg-primary" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                   <div className="text-sm font-bold">{item.label}</div>
                   <div className="flex items-center gap-2">
                     <div className={cn("w-2 h-2 rounded-full animate-pulse", item.color)} />
                     <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.status}</span>
                   </div>
                 </div>
               ))}
            </div>
            
            <div className="pt-4 border-t border-white/5">
              <div className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-3">Recent Alerts</div>
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs">
                <div className="font-bold flex items-center gap-2 mb-1">
                   <AlertCircle className="w-4 h-4" /> Usage Spike Warning
                </div>
                Your token usage for GPT-4o has increased by 40% in the last 2 hours.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
