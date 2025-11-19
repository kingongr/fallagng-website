"use client";

import { motion, useReducedMotion } from "framer-motion";
import { revealMask } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

export function AnimatedTitle({ text, className }: AnimatedTitleProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  // Simplified animation for reduced motion
  const letterVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : revealMask;

  return (
    <h1
      className={cn(
        "text-5xl md:text-7xl lg:text-8xl font-permanent-marker text-text tracking-wide",
        className
      )}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-6 md:mr-8">
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block px-0.5"
              transition={
                shouldReduceMotion
                  ? {
                      duration: 0.3,
                      delay: wordIndex * 0.1,
                    }
                  : {
                      duration: 0.85,
                      delay: (wordIndex * 0.12) + (letterIndex * 0.025),
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

