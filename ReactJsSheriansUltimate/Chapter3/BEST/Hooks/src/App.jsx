import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, RefreshCw, MousePointer2, Layers, Wifi, Cpu, Snowflake } from 'lucide-react';

import UseStatePage from './hooks/UseStatePage';
import UseEffectPage from './hooks/UseEffectPage';
import UseRefPage from './hooks/UseRefPage';
import UseContextPage from './hooks/UseContextPage';
import UseReducerPage from './hooks/UseReducerPage';
import UseMemoPage from './hooks/UseMemoPage';
import UseCallbackPage from './hooks/UseCallbackPage';

const TABS = [
  { id: 'state', label: 'State', icon: Box, color: 'text-pink-500' },
  { id: 'effect', label: 'Effect', icon: RefreshCw, color: 'text-blue-500' },
  { id: 'ref', label: 'Ref', icon: MousePointer2, color: 'text-purple-500' },
  { id: 'reducer', label: 'Reducer', icon: Layers, color: 'text-orange-500' },
  { id: 'context', label: 'Context', icon: Wifi, color: 'text-green-500' },
  { id: 'memo', label: 'Memo', icon: Cpu, color: 'text-yellow-500' },
  { id: 'callback', label: 'Callback', icon: Snowflake, color: 'text-cyan-500' },
];

const App = () => {
  const [activeTab, setActiveTab] = useState('state');

  const renderContent = () => {
    switch(activeTab) {
      case 'state': return <UseStatePage />;
      case 'effect': return <UseEffectPage />;
      case 'ref': return <UseRefPage />;
      case 'reducer': return <UseReducerPage />;
      case 'context': return <UseContextPage />;
      case 'memo': return <UseMemoPage />;
      case 'callback': return <UseCallbackPage />;
      default: return <UseStatePage />;
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-50 font-sans">
      
      {/* 📺 Main Screen Area */}
      <main className="w-full h-full">
        {renderContent()}
      </main>

      {/* 🛥️ The Glass Dock */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-dock px-6 py-4 rounded-3xl flex gap-4 items-end transition-all duration-300 hover:scale-105 hover:px-8">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -10, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`relative group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white shadow-xl -translate-y-4' : 'hover:bg-white/40'}`}
              >
                <Icon className={`w-6 h-6 ${tab.color}`} />
                
                {/* Tooltip on Hover */}
                <span className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-xs px-2 py-1 rounded-md transition-opacity whitespace-nowrap">
                  {tab.label}
                </span>

                {/* Active Dot */}
                {isActive && <div className="absolute -bottom-2 w-1 h-1 bg-gray-800 rounded-full"></div>}
              </motion.button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default App;