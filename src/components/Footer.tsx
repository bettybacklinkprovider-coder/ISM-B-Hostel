import React from 'react';
import { Phone, MapPin, Mail, Award, CheckCircle } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

interface FooterProps {
  onNavigate: (tab: string) => void;
  language: 'en' | 'ar';
}

export default function Footer({ onNavigate, language }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = TRANSLATIONS[language];

  return (
    <footer className="relative overflow-hidden border-t border-gold-800/40 bg-brand-purple-950 text-neutral-300">
      {/* Golden atmospheric ambient mesh behind the footer content */}
      <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-gold-600/10 blur-[100px]" />
      <div className="absolute -top-48 -left-48 h-96 w-96 rounded-full bg-brand-purple-800/30 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-16">
          
          {/* Column 1: Brand & Proximity */}
          <div className="space-y-6 text-start">
            <h3 className="font-display text-lg font-extrabold tracking-widest text-gold-400 uppercase flex flex-col">
              <span>{t.logo}</span>
              <span className="text-[11px] text-neutral-400 font-sans tracking-wide mt-1 font-bold">{t.logoAr}</span>
            </h3>
            <p className="text-xs leading-relaxed text-neutral-400 max-w-sm">
              {language === 'ar' 
                ? "إقامة راقية ممتازة في قلب العاصمة أبوظبي. نمزج الميزانية الاقتصادية لبيوت الشباب مع وسائل راحة وفخامة ذات لمسات ذهبية وبنفسجية عميقة."
                : "An elegant premium hostel stay right in the heart of Abu Dhabi. Melding the budget-friendly convenience of a social hostel with luxurious gold and deep purple high-end amenities."}
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-gold-300/80 font-medium">
                <CheckCircle className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{t.licensed}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gold-300/80 font-medium">
                <Award className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{t.premiumStandards}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Mirror */}
          <div className="space-y-6 text-start">
            <h4 className="font-display text-sm font-extrabold tracking-wider text-gold-300 uppercase">
              {language === 'ar' ? "روابط التصفح السريعة" : "Quick Navigation"}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <a
                  href="#home"
                  onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                  className="text-xs text-neutral-400 hover:text-gold-400 transition-colors"
                >
                  {t.home}
                </a>
                <a
                  href="#rooms"
                  onClick={(e) => { e.preventDefault(); onNavigate('rooms'); }}
                  className="text-xs text-neutral-400 hover:text-gold-400 transition-colors"
                >
                  {t.rooms}
                </a>
                <a
                  href="#about"
                  onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
                  className="text-xs text-neutral-400 hover:text-gold-400 transition-colors"
                >
                  {t.about}
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                  className="text-xs text-neutral-400 hover:text-gold-400 transition-colors"
                >
                  {t.contact}
                </a>
                <a
                  href="#bookings"
                  onClick={(e) => { e.preventDefault(); onNavigate('bookings'); }}
                  className="text-xs text-neutral-400 hover:text-gold-400 transition-colors"
                >
                  {t.myStay}
                </a>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                  className="text-xs text-neutral-400 hover:text-gold-400 transition-colors"
                >
                  {language === 'ar' ? "آراء الضيوف" : "Reviews Corner"}
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Complete Authorized Address */}
          <div className="space-y-6 text-start">
            <h4 className="font-display text-sm font-extrabold tracking-wider text-gold-300 uppercase">
              {language === 'ar' ? "قنوات الاتصال المباشر" : "Primary Contacts"}
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+971585213003"
                className="flex items-start gap-3 group text-neutral-300 hover:text-gold-400 transition-colors"
              >
                <Phone className="w-4 h-4 mt-0.5 text-gold-500 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-500 font-bold">{language === 'ar' ? "خط المساعدة المباشر والواتساب" : "Direct Line / WhatsApp"}</span>
                  <span className="text-xs font-extrabold tracking-wider font-mono">+971 58 521 3003</span>
                </div>
              </a>
              
              <div className="flex items-start gap-3 text-neutral-300">
                <MapPin className="w-4 h-4 mt-0.5 text-gold-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-500 font-bold">{language === 'ar' ? "موقع النزل والفيلا" : "Physical Address"}</span>
                  <p className="text-[11px] leading-relaxed text-neutral-400">
                    {language === 'ar'
                      ? "دولة الإمارات العربية المتحدة - أبوظبي - قطاع W52 - المشرف - خلف سفارة فيتنام - شارع القريب - فيلا ٣١"
                      : "Area - Sector - Villa 31 - Burq Al Mutla'iyyat Street - Al Qareeb St - Behind Vietnam Embassy - Al Mushrif - W52 - Abu Dhabi - United Arab Emirates"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-neutral-300">
                <Mail className="w-4 h-4 mt-0.5 text-gold-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-500 font-bold">{language === 'ar' ? "البريد الإلكتروني للاستفسارات" : "Inquiries Email"}</span>
                  <span className="text-xs font-mono text-neutral-400 hover:text-gold-400 cursor-pointer">bookings@abudhabihostel.ae</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Fine Gold Divider line */}
        <hr className="my-8 border-gold-800/30" />

        {/* Bottom copyright and legal mentions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} {t.logo}. {t.rightsReserved}</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gold-400 cursor-pointer transition-colors">{t.privacyPolicy}</span>
            <span aria-hidden="true" className="text-gold-800/60">·</span>
            <span className="hover:text-gold-400 cursor-pointer transition-colors">{t.termsOfStay}</span>
            <span aria-hidden="true" className="text-gold-800/60">·</span>
            <span className="text-neutral-600 font-mono">{t.sector}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
