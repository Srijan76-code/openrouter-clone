"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[120px] rounded-full point-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full point-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground text-sm font-medium mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
          The new standard for AI routing
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-6"
        >
          One API for every <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            foundation model
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Access Claude 3, GPT-4o, Llama 3, and 100+ other models through a single, unified, ultra-low-latency gateway. Zero friction. Infinite scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-bold bg-white text-black hover:bg-gray-200 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Start building for free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-bold rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white">
            <Terminal className="mr-2 w-5 h-5" /> View Documentation
          </Button>
        </motion.div>

        {/* Code Preview Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full max-w-4xl mt-20"
        >
          <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none" />
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 text-xs font-mono text-muted-foreground">request.ts</div>
            </div>
            <div className="p-6 text-left overflow-x-auto text-sm md:text-base font-mono leading-relaxed">
              <span className="text-purple-400">import</span> {"{"} OpenAI {"}"} <span className="text-purple-400">from</span> <span className="text-green-300">"openai"</span>;<br /><br />
              <span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> <span className="text-blue-300">OpenAI</span>({"{"}<br />
              &nbsp;&nbsp;baseURL: <span className="text-green-300">"https://openrouter.ai/api/v1"</span>,<br />
              &nbsp;&nbsp;apiKey: <span className="text-blue-400">process.env.OPENROUTER_API_KEY</span>,<br />
              {"}"});<br /><br />
              <span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> client.chat.completions.<span className="text-blue-300">create</span>({"{"}<br />
              &nbsp;&nbsp;model: <span className="text-green-300">"anthropic/claude-3-opus"</span>,<br />
              &nbsp;&nbsp;messages: [{"{"} role: <span className="text-green-300">"user"</span>, content: <span className="text-green-300">"Explain quantum computing"</span> {"}"}],<br />
              {"}"});
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
