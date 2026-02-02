
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Fleet', href: '#fleet' },
    { name: 'Services', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: 'smooth'
    });
    setIsMobileMenuOpen(false);
  };

  const scrollToBooking = () => {
    const isMobile = window.innerWidth < 768;
    const targetId = isMobile ? 'reservation-form' : 'booking';
    const elem = document.getElementById(targetId);
    
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#141414]/95 backdrop-blur-xl py-2 border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3">
          <Logo className="scale-75 origin-left" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-[#FDFCF0] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-5 text-white/40">
            <Instagram size={20} className="cursor-pointer hover:text-white transition-colors" />
          </div>
          <button 
            onClick={scrollToBooking}
            className="bg-[#FDFCF0] text-black px-10 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#FDFCF0]/5"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-[#1c1c1c] border-b border-white/10 p-8 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-8 items-center text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-2xl font-black uppercase tracking-widest text-[#FDFCF0]"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={scrollToBooking}
                className="bg-[#FDFCF0] text-black w-full py-5 rounded-2xl text-lg font-black uppercase tracking-widest"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
