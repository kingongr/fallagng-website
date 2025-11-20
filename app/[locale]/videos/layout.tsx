"use client";

import { useEffect } from "react";

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Preconnect to video platforms for faster loading
    const preconnectLinks = [
      { rel: "preconnect", href: "https://www.youtube.com" },
      { rel: "preconnect", href: "https://i.ytimg.com" },
      { rel: "preconnect", href: "https://vimeo.com" },
      { rel: "preconnect", href: "https://www.instagram.com" },
      { rel: "dns-prefetch", href: "https://www.youtube.com" },
      { rel: "dns-prefetch", href: "https://i.ytimg.com" },
      { rel: "dns-prefetch", href: "https://vimeo.com" },
      { rel: "dns-prefetch", href: "https://www.instagram.com" },
    ];

    const addedLinks: HTMLLinkElement[] = [];

    preconnectLinks.forEach(({ rel, href }) => {
      // Check if link already exists
      const existing = document.querySelector(`link[href="${href}"]`);
      if (!existing) {
        const link = document.createElement("link");
        link.rel = rel;
        link.href = href;
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
        addedLinks.push(link);
      }
    });

    return () => {
      addedLinks.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, []);

  return <>{children}</>;
}



