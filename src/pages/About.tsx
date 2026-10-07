import React from 'react';
import { Award, Users, Heart, CheckCircle, MapPin, Sparkles, Star } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

// Local high-fidelity image assets generated for ISM B Hostel
import majlisLobbyImg from '../assets/images/ismb_majlis_lobby_1791365365240.jpg';
import villaExteriorImg from '../assets/images/ismb_villa_exterior_1791365284917.jpg';

interface AboutProps {
  language: 'en' | 'ar';
}

export default function About({ language }: AboutProps) {
  const t = TRANSLATIONS[language];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-20 text-neutral-100">
      
      {/* Introduction Hero Area */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-start">
          <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block">{t.whoWeAre}</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-tight">
            {t.logo}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            {t.aboutDesc1}
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            {t.aboutDesc2}
          </p>
        </div>

        {/* Loaded Arabic Luxury Sitting Lounge Photo representation instead of empty template */}
        <div className="relative rounded-2xl overflow-hidden border border-gold-800/30 bg-[#0f041c] aspect-4/3 flex flex-col justify-between shadow-2xl group">
          <img 
            src={majlisLobbyImg} 
            alt="Hostel Majlis Lobby" 
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-purple-950 via-transparent to-black/30" />
          
          <div className="flex justify-between items-start z-10 p-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 bg-brand-purple-950/80 px-2.5 py-1 rounded border border-gold-800/30 font-mono">
              {language === 'ar' ? 'البوتيك المتميز' : 'Boutique Stay'}
            </span>
            <span className="text-[10px] text-neutral-300 font-sans font-bold bg-brand-purple-950/80 px-2.5 py-1 rounded border border-gold-800/30">
              {t.sector}
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 bg-brand-purple-950/80 mx-4 mb-4 rounded-xl border border-gold-800/20">
            <Sparkles className="w-10 h-10 text-gold-400 mb-2 animate-pulse" />
            <p className="font-display text-xs text-gold-300 uppercase tracking-widest font-extrabold">
              {language === 'ar' ? 'تصميم الضيافة الأنيق' : 'Luxury Hospitality Design'}
            </p>
            <p className="text-[10px] text-neutral-400 max-w-xs mt-1 leading-relaxed">
              {language === 'ar' 
                ? 'أرائك مخملية وراقية، وأرضيات رخامية فخمة، ولمسات ذهبية أنيقة تزين جميع صالات فيلا ٣١.'
                : 'Plush velvet sofas, marble finishes, elegant gold accents throughout the spaces.'}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block">{t.guidingCore}</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-100">
            {t.missionValues}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans">
            {t.missionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="rounded-xl border border-gold-800/20 bg-brand-purple-900/20 p-6 space-y-4 text-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/20">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-extrabold text-neutral-100 uppercase tracking-wide">{t.value1Title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              {t.value1Desc}
            </p>
          </div>

          <div className="rounded-xl border border-gold-800/20 bg-brand-purple-900/20 p-6 space-y-4 text-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/20">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-extrabold text-neutral-100 uppercase tracking-wide">{t.value2Title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              {t.value2Desc}
            </p>
          </div>

          <div className="rounded-xl border border-gold-800/20 bg-brand-purple-900/20 p-6 space-y-4 text-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/20">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-extrabold text-neutral-100 uppercase tracking-wide">{t.value3Title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              {t.value3Desc}
            </p>
          </div>

        </div>
      </section>

      {/* Facilities & Services detailed grid */}
      <section className="bg-brand-purple-900/10 rounded-2xl border border-gold-800/20 p-8 sm:p-12 space-y-10">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block">{t.villaAmenities}</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-100">
            {t.facilitiesServices}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans">
            {t.facilitiesDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
          
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-neutral-100">{t.facility1Title}</h4>
              <p className="text-xs text-neutral-400 mt-0.5">{t.facility1Desc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-neutral-100">{t.facility2Title}</h4>
              <p className="text-xs text-neutral-400 mt-0.5">{t.facility2Desc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-neutral-100">{t.facility3Title}</h4>
              <p className="text-xs text-neutral-400 mt-0.5">{t.facility3Desc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-neutral-100">{t.facility4Title}</h4>
              <p className="text-xs text-neutral-400 mt-0.5">{t.facility4Desc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-neutral-100">{t.facility5Title}</h4>
              <p className="text-xs text-neutral-400 mt-0.5">{t.facility5Desc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-neutral-100">{t.facility6Title}</h4>
              <p className="text-xs text-neutral-400 mt-0.5">{t.facility6Desc}</p>
            </div>
          </div>

        </div>
      </section>

      {/* Abu Dhabi Location Spotlights */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Real photo of premium residential street in Abu Dhabi / Skyline representational map background */}
        <div className="relative rounded-2xl overflow-hidden border border-gold-800/30 bg-[#0f041c] aspect-16/10 shadow-xl group">
          <img 
            src={villaExteriorImg} 
            alt="Abu Dhabi Skyline and streets" 
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-purple-950 via-transparent to-black/20" />
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 text-xs text-neutral-400">
            <span className="text-gold-400 font-extrabold uppercase tracking-wider font-mono bg-brand-purple-950/80 px-2 py-1 rounded">{language === 'ar' ? 'محيط حي الفيلات' : 'VILLA PROXIMITY'}</span>
            <span className="bg-brand-purple-950/80 px-2 py-1 rounded font-bold">{language === 'ar' ? 'العاصمة الإماراتية' : 'Abu Dhabi Capital'}</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-10 bg-brand-purple-950/80 border border-gold-800/30 rounded-lg p-4 text-start space-y-2">
            <div className="flex gap-1 items-center">
              <MapPin className="w-4 h-4 text-gold-400" />
              <h3 className="font-display text-xs font-bold text-neutral-100 uppercase tracking-wider">{language === 'ar' ? 'منطقة المشرف الهادئة والآمنة' : 'Embassy District (W52)'}</h3>
            </div>
            <p className="text-[10px] text-neutral-400 leading-relaxed leading-normal">
              {language === 'ar' ? 'خلف سفارة فيتنام مباشرة، شارع برق المطلعيات، المشرف، فيلا ٣١، أبوظبي.' : 'Villa 31, Burq Al Mutla\'iyyat Street, Al Qareeb St, Al Mushrif, Abu Dhabi, UAE.'}
            </p>
          </div>
        </div>

        <div className="space-y-6 text-start">
          <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block">{t.eliteNeighborhood}</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-100 uppercase">
            {t.convenientStay}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            {t.eliteDesc1}
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            {t.eliteDesc2}
          </p>
        </div>

      </section>

    </div>
  );
}
