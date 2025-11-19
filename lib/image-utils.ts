/**
 * Image utility functions for handling missing images
 */

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const target = e.currentTarget;
  // Hide the broken image
  target.style.display = "none";
  // Set a data attribute to track failed images
  target.setAttribute("data-image-error", "true");
}

export function createPlaceholderImage(width: number, height: number): string {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#0F1115"/>
      <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#9AA0A6" text-anchor="middle" dy=".3em">Image</text>
    </svg>
  `.trim();
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}



