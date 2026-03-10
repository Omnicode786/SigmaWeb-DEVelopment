# Ramadan Kareem - Complete Project Structure

## Overview

A production-level Awwwards-style website celebrating Ramadan with:
- Immersive 3D scenes using React Three Fiber
- Realistic GLSL water simulation
- Smooth Framer Motion animations
- Modern Tailwind CSS design
- Educational content about Ramadan

## Component Architecture

### Core Components (`/components`)

#### **Navbar.jsx**
- Sticky navigation with smooth scroll transitions
- Links to all pages (Home, About, Worship, Celebration)
- Gold accent highlighting on hover
- Responsive mobile menu support

#### **Hero.jsx**
- Full-screen hero section with animated typography
- 3D crescent moon and floating lanterns (Canvas)
- Staggered text reveal animations
- Scroll indicator at bottom
- Parallax mouse movement

#### **WhatIsRamadan.jsx**
- Educational content about Ramadan
- 4-grid layout with key concepts
- Golden accent colors
- Hover animations on cards
- Historical context section

#### **FastingSection.jsx**
- Detailed explanation of fasting (Sawm)
- 3D sun visualization (sunrise to sunset)
- Daily rhythm breakdown
- Benefits list with animated reveals
- Beautiful gradient backgrounds

#### **PrayerSection.jsx**
- Five daily prayers overview
- Taraweeh prayer explanation
- 5-column grid for prayer times
- Spiritual aspects cards
- Purple/blue color scheme

#### **QuranSection.jsx**
- Quranic facts and statistics
- 114 chapters, 6,236 verses explained
- Themes in the Quran grid
- Role during Ramadan
- Emerald/teal gradient design

#### **CharitySection.jsx**
- Zakat and charitable giving overview
- Forms of charity explained
- Impact of Ramadan charity
- 8 ways to practice charity with list
- Rose/pink color palette

#### **CelebrationSection.jsx**
- Eid al-Fitr traditions
- 6 key traditions with icons
- Global celebration context
- Spiritual meaning cards
- Amber/yellow theme

#### **WaterReflection.jsx**
- Sticky section with ultra-realistic water
- 3D water simulation with mouse interaction
- Reflective pool aesthetic
- Sacred atmosphere
- Parallax floating elements

#### **WaterSimulation.jsx**
- Custom GLSL vertex and fragment shaders
- Wave height calculation with sine functions
- Fresnel reflection effect
- Mouse-based ripple interaction
- Real-time animation

#### **Footer.jsx**
- Comprehensive footer with multiple sections
- Quick navigation links
- Social media icons
- Copyright and legal links
- Closing spiritual message

### Page Components (`/pages`)

#### **Home.jsx**
- Landing page combining all sections
- Hero → WhatIsRamadan → Fasting → Prayer → Quran → Charity → Celebration → Water
- Complete educational journey
- Optimized scroll experience

#### **AboutRamadan.jsx**
- In-depth Ramadan information
- Historical origins and Islamic calendar
- Five Pillars of Islam explanation
- 1400+ years of tradition
- Global significance message

#### **Worship.jsx**
- Spiritual practice focus page
- Introduction to worship in Ramadan
- Core practices grid (6 practices)
- Three phases of Ramadan spiritual journey
- Includes FastingSection, PrayerSection, QuranSection components

#### **Celebration.jsx**
- Joy and community focus
- Iftar tradition explanation
- Ramadan & Eid foods overview
- Evening atmosphere description
- Includes CelebrationSection, CharitySection components

### 3D Scene Components (`/scenes`)

#### **MoonAndLanterns.jsx**
- PerspectiveCamera setup
- Ambient and point lights
- Star field (1000+ stars)
- Crescent moon glow
- 5 animated lanterns with glow
- Background nebula effect
- Gentle rotation and parallax

## Styling System

### Color Palette
```
Primary:      #FACC15 (Gold/Yellow) - Accent and highlights
Secondary:   #F8FAFC (Soft white) - Light text
Background:  #020617 (Deep night blue) - Main background
Slate 900:   #0f172a (Slightly lighter)
Slate 800:   #1e293b (Cards and containers)
```

### Typography Hierarchy
- H1: 8xl-9xl, bold, tracked-tight
- H2: 5xl-6xl, bold, tracked-tight
- H3: 3xl-4xl, bold
- H4: xl-2xl, bold
- P: lg, font-light, leading-relaxed

### Spacing
- Sections: py-32 (128px top/bottom padding)
- Content max-width: max-w-6xl
- Grid gaps: gap-8 to gap-12
- Component padding: p-6 to p-10

## Animation Patterns

### Text Reveals
```javascript
variants={{
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}}
transition={{ duration: 0.8 }}
```

### Staggered Children
```javascript
containerVariants={{
  visible: {
    transition: { staggerChildren: 0.15 }
  }
}}
```

### Hover Effects
```javascript
whileHover={{ scale: 1.05, y: -5 }}
whileTap={{ scale: 0.95 }}
```

### Scroll Animations
```javascript
initial="hidden"
whileInView="visible"
viewport={{ once: true }}
```

## 3D Implementation

### React Three Fiber Setup
- Canvas with Suspense fallback
- Optimized geometries
- Lazy loading for heavy scenes
- Mouse interaction handlers

### Water Shader Details
**Vertex Shader:**
- Wave height calculation: `sin(x * freq + time) * amplitude`
- Multiple wave layers combined
- Normal vector calculation for lighting
- Position transformation

**Fragment Shader:**
- Fresnel effect for reflection
- Height-based color variation
- Golden reflection mixing
- Transparency based on fresnel

### Performance Optimizations
- Drei helpers for common geometries
- Frustum culling enabled
- Efficient buffer geometries
- Minimal re-renders with useRef

## Responsive Design

### Breakpoints
- Mobile: Default (< 640px)
- Tablet: `md:` (≥ 768px)
- Desktop: `lg:` (≥ 1024px)
- Large: `2xl:` (≥ 1536px)

### Mobile Optimizations
- Stack grids to single column on mobile
- Reduced font sizes on smaller screens
- Adjusted padding and gaps
- Touch-friendly interaction areas

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Color contrast meets WCAG AA
- Keyboard navigation support
- Reduced motion options respect `prefers-reduced-motion`

## Performance Metrics

- First paint: < 2s
- Interactive: < 3.5s
- LCP: < 2.5s
- CLS: < 0.1

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

## Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18+ | UI framework |
| react-router-dom | 6+ | Client-side routing |
| framer-motion | 10+ | Advanced animations |
| three | latest | 3D graphics |
| @react-three/fiber | latest | React renderer for Three.js |
| @react-three/drei | latest | Useful helpers for React Three |
| tailwindcss | 3+ | Utility CSS |

## Key Features Summary

✅ Awwwards-level design aesthetic
✅ Realistic 3D water simulation with GLSL shaders
✅ Interactive mouse parallax and ripple effects
✅ Smooth, buttery animations throughout
✅ Educational content about Ramadan
✅ Fully responsive mobile design
✅ Modular component architecture
✅ Performance optimized
✅ Accessibility compliant
✅ Modern development practices

## Future Enhancement Ideas

- Add language switcher (Arabic/English)
- Prayer time calculator based on location
- Hijri calendar widget
- Islamic event calendar
- Quran search functionality
- Community forum section
- Mobile app version
- PWA capabilities
- Analytics integration
- Email newsletter signup

---

Built with passion for the spiritual community. Ramadan Mubarak! 🌙
