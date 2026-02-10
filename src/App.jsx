import { useEffect, useState, useCallback } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyMe from './components/WhyMe';
import Portfolio from './components/Portfolio';
import CaseStudy from './components/CaseStudy';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import MuteToggle from './components/MuteToggle';
import KeyboardHints from './components/KeyboardHints';
import EasterEgg from './components/EasterEgg';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import SoundManager from './utils/SoundManager';

function App() {
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Initialize sound manager on mount
  useEffect(() => {
    const initSounds = () => {
      SoundManager.init();
    };
    // Initialize on first user interaction
    document.addEventListener('click', initSounds, { once: true });
    document.addEventListener('keydown', initSounds, { once: true });
    return () => {
      document.removeEventListener('click', initSounds);
      document.removeEventListener('keydown', initSounds);
    };
  }, []);

  // Keyboard navigation
  const handleToggleMute = useCallback(() => {
    SoundManager.toggleMute();
  }, []);

  const handleToggleShortcuts = useCallback((value) => {
    setShowShortcuts(prev => typeof value === 'boolean' ? value : !prev);
  }, []);

  useKeyboardNav({
    onToggleMute: handleToggleMute,
    onToggleShortcuts: handleToggleShortcuts,
  });

  useEffect(() => {
    // Scroll reveal with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Play transition sound for major sections
            if (entry.target.id) {
              SoundManager.transition();
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Enhanced Scroll Progress Bar */}
      <ScrollProgress />


      {/* Mute Toggle */}
      <MuteToggle />

      {/* Keyboard Hints */}
      <KeyboardHints
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

      {/* Easter Egg (Konami Code) */}
      <EasterEgg />

      <div className="bg-dark-900 text-white font-sans overflow-x-hidden min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <WhyMe />
        <Portfolio />
        <CaseStudy />
        <HowItWorks />
        <Testimonials />
        <CTA />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
