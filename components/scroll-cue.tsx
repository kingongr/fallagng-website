"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mouse } from "lucide-react";
import Link from "next/link";
import { subtleJitter } from "@/lib/motion";

export function ScrollCue() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
    >
      <Link
        href="#about"
        className="flex flex-col items-center gap-2 text-muted hover:text-text transition-colors focus-ring rounded-lg p-2"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, 8, 0],
                  x: [0, 0.5, -0.5, 0.5, -0.5, 0],
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Mouse className="w-6 h-6" aria-hidden="true" />
        </motion.div>
        <span className="text-xs font-medium">Scroll</span>
      </Link>
    </motion.div>
  );
}

