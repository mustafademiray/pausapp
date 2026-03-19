import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import mascotNeutral from "@/assets/paus-mascot.png";
import mascotSurprised from "@/assets/paus-mascot-surprised.png";
import mascotHappy from "@/assets/paus-mascot-happy.png";

type MascotState = "neutral" | "surprised" | "happy";

const srcMap: Record<MascotState, string> = {
  neutral: mascotNeutral,
  surprised: mascotSurprised,
  happy: mascotHappy,
};

const FloatingMascot = () => {
  const { scrollYProgress } = useScroll();
  const [state, setState] = useState<MascotState>("neutral");
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const happyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setState("surprised");
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (happyTimeout.current) clearTimeout(happyTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        setState("happy");
        happyTimeout.current = setTimeout(() => setState("neutral"), 2000);
      }, 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (happyTimeout.current) clearTimeout(happyTimeout.current);
    };
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [120, -60]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 8, -3]);

  return (
    <motion.div className="fixed left-6 md:left-10 z-20 pointer-events-none" style={{ top: "45%", y, rotate }}>
      <div className="relative w-14 md:w-20">
        {(Object.keys(srcMap) as MascotState[]).map((key) => (
          <motion.img
            key={key}
            src={srcMap[key]}
            alt="paus mascot"
            className="w-14 md:w-20 drop-shadow-lg absolute top-0 left-0"
            animate={{
              opacity: state === key ? 0.25 : 0,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.3 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FloatingMascot;
