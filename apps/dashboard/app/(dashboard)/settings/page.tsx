import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Settings, 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  Globe, 
  Mail, 
  Lock, 
  ChevronRight,
  LogOut,
  Zap,
  HelpCircle
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground font-medium">Manage your account, billing, and system preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
           {[
             { name: "General", icon: User, active: true },
             { name: "Billing & Plans", icon: CreditCard, active: false },
             { name: "Notifications", icon: Bell, active: false },
             { name: "Security", icon: Shield, active: false },
             { name: "API Config", icon: Globe, active: false },
           ].map((item) => (
             <button
               key={item.name}
               className={cn(
                 "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                 item.active 
                   ? "bg-primary text-secondary shadow-[0_0_15px_rgba(201,168,78,0.2)]" 
                   : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
               )}
             >
               <item.icon className="w-4 h-4" />
               {item.name}
             </button>
           ))}
           <div className="pt-4 border-t border-white/5 mt-4">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-all">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
           </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-8">
           {/* Profile Settings */}
           <Card className="border-white/5 overflow-hidden">
             <CardHeader className="bg-white/5 pb-8">
               <CardTitle className="text-xl font-bold">Profile Information</CardTitle>
               <CardDescription>Update your personal details and public profile.</CardDescription>
             </CardHeader>
             <CardContent className="-mt-6 space-y-6">
                <div className="flex items-center gap-6">
                   <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-accent/50 p-0.5 shadow-[0_0_20px_rgba(201,168,78,0.3)]">
                      <div className="w-full h-full rounded-[15px] bg-secondary flex items-center justify-center overflow-hidden">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <Button size="sm" className="h-9 px-4">Change Avatar</Button>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">JPG, GIF or PNG. Max size 2MB</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue="Alex Rivera" 
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-primary/50 text-foreground text-sm outline-none transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue="alex.rivera@example.com" 
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-primary/50 text-foreground text-sm outline-none transition-all"
                      />
                   </div>
                   <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Organization</label>
                      <input 
                        type="text" 
                        defaultValue="Apex Intelligence Labs" 
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-primary/50 text-foreground text-sm outline-none transition-all"
                      />
                   </div>
                </div>
             </CardContent>
             <CardFooter className="bg-white/5 pt-6 flex justify-end gap-3 border-t border-white/5">
                <Button variant="ghost" className="text-muted-foreground">Discard</Button>
                <Button className="px-8 font-bold shadow-[0_0_15px_rgba(201,168,78,0.3)]">Save Changes</Button>
             </CardFooter>
           </Card>

           {/* Plan Section */}
           <Card className="border-white/5 premium-glow bg-gradient-to-br from-secondary/40 to-background">
             <CardHeader>
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold">Premium Subscription</CardTitle>
                    <CardDescription>Your current plan and billing cycle.</CardDescription>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-black uppercase text-xs tracking-widest">
                    Active
                  </div>
               </div>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <Zap className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <div className="font-bold">Enterprise Pro</div>
                        <div className="text-xs text-muted-foreground font-medium">All-access gateway + Priority Support</div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-xl font-black">$49.00/mo</div>
                      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Next bill: April 15, 2024</div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                   <div className="p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-primary/20 transition-all cursor-pointer">
                      <div className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Payment Method</div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-primary" />
                            <span className="font-bold text-sm">Visa •••• 4242</span>
                         </div>
                         <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                   </div>
                   <div className="p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-primary/20 transition-all cursor-pointer">
                      <div className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Invoices</div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-primary" />
                            <span className="font-bold text-sm">Download History</span>
                         </div>
                         <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                   </div>
                </div>
             </CardContent>
             <CardFooter className="pt-2">
                <Button variant="outline" className="w-full border-red-500/20 text-red-500 hover:bg-red-500/5">Cancel Subscription</Button>
             </CardFooter>
           </Card>

           {/* Security Settings */}
           <Card className="border-white/5 bg-white/5">
              <CardContent className="p-6">
                 <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                          <Lock className="w-5 h-5 text-primary" />
                       </div>
                       <div>
                          <p className="font-bold">Two-Factor Authentication</p>
                          <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                       </div>
                    </div>
                    <div className="h-6 w-11 rounded-full bg-primary p-1 flex justify-end transition-all">
                       <div className="h-4 w-4 rounded-full bg-secondary shadow-sm" />
                    </div>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
