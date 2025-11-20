# Setting Up the Hero Image

## Steps to Add Your Album Cover Image

1. **Save your album cover image** to the `/public/` directory
2. **Name it `hero.jpg`** (or update the path in `components/hero.tsx` if you use a different name)
3. **Recommended specifications:**
   - Format: JPG or WebP
   - Dimensions: 1920x1080px or larger (16:9 aspect ratio works best)
   - File size: Optimize to under 500KB for best performance

## Current Setup

The hero component is configured to use `/public/hero.jpg` as the background image.

If your image has a different name, update line 39 in `components/hero.tsx`:
```tsx
src="/your-image-name.jpg"
```

## Image Optimization Tips

- Use tools like ImageOptim, Squoosh, or TinyPNG to compress the image
- The image will be automatically optimized by Next.js Image component
- The overlay gradient has been adjusted to work with dark, smoky images





