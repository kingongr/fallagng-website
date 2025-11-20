"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { playNavHoverSound } from "@/lib/sound";
import { useTranslations } from "@/hooks/use-translations";
import { getLocale, addLocaleToPath, removeLocaleFromPath } from "@/lib/i18n";
import { locales, type Locale } from "@/middleware";
import { getNestedTranslation } from "@/lib/translations";
import { subtleJitter } from "@/lib/motion";
import { useReducedMotion } from "framer-motion";
import { CountdownTimer } from "./countdown-timer";

// Target date: November 22, 2025 at 6pm (local timezone)
const getTargetDate = (): Date => {
  const target = new Date();
  target.setFullYear(2025, 10, 22); // Month is 0-indexed (10 = November)
  target.setHours(18, 0, 0, 0); // 6pm = 18:00:00
  return target;
};

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, locale: currentLocale } = useTranslations();
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const targetDate = getTargetDate();

  // Check if loader has been shown and show countdown in nav
  useEffect(() => {
    // Check localStorage to see if loader has completed
    const loaderCompleted = localStorage.getItem("loaderCompleted");
    if (loaderCompleted === "true") {
      // Small delay for smooth transition
      setTimeout(() => {
        setShowCountdown(true);
      }, 500);
    } else {
      // Listen for loader completion
      const handleLoaderComplete = () => {
        localStorage.setItem("loaderCompleted", "true");
        setTimeout(() => {
          setShowCountdown(true);
        }, 500);
      };
      
      // Check periodically if loader is gone (fallback)
      const checkInterval = setInterval(() => {
        const loader = document.querySelector('[data-loader="true"]');
        if (!loader && !loaderCompleted) {
          handleLoaderComplete();
          clearInterval(checkInterval);
        }
      }, 100);

      return () => clearInterval(checkInterval);
    }
  }, []);

  const navItems = [
    { href: "/", labelKey: "nav.home" as const },
    { href: "/collective", labelKey: "nav.collective" as const },
    { href: "/videos", labelKey: "nav.watch" as const },
    { href: "/listen", labelKey: "nav.listen" as const },
  ];

  const handleLanguageSwitch = () => {
    const newLocale: Locale = currentLocale === 'en' ? 'fr' : 'en';
    const cleanPath = removeLocaleFromPath(pathname);
    const newPath = addLocaleToPath(cleanPath, newLocale);
    
    // Set cookie and navigate
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.push(newPath);
  };

  // Show header on scroll up, hide on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        // Always show near top
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-electric focus:text-bg focus:rounded-lg focus:font-medium focus-ring"
      >
        {t.common.skipToContent}
      </a>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass-thin"
      >
        {/* Scroll Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-stroke">
          <motion.div
            className="h-full bg-gradient-to-r from-electric via-gold to-electric"
            style={{ scaleX: scrollProgress, originX: 0 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : subtleJitter.hover as any}
            >
              <Link
                href={addLocaleToPath("/", currentLocale)}
                className="text-xl font-permanent-marker text-text hover:text-electric transition-colors focus-ring z-10"
                aria-label={t.common.ariaLabels.home}
              >
                FALLAGNG
              </Link>
            </motion.div>

            {/* Nav Links - Centered */}
            <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2" aria-label={t.common.ariaLabels.mainNav}>
              {navItems.map((item) => {
                const localePath = addLocaleToPath(item.href, currentLocale);
                const cleanPathname = removeLocaleFromPath(pathname);
                const isActive = cleanPathname === item.href || (cleanPathname === '' && item.href === '/');
                return (
                  <motion.div
                    key={item.href}
                    whileHover={shouldReduceMotion ? {} : subtleJitter.hover as any}
                  >
                    <Link
                      href={localePath}
                      className={cn(
                        "relative text-sm font-medium transition-colors focus-ring",
                        isActive ? "text-text" : "text-muted hover:text-text"
                      )}
                      onMouseEnter={playNavHoverSound}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {getNestedTranslation(t, item.labelKey)}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-electric via-gold to-electric"
                          initial={false}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Right side: Countdown and Language Switcher */}
            <div className="flex items-center gap-3">
              {/* Countdown Timer - Show after loader */}
              {showCountdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="hidden lg:flex items-center"
                >
                  <div className="px-3 py-1.5 rounded-lg bg-surface/50 border border-stroke/50">
                    <CountdownTimer
                      targetDate={targetDate}
                      variant="nav"
                      className="text-muted whitespace-nowrap"
                    />
                  </div>
                </motion.div>
              )}

                <button
                onClick={handleLanguageSwitch}
                className="px-4 py-2 rounded-lg bg-electric/10 text-electric hover:bg-electric/20 border border-electric/20 transition-all focus-ring text-sm font-medium z-10"
                aria-label={currentLocale === 'en' ? t.common.ariaLabels.switchToFrench : t.common.ariaLabels.switchToEnglish}
              >
                {currentLocale === 'en' ? t.language.fr : t.language.en}
              </button>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}

