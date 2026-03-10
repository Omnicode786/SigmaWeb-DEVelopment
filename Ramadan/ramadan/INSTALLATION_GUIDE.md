# Ramadan Kareem - Awwwards Level Website

## Installation & Setup Guide

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Vite already initialized

### Step 1: Install Dependencies

```bash
npm install
```

#### Required Packages:
```bash
npm install react-router-dom framer-motion three @react-three/fiber @react-three/drei
```

#### Additional Packages (if not already installed):
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 2: Project Structure

Create the following folder structure in `/src`:

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── WhatIsRamadan.jsx
│   ├── FastingSection.jsx
│   ├── PrayerSection.jsx
│   ├── QuranSection.jsx
│   ├── CharitySection.jsx
│   ├── CelebrationSection.jsx
│   ├── WaterSimulation.jsx
│   ├── WaterReflection.jsx
│   └── Footer.jsx
├── scenes/
│   └── MoonAndLanterns.jsx
├── pages/
│   ├── Home.jsx
│   ├── AboutRamadan.jsx
│   ├── Worship.jsx
│   └── Celebration.jsx
├── App.jsx
├── main.jsx
└── index.css
```

### Step 3: Tailwind CSS Configuration

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#020617",
          900: "#0f172a",
          800: "#1e293b",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### Step 4: Update main.jsx

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Step 5: Create index.css

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #020617;
  color: #f8fafc;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #0f172a;
}

::-webkit-scrollbar-thumb {
  background: #FACC15;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #eab308;
}

/* Smooth transitions */
body {
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
}
```

### Step 6: Run Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:5173`

## File Content Instructions

Place each component file in the appropriate folder as specified in the project structure. All components are provided with complete implementations including:

- Framer Motion animations
- React Three Fiber 3D scenes
- GLSL shader water simulation
- Tailwind CSS styling
- Responsive design
- Accessibility features

## Key Features

✨ **3D Scenes**
- Crescent moon with floating lanterns
- Star field with parallax
- Realistic water simulation with mouse interaction

🎨 **Design**
- Awwwards-level aesthetic
- Massive typography with animations
- Deep night sky color palette (#020617)
- Golden accents (#FACC15)
- Smooth buttery animations

📱 **Responsive**
- Mobile-first design
- Optimized for all screen sizes
- Touch-friendly interactions

⚡ **Performance**
- Lazy loading for 3D components
- Optimized geometries
- Efficient animations
- Minimal bundle size

## Customization

### Colors
All colors use Tailwind classes. Modify palette in `tailwind.config.js`:
- Primary: `#FACC15` (gold/yellow)
- Secondary: `#F8FAFC` (light/moon white)
- Background: `#020617` (deep night blue)

### Typography
Text uses consistent sizing with Framer Motion animations. Modify in individual components.

### 3D Elements
- Adjust light colors in `MoonAndLanterns.jsx`
- Modify wave parameters in `WaterSimulation.jsx`
- Change particle counts for performance

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance Tips

1. Use React DevTools Profiler to identify bottlenecks
2. Adjust star count in `MoonAndLanterns.jsx` if performance is low
3. Reduce water plane subdivisions if needed
4. Use `Suspense` boundaries for 3D loading

## Troubleshooting

**Canvas not rendering:**
- Check browser WebGL support
- Clear browser cache
- Verify Three.js is properly installed

**Animations stuttering:**
- Reduce particle count
- Disable some background animations on mobile
- Check for console errors

**Styling issues:**
- Ensure Tailwind CSS is properly configured
- Clear `node_modules` and reinstall if needed
- Check PostCSS configuration

## Deployment

Build for production:
```bash
npm run build
```

Deploy the `dist` folder to your hosting provider.

## License

This website template is provided as-is for educational and religious purposes.

---

**Ramadan Mubarak!** 🌙
