"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Hobby",
    price: "$0",
    description: "Perfect for experiments and personal projects.",
    features: ["Access to 100+ models", "Standard rate limits", "5 active API keys", "Community support"],
    buttonVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$49",
    description: "Built for scaling startups and serious developers.",
    features: [
      "Access to 100+ models",
      "Higher rate limits",
      "Unlimited API keys",
      "Priority email support",
      "Advanced usage analytics",
    ],
    buttonVariant: "default" as const,
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Security and scale for large-scale production apps.",
    features: [
      "Access to all models",
      "Enterprise rate limits",
      "Custom SLAs",
      "Dedicated account manager",
      "On-prem deployment options",
    ],
    buttonVariant: "outline" as const,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Simple, transparent pricing
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-8 flex flex-col relative ${
                plan.highlight ? "shadow-[0_0_40px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/50" : ""
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-purple-500 text-[10px] font-bold uppercase tracking-widest text-white">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-purple-400" />
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.buttonVariant}
                className={plan.highlight ? "bg-white text-black hover:bg-gray-200" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}
                size="lg"
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
