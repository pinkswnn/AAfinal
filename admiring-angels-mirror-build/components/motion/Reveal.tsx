"use client";

import { motion, useReducedMotion as useFMReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export function Reveal({ children }: { children: ReactNode }) {
  const reduced = useFMReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
