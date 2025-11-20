"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerChildren, subtleJitter, jitter } from "@/lib/motion";
import { Video } from "@/lib/types";
import { VideoEmbed } from "./video-embed";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { trackContentView } from "@/lib/tracking";

interface VideosGridProps {
  videos: Video[];
}

export function VideosGrid({ videos }: VideosGridProps) {
  const shouldReduceMotion = useReducedMotion();
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const playingVideoRef = useRef<HTMLDivElement>(null);

  const handleVideoPlay = (videoId: string, platform: string, title?: string) => {
    setPlayingVideoId(videoId);
    // Track video view
    trackContentView("video", videoId, platform, title);
  };

  const handleVideoClose = () => {
    setPlayingVideoId(null);
  };

  useEffect(() => {
    if (playingVideoId && playingVideoRef.current) {
      playingVideoRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      });
    }
  }, [playingVideoId]);

  // ESC key handler to close expanded videos
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && playingVideoId) {
        handleVideoClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playingVideoId]);

  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
    >
      {videos.map((video, index) => {
        const isPlaying = playingVideoId === `${video.platform}-${video.id}`;
        const isExpanded = isPlaying;
        
        return (
          <motion.div
            key={`${video.platform}-${video.id}`}
            ref={isExpanded ? playingVideoRef : null}
            variants={fadeUp}
            transition={{
              delay: index * 0.1,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
              "glass p-4 md:p-6 rounded-xl transition-all duration-500 relative",
              isExpanded && "md:col-span-2 lg:col-span-3"
            )}
            layout
          >
            {/* Close button for expanded videos */}
            {isExpanded && (
              <motion.button
                onClick={handleVideoClose}
                whileHover={shouldReduceMotion ? {} : jitter.hover as any}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/80 hover:bg-black/90 text-text transition-colors focus-ring"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
            
            <VideoEmbed
              videoId={video.id}
              platform={video.platform}
              thumbnail={video.thumbnail}
              title={video.title}
              className="mb-4"
              onPlay={() => handleVideoPlay(`${video.platform}-${video.id}`, video.platform, video.title)}
            />
            <motion.h3
              className="text-lg font-display font-semibold text-text mb-2"
              whileHover={shouldReduceMotion ? {} : subtleJitter.hover as any}
            >
              {video.title}
            </motion.h3>
            <p className="text-sm text-muted">
              {new Date(video.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

