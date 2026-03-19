import HeroSection from "@/components/HeroSection";
import WorkHoursCalculator from "@/components/WorkHoursCalculator";
import FeaturesSection from "@/components/FeaturesSection";
import ScreenshotsSection from "@/components/ScreenshotsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import FloatingMascot from "@/components/FloatingMascot";

const Index = () => {
  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: `linear-gradient(
          180deg,
          hsl(150 18% 16%) 0%,
          hsl(150 18% 18%) 15%,
          hsl(148 16% 20%) 35%,
          hsl(145 14% 18%) 55%,
          hsl(150 18% 16%) 75%,
          hsl(150 20% 14%) 100%
        )`,
      }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <FloatingMascot />

      <div className="relative z-10">
        <HeroSection />
        <WorkHoursCalculator />
        <FeaturesSection />
        <ScreenshotsSection />
        <CtaSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
