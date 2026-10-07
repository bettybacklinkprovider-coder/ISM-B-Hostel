import React from 'react';
import { Briefcase, Trash2, Printer, MapPin, Bus, Key, AlertTriangle, MessageSquare, Calendar } from 'lucide-react';
import { Booking } from '../types';
import { TRANSLATIONS } from '../translations';

interface BookingsDashboardProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onOpenBooking: () => void;
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

export default function BookingsDashboard({
  bookings,
  onCancelBooking,
  onOpenBooking,
  currency,
  language
}: BookingsDashboardProps) {
  const t = TRANSLATIONS[language];

  const formatPrice = (priceInAed: number) => {
    const converted = priceInAed * CONVERSION_RATES[currency];
    return `${CURRENCY_SYMBOLS[currency]}${converted.toLocaleString(undefined, { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 text-neutral-100">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block font-sans">{t.personalStayHub}</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase leading-tight">
          {t.stayDashboard}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
          {t.dashboardDesc}
        </p>
      </div>

      {/* Main Grid: My Reservations + Pre Arrival Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Booking Items (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-display text-base font-extrabold text-neutral-100 uppercase tracking-wide border-b border-gold-800/20 pb-3 text-start flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gold-400" />
            <span>{t.activeReservations} ({bookings.length})</span>
          </h3>

          {bookings.length === 0 ? (
            <div className="rounded-2xl border border-gold-800/20 bg-brand-purple-900/10 p-12 text-center space-y-5">
              <Calendar className="w-12 h-12 text-neutral-600 mx-auto" />
              <div className="space-y-1.5">
                <h4 className="font-display text-sm font-bold uppercase text-neutral-300">{t.noReservations}</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  {t.noReservationsDesc}
                </p>
              </div>
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-purple-950 hover:bg-gold-400 transition-colors"
              >
                <span>{t.bookStay}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => {
                let translatedRoomName = booking.roomName;
                if (language === 'ar') {
                  if (booking.roomName.includes('Golden Premium Mixed Dorm')) {
                    translatedRoomName = 'غرفة نوم مشتركة ذهبية فاخرة';
                  } else if (booking.roomName.includes('Royal Female-Only Dorm')) {
                    translatedRoomName = 'غرفة نوم ملكية مخصصة للإناث فقط';
                  } else if (booking.roomName.includes('Al Mushrif Executive Private Room')) {
                    translatedRoomName = 'غرفة المشرف التنفيذية الخاصة';
                  } else if (booking.roomName.includes('Abu Dhabi Deluxe Family Suite')) {
                    translatedRoomName = 'جناح أبوظبي العائلي الفاخر';
                  }
                }

                return (
                  <div
                    key={booking.id}
                    className="rounded-xl border border-gold-400/40 bg-gradient-to-b from-brand-purple-900/60 to-brand-purple-950 text-start overflow-hidden shadow-lg"
                  >
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-gold-600 to-gold-400 px-5 py-3 flex items-center justify-between text-brand-purple-950">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">{t.stayTicket}</span>
                        <h4 className="font-display text-xs sm:text-sm font-extrabold uppercase truncate max-w-[200px] sm:max-w-md">{translatedRoomName}</h4>
                      </div>
                      <span className="text-[10px] font-bold bg-[#0f041c]/10 px-2 py-0.5 rounded uppercase font-mono tracking-wide">
                        {booking.bookingRef}
                      </span>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 space-y-4">
                      <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gold-800/20 text-xs">
                        <div>
                          <span className="text-neutral-500 text-[10px] uppercase block mb-0.5 font-bold">{t.primaryGuest}</span>
                          <p className="font-semibold text-neutral-200 truncate">{booking.guestName}</p>
                        </div>
                        <div>
                          <span className="text-neutral-500 text-[10px] uppercase block mb-0.5 font-bold">{t.totalGuests}</span>
                          <p className="font-semibold text-neutral-200 font-mono font-bold">{booking.guestsCount} {booking.guestsCount > 1 ? (language === 'ar' ? 'أفراد / أسرة' : 'Beds') : (language === 'ar' ? 'سرير واحد' : 'Bed')}</p>
                        </div>
                        <div>
                          <span className="text-neutral-500 text-[10px] uppercase block mb-0.5 font-bold">{t.checkInLabel}</span>
                          <p className="font-semibold text-gold-400 font-mono font-bold">{booking.checkIn}</p>
                        </div>
                        <div>
                          <span className="text-neutral-500 text-[10px] uppercase block mb-0.5 font-bold">{t.checkOutLabel}</span>
                          <p className="font-semibold text-gold-400 font-mono font-bold">{booking.checkOut}</p>
                        </div>
                      </div>

                      {booking.addOns.length > 0 && (
                        <div className="pb-4 border-b border-gold-800/20 text-xs">
                          <span className="text-neutral-500 text-[9px] uppercase block mb-1.5 font-bold tracking-wider">{t.requestedAddOns}</span>
                          <div className="flex flex-wrap gap-2">
                            {booking.addOns.map((add, i) => {
                              let translatedAddOn = add;
                              if (language === 'ar') {
                                if (add.includes('Desert Safari')) translatedAddOn = 'جولة سفاري الصحراء الفاخرة';
                                else if (add.includes('Airport')) translatedAddOn = 'توصيل خاص بسيارة فخمة من المطار';
                                else if (add.includes('Breakfast')) translatedAddOn = 'بوفيه إفطار صباحي يومي طازج';
                              }
                              return (
                                <span key={i} className="rounded bg-brand-purple-950 border border-gold-800/30 px-2 py-1 text-[10px] text-gold-300 font-bold">
                                  {translatedAddOn}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                        <div>
                          <span className="text-neutral-500 text-[9px] uppercase block font-bold">{t.calculatedInvoice}</span>
                          <span className="text-xl font-bold text-gold-400 font-mono">{formatPrice(booking.totalPrice)}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={handlePrint}
                            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg border border-gold-800/60 bg-brand-purple-950 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:border-gold-400 hover:text-gold-400"
                          >
                            <Printer className="w-4 h-4 text-gold-500" />
                            <span>{t.printTicket}</span>
                          </button>
                          <button
                            onClick={() => onCancelBooking(booking.id)}
                            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg border border-rose-950 bg-rose-950/20 px-3.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/40"
                          >
                            <Trash2 className="w-4 h-4 shrink-0" />
                            <span>{t.cancelStay}</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Essential Check-in Instructions (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-display text-base font-extrabold text-neutral-100 uppercase tracking-wide border-b border-gold-800/20 pb-3 text-start">
            {t.arrivalGuidelines}
          </h3>

          <div className="rounded-xl border border-gold-800/20 bg-brand-purple-900/10 p-6 text-start space-y-6">
            
            {/* Guide Item 1 */}
            <div className="flex gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/20">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-neutral-200 uppercase tracking-wider">{t.howReachVilla}</h4>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  {t.howReachVillaDesc}
                </p>
              </div>
            </div>

            {/* Guide Item 2 */}
            <div className="flex gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/20">
                <Bus className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-neutral-200 uppercase tracking-wider">{t.transitBus}</h4>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  {t.transitBusDesc}
                </p>
              </div>
            </div>

            {/* Guide Item 3 */}
            <div className="flex gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/20">
                <Key className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-neutral-200 uppercase tracking-wider">{t.smartCheckIn}</h4>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  {t.smartCheckInDesc}
                </p>
              </div>
            </div>

            {/* Guide Item 4 */}
            <div className="flex gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-400/5 text-rose-400 border border-rose-500/20">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-rose-300 uppercase tracking-wider">{t.passportReg}</h4>
                <p className="text-xs text-rose-400/80 font-sans leading-relaxed">
                  {t.passportRegDesc}
                </p>
              </div>
            </div>

          </div>

          {/* Quick Help Box */}
          <div className="rounded-xl border border-gold-800/10 bg-brand-purple-950 p-5 text-start space-y-3">
            <h4 className="text-xs font-extrabold text-gold-300 uppercase tracking-wider">{t.immediateHelp}</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              {t.immediateHelpDesc}
            </p>
            <a
              href="https://wa.me/971585213003"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 hover:underline"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.connectWhatsApp}</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
