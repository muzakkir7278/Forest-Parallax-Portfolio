/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Compass, Camera, TreePine, ChevronDown } from 'lucide-react';

export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  // Core scroll trackers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Track window resizing for responsive parallax offsets
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Parallax transformations calibrated for smooth depth layering
  const ySky = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const yDistantHills = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const yMidHills = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  
  // Foreground layers displace slightly downwards or remain static to anchor the transition
  const yForeTrees = useTransform(scrollYProgress, [0, 1], ['0%', '4%']);
  const yMistLayer = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  const scrollToContent = () => {
    const gallerySection = document.getElementById('portfolio-gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="hero-parallax-section"
      ref={containerRef}
      className="relative w-full h-[105vh] overflow-hidden bg-[#050d0a] select-none"
    >
      {/* 1. SKY / MIST BACKDROP */}
      <motion.div
        style={{ y: ySky }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#081f18] via-[#091b15] to-[#040807]" />
        {/* Glowing Sunburst / Light Source */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-radial from-[#e8cf9c18] via-[#e2c18008] to-transparent blur-3xl opacity-80" />
        
        {/* Delicate floating dust particles simulating mist */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d6c093_1px,transparent_1px)] [background-size:32px_32px]" />
      </motion.div>

      {/* 2. DISTANT RIDGE AND FAR PINES */}
      <motion.div
        style={{ y: yDistantHills }}
        className="absolute inset-0 w-full h-full top-[15%] pointer-events-none"
      >
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-[40%] min-h-[250px] fill-[#0d2a20]"
          preserveAspectRatio="none"
        >
          <path d="M0,230 L45,215 L90,200 L135,210 L180,225 L225,210 L270,185 L315,190 L360,205 L405,195 L450,170 L495,190 L540,215 L585,195 L630,210 L675,230 L720,205 L765,180 L810,195 L855,220 L900,200 L945,175 L990,190 L1035,215 L1080,210 L1125,185 L1170,195 L1215,220 L1260,205 L1305,215 L1350,230 L1440,210 L1440,320 L0,320 Z" />
          {/* Subtle details of far spruce tops */}
          <path opacity="0.4" d="M0,240 C100,220 200,210 300,225 C400,240 500,210 600,220 C700,230 800,210 900,230 C1000,250 1100,220 1200,215 C1300,210 1380,225 1440,235 L1440,320 L0,320 Z" />
        </svg>
      </motion.div>

      {/* 3. DYNAMIC PORTFOLIO TYPOGRAPHY (Layered Behind Trees) */}
      <motion.div
        style={{ y: yText, opacity: textOpacity, scale: textScale }}
        className="absolute inset-x-0 top-[28%] md:top-[25%] flex flex-col items-center justify-center text-center z-10 px-4 pointer-events-none"
      >
        <div className="flex items-center space-x-2 mb-4 bg-emerald-950/45 border border-emerald-800/40 backdrop-blur-md px-4 py-1.5 rounded-full text-[#cfbe9b] tracking-[0.2em] text-[10px] md:text-xs">
          <Camera className="w-3.5 h-3.5 animate-pulse text-[#d1b06a]" />
          <span>FOREST PORTFOLIO</span>
        </div>
        
        <h1 className="font-sans text-[11vw] xs:text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-[#fbfdfb] via-[#e2ebdf] to-[#b3c7b3] font-light tracking-[-0.03em] select-none text-shadow">
          SILENT <span className="font-serif italic font-medium text-[#dcc291]">CANOPY</span>
        </h1>
        
        <p className="font-mono mt-5 text-[11px] md:text-sm text-[#8ca397] tracking-[0.35em] uppercase font-light max-w-lg leading-relaxed">
          The Nature Photography of Muzakkir
        </p>
        
        <div className="mt-8 flex items-center justify-center space-x-8 text-[11px] text-[#6c8577]/70 tracking-widest uppercase font-mono hidden md:flex">
          <span className="flex items-center gap-1"><Compass className="w-3 h-3 text-[#d1b06a]/70" /> 47.9691° N, 122.3850° W</span>
          <span>•</span>
          <span className="flex items-center gap-1"><TreePine className="w-3 h-3 text-[#d1b06a]/70" /> RAW COLLECTION</span>
        </div>
      </motion.div>

      {/* 4. MIDGROUND SILHOUETTE PINES */}
      <motion.div
        style={{ y: yMidHills }}
        className="absolute inset-0 w-full h-full top-[10%] pointer-events-none z-20"
      >
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-[52%] min-h-[300px] fill-[#061e15]"
          preserveAspectRatio="none"
        >
          {/* Detailed layered forest tooth-paths */}
          <path d="M0,210 L15,190 L20,205 L35,175 L40,195 L60,165 L70,185 L90,140 L100,165 L115,150 L130,175 L145,155 L160,190 L180,145 L195,170 L210,135 L225,160 L240,150 L260,185 L280,130 L300,165 L320,150 L340,175 L360,160 L380,195 L400,125 L420,170 L440,145 L460,180 L480,160 L500,200 L520,135 L540,170 L560,150 L585,185 L605,140 L620,165 L640,155 L660,185 L680,120 L700,175 L720,150 L740,190 L760,135 L780,165 L800,150 L820,180 L840,165 L860,205 L880,140 L900,175 L920,155 L940,185 L960,160 L980,195 L1000,115 L1020,165 L1040,145 L1060,180 L1080,155 L1100,190 L1120,130 L1140,165 L1160,150 L1185,185 L1205,140 L1220,165 L1240,150 L1260,185 L1280,125 L1300,170 L1320,150 L1340,185 L1360,165 L1380,195 L1400,135 L1420,170 L1440,145 L1440,320 L0,320 Z" />
        </svg>

        {/* Ambient forest fog layer between midground and foreground */}
        <motion.div
          style={{ y: yMistLayer }}
          className="absolute bottom-[-10px] left-0 right-0 h-[100px] bg-gradient-to-t from-[#061811] via-[#081e15fa]/30 to-transparent pointer-events-none opacity-80"
        />
      </motion.div>

      {/* 5. FOREGROUND HEAVY REDWOOD OUTLINES */}
      <motion.div
        style={{ y: yForeTrees }}
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
      >
        {/* Left framing redwood trunk & soft leaves */}
        <div className="absolute left-[-20px] md:left-[-10px] bottom-0 w-[40%] md:w-[25%] h-[85%] bg-gradient-to-r from-[#030907] via-[#040e0b]/92 to-transparent opacity-95">
          {/* SVG detailed redwood bark texture overlay & foliage elements */}
          <svg className="absolute inset-0 w-full h-full text-[#020504]/90" preserveAspectRatio="none" viewBox="0 0 100 800">
            <path fill="currentColor" d="M0,0 Q15,400 30,800 L0,800 Z" />
            <path fill="currentColor" opacity="0.75" d="M5,100 C25,120 40,80 50,150 C40,160 20,150 5,200" />
            <path fill="currentColor" opacity="0.65" d="M10,240 C35,260 50,225 65,300 C45,310 25,290 10,330" />
            <path fill="currentColor" opacity="0.8" d="M15,400 Q45,380 55,480 Q35,500 15,540 M2,60 C40,90 20,40 2,120" />
          </svg>
        </div>

        {/* Right framing redwood trunk & hanging branches */}
        <div className="absolute right-[-20px] md:right-[-10px] bottom-0 w-[45%] md:w-[28%] h-[90%] bg-gradient-to-l from-[#030907] via-[#040e0b]/95 to-transparent opacity-95">
          <svg className="absolute inset-0 w-full h-full text-[#010302]" preserveAspectRatio="none" viewBox="0 0 100 800">
            <path fill="currentColor" d="M100,0 Q80,350 70,800 L100,800 Z" />
            {/* Elegant hanging needle ferns */}
            <path fill="currentColor" opacity="0.75" d="M95,80 C75,100 55,130 35,110 C50,140 75,130 95,160" />
            <path fill="currentColor" opacity="0.65" d="M90,220 Q60,250 40,230 Q60,270 85,260 Q65,290 90,320" />
            <path fill="currentColor" opacity="0.8" d="M92,390 C62,370 42,430 22,410 C42,440 72,420 92,460" />
          </svg>
        </div>

        {/* Dynamic Foreground Moss Floor Layer */}
        <svg
          viewBox="0 0 1440 180"
          className="absolute bottom-[-1px] w-full h-[18%] md:h-[12%] fill-[#040807] z-40"
          preserveAspectRatio="none"
        >
          <path d="M0,120 C120,90 240,110 360,135 C480,160 600,110 720,130 C840,150 960,115 1080,140 C1200,165 1320,120 1440,145 L1440,180 L0,180 Z" />
          {/* Subtle textured hills overlay for moss depth */}
          <path opacity="0.6" d="M0,140 C140,120 280,140 420,155 C560,170 700,140 840,150 C980,160 1120,135 1260,160 C1380,150 1420,165 1440,170 L1440,180 L0,180 Z" />
        </svg>

        {/* Bottom Radial Shadow vignette to ease transition into the page content */}
        <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-[#040807] via-[#040807]/50 to-transparent z-50 pointer-events-none" />
      </motion.div>

      {/* Floating Scrolling Guidance UI */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
          title="Scroll to Portfolio"
        >
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#cfbe9b] group-hover:text-white transition-colors duration-300">
            MUSEUM ENTRANCE
          </span>
          <div className="w-[18px] h-[30px] rounded-full border border-[#cfbe9b]/40 flex items-start justify-center p-1 group-hover:border-[#cfbe9b]/80 transition-colors duration-300">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-[#d1b06a]"
            />
          </div>
          <ChevronDown className="w-4 h-4 text-[#cfbe9b] mt-1 group-hover:text-white transition-colors" />
        </motion.button>
      </div>
    </div>
  );
}
