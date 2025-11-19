"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { useTranslations } from "@/hooks/use-translations";

export function EthosSection() {
  const { t } = useTranslations();
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-display font-bold text-text mb-12 text-center"
          >
            {t.collective.ethos.title}
          </motion.h2>
          
          <motion.div
            variants={fadeUp}
            className="mt-8"
          >
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-muted leading-relaxed text-center italic"
            >
              <span className="text-gold font-semibold">{t.collective.ethos.word}</span>
              <br />
              <span className="text-sm">{t.collective.ethos.pronunciation}</span>
              <br />
              <br />
              {t.collective.ethos.definition}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

