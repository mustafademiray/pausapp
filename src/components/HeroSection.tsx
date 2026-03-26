import { motion } from "framer-motion";
import pausLogo from "@/assets/paus-logo.png";

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
          paus turns every purchase into a simple question — is it worth your
          time? See prices in work hours and build smarter spending habits.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://apps.apple.com/tr/app/paus-stop-impulse-buying/id6757305070"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-foreground/10 border border-foreground/15 text-foreground px-8 py-4 rounded-2xl font-body font-semibold text-lg hover:bg-foreground/15 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </a>
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
