// COMPLETE COMPONENTS FOLDER STRUCTURE
// Copy all these files to: src/components/

// ============================================
// FILE: src/components/Navbar.jsx
// ============================================
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar({ scrollY }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Worship', path: '/worship' },
    { label: 'Celebration', path: '/celebration' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-yellow-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent"
          >
            ☪ Ramadan
          </motion.div>
        </Link>

        <div className="flex gap-8 items-center">
          {navItems.map((item, i) => (
            <Link key={i} to={item.path}>
              <motion.div
                whileHover={{ color: '#FACC15' }}
                className="text-sm uppercase tracking-widest text-slate-300 transition-colors"
              >
                {item.label}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

// ============================================
// FILE: src/components/Hero.jsx
// ============================================
import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import MoonAndLanterns from '../scenes/MoonAndLanterns';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 1.2,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <MoonAndLanterns mousePos={mousePosition} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="text-6xl"
            >
              ☪
            </motion.div>
          </div>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-8xl md:text-9xl font-black tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
              RAMADAN
            </span>
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-light tracking-wider mb-8 text-slate-300"
          >
            KAREEM
          </motion.h2>
        </div>

        <motion.p
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
        >
          A month of mercy, reflection, and spiritual renewal. Welcome to the holiest month in the Islamic calendar.
        </motion.p>

        <motion.div
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#FACC15', color: '#020617' }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border-2 border-yellow-400 text-yellow-400 text-sm uppercase tracking-widest transition-all duration-300"
          >
            Explore
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="text-yellow-400 opacity-70">⬇</div>
      </motion.div>
    </section>
  );
}

// ============================================
// FILE: src/components/WhatIsRamadan.jsx
// ============================================
import { motion } from 'framer-motion';

export default function WhatIsRamadan() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <h2 className="text-7xl md:text-8xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
              WHAT IS
            </span>
            <br />
            <span className="text-slate-300">RAMADAN?</span>
          </h2>
          <p className="text-xl text-slate-400 font-light max-w-3xl leading-relaxed">
            Ramadan is the ninth month of the Islamic lunar calendar and is considered the holiest month in Islam. It commemorates the revelation of the Quran to the Prophet Muhammad.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"
        >
          {[
            {
              title: 'Spiritual Reflection',
              description:
                'Muslims worldwide engage in deep spiritual introspection, seeking closeness to the Divine through prayer, meditation, and Quran recitation.',
              icon: '🌙',
            },
            {
              title: 'Community & Unity',
              description:
                'The month brings families and communities together through shared meals, prayers, and celebration of faith across cultures.',
              icon: '👥',
            },
            {
              title: 'Self-Discipline',
              description:
                'Through fasting and mindful living, believers strengthen their character and develop greater control over their desires.',
              icon: '⚡',
            },
            {
              title: 'Charity & Compassion',
              description:
                'Ramadan emphasizes generosity and caring for those in need, fostering empathy and social responsibility.',
              icon: '❤️',
            },
          ].map((point, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-yellow-400/20 rounded-lg p-8 backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{point.icon}</div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-3">{point.title}</h3>
              <p className="text-slate-300 font-light leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-yellow-400/30 rounded-xl p-12 backdrop-blur-sm"
        >
          <h3 className="text-4xl font-bold mb-6 text-yellow-300">Historical Significance</h3>
          <p className="text-lg text-slate-300 font-light leading-relaxed mb-4">
            The revelation of the Quran is believed to have occurred on the Night of Power (Laylat al-Qadr), which falls within the last ten days of Ramadan. This makes Ramadan the most blessed month in the Islamic calendar.
          </p>
          <p className="text-lg text-slate-300 font-light leading-relaxed">
            For nearly 1,400 years, Muslims have observed this sacred month, making it one of the most important periods in Islamic tradition and a time of profound spiritual transformation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FILE: src/components/FastingSection.jsx
// ============================================
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';

function FastingVisualization() {
  return (
    <group>
      <ambientLight intensity={0.6} color="#FACC15" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FACC15" />
      
      <mesh position={[-8, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#FF6B35"
          emissive="#FF6B35"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh position={[8, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#FF8C00"
          emissive="#FF8C00"
          emissiveIntensity={0.6}
        />
      </mesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={
              new Float32Array(
                Array.from({ length: 50 }, (_, i) => {
                  const t = i / 49;
                  const x = -8 + t * 16;
                  const y = Math.sin(t * Math.PI) * 5;
                  return [x, y, 0];
                }).flat()
              )
            }
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#FACC15" linewidth={2} />
      </lineSegments>
    </group>
  );
}

export default function FastingSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-32 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <h2 className="text-7xl md:text-8xl font-black tracking-tight mb-6">
            <span className="text-slate-100">THE</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              FAST
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-64 mb-20 rounded-xl overflow-hidden border border-yellow-400/30"
        >
          <Canvas>
            <Suspense fallback={null}>
              <FastingVisualization />
            </Suspense>
          </Canvas>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-4xl font-bold mb-6 text-yellow-400">What is Fasting?</h3>
            <p className="text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
              Fasting during Ramadan (called "Sawm" in Arabic) means abstaining from food, drink, and other physical needs from dawn (Fajr) to sunset (Maghrib). This daily practice is one of the Five Pillars of Islam and is a profound act of worship and spiritual devotion.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-yellow-300">The Daily Rhythm</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  time: 'Before Dawn (Suhoor)',
                  desc: 'Pre-fast meal consumed before sunrise to gain strength for the day',
                  icon: '🌙',
                },
                {
                  time: 'Dawn to Sunset',
                  desc: 'Complete fast observed. Many spend time in Quran recitation and prayer',
                  icon: '☀️',
                },
                {
                  time: 'Evening (Iftar)',
                  desc: 'Beautiful tradition of breaking the fast with family and community',
                  icon: '🍯',
                },
                {
                  time: 'Night Prayers (Taraweeh)',
                  desc: 'Special prayers performed after sunset, seeking spiritual elevation',
                  icon: '🕌',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-slate-800/40 border border-yellow-400/30 rounded-lg p-6 backdrop-blur-sm hover:border-yellow-400/60 transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4 className="text-xl font-bold text-yellow-300 mb-2">{item.time}</h4>
                  <p className="text-slate-300 font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-8 text-yellow-300">Spiritual & Physical Benefits</h3>
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-yellow-400/30 rounded-lg p-8">
              <ul className="space-y-4">
                {[
                  'Develops self-discipline and willpower',
                  'Increases empathy for those facing hunger and hardship',
                  'Strengthens focus on spiritual growth',
                  'Encourages mindful eating and gratitude',
                  'Promotes community bonds through shared experience',
                  'Offers physical health benefits like cellular regeneration',
                ].map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 text-slate-300 font-light"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></span>
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FILE: src/components/PrayerSection.jsx
// ============================================
import { motion } from 'framer-motion';

export default function PrayerSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-32 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-40 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <h2 className="text-7xl md:text-8xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              PRAYER
            </span>
            <br />
            <span className="text-slate-300">THE CONNECTION</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-16 max-w-3xl">
            <p className="text-xl text-slate-300 font-light leading-relaxed">
              Prayer is the cornerstone of Ramadan spirituality. During this sacred month, Muslims engage in heightened devotion through five daily prayers and additional night prayers called Taraweeh, creating a profound spiritual connection.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-4xl font-bold mb-10 text-blue-300">The Five Daily Prayers</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { name: 'Fajr', time: 'Dawn', desc: 'Before sunrise' },
                { name: 'Dhuhr', time: 'Midday', desc: 'Around noon' },
                { name: 'Asr', time: 'Afternoon', desc: 'Late afternoon' },
                { name: 'Maghrib', time: 'Sunset', desc: 'At sunset' },
                { name: 'Isha', time: 'Night', desc: 'After dark' },
              ].map((prayer, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/30 rounded-lg p-6 text-center backdrop-blur-sm hover:border-blue-400/60 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-blue-300 mb-2">{prayer.name}</div>
                  <div className="text-sm text-blue-200 font-semibold mb-1">{prayer.time}</div>
                  <div className="text-xs text-slate-400">{prayer.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-400/40 rounded-xl p-10 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-blue-300 mb-4">Taraweeh - Night Prayers</h3>
              <p className="text-lg text-slate-300 font-light leading-relaxed mb-4">
                Taraweeh is a special prayer performed in the evenings during Ramadan, typically after the Isha prayer. These prayers are often performed in congregation at mosques, creating a beautiful communal spiritual experience.
              </p>
              <p className="text-lg text-slate-300 font-light leading-relaxed">
                During Taraweeh, the entire Quran is recited over the month, allowing believers to reconnect with the holy scripture in its entirety. This tradition has been observed for over 1,400 years.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-8 text-blue-300">The Essence of Prayer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Mindfulness',
                  description:
                    'Prayer brings full awareness to the present moment, creating a space of meditation and peace.',
                  icon: '🧘',
                },
                {
                  title: 'Gratitude',
                  description:
                    'Expressing thanks for blessings and acknowledging dependence on the Divine.',
                  icon: '🙏',
                },
                {
                  title: 'Humility',
                  description:
                    'Standing before the Creator fosters humility and recognition of our place in the universe.',
                  icon: '✨',
                },
                {
                  title: 'Community',
                  description:
                    'Congregational prayer strengthens bonds among believers worldwide united in faith.',
                  icon: '👫',
                },
              ].map((aspect, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-slate-800/40 border border-blue-400/30 rounded-lg p-8 backdrop-blur-sm"
                >
                  <div className="text-4xl mb-4">{aspect.icon}</div>
                  <h4 className="text-xl font-bold text-blue-300 mb-3">{aspect.title}</h4>
                  <p className="text-slate-300 font-light leading-relaxed">{aspect.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FILE: src/components/QuranSection.jsx
// ============================================
import { motion } from 'framer-motion';

export default function QuranSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-32 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <h2 className="text-7xl md:text-8xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              THE QURAN
            </span>
            <br />
            <span className="text-slate-300">DIVINE REVELATION</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-16 max-w-3xl">
            <p className="text-xl text-slate-300 font-light leading-relaxed">
              The Quran is the central text of Islam, believed by Muslims to be the word of God revealed to Prophet Muhammad over 23 years. During Ramadan, the recitation and study of the Quran becomes the primary focus of spiritual practice.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-4xl font-bold mb-10 text-emerald-300">Holy Scripture Facts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  stat: '114',
                  label: 'Chapters (Surahs)',
                  desc: 'The Quran is divided into chapters of varying lengths',
                },
                {
                  stat: '6,236',
                  label: 'Verses (Ayahs)',
                  desc: 'Each verse contains profound wisdom and guidance',
                },
                {
                  stat: '30',
                  label: 'Parts (Juz)',
                  desc: 'Divided equally to be recited over 30 days',
                },
                {
                  stat: '1,400+',
                  label: 'Years of Tradition',
                  desc: 'Preserved and transmitted with meticulous care',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-emerald-400/30 rounded-lg p-8 backdrop-blur-sm"
                >
                  <div className="text-5xl font-black text-emerald-400 mb-2">{item.stat}</div>
                  <h4 className="text-lg font-bold text-emerald-300 mb-2">{item.label}</h4>
                  <p className="text-slate-400 font-light text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-400/40 rounded-xl p-10 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-emerald-300 mb-4">Quran in Ramadan</h3>
              <p className="text-lg text-slate-300 font-light leading-relaxed mb-6">
                Ramadan marks the month in which the Quran was first revealed to Prophet Muhammad. This is commemorated on the Night of Power (Laylat al-Qadr), considered the holiest night of the year.
              </p>
              <div className="space-y-4">
                {[
                  'Complete recitation through daily Taraweeh prayers',
                  'Intensive personal study and reflection (Tadabbur)',
                  'Memorization (Hifz) efforts throughout the month',
                  'Deep contemplation of meanings and teachings',
                  'Sharing Quranic wisdom with family and community',
                ].map((practice, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 text-slate-300 font-light"
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></span>
                    {practice}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-8 text-emerald-300">Core Themes in the Quran</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Justice', emoji: '⚖️' },
                { title: 'Mercy', emoji: '💚' },
                { title: 'Knowledge', emoji: '📖' },
                { title: 'Patience', emoji: '🕰️' },
                { title: 'Gratitude', emoji: '🙌' },
                { title: 'Compassion', emoji: '🤝' },
              ].map((theme, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-slate-800/40 border border-emerald-400/30 rounded-lg p-6 text-center backdrop-blur-sm cursor-pointer hover:border-emerald-400/60 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{theme.emoji}</div>
                  <h4 className="text-xl font-bold text-emerald-300">{theme.title}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FILE: src/components/CharitySection.jsx
// ============================================
import { motion } from 'framer-motion';

export default function CharitySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-32 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-32 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <h2 className="text-7xl md:text-8xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
              CHARITY
            </span>
            <br />
            <span className="text-slate-300">GIVING WITH HEART</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-16 max-w-3xl">
            <p className="text-xl text-slate-300 font-light leading-relaxed">
              Ramadan is fundamentally a month of compassion and generosity. Charity during this sacred month is considered especially rewarding, with believers encouraged to give abundantly to those in need.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-4xl font-bold mb-10 text-rose-300">Forms of Charity (Zakat)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  type: 'Zakat Al-Fitr',
                  desc: 'Obligatory charitable giving at the end of Ramadan, ensuring all can celebrate Eid.',
                  icon: '🎁',
                },
                {
                  type: 'Zakat Al-Mal',
                  desc: 'Annual wealth tax that purifies income and supports the vulnerable in society.',
                  icon: '💰',
                },
                {
                  type: 'Voluntary Charity (Sadaqah)',
                  desc: 'Any generous giving beyond obligations, motivated by compassion and care.',
                  icon: '❤️',
                },
                {
                  type: 'Community Support',
                  desc: 'Organizing and supporting community meals, food banks, and essential services.',
                  icon: '🤲',
                },
              ].map((charity, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-rose-400/30 rounded-lg p-8 backdrop-blur-sm hover:border-rose-400/60 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{charity.icon}</div>
                  <h4 className="text-xl font-bold text-rose-300 mb-3">{charity.type}</h4>
                  <p className="text-slate-300 font-light">{charity.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-gradient-to-r from-rose-900/30 to-pink-900/30 border border-rose-400/40 rounded-xl p-10 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-rose-300 mb-4">The Impact of Ramadan Charity</h3>
              <p className="text-lg text-slate-300 font-light leading-relaxed mb-6">
                During Ramadan, charitable giving reaches unprecedented levels. Billions of dollars are distributed globally to support education, healthcare, food security, and poverty alleviation. This collective compassion transforms lives and strengthens social bonds.
              </p>
              <p className="text-lg text-slate-300 font-light leading-relaxed">
                The spirit of giving extends beyond monetary support—volunteers dedicate time, skills, and energy to serve their communities, embodying the values of service and human dignity.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-8 text-rose-300">Ways to Practice Charity</h3>
            <div className="space-y-4">
              {[
                'Support food banks and community meal programs',
                'Donate to education initiatives and scholarship programs',
                'Contribute to healthcare and medical aid organizations',
                'Help rebuild infrastructure in underserved communities',
                'Mentor and provide guidance to those seeking direction',
                'Donate your skills and expertise to nonprofits',
                'Support orphanages and child welfare services',
                'Assist vulnerable populations with essential resources',
              ].map((way, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-slate-800/40 border border-rose-400/20 rounded-lg backdrop-blur-sm hover:border-rose-400/40 transition-all duration-300"
                >
                  <span className="w-3 h-3 bg-rose-400 rounded-full flex-shrink-0"></span>
                  <span className="text-slate-300 font-light">{way}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FILE: src/components/CelebrationSection.jsx
// ============================================
import { motion } from 'framer-motion';

export default function CelebrationSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-32 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/3 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <h2 className="text-7xl md:text-8xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              CELEBRATION
            </span>
            <br />
            <span className="text-slate-300">EID AL-FITR</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-16 max-w-3xl">
            <p className="text-xl text-slate-300 font-light leading-relaxed">
              As Ramadan concludes, Muslims celebrate Eid al-Fitr—the Festival of Breaking the Fast. This joyous occasion marks the successful completion of the month-long fasting journey and is a time of gratitude, family reunion, and community celebration.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-4xl font-bold mb-10 text-amber-300">Eid Traditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  tradition: 'Morning Prayers',
                  desc: 'Special congregational prayers held early morning, bringing communities together in celebration',
                  icon: '🕌',
                },
                {
                  tradition: 'New Clothes & Fragrance',
                  desc: 'Wearing new or best clothing and applying fragrance, tradition dating back centuries',
                  icon: '👗',
                },
                {
                  tradition: 'Family Gatherings',
                  desc: 'Reuniting with loved ones, sharing meals, and strengthening family bonds',
                  icon: '👨‍👩‍👧‍👦',
                },
                {
                  tradition: 'Festive Foods',
                  desc: 'Preparing special dishes and traditional sweets unique to different cultures',
                  icon: '🍮',
                },
                {
                  tradition: 'Gift Exchange',
                  desc: 'Giving gifts, especially to children, spreading joy and generosity',
                  icon: '🎁',
                },
                {
                  tradition: 'Community Visits',
                  desc: 'Visiting friends, neighbors, and acquaintances to share in the celebration',
                  icon: '🤝',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-amber-400/30 rounded-lg p-8 backdrop-blur-sm hover:border-amber-400/60 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-bold text-amber-300 mb-3">{item.tradition}</h4>
                  <p className="text-slate-300 font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border border-amber-400/40 rounded-xl p-10 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-amber-300 mb-4">A Global Celebration</h3>
              <p className="text-lg text-slate-300 font-light leading-relaxed mb-4">
                Eid al-Fitr is celebrated by over 1.8 billion Muslims worldwide, making it one of the largest religious celebrations on Earth. From bustling cities to small villages, the joy of Eid transcends borders, languages, and cultures.
              </p>
              <p className="text-lg text-slate-300 font-light leading-relaxed">
                Despite the diversity in celebrations across regions, the core spirit remains universal: gratitude for spiritual growth, unity in faith, and spreading happiness to all those around us.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-8 text-amber-300">The Deeper Meaning</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  aspect: 'Spiritual Growth',
                  description:
                    'Reflecting on the inner transformation and spiritual progress made during Ramadan',
                  emoji: '✨',
                },
                {
                  aspect: 'Gratitude',
                  description:
                    'Expressing thanks for strength, patience, and the blessing of completing the fast',
                  emoji: '🙏',
                },
                {
                  aspect: 'Renewal',
                  description:
                    'Beginning a new chapter with strengthened faith and renewed commitment to goodness',
                  emoji: '🔄',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-slate-800/40 border border-amber-400/30 rounded-lg p-8 text-center backdrop-blur-sm"
                >
                  <div className="text-5xl mb-4">{item.emoji}</div>
                  <h4 className="text-xl font-bold text-amber-300 mb-3">{item.aspect}</h4>
                  <p className="text-slate-300 font-light text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FILE: src/components/WaterReflection.jsx
// ============================================
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import WaterSimulation from './WaterSimulation';

export default function WaterReflection({ scrollY }) {
  return (
    <section className="sticky bottom-0 h-screen bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden flex flex-col justify-end">
      <div className="relative z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center py-20 px-6"
        >
          <h2 className="text-6xl md:text-7xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              REFLECTIONS
            </span>
          </h2>
          <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
            As the water reflects the sky, Ramadan reflects our inner light. Take a moment to contemplate your spiritual journey.
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 5, 8], fov: 75 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} color="#8BB3F3" />
            <directionalLight position={[5, 10, 5]} intensity={1} color="#FFFFFF" />
            <WaterSimulation />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/50 via-transparent to-transparent z-15"></div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
      >
        <div className="text-5xl mb-4 opacity-80">💧</div>
        <p className="text-slate-400 font-light italic">Scroll to explore more</p>
      </motion.div>
    </section>
  );
}

// ============================================
// FILE: src/components/WaterSimulation.jsx
// ============================================
import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float time;
  uniform sampler2D heightMap;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vHeight;
  
  void main() {
    vPosition = position;
    
    float wave1 = sin(position.x * 0.5 + time * 0.5) * 0.3;
    float wave2 = sin(position.y * 0.3 + time * 0.7) * 0.25;
    float wave3 = sin((position.x + position.y) * 0.4 + time * 0.6) * 0.2;
    
    float height = wave1 + wave2 + wave3;
    vHeight = height;
    
    float epsilon = 0.1;
    float heightLeft = sin((position.x - epsilon) * 0.5 + time * 0.5) * 0.3;
    heightLeft += sin((position.y) * 0.3 + time * 0.7) * 0.25;
    
    float heightAhead = sin(position.x * 0.5 + time * 0.5) * 0.3;
    heightAhead += sin((position.y - epsilon) * 0.3 + time * 0.7) * 0.25;
    
    vec3 normal = normalize(cross(
      vec3(epsilon, heightLeft - height, 0),
      vec3(0, heightAhead - height, epsilon)
    ));
    vNormal = normal;
    
    vec3 pos = position;
    pos.z += height;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vHeight;
  
  void main() {
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.0);
    
    vec3 waterColor = mix(
      vec3(0.1, 0.3, 0.6),
      vec3(0.2, 0.6, 1.0),
      fresnel + vHeight * 0.5
    );
    
    float reflection = fresnel * 0.6;
    vec3 goldenReflection = mix(vec3(1.0), vec3(1.0, 0.84, 0.0), fresnel) * reflection;
    
    vec3 finalColor = waterColor + goldenReflection;
    
    gl_FragColor = vec4(finalColor, 0.85 + fresnel * 0.15);
  }
`;

export default function WaterSimulation() {
  const meshRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { camera } = useThree();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ gl, clock }) => {
    if (meshRef.current && meshRef.current.material) {
      meshRef.current.material.uniforms.time.value = clock.getElapsedTime();

      if (meshRef.current.geometry.attributes.position) {
        const positionAttribute = meshRef.current.geometry.attributes.position;
        const positions = positionAttribute.array;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({ x: mousePos.x, y: mousePos.y }, camera);

        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const intersection = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersection);

        const rippleRadius = 2;
        const rippleStrength = 0.4;

        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const y = positions[i + 1];

          const dx = x - intersection.x;
          const dy = y - intersection.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < rippleRadius) {
            const ripple = Math.cos((distance / rippleRadius) * Math.PI) * rippleStrength;
            positions[i + 2] += ripple * 0.01;
          }
        }

        positionAttribute.needsUpdate = true;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <planeGeometry args={[20, 12, 256, 256]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          heightMap: { value: null },
        }}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ============================================
// FILE: src/components/Footer.jsx
// ============================================
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-yellow-400/20 py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                ☪ Ramadan
              </span>
            </div>
            <p className="text-slate-400 font-light text-sm">
              Exploring the beauty and significance of the holiest month in Islam.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-yellow-400 mb-4">Navigation</h4>
            <ul className="space-y-2 text-slate-400 text-sm font-light">
              <li>
                <a href="/" className="hover:text-yellow-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-400 transition-colors">
                  About Ramadan
                </a>
              </li>
              <li>
                <a href="/worship" className="hover:text-yellow-400 transition-colors">
                  Worship
                </a>
              </li>
              <li>
                <a href="/celebration" className="hover:text-yellow-400 transition-colors">
                  Celebration
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-yellow-400 mb-4">Learn More</h4>
            <ul className="space-y-2 text-slate-400 text-sm font-light">
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Islamic Education
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Prayer Times
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Quran Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-yellow-400 mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              {['f', 'tw', 'ig', 'yt'].map((icon) => (
                <motion.a
                  key={icon}
                  whileHover={{ scale: 1.2, color: '#FACC15' }}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-600 text-slate-400 hover:border-yellow-400 transition-colors"
                >
                  {icon === 'f' && '📘'}
                  {icon === 'tw' && '𝕏'}
                  {icon === 'ig' && '📷'}
                  {icon === 'yt' && '▶'}
                </motion.a>
              ))}
            </div>
            <p className="text-slate-400 text-xs font-light">Ramadan 1446 AH</p>
          </motion.div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent mb-8"></div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs font-light"
        >
          <p>© 2024 Ramadan Kareem. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Contact Us
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 pt-8 border-t border-yellow-400/10"
        >
          <p className="text-slate-500 italic font-light">
            "Ramadan Mubarak to all who celebrate. May this blessed month bring peace, joy, and spiritual growth."
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
