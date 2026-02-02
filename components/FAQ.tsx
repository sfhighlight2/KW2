
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#fffdf2] bg-[radial-gradient(circle_at_top_right,#fffdf2_0%,#faf9f0_100%)] py-20 md:py-32 transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 md:gap-20">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6 leading-tight text-gray-900 tracking-tighter uppercase"
          >
            Common <br className="hidden md:block" /> Questions
          </motion.h2>
          <p className="text-gray-700 text-lg md:text-xl font-light leading-relaxed">Everything you need to know about our premier chauffeur standards and concierge services.</p>
        </div>

        <div className="space-y-2 md:space-y-4">
          {FAQS.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border-b border-black/10 overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full py-8 md:py-10 flex justify-between items-center text-left hover:text-gray-500 transition-colors group"
              >
                <span className="text-xl md:text-2xl font-black text-gray-900 pr-10 uppercase tracking-tight group-hover:pl-2 transition-all">{faq.question}</span>
                <div className="flex-shrink-0 text-gray-400">
                  {activeIndex === idx ? <Minus size={24} /> : <Plus size={24} />}
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p className="pb-10 text-gray-700 leading-relaxed text-lg md:text-xl max-w-2xl font-light">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
