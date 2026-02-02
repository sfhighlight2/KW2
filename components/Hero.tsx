
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center md:items-end overflow-hidden bg-[#141414]">
      {/* Dynamic Background */}
      <motion.div 
        style={{ y: yParallax, x: mousePos.x }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/hero-bg.png" 
          alt="Kingsway Luxury" 
          className="w-full h-full object-cover opacity-50 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Decorative Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, 30, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FDFCF0]/10 rounded-full blur-[80px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12 md:pt-0 md:pb-32">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[10rem] font-black mb-8 leading-[0.85] tracking-tight"
          >
            Arrive With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FDFCF0] to-[#FDFCF0]/20">Confidence.</span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-end">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl text-white/50 max-w-xl leading-relaxed font-light"
            >
              Elite luxury transportation in New York. Kingsway delivers refined chauffeur experiences with professionalism, discretion, and comfort — designed for executives, VIPs, and clients who expect more than just a ride.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => scrollToSection('fleet')}
                className="group bg-[#FDFCF0] text-black px-10 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-white transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] hover:-translate-y-1 uppercase tracking-widest text-xs"
              >
                Explore Fleet
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('booking')}
                className="bg-white/5 backdrop-blur-md border border-white/10 px-10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all uppercase tracking-widest text-xs text-white"
              >
                Book Now
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
