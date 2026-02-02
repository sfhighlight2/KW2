
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, CheckCircle, ArrowRight, User, Phone, Mail } from 'lucide-react';

const Booking: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupLocation: '',
    destination: '',
    date: '',
    time: '',
    passengers: '1',
    serviceType: 'Airport VIP'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        pickupLocation: '',
        destination: '',
        date: '',
        time: '',
        passengers: '1',
        serviceType: 'Airport VIP'
      });
    }, 8000);
  };

  return (
    <section id="booking" className="py-20 md:py-32 relative overflow-hidden bg-[#fffdf2] bg-[radial-gradient(circle_at_bottom_right,#fffdf2_0%,#faf9f0_100%)] transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gray-400 font-black text-[12px] tracking-[0.5em] uppercase mb-6 block">
              The Reservation Portal
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-gray-900 mb-8 leading-[0.9] tracking-tighter uppercase">
              Reserve Your <br />Chauffeur.
            </h2>
            <p className="text-gray-700 text-lg md:text-xl font-light mb-8 md:mb-12 max-w-lg leading-relaxed">
              Your journey begins here. Enter your details below and our concierge team will handle the rest with absolute discretion and precision.
            </p>

            <div className="space-y-4 md:space-y-6">
              {[
                { text: 'Secure VIP Booking' },
                { text: 'Elite Chauffeur Matching' },
                { text: 'Transparent Corporate Pricing' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (idx * 0.15), duration: 0.8 }}
                  className="flex items-center gap-5 text-gray-600 text-base font-semibold tracking-wide"
                >
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center border border-black/5">
                    <CheckCircle size={18} className="text-gray-900" />
                  </div>
                  {item.text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            id="reservation-form"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="booking-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  className="bg-[#1c1c1c] border border-white/10 rounded-[32px] md:rounded-[48px] p-6 md:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-[#FDFCF0] mb-8 uppercase tracking-tight border-b border-white/5 pb-4">
                    Trip Details
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 relative z-10">
                    {/* Personal Info Group */}
                    <div className="space-y-4 md:space-y-5">
                      <div className="relative group/field">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/field:text-[#FDFCF0] transition-colors" size={20} />
                        <input
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          type="text"
                          placeholder="Full Name"
                          className="w-full bg-white/5 border border-white/5 rounded-[20px] md:rounded-[24px] py-4 md:py-6 pl-16 pr-8 outline-none focus:border-[#FDFCF0]/30 focus:bg-white/10 transition-all text-base text-white placeholder:text-white/20 font-medium"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        <div className="relative group/field">
                          <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/field:text-[#FDFCF0] transition-colors" size={20} />
                          <input
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full bg-white/5 border border-white/5 rounded-[20px] md:rounded-[24px] py-4 md:py-6 pl-16 pr-8 outline-none focus:border-[#FDFCF0]/30 focus:bg-white/10 transition-all text-base text-white placeholder:text-white/20 font-medium"
                          />
                        </div>
                        <div className="relative group/field">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/field:text-[#FDFCF0] transition-colors" size={20} />
                          <input
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-white/5 border border-white/5 rounded-[20px] md:rounded-[24px] py-4 md:py-6 pl-16 pr-8 outline-none focus:border-[#FDFCF0]/30 focus:bg-white/10 transition-all text-base text-white placeholder:text-white/20 font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location Info Group */}
                    <div className="space-y-4 md:space-y-5">
                      <div className="relative group/field">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/field:text-[#FDFCF0] transition-colors" size={20} />
                        <input
                          required
                          name="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleInputChange}
                          type="text"
                          placeholder="Pickup Address"
                          className="w-full bg-white/5 border border-white/5 rounded-[20px] md:rounded-[24px] py-4 md:py-6 pl-16 pr-8 outline-none focus:border-[#FDFCF0]/30 focus:bg-white/10 transition-all text-base text-white placeholder:text-white/20 font-medium"
                        />
                      </div>
                      <div className="relative group/field">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/field:text-[#FDFCF0] transition-colors" size={20} />
                        <input
                          required
                          name="destination"
                          value={formData.destination}
                          onChange={handleInputChange}
                          type="text"
                          placeholder="Drop-off Address"
                          className="w-full bg-white/5 border border-white/5 rounded-[20px] md:rounded-[24px] py-4 md:py-6 pl-16 pr-8 outline-none focus:border-[#FDFCF0]/30 focus:bg-white/10 transition-all text-base text-white placeholder:text-white/20 font-medium"
                        />
                      </div>
                    </div>

                    {/* Date/Time Group - Hidden */}
                    <div className="hidden grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                      <div className="relative group/field">
                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/field:text-[#FDFCF0] transition-colors" size={20} />
                        <input
                          required
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          type="date"
                          className="w-full bg-white/5 border border-white/5 rounded-[20px] md:rounded-[24px] py-4 md:py-6 pl-16 pr-6 outline-none focus:border-[#FDFCF0]/30 focus:bg-white/10 transition-all text-base text-white font-medium [color-scheme:dark]"
                        />
                      </div>
                      <div className="relative group/field">
                        <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/field:text-[#FDFCF0] transition-colors" size={20} />
                        <input
                          required
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          type="time"
                          className="w-full bg-white/5 border border-white/5 rounded-[20px] md:rounded-[24px] py-4 md:py-6 pl-16 pr-6 outline-none focus:border-[#FDFCF0]/30 focus:bg-white/10 transition-all text-base text-white font-medium [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, backgroundColor: '#ffffff' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#FDFCF0] text-black py-6 md:py-7 rounded-[20px] md:rounded-[28px] font-black uppercase tracking-[0.3em] transition-all text-[12px] md:text-[14px] flex items-center justify-center gap-4 shadow-2xl group/btn mt-4"
                    >
                      Reserve Now
                      <ArrowRight size={22} className="group-hover/btn:translate-x-2 transition-transform" />
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#1c1c1c] border border-white/10 rounded-[32px] md:rounded-[48px] p-10 md:p-16 text-center flex flex-col items-center justify-center min-h-[400px] md:min-h-[600px] shadow-2xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="w-24 h-24 md:w-36 md:h-36 bg-[#FDFCF0]/10 rounded-full flex items-center justify-center mb-8 md:mb-12 border border-[#FDFCF0]/20"
                  >
                    <CheckCircle className="text-[#FDFCF0]" size={56} md:size={80} />
                  </motion.div>
                  <h3 className="text-3xl md:text-5xl font-black mb-5 md:mb-8 uppercase tracking-tighter text-[#FDFCF0]">Confirmed</h3>
                  <p className="text-white/60 max-w-sm mx-auto leading-relaxed text-lg md:text-2xl font-light">
                    Your luxury chauffeur has been notified. You will receive a secure dispatch message shortly.
                  </p>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-10 md:mt-16 text-[12px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-[#FDFCF0] transition-colors"
                  >
                    New Reservation
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
