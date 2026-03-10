# 🌙 Ramadan Kareem - Awwwards Level Website

A stunning, production-ready Ramadan educational website built with React, React Three Fiber, Framer Motion, and Tailwind CSS. Features immersive 3D scenes, realistic water simulation, and smooth animations.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/react-18.2.0-blue?logo=react)

## ✨ Features

### 🎨 Design Excellence
- **Awwwards-level aesthetic** with cinematic visuals
- **Massive typography** with smooth animations
- **Deep night sky palette** (#020617) with golden accents (#FACC15)
- **Smooth buttery animations** using Framer Motion
- **Arabic geometric patterns** and spiritual design elements

### 🎬 3D Experiences
- **Crescent Moon Scene** - Floating moon with animated lanterns
- **Star Field** - 1000+ animated stars with parallax
- **Ultra Realistic Water** - GLSL shader water with:
  - Sine wave simulation
  - Mouse interaction ripples
  - Fresnel reflection effect
  - Golden light reflections

### 📚 Educational Content
- Comprehensive Ramadan information
- Fasting (Sawm) explanation
- Prayer (Salah) and Taraweeh guide
- Quran recitation insights
- Charity (Zakat) importance
- Eid al-Fitr celebration details

### 📱 Responsive Design
- Mobile-first approach
- Touch-friendly interactions
- Optimized for all screen sizes
- Accessible UI components

### ⚡ Performance
- Lazy loading for 3D scenes
- Optimized geometries
- Efficient animations
- Minimal bundle size
- Smooth 60 FPS animations

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 16.0.0
npm >= 8.0.0
```

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Build for Production
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
ramadan-kareem/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                 # Navigation with smooth scroll
│   │   ├── Hero.jsx                   # Landing hero section
│   │   ├── WhatIsRamadan.jsx           # Educational intro
│   │   ├── FastingSection.jsx          # Fasting explanation
│   │   ├── PrayerSection.jsx           # Prayer guide
│   │   ├── QuranSection.jsx            # Quran insights
│   │   ├── CharitySection.jsx          # Charity explanation
│   │   ├── CelebrationSection.jsx      # Eid celebration
│   │   ├── WaterSimulation.jsx         # Water shader logic
│   │   ├── WaterReflection.jsx         # Water display component
│   │   └── Footer.jsx                  # Footer with links
│   ├── scenes/
│   │   └── MoonAndLanterns.jsx         # 3D moon & lanterns scene
│   ├── pages/
│   │   ├── Home.jsx                    # Landing page
│   │   ├── AboutRamadan.jsx            # About page
│   │   ├── Worship.jsx                 # Worship page
│   │   └── Celebration.jsx             # Celebration page
│   ├── App.jsx                         # Main app with routing
│   ├── main.jsx                        # React entry point
│   └── index.css                       # Global styles
├── package.json                        # Dependencies
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind configuration
├── postcss.config.js                   # PostCSS configuration
└── index.html                          # HTML entry point
```

## 🎨 Design System

### Color Palette
```
Primary (Gold):      #FACC15 - Accents, highlights, calls-to-action
Secondary (White):   #F8FAFC - Light text, moon white
Background (Dark):   #020617 - Main dark background
Slate 900:          #0f172a - Slightly lighter backgrounds
Slate 800:          #1e293b - Cards and containers
```

### Typography
- **Display Font**: Space Grotesk (for headers)
- **Body Font**: Inter (clean, readable)
- **Sizes**: 9xl down to xs (fully responsive)
- **Weights**: Light (300), Normal (400), Bold (700), Black (900)

### Spacing
- Section padding: `py-32` (128px)
- Content max-width: `max-w-6xl`
- Grid gaps: `gap-8` to `gap-12`
- Component padding: `p-6` to `p-10`

## 🎬 Key Components

### Navbar
- Sticky navigation with scroll detection
- Golden accent on hover
- Links to all pages
- Mobile responsive

### Hero Section
- Full-screen landing with animated text
- 3D crescent moon scene
- Parallax mouse movement
- Scroll indicator

### Water Section
- Sticky bottom section with water simulation
- GLSL custom shaders
- Mouse interaction ripples
- Reflection effects

### Educational Sections
- WhatIsRamadan - 4-point key concepts
- FastingSection - Daily rhythm breakdown
- PrayerSection - 5 prayers + Taraweeh
- QuranSection - Scripture facts
- CharitySection - Giving guidance
- CelebrationSection - Eid traditions

## 🎯 3D Scenes

### MoonAndLanterns.jsx
Creates immersive space scene with:
- Crescent moon geometry
- 5 floating lanterns with glow
- 1000+ animated stars
- Ambient and point lighting
- Background nebula glow
- Parallax rotation

### WaterSimulation.jsx
Advanced water shader with:
```glsl
// Vertex Shader
float wave1 = sin(position.x * 0.5 + time * 0.5) * 0.3;
float wave2 = sin(position.y * 0.3 + time * 0.7) * 0.25;
float wave3 = sin((position.x + position.y) * 0.4 + time * 0.6) * 0.2;

// Fragment Shader
float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.0);
vec3 finalColor = waterColor + goldenReflection;
```

## 🎞️ Animation Patterns

### Text Reveal
```javascript
variants={{
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}}
```

### Staggered Children
```javascript
containerVariants={{
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
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

## 📱 Navigation

- **Home** (`/`) - Complete landing page
- **About Ramadan** (`/about`) - Historical info, Islamic calendar, Five Pillars
- **Worship** (`/worship`) - Fasting, prayer, Quran details
- **Celebration** (`/celebration`) - Iftar, Eid, community

## 🎯 Performance Optimizations

- ✅ React.Suspense for lazy loading
- ✅ useRef for 3D object caching
- ✅ Optimized Three.js geometries
- ✅ Efficient animation with transform-gpu
- ✅ CSS will-change for performance
- ✅ Memoized components where needed

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ 90+ |
| Firefox | ✅ 88+ |
| Safari | ✅ 14+ |
| Edge | ✅ 90+ |
| Mobile | ✅ iOS 14+, Android 90+ |

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Color contrast WCAG AA compliant
- Keyboard navigation support
- `prefers-reduced-motion` respected
- Focus indicators visible

## 📊 Lighthouse Scores (Target)

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'gold': '#FACC15',
  'night': '#020617',
}
```

### Adjust Animations
Modify animation timings in Framer Motion props:
```javascript
transition={{ duration: 1.2, delay: 0.3 }}
```

### Customize Water
Edit wave parameters in `WaterSimulation.jsx`:
```javascript
float wave1 = sin(position.x * 0.5 + time * 0.5) * amplitude;
```

### Change Typography
Update font sizes in `tailwind.config.js` or inline:
```javascript
className="text-7xl md:text-8xl font-black"
```

## 📦 Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| react | UI library | 18.2.0+ |
| react-dom | React DOM | 18.2.0+ |
| react-router-dom | Routing | 6.20.0+ |
| framer-motion | Animations | 10.16.0+ |
| three | 3D graphics | r128+ |
| @react-three/fiber | React 3D | 8.15.0+ |
| @react-three/drei | 3D helpers | 9.88.0+ |
| tailwindcss | CSS utility | 3.4.0+ |

## 🚀 Deployment

### Netlify
```bash
npm run build
# Drop dist/ folder on Netlify
```

### Vercel
```bash
npm run build
vercel
```

### GitHub Pages
```bash
npm run build
# Push dist to gh-pages branch
```

## 📝 License

MIT License - feel free to use for personal and commercial projects.

## 🙏 Credits

Built with passion for the Muslim community and Ramadan celebration.

### Technologies
- [React](https://react.dev) - UI Framework
- [Three.js](https://threejs.org) - 3D Graphics
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React Renderer
- [Framer Motion](https://www.framer.com/motion) - Animations
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Vite](https://vitejs.dev) - Build Tool

## 🎯 Future Enhancements

- [ ] Multi-language support (Arabic/English)
- [ ] Prayer time calculator
- [ ] Hijri calendar integration
- [ ] Quran search functionality
- [ ] Community forum
- [ ] Mobile app version
- [ ] PWA capabilities
- [ ] Analytics integration
- [ ] Email newsletter

## 🐛 Troubleshooting

### Canvas not rendering?
- Check WebGL support in browser
- Clear browser cache
- Verify Three.js installation

### Animations stuttering?
- Reduce star count in `MoonAndLanterns.jsx`
- Lower water plane subdivisions
- Disable some background effects

### Styling issues?
- Clear `node_modules` and reinstall
- Rebuild Tailwind CSS
- Check PostCSS configuration

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review component documentation
3. Check browser console for errors
4. Verify all dependencies are installed

---

**Ramadan Mubarak!** 🌙

May this website serve as a bridge of understanding and appreciation for the beautiful month of Ramadan and the Islamic faith.

*Built with ❤️ for the spiritual community*
