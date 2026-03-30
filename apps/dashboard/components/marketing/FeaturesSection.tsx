"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Cpu, Globe, Rocket, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Ultra-Low Latency",
    description: "Distributed edge network ensures your requests reach LLMs with minimal delay.",
    icon: Zap,
    color: "text-blue-400"
  },
  {
    title: "Enterprise Security",
    description: "SOC-2 compliant security and end-to-end encryption for every token sent.",
    icon: Shield,
    color: "text-purple-400"
  },
  {
    title: "Smart Routing",
    description: "Automatically routes to the fastest, cheapest model that fits your prompt.",
    icon: Cpu,
    color: "text-pink-400"
  },
  {
    title: "Multi-Region Deploy",
    description: "Globally distributed infrastructure to ensure 99.99% uptime anywhere.",
    icon: Globe,
    color: "text-indigo-400"
  },
  {
    title: "Instant Setup",
    description: "Drop-in replacement for OpenAI SDK. Takes less than 2 minutes to switch.",
    icon: Rocket,
    color: "text-violet-400"
  },
  {
    title: "Powerful Playground",
    description: "Test and compare prompts across dozens of models instantly in our visual UI.",
    icon: TerminalSquare,
    color: "text-blue-300"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Built for scale. <br/>Designed for you.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Everything you need to deploy AI features in production without the headache of managing multiple provider contracts.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-8 transition-all hover:scale-[1.02] cursor-default"
            >
              <div className={cn("w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg", feature.color)}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
