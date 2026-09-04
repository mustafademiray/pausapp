import { motion } from "framer-motion";
import pausLogo from "@/assets/paus-logo.png";
import AppStoreLink from "@/components/AppStoreLink";

const CtaSection = () => {
  return (
    <section className="relative py-24 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto bg-foreground/10 backdrop-blur-sm border border-foreground/10 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
      >
        <img src={pausLogo} alt="paus" className="w-16 h-16 rounded-2xl mx-auto mb-6 relative z-10" />
        
        <h2 className="text-3xl md:text-5xl font-display text-foreground mb-4 relative z-10">
          Ready to take a paus?
        </h2>
        <p className="text-muted-foreground text-lg font-body mb-10 max-w-md mx-auto relative z-10">
          Every paused purchase is money back in your pocket. Download free and
          keep your next paycheck.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <AppStoreLink
            label="Download for iOS"
            funnel="landing"
            ctaPlacement="footer"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-body font-semibold text-lg hover:opacity-90 transition-opacity"
          />
          <span
            className="inline-flex items-center gap-3 border border-foreground/20 text-foreground/40 px-8 py-4 rounded-2xl font-body font-semibold text-lg cursor-default"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.33-2.928 1.693-2.357-2.357 2.983-2.666zM5.864 2.658L16.801 8.99l-2.302 2.302-8.635-8.634z" />
            </svg>
            Android — Coming Soon
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaSection;
