
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Award, Plane, Zap, Coffee } from 'lucide-react';

const usps = [
  {
    icon: <Clock size={32} />,
    title: '24/7 Availability',
    description: 'Day or night service across New York and surrounding areas.'
  },
  {
    icon: <Shield size={32} />,
    title: 'Professional Chauffeurs',
    description: 'Experienced, discreet drivers trained in safety and etiquette.'
  },
  {
    icon: <Award size={32} />,
    title: 'Premium Fleet',
    description: 'Late-model luxury vehicles maintained to showroom standards.'
  },
  {
    icon: <Plane size={32} />,
    title: 'Airport Expertise',
    description: 'Flight monitoring ensures seamless arrivals and departures.'
  },
  {
    icon: <Zap size={32} />,
    title: 'On-Time Commitment',
    description: 'Precision scheduling so you’re never rushed or delayed.'
  },
  {
    icon: <Coffee size={32} />,
    title: 'Personalized Comfort',
    description: 'Climate control, quiet ride preferences, and tailored service.'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-32 bg-[#141414] relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(253,252,240,0.02)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#fffdf2]/60 font-black text-[10px] tracking-[0.4em] uppercase mb-4 block"
          >
            Why Kingsway
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#FDFCF0] mb-6 tracking-tighter uppercase"
          >
            The Standard of <br /> Luxury Transportation.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg font-light leading-relaxed"
          >
            More than transportation — we deliver peace of mind, privacy, and professionalism for discerning clients.
          </motion.p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {usps.map((usp, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              className="group p-10 rounded-[40px] bg-[#1c1c1c] border border-white/5 hover:border-[#FDFCF0]/20 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FDFCF0]/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#252525] flex items-center justify-center text-[#FDFCF0] mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-[#FDFCF0] group-hover:text-black shadow-inner">
                {usp.icon}
              </div>
              <h3 className="text-xl font-black text-[#FDFCF0] mb-4 uppercase tracking-tight">
                {usp.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed font-light group-hover:text-white/80 transition-colors">
                {usp.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
