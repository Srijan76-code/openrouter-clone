import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Filter, 
  Download, 
  ChevronRight,
  TrendingDown,
  Box,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default function UsagePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            Usage & Analytics
          </h1>
          <p className="text-muted-foreground font-medium">Real-time insights across all LLM endpoints.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" size="sm" className="bg-white/5 border-white/10">
             <Calendar className="w-4 h-4 mr-2" /> Current Billing Cycle
           </Button>
           <Button size="sm" className="shadow-[0_0_15px_rgba(201,168,78,0.3)]">
             <Download className="w-4 h-4 mr-1" /> Export CSV
           </Button>
        </div>
      </div>

      {/* Usage Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:border-primary/20 transition-all border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
              Total Tokens
              <TrendingUp className="w-4 h-4 text-green-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">2,481,032</div>
            <p className="text-[10px] font-bold text-green-400 mt-1 uppercase tracking-widest">+18.4% from last period</p>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/20 transition-all border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
              Estimated Cost
              <Box className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">$142.84</div>
            <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">Base plan: $25.00/mo included</p>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/20 transition-all border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
              Avg. PPS
              <Layers className="w-4 h-4 text-purple-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">0.0084</div>
            <p className="text-[10px] font-bold text-red-400 mt-1 uppercase tracking-widest">-2.1% efficiency drop</p>
          </CardContent>
        </Card>
      </div>

      {/* Visual Chart Placeholder */}
      <Card className="border-white/5 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-xl font-bold">Daily Token Consumption</CardTitle>
            <CardDescription>March 1 - March 30, 2024</CardDescription>
          </div>
          <div className="flex gap-2">
             {["Tokens", "Cost", "Requests"].map((tab) => (
                <button key={tab} className={cn(
                  "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  tab === "Tokens" ? "bg-primary text-secondary" : "bg-white/5 text-muted-foreground hover:bg-white/10"
                )}>
                  {tab}
                </button>
             ))}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
           <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
              {[45, 62, 58, 75, 92, 85, 78, 65, 88, 95, 120, 105, 98, 115, 130, 145, 158, 142, 135, 148, 165, 185, 172, 160, 175, 195, 215, 205, 188, 225].map((val, i) => (
                <div key={i} className="group relative flex-1">
                  <div 
                    className={cn(
                      "w-full rounded-t-lg transition-all duration-500 bg-primary/20 group-hover:bg-primary/60",
                      i === 29 ? "bg-primary" : ""
                    )} 
                    style={{ height: `${(val / 225) * 100}%` }} 
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 rounded bg-secondary border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none min-w-[80px]">
                    <div className="text-[10px] font-black text-muted-foreground uppercase">Mar {i + 1}</div>
                    <div className="text-sm font-bold text-primary">{val * 1000} tkns</div>
                  </div>
                </div>
              ))}
           </div>
           <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5">
              <div className="flex gap-8">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-xs font-bold text-muted-foreground">Current Usage</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/20" />
                    <span className="text-xs font-bold text-muted-foreground">Previous Period</span>
                 </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">Full Report <ArrowUpRight className="ml-2 w-4 h-4" /></Button>
           </div>
        </CardContent>
      </Card>

      {/* Model Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-white/5">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Model Cost Distribution</CardTitle>
            <CardDescription>Breakdown of spending by provider.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             {[
               { name: "Anthropic / Claude", cost: "$68.42", percentage: 48, color: "bg-primary" },
               { name: "OpenAI / GPT-4", cost: "$42.15", percentage: 29, color: "bg-blue-500" },
               { name: "Meta / Llama 3", cost: "$18.90", percentage: 13, color: "bg-green-500" },
               { name: "Others", cost: "$13.37", percentage: 10, color: "bg-white/10" }
             ].map((item, i) => (
               <div key={i} className="space-y-2">
                 <div className="flex items-center justify-between text-sm">
                   <span className="font-bold">{item.name}</span>
                   <span className="font-bold text-muted-foreground">{item.cost} <span className="text-[10px] ml-1">({item.percentage}%)</span></span>
                 </div>
                 <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.percentage}%` }} />
                 </div>
               </div>
             ))}
          </CardContent>
        </Card>

        <Card className="border-white/5">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Top API Keys by Volume</CardTitle>
            <CardDescription>Which credentials are doing the heavy lifting.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {[
                  { name: "Production Gateway", usage: "1.8M tokens", trend: "up" },
                  { name: "Staging / QA", usage: "420k tokens", trend: "stable" },
                  { name: "Edge Workers", usage: "215k tokens", trend: "up" },
                  { name: "Dev / Localhost", usage: "46k tokens", trend: "down" }
                ].map((key, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                         <Key className="w-4 h-4 text-primary" />
                       </div>
                       <span className="font-bold text-sm">{key.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="text-xs font-bold text-muted-foreground">{key.usage}</span>
                       {key.trend === "up" ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
                    </div>
                  </div>
                ))}
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

function Key({ className }: { className?: string }) {
  return <div className={cn("w-2 h-2 rounded-full bg-current", className)} />;
}
