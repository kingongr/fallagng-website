"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeUp, staggerChildren, jitter, continuousJitter } from "@/lib/motion";
import { Play, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoEmbed } from "./video-embed";
import videosData from "@/content/videos.json";
import { Video } from "@/lib/types";
import { useTranslations } from "@/hooks/use-translations";
import { addLocaleToPath } from "@/lib/i18n";

interface PanelProps {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  image?: string;
  imageAlt?: string;
  index: number;
  videoId?: string;
  platform?: "youtube" | "vimeo" | "instagram";
  showTextInstead?: boolean;
  textContent?: string;
}

function Panel({ title, description, href, icon: Icon, image, imageAlt, index, videoId, platform, showTextInstead, textContent }: PanelProps) {
  const { t, locale } = useTranslations();
  const shouldReduceMotion = useReducedMotion();
  const isVideoPanel = index === 0 && videoId && platform;
  const localeHref = href.startsWith('http') ? href : addLocaleToPath(href, locale);

  return (
    <motion.div
      variants={fadeUp}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="glass p-6 md:p-8 h-full group"
    >
      {isVideoPanel ? (
        <div className="h-full">
          <div className="mb-4">
            <VideoEmbed
              videoId={videoId}
              platform={platform}
              thumbnail={image}
              title={imageAlt || title}
            />
          </div>
          <div className="flex items-start gap-3">
            <motion.div
              className="p-2 rounded-lg bg-electric/10 text-electric"
              whileHover={shouldReduceMotion ? {} : jitter.hover}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-xl font-display font-semibold text-text mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{description}</p>
            </div>
          </div>
          <Link
            href={localeHref}
            className="mt-4 inline-block text-sm text-electric hover:text-gold transition-colors focus-ring"
            aria-label={t.videos.viewAllVideos}
          >
            {t.videos.viewAllVideos} →
          </Link>
        </div>
      ) : (
        <Link href={localeHref} className="block h-full focus-ring rounded-xl" aria-label={`View ${title}`} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
          {showTextInstead && textContent ? (
            <div className="relative aspect-video mb-4 rounded-lg overflow-hidden flex items-center justify-center">
              <motion.h2
                className="text-6xl md:text-7xl font-permanent-marker text-electric text-center"
                animate={shouldReduceMotion ? {} : continuousJitter}
              >
                {textContent}
              </motion.h2>
            </div>
          ) : image ? (
            <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-surface">
              <Image
                src={image}
                alt={imageAlt || title}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  // Show placeholder if image fails
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          ) : null}
          <div className="flex items-start gap-3">
            <motion.div
              className="p-2 rounded-lg bg-electric/10 text-electric"
              whileHover={shouldReduceMotion ? {} : jitter.hover}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-xl font-display font-semibold text-text mb-2 group-hover:text-electric transition-colors">
                {title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{description}</p>
            </div>
          </div>
        </Link>
      )}
    </motion.div>
  );
}

export function ThreePanelStrip() {
  const { t } = useTranslations();
  const videos = videosData as Video[];
  const latestVideo = videos[0]; // Get the first video (latest)

  const panels: PanelProps[] = [
    {
      title: t.videos.latestVideo.title,
      description: t.videos.latestVideo.description,
      href: "/videos",
      icon: Play,
      image: latestVideo?.thumbnail || "/images/videos/latest.jpg",
      imageAlt: latestVideo?.title || "Latest video thumbnail",
      index: 0,
      videoId: latestVideo?.id,
      platform: latestVideo?.platform,
    },
    {
      title: t.videos.upcomingEvent.title,
      description: t.videos.upcomingEvent.description,
      href: "https://partiful.com/e/xbXRvJwwp3bcX8FR35OA",
      icon: Calendar,
      image: "/images/upcoming.jpg",
      imageAlt: "Upcoming release teaser",
      index: 1,
    },
    {
      title: t.videos.ourCode.title,
      description: t.videos.ourCode.description,
      href: "/collective",
      icon: Users,
      showTextInstead: true,
      textContent: "FALLA",
      index: 2,
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {panels.map((panel) => (
            <Panel key={panel.href} {...panel} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

