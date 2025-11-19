"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerChildren } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { trackContentView } from "@/lib/tracking";

// Load Instagram embed script
function useInstagramEmbed() {
  useEffect(() => {
    if (typeof window !== "undefined") {
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
    }
  }, []);
}

// Load TikTok embed script
function useTikTokEmbed() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
      
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
        
        // Process embeds after script loads
        script.onload = () => {
          // TikTok script automatically processes blockquotes with class "tiktok-embed"
          const embeds = document.querySelectorAll('.tiktok-embed');
          embeds.forEach((embed) => {
            // Script handles processing automatically
          });
        };
      } else {
        // Script already exists, process any new embeds
        const embeds = document.querySelectorAll('.tiktok-embed:not([data-processed])');
        embeds.forEach((embed) => {
          embed.setAttribute('data-processed', 'true');
        });
      }
    }
  }, []);
}

interface InstagramPost {
  id: string;
  permalink: string;
  platform?: "instagram" | "tiktok";
}

interface PicturesGridProps {
  posts: InstagramPost[];
}

export function PicturesGrid({ posts }: PicturesGridProps) {
  useInstagramEmbed();
  useTikTokEmbed();

  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start"
    >
      {posts.map((post, index) => (
        <InstagramPostCard key={post.id} post={post} index={index} />
      ))}
    </motion.div>
  );
}

function InstagramPostCard({ post, index }: { post: InstagramPost; index: number }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const blockquoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setIsLoading(false);
            // Process embeds when visible
            setTimeout(() => {
              if (post.platform !== "tiktok" && (window as any).instgrm && blockquoteRef.current) {
                (window as any).instgrm.Embeds.process(blockquoteRef.current);
              } else if (post.platform === "tiktok" && blockquoteRef.current) {
                // Mark TikTok embed as processed
                blockquoteRef.current.setAttribute('data-processed', 'true');
                // TikTok script processes embeds automatically when they're in the DOM
                // Force a re-check by the script
                const script = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
                if (script && (window as any).tiktokEmbed) {
                  try {
                    // Trigger TikTok's embed processing
                    (window as any).tiktokEmbed.lib.render();
                  } catch (e) {
                    // Script will handle it automatically
                  }
                }
              }
            }, 100);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "100px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track view when embed loads and adjust height to hide comments
  useEffect(() => {
    if (isVisible && !isLoading && post.platform !== "tiktok") {
      trackContentView("picture", post.id, post.platform || "instagram");
      
      // Wait for Instagram to process the embed, then adjust height
      const adjustHeight = () => {
        if (blockquoteRef.current) {
          const iframe = blockquoteRef.current.querySelector('iframe');
          if (iframe) {
            // Set fixed height to show only image, hide comments
            iframe.style.height = '540px';
            iframe.style.maxHeight = '540px';
            iframe.style.overflow = 'hidden';
          }
        }
      };

      // Try multiple times as Instagram loads asynchronously
      const timers = [
        setTimeout(adjustHeight, 500),
        setTimeout(adjustHeight, 1000),
        setTimeout(adjustHeight, 2000),
      ];

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    } else if (isVisible && !isLoading && post.platform === "tiktok") {
      trackContentView("picture", post.id, "tiktok");
      
      // Ensure TikTok embed is processed
      const processTikTokEmbed = () => {
        if (blockquoteRef.current) {
          // Check if TikTok script is loaded and process the embed
          const checkAndProcess = () => {
            const script = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
            if (script) {
              // Wait a bit for script to be ready
              setTimeout(() => {
                if ((window as any).tiktokEmbed && blockquoteRef.current) {
                  try {
                    (window as any).tiktokEmbed.lib.render();
                  } catch (e) {
                    // Script processes automatically
                  }
                }
              }, 300);
            }
          };
          
          checkAndProcess();
        }
      };

      const timers = [
        setTimeout(processTikTokEmbed, 500),
        setTimeout(processTikTokEmbed, 1000),
        setTimeout(processTikTokEmbed, 2000),
      ];

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [isVisible, isLoading, post.id, post.platform]);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "glass p-0 rounded-xl instagram-container overflow-hidden",
        "relative w-full flex justify-center"
      )}
      style={{ maxHeight: "540px" }}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface/50">
          <Loader2 className="w-8 h-8 text-electric animate-spin" />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/50 p-4">
          <AlertCircle className="w-8 h-8 text-muted mb-2" />
          <p className="text-sm text-muted text-center">
            Unable to load post
          </p>
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-electric hover:underline"
            >
              View on {post.platform === "tiktok" ? "TikTok" : "Instagram"}
            </a>
        </div>
      )}

      {/* TikTok Embed */}
      {isVisible && !hasError && post.platform === "tiktok" && (
        <div className="w-full flex justify-center" style={{ maxHeight: "540px", overflow: "hidden" }}>
          <blockquote
            ref={blockquoteRef}
            className="tiktok-embed"
            cite={post.permalink}
            data-video-id={post.id}
            style={{
              maxWidth: "540px",
              minWidth: "326px",
              width: "100%",
              margin: "0 auto",
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <section>
              <a
                target="_blank"
                title={`TikTok post ${post.id}`}
                href={post.permalink}
                rel="noopener noreferrer"
              >
                {post.permalink}
              </a>
            </section>
          </blockquote>
        </div>
      )}

      {/* Instagram Embed */}
      {isVisible && !hasError && post.platform !== "tiktok" && (
        <div className="w-full flex justify-center" style={{ maxHeight: "540px", overflow: "hidden" }}>
          <blockquote
            ref={blockquoteRef}
            className="instagram-media instagram-picture-embed"
            data-instgrm-permalink={post.permalink}
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
              maxHeight: "540px",
              overflow: "hidden",
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.3s ease-in-out",
            }}
          />
        </div>
      )}
    </motion.div>
  );
}

