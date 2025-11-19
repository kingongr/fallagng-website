/**
 * Outbound link tracking utility
 * Tracks clicks to external platforms for analytics
 */

export function trackOutboundLink(
  platform: string,
  url: string,
  label?: string
) {
  // Track with analytics (Google Analytics, Plausible, etc.)
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "click", {
      event_category: "outbound",
      event_label: label || platform,
      transport_type: "beacon",
    });
  }

  // Custom event for other analytics providers
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("outbound-link-click", {
        detail: { platform, url, label },
      })
    );
  }

  // Console log for development
  if (process.env.NODE_ENV === "development") {
    console.log("Outbound link clicked:", { platform, url, label });
  }
}

/**
 * Track content views (videos, pictures, etc.)
 */
export function trackContentView(
  contentType: "video" | "picture",
  contentId: string,
  platform: string,
  title?: string
) {
  // Track with Google Analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "content_view", {
      event_category: contentType,
      event_label: title || contentId,
      content_id: contentId,
      platform: platform,
      transport_type: "beacon",
    });
  }

  // Custom event for other analytics providers
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("content-view", {
        detail: { contentType, contentId, platform, title },
      })
    );
  }

  // Console log for development
  if (process.env.NODE_ENV === "development") {
    console.log("Content viewed:", { contentType, contentId, platform, title });
  }
}


