import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

const WorkHoursCalculator = () => {
  const [salary, setSalary] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState<{ days: number; hours: number; minutes: number } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const yearlySalary = parseFloat(salary);
    const itemPrice = parseFloat(price);
    if (!yearlySalary || !itemPrice || yearlySalary <= 0) return;

    const hourlyRate = yearlySalary / 2080;
    const totalMinutes = Math.round((itemPrice / hourlyRate) * 60);
    const days = Math.floor(totalMinutes / 480);
    const remainingMinutes = totalMinutes % 480;
    const hours = Math.floor(remainingMinutes / 60);
    const minutes = remainingMinutes % 60;
    setResult({ days, hours, minutes });
  };

  const formatResult = () => {
    if (!result) return "";
    const parts: string[] = [];
    if (result.days > 0) parts.push(`${result.days}d`);
    if (result.hours > 0) parts.push(`${result.hours}h`);
    if (result.minutes > 0) parts.push(`${result.minutes}m`);
    return parts.join(" ") || "0m";
  };

  return (
    <section className="relative py-16 px-6">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-foreground/10 backdrop-blur-sm border border-foreground/10 rounded-3xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display text-foreground">
                Is it worth your time?
              </h2>
            </div>
            <p className="text-muted-foreground font-body mb-6 ml-[52px]">
              See how long you'd need to work to afford it.
            </p>

            <form onSubmit={calculate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body font-medium text-foreground/70 mb-1.5">
                    Yearly salary
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 font-body">$</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="60,000"
                      value={salary}
                      onChange={(e) => { setSalary(e.target.value); setResult(null); }}
                      className="w-full bg-background/50 text-foreground placeholder:text-foreground/30 rounded-xl pl-7 pr-3 py-3 font-body text-base border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-foreground/70 mb-1.5">
                    Item price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 font-body">$</span>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="89"
                      value={price}
                      onChange={(e) => { setPrice(e.target.value); setResult(null); }}
                      className="w-full bg-background/50 text-foreground placeholder:text-foreground/30 rounded-xl pl-7 pr-3 py-3 font-body text-base border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-body font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Calculate
              </button>
            </form>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 text-center py-6 bg-foreground/5 rounded-2xl border border-foreground/10">
                    <p className="text-muted-foreground font-body text-sm mb-1">
                      You'd need to work
                    </p>
                    <p className="text-4xl md:text-5xl font-display text-primary">
                      {formatResult()}
                    </p>
                    <p className="text-muted-foreground font-body text-sm mt-1">
                      to afford this item
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkHoursCalculator;
