"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

export function MarketingNavbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-background/80 backdrop-blur-md border-white/5 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 p-[1px] shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-transform group-hover:scale-105">
            <div className="w-full h-full rounded-[7px] bg-background flex items-center justify-center">
              <Zap className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">OpenRouter<span className="text-purple-400">.</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#models" className="hover:text-white transition-colors">Models</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/dashboard">
            <Button className="bg-white text-black hover:bg-gray-200 font-bold rounded-full px-6 shadow-[0_0_20px_rgba(255,255,255,0.2)] h-10">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
