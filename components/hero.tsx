"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { fadeIn } from "@/lib/motion";
import { AnimatedTitle } from "./animated-title";
import { CTACluster } from "./cta-cluster";
import { ScrollCue } from "./scroll-cue";
import { useTranslations } from "@/hooks/use-translations";

// Hero carousel images
const heroImages = [
  "/images/hero-carousel/DSCF2346.jpg",
  "/images/hero-carousel/DSCF2351.jpg",
  "/images/hero-carousel/DSCF2353.jpg",
  "/images/hero-carousel/DSCF2359.jpg",
  "/images/hero-carousel/DSCF2372.jpg",
  "/images/hero-carousel/DSCF2383.jpg",
  "/images/hero-carousel/DSCF2396.jpg",
  "/images/hero-carousel/DSCF2409.jpg",
  "/images/hero-carousel/DSCF2413.jpg",
  "/images/hero-carousel/DSCF2416.jpg",
];

const CAROUSEL_INTERVAL = 5000; // 5 seconds per image

export function Hero() {
  const { t } = useTranslations();
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "50%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Auto-rotate carousel
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, CAROUSEL_INTERVAL);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Simplified transition variants for better performance
  const getTransitionVariants = (index: number) => {
    // Use simpler transitions - fewer scale operations for better performance
    const directions = [
      { x: "100%", y: 0 },      // Slide from right
      { x: "-100%", y: 0 },     // Slide from left
      { x: 0, y: "100%" },      // Slide from bottom
      { x: 0, y: "-100%" },     // Slide from top
      { x: "100%", y: "-30%" }, // Diagonal top-right
      { x: "-100%", y: "30%" }, // Diagonal bottom-left
      { x: "50%", y: "50%" },   // Diagonal bottom-right
      { x: "-50%", y: "-50%" },  // Diagonal top-left
      { x: "100%", y: "30%" },   // Diagonal bottom-right
      { x: "-100%", y: "-30%" }, // Diagonal top-left
    ];
    return directions[index % directions.length];
  };

  const exitVariants = (index: number) => {
    const directions = [
      { x: "-100%", y: 0, opacity: 0 },
      { x: "100%", y: 0, opacity: 0 },
      { x: 0, y: "-100%", opacity: 0 },
      { x: 0, y: "100%", opacity: 0 },
      { x: "-100%", y: "30%", opacity: 0 },
      { x: "100%", y: "-30%", opacity: 0 },
      { x: "-50%", y: "-50%", opacity: 0 },
      { x: "50%", y: "50%", opacity: 0 },
      { x: "-100%", y: "-30%", opacity: 0 },
      { x: "100%", y: "30%", opacity: 0 },
    ];
    return directions[index % directions.length];
  };

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
      id="hero"
    >
      {/* Parallax Background Image Carousel */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="relative w-full h-[120%] bg-surface overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImageIndex}
              initial={shouldReduceMotion 
                ? { opacity: 0 } 
                : { 
                    ...getTransitionVariants(currentImageIndex),
                    opacity: 0 
                  }
              }
              animate={shouldReduceMotion
                ? { opacity: 1 }
                : { 
                    x: 0, 
                    y: 0, 
                    opacity: 1 
                  }
              }
              exit={shouldReduceMotion
                ? { opacity: 0 }
                : exitVariants(currentImageIndex)
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.7,
                ease: [0.4, 0, 0.2, 1], // Optimized easing for smoother performance
                opacity: { duration: 0.6 },
              }}
              style={{ willChange: shouldReduceMotion ? 'auto' : 'transform, opacity' }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[currentImageIndex]}
                alt={`FALLAGNG - Image ${currentImageIndex + 1}`}
                fill
                priority={currentImageIndex === 0}
                className="object-cover"
                sizes="100vw"
                quality={90}
                unoptimized={false}
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  const target = e.currentTarget;
                  target.style.display = "none";
                }}
              />
            </motion.div>
          </AnimatePresence>
          {/* Dim Overlay Gradient - Subtle for dark album cover */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/20 to-bg/60" />
          {/* Aurora Glow Effects - Subtle */}
          {!shouldReduceMotion && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/5 rounded-full blur-3xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Animated Title */}
          <div className="mb-8">
            <AnimatedTitle text={t.hero.title} />
          </div>

          {/* Subtitle */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-3xl md:text-4xl lg:text-5xl font-allison font-medium bg-gradient-to-r from-text via-text to-electric bg-clip-text text-transparent max-w-2xl mx-auto text-balance">
              {t.hero.subtitle}
            </p>
          </motion.div>

          {/* CTA Cluster */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <CTACluster />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Cue */}
      <ScrollCue />
    </section>
  );
}

