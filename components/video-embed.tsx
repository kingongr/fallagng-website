"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoEmbedProps {
  videoId: string;
  platform: "youtube" | "vimeo" | "instagram";
  thumbnail?: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  onPlay?: () => void;
}

export function VideoEmbed({
  videoId,
  platform,
  thumbnail,
  title,
  className,
  autoplay = false,
  onPlay,
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);

  // Load Instagram embed script
  useEffect(() => {
    if (platform === "instagram" && typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      script.charset = "utf-8";
      
      // Check if script already exists
      if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
        document.body.appendChild(script);
      }

      // Process embeds after script loads
      script.onload = () => {
        if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
        }
      };

      return () => {
        // Cleanup handled by React
      };
    }
  }, [platform]);

  const getThumbnailUrl = () => {
    if (thumbnail && !thumbnail.startsWith("http")) {
      return thumbnail;
    }
    if (platform === "youtube") {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return thumbnail || "";
  };

  const getEmbedUrl = () => {
    if (platform === "youtube") {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    }
    if (platform === "instagram") {
      // Use /p/ format for Instagram posts (works for both posts and reels)
      return `https://www.instagram.com/p/${videoId}/embed`;
    }
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  };

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay?.();
  };

  const aspectRatioClass = platform === "instagram" ? "aspect-square" : "aspect-video";

  // Process Instagram embed after it's rendered
  useEffect(() => {
    if (isPlaying && platform === "instagram") {
      const timer = setTimeout(() => {
        if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, platform]);

  if (isPlaying && platform === "instagram") {
    // Use blockquote embed for Instagram reels
    const isReel = videoId.startsWith("D") && videoId.length === 11; // Instagram reel IDs pattern
    const embedUrl = isReel 
      ? `https://www.instagram.com/reel/${videoId}/?utm_source=ig_embed&utm_campaign=loading`
      : `https://www.instagram.com/p/${videoId}/?utm_source=ig_embed&utm_campaign=loading`;

    return (
      <div className={cn(
        "relative w-full instagram-container overflow-hidden flex justify-center",
        className
      )}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={embedUrl}
          data-instgrm-version="14"
          style={{
            background: "transparent",
            border: 0,
            borderRadius: "0.5rem",
            margin: "0 auto",
            padding: 0,
            width: "100%",
            maxWidth: "540px",
            minWidth: "326px",
            overflow: "hidden",
          }}
        />
      </div>
    );
  }

  if (isPlaying) {
    return (
      <div className={cn(
        "relative w-full",
        aspectRatioClass,
        "rounded-lg overflow-hidden",
        className
      )}>
        <iframe
          src={getEmbedUrl()}
          title={title || "Video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
    );
  }

  // For Instagram, show embed directly (it shows its own thumbnail/preview)
  if (platform === "instagram" && !isPlaying) {
    return (
      <motion.div
        className={cn(
          "relative w-full",
          aspectRatioClass,
          "rounded-lg overflow-hidden cursor-pointer group instagram-container",
          className
        )}
        onClick={handlePlay}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative w-full h-full bg-surface">
          {/* Instagram embed shows its own thumbnail/preview */}
          <iframe
            src={`https://www.instagram.com/p/${videoId}/embed`}
            title={title || "Instagram post"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            style={{
              pointerEvents: "none",
              border: "none",
              margin: 0,
              padding: 0,
            }}
          />
          {/* Click overlay to trigger play */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
            <motion.div
              className="w-20 h-20 rounded-full bg-electric/90 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-10 h-10 text-bg ml-1" fill="currentColor" />
            </motion.div>
          </div>
          {/* Platform Badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-text">
            Instagram
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn("relative w-full", aspectRatioClass, "rounded-lg overflow-hidden cursor-pointer group", className)}
      onClick={handlePlay}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-full bg-surface">
        {thumbnail && !thumbnail.startsWith("http") ? (
          <Image
            src={getThumbnailUrl()}
            alt={title || "Video thumbnail"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Fallback to YouTube thumbnail if custom thumbnail fails
              if (platform === "youtube") {
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
              } else {
                e.currentTarget.style.display = "none";
              }
            }}
          />
        ) : (
          <img
            src={getThumbnailUrl()}
            alt={title || "Video thumbnail"}
            className="w-full h-full object-cover"
            onError={(e) => {
              if (platform === "youtube") {
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
              } else {
                e.currentTarget.style.display = "none";
              }
            }}
          />
        )}

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
          <motion.div
            className="w-20 h-20 rounded-full bg-electric/90 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-10 h-10 text-bg ml-1" fill="currentColor" />
          </motion.div>
        </div>

        {/* Platform Badge */}
        {platform === "youtube" && (
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-text">
            YouTube
          </div>
        )}
        {platform === "instagram" && (
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-text">
            Instagram
          </div>
        )}
      </div>
    </motion.div>
  );
}

