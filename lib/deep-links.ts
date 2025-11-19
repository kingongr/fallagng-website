/**
 * Deep link utilities for mobile app redirects
 */

export function getDeepLink(url: string, platform: string): string {
  if (typeof window === "undefined") {
    return url;
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

  if (!isMobile) {
    return url;
  }

  // Extract IDs/identifiers from URLs for deep linking
  switch (platform) {
    case "spotify":
      // Spotify deep link format: spotify:artist:ID
      const spotifyMatch = url.match(/artist\/([a-zA-Z0-9]+)/);
      if (spotifyMatch) {
        return `spotify:artist:${spotifyMatch[1]}`;
      }
      break;

    case "apple":
      // Apple Music deep link format: music://artist/ID
      const appleMatch = url.match(/artist\/(\d+)/);
      if (appleMatch) {
        return `music://artist/${appleMatch[1]}`;
      }
      break;

    case "youtube":
      // YouTube deep link format: youtube://channel/ID or youtube://user/USERNAME
      const youtubeMatch = url.match(/@([a-zA-Z0-9_-]+)|channel\/([a-zA-Z0-9_-]+)|user\/([a-zA-Z0-9_-]+)/);
      if (youtubeMatch) {
        const id = youtubeMatch[1] || youtubeMatch[2] || youtubeMatch[3];
        if (youtubeMatch[1]) {
          return `youtube://channel/${id}`;
        }
        return `youtube://channel/${id}`;
      }
      break;

    case "soundcloud":
      // SoundCloud deep link format: soundcloud://users/USERNAME
      const soundcloudMatch = url.match(/soundcloud\.com\/([a-zA-Z0-9_-]+)/);
      if (soundcloudMatch) {
        return `soundcloud://users/${soundcloudMatch[1]}`;
      }
      break;

    case "bandcamp":
      // Bandcamp doesn't have a standard deep link format
      // Return web URL
      break;
  }

  return url;
}

export function handleDeepLink(url: string, platform: string, fallbackUrl: string): void {
  const deepLink = getDeepLink(url, platform);
  
  if (deepLink !== url && typeof window !== "undefined") {
    // Try deep link first
    window.location.href = deepLink;
    
    // Fallback to web URL after a short delay if deep link fails
    setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 500);
  } else {
    window.location.href = fallbackUrl;
  }
}

