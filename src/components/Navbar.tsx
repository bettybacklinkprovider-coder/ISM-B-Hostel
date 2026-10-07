import React, { useState } from 'react';
import { Menu, X, Calendar, Globe, Briefcase } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
  bookingsCount: number;
  currency: string;
  setCurrency: (cur: string) => void;
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

export default function Navbar({
  activeTab,
  onNavigate,
  onOpenBooking,
  bookingsCount,
  currency,
  setCurrency,
  language,
  setLanguage
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const navItems = [
    { label: t.home, id: 'home' },
    { label: t.rooms, id: 'rooms' },
    { label: t.about, id: 'about' },
    { label: t.contact, id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold-800/40 bg-[#0f041c]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Glow-accented logo representation (Crescent & Star theme) */}
        <div className="flex items-center gap-3">
          <svg className="h-8 w-8 text-gold-400 drop-shadow-[0_0_8px_rgba(204,164,59,0.5)] cursor-pointer" viewBox="0 0 24 24" fill="currentColor" onClick={() => handleNavClick('home')}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79 1.5.73 3.35.45 4.54-.74 1.25-1.25 1.45-3.15.54-4.63.16-.01.32-.01.49-.01 4.08 0 7.44 3.05 7.93 7h-6.17c-.41 0-.75.34-.75.75v5.55z" />
          </svg>
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            className="flex flex-col items-start leading-none"
          >
            <span className="font-display text-sm font-extrabold tracking-widest text-gold-400 hover:text-gold-300 transition-colors uppercase whitespace-nowrap shrink-0 md:text-base">
              {t.logo}
            </span>
            <span className="text-[10px] text-neutral-400 font-sans tracking-wider mt-0.5 font-bold">
              {t.logoAr}
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
              className={`text-sm font-medium tracking-wide transition-all hover:text-gold-400 relative py-2 ${
                activeTab === item.id
                  ? 'text-gold-400 font-bold'
                  : 'text-neutral-300'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gold-400 rounded-full" />
              )}
            </a>
          ))}
          
          {/* My Stay link */}
          <a
            href="#bookings"
            onClick={(e) => { e.preventDefault(); handleNavClick('bookings'); }}
            className={`text-sm font-medium tracking-wide transition-all hover:text-gold-400 relative py-2 flex items-center gap-1.5 ${
              activeTab === 'bookings' ? 'text-gold-400 font-bold' : 'text-neutral-300'
            }`}
          >
            <Briefcase className="w-4 h-4 text-gold-500" />
            <span>{t.myStay}</span>
            {bookingsCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-brand-purple-950 font-mono">
                {bookingsCount}
              </span>
            )}
          </a>
        </nav>

        {/* Zone 3: Primary Actions (Currency Selection + Language Toggle + Book Stay CTA) */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Elegant Language Switcher */}
          <div className="flex items-center gap-1.5 rounded-md border border-gold-800/50 bg-[#1b0a2e] px-2.5 py-1 text-xs text-gold-200">
            <Globe className="h-3.5 w-3.5 text-gold-500" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
              className="bg-transparent font-bold focus:outline-none cursor-pointer text-gold-200 text-xs"
            >
              <option value="en" className="bg-[#1b0a2e] text-neutral-100">English (EN)</option>
              <option value="ar" className="bg-[#1b0a2e] text-neutral-100">العربية (AR)</option>
            </select>
          </div>

          {/* Compact Currency Switcher */}
          <div className="flex items-center gap-1.5 rounded-md border border-gold-800/50 bg-[#1b0a2e] px-2.5 py-1 text-xs text-gold-200">
            <span className="text-[11px] font-bold text-gold-500">💰</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent font-bold focus:outline-none cursor-pointer text-gold-200 text-xs"
            >
              <option value="AED" className="bg-[#1b0a2e] text-neutral-100">AED (د.إ)</option>
              <option value="USD" className="bg-[#1b0a2e] text-neutral-100">USD ($)</option>
              <option value="EUR" className="bg-[#1b0a2e] text-neutral-100">EUR (€)</option>
              <option value="INR" className="bg-[#1b0a2e] text-neutral-100">INR (₹)</option>
            </select>
          </div>

          <button
            onClick={onOpenBooking}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-gold-400 bg-gradient-to-r from-gold-600 to-gold-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-purple-950 shadow-md transition-all hover:brightness-110 active:scale-95 whitespace-nowrap font-sans"
          >
            <Calendar className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
            <span>{t.bookStay}</span>
          </button>
        </div>

        {/* Mobile items */}
        <div className="flex items-center gap-2 lg:hidden">
          {bookingsCount > 0 && (
            <button
              onClick={() => handleNavClick('bookings')}
              className="relative p-2 rounded-full border border-gold-800/60 bg-brand-purple-900/60 text-gold-400"
              aria-label="My stay details"
            >
              <Briefcase className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-400 text-[9px] font-bold text-brand-purple-950 font-mono">
                {bookingsCount}
              </span>
            </button>
          )}

          {/* Quick Language Toggle on Mobile */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
            className="rounded border border-gold-800/50 bg-[#1b0a2e] py-1 px-1.5 text-xs font-bold text-gold-200 focus:outline-none"
          >
            <option value="en" className="bg-[#1b0a2e]">EN</option>
            <option value="ar" className="bg-[#1b0a2e]">العربية</option>
          </select>

          {/* Quick Currency Selector on Mobile */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded border border-gold-800/50 bg-[#1b0a2e] py-1 px-1.5 text-xs font-bold text-gold-200 focus:outline-none"
          >
            <option value="AED" className="bg-[#1b0a2e]">AED</option>
            <option value="USD" className="bg-[#1b0a2e]">USD</option>
            <option value="EUR" className="bg-[#1b0a2e]">EUR</option>
            <option value="INR" className="bg-[#1b0a2e]">INR</option>
          </select>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-gold-400 hover:bg-brand-purple-800/40 focus:outline-none focus:ring-1 focus:ring-gold-400"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gold-800/30 bg-[#0f041c] py-4 shadow-xl transition-all animate-in fade-in slide-in-from-top duration-200">
          <div className="space-y-1.5 px-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-brand-purple-800/50 text-gold-400 border-l-2 border-gold-400'
                    : 'text-neutral-300 hover:bg-brand-purple-900/30 hover:text-gold-400'
                }`}
              >
                <span>{item.label}</span>
              </a>
            ))}
            
            <a
              href="#bookings"
              onClick={(e) => { e.preventDefault(); handleNavClick('bookings'); }}
              className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                activeTab === 'bookings'
                  ? 'bg-brand-purple-800/50 text-gold-400 border-l-2 border-gold-400'
                  : 'text-neutral-300 hover:bg-brand-purple-900/30 hover:text-gold-400'
              }`}
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gold-500" />
                <span>{t.myStay}</span>
              </span>
              {bookingsCount > 0 && (
                <span className="rounded-full bg-gold-400 px-2 py-0.5 text-xs font-bold text-brand-purple-950 font-mono">
                  {bookingsCount} {t.myStay}
                </span>
              )}
            </a>

            <div className="pt-4 pb-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
                className="w-full flex items-center justify-center gap-2 rounded-full border border-gold-400 bg-gradient-to-r from-gold-600 to-gold-400 py-3 text-sm font-bold uppercase tracking-wider text-brand-purple-950"
              >
                <Calendar className="h-4 w-4" />
                <span>{t.bookNow}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
