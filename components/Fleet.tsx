
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FLEET } from '../constants';
import { ArrowRight, Zap, Gauge, Flame, Info, ChevronLeft, ChevronRight } from 'lucide-react';

const Fleet: React.FC = () => {
  const [hoveredCar, setHoveredCar] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // For infinite scroll simulation, we triple the items to ensure the user can't easily reach the end
  const infiniteFleet = [...FLEET, ...FLEET, ...FLEET];

  const scrollToBooking = () => {
    const elem = document.getElementById('booking');
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const moveDistance = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - moveDistance : scrollLeft + moveDistance;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  // Infinite Scroll Loop Handler
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      // If we've scrolled past the first set of items (FLEET.length), snap back to center set
      const itemWidth = scrollWidth / 3;
      
      if (scrollLeft <= 10) {
        el.scrollLeft = itemWidth + scrollLeft;
      } else if (scrollLeft >= (scrollWidth - clientWidth - 10)) {
        el.scrollLeft = scrollLeft - itemWidth;
      }
    };

    // Initial positioning in the middle set
    const itemWidth = el.scrollWidth / 3;
    el.scrollLeft = itemWidth;

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      scale: 0.98,
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className="py-20 md:py-32 bg-[#141414] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#fffdf2]/60 font-bold tracking-[0.4em] uppercase text-[12px] mb-3 md:mb-4 block">
              The Collection
            </span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-bold leading-tight tracking-tighter text-[#fffdf2]"
            >
              A Fleet Built for <br className="hidden md:block" />Comfort, Safety & Style.
            </motion.h2>
          </div>
        </div>
        
        <div className="flex flex-col gap-8 items-start md:items-end">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-white/70 max-w-sm text-lg md:text-xl font-light leading-relaxed md:text-right"
          >
            Each vehicle is professionally maintained, immaculately detailed, and operated by experienced chauffeurs.
          </motion.p>
          
          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all group"
              aria-label="Previous Car"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all group"
              aria-label="Next Car"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative group">
        <motion.div 
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex overflow-x-auto gap-6 md:gap-10 pb-12 px-6 md:px-12 snap-x snap-mandatory hide-scrollbar scroll-smooth"
        >
          {infiniteFleet.map((car, index) => (
            <motion.div
              key={`${car.id}-${index}`}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCar(`${car.id}-${index}`)}
              onMouseLeave={() => setHoveredCar(null)}
              className="snap-center group/card relative bg-[#1c1c1c] rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-700 shadow-2xl min-w-[85vw] md:min-w-[600px] lg:min-w-[750px]"
            >
              <div className="hidden md:block absolute inset-0 z-10 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover/card:translate-x-full" style={{ transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s' }} />

              <div className="aspect-[16/10] relative overflow-hidden">
                <motion.img 
                  src={car.image} 
                  alt={car.name} 
                  animate={{ scale: hoveredCar === `${car.id}-${index}` ? 1.08 : 1 }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover/card:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-4 right-4 md:top-10 md:right-10 z-20">
                  <motion.div
                    animate={{ rotate: hoveredCar === `${car.id}-${index}` ? 90 : 0, scale: hoveredCar === `${car.id}-${index}` ? 1.1 : 1 }}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-[#FDFCF0] transition-colors hover:bg-white hover:text-black"
                  >
                    <Info size={18} className="md:w-6 md:h-6" />
                  </motion.div>
                </div>

                <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 z-20">
                  <div className="bg-[#FDFCF0]/10 backdrop-blur-xl px-4 py-1.5 md:px-6 md:py-2 rounded-xl md:rounded-2xl border border-white/10">
                    <p className="text-[11px] text-gray-400 uppercase tracking-[0.3em] font-black">Class</p>
                    <p className="text-sm md:text-base font-bold text-[#FDFCF0]">{car.type}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-12 relative z-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 md:gap-0">
                  <div>
                    <h3 className="text-2xl md:text-4xl font-black mb-1 uppercase tracking-tighter text-[#FDFCF0] leading-none">{car.name}</h3>
                    <p className="text-[#fffdf2]/60 font-black text-[11px] md:text-[12px] tracking-[0.4em] uppercase">{car.brand}</p>
                  </div>
                  <div className="w-full md:w-auto text-left md:text-right border-t border-white/5 md:border-none pt-4 md:pt-0">
                    <p className="text-xl md:text-2xl font-black text-[#FDFCF0] tracking-tighter">
                      Contact for Pricing
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
                  {[
                    { icon: <Zap size={18} />, label: 'Power', val: car.power },
                    { icon: <Gauge size={18} />, label: 'Speed', val: car.topSpeed },
                    { icon: <Flame size={18} />, label: '0-100', val: car.acceleration }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                      className="bg-white/[0.03] rounded-2xl md:rounded-[32px] p-4 md:p-6 border border-white/5 transition-all"
                    >
                      <div className="text-[#fffdf2]/80 mb-2 md:mb-4 md:w-6 md:h-6">{stat.icon}</div>
                      <p className="text-[11px] text-gray-400 uppercase font-black tracking-widest mb-1 md:mb-2">{stat.label}</p>
                      <p className="text-xs md:text-lg font-bold text-white/90 truncate">{stat.val}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToBooking}
                  className="w-full flex items-center justify-between px-6 py-5 md:px-12 md:py-7 bg-[#FDFCF0] text-black rounded-2xl md:rounded-[28px] transition-all duration-300 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[12px] md:text-[13px] overflow-hidden group/btn relative shadow-xl"
                >
                  <span className="relative z-10">Request Reservation</span>
                  <ArrowRight size={22} className="relative z-10 transition-transform group-hover/btn:translate-x-2 md:w-6 md:h-6" />
                  <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
           <motion.div 
             animate={{ opacity: [0.3, 1, 0.3], x: [0, 5, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="text-[11px] font-black uppercase tracking-[0.4em] text-[#fffdf2]/30"
           >
             Swipe to view more
           </motion.div>
        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Fleet;
