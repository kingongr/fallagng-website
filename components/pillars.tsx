"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerChildren, jitter, continuousJitter } from "@/lib/motion";
import { Hammer, Users, Infinity } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export function Pillars() {
  const { t } = useTranslations();
  const shouldReduceMotion = useReducedMotion();
  
  const pillars = [
    {
      title: t.collective.pillars.craft.title,
      description: t.collective.pillars.craft.description,
      icon: Hammer,
    },
    {
      title: t.collective.pillars.community.title,
      description: t.collective.pillars.community.description,
      icon: Users,
    },
    {
      title: t.collective.pillars.continuum.title,
      description: t.collective.pillars.continuum.description,
      icon: Infinity,
    },
  ];
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="glass p-8 text-center"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-6"
                  whileHover={shouldReduceMotion ? {} : jitter.hover as any}
                  animate={shouldReduceMotion ? {} : continuousJitter}
                >
                  <Icon className="w-8 h-8" aria-hidden="true" />
                </motion.div>
                <h3 className="text-2xl font-display font-semibold text-text mb-4">
                  {pillar.title}
                </h3>
                <p className="text-muted leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}



