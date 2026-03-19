import { motion } from "framer-motion";
import screenshotDashboard from "@/assets/screenshot-dashboard.jpg";
import screenshotSavings from "@/assets/screenshot-savings.jpg";
import screenshotDecision from "@/assets/screenshot-decision.jpg";

const screens = [
  { src: screenshotDashboard, alt: "paus dashboard showing savings and spending stats", label: "Dashboard" },
  { src: screenshotDecision, alt: "Decision screen showing purchase in work hours", label: "Smart Decisions" },
  { src: screenshotSavings, alt: "10-week savings challenge with spin wheel", label: "Savings Challenge" },
];

const ScreenshotsSection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">A peek inside</h2>
          <p className="text-muted-foreground text-lg font-body">
            Beautiful, intuitive, and designed to keep you mindful.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 md:gap-10 flex-wrap md:flex-nowrap">
          {screens.map((screen, i) => (
            <motion.div
              key={screen.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <div
                className={`relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/30 ${i === 1 ? "animate-float" : ""}`}
                style={{ animationDelay: i === 1 ? "0s" : `${i}s` }}
              >
                <img src={screen.src} alt={screen.alt} className="w-56 md:w-64 h-auto" />
              </div>
              <p className="mt-4 text-sm font-body font-medium text-muted-foreground">{screen.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;
