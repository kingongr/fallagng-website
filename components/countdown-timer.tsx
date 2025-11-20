"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
  variant?: "loader" | "nav";
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export function CountdownTimer({
  targetDate,
  variant = "loader",
  className = "",
}: CountdownTimerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const calculateTimeRemaining = (): TimeRemaining => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          total: 0,
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days,
        hours,
        minutes,
        seconds,
        total: difference,
      };
    };

    // Calculate immediately
    setTimeRemaining(calculateTimeRemaining());

    // Update every second
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeRemaining) {
    return null;
  }

  // Format display based on variant
  const formatTime = () => {
    if (variant === "nav") {
      // Compact format for nav: "5d 12h 30m"
      return `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m`;
    } else {
      // Full format for loader: "5d 12h 30m 15s"
      return `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`;
    }
  };

  const baseClasses =
    variant === "loader"
      ? "text-xl md:text-2xl font-medium text-white"
      : "text-xs md:text-sm font-medium text-muted";

  return (
    <div
      className={`${baseClasses} ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {timeRemaining.total <= 0 ? (
        <span>00:00:00:00</span>
      ) : (
        <span>{formatTime()}</span>
      )}
    </div>
  );
}

