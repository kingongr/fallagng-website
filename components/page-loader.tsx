"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { CountdownTimer } from "./countdown-timer";

// Target date: November 22, 2025 at 6pm (local timezone)
const getTargetDate = (): Date => {
  const target = new Date();
  target.setFullYear(2025, 10, 22); // Month is 0-indexed (10 = November)
  target.setHours(18, 0, 0, 0); // 6pm = 18:00:00
  return target;
};

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const targetDate = getTargetDate();

  // Check if all images are loaded
  const checkImagesLoaded = (): Promise<void> => {
    return new Promise((resolve) => {
      // Wait a bit for DOM to update after route change
      setTimeout(() => {
        const images = Array.from(document.querySelectorAll("img"));
        
        if (images.length === 0) {
          resolve();
          return;
        }

        let loadedCount = 0;
        const totalImages = images.length;
        let resolved = false;

        const checkComplete = () => {
          loadedCount++;
          if (loadedCount >= totalImages && !resolved) {
            resolved = true;
            resolve();
          }
        };

        images.forEach((img) => {
          if (img.complete && img.naturalWidth !== 0) {
            checkComplete();
          } else {
            img.addEventListener("load", checkComplete, { once: true });
            img.addEventListener("error", checkComplete, { once: true });
          }
        });

        // Fallback timeout in case some images never load
        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            resolve();
          }
        }, 3000);
      }, 100);
    });
  };

  // Handle initial page load - wait for everything
  useEffect(() => {
    const handleInitialLoad = async () => {
      // Wait for DOM to be ready
      if (document.readyState !== "complete") {
        await new Promise((resolve) => {
          if (document.readyState === "complete") {
            resolve(undefined);
          } else {
            window.addEventListener("load", () => resolve(undefined), {
              once: true,
            });
          }
        });
      }

      // Wait for fonts to load
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      // Wait for all images to load
      await checkImagesLoaded();

      // Minimum display time of 0.5s for smooth transition
      const minDisplayTime = 500;
      const startTime = Date.now();

      await new Promise((resolve) => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDisplayTime - elapsed);
        setTimeout(resolve, remaining);
      });

      setIsLoading(false);
    };

    handleInitialLoad();
  }, []);

  // Handle route changes
  useEffect(() => {
    if (isLoading) return; // Don't show navigation loader during initial load

    setIsNavigating(true);

    const handleRouteChange = async () => {
      // Wait for images to load on new page
      await checkImagesLoaded();

      // Minimum display time of 0.5s
      const minDisplayTime = 500;
      const startTime = Date.now();

      await new Promise((resolve) => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDisplayTime - elapsed);
        setTimeout(resolve, remaining);
      });

      setIsNavigating(false);
    };

    handleRouteChange();
  }, [pathname, isLoading]);

  const showLoader = isLoading || isNavigating;

  // Block pointer events on body when loader is visible
  useEffect(() => {
    if (showLoader) {
      document.body.style.pointerEvents = "none";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.pointerEvents = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.pointerEvents = "";
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          data-loader="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          style={{ pointerEvents: "auto" }}
          onAnimationComplete={() => {
            if (!isLoading && !isNavigating) {
              localStorage.setItem("loaderCompleted", "true");
            }
          }}
        >
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric/20 rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          {/* FALLAGNG Text with Moving Gradient */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <h1
              className="text-7xl md:text-9xl lg:text-[12rem] font-permanent-marker tracking-wide"
              style={{
                background:
                  "linear-gradient(90deg, #FFFFFF, #FF4444, #FFFFFF, #FF4444)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientShift 3s ease infinite",
              }}
            >
              FALLAGNG
            </h1>
            
            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="text-white"
            >
              <CountdownTimer targetDate={targetDate} variant="loader" />
            </motion.div>
          </motion.div>

          {/* Loading indicator dots */}
          <motion.div
            className="absolute bottom-24 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                    backgroundColor: ["#FFFFFF", "#FF4444", "#FFFFFF"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

