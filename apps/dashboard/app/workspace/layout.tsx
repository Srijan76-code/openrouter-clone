"use client";

import { Settings, CreditCard, Activity, FileText, KeyRound, ShieldCheck, BoxSelect, Route, Star, LayoutGrid, Eye, Search, Sparkles, ChevronDown, Rocket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mainNavItems = [
  { title: "API Keys", icon: KeyRound, href: "/workspace/api-keys" },
  { title: "Guardrails", icon: ShieldCheck, href: "#" },
  { title: "BYOK", icon: BoxSelect, href: "#" },
  { title: "Routing", icon: Route, href: "#" },
  { title: "Presets", icon: Star, href: "#" },
  { title: "Plugins", icon: LayoutGrid, href: "#" },
  { title: "Observability", icon: Eye, href: "#" },
  { title: "Settings", icon: Settings, href: "#" },
];

const accountItems = [
  { title: "Activity", icon: Activity, href: "#" },
  { title: "Logs", icon: FileText, href: "#" },
  { title: "Credits", icon: CreditCard, href: "/workspace/credits" },
  { title: "Management Keys", icon: KeyRound, href: "#" },
  { title: "Preferences", icon: Settings, href: "#" },
];

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b-[0.5px] bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <span className="font-semibold tracking-tight">OpenRouter</span>
          </Link>

          <div className="relative hidden w-[300px] md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-full bg-muted/40 pl-9 text-sm rounded-md"
            />
            <div className="absolute right-2 top-2.5 flex h-4 items-center justify-center rounded border bg-background px-1 text-[10px] font-medium text-muted-foreground">
              /
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" className="hidden sm:flex gap-1.5 hover:text-foreground">
            <span>Fusion</span>
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </Button>
          <Link href="#" className="hidden sm:block hover:text-foreground transition-colors">Models</Link>
          <Link href="#" className="hidden sm:block hover:text-foreground transition-colors">Chat</Link>
          <Link href="#" className="hidden md:block hover:text-foreground transition-colors">Rankings</Link>
          <Link href="#" className="hidden md:block hover:text-foreground transition-colors">Apps</Link>
          <Link href="#" className="hidden lg:block hover:text-foreground transition-colors">Docs</Link>

          <Separator orientation="vertical" className="h-6 hidden sm:block" />

          <Button variant="ghost" size="sm" className="flex items-center gap-2 px-2 hover:bg-transparent hover:text-foreground transition-colors">
            <Avatar className="h-6 w-6">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/20 text-primary text-xs">A</AvatarFallback>
            </Avatar>
            <span className="font-medium hidden sm:block">Personal</span>
            <ChevronDown className="h-4 w-4 opacity-70 hidden sm:block" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 overflow-y-auto border-r-[0.5px] bg-background py-6 hidden md:flex flex-col gap-8 shrink-0">
          <nav className="flex flex-col gap-1 px-3">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-1 px-3">
            <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Account
            </h4>
            {accountItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
