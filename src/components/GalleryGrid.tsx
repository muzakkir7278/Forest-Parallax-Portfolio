/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_PHOTOS, PHOTO_CATEGORIES } from '../data';
import { Photo } from '../types';
import { 
  MapPin, 
  Calendar, 
  Camera, 
  Settings, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share2, 
  Info, 
  Check 
} from 'lucide-react';

interface LazyImageProps {
  photo: Photo;
  onClick: () => void;
}

// Subcomponent to handle lazy loading with custom blur/shimmer state
function LazyImage({ photo, onClick }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Simple observer-like lazy loading activation
    const timer = setTimeout(() => setInView(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-[#0a1411] cursor-pointer group"
      onClick={onClick}
    >
      {/* Loading Shimmer Card */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0c1a17] via-[#091411] to-[#040807] animate-pulse">
          <Camera className="w-8 h-8 text-[#d1b06a]/20 mb-2" />
          <div className="h-2 w-24 bg-emerald-950/40 rounded"></div>
        </div>
      )}

      {/* Actual High-Res Image */}
      {inView && (
        <img
          src={photo.src}
          alt={photo.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-[1200ms] ease-out select-none
            ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'}
            group-hover:scale-105 group-hover:brightness-[0.95]
          `}
        />
      )}

      {/* Elegant Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#040907] via-[#040907]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 md:p-6 z-10">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <div className="flex items-center space-x-2 text-[10px] text-[#cfbe9b] font-mono tracking-wider mb-1.5 uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#d1b06a]" />
            <span>{photo.location}</span>
          </div>
          <h3 className="text-white font-sans text-lg font-medium leading-tight">
            {photo.title}
          </h3>
          <p className="text-[#8ca397] text-xs font-light mt-1 line-clamp-2">
            {photo.description}
          </p>
          <div className="flex items-center justify-between mt-4 border-t border-emerald-950/55 pt-3">
            <span className="text-[10px] text-gray-400 font-mono">
              {photo.exif.camera.replace("Sony ", "").replace("Canon ", "").replace("Fujifilm ", "")}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-[#d1b06a] font-mono">
              <Settings className="w-3 h-3" />
              <span>{photo.exif.aperture} • {photo.exif.shutterSpeed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expand Icon Badge */}
      <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#050e0c]/80 border border-emerald-950/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
        <Maximize2 className="w-3.5 h-3.5 text-white/85" />
      </div>
    </div>
  );
}

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Filter photos dynamically based on state
  const filteredPhotos = activeCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(photo => photo.category === activeCategory);

  const openLightbox = (index: number) => {
    // We map back to the real index in current filtered category
    setSelectedPhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    document.body.style.overflow = 'unset';
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (selectedPhotoIndex === null) return;
    let nextIndex = selectedPhotoIndex;
    if (direction === 'next') {
      nextIndex = (selectedPhotoIndex + 1) % filteredPhotos.length;
    } else {
      nextIndex = (selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    }
    setSelectedPhotoIndex(nextIndex);
  };

  // Keyboard navigation support for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos]);

  const handleDownload = (photo: Photo) => {
    setDownloadSuccess(true);
    // Simulate real-world photograph packaging setup
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  const currentPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <section id="portfolio-gallery" className="py-24 bg-[#040807] border-t border-emerald-950/20 relative">
      {/* Ambient backgrounds */}
      <div className="absolute top-[10%] left-0 w-80 h-80 rounded-full bg-[#dcc291]/[0.015] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-0 w-96 h-96 rounded-full bg-[#0d2a20]/[0.05] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="h-6 w-[2px] bg-gradient-to-b from-[#cfbe9b] to-transparent mb-5" />
          <span className="font-mono text-xs text-[#d1b06a] tracking-[0.3em] uppercase">GALLERY IN FOCUS</span>
          <h2 className="font-sans text-3xl md:text-5xl font-light text-[#fbfdfb] tracking-tight mt-3">
            The <span className="font-serif italic text-[#dfcaa5]">Archival</span> Chronicles
          </h2>
          <p className="text-[#8ca397] font-light text-sm max-w-xl mt-4 leading-relaxed">
            High-resolution medium format captures revealing the hushed atmospheres, ancient bark textures, and wild life elements lingering deep within northern forests.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3 mb-16">
          {PHOTO_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer focus:outline-none border
                  ${isActive 
                    ? 'text-[#050e0c] bg-[#cfbe9b] border-[#cfbe9b] font-medium' 
                    : 'text-[#8ca397] bg-[#0c1311]/50 border-emerald-950/30 hover:text-white hover:bg-emerald-950/20 hover:border-emerald-800/20'
                  }
                `}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Photography Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => {
              // Create stagger and layout effects
              const isTall = index % 3 === 0;
              return (
                <motion.div
                  key={photo.id}
                  layout
                  id={`gallery-item-${photo.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className={`relative overflow-hidden rounded-xl border border-emerald-950/40 shadow-2xl h-[380px] sm:h-[450px]
                    ${isTall ? 'lg:col-span-1' : ''}
                  `}
                >
                  <LazyImage 
                    photo={photo} 
                    onClick={() => openLightbox(index)} 
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-24 text-gray-500 font-mono text-xs uppercase tracking-widest border border-dashed border-emerald-950/30 rounded-xl">
            No negatives matching this forest floor filter index.
          </div>
        )}
      </div>

      {/* Cinematic Detail Lightbox Overlay Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col lg:flex-row bg-[#030605] overflow-y-auto lg:overflow-hidden"
          >
            {/* Visual Canvas Block (Left/Center) */}
            <div className="relative flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12 h-[65vh] lg:h-full select-none bg-[#020403]">
              
              {/* Close Button Mobile (Sticky) */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 left-4 z-50 w-10 h-10 rounded-full bg-[#08110e]/75 backdrop-blur-md border border-emerald-900/30 flex items-center justify-center text-white cursor-pointer hover:bg-[#cfbe9b] hover:text-[#050e0c] transition-colors focus:outline-none"
                title="Exit Gallery Viewer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                className="absolute left-4 md:left-8 z-30 w-12 h-12 rounded-full bg-[#08110e]/45 backdrop-blur-sm border border-emerald-900/20 flex items-center justify-center text-[#cfbe9b] cursor-pointer hover:bg-[#cfbe9b] hover:text-[#050e0c] transition-all focus:outline-none"
                title="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                className="absolute right-4 md:right-8 z-30 w-12 h-12 rounded-full bg-[#08110e]/45 backdrop-blur-sm border border-emerald-900/20 flex items-center justify-center text-[#cfbe9b] cursor-pointer hover:bg-[#cfbe9b] hover:text-[#050e0c] transition-all focus:outline-none"
                title="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Central high resolution photo loaded natively with Referrer constraint */}
              <motion.div
                key={currentPhoto.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="max-w-full max-h-[100%] rounded-lg shadow-2xl relative"
              >
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[55vh] lg:max-h-[85vh] object-contain rounded border-2 border-emerald-950/20"
                />
              </motion.div>
            </div>

            {/* Spec Sheet & Metadata Drawer (Right) */}
            <div className="w-full lg:w-[420px] bg-[#050c09] border-t lg:border-t-0 lg:border-l border-emerald-950/60 p-6 md:p-8 flex flex-col justify-between h-auto lg:h-full overflow-y-auto">
              
              <div>
                {/* Header Actions Desktop */}
                <div className="flex items-center justify-between border-b border-emerald-950 pb-5 mb-6">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#d1b06a]">
                    <Info className="w-4 h-4" />
                    <span>SPECIFICATION SHEET</span>
                  </div>
                  <button
                    onClick={closeLightbox}
                    className="hidden lg:flex w-8 h-8 rounded-full bg-emerald-950/30 border border-emerald-900/30 items-center justify-center text-white/70 hover:bg-[#cfbe9b] hover:text-[#050e0c] transition-all cursor-pointer focus:outline-none"
                    title="Exit Viewer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Main Photo Story */}
                <h2 className="font-sans text-2xl font-light text-white tracking-tight">{currentPhoto.title}</h2>
                <div className="flex flex-col gap-2 mt-4 text-[#8ca397] text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#d1b06a]" />
                    <span>{currentPhoto.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#d1b06a]" />
                    <span>Captured: {currentPhoto.date}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm font-light mt-5 leading-relaxed">
                  {currentPhoto.description}
                </p>

                {/* CAMERA DEEP EXIF SPECS BLOCK */}
                <div className="mt-8">
                  <span className="font-mono text-[10px] tracking-widest text-[#cfbe9b] block mb-4 uppercase">
                    Core Technical Data
                  </span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* Camera */}
                    <div className="bg-[#08120e] p-3 rounded-lg border border-emerald-950/50 flex flex-col justify-between">
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block mb-1">Casing</span>
                      <div className="flex items-center gap-1.5 text-xs text-white">
                        <Camera className="w-3.5 h-3.5 text-[#d1b06a]" />
                        <span className="truncate">{currentPhoto.exif.camera}</span>
                      </div>
                    </div>
                    {/* Lens */}
                    <div className="bg-[#08120e] p-3 rounded-lg border border-emerald-950/50 flex flex-col justify-between">
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block mb-1">Glass</span>
                      <div className="flex items-center gap-1.5 text-xs text-white">
                        <Settings className="w-3.5 h-3.5 text-[#d1b06a]" />
                        <span className="truncate">{currentPhoto.exif.lens}</span>
                      </div>
                    </div>
                    {/* Aperture */}
                    <div className="bg-[#08120e] p-3 rounded-lg border border-emerald-950/50">
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block mb-1">Aperture</span>
                      <span className="text-sm font-mono text-white font-medium">{currentPhoto.exif.aperture}</span>
                    </div>
                    {/* Exposure */}
                    <div className="bg-[#08120e] p-3 rounded-lg border border-emerald-950/50">
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block mb-1">Aperture Speed</span>
                      <span className="text-sm font-mono text-white font-medium">{currentPhoto.exif.shutterSpeed}</span>
                    </div>
                    {/* ISO */}
                    <div className="bg-[#08120e] p-3 rounded-lg border border-emerald-950/50">
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block mb-1">Film Speed (ISO)</span>
                      <span className="text-sm font-mono text-white font-medium">{currentPhoto.exif.iso}</span>
                    </div>
                    {/* Focal Length */}
                    <div className="bg-[#08120e] p-3 rounded-lg border border-emerald-950/50">
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block mb-1">Focal Length</span>
                      <span className="text-sm font-mono text-white font-medium">{currentPhoto.exif.focalLength}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Interactive Engagement Blocks */}
              <div className="mt-8 pt-6 border-t border-emerald-950/60 flex items-center gap-3">
                <button
                  type="button"
                  id="action-btn-download"
                  onClick={() => handleDownload(currentPhoto)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#cfbe9b] hover:bg-[#e4d4b8] text-[#050e0c] font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all focus:outline-none"
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>NEGATIVES DOWNLOADED</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 animate-bounce" />
                      <span>DOWNLOAD HIGH-RES (RAW)</span>
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  id="action-btn-share"
                  onClick={handleShare}
                  className="p-3 rounded-xl bg-[#0a1410] border border-emerald-900/30 text-[#cfbe9b] hover:text-white hover:bg-emerald-950/30 transition-colors cursor-pointer focus:outline-none"
                  title="Copy Negative Coordinates Link"
                >
                  {shareSuccess ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
