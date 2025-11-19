"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerChildren } from "@/lib/motion";
import { Link } from "@/lib/types";
import {
  Music,
  Music2,
  Youtube,
  Radio,
  Disc,
  ChevronRight,
  Copy,
  Check,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { trackOutboundLink } from "@/lib/tracking";
import { getDeepLink } from "@/lib/deep-links";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/use-translations";

const platformIcons: Partial<Record<Link["platform"], LucideIcon>> = {
  spotify: Music,
  apple: Music2,
  youtube: Youtube,
  soundcloud: Radio,
  bandcamp: Disc,
  tidal: Waves,
  deezer: Music2,
};

interface PlatformListProps {
  links: Link[];
}

export function PlatformList({ links }: PlatformListProps) {
  const { t } = useTranslations();
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  
  // Get translated platform note
  const getPlatformNote = (platform: string, defaultNote: string): string => {
    const platformKey = platform.toLowerCase() as keyof typeof t.listen.platformNotes;
    return t.listen.platformNotes[platformKey] || defaultNote;
  };

  const handleCopy = async (url: string, platform: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleClick = (link: Link) => {
    trackOutboundLink(link.platform, link.url, link.label);

    // Try deep link on mobile, fallback to web URL
    const deepLink = getDeepLink(link.url, link.platform);
    const finalUrl = deepLink !== link.url ? deepLink : link.url;

    // Open in new tab
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {links.map((link) => {
        const Icon = platformIcons[link.platform] || Music;
        const isCopied = copiedUrl === link.url;

        return (
          <motion.div
            key={link.platform}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group"
          >
            <div
              onClick={() => handleClick(link)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(link);
                }
              }}
              className={cn(
                "glass w-full p-5 flex items-center gap-4",
                "hover:shadow-[0_12px_40px_rgba(255,68,68,0.2),0_0_0_1px_rgba(255,68,68,0.1)]",
                "transition-all duration-300 focus-ring cursor-pointer",
                "text-left"
              )}
              aria-label={`${t.common.ariaLabels.openPlatform} ${link.label} - ${getPlatformNote(link.platform, link.note)}`}
            >
              {/* Platform Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-surface/50 flex items-center justify-center">
                <Icon className="w-6 h-6 text-electric" aria-hidden="true" />
              </div>

              {/* Label and Note */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-display font-semibold text-text mb-1">
                  {link.label}
                </h3>
                <p className="text-sm text-muted truncate">{getPlatformNote(link.platform, link.note)}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Copy Link Button */}
                <button
                  onClick={(e) => handleCopy(link.url, link.platform, e)}
                  className={cn(
                    "p-2 rounded-lg transition-colors focus-ring",
                    "text-muted hover:text-electric hover:bg-surface/50",
                    isCopied && "text-electric"
                  )}
                  aria-label={`${t.common.ariaLabels.copyLink} ${link.label}`}
                  title={t.listen.copyLink}
                  type="button"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>

                {/* Chevron */}
                <ChevronRight
                  className="w-5 h-5 text-muted group-hover:text-electric group-hover:translate-x-1 transition-all"
                  aria-hidden="true"
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

