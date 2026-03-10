# 🚀 Complete Setup Guide - Ramadan Kareem Website

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Steps](#installation-steps)
3. [Project Configuration](#project-configuration)
4. [File Organization](#file-organization)
5. [Running the Project](#running-the-project)
6. [Customization Guide](#customization-guide)
7. [Performance Tips](#performance-tips)
8. [Deployment Guide](#deployment-guide)
9. [Troubleshooting](#troubleshooting)

## System Requirements

### Minimum Requirements
- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher (or yarn v3+)
- **OS**: Windows, macOS, or Linux
- **Browser**: Modern browser with WebGL support
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 500MB free space

### Recommended Setup
- Node.js v18+ (LTS)
- npm v9+
- 8GB+ RAM
- SSD storage
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)

## Installation Steps

### Step 1: Create Project Directory

```bash
mkdir ramadan-kareem
cd ramadan-kareem
```

### Step 2: Initialize Vite React Project (if starting fresh)

```bash
npm create vite@latest . -- --template react
```

If Vite is already set up, skip to Step 3.

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Install Required Packages

```bash
# Core dependencies
npm install react-router-dom framer-motion three

# React Three Fiber ecosystem
npm install @react-three/fiber @react-three/drei

# Development dependencies (if not auto-installed)
npm install -D @vitejs/plugin-react vite tailwindcss postcss autoprefixer
```

### Step 5: Initialize Tailwind CSS

```bash
npx tailwindcss init -p
```

This creates `tailwind.config.js` and `postcss.config.js`.

### Step 6: Create Folder Structure

```bash
# Create component folders
mkdir -p src/components
mkdir -p src/scenes
mkdir -p src/pages

# Create necessary files in each folder
```

### Step 7: Copy Component Files

Copy all provided `.jsx` files into their respective folders:
- Components in `/src/components/`
- Scenes in `/src/scenes/`
- Pages in `/src/pages/`
- Root files (`App.jsx`, `main.jsx`) in `/src/`

## Project Configuration

### Configuration Files

#### 1. `vite.config.js`
Already provided. Key settings:
- Port: 5173
- Auto-open browser
- Terser minification
- Optimized dependencies

#### 2. `tailwind.config.js`
Already provided. Includes:
- Extended color palette (slate, yellow, amber)
- Custom animations (float, glow)
- Font families
- Typography scale

#### 3. `postcss.config.js`
Already provided. Processes:
- Tailwind CSS
- Autoprefixer for browser compatibility

#### 4. `package.json`
Already provided. Contains:
- All dependencies
- Scripts: dev, build, preview
- Project metadata

### Configuration Customization

#### Change Port
In `vite.config.js`:
```javascript
server: {
  port: 3000,  // Change from 5173
}
```

#### Change Color Scheme
In `tailwind.config.js`:
```javascript
colors: {
  'primary': '#FACC15',    // Gold
  'dark': '#020617',       // Night
}
```

#### Adjust Animation Speed
In component files:
```javascript
transition={{ duration: 2.0 }}  // Slower
```

## File Organization

### Complete File Structure
```
ramadan-kareem/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                 (Navigation)
│   │   ├── Hero.jsx                   (Landing)
│   │   ├── WhatIsRamadan.jsx          (Info)
│   │   ├── FastingSection.jsx         (Sawm)
│   │   ├── PrayerSection.jsx          (Salah)
│   │   ├── QuranSection.jsx           (Scripture)
│   │   ├── CharitySection.jsx         (Zakat)
│   │   ├── CelebrationSection.jsx     (Eid)
│   │   ├── WaterSimulation.jsx        (3D Water)
│   │   ├── WaterReflection.jsx        (Water Display)
│   │   └── Footer.jsx                 (Footer)
│   │
│   ├── scenes/
│   │   └── MoonAndLanterns.jsx        (3D Scene)
│   │
│   ├── pages/
│   │   ├── Home.jsx                   (Home Page)
│   │   ├── AboutRamadan.jsx           (About)
│   │   ├── Worship.jsx                (Worship)
│   │   └── Celebration.jsx            (Celebration)
│   │
│   ├── App.jsx                        (Root Component)
│   ├── main.jsx                       (Entry Point)
│   └── index.css                      (Global Styles)
│
├── public/
│   └── index.html                     (HTML Template)
│
├── package.json                       (Dependencies)
├── vite.config.js                     (Vite Config)
├── tailwind.config.js                 (Tailwind Config)
├── postcss.config.js                  (PostCSS Config)
├── index.html                         (Root HTML)
│
├── README.md                          (Project Docs)
├── INSTALLATION_GUIDE.md              (Setup Guide)
└── PROJECT_STRUCTURE.md               (Architecture)
```

### File Import Paths

Always use relative paths in components:
```javascript
// ✅ Correct
import Hero from '../components/Hero';
import MoonAndLanterns from '../scenes/MoonAndLanterns';
import Home from '../pages/Home';

// ❌ Avoid
import Hero from 'components/Hero';
```

## Running the Project

### Development Server

```bash
npm run dev
```

Opens automatically at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Creates optimized `dist/` folder (~500KB-1MB)

### Preview Production Build

```bash
npm run preview
```

Tests production build locally before deployment

### Commands Summary
```bash
npm run dev      # Start dev server
npm run build    # Create production build
npm run preview  # Preview production build
npm run lint     # Run ESLint (optional)
```

## Customization Guide

### 1. Change Color Palette

In `tailwind.config.js`:
```javascript
theme: {
  colors: {
    'primary': '#FACC15',      // Gold
    'secondary': '#F8FAFC',    // White
    'dark': '#020617',         // Night
    'accent': '#FF6B35',       // Orange
  }
}
```

Then update components:
```javascript
className="text-primary bg-dark"
```

### 2. Modify Typography

In `tailwind.config.js`:
```javascript
fontSize: {
  'xs': '0.75rem',
  '9xl': '8rem',
  // Add custom sizes
  'giant': '10rem',
}
```

Use in components:
```javascript
className="text-9xl md:text-giant"
```

### 3. Adjust Animation Duration

In components:
```javascript
<motion.div
  transition={{ duration: 1.2 }}  // Change from 0.8
>
  Content
</motion.div>
```

### 4. Change Navbar Links

In `Navbar.jsx`:
```javascript
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'New Page', path: '/new-page' },
  // Add more items
];
```

Then add route in `App.jsx`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```

### 5. Modify Water Shader

In `WaterSimulation.jsx`:
```glsl
// Adjust wave frequency
float wave1 = sin(position.x * 2.0 + time * 0.5) * 0.5;

// Change amplitude
float wave2 = sin(position.y * 0.15 + time * 0.7) * 0.4;
```

### 6. Add Custom Fonts

In `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
```

In `tailwind.config.js`:
```javascript
fontFamily: {
  'display': ['Playfair Display'],
}
```

## Performance Tips

### 1. Optimize 3D Scenes

**Reduce Star Count** (in `MoonAndLanterns.jsx`):
```javascript
// Current: 1000 stars
// Reduce for slower devices:
Array.from({ length: 500 })  // 50% reduction
```

**Adjust Water Subdivisions** (in `WaterSimulation.jsx`):
```javascript
// Current: 256x256
<planeGeometry args={[20, 12, 128, 128]} />  // Reduce to 128x128
```

### 2. Lazy Load Components

```javascript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### 3. Memoize Components

```javascript
import { memo } from 'react';

export default memo(function MyComponent() {
  // Only re-renders if props change
  return <div>Content</div>;
});
```

### 4. Optimize Images

- Use next-gen formats (WebP)
- Compress with TinyPNG/Squoosh
- Use appropriate sizes
- Lazy load with `loading="lazy"`

### 5. Monitor Performance

```javascript
// In browser console
performance.measure('section-render');

// Use Chrome DevTools Lighthouse
// Target: 90+ performance score
```

## Deployment Guide

### Netlify Deployment

1. **Build locally**
```bash
npm run build
```

2. **Connect to Netlify**
- Go to [netlify.com](https://netlify.com)
- Drag & drop `dist/` folder
- Or connect GitHub for auto-deploy

3. **Configuration**
```
Build command: npm run build
Publish directory: dist
```

### Vercel Deployment

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow prompts**

### GitHub Pages Deployment

1. **Update package.json**
```json
{
  "homepage": "https://yourusername.github.io/ramadan-kareem"
}
```

2. **Build and push**
```bash
npm run build
git add dist/
git commit -m "Deploy"
git push origin main
```

### Docker Deployment

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

2. **Build and run**
```bash
docker build -t ramadan-kareem .
docker run -p 3000:3000 ramadan-kareem
```

## Troubleshooting

### Issue: "Cannot find module"

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear npm cache
npm cache clean --force
npm install
```

### Issue: Canvas not rendering

**Check:**
1. Browser WebGL support: `webglreport.com`
2. Console errors (F12)
3. Hardware acceleration enabled
4. Update graphics drivers

**Fix:**
```javascript
// Add fallback in MoonAndLanterns.jsx
if (!THREE.WEBGL.isWebGLAvailable()) {
  console.warn('WebGL not supported');
}
```

### Issue: Animations stuttering

**Causes:**
- High star count
- Heavy computations
- Low device specs
- Excessive re-renders

**Solutions:**
1. Reduce 3D complexity
2. Disable some animations on mobile
3. Add `will-change: transform`
4. Use `transform: translateZ(0)`

### Issue: Build fails

**Steps:**
1. Check Node version: `node --version` (should be 16+)
2. Check npm version: `npm --version` (should be 8+)
3. Clear cache: `npm cache clean --force`
4. Reinstall: `rm -rf node_modules && npm install`

### Issue: Tailwind not working

**Check:**
1. `tailwind.config.js` exists
2. `index.css` has Tailwind imports
3. Content path correct in config
4. Run: `npx tailwindcss -i ./src/index.css -o ./dist/output.css`

### Issue: Routing not working

**Verify:**
1. `React Router` installed: `npm ls react-router-dom`
2. `<BrowserRouter>` wraps `<Routes>` in `App.jsx`
3. Route paths are correct
4. Components exported properly

### Issue: Performance slow

**Optimization checklist:**
- [ ] Reduce 3D geometry complexity
- [ ] Use React DevTools Profiler
- [ ] Check for unnecessary re-renders
- [ ] Lazy load heavy components
- [ ] Optimize images
- [ ] Enable gzip compression
- [ ] Use CDN for static assets

### Issue: Mobile performance

**Mobile-specific fixes:**
1. Reduce star count on mobile
2. Disable parallax on mobile
3. Simplify animations on small screens
4. Use `willChange` sparingly
5. Test on actual device

## Getting Help

1. **Check Documentation**
   - [React Docs](https://react.dev)
   - [Tailwind CSS](https://tailwindcss.com)
   - [Framer Motion](https://www.framer.com/motion)
   - [Three.js](https://threejs.org)

2. **Browser Console**
   - F12 → Console tab
   - Look for error messages
   - Check Network tab for 404s

3. **Common Issues**
   - Module not found → Check import paths
   - Styling not applied → Check Tailwind config
   - 3D not rendering → Check WebGL support

## Next Steps

1. Customize colors and fonts
2. Add your own content
3. Optimize for your target audience
4. Deploy to production
5. Monitor analytics
6. Gather user feedback
7. Iterate and improve

---

**You're all set!** 🚀

Start the dev server with `npm run dev` and begin customizing your Ramadan website.

**Ramadan Mubarak!** 🌙
