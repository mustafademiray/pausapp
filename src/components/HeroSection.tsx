import { motion } from "framer-motion";
import pausLogo from "@/assets/paus-logo.png";
import AppStoreLink from "@/components/AppStoreLink";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl"
      >
        <motion.img
          src={pausLogo}
          alt="paus logo"
          className="w-24 h-24 rounded-3xl shadow-2xl mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        />

        <h1 className="text-5xl md:text-7xl font-display text-foreground leading-tight mb-6">
          Think before
          <br />
          <span className="text-primary">you spend.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 font-body">
          Impulse buys quietly drain your paycheck. paus turns every price into
          hours of your life — so you only buy what's actually worth it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <AppStoreLink
            label="App Store"
            funnel="landing"
            ctaPlacement="hero"
            className="inline-flex items-center gap-3 bg-foreground/10 border border-foreground/15 text-foreground px-8 py-4 rounded-2xl font-body font-semibold text-lg hover:bg-foreground/15 transition-colors"
          />
          <span
            className="inline-flex items-center gap-3 border border-foreground/15 text-foreground/40 px-8 py-4 rounded-2xl font-body font-semibold text-lg cursor-default"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.33-2.928 1.693-2.357-2.357 2.983-2.666zM5.864 2.658L16.801 8.99l-2.302 2.302-8.635-8.634z" />
            </svg>
            Google Play — Coming Soon
          </span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
