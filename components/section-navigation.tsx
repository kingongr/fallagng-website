"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/use-translations";

interface Section {
  id: string;
  label: string;
  count?: number;
}

interface SectionNavigationProps {
  sections: Section[];
}

export function SectionNavigation({ sections }: SectionNavigationProps) {
  const { t } = useTranslations();
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if we should make nav sticky
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 200);

      // Determine active section based on scroll position
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSection(sectionId);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "mb-12 flex gap-2 overflow-x-auto pb-4",
        isSticky && "sticky top-20 z-40 glass-thin p-4 rounded-xl -mx-4 px-4"
      )}
      aria-label={t.common.sectionNavigation}
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className={cn(
              "relative px-6 py-3 rounded-lg text-sm font-medium transition-all focus-ring whitespace-nowrap",
              isActive
                ? "text-text bg-electric/10 border border-electric/20"
                : "text-muted hover:text-text hover:bg-surface/50 border border-transparent"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {section.label}
            {section.count !== undefined && (
              <span className="ml-2 text-xs opacity-70">({section.count})</span>
            )}
            {isActive && (
              <motion.div
                layoutId="activeSectionIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric"
                initial={false}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </motion.nav>
  );
}


