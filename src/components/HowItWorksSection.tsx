import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Bell, Check, Flame, Pause, Zap } from "lucide-react";
import pausLogo from "@/assets/paus-logo.png";

const STEP_MS = 4500;

const steps = [
  {
    icon: Zap,
    title: "The urge hits",
    description:
      "You see it. It's limited. It's on sale today only. Your thumb is already hovering over the buy button.",
  },
  {
    icon: Pause,
    title: "Put it on paus",
    description:
      "Instead of buying, you set a reminder — 24 hours, 7 days, 30 days — and step away.",
  },
  {
    icon: Bell,
    title: "Decide with a clear mind",
    description:
      "The reminder comes back. Most of the time, you can't even remember why you wanted it.",
  },
];

const HowItWorksSection = () => {
  const [step, setStep] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [chosen, setChosen] = useState(false);
  const [decided, setDecided] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setChosen(step === 1);
      setDecided(step === 2);
      return;
    }
    setChosen(false);
    setDecided(false);
    let t: ReturnType<typeof setTimeout> | undefined;
    if (step === 1) t = setTimeout(() => setChosen(true), 1600);
    if (step === 2) t = setTimeout(() => setDecided(true), 2400);
    return () => {
      if (t) clearTimeout(t);
    };
  }, [step, reduced]);

  useEffect(() => {
    if (reduced || hovered) return;
    const i = setInterval(() => setStep((s) => (s + 1) % steps.length), STEP_MS);
    return () => clearInterval(i);
  }, [reduced, hovered]);

  const screenTransition = {
    initial: { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -32 },
    transition: { duration: 0.35, ease: "easeOut" as const },
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary/70 font-body mb-3">
            The shopping stopper
          </p>
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">
            You see it. You want it. You buy it.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-body">
            Every impulse buy is money you'll wish you had next week. paus
            breaks the cycle with one simple habit.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col items-center lg:items-start lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3 w-full max-w-lg"
            >
              {steps.map((s, i) => {
                const active = step === i;
                return (
                  <button
                    key={s.title}
                    onClick={() => setStep(i)}
                    className={`w-full text-left rounded-2xl border p-5 transition-colors duration-300 ${
                      active
                        ? "bg-foreground/10 border-primary/30"
                        : "bg-transparent border-foreground/10 hover:bg-foreground/5"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div
                        className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "bg-foreground/10 text-muted-foreground"
                        }`}
                      >
                        <s.icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3
                            className={`font-display text-lg transition-colors ${
                              active ? "text-foreground" : "text-foreground/60"
                            }`}
                          >
                            {s.title}
                          </h3>
                          <span className="text-xs font-bold text-foreground/30">
                            0{i + 1}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground font-body leading-relaxed">
                          {s.description}
                        </p>
                        {active && !reduced && !hovered && (
                          <div className="mt-3 h-1 rounded-full bg-foreground/10 overflow-hidden">
                            <motion.div
                              key={step}
                              className="h-full bg-primary/70 rounded-full origin-left"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{
                                duration: STEP_MS / 1000,
                                ease: "linear",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </div>

          <div
            className="relative flex justify-center lg:order-2"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-[290px] sm:w-[320px] h-[620px] rounded-[2.75rem] border-[6px] border-foreground/15 bg-background/60 shadow-2xl shadow-black/40 overflow-hidden"
            >
              <div className="relative h-11 shrink-0">
                <div className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-foreground/15" />
                <div className="absolute inset-x-0 top-2.5 flex justify-between px-7 text-[10px] font-semibold text-foreground/50 font-body">
                  <span>9:41</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/50" />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/50" />
                    <span className="h-2 w-4 rounded-[3px] border border-foreground/50" />
                  </span>
                </div>
              </div>

              <div className="relative h-[calc(100%-2.75rem)]">
                <AnimatePresence initial={false}>
                  {step === 0 && (
                    <motion.div
                      key="urge"
                      {...screenTransition}
                      className="absolute inset-0 flex flex-col px-5 pt-2"
                    >
                      <div className="rounded-3xl bg-foreground/5 border border-foreground/10 p-4 text-center">
                        <div className="mb-3 flex aspect-[5/4] items-center justify-center rounded-2xl bg-gradient-to-br from-foreground/15 to-foreground/5 text-7xl">
                          👟
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground font-body">
                          Limited drop
                        </p>
                        <p className="font-display text-lg font-semibold text-foreground">
                          Cloudrunner Sneakers
                        </p>
                        <p className="font-display text-3xl font-bold text-foreground mt-1">
                          $200
                        </p>
                        <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-3 py-1 text-[11px] font-semibold text-warning font-body">
                          <Flame className="h-3 w-3" />
                          Only 2 left in your size
                        </p>
                        <motion.button
                          animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.4,
                            ease: "easeInOut",
                          }}
                          className="mt-4 w-full rounded-xl bg-destructive py-3 text-sm font-bold uppercase tracking-wide text-destructive-foreground shadow-lg shadow-destructive/25 font-body"
                        >
                          Buy now
                        </motion.button>
                        <p className="mt-2 text-[10px] text-muted-foreground font-body">
                          Sale ends tonight · Free returns
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="pause"
                      {...screenTransition}
                      className="absolute inset-0 flex flex-col px-5 pt-2"
                    >
                      <div
                        className={`rounded-3xl border border-foreground/10 p-4 transition-opacity duration-500 ${
                          chosen ? "opacity-40" : "opacity-70"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground/10 text-2xl">
                            👟
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground font-body">
                              Cloudrunner Sneakers
                            </p>
                            <p className="font-display text-sm text-foreground/70">
                              $200
                            </p>
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {chosen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg font-body"
                          >
                            <Pause className="h-3.5 w-3.5" />
                            On paus · 7 days left
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 26,
                        }}
                        className="mt-auto rounded-t-3xl border border-b-0 border-foreground/10 bg-background/80 p-5 backdrop-blur"
                      >
                        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-foreground/20" />
                        <p className="font-display text-lg font-semibold text-foreground">
                          Not sure? Take a paus.
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground font-body">
                          How long until you decide?
                        </p>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {["24 hours", "7 days", "30 days"].map(
                            (label, i) => (
                              <motion.div
                                key={label}
                                animate={
                                  chosen && i === 1
                                    ? { scale: [1, 1.08, 1] }
                                    : { scale: 1 }
                                }
                                className={`rounded-xl border py-2.5 text-center text-xs font-semibold font-body transition-colors duration-300 ${
                                  chosen && i === 1
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-foreground/15 bg-foreground/5 text-foreground/70"
                                }`}
                              >
                                {label}
                              </motion.div>
                            )
                          )}
                        </div>
                        <div
                          className={`mt-4 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold font-body transition-colors duration-300 ${
                            chosen
                              ? "bg-success/20 text-success"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {chosen ? (
                            <>
                              <Check className="h-4 w-4" />
                              Paused for 7 days
                            </>
                          ) : (
                            "Pause it"
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="decide"
                      {...screenTransition}
                      className="absolute inset-0 flex flex-col px-5 pt-2 pb-5"
                    >
                      <motion.div
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 24,
                        }}
                        className="rounded-2xl border border-foreground/10 bg-foreground/10 p-3 backdrop-blur"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={pausLogo}
                            alt=""
                            className="h-9 w-9 rounded-lg"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-[11px] font-bold text-foreground font-body">
                                paus
                              </p>
                              <p className="text-[10px] text-muted-foreground font-body">
                                now
                              </p>
                            </div>
                            <p className="mt-0.5 text-xs font-semibold text-foreground font-body">
                              Still thinking about the sneakers?
                            </p>
                            <p className="text-[11px] text-muted-foreground font-body">
                              You paused them 7 days ago.
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <div className="mt-4 rounded-2xl border border-foreground/10 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground/10 text-2xl">
                            👟
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground font-body">
                              Cloudrunner Sneakers
                            </p>
                            <p className="font-display text-sm text-foreground/70">
                              $200
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <AnimatePresence mode="wait">
                          {decided ? (
                            <motion.div
                              key="saved"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="rounded-3xl border border-success/30 bg-success/10 p-6 text-center"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 15,
                                  delay: 0.1,
                                }}
                                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success"
                              >
                                <Check className="h-7 w-7 text-white" />
                              </motion.div>
                              <p className="mt-3 font-display text-xl font-bold text-success">
                                $200 stayed in your pocket
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground font-body">
                                That's a full workday back in your life.
                              </p>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="choice"
                              exit={{ opacity: 0, y: -8 }}
                              className="grid grid-cols-2 gap-2"
                            >
                              <div className="rounded-xl border border-foreground/15 bg-foreground/5 py-3 text-center text-xs font-semibold text-foreground/70 font-body">
                                I still want it
                              </div>
                              <motion.div
                                animate={
                                  reduced ? undefined : { scale: [1, 1.04, 1] }
                                }
                                transition={{
                                  repeat: Infinity,
                                  duration: 1.6,
                                  ease: "easeInOut",
                                }}
                                className="rounded-xl bg-primary py-3 text-center text-xs font-bold text-primary-foreground font-body"
                              >
                                Glad I skipped
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
