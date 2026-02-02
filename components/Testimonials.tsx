
import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <div className="py-32 px-6 md:px-12 overflow-hidden bg-[#141414]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter text-[#FDFCF0] uppercase">
              Trusted by Clients Who Expect Excellence.
            </h2>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.3 }}
            className="bg-[#1c1c1c] px-6 py-4 rounded-full border border-white/10 flex items-center gap-4 shadow-xl"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i + 15}`} className="w-10 h-10 rounded-full border-2 border-[#1c1c1c]" alt="avatar" />
              ))}
            </div>
            <p className="text-[11px] uppercase tracking-widest font-black text-[#fffdf2]/40">Trusted by New York Executives</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, borderColor: 'rgba(255,255,255,0.1)' }}
              className="bg-[#1c1c1c] p-10 rounded-3xl border border-white/5 relative group transition-all duration-500"
            >
              <div className="flex gap-1 mb-8">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={16} className="fill-[#FDFCF0] text-[#FDFCF0]" />
                ))}
              </div>
              <p className="text-lg text-white/70 leading-relaxed mb-10 italic font-light">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10" />
                  <div className="absolute inset-0 rounded-full bg-[#FDFCF0]/5 pointer-events-none" />
                </div>
                <div>
                  <p className="font-bold text-[#FDFCF0] uppercase tracking-tight">{t.name}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
