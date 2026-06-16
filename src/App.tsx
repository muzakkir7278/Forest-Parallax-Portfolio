/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TreePine, 
  Menu, 
  X, 
  Sparkles, 
  CloudFog, 
  Compass, 
  Clock, 
  Eye, 
  Camera 
} from 'lucide-react';

import ParallaxHero from './components/ParallaxHero';
import GalleryGrid from './components/GalleryGrid';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('canopy');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ambientSpecs, setAmbientSpecs] = useState({
    fogIntensity: '84%',
    daylightHour: '06:42',
    windVelocity: '3.6 m/s',
    elevationSpot: '1,420m'
  });

  // Track page scroll to style navbar and trigger section active states
  useEffect(() => {
    const handleScroll = () => {
      // 1. Navbar style trigger
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Section anchor tracker
      const scrollPos = window.scrollY + 200;
      const heroSec = document.getElementById('hero-parallax-section');
      const gallerySec = document.getElementById('portfolio-gallery');
      const contactSec = document.getElementById('contact-coordinates');

      if (contactSec && scrollPos >= contactSec.offsetTop) {
        setActiveSection('desk');
      } else if (gallerySec && scrollPos >= gallerySec.offsetTop) {
        setActiveSection('spec');
      } else {
        setActiveSection('canopy');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Soft randomizer for ambient specs to make the weather deck feel live
  useEffect(() => {
    const interval = setInterval(() => {
      setAmbientSpecs(prev => {
        const randFog = Math.max(76, Math.min(94, parseInt(prev.fogIntensity) + (Math.random() > 0.5 ? 1 : -1)));
        const randWind = (3.0 + Math.random() * 2).toFixed(1);
        return {
          ...prev,
          fogIntensity: `${randFog}%`,
          windVelocity: `${randWind} m/s`
        };
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Canopy Top', id: 'hero-parallax-section', key: 'canopy' },
    { label: 'Spec Archive', id: 'portfolio-gallery', key: 'spec' },
    { label: 'Field Desk', id: 'contact-coordinates', key: 'desk' }
  ];

  return (
    <div className="bg-[#050d0a] text-white font-sans antialiased selection:bg-[#cfbe9b] selection:text-[#050d0a]">
      
      {/* GLASS FIXED HEADER NAVBAR */}
      <header 
        id="app-scout-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b
          ${scrolled 
            ? 'py-3.5 bg-[#050d0ad9] backdrop-blur-md border-emerald-950/40 shadow-xl' 
            : 'py-6 bg-transparent border-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <button 
            onClick={() => scrollToSection('hero-parallax-section')}
            className="flex items-center space-x-2 text-white group cursor-pointer focus:outline-none"
            title="Muzakkir Archives"
          >
            <TreePine className="w-5 h-5 text-[#d1b06a] group-hover:scale-115 transition-transform" />
            <span className="font-sans text-[13px] md:text-sm font-semibold tracking-[0.2em] uppercase">
              MUZAKKIR <span className="font-serif italic font-medium text-[#dcc291]">ARCHIVE</span>
            </span>
          </button>

          {/* Desktop Navigation Link Deck */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const active = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-[11px] font-mono uppercase tracking-[0.25em] transition-all relative py-1 cursor-pointer focus:outline-none
                    ${active ? 'text-[#d1b06a]' : 'text-[#8ca397] hover:text-white'}
                  `}
                >
                  <span>{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d1b06a]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button Desktop */}
          <button
            onClick={() => scrollToSection('contact-coordinates')}
            className="hidden md:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-emerald-800/40 bg-emerald-950/20 text-[#cfbe9b] hover:text-[#050e0c] hover:bg-[#cfbe9b] hover:border-[#cfbe9b] transition-all duration-300 font-mono text-[10px] tracking-wider uppercase cursor-pointer focus:outline-none"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>ENLIST SCOUT</span>
          </button>

          {/* Mobile Hamburg Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-emerald-950/30 border border-emerald-900/20 flex items-center justify-center text-[#cfbe9b] cursor-pointer focus:outline-none"
            aria-label="Toggle navigation deck"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* MOBILE FULLSCREEN NAVIGATION DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050d0a] pt-24 px-6 flex flex-col justify-between pb-10"
          >
            <div className="space-y-8 flex flex-col items-center text-center mt-12">
              {navItems.map((item) => {
                const active = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-xl font-sans tracking-wide block cursor-pointer select-none focus:outline-none
                      ${active ? 'text-[#d1b06a] font-medium' : 'text-gray-400 hover:text-white'}
                    `}
                  >
                    {item.label}
                  </button>
                );
              })}

              <button
                onClick={() => scrollToSection('contact-coordinates')}
                className="mt-4 px-8 py-3 rounded-full bg-[#cfbe9b] text-[#050d0a] font-mono text-xs font-semibold tracking-wider uppercase cursor-pointer"
              >
                REQUEST PROJECT LICENSE
              </button>
            </div>

            {/* Mobile Footer brand */}
            <div className="text-center">
              <TreePine className="w-5 h-5 text-[#d1b06a] mx-auto mb-2" />
              <p className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">
                Seattle Studio • Established 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. SEAMLESS FOREST PARALLAX HERO LAYER */}
      <ParallaxHero />

      {/* 2. ATMOSPHERIC EDITORIAL INTRO SEGMENT */}
      <section className="py-24 bg-gradient-to-b from-[#040807] to-[#040807] relative overflow-hidden select-none">
        
        {/* Subtle background specs details layout (coordinates, weather parameters) */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Focal Spec Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-2 text-[#d1b06a] font-mono text-xs uppercase tracking-widest">
                <span>01 / PRELUDE ARCHIVES</span>
              </div>
              
              <blockquote className="font-serif italic text-2xl md:text-3.5xl lg:text-4xl text-gray-200 font-light leading-snug">
                "In the silence of the redwood spires, I found a clean language. No noise, no marketing slop — only daylight filtering through ancient spruce bark and the ancient ferns."
              </blockquote>
              
              <div className="flex items-center space-x-3 pt-2">
                <div className="h-0.5 w-8 bg-[#d1b06a]" />
                <span className="font-sans text-xs uppercase tracking-widest text-[#cfbe9b]">Muzakkir, Wilderness Naturalist</span>
              </div>
            </div>

            {/* Bento-style Live Weather Dashboard Widget (ColSPAN 5) */}
            <div className="lg:col-span-5 bg-[#08120ebd] border border-emerald-950/60 p-6 md:p-8 rounded-2xl shadow-2xl relative">
              <span className="font-mono text-[9px] text-[#cfbe9b] tracking-[0.25em] block mb-5 uppercase">
                Live Field Atmospheric Stats
              </span>

              <div className="grid grid-cols-2 gap-4">
                
                {/* Metric 1 */}
                <div className="bg-[#050e0c]/85 p-3.5 rounded-xl border border-emerald-950/30 flex items-center space-x-3">
                  <CloudFog className="w-5 h-5 text-[#d1b06a] shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Fog level</span>
                    <span className="text-sm font-semibold font-mono text-white transition-all duration-500">
                      {ambientSpecs.fogIntensity}
                    </span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-[#050e0c]/85 p-3.5 rounded-xl border border-emerald-950/30 flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#d1b06a] shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Dawn Aperture</span>
                    <span className="text-sm font-semibold font-mono text-white">
                      {ambientSpecs.daylightHour}
                    </span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-[#050e0c]/85 p-3.5 rounded-xl border border-emerald-950/30 flex items-center space-x-3">
                  <Compass className="w-5 h-5 text-[#d1b06a] shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Elevation Spot</span>
                    <span className="text-sm font-semibold font-mono text-white">
                      {ambientSpecs.elevationSpot}
                    </span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-[#050e0c]/85 p-3.5 rounded-xl border border-emerald-950/30 flex items-center space-x-3">
                  <Camera className="w-5 h-5 text-[#d1b06a] shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Wind Sweep</span>
                    <span className="text-sm font-semibold font-mono text-white transition-all duration-500">
                      {ambientSpecs.windVelocity}
                    </span>
                  </div>
                </div>

              </div>

              {/* Status footer line */}
              <div className="flex items-center space-x-2 text-[10px] text-[#6c8577]/80 font-mono mt-6 pt-4 border-t border-emerald-950/60 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Telemetry servers connected to cascade logging desks.</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 3. HIGH-RESOLUTION PORTFOLIO GALLERY GRID */}
      <GalleryGrid />

      {/* 4. THE COHERENT FIELD CONTACT FORM */}
      <ContactForm />

      {/* 5. PORTFOLIO FOOTER & SOCIAL LINKS */}
      <Footer />

    </div>
  );
}
