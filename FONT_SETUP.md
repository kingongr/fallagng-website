# Majesty Font Setup Instructions

## ✅ Changes Made:
1. Updated all "Fallagng" text to "FALLAGNG" (all caps)
2. Configured Majesty font from Canva
3. Updated font display settings

## 📥 To Complete the Font Setup:

### Step 1: Download Majesty Font from Canva
1. Go to Canva and download the Majesty font
2. You'll need these files:
   - `Majesty-Regular.woff2` (or `.woff` / `.ttf`)
   - `Majesty-Bold.woff2` (if available, or use Regular for both)

### Step 2: Place Font Files
Copy the font files to:
```
/Users/ralphngong/Documents/Fallagng.website/public/fonts/
```

### Step 3: Update Font Paths (if needed)
If your font files have different names, edit `app/layout.tsx` lines 14 and 19:
- Change `Majesty-Regular.woff2` to your actual filename
- Change `Majesty-Bold.woff2` to your actual filename

### Step 4: Restart Dev Server
```bash
npm run dev
```

## 🎨 Font Usage:
The Majesty font is now set as the `display` font and will be used for:
- Headings (h1, h2, h3, etc.)
- Logo text
- Any element with `font-display` class

## 📝 Note:
If font files are not found, the site will fallback to serif fonts. The site will still work, but you'll need to add the font files to see Majesty font.




