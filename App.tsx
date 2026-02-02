
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Fleet from './components/Fleet';
import Process from './components/Process';
import Features from './components/Features';
import Booking from './components/Booking';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AIConcierge from './components/AIConcierge';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#141414]">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onLoadingComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Navbar isScrolled={scrolled} />
            
            <main>
              <Hero />
              
              <section id="fleet" className="scroll-mt-20">
                <Fleet />
              </section>
              
              <section id="process" className="scroll-mt-20">
                <Process />
              </section>

              <Features />

              <section id="booking" className="scroll-mt-20">
                <Booking />
              </section>
              
              <section id="testimonials" className="scroll-mt-20">
                <Testimonials />
              </section>
              
              <section id="faq" className="scroll-mt-20">
                <FAQ />
              </section>
            </main>

            <Footer />
            
            <AIConcierge />
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;