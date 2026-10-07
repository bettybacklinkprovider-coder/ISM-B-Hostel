import React, { useState } from 'react';
import { ArrowUpDown, CheckCircle, Flame, Star, Calendar } from 'lucide-react';
import { Room } from '../types';
import { ROOMS_DATA } from '../data';
import { TRANSLATIONS } from '../translations';
import ImageWithFallback from '../components/ImageWithFallback';

// Local high-fidelity image assets generated for ISM B Hostel
import luxuryDormImg from '../assets/images/ismb_luxury_dorm_1791365303156.jpg';
import femaleDormImg from '../assets/images/ismb_female_dorm_1791365316145.jpg';
import privateRoomImg from '../assets/images/ismb_private_room_1791365331838.jpg';
import familySuiteImg from '../assets/images/ismb_family_suite_1791365350370.jpg';

interface RoomsProps {
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

export default function Rooms({ onOpenBookingWithRoom, currency, language }: RoomsProps) {
  const [filterType, setFilterType] = useState<'all' | 'dorm' | 'private'>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'default'>('default');
  const t = TRANSLATIONS[language];

  // Format price helper
  const formatPrice = (priceInAed: number) => {
    const converted = priceInAed * CONVERSION_RATES[currency];
    return `${CURRENCY_SYMBOLS[currency]}${converted.toLocaleString(undefined, { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`;
  };

  // Filter & Sort
  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (filterType === 'all') return true;
    return room.type === filterType;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0; // Default sorting
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 text-neutral-100">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block">{t.catalogTitle}</span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-tight">
          {t.suitesDorms}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
          {t.roomsPageDesc}
        </p>
      </div>

      {/* Control Panel */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-y border-gold-800/20 py-6 bg-brand-purple-900/10 rounded-xl px-4 sm:px-6">
        
        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1.5 p-1 bg-brand-purple-950 border border-gold-800/30 rounded-lg">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
              filterType === 'all'
                ? 'bg-gold-500 text-brand-purple-950 shadow-sm'
                : 'text-neutral-400 hover:text-gold-400'
            }`}
          >
            {t.allBedsRooms}
          </button>
          <button
            onClick={() => setFilterType('dorm')}
            className={`px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
              filterType === 'dorm'
                ? 'bg-gold-500 text-brand-purple-950 shadow-sm'
                : 'text-neutral-400 hover:text-gold-400'
            }`}
          >
            {t.sharedDorms}
          </button>
          <button
            onClick={() => setFilterType('private')}
            className={`px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
              filterType === 'private'
                ? 'bg-gold-500 text-brand-purple-950 shadow-sm'
                : 'text-neutral-400 hover:text-gold-400'
            }`}
          >
            {t.privateRooms}
          </button>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <ArrowUpDown className="w-4 h-4 text-gold-500 shrink-0" />
          <span>{t.sortByPrice}</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="rounded border border-gold-800/40 bg-brand-purple-950 py-1.5 px-2.5 font-bold text-gold-300 focus:outline-none focus:border-gold-400 text-xs"
          >
            <option value="default" className="bg-[#1b0a2e]">{t.defaultListing}</option>
            <option value="price-asc" className="bg-[#1b0a2e]">{t.lowToHigh}</option>
            <option value="price-desc" className="bg-[#1b0a2e]">{t.highToLow}</option>
          </select>
        </div>

      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-4">
        {sortedRooms.map((room) => {
          const translatedRoomName = language === 'ar' 
            ? (room.id === 'gold-mixed-dorm' ? 'غرفة نوم مشتركة ذهبية فاخرة' : room.id === 'royal-female-dorm' ? 'غرفة نوم ملكية مخصصة للإناث فقط' : room.id === 'mushrif-private' ? 'غرفة المشرف التنفيذية الخاصة' : 'جناح أبوظبي العائلي الفاخر')
            : room.name;

          const translatedRoomDesc = language === 'ar'
            ? (room.id === 'gold-mixed-dorm' ? 'غرفة نوم مشتركة اجتماعية وراقية تتميز بستائر خصوصية ذهبية، ومنافذ شحن يو إس بي مخصصة، وخزائن رقمية آمنة.' : room.id === 'royal-female-dorm' ? 'ملاذ رائع وأنيق مخصص للفتيات فقط، يتميز بالخصوصية الإضافية وطاولات مكياج مخصصة وتدابير أمنية رفيعة المستوى.' : room.id === 'mushrif-private' ? 'غرفة مزدوجة راقية مصممة بعناية مع سرير كينج فخم، ومكتب عمل تنفيذي، وتلفزيون ذكي شخصي.' : 'جناح عائلي فخم يضم سرير كوين وسريرين فرديين، مع صالة معيشة واسعة، وإطلالات خلابة على الحديقة.')
            : room.description;

          const translatedCapacity = language === 'ar'
            ? (room.id === 'gold-mixed-dorm' ? '١٠ أسرة فاخرة مجهزة' : room.id === 'royal-female-dorm' ? '٨ أسرة مريحة مجهزة' : room.id === 'mushrif-private' ? 'شخصين كحد أقصى (سرير كينج)' : 'تتسع لـ ٤ أشخاص كحد أقصى')
            : room.capacity;

          return (
            <div
              key={room.id}
              className="group overflow-hidden rounded-2xl border border-gold-800/20 bg-brand-purple-900/40 flex flex-col justify-between transition-all hover:border-gold-400/40 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Loaded High-Fidelity Room Images with Fallback */}
              <div className="relative h-64 overflow-hidden border-b border-gold-800/20">
                <ImageWithFallback 
                  src={ROOM_IMAGES[room.id]} 
                  fallbackSrc={ROOM_IMAGES_FALLBACK[room.id]}
                  gradientFallback={room.gradient}
                  alt={room.name} 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-purple-950 via-transparent to-black/20" />
                
                {/* Corner Badges */}
                <div className="flex justify-between items-start absolute top-4 left-4 right-4 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300 bg-brand-purple-950/90 px-2.5 py-1 rounded border border-gold-800/30">
                    {room.gender === 'female' ? t.femaleOnlyDorm : room.gender === 'mixed' ? t.mixedSharedDorm : t.executivePrivateSuite}
                  </span>
                  
                  {room.price < 100 && (
                    <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-emerald-400 bg-brand-purple-950/90 px-2 py-0.5 rounded border border-emerald-500/20">
                      <Flame className="w-3 h-3 text-emerald-400 shrink-0 animate-pulse" />
                      <span>{t.bestSeller}</span>
                    </span>
                  )}
                </div>

                {/* Title & Info on bottom of banner */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-start">
                  <h2 className="font-display text-lg sm:text-xl font-extrabold text-neutral-100 uppercase tracking-wide">
                    {translatedRoomName}
                  </h2>
                  <p className="text-xs text-neutral-300 mt-1 font-sans font-bold">
                    {t.capacity}: {translatedCapacity}
                  </p>
                </div>
              </div>

              {/* Description & Amenities details */}
              <div className="p-6 sm:p-8 text-start space-y-6">
                
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {translatedRoomDesc}
                </p>

                {/* Complete amenities grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gold-300 uppercase tracking-wider">{t.amenitiesIncluded}</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-neutral-300 font-sans font-medium">
                    {room.facilities.map((fac, index) => {
                      let translatedFacility = fac;
                      if (language === 'ar') {
                        if (fac === 'Air Conditioning') translatedFacility = 'مكيف هواء مركزي ممتاز';
                        else if (fac === 'High-speed Wi-Fi') translatedFacility = 'إنترنت فائق السرعة';
                        else if (fac === 'Individual Locker') translatedFacility = 'خزنة أمان رقمية خاصة';
                        else if (fac === 'Privacy Curtain') translatedFacility = 'ستائر خصوصية مخملية ثقيلة';
                        else if (fac === 'Reading Light') translatedFacility = 'مصباح قراءة مخصص';
                        else if (fac === 'Shared Luxury Bathroom') translatedFacility = 'حمام فاخر مشترك';
                        else if (fac === 'Ensuite Bathroom') translatedFacility = 'حمام مخصص داخل الغرفة';
                        else if (fac === 'Vanity Mirror') translatedFacility = 'مرآة مكياج وتزيين';
                        else if (fac === 'Hairdryer & Iron') translatedFacility = 'مجفف شعر ومكواة';
                        else if (fac === 'Secure Keycard Access') translatedFacility = 'دخول ذكي آمن بالبطاقة';
                        else if (fac === 'King Size Bed') translatedFacility = 'سرير كينج فخم وكبير';
                        else if (fac === 'Ensuite Luxury Bathroom') translatedFacility = 'حمام داخلي فاخر للغاية';
                        else if (fac === '55" Smart TV') translatedFacility = 'شاشة تلفزيون ذكية ٥٥ بوصة';
                        else if (fac === 'Work Desk & Chair') translatedFacility = 'مكتب عمل وكرسي مريح';
                        else if (fac === 'Minibar & Fridge') translatedFacility = 'ثلاجة ومشروبات صغيرة بالخزنة';
                        else if (fac === 'Espresso Machine') translatedFacility = 'آلة صنع قهوة إسبريسو فاخرة';
                        else if (fac === '1 Queen + 2 Single Beds') translatedFacility = 'سرير كوين + سريرين مفردين';
                        else if (fac === 'Spacious Lounge Area') translatedFacility = 'صالة جلوس ومعيشة واسعة';
                        else if (fac === 'Premium Ensuite with Bathtub') translatedFacility = 'حمام كبير مزود بحوض استحمام دافئ';
                        else if (fac === 'Mini-Fridge & Kettle') translatedFacility = 'غلاية وثلاجة صغيرة للمشروبات';
                        else if (fac === 'Smart TV with Streaming') translatedFacility = 'شاشة ذكية مزودة بخدمات البث';
                        else if (fac === 'Panoramic Views') translatedFacility = 'إطلالات بانورامية خلابة على الحديقة';
                      }

                      return (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                          <span>{translatedFacility}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Price & CTA Layout */}
                <div className="pt-6 border-t border-gold-800/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-500 tracking-wider font-bold">{t.estRate}</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-2xl font-bold text-gold-400 font-mono tracking-wider">{formatPrice(room.price)}</span>
                      <span className="text-xs text-neutral-400">/ {t.perNight}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBookingWithRoom(room.id)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold-600 to-gold-400 px-6 py-3 text-xs font-bold uppercase tracking-wider text-brand-purple-950 shadow-md hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.reserveNow}</span>
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Safety & Standards Seal */}
      <div className="rounded-xl border border-gold-800/20 bg-brand-purple-900/10 p-6 flex flex-col sm:flex-row items-center gap-6 justify-between text-start max-w-4xl mx-auto">
        <div className="flex gap-4 items-start">
          <CheckCircle className="w-10 h-10 text-gold-500 shrink-0 mt-1" />
          <div className="space-y-1">
            <h4 className="font-display text-sm font-bold text-neutral-100 uppercase tracking-wide">{t.goldSealTitle}</h4>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              {t.goldSealDesc}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-1 text-gold-400">
          {[1,2,3,4,5].map((s) => (
            <Star key={s} className="w-4 h-4 fill-gold-400" />
          ))}
        </div>
      </div>

    </div>
  );
}
