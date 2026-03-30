import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { HeroSection } from "@/components/marketing/HeroSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { ApiPlayground } from "@/components/marketing/ApiPlayground";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PricingSection } from "@/components/marketing/PricingSection";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Background Grid Accent */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <MarketingNavbar />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <ApiPlayground />
        <HowItWorks />
        <PricingSection />
      </main>

      <MarketingFooter />

      {/* Global Cursor Glow Effect (Simple version since we can't do complex hooks here easily without a separate component) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_50%)]" />
    </div>
  );
}
