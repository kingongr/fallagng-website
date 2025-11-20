"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Music, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/use-translations";
import { addLocaleToPath } from "@/lib/i18n";
import { subtleJitter } from "@/lib/motion";

export function CTACluster() {
  const { t, locale } = useTranslations();
  const shouldReduceMotion = useReducedMotion();
  
  const ctaItems = [
    {
      label: t.cta.listen,
      href: "/listen",
      icon: Music,
      variant: "primary" as const,
    },
    {
      label: t.cta.watch,
      href: "/videos",
      icon: Video,
      variant: "secondary" as const,
    },
  ];
  return (
    <div className="glass p-8 md:p-10 inline-block">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {ctaItems.map((item, index) => {
          const Icon = item.icon;
          const isPrimary = item.variant === "primary";

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={shouldReduceMotion ? {} : subtleJitter.hover}
              transition={{
                delay: 1.4 + index * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={addLocaleToPath(item.href, locale)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 focus-ring",
                  isPrimary
                    ? "bg-electric text-bg hover:bg-electric/90 hover:scale-105"
                    : "border-2 border-gold text-gold hover:bg-gold/10 hover:scale-105"
                )}
                aria-label={`Navigate to ${item.label}`}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

