/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Twitter, 
  Github, 
  Compass, 
  ArrowUp, 
  Mail, 
  Check, 
  TreePine,
  ShieldCheck
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { 
      name: 'Instagram', 
      url: 'https://instagram.com', 
      icon: <Instagram className="w-4 h-4" />,
      tag: '@muzakkir.scouts'
    },
    { 
      name: 'Unsplash', 
      url: 'https://unsplash.com', 
      icon: <Compass className="w-4 h-4" />,
      tag: 'muzakkir_negatives'
    },
    { 
      name: 'Twitter (X)', 
      url: 'https://twitter.com', 
      icon: <Twitter className="w-4 h-4" />,
      tag: '@muzakkir_scouts'
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com', 
      icon: <Github className="w-4 h-4" />,
      tag: 'muzakkir-dev'
    }
  ];

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030605] border-t border-emerald-950/60 relative overflow-hidden select-none">
      
      {/* Decorative Forest Canopy Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d1b06a]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Brand/Infiltration Panel (ColSPAN 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2 text-[#fbfdfb]">
              <TreePine className="w-6 h-6 text-[#d1b06a]" />
              <span className="font-sans text-lg font-light tracking-[0.1em] uppercase">MUZAKKIR <span className="font-serif italic font-medium text-[#dcc291]">STUDIOS</span></span>
            </div>
            
            <p className="text-[#8ca397] font-light text-xs leading-relaxed max-w-sm">
              Archiving the whispers of primeval woodlands, high-contrast mountain ridges, and pristine alpine basins through cinematic photography, preserving local wilderness coordinates for generational memory.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950/20 text-[#8ca397] font-mono text-[9px] uppercase tracking-wider border border-emerald-900/10">
                <ShieldCheck className="w-3 h-3 text-[#d1b06a]" /> No AI-Slop / Real Photos
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950/20 text-[#8ca397] font-mono text-[9px] uppercase tracking-wider border border-emerald-900/10">
                Medium Format RAW
              </span>
            </div>
          </div>

          {/* Social Media Link Grid (ColSPAN 4) */}
          <div className="lg:col-span-4 space-y-6">
            <span className="font-mono text-[10px] tracking-widest text-[#cfbe9b] uppercase block">
              Social Channels & Engagement
            </span>

            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#050c09] border border-emerald-950/50 hover:border-emerald-800 p-3.5 rounded-xl block group transition-all"
                >
                  <div className="flex items-center space-x-2 text-[#cfbe9b] group-hover:text-white transition-colors">
                    <span className="text-[#d1b06a] group-hover:scale-110 transition-transform">
                      {social.icon}
                    </span>
                    <span className="font-sans text-xs font-medium">{social.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 block mt-1.5 truncate">
                    {social.tag}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Wilderness club Newsletter (ColSPAN 4) */}
          <div className="lg:col-span-4 space-y-6">
            <span className="font-mono text-[10px] tracking-widest text-[#cfbe9b] uppercase block">
              Join the Wilderness Club
            </span>
            
            <p className="text-[#8ca397] font-light text-xs leading-relaxed">
              Subscribe to secure raw focal stats, field scouting itineraries, and private notifications on print drops or negative licensing contracts.
            </p>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="newsletter-form"
                  onSubmit={handleSubscribe}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      required
                      placeholder="Enter coordinates email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#050c09] border border-emerald-950/60 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d1b06a] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-3 px-5 sm:px-6 rounded-xl bg-[#cfbe9b] hover:bg-[#e4d4b8] text-[#050e0c] font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus:outline-none"
                  >
                    {isSubmitting ? (
                      <span className="animate-spin truncate font-mono">...</span>
                    ) : (
                      <span>DISPATCH</span>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="newsletter-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-950/30 border border-emerald-500/20 px-4 py-3 rounded-xl flex items-center justify-between text-xs text-emerald-400 font-mono"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Coordinates secured. Standby for reports.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* copyright metadata section */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-emerald-950/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-[11px] font-mono text-gray-500 tracking-wider text-center sm:text-left">
            <p>© 2026 MUZAKKIR PHOTO ARCHIVE. ALL RIGHTS PROTECTED UNDER CHROMATIC NEGATIVE CONTRACTS.</p>
            <p className="text-[#6c8577]/40 uppercase mt-1">CRAFTED FOR NATURALISTS, PATHFINDERS & FINE ARTS ENTHUSIASTS.</p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 py-2.5 px-4 rounded-full bg-[#050c09] border border-emerald-950/50 hover:border-[#d1b06a]/40 text-[#cfbe9b] hover:text-white text-xs font-mono tracking-widest transition-all cursor-pointer focus:outline-none"
            title="Return to Forest Canopy"
          >
            <span>GLANCE UPWARDS</span>
            <ArrowUp className="w-3.5 h-3.5 animate-bounce text-[#d1b06a]" />
          </button>
        </div>

      </div>
    </footer>
  );
}
