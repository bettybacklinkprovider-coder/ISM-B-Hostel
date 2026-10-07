import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle, ChevronRight, ChevronLeft, ArrowRight, Sparkles, MapPin, Printer } from 'lucide-react';
import { Room, Booking } from '../types';
import { ROOMS_DATA } from '../data';
import { TRANSLATIONS } from '../translations';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomId: string;
  onSaveBooking: (booking: Booking) => void;
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

export default function BookingModal({
  isOpen,
  onClose,
  initialRoomId,
  onSaveBooking,
  currency,
  language
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedRoomId, setSelectedRoomId] = useState(initialRoomId || ROOMS_DATA[0].id);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  
  // Guest fields
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  
  // Custom Services/Add-Ons
  const [safariSelected, setSafariSelected] = useState(false);
  const [shuttleSelected, setShuttleSelected] = useState(false);
  const [breakfastSelected, setBreakfastSelected] = useState(false);
  
  // Finished booking ref
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);
  const t = TRANSLATIONS[language];

  // Sync initialRoomId if changed
  useEffect(() => {
    if (initialRoomId) {
      setSelectedRoomId(initialRoomId);
    }
  }, [initialRoomId]);

  if (!isOpen) return null;

  const selectedRoom = ROOMS_DATA.find(r => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Price conversion helper
  const formatPrice = (priceInAed: number) => {
    const converted = priceInAed * CONVERSION_RATES[currency];
    const formatted = converted.toLocaleString(undefined, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
    return `${CURRENCY_SYMBOLS[currency]}${formatted}`;
  };

  // Date and math
  const getDaysCount = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const timeDiff = end.getTime() - start.getTime();
    if (timeDiff <= 0) return 0;
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const days = getDaysCount();

  const getAddOnCost = () => {
    let total = 0;
    if (safariSelected) total += 150 * guestsCount; // Desert Safari: AED 150 per person
    if (shuttleSelected) total += 120; // Airport Shuttle: AED 120 flat
    if (breakfastSelected) total += 25 * guestsCount * (days || 1); // Breakfast: AED 25 per day per person
    return total;
  };

  const addOnCost = getAddOnCost();
  const roomBaseCost = selectedRoom.price * (days || 1) * (selectedRoom.type === 'dorm' ? guestsCount : 1);
  const totalCostAed = roomBaseCost + addOnCost;

  // Validation
  const validateStep1 = () => {
    if (!checkIn || !checkOut) return language === 'ar' ? 'يرجى تحديد تاريخ تسجيل الدخول وتسجيل المغادرة.' : 'Please specify check-in and check-out dates.';
    if (days <= 0) return t.errorCheckInOut;
    return '';
  };

  const validateStep2 = () => {
    if (!guestName.trim()) return language === 'ar' ? 'يرجى إدخال اسمك الكامل.' : 'Please enter your full name.';
    if (!guestEmail.trim() || !guestEmail.includes('@')) return t.errorValidEmail;
    if (!guestPhone.trim()) return language === 'ar' ? 'يرجى إدخال رقم الهاتف / الواتساب.' : 'Please enter your WhatsApp/phone number.';
    return '';
  };

  const handleNextStep = () => {
    if (step === 1) {
      const err = validateStep1();
      if (err) {
        alert(err);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const err = validateStep2();
      if (err) {
        alert(err);
        return;
      }
      setStep(3);
    }
  };

  const handleCreateBooking = () => {
    const bookingRef = `IADH-${Math.floor(100000 + Math.random() * 900000)}`;
    const addOnsList: string[] = [];
    if (safariSelected) addOnsList.push('Abu Dhabi Desert Safari Tour');
    if (shuttleSelected) addOnsList.push('Luxury Airport Private Shuttle');
    if (breakfastSelected) addOnsList.push('Daily Gourmet Buffet Breakfast');

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      roomName: selectedRoom.name,
      roomPrice: selectedRoom.price,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guestsCount,
      addOns: addOnsList,
      totalPrice: totalCostAed,
      bookingRef,
      createdAt: new Date().toISOString()
    };

    onSaveBooking(newBooking);
    setCompletedBooking(newBooking);
    setStep(4);
  };

  const handlePrint = () => {
    window.print();
  };

  const resetAndClose = () => {
    setStep(1);
    setCheckIn('');
    setCheckOut('');
    setGuestsCount(1);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setSafariSelected(false);
    setShuttleSelected(false);
    setBreakfastSelected(false);
    setCompletedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-gold-800 bg-[#160627] text-neutral-100 shadow-2xl">
        
        {/* Modal Banner */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-700" />
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gold-800/40 p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-gold-400" />
            <h2 className="font-display text-base sm:text-lg font-bold text-gold-300 uppercase tracking-wider">
              {step === 4 ? t.stayReserved : t.secureBooking}
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="rounded-full p-1.5 text-neutral-400 hover:bg-brand-purple-800/50 hover:text-gold-400 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Wizard Steps indicator */}
        {step < 4 && (
          <div className="flex justify-between px-6 py-4 bg-[#0f041c]/50 text-[10px] sm:text-xs text-neutral-400 border-b border-gold-800/20 font-bold">
            <span className={step === 1 ? 'text-gold-400 font-bold' : ''}>{t.step1}</span>
            <ChevronRight className={`h-3.5 w-3.5 text-gold-800 ${language === 'ar' ? 'rotate-180' : ''}`} />
            <span className={step === 2 ? 'text-gold-400 font-bold' : ''}>{t.step2Label}</span>
            <ChevronRight className={`h-3.5 w-3.5 text-gold-800 ${language === 'ar' ? 'rotate-180' : ''}`} />
            <span className={step === 3 ? 'text-gold-400 font-bold' : ''}>{t.step3Label}</span>
          </div>
        )}

        {/* Content Container */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6 text-start">
          
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gold-300 uppercase mb-2">{t.checkInDateLabel}</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-gold-500" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full rounded-lg border border-gold-800/60 bg-[#0f041c] py-2.5 pl-10 pr-4 text-xs text-neutral-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gold-300 uppercase mb-2">{t.checkOutDateLabel}</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-gold-500" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full rounded-lg border border-gold-800/60 bg-[#0f041c] py-2.5 pl-10 pr-4 text-xs text-neutral-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-gold-300 uppercase mb-2">{t.selectSuiteDorm}</label>
                <div className="grid grid-cols-1 gap-3">
                  {ROOMS_DATA.map((room) => {
                    const translatedName = language === 'ar'
                      ? (room.id === 'gold-mixed-dorm' ? 'غرفة نوم مشتركة ذهبية فاخرة' : room.id === 'royal-female-dorm' ? 'غرفة نوم ملكية مخصصة للإناث فقط' : room.id === 'mushrif-private' ? 'غرفة المشرف التنفيذية الخاصة' : 'جناح أبوظبي العائلي الفاخر')
                      : room.name;

                    const translatedCapacity = language === 'ar'
                      ? (room.id === 'gold-mixed-dorm' ? '١٠ أسرة فاخرة مجهزة' : room.id === 'royal-female-dorm' ? '٨ أسرة مريحة مجهزة' : room.id === 'mushrif-private' ? 'شخصين كحد أقصى (سرير كينج)' : 'تتسع لـ ٤ أشخاص كحد أقصى')
                      : room.capacity;

                    return (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`flex items-center justify-between rounded-lg border p-4 text-start transition-all ${
                          selectedRoomId === room.id
                            ? 'border-gold-400 bg-brand-purple-800/40 shadow-[0_0_15px_rgba(204,164,59,0.15)]'
                            : 'border-gold-800/30 bg-[#0f041c]/40 hover:border-gold-800 hover:bg-brand-purple-900/20'
                        }`}
                      >
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-neutral-100">{translatedName}</h4>
                          <p className="text-[11px] text-neutral-400 mt-1">{translatedCapacity} · {room.gender === 'female' ? t.femaleOnlyDorm : room.gender === 'mixed' ? t.mixedSharedDorm : t.executivePrivateSuite}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm sm:text-base font-bold text-gold-400 font-mono">{formatPrice(room.price)}</span>
                          <p className="text-[9px] text-neutral-500">per {t.perNight}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedRoom.type === 'dorm' && (
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gold-300 uppercase mb-2">{t.numOfGuests}</label>
                  <div className="flex flex-wrap items-center gap-3">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        onClick={() => setGuestsCount(num)}
                        className={`h-9 w-9 rounded-md border text-sm font-bold font-mono transition-all ${
                          guestsCount === num
                            ? 'border-gold-400 bg-gold-400 text-brand-purple-950'
                            : 'border-gold-800/40 bg-[#0f041c] hover:border-gold-400 text-neutral-300'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-xs text-neutral-400 mb-2">{t.guestInfoNotice}</p>
              <div>
                <label className="block text-xs font-bold tracking-wider text-gold-300 uppercase mb-2">{t.fullNameLegal}</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Liam Smith"
                  className="w-full rounded-lg border border-gold-800/60 bg-[#0f041c] py-2.5 px-4 text-xs text-neutral-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-gold-300 uppercase mb-2">{t.emailLabel}</label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="liam.smith@example.com"
                  className="w-full rounded-lg border border-gold-800/60 bg-[#0f041c] py-2.5 px-4 text-xs text-neutral-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wider text-gold-300 uppercase mb-2">{t.phoneWhatsAppCode}</label>
                <input
                  type="text"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="e.g. +971 50 123 4567"
                  className="w-full rounded-lg border border-gold-800/60 bg-[#0f041c] py-2.5 px-4 text-xs text-neutral-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="rounded-lg bg-[#0f041c] p-4 border border-gold-800/30">
                <h3 className="font-display text-xs font-bold uppercase text-gold-300 tracking-wider mb-2">{t.addLuxuryExp}</h3>
                <p className="text-xs text-neutral-400">{t.addLuxuryExpDesc}</p>
              </div>

              <div className="space-y-3">
                {/* Safari Add On */}
                <button
                  onClick={() => setSafariSelected(!safariSelected)}
                  className={`w-full flex items-center justify-between rounded-lg border p-4 text-start transition-all ${
                    safariSelected
                      ? 'border-gold-400 bg-brand-purple-800/40'
                      : 'border-gold-800/20 bg-[#0f041c]/40 hover:border-gold-800/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={safariSelected}
                      readOnly
                      className="mt-1 h-4 w-4 rounded border-gold-800 text-gold-500 focus:ring-0 focus:ring-offset-0 bg-transparent"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-100">{t.safariTitle}</h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{t.safariDesc}</p>
                    </div>
                  </div>
                  <div className="text-right pl-4 shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-gold-400 font-mono">{formatPrice(150)}</span>
                    <p className="text-[9px] text-neutral-500">per person</p>
                  </div>
                </button>

                {/* Shuttle Add On */}
                <button
                  onClick={() => setShuttleSelected(!shuttleSelected)}
                  className={`w-full flex items-center justify-between rounded-lg border p-4 text-start transition-all ${
                    shuttleSelected
                      ? 'border-gold-400 bg-brand-purple-800/40'
                      : 'border-gold-800/20 bg-[#0f041c]/40 hover:border-gold-800/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={shuttleSelected}
                      readOnly
                      className="mt-1 h-4 w-4 rounded border-gold-800 text-gold-500 focus:ring-0 focus:ring-offset-0 bg-transparent"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-100">{t.shuttleTitle}</h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{t.shuttleDesc}</p>
                    </div>
                  </div>
                  <div className="text-right pl-4 shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-gold-400 font-mono">{formatPrice(120)}</span>
                    <p className="text-[9px] text-neutral-500">flat rate</p>
                  </div>
                </button>

                {/* Breakfast Add On */}
                <button
                  onClick={() => setBreakfastSelected(!breakfastSelected)}
                  className={`w-full flex items-center justify-between rounded-lg border p-4 text-start transition-all ${
                    breakfastSelected
                      ? 'border-gold-400 bg-brand-purple-800/40'
                      : 'border-gold-800/20 bg-[#0f041c]/40 hover:border-gold-800/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={breakfastSelected}
                      readOnly
                      className="mt-1 h-4 w-4 rounded border-gold-800 text-gold-500 focus:ring-0 focus:ring-offset-0 bg-transparent"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-100">{t.breakfastTitle}</h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{t.breakfastDesc}</p>
                    </div>
                  </div>
                  <div className="text-right pl-4 shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-gold-400 font-mono">{formatPrice(25)}</span>
                    <p className="text-[9px] text-neutral-500">per person / day</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 4 && completedBooking && (
            <div className="space-y-6 animate-fade-in text-center py-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/10 border border-gold-400">
                <CheckCircle className="h-8 w-8 text-gold-400 animate-bounce" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-gold-300">{t.stayConfirmed}</h3>
                <p className="text-xs text-neutral-400 mt-1.5">{t.voucherNotice}</p>
              </div>

              {/* Printable Premium Booking Receipt */}
              <div id="booking-receipt" className="mx-auto max-w-md overflow-hidden rounded-xl border border-gold-400 bg-gradient-to-b from-[#1b0a2e] to-[#0f041c] text-start shadow-lg">
                <div className="bg-gradient-to-r from-gold-600 to-gold-400 p-4 text-brand-purple-950 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-80">{t.voucherHeading}</span>
                    <h4 className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                      {language === 'ar'
                        ? (selectedRoom.id === 'gold-mixed-dorm' ? 'غرفة نوم مشتركة ذهبية فاخرة' : selectedRoom.id === 'royal-female-dorm' ? 'غرفة نوم ملكية مخصصة للإناث فقط' : selectedRoom.id === 'mushrif-private' ? 'غرفة المشرف التنفيذية الخاصة' : 'جناح أبوظبي العائلي الفاخر')
                        : completedBooking.roomName}
                    </h4>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-xs font-bold bg-brand-purple-950/20 px-2 py-0.5 rounded text-brand-purple-950">CONFIRMED</span>
                  </div>
                </div>

                <div className="p-5 space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 border-b border-gold-800/30 pb-4">
                    <div>
                      <span className="text-neutral-500 text-[10px] uppercase font-bold">{t.primaryGuest}</span>
                      <p className="font-semibold text-neutral-200 mt-0.5 truncate">{completedBooking.guestName}</p>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[10px] uppercase font-bold">{language === 'ar' ? 'رقم الحجز المرجعي' : 'BOOKING REF'}</span>
                      <p className="font-semibold text-gold-400 font-mono mt-0.5 tracking-wider font-bold">{completedBooking.bookingRef}</p>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[10px] uppercase font-bold">{t.checkInLabel}</span>
                      <p className="font-semibold text-neutral-200 mt-0.5">{completedBooking.checkIn}</p>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[10px] uppercase font-bold">{t.checkOutLabel}</span>
                      <p className="font-semibold text-neutral-200 mt-0.5">{completedBooking.checkOut}</p>
                    </div>
                  </div>

                  <div className="border-b border-gold-800/30 pb-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">{t.lengthStay}</span>
                      <span className="text-neutral-200 font-semibold">{days || 1} {t.nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">{t.totalGuests}:</span>
                      <span className="text-neutral-200 font-semibold">{completedBooking.guestsCount} {completedBooking.guestsCount > 1 ? (language === 'ar' ? 'أفراد / أسرة' : 'Beds') : (language === 'ar' ? 'سرير واحد' : 'Bed')}</span>
                    </div>
                    {completedBooking.addOns.length > 0 && (
                      <div className="pt-1">
                        <span className="text-neutral-500 text-[9px] uppercase block mb-1 font-bold">{t.includedExp}</span>
                        <ul className="list-disc list-inside space-y-0.5 text-gold-300 font-bold">
                          {completedBooking.addOns.map((add, idx) => {
                            let translatedAdd = add;
                            if (language === 'ar') {
                              if (add.includes('Desert Safari')) translatedAdd = 'جولة سفاري الصحراء الفاخرة';
                              else if (add.includes('Airport')) translatedAdd = 'توصيل خاص بسيارة فخمة من المطار';
                              else if (add.includes('Breakfast')) translatedAdd = 'بوفيه إفطار صباحي يومي طازج';
                            }
                            return (
                              <li key={idx} className="truncate">{translatedAdd}</li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <span className="text-[10px] text-neutral-500 block font-bold">{t.chargesTotal}</span>
                      <span className="text-neutral-400 text-[10px] font-bold">{t.simulatedInvoice}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-gold-400 font-mono">{formatPrice(completedBooking.totalPrice)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-[10px] text-neutral-500 pt-3 border-t border-gold-800/20 font-bold">
                    <MapPin className="w-3.5 h-3.5 text-gold-500" />
                    <span>{t.sector}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons on success */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 rounded-lg border border-gold-800/60 bg-brand-purple-900/40 px-4 py-2 text-xs font-bold text-gold-300 hover:bg-brand-purple-800/60"
                >
                  <Printer className="w-4 h-4 text-gold-400" />
                  <span>{t.printVoucher}</span>
                </button>
                <button
                  onClick={resetAndClose}
                  className="rounded-lg bg-gold-400 px-5 py-2 text-xs font-extrabold text-brand-purple-950 hover:brightness-110"
                >
                  {t.done}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions inside modal */}
        {step < 4 && (
          <div className="flex items-center justify-between border-t border-gold-800/40 bg-[#0f041c]/50 p-4">
            <div>
              {days > 0 && (
                <div className="text-start">
                  <span className="text-[10px] uppercase text-neutral-500 font-bold">{language === 'ar' ? 'السعر الكلي التقديري' : 'Calculated Est.'}</span>
                  <p className="text-base sm:text-lg font-bold text-gold-400 font-mono">
                    {formatPrice(totalCostAed)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1.5 rounded-lg border border-gold-800/60 bg-[#0f041c] px-4 py-2 text-xs font-bold text-neutral-300 hover:border-gold-400 hover:text-gold-400 transition-colors"
                >
                  <ChevronLeft className={`h-4 w-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                  <span>{t.back}</span>
                </button>
              )}

              {step < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-1.5 rounded-lg bg-gold-400 px-5 py-2 text-xs font-bold uppercase tracking-wider text-brand-purple-950 hover:brightness-110 active:scale-95 transition-all"
                >
                  <span>{t.continue}</span>
                  <ChevronRight className={`h-4 w-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <button
                  onClick={handleCreateBooking}
                  className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-gold-600 to-gold-400 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-purple-950 shadow-md hover:brightness-110 active:scale-95 transition-all"
                >
                  <span>{t.confirmStay}</span>
                  <ArrowRight className={`h-4 w-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
