// COMPLETE SCENES AND PAGES FOLDER STRUCTURE
// Copy all these files to: src/scenes/ and src/pages/

// ============================================
// FILE: src/scenes/MoonAndLanterns.jsx
// ============================================
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function MoonAndLanterns({ mousePos }) {
  const groupRef = useRef();
  const lanternsRef = useRef([]);

  const createCrescentMoon = () => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    const radius = 2;
    const segments = 128;

    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;
      
      const offset = Math.sin(theta) * 0.6;
      vertices.push(x + offset, y, 0);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));

    const material = new THREE.LineBasicMaterial({
      color: '#FACC15',
      linewidth: 3,
      fog: false,
    });

    const line = new THREE.Line(geometry, material);
    return line;
  };

  const starPoints = Array.from({ length: 1000 }).map(() => [
    (Math.random() - 0.5) * 50,
    (Math.random() - 0.5) * 50,
    (Math.random() - 0.5) * 50,
  ]);

  useFrame(({ camera, mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0002;
      groupRef.current.rotation.x += mouse.y * 0.0005;

      lanternsRef.current.forEach((lantern, idx) => {
        lantern.position.y += Math.sin(Date.now() * 0.0005 + idx) * 0.002;
        lantern.position.z = Math.sin(Date.now() * 0.0003 + idx) * 3;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <PerspectiveCamera position={[0, 0, 8]} fov={75} makeDefault />
      
      <ambientLight intensity={0.4} color="#8B7355" />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#FACC15" />
      <pointLight position={[-5, 0, 0]} intensity={0.8} color="#7C3AED" />

      <Points positions={starPoints} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#FFFFFF" size={0.1} />
      </Points>

      <mesh position={[3, 2, -3]} scale={2.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#FACC15" transparent opacity={0.15} />
      </mesh>

      {Array.from({ length: 5 }).map((_, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) lanternsRef.current[i] = el;
          }}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 4,
            Math.sin((i / 5) * Math.PI * 2) * 2 + 1,
            Math.sin((i / 5) * Math.PI) * 3,
          ]}
        >
          <mesh castShadow>
            <boxGeometry args={[0.4, 0.6, 0.4]} />
            <meshStandardMaterial
              color="#FF8C00"
              emissive="#FF6B00"
              emissiveIntensity={0.8}
            />
          </mesh>
          <pointLight color="#FF8C00" intensity={0.6} distance={3} />
        </group>
      ))}

      <mesh position={[0, 0, -10]} scale={30}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#1e1b4b"
          transparent
          opacity={0.4}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// ============================================
// FILE: src/pages/Home.jsx
// ============================================
import Hero from '../components/Hero';
import WhatIsRamadan from '../components/WhatIsRamadan';
import FastingSection from '../components/FastingSection';
import PrayerSection from '../components/PrayerSection';
import QuranSection from '../components/QuranSection';
import CharitySection from '../components/CharitySection';
import CelebrationSection from '../components/CelebrationSection';
import WaterReflection from '../components/WaterReflection';

export default function Home({ scrollY }) {
  return (
    <div>
      <Hero />
      <WhatIsRamadan />
      <FastingSection />
      <PrayerSection />
      <QuranSection />
      <CharitySection />
      <CelebrationSection />
      <WaterReflection scrollY={scrollY} />
    </div>
  );
}

// ============================================
// FILE: src/pages/AboutRamadan.jsx
// ============================================
import { motion } from 'framer-motion';

export default function AboutRamadan({ scrollY }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <section className="h-96 flex items-center justify-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mt-20"
        >
          <h1 className="text-7xl md:text-8xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
              UNDERSTANDING
            </span>
            <br />
            <span className="text-slate-300">RAMADAN</span>
          </h1>
        </motion.div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-20">
              <h2 className="text-5xl font-bold text-yellow-400 mb-6">Historical Origins</h2>
              <p className="text-lg text-slate-300 font-light leading-relaxed mb-4">
                Ramadan is the ninth month of the Hijri calendar, following a lunar cycle that causes it to shift approximately 11 days earlier each Gregorian year. The name "Ramadan" comes from the Arabic word "Ramida," meaning intense heat or dryness.
              </p>
              <p className="text-lg text-slate-300 font-light leading-relaxed">
                The month commemorates the revelation of the Quran to Prophet Muhammad (peace be upon him) beginning in the year 609 CE. This divine revelation continued over 23 years, but the Night of Power—when it began—falls within Ramadan, making it the most sacred period of the year.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-20">
              <h2 className="text-5xl font-bold text-yellow-400 mb-6">The Islamic Calendar</h2>
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-yellow-400/30 rounded-lg p-8 mb-6">
                <p className="text-lg text-slate-300 font-light leading-relaxed mb-4">
                  The Islamic (Hijri) calendar is a lunar calendar consisting of 12 months and 354 or 355 days. This makes it approximately 11 days shorter than the solar year, causing Islamic months to shift through different seasons.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {['Muharram', 'Safar', 'Rabi al-awwal', 'Rabi al-thani', 'Jumada al-awwal', 'Jumada al-thani', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'].map(
                  (month, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-4 rounded-lg ${
                        idx === 8
                          ? 'bg-yellow-400/20 border border-yellow-400/50'
                          : 'bg-slate-800/30 border border-slate-700/50'
                      }`}
                    >
                      <p
                        className={`font-semibold text-sm ${
                          idx === 8 ? 'text-yellow-300' : 'text-slate-300'
                        }`}
                      >
                        {month}
                      </p>
                      {idx === 8 && <p className="text-xs text-yellow-300 mt-1">9th Month</p>}
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-20">
              <h2 className="text-5xl font-bold text-yellow-400 mb-6">The Five Pillars of Islam</h2>
              <p className="text-lg text-slate-300 font-light leading-relaxed mb-8">
                Fasting during Ramadan is the fourth of the Five Pillars—the foundational obligations of Islam. These pillars represent the core practices all Muslims strive to fulfill.
              </p>
              <div className="space-y-6">
                {[
                  {
                    num: '1',
                    title: 'Shahada',
                    desc: 'Declaration of Faith - Bearing witness that there is no deity except Allah and Muhammad is His messenger',
                  },
                  {
                    num: '2',
                    title: 'Salah',
                    desc: 'Prayer - Performing five daily prayers at prescribed times',
                  },
                  {
                    num: '3',
                    title: 'Zakat',
                    desc: 'Almsgiving - Giving 2.5% of wealth to the needy annually',
                  },
                  {
                    num: '4',
                    title: 'Sawm',
                    desc: 'Fasting - Abstaining from food and drink during Ramadan',
                  },
                  {
                    num: '5',
                    title: 'Hajj',
                    desc: 'Pilgrimage - Making the sacred journey to Mecca at least once in a lifetime',
                  },
                ].map((pillar, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex items-start gap-6 p-6 rounded-lg ${
                      idx === 3
                        ? 'bg-yellow-400/10 border border-yellow-400/40'
                        : 'bg-slate-800/30 border border-slate-700/50'
                    }`}
                  >
                    <div
                      className={`text-2xl font-bold flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg ${
                        idx === 3
                          ? 'bg-yellow-400/30 text-yellow-300'
                          : 'bg-slate-700/50 text-slate-300'
                      }`}
                    >
                      {pillar.num}
                    </div>
                    <div>
                      <h4
                        className={`text-xl font-bold mb-2 ${
                          idx === 3 ? 'text-yellow-300' : 'text-slate-200'
                        }`}
                      >
                        {pillar.title}
                      </h4>
                      <p className="text-slate-400 font-light">{pillar.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-5xl font-bold text-yellow-400 mb-6">Global Significance</h2>
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-yellow-400/30 rounded-lg p-8">
                <p className="text-lg text-slate-300 font-light leading-relaxed mb-4">
                  Ramadan is observed by nearly two billion Muslims globally, spanning every continent and culture. This universal month creates a synchronized spiritual experience—when sunset falls in one part of the world, it rises in another, yet all are connected through this sacred practice.
                </p>
                <p className="text-lg text-slate-300 font-light leading-relaxed">
                  The month stands as a powerful reminder of human unity, shared values, and the capacity for collective spiritual transformation. It transcends national borders, ethnic backgrounds, and socioeconomic divides, bringing humanity together in a common purpose of spiritual renewal and mutual compassion.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// FILE: src/pages/Worship.jsx
// ============================================
import { motion } from 'framer-motion';
import PrayerSection from '../components/PrayerSection';
import FastingSection from '../components/FastingSection';
import QuranSection from '../components/QuranSection';

export default function Worship({ scrollY }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <section className="h-96 flex items-center justify-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mt-20"
        >
          <h1 className="text-7xl md:text-8xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              WORSHIP
            </span>
            <br />
            <span className="text-slate-300">SPIRITUAL PRACTICE</span>
          </h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
            Discover the spiritual practices that define Ramadan: prayer, fasting, Quran recitation, and devotion.
          </p>
        </motion.div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-20">
              <h2 className="text-5xl font-bold text-blue-400 mb-6">The Heart of Ramadan</h2>
              <p className="text-xl text-slate-300 font-light leading-relaxed mb-4">
                Ramadan is fundamentally a month of worship and spiritual elevation. While fasting is the most visible practice, it is inseparable from prayer, Quranic engagement, and devotional acts that define the month's spiritual essence.
              </p>
              <p className="text-xl text-slate-300 font-light leading-relaxed">
                These practices work together to create a holistic transformation—the body fasts while the spirit feasts on divine connection, creating a profound balance between physical discipline and spiritual nourishment.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-20">
              <h2 className="text-4xl font-bold text-blue-300 mb-8">Core Practices</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Daily Fasting',
                    desc: 'Abstaining from food and drink, physical needs transform into spiritual awareness',
                    icon: '🌙',
                  },
                  {
                    title: 'Five Daily Prayers',
                    desc: 'Structured communication with the Divine, performed at fixed times throughout the day',
                    icon: '🕌',
                  },
                  {
                    title: 'Quran Recitation',
                    desc: 'Deep engagement with scripture, often completing the entire Quran within the month',
                    icon: '📖',
                  },
                  {
                    title: 'Taraweeh Prayers',
                    desc: 'Special evening prayers in congregation, fostering community spiritual growth',
                    icon: '✨',
                  },
                  {
                    title: 'Night of Power',
                    desc: 'Seeking Laylat al-Qadr, the holiest night when revelation began',
                    icon: '🌟',
                  },
                  {
                    title: 'Charity & Service',
                    desc: 'Acts of kindness and generosity extending spiritual practice into community care',
                    icon: '❤️',
                  },
                ].map((practice, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/30 rounded-lg p-8 backdrop-blur-sm hover:border-blue-400/60 transition-all duration-300"
                  >
                    <div className="text-4xl mb-4">{practice.icon}</div>
                    <h4 className="text-lg font-bold text-blue-300 mb-3">{practice.title}</h4>
                    <p className="text-slate-300 font-light text-sm">{practice.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-blue-300 mb-8">The Spiritual Journey</h2>
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-400/40 rounded-lg p-10">
                <div className="space-y-6">
                  {[
                    {
                      week: 'First Ten Days',
                      theme: 'Mercy',
                      description:
                        'Focus on seeking forgiveness and experiencing divine mercy as you establish fasting routines.',
                    },
                    {
                      week: 'Second Ten Days',
                      theme: 'Liberation',
                      description:
                        'Deepen spiritual practice as physical body adjusts; focus on liberation from earthly distractions.',
                    },
                    {
                      week: 'Final Ten Days',
                      theme: 'Salvation',
                      description:
                        'Intensify worship seeking Laylat al-Qadr; devote nights to prayer and Quran recitation.',
                    },
                  ].map((period, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 }}
                      className="border-l-4 border-blue-400/50 pl-6"
                    >
                      <h4 className="text-xl font-bold text-blue-300 mb-2">{period.week}</h4>
                      <p className="text-sm font-semibold text-blue-200 mb-2">Theme: {period.theme}</p>
                      <p className="text-slate-300 font-light">{period.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <FastingSection />
      <PrayerSection />
      <QuranSection />
    </div>
  );
}

// ============================================
// FILE: src/pages/Celebration.jsx
// ============================================
import { motion } from 'framer-motion';
import CelebrationSection from '../components/CelebrationSection';
import CharitySection from '../components/CharitySection';

export default function Celebration({ scrollY }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <section className="h-96 flex items-center justify-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mt-20"
        >
          <h1 className="text-7xl md:text-8xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              CELEBRATION
            </span>
            <br />
            <span className="text-slate-300">JOY & COMMUNITY</span>
          </h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
            Experience the joy, unity, and generosity that define Ramadan and Eid al-Fitr.
          </p>
        </motion.div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-20">
              <h2 className="text-5xl font-bold text-amber-400 mb-6">The Joy of Ramadan</h2>
              <p className="text-xl text-slate-300 font-light leading-relaxed mb-4">
                While Ramadan is a sacred month of discipline and worship, it is equally a month of celebration. The daily breaking of fasts (Iftar), the evening prayers, and the anticipation of Eid create moments of profound joy and community connection.
              </p>
              <p className="text-xl text-slate-300 font-light leading-relaxed">
                From the first sighting of the crescent moon to the final night celebrations, Ramadan is infused with a unique atmosphere of togetherness where strangers become family, and the spiritual becomes deeply personal yet universally shared.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-20">
              <h2 className="text-4xl font-bold text-amber-300 mb-8">The Iftar Tradition</h2>
              <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-400/40 rounded-lg p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {[
                    {
                      title: 'Breaking Together',
                      desc: 'Families gather as the sun sets, sharing meals and strengthening bonds',
                      icon: '🍽️',
                    },
                    {
                      title: 'Cultural Diversity',
                      desc: 'Each region brings unique dishes reflecting their heritage and traditions',
                      icon: '🌍',
                    },
                    {
                      title: 'Community Spirit',
                      desc: 'Open invitations welcome neighbors, friends, and the less fortunate',
                      icon: '🤝',
                    },
                    {
                      title: 'Festive Atmosphere',
                      desc: 'Markets buzz with activity, homes glow with warmth and laughter',
                      icon: '✨',
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-slate-800/40 border border-amber-400/30 rounded-lg p-6"
                    >
                      <div className="text-4xl mb-3">{item.icon}</div>
                      <h4 className="text-lg font-bold text-amber-300 mb-2">{item.title}</h4>
                      <p className="text-slate-300 font-light">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-20">
              <h2 className="text-4xl font-bold text-amber-300 mb-8">Ramadan & Eid Foods</h2>
              <p className="text-lg text-slate-300 font-light mb-8">
                Ramadan introduces a rich tapestry of flavors across the Muslim world. From traditional recipes passed down through generations to special Iftar delicacies, food becomes a celebration of culture and unity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { food: 'Dates', significance: 'Traditional first food to break fast, blessed in Hadith' },
                  { food: 'Samosas', significance: 'Crispy pastries filled with spiced vegetables or meat' },
                  { food: 'Biryani', significance: 'Fragrant rice dish with meat, prepared for celebrations' },
                  { food: 'Kunafa', significance: 'Sweet pastry with nuts, symbol of Ramadan desserts' },
                  { food: 'Harira', significance: 'Traditional soup, nutritious and warming' },
                  { food: 'Kebabs', significance: 'Grilled meats, essential to Iftar tables' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-slate-800/30 border border-amber-400/30 rounded-lg p-6"
                  >
                    <h4 className="text-xl font-bold text-amber-300 mb-2">{item.food}</h4>
                    <p className="text-slate-300 font-light text-sm">{item.significance}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-amber-300 mb-8">The Evening Glow</h2>
              <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-400/30 rounded-lg p-10">
                <p className="text-lg text-slate-300 font-light leading-relaxed mb-6">
                  As the sun sets each evening, a magical transformation occurs in Muslim communities worldwide. Streets light up with lanterns, families gather on rooftops to pray together, and the air fills with spiritual energy and anticipation.
                </p>
                <p className="text-lg text-slate-300 font-light leading-relaxed mb-6">
                  Children play in parks while adults engage in Taraweeh prayers, the smell of food fills the air, and a sense of belonging permeates every interaction. These evenings create memories that last a lifetime.
                </p>
                <p className="text-lg text-slate-300 font-light leading-relaxed">
                  The pace slows, hustle gives way to presence, and the spiritual dimension of life takes center stage. This is the unique magic of Ramadan—a moment when the material and spiritual worlds align in perfect harmony.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CelebrationSection />
      <CharitySection />
    </div>
  );
}
