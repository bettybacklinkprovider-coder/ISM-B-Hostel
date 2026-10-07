import React, { useState } from 'react';
import { Calendar, Compass, ArrowRight, ShieldCheck, HeartHandshake, Coffee, Sparkles, MapPin, Phone, Image as ImageIcon } from 'lucide-react';
import { Room } from '../types';
import { ROOMS_DATA } from '../data';
import { TRANSLATIONS } from '../translations';
import ImageWithFallback from '../components/ImageWithFallback';

// Local high-fidelity image assets generated for ISM B Hostel
import luxuryDormImg from '../assets/images/ismb_luxury_dorm_1791365303156.jpg';
import femaleDormImg from '../assets/images/ismb_female_dorm_1791365316145.jpg';
import privateRoomImg from '../assets/images/ismb_private_room_1791365331838.jpg';
import familySuiteImg from '../assets/images/ismb_family_suite_1791365350370.jpg';
import villaExteriorImg from '../assets/images/ismb_villa_exterior_1791365284917.jpg';
import majlisLobbyImg from '../assets/images/ismb_majlis_lobby_1791365365240.jpg';
import grandMosqueImg from '../assets/images/ismb_grand_mosque_1791365380651.jpg';

interface HomeProps {
  onNavigate: (tab: string) => void;
  onOpenBookingWithRoom: (roomId: string) => void;
  currency: string;
  language: 'en' | 'ar';
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  AED: 'AED ',
  USD: '$',
  EUR: '€',
  INR: '₹'
};

const CONVERSION_RATES: Record<string, number> = {
  AED: 1.0,
  USD: 0.272,
  EUR: 0.252,
  INR: 22.78
};

const ROOM_IMAGES: Record<string, string> = {
  'gold-mixed-dorm': luxuryDormImg,
  'royal-female-dorm': femaleDormImg,
  'mushrif-private': privateRoomImg,
  'deluxe-family-suite': familySuiteImg
};

const ROOM_IMAGES_FALLBACK: Record<string, string> = {
  'gold-mixed-dorm': luxuryDormImg,
  'royal-female-dorm': femaleDormImg,
  'mushrif-private': privateRoomImg,
  'deluxe-family-suite': familySuiteImg
};

const GALLERY_ITEMS = [
  {
    id: 1,
    category: 'rooms',
    img: luxuryDormImg,
    titleEn: 'Golden Premium Mixed Dorm',
    titleAr: 'غرفة نوم مشتركة ذهبية فاخرة',
    descEn: 'Individual privacy curtains with personalized warm luxury lighting.',
    descAr: 'ستائر خصوصية فردية مع إضاءة دافئة فاخرة مخصصة.'
  },
  {
    id: 2,
    category: 'rooms',
    img: femaleDormImg,
    titleEn: 'Royal Female-Only Sanctuary',
    titleAr: 'ملاذ الإناث الملكي الخاص',
    descEn: 'Custom makeup vanity desk, velvet privacy curtains, and pristine space.',
    descAr: 'طاولة زينة مكياج مخصصة، وستائر خصوصية مخملية، ومساحة نظيفة.'
  },
  {
    id: 3,
    category: 'rooms',
    img: privateRoomImg,
    titleEn: 'Al Mushrif Executive Private Room',
    titleAr: 'غرفة المشرف التنفيذية الخاصة',
    descEn: 'Premium king bed and bespoke executive workspace layout.',
    descAr: 'سرير كينج فاخر ومساحة عمل تنفيذية مخصصة ومريحة.'
  },
  {
    id: 4,
    category: 'rooms',
    img: familySuiteImg,
    titleEn: 'Abu Dhabi Deluxe Family Suite',
    titleAr: 'جناح أبوظبي العائلي الفاخر',
    descEn: 'Spacious multi-bed suite with separate seating and garden view.',
    descAr: 'جناح فسيح متعدد الأسرة مع منطقة جلوس منفصلة وإطلالة على الحديقة.'
  },
  {
    id: 5,
    category: 'amenities',
    img: villaExteriorImg,
    titleEn: 'Boutique Villa 31 Exterior',
    titleAr: 'الواجهة الخارجية لفيلا ٣١ البوتيكية',
    descEn: 'Nestled in the prestigious Al Mushrif embassy district.',
    descAr: 'تقع في حي السفارات المتميز بمنطقة المشرف الراقية.'
  },
  {
    id: 6,
    category: 'amenities',
    img: majlisLobbyImg,
    titleEn: 'Arab-Fusion Majlis Lobby',
    titleAr: 'صالة المجلس العربي العصري',
    descEn: 'Plush velvet seating with complimentary traditional Arabic coffee and dates.',
    descAr: 'مقاعد مخملية مريحة مع تقديم القهوة العربية التقليدية والتمور مجاناً.'
  },
  {
    id: 7,
    category: 'culture',
    img: grandMosqueImg,
    titleEn: 'Sheikh Zayed Grand Mosque',
    titleAr: 'جامع الشيخ زايد الكبير',
    descEn: 'Breathtaking iconic architectural wonder, just a 12-minute drive away.',
    descAr: 'تحفة معمارية إسلامية مذهلة على بعد ١٢ دقيقة فقط بالسيارة.'
  }
];

export default function Home({ onNavigate, onOpenBookingWithRoom, currency, language }: HomeProps) {
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'rooms' | 'amenities' | 'culture'>('all');
  const t = TRANSLATIONS[language];
  
  // Format price helper
  const formatPrice = (priceInAed: number) => {
    const converted = priceInAed * CONVERSION_RATES[currency];
    return `${CURRENCY_SYMBOLS[currency]}${converted.toLocaleString(undefined, { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`;
  };

  return (
    <div className="space-y-24 pb-24 text-neutral-100">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-to-b from-brand-purple-950 via-[#130325] to-[#1e0735] px-4 py-20 text-center border-b border-gold-800/20">
        
        {/* Low-opacity background photo */}
        <div className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none">
          <ImageWithFallback 
            src="https://res.cloudinary.com/k7og2ybq/image/upload/v1791365699/unnamed_2.jpg" 
            fallbackSrc={grandMosqueImg}
            alt="ISM B Hostel Premium Background" 
            className="h-full w-full object-cover"
          />
        </div>
        
        {/* Luxury Gold Atmospheric Radial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] md:h-[500px] md:w-[500px] rounded-full bg-gold-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-brand-purple-700/20 blur-[100px] pointer-events-none" />
        
        {/* Elegant geometric line patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cca43b08_1px,transparent_1px),linear-gradient(to_bottom,#cca43b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-8 px-4 z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/5 px-4 py-1 text-xs tracking-widest text-gold-300 uppercase font-bold animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>{t.premiumExperience}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-100 uppercase leading-[1.1] text-wrap">
            {t.welcomeTitle}<span className="bg-gradient-to-r from-gold-100 via-gold-400 to-gold-200 bg-clip-text text-transparent">{t.welcomeTitleAccent}</span>{t.welcomeTitleEnd}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-neutral-400 font-sans leading-relaxed text-wrap">
            {t.heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenBookingWithRoom('')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-gold-400 bg-gradient-to-r from-gold-600 to-gold-400 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-brand-purple-950 shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookStay}</span>
            </button>
            <button
              onClick={() => onNavigate('rooms')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-gold-800/60 bg-brand-purple-950/40 hover:bg-brand-purple-900/30 hover:border-gold-400 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-gold-300 transition-all"
            >
              <Compass className="w-4 h-4 text-gold-500" />
              <span>{t.exploreRooms}</span>
            </button>
          </div>

          {/* Quick numbers section */}
          <div className="pt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center border-t border-gold-800/20">
            <div>
              <span className="block text-2xl md:text-3xl font-bold text-gold-400 font-mono">9.8/10</span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">{t.guestRating}</span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-bold text-gold-400 font-mono">{t.seconds}</span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">{t.toEmbassy}</span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-bold text-gold-400 font-mono">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">{t.acEnabled}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT THE HOSTEL */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Loaded Arabic images representation instead of empty SVG fallback */}
          <div className="relative rounded-2xl overflow-hidden border border-gold-800/30 bg-[#0f041c] aspect-4/3 shadow-2xl group">
            <ImageWithFallback 
              src={villaExteriorImg} 
              fallbackSrc={majlisLobbyImg}
              alt="ISM B Villa Exterior" 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-purple-950 via-transparent to-black/30" />
            
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 bg-brand-purple-950/80 px-2.5 py-1 rounded border border-gold-800/40 font-mono">
                {language === 'ar' ? 'صالة الفيلا الفاخرة' : 'VILLA 31 LOBBY'}
              </span>
              <div className="h-2.5 w-2.5 rounded-full bg-gold-400 animate-ping" />
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 bg-brand-purple-950/80 border border-gold-800/30 rounded-lg p-4 text-start">
              <p className="font-display text-xs text-gold-300 uppercase tracking-widest font-extrabold">
                {language === 'ar' ? 'عمارة الفيلات الفاخرة' : 'Premium Villa Architecture'}
              </p>
              <p className="text-[10px] text-neutral-400 mt-1">
                {language === 'ar' ? 'منطقة المشرف السكنية الراقية، أبوظبي' : 'Al Mushrif Executive Residential Zone'}
              </p>
            </div>
          </div>

          {/* Prose Content */}
          <div className="space-y-6 text-start">
            <span className="text-xs font-bold tracking-widest text-gold-400 uppercase block">{t.boutiqueTitle}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-100 leading-tight">
              {t.boutiqueSubtitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              {t.boutiqueDesc1}
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              {t.boutiqueDesc2}
            </p>
            
            <div className="pt-4">
              <button
                onClick={() => onNavigate('about')}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-gold-400 hover:text-gold-300 transition-colors uppercase tracking-wider"
              >
                <span>{t.learnMore}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: ROOMS & ACCOMMODATION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 text-start">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-widest text-gold-400 uppercase block">{t.curatedSuites}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-100">
              {t.roomsHeadline}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl font-sans">
              {t.roomsDesc}
            </p>
          </div>
          <button
            onClick={() => onNavigate('rooms')}
            className="group shrink-0 inline-flex items-center gap-2 rounded-full border border-gold-800 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-400 hover:border-gold-400 hover:text-gold-300 transition-all"
          >
            <span>{t.viewAllRooms}</span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
          </button>
        </div>

        {/* 3 Featured Room Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROOMS_DATA.slice(0, 3).map((room) => {
            const translatedRoomName = language === 'ar' 
              ? (room.id === 'gold-mixed-dorm' ? 'غرفة نوم مشتركة ذهبية فاخرة' : room.id === 'royal-female-dorm' ? 'غرفة نوم ملكية مخصصة للإناث فقط' : 'غرفة المشرف التنفيذية الخاصة')
              : room.name;

            const translatedRoomDesc = language === 'ar'
              ? (room.id === 'gold-mixed-dorm' ? 'غرفة نوم مشتركة اجتماعية وراقية تتميز بستائر خصوصية ذهبية، ومنافذ شحن يو إس بي مخصصة، وخزائن رقمية آمنة.' : room.id === 'royal-female-dorm' ? 'ملاذ رائع وأنيق مخصص للفتيات فقط، يتميز بالخصوصية الإضافية وطاولات مكياج مخصصة وتدابير أمنية رفيعة المستوى.' : 'غرفة مزدوجة راقية مصممة بعناية مع سرير كينج فخم، ومكتب عمل تنفيذي، وتلفزيون ذكي شخصي.')
              : room.description;

            const translatedCapacity = language === 'ar'
              ? (room.id === 'gold-mixed-dorm' ? '١٠ أسرة فاخرة مجهزة' : room.id === 'royal-female-dorm' ? '٨ أسرة مريحة مجهزة' : 'شخصين كحد أقصى (سرير كينج)')
              : room.capacity;

            return (
              <div
                key={room.id}
                className="group overflow-hidden rounded-xl border border-gold-800/20 bg-brand-purple-900/40 flex flex-col justify-between transition-all hover:border-gold-400/50 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  {/* Real Room Images loaded dynamically with bulletproof fallback */}
                  <div className="relative h-56 overflow-hidden border-b border-gold-800/10">
                    <ImageWithFallback 
                      src={ROOM_IMAGES[room.id]} 
                      fallbackSrc={ROOM_IMAGES_FALLBACK[room.id]}
                      gradientFallback={room.gradient}
                      alt={room.name} 
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-purple-950 via-transparent to-black/20 animate-fade-in" />
                    
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gold-300 bg-brand-purple-950/80 px-2.5 py-1 rounded border border-gold-800/30">
                        {room.gender === 'female' ? t.femaleSanctuary : room.gender === 'mixed' ? t.socialShared : t.premiumPrivate}
                      </span>
                      <span className="text-xs font-bold text-gold-400 bg-brand-purple-950/95 px-2.5 py-1 rounded font-mono border border-gold-800/40">
                        {formatPrice(room.price)}/{t.perNight}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-10 text-start">
                      <h3 className="font-display text-sm font-extrabold text-neutral-100 uppercase tracking-wide truncate">{translatedRoomName}</h3>
                      <p className="text-[10px] text-neutral-300 mt-0.5 font-sans font-bold">{translatedCapacity}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-4 text-start">
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans line-clamp-2">
                      {translatedRoomDesc}
                    </p>

                    {/* Clean bullet markers for core facilities */}
                    <div className="flex flex-wrap gap-y-1.5 gap-x-3 text-[10px] text-neutral-300 font-bold uppercase tracking-wider">
                      {room.facilities.slice(0, 3).map((fac, idx) => (
                        <span key={idx} className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-gold-400 shrink-0" />
                          <span>{language === 'ar' ? (fac === 'Air Conditioning' ? 'مكيف هواء ممتاز' : fac === 'High-speed Wi-Fi' ? 'إنترنت فائق السرعة' : fac === 'Individual Locker' ? 'خزانة رقمية آمنة' : fac) : fac}</span>
                        </span>
                      ))}
                      {room.facilities.length > 3 && (
                        <span className="text-neutral-500 text-[10px]">+{room.facilities.length - 3} amenities</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-gold-800/10">
                  <button
                    onClick={() => onOpenBookingWithRoom(room.id)}
                    className="w-full rounded-lg bg-gold-400 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-purple-950 hover:bg-gold-300 transition-all font-sans"
                  >
                    {t.bookNow}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section className="bg-brand-purple-900/30 border-y border-gold-800/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block">{t.unmatchedComfort}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-100">
              {t.whyStayTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans">
              {t.whyStayDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Box 1: Comfortable stay */}
            <div className="rounded-xl border border-gold-800/10 bg-[#0f041c]/60 p-6 space-y-4 text-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/20">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-extrabold text-neutral-100 uppercase tracking-wide">{t.perk1Title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {t.perk1Desc}
              </p>
            </div>

            {/* Box 2: Convenient Location */}
            <div className="rounded-xl border border-gold-800/10 bg-[#0f041c]/60 p-6 space-y-4 text-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/20">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-extrabold text-neutral-100 uppercase tracking-wide">{t.perk2Title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {t.perk2Desc}
              </p>
            </div>

            {/* Box 3: Clean environment */}
            <div className="rounded-xl border border-gold-800/10 bg-[#0f041c]/60 p-6 space-y-4 text-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-extrabold text-neutral-100 uppercase tracking-wide">{t.perk3Title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {t.perk3Desc}
              </p>
            </div>

            {/* Box 4: Friendly Service */}
            <div className="rounded-xl border border-gold-800/10 bg-[#0f041c]/60 p-6 space-y-4 text-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/20">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-extrabold text-neutral-100 uppercase tracking-wide">{t.perk4Title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {t.perk4Desc}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: LOCATION / ABU DHABI EXPERIENCE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-start">
            <span className="text-xs font-bold tracking-widest text-gold-400 uppercase block">{t.capitalTitle}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-100">
              {t.neighborhoodSubtitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              {t.neighborhoodDesc1}
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              {t.neighborhoodDesc2}
            </p>
            
            <div className="border-l-2 border-gold-400 pl-4 space-y-2 py-1 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
              <h4 className="text-xs font-extrabold text-gold-300 uppercase tracking-wide">{t.proximityKey}</h4>
              <ul className="space-y-1.5 text-xs text-neutral-300 font-bold">
                <li>• <strong className="text-neutral-100">{t.vietnamEmbassyWalk}</strong></li>
                <li>• <strong className="text-neutral-100">{t.alMushrifParkWalk}</strong></li>
                <li>• <strong className="text-neutral-100">{t.grandMosqueDrive}</strong></li>
                <li>• <strong className="text-neutral-100">{t.louvreDrive}</strong></li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="rounded-full border border-gold-400/80 hover:bg-gold-400 hover:text-brand-purple-950 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-400 transition-all"
              >
                {t.interactiveMapBtn}
              </button>
            </div>
          </div>

          {/* Visual Abu Dhabi stunning loaded image of Grand Mosque */}
          <div className="relative rounded-2xl overflow-hidden border border-gold-800/30 bg-[#0f041c] aspect-16/10 shadow-lg group">
            <ImageWithFallback 
              src={grandMosqueImg} 
              fallbackSrc={villaExteriorImg}
              alt="Sheikh Zayed Grand Mosque, Abu Dhabi" 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-purple-950/90 via-transparent to-black/10" />
            
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <span className="text-[9px] font-bold uppercase text-gold-400 tracking-widest font-mono bg-brand-purple-950/80 px-2.5 py-1 rounded border border-gold-800/40">
                {language === 'ar' ? 'مسجد الشيخ زايد الكبير' : 'GRAND MOSQUE'}
              </span>
              <span className="text-[10px] text-neutral-300 bg-brand-purple-950/80 px-2 py-0.5 rounded border border-gold-800/30 font-bold">12 mins drive</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 bg-brand-purple-950/80 border border-gold-800/30 rounded-lg p-3 text-start">
              <p className="text-gold-300 font-extrabold font-mono text-xs">{language === 'ar' ? 'العنوان: فيلا ٣١، المشرف، أبوظبي' : 'Location: Villa 31, Al Mushrif'}</p>
              <p className="text-[10px] text-neutral-400 mt-1">{language === 'ar' ? 'نظام ملاحة آمن عبر الواتساب متوفر عند الحجز' : 'GPS coordinates shared instantly with guests'}</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5.5: DYNAMIC PHOTO GALLERY & ARABIC HERITAGE TOUR */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block">
            {language === 'ar' ? 'معرض الصور المرئي البوتيكي' : 'ISM B Visual Gallery Tour'}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-100 uppercase">
            {language === 'ar' ? 'استكشف أرجاء نزل إي إس إم بي' : 'Explore ISM B Premium Spaces'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans">
            {language === 'ar' 
              ? 'تصفح صوراً حقيقية وعالية الجودة للغرف المشتركة والخاصة وصالة الاستقبال والقرائن المحلية بالعاصمة.' 
              : 'Browse real, high-fidelity photos of our premium dorms, private rooms, cozy lounge majlis, and local sights.'}
          </p>
        </div>

        {/* Filter Segmented Controls (Buttons, satisfying Zero-Pill rule) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-brand-purple-900/40 border border-gold-800/20 rounded-xl max-w-lg mx-auto">
          <button
            onClick={() => setGalleryFilter('all')}
            className={`px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
              galleryFilter === 'all'
                ? 'bg-gold-500 text-brand-purple-950 shadow-md font-extrabold'
                : 'text-neutral-400 hover:text-gold-400'
            }`}
          >
            {language === 'ar' ? 'عرض الكل' : 'Show All'}
          </button>
          <button
            onClick={() => setGalleryFilter('rooms')}
            className={`px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
              galleryFilter === 'rooms'
                ? 'bg-gold-500 text-brand-purple-950 shadow-md font-extrabold'
                : 'text-neutral-400 hover:text-gold-400'
            }`}
          >
            {language === 'ar' ? 'الغرف والأجنحة' : 'Rooms & Suites'}
          </button>
          <button
            onClick={() => setGalleryFilter('amenities')}
            className={`px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
              galleryFilter === 'amenities'
                ? 'bg-gold-500 text-brand-purple-950 shadow-md font-extrabold'
                : 'text-neutral-400 hover:text-gold-400'
            }`}
          >
            {language === 'ar' ? 'المرافق والصالات' : 'Lobbies & Amenities'}
          </button>
          <button
            onClick={() => setGalleryFilter('culture')}
            className={`px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
              galleryFilter === 'culture'
                ? 'bg-gold-500 text-brand-purple-950 shadow-md font-extrabold'
                : 'text-neutral-400 hover:text-gold-400'
            }`}
          >
            {language === 'ar' ? 'التراث والمعالم' : 'Capital Culture'}
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
          {GALLERY_ITEMS.filter(item => galleryFilter === 'all' || item.category === galleryFilter).map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-gold-800/10 bg-[#0f041c] aspect-4/3 shadow-md hover:border-gold-400/40 transition-all hover:-translate-y-1"
            >
              <ImageWithFallback
                src={item.img}
                fallbackSrc={item.img}
                alt={item.titleEn}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple-950/95 via-brand-purple-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-start" />
              
              {/* Overlay captions ALWAYS visible on hover or mobile touch */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#0f041c] via-[#0f041c]/90 to-transparent flex flex-col justify-end text-start translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-display text-xs sm:text-sm font-extrabold text-gold-300 uppercase tracking-wide">
                  {language === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-[10px] text-neutral-300 mt-1 leading-normal font-sans">
                  {language === 'ar' ? item.descAr : item.descEn}
                </p>
                <div className="mt-2.5 flex items-center gap-2 text-[9px] uppercase tracking-wider text-gold-400 font-bold">
                  <ImageIcon className="w-3.5 h-3.5 text-gold-500" />
                  <span>{language === 'ar' ? 'نزل إي إس إم بي' : 'ISM B Hostel Exclusive'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: CONTACT / BOOKING CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-gold-400 bg-gradient-to-r from-brand-purple-900 to-[#220a3a] px-6 py-12 text-center shadow-xl sm:px-12 md:py-16">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <ImageWithFallback 
              src={majlisLobbyImg}
              fallbackSrc={villaExteriorImg}
              alt="Lobby CTA BG"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-gold-400/5 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-gold-400/5 blur-3xl" />

          <div className="relative max-w-2xl mx-auto space-y-6 z-10">
            <span className="text-xs font-extrabold tracking-widest text-gold-400 uppercase">{t.saveBed}</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-100 uppercase">
              {t.readyToBook}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans max-w-md mx-auto">
              {t.bedsFillFast}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onOpenBookingWithRoom('')}
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-gold-600 to-gold-400 px-8 py-3 text-xs font-bold uppercase tracking-wider text-brand-purple-950 shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                {t.bookNow}
              </button>
              <a
                href="tel:+971585213003"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-gold-800/80 bg-brand-purple-950/40 hover:border-gold-400 px-8 py-3 text-xs font-bold uppercase tracking-wider text-gold-300 transition-all font-mono"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>+971 58 521 3003</span>
              </a>
            </div>

            <div className="pt-4 text-[10px] text-neutral-500 font-bold uppercase">
              <span>{language === 'ar' ? 'سفارة فيتنام، المشرف، أبوظبي، الإمارات العربية المتحدة' : 'Vietnam Embassy, Al Mushrif, Abu Dhabi, UAE'}</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
