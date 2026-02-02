
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[100] bg-[#141414] flex flex-col items-center justify-center"
    >
      <div className="relative mb-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <Logo className="scale-150" />
        </motion.div>
        
        {/* Ambient Glow */}
        <motion.div
          animate={{ opacity: [0.05, 0.2, 0.05], scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#FDFCF0] blur-[120px] -z-10"
        />
      </div>

      <div className="w-80 h-[1px] bg-white/5 relative overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="absolute top-0 left-0 h-full bg-[#FDFCF0] shadow-[0_0_15px_rgba(253,252,240,0.5)]"
        />
      </div>

      <motion.div 
        className="mt-8 text-[9px] uppercase tracking-[0.8em] font-black text-[#FDFCF0]/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        INITIALIZING CONCIERGE
      </motion.div>
      
      <motion.div 
        className="mt-4 text-3xl font-black font-mono text-[#FDFCF0]"
      >
        {Math.round(progress)}%
      </motion.div>
    </motion.div>
  );
};

export default Preloader;