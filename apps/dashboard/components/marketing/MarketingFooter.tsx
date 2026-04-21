"use client";

import Link from "next/link";
import { Zap, Globe, MessageCircle, Mail } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="py-20 border-t border-white/5 relative z-10 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 p-[1px] shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <div className="w-full h-full rounded-[7px] bg-background flex items-center justify-center">
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">OpenRouter<span className="text-purple-400">.</span></span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The intelligent gateway for all foundation models. Secure, fast, and scalable.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-muted-foreground hover:text-white">
              <Globe className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-muted-foreground hover:text-white">
              <MessageCircle className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-muted-foreground hover:text-white">
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
            <li><Link href="#models" className="hover:text-white transition-colors">Supported Models</Link></li>
            <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} OpenRouter Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs text-muted-foreground uppercase tracking-widest font-bold">
          <Link href="#" className="hover:text-white transition-colors">Status</Link>
          <Link href="#" className="hover:text-white transition-colors">System</Link>
          <Link href="#" className="hover:text-white transition-colors">Integrations</Link>
        </div>
      </div>
    </footer>
  );
}
