
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
      className={`flex items-center ${className}`}
    >
      <img
        src="/logo.png"
        alt="Kingsway Logo"
        className="w-auto h-12 md:h-16 object-contain"
        style={{ filter: light ? 'none' : 'invert(1)' }}
      />
    </motion.div>
  );
};

export default Logo;
