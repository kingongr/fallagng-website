"use client";

import { motion } from "framer-motion";
import { Play, Pause, Music } from "lucide-react";
import { useState } from "react";

export function MiniPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-thin p-4 mb-8"
    >
      <div className="flex items-center gap-4">
        {/* Album Art Placeholder */}
        <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center flex-shrink-0">
          <Music className="w-6 h-6 text-muted" aria-hidden="true" />
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text truncate">
            Now Playing
          </p>
          <p className="text-xs text-muted truncate">
            Select a platform to start listening
          </p>
        </div>

        {/* Play/Pause Button (Non-functional stub) */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-electric/10 text-electric hover:bg-electric/20 transition-colors focus-ring flex-shrink-0"
          aria-label={isPlaying ? "Pause" : "Play"}
          disabled
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Play className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>
    </motion.div>
  );
}




