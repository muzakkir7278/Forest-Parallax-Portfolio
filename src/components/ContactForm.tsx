/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Landmark, MessageSquare, Tag, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { ContactFormData } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: 'licensing',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Auto-save drafts to localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('forest_portfolio_contact_draft');
    if (savedDraft) {
      try {
        setFormData(JSON.parse(savedDraft));
      } catch (err) {
        console.error('Failed to parse cached contact draft', err);
      }
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    localStorage.setItem('forest_portfolio_contact_draft', JSON.stringify(updated));
  };

  const handleClearDraft = () => {
    const cleared = { name: '', email: '', subject: 'licensing', message: '' };
    setFormData(cleared);
    localStorage.removeItem('forest_portfolio_contact_draft');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate secure transmission to logging server
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      localStorage.removeItem('forest_portfolio_contact_draft');
    }, 1800);
  };

  return (
    <section id="contact-coordinates" className="py-24 bg-[#050d0a] border-t border-emerald-950/20 relative">
      <div className="absolute top-[40%] right-0 w-80 h-80 rounded-full bg-[#dcc291]/[0.01] blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 left-[10%] w-96 h-96 rounded-full bg-emerald-950/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="h-6 w-[2px] bg-gradient-to-b from-[#cfbe9b] to-transparent mb-5" />
          <span className="font-mono text-xs text-[#d1b06a] tracking-[0.3em] uppercase">FIELD DESK</span>
          <h2 className="font-sans text-3xl md:text-5xl font-light text-[#fbfdfb] tracking-tight mt-3">
            Initiate <span className="font-serif italic text-[#dfcaa5]">Inquiry</span>
          </h2>
          <p className="text-[#8ca397] font-light text-sm max-w-xl mt-4 leading-relaxed">
            Whether inquiring about premium photographic print licensing, field collaboration, or wilderness route consulting, transmit your coordinates below.
          </p>
        </div>

        {/* Bento Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          
          {/* Info Card Block (ColSPAN 5) */}
          <div className="lg:col-span-5 bg-[#08120e] border border-emerald-950/50 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            {/* Top design accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d1b06a]/5 rounded-bl-full pointer-events-none" />

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-white font-sans">Field Coordinates & Studio</h3>
                <p className="text-gray-400 text-xs font-mono tracking-wider uppercase mt-1">Seattle, Washington • USA</p>
              </div>

              <div className="space-y-6">
                
                {/* Channel 1 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-900/30 flex items-center justify-center text-[#d1b06a] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">Primary Transmissions</span>
                    <a href="mailto:okaymuzakkir@gmail.com" className="text-[#fbfdfb] hover:text-[#d1b06a] transition-colors text-sm font-light">
                      okaymuzakkir@gmail.com
                    </a>
                    <span className="text-xs text-[#8ca397] block mt-0.5">Encrypted PGP Available</span>
                  </div>
                </div>

                {/* Channel 2 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-900/30 flex items-center justify-center text-[#d1b06a] shrink-0 mt-0.5">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">Licensing Desk</span>
                    <span className="text-sm text-[#fbfdfb] font-light">Muzakkir Archival negatives</span>
                    <span className="text-xs text-[#8ca397] block mt-0.5">Represented by Redwood Fine Arts</span>
                  </div>
                </div>

                {/* Channel 3 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-900/30 flex items-center justify-center text-[#d1b06a] shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">Broadcasts</span>
                    <span className="text-sm text-[#fbfdfb] font-light">Direct scout dispatch radio</span>
                    <span className="text-xs text-[#8ca397] block mt-0.5">Status: Standby (Active Patrol)</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Design statement footer */}
            <div className="mt-12 pt-6 border-t border-emerald-950/55 text-[11px] text-[#6c8577]/70 font-mono leading-relaxed uppercase tracking-wider">
              <span>EST. 2026. ALL LANDSCAPE NEGATIVES SECURELY CLOUD ARCHIVED IN ULTRA-HIGH SPECTRUM CHROMATIC FORMATS.</span>
            </div>

          </div>

          {/* Form Block (ColSPAN 7) */}
          <div className="lg:col-span-7 bg-[#08120e] border border-emerald-950/50 rounded-2xl p-6 md:p-8 shadow-2xl relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Draft tracker panel */}
                  {formData.name || formData.email || formData.message ? (
                    <div className="bg-[#050e0c]/60 border border-emerald-950/80 px-4 py-2.5 rounded-xl flex items-center justify-between text-xs text-[#8ca397]">
                      <span className="font-mono">Unsent local draft cached</span>
                      <button
                        type="button"
                        onClick={handleClearDraft}
                        className="flex items-center gap-1.5 text-[#d1b06a] hover:text-[#e8d4b0] font-mono hover:underline cursor-pointer focus:outline-none"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="relative">
                      <label 
                        htmlFor="form-name"
                        className={`absolute left-4 top-3.5 text-xs font-mono tracking-wider uppercase transition-all duration-300 pointer-events-none
                          ${focusedField === 'name' || formData.name 
                            ? 'text-[#d1b06a] -translate-y-2.5 scale-75' 
                            : 'text-gray-500 translate-y-0 scale-100'
                          }
                        `}
                      >
                        Identifier Name
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-[#050e0c] border border-emerald-950/60 rounded-xl px-4 pt-6 pb-2 text-sm text-white focus:outline-none focus:border-[#d1b06a] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label 
                        htmlFor="form-email"
                        className={`absolute left-4 top-3.5 text-xs font-mono tracking-wider uppercase transition-all duration-300 pointer-events-none
                          ${focusedField === 'email' || formData.email 
                            ? 'text-[#d1b06a] -translate-y-2.5 scale-75' 
                            : 'text-gray-500 translate-y-0 scale-100'
                          }
                        `}
                      >
                        Email Coordinates
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-[#050e0c] border border-emerald-950/60 rounded-xl px-4 pt-6 pb-2 text-sm text-white focus:outline-none focus:border-[#d1b06a] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject selector */}
                  <div className="relative flex flex-col">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 mb-2 px-1">Inquiry Purpose</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'licensing', label: 'Licensing' },
                        { id: 'prints', label: 'Fine Prints' },
                        { id: 'scouting', label: 'Field Scout' },
                        { id: 'other', label: 'General' },
                      ].map((item) => {
                        const isSel = formData.subject === item.id;
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => {
                              const updated = { ...formData, subject: item.id };
                              setFormData(updated);
                              localStorage.setItem('forest_portfolio_contact_draft', JSON.stringify(updated));
                            }}
                            className={`px-3 py-3 rounded-xl border text-center font-mono text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer focus:outline-none
                              ${isSel 
                                ? 'bg-emerald-950/30 border-[#d1b06a] text-[#cfbe9b]' 
                                : 'bg-[#050e0c] border-emerald-950/60 text-gray-400 hover:border-emerald-800'
                              }
                            `}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label 
                      htmlFor="form-message"
                      className={`absolute left-4 top-3 text-xs font-mono tracking-wider uppercase transition-all duration-300 pointer-events-none
                        ${focusedField === 'message' || formData.message 
                          ? 'text-[#d1b06a] -translate-y-2 scale-75' 
                          : 'text-gray-500 translate-y-0 scale-100'
                        }
                      `}
                    >
                      Transmitted Message Detail
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-[#050e0c] border border-emerald-950/60 rounded-xl px-4 pt-6 pb-2.5 text-sm text-white focus:outline-none focus:border-[#d1b06a] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="contact-form-submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#cfbe9b] hover:bg-[#e4d4b8] text-[#050e0c] font-mono text-xs font-semibold tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer focus:outline-none relative overflow-hidden"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>LOCATING COORDINATES SERVER...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>TRANSMIT RADIO MESSAGE</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-light font-sans text-white">Transmission Recorded</h3>
                  <p className="text-gray-400 text-sm mt-3 max-w-sm leading-relaxed">
                    Message successfully dispatched. Your signal tag has been pinned to the studio queue. You will receive a secure email response within 24 forest patrol hours.
                  </p>
                  
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 px-6 py-2.5 rounded-full border border-emerald-900/40 text-xs font-mono tracking-wider text-[#cfbe9b] hover:text-white hover:bg-emerald-950/20 transition-all cursor-pointer focus:outline-none"
                  >
                    TRANSMIT ANOTHER SIGNAL
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
