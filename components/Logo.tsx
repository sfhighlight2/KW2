
import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", light = true }) => {
  const color = light ? "#FDFCF0" : "#080808";

  return (
    <motion.div 
      initial="initial"
      whileHover="hover"
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <svg width="60" height="40" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Central Diamond */}
        <motion.path 
          d="M50 0L58 12L50 20L42 12L50 0Z" 
          fill={color}
          variants={{ hover: { scale: 1.2, transition: { repeat: Infinity, duration: 1, repeatType: "reverse" } } }}
        />
        {/* Left Wing */}
        <path d="M40 15L20 5L28 35L44 25L40 15Z" fill={color} />
        {/* Right Wing */}
        <path d="M60 15L80 5L72 35L56 25L60 15Z" fill={color} />
        {/* Curved Base */}
        <path d="M25 45C35 40 65 40 75 45L78 55C65 50 35 50 22 55L25 45Z" fill={color} />
      </svg>
      
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-black tracking-[-0.04em] leading-none" style={{ color, fontFamily: 'Inter, sans-serif' }}>
          KINGSWAY
        </h1>
        <p className="text-[11px] md:text-[12px] font-semibold tracking-[0.45em] mt-2 text-center whitespace-nowrap opacity-70" style={{ color }}>
          ARRIVE WITH CONFIDENCE
        </p>
      </div>
    </motion.div>
  );
};

export default Logo;
