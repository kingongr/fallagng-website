# Fallagng Website

A modern music band website built with Next.js App Router, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** with custom design system
- **Framer Motion** for animations
- **Lenis** for smooth scrolling
- **Lucide React** for icons
- **next/font** for optimized typography

## Design System

### Colors
- Background: `#0A0B0D` (near-black)
- Surface: `#0F1115`
- Glass: `rgba(255,255,255,0.06)`
- Stroke: `rgba(255,255,255,0.12)`
- Text: `#E7E8EA`
- Muted: `#9AA0A6`
- Electric: `#65F3FF`
- Gold: `#C7A86F`

### Typography
- **Headings**: Space Grotesk (via `font-display`)
- **Body**: Inter (via `font-sans`)

### Glassmorphism Utilities
- `.glass` - Full glass effect with 18px blur
- `.glass-thin` - Subtle glass effect with 10px blur

## Project Structure

```
├── app/              # Next.js App Router routes
│   ├── layout.tsx   # Root layout with fonts and nav
│   ├── page.tsx     # Home page
│   ├── collective/  # Collective page
│   ├── videos/      # Videos page
│   └── listen/      # Listen page
├── components/       # React components
│   ├── nav.tsx      # Navigation component
│   └── smooth-scroll.tsx # Lenis wrapper
├── content/         # JSON data files
│   ├── members.json
│   ├── videos.json
│   └── links.json
├── lib/             # Utilities
│   ├── motion.ts    # Framer Motion presets
│   ├── metadata.ts  # SEO metadata
│   └── utils.ts     # Helper functions
└── public/          # Static assets
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Motion Presets

Available in `lib/motion.ts`:
- `fadeUp` - Fade in with upward motion
- `fadeIn` - Simple fade in
- `scaleIn` - Scale and fade in
- `staggerChildren` - Stagger child animations
- `revealMask` - Shopify-style clip-path reveal

## Content Management

### Adding/Editing Members

Edit `content/members.json` to add or update band members:

```json
{
  "name": "Member Name",
  "role": "Vocalist",
  "shortBio": "Brief bio description",
  "headshot": "/images/members/member-name.jpg",
  "socials": {
    "spotify": "artist/username",
    "youtube": "@username",
    "instagram": "@username",
    "twitter": "@username"
  }
}
```

**Steps:**
1. Add member object to the array in `content/members.json`
2. Add headshot image to `public/images/members/` (16:20 aspect ratio, ~800x1000px)
3. Update the `headshot` path to match your image filename
4. Add social media handles/IDs (all fields are optional)

**Role Filtering:** The role field is used for filtering on the `/collective` page. Use consistent role names (e.g., "Vocalist", "Producer", "Guitarist") for proper filtering.

### Adding/Editing Videos

Edit `content/videos.json` to add or update videos:

```json
{
  "title": "Video Title",
  "platform": "youtube",
  "id": "VIDEO_ID",
  "thumbnail": "/images/videos/video-title.jpg",
  "date": "2024-01-15"
}
```

**Steps:**
1. Add video object to the array in `content/videos.json`
2. Add thumbnail image to `public/images/videos/` (16:9 aspect ratio, ~1280x720px)
3. Update the `thumbnail` path to match your image filename
4. Set `platform` to either `"youtube"` or `"vimeo"`
5. Extract the video ID from the platform URL:
   - YouTube: `https://youtube.com/watch?v=VIDEO_ID` → use `VIDEO_ID`
   - Vimeo: `https://vimeo.com/VIDEO_ID` → use `VIDEO_ID`
6. Use ISO date format (YYYY-MM-DD) for the `date` field

### Adding/Editing Platform Links

Edit `content/links.json` to update streaming platform links:

```json
{
  "label": "Spotify",
  "platform": "spotify",
  "url": "https://open.spotify.com/artist/YOUR_ARTIST_ID",
  "note": "Stream our latest releases"
}
```

**Steps:**
1. Update the `url` field with your actual platform URLs
2. Keep `platform` values as: `spotify`, `apple`, `youtube`, `soundcloud`, or `bandcamp`
3. Customize the `note` field to describe what users will find on each platform
4. The `label` will be displayed on the `/listen` page

**Deep Linking:** Mobile users will automatically be redirected to app deep links when available. The system handles:
- Spotify: `spotify:artist:ID`
- Apple Music: `music://artist/ID`
- YouTube: `youtube://channel/ID`
- SoundCloud: `soundcloud://users/USERNAME`

### Images

**Required Images:**
- `public/hero.jpg` - Landing page hero background (1920x1080px or larger)
- `public/images/members/*.jpg` - Member headshots (16:20 aspect ratio, ~800x1000px)
- `public/images/videos/*.jpg` - Video thumbnails (16:9 aspect ratio, ~1280x720px)

**Image Guidelines:**
- Use JPG or WebP format for best performance
- Optimize images before uploading (use tools like ImageOptim or Squoosh)
- Name files consistently (lowercase with hyphens: `member-name.jpg`)
- Ensure file paths in JSON match actual filenames exactly (case-sensitive)

**Fallback Behavior:** If an image is missing, the website will gracefully display gradient backgrounds. However, adding all images is recommended for the best user experience.

### Quick Reference

| Content Type | File Location | Image Directory | Aspect Ratio |
|-------------|---------------|-----------------|--------------|
| Members | `content/members.json` | `public/images/members/` | 16:20 (portrait) |
| Videos | `content/videos.json` | `public/images/videos/` | 16:9 (landscape) |
| Links | `content/links.json` | N/A | N/A |
| Hero | N/A | `public/hero.jpg` | 16:9 (landscape) |

## Build

```bash
npm run build
npm start
```

## Features

- ✅ Dark theme with glassmorphism
- ✅ Smooth scrolling with Lenis
- ✅ Sticky navigation with scroll progress
- ✅ Motion presets for animations
- ✅ Responsive design
- ✅ Accessibility (prefers-reduced-motion support)
- ✅ SEO optimized (next-seo, sitemap)

