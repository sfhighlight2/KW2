
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Reservation',
    desc: 'Book online or through our concierge team.'
  },
  {
    number: '02',
    title: 'Chauffeur Assignment',
    desc: 'A professional chauffeur is matched to your itinerary.'
  },
  {
    number: '03',
    title: 'En Route',
    desc: 'Real-time coordination as your chauffeur arrives.'
  },
  {
    number: '04',
    title: 'Arrival',
    desc: 'Arrive comfortably, on time, and in style.'
  }
];

const Process: React.FC = () => {
  return (
    <div className="bg-[#fffdf2] bg-[radial-gradient(circle_at_top_left,#fffdf2_0%,#faf9f0_100%)] py-20 md:py-32 overflow-hidden transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-hidden mb-4">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-black leading-tight text-gray-900 tracking-tighter uppercase"
              >
                The Journey <br />Made Effortless.
              </motion.h2>
            </div>
            <p className="text-gray-700 text-lg md:text-xl mb-8 md:mb-12 max-w-md font-light leading-relaxed">
              We combine modern convenience with classic chauffeur standards to deliver a seamless, first-class travel experience. Every detail is handled with precision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, backgroundColor: '#252525', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
                className="bg-[#1c1c1c] p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5 shadow-2xl transition-all duration-500"
              >
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 0.1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 + 0.3 }}
                  className="text-5xl md:text-7xl font-black text-[#FDFCF0] block mb-4 leading-none"
                >
                  {step.number}
                </motion.div>
                <h3 className="text-xl md:text-2xl font-black mb-3 text-[#FDFCF0] uppercase tracking-tight">{step.title}</h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[32px] md:rounded-[48px] overflow-hidden aspect-[4/5] lg:aspect-auto h-full min-h-[450px] md:min-h-[600px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] group"
        >
          <motion.img
            initial={{ scale: 1.3 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            src="/guarantee.jpg"
            alt="Chauffeur service"
            className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="md:absolute md:bottom-8 md:left-8 md:right-8 relative p-6 md:p-10 bg-[#1c1c1c]/90 backdrop-blur-2xl border border-white/10 rounded-[24px] md:rounded-[32px] text-center shadow-2xl mx-4 my-8 md:m-0"
          >
            <p className="text-xl md:text-2xl font-black mb-3 text-[#FDFCF0] uppercase tracking-tighter">90-Minute Guarantee</p>
            <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed">For metropolitan New York City area, we guarantee vehicle availability within 90 minutes of booking.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Process;
