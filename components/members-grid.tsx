"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { fadeUp, scaleIn, jitter, subtleJitter } from "@/lib/motion";
import { Member } from "@/lib/types";
import { Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/use-translations";
import { useReducedMotion } from "framer-motion";

interface MembersGridProps {
  members: Member[];
}

export function MembersGrid({ members }: MembersGridProps) {
  const { t } = useTranslations();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  // Translate role function
  const translateRole = (role: string): string => {
    const roleLower = role.toLowerCase().trim();
    if (roleLower === "singer") return t.collective.roles.singer;
    if (roleLower === "producer") return t.collective.roles.producer;
    if (roleLower === "dj") return t.collective.roles.dj;
    if (roleLower.includes("singer") && roleLower.includes("producer")) {
      return t.collective.roles.singerProducer;
    }
    return role; // Fallback to original if no translation found
  };

  // Extract unique individual roles from combined roles
  const roles = useMemo(() => {
    const allRoles = new Set<string>();
    members.forEach((member) => {
      // Split roles by "&" or "and" and trim whitespace
      const individualRoles = member.role
        .split(/[&]/)
        .map((r) => r.trim())
        .filter((r) => r.length > 0);
      individualRoles.forEach((role) => allRoles.add(role));
    });
    return Array.from(allRoles).sort();
  }, [members]);

  // Handle URL hash routing
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Normalize hash (handle both "vocalist" and "vocalist" formats)
      const normalizedHash = hash.toLowerCase().replace(/-/g, " ");
      // Find matching role (case-insensitive, handle spaces)
      const matchingRole = roles.find(
        (r) =>
          r.toLowerCase() === normalizedHash ||
          r.toLowerCase().replace(/\s+/g, "-") === hash.toLowerCase()
      );
      if (matchingRole) {
        setSelectedRole(matchingRole);
      }
    }
  }, [roles]);

  // Update URL hash when filter changes
  useEffect(() => {
    if (selectedRole) {
      const hash = selectedRole.toLowerCase().replace(/\s+/g, "-");
      window.history.replaceState(null, "", `#${hash}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [selectedRole]);

  // Filter members by role - check if member's role contains the selected role
  const filteredMembers = useMemo(() => {
    if (!selectedRole) return members;
    const selectedRoleLower = selectedRole.toLowerCase();
    return members.filter((m) => {
      const memberRoleLower = m.role.toLowerCase();
      // Check if the member's role contains the selected role (handles "Singer & Producer" matching "Singer")
      return memberRoleLower.includes(selectedRoleLower);
    });
  }, [members, selectedRole]);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          role="group"
          aria-label={t.collective.members.filterByRole}
        >
          <button
            onClick={() => setSelectedRole(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all focus-ring",
              selectedRole === null
                ? "bg-gold text-bg"
                : "glass-thin text-muted hover:text-text"
            )}
            aria-pressed={selectedRole === null}
            aria-label={t.collective.members.showAll}
          >
            {t.collective.members.all}
          </button>
          {roles.map((role) => {
            const isActive = selectedRole === role;
            const translatedRole = translateRole(role);
            return (
              <button
                key={role}
                onClick={() => setSelectedRole(isActive ? null : role)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all focus-ring",
                  isActive
                    ? "bg-gold text-bg"
                    : "glass-thin text-muted hover:text-text"
                )}
                aria-pressed={isActive}
                aria-label={`${t.collective.members.filterBy} ${translatedRole}`}
              >
                {translatedRole}
              </button>
            );
          })}
        </motion.div>

        {/* Members Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRole || "all"}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="flex flex-wrap justify-center gap-6"
          >
            {filteredMembers.map((member) => (
              <div key={member.name} className="w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] xl:w-[calc((100%-72px)/4)] max-w-sm">
                <MemberCard
                  member={member}
                  isHovered={hoveredMember === member.name}
                  onHover={() => setHoveredMember(member.name)}
                  onLeave={() => setHoveredMember(null)}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredMembers.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted mt-12"
          >
            {t.collective.members.noMembersForRole}
          </motion.p>
        )}
      </div>
    </section>
  );
}

interface MemberCardProps {
  member: Member;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function MemberRole({ role }: { role: string }) {
  const { t } = useTranslations();
  
  const translateRole = (role: string): string => {
    const roleLower = role.toLowerCase().trim();
    if (roleLower === "singer") return t.collective.roles.singer;
    if (roleLower === "producer") return t.collective.roles.producer;
    if (roleLower === "dj") return t.collective.roles.dj;
    if (roleLower.includes("singer") && roleLower.includes("producer")) {
      return t.collective.roles.singerProducer;
    }
    return role; // Fallback to original if no translation found
  };
  
  return <p className="text-sm text-gold">{translateRole(role)}</p>;
}

function MemberCard({ member, isHovered, onHover, onLeave }: MemberCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselImages = member.carousel || [member.headshot];
  const hasMultipleImages = carouselImages.length > 1;

  // Auto-rotate carousel
  useEffect(() => {
    if (!hasMultipleImages) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [hasMultipleImages, carouselImages.length]);
  
  // Reset to first image when member changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [member.name]);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const getInstagramUrl = () => {
    const instagramHandle = member.socials.instagram;
    if (!instagramHandle) return "#";
    // Remove @ if present
    const handle = instagramHandle.replace("@", "");
    return `https://www.instagram.com/${handle}/`;
  };

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="glass p-6 cursor-pointer group relative overflow-hidden"
      style={{
        boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Carousel */}
      <motion.div
        className="relative w-full aspect-[16/20] mb-4 rounded-lg overflow-hidden bg-surface"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={carouselImages[currentImageIndex]}
              alt={`${member.name} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation - Only show if multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all focus-ring z-10 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all focus-ring z-10 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all",
                    index === currentImageIndex
                      ? "bg-white w-4"
                      : "bg-white/50 hover:bg-white/75"
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Name & Role - Always Visible */}
      <div className="mb-3">
        <motion.h3
          className="text-xl font-display font-semibold text-text mb-1"
          whileHover={shouldReduceMotion ? {} : subtleJitter.hover}
        >
          {member.name}
        </motion.h3>
        <MemberRole role={member.role} />
      </div>

      {/* Instagram Link - Always Visible */}
      {member.socials.instagram && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={shouldReduceMotion ? {} : jitter.hover}
          className="flex items-center justify-center"
        >
          <a
            href={getInstagramUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-lg bg-surface/50 text-muted hover:text-electric hover:bg-surface transition-colors focus-ring"
            aria-label={`${member.name}'s Instagram`}
          >
            <Instagram className="w-5 h-5" aria-hidden="true" />
          </a>
        </motion.div>
      )}
    </motion.div>
  );
}

