import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

const Bubble = ({ title, content, color, x, y }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🎈 Floating Bubble */}
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`absolute w-28 h-28 rounded-full flex flex-col items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.1)] border-4 border-white/40 backdrop-blur-sm z-20 hover:z-30 transition-shadow duration-300`}
        style={{ top: y, left: x, background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), ${color})` }}
      >
        <MessageCircle className="text-white w-8 h-8 drop-shadow-md mb-1" />
        <span className="text-white font-bold text-xs drop-shadow-md">{title}</span>
      </motion.div>

      {/* 📖 Opened Card */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[500px] bg-white/90 backdrop-blur-2xl p-8 rounded-3xl border border-white shadow-2xl relative"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
              
              <h2 className="text-3xl font-extrabold mb-4" style={{ color: color }}>{title}</h2>
              <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line font-medium">
                {content}
              </p>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-500 italic">💡 "Pro Tip: Bubble ko drag karke side pe phenk bhi sakte ho!"</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Bubble;