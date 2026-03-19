import { motion } from "framer-motion";
import { Clock, TrendingDown, Pause, Target } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "See prices in work hours",
    description:
      "A $89 jacket costs 9 minutes of your life. That perspective changes everything.",
  },
  {
    icon: Pause,
    title: "Put it on paus",
    description:
      "Not sure? Pause the purchase. Set a reminder and decide later with a clear mind.",
  },
  {
    icon: Target,
    title: "10-Week savings challenge",
    description:
      "Spin the wheel daily, save a little each day, and watch your savings grow week by week.",
  },
  {
    icon: TrendingDown,
    title: "Track your progress",
    description:
      "See how much you've saved versus spent. Every smart decision adds up.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">
            Mindful money, made simple
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-body">
            Simple tools that help you pause, reflect, and make better financial
            decisions every day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-foreground/10"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-display text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
