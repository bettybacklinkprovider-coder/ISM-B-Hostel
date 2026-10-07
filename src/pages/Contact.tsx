import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, Send, CheckCircle, Sparkles, Star, Compass, MessageSquare } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS, ATTRACTIONS } from '../data';
import { TRANSLATIONS } from '../translations';

interface ContactProps {
  currency: string;
  language: 'en' | 'ar';
}

export default function Contact({ currency, language }: ContactProps) {
  const t = TRANSLATIONS[language];

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Landmark selector state
  const [selectedAttraction, setSelectedAttraction] = useState(ATTRACTIONS[0]);

  // Reviews state (persistent with localstorage)
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewCountry, setNewReviewCountry] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Load reviews on mount
  useEffect(() => {
    const saved = localStorage.getItem('iadh_guest_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('iadh_guest_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setFormError(language === 'ar' ? 'يرجى تعبئة جميع الحقول المطلوبة بالنموذج.' : 'Please fill in all the contact form fields.');
      return;
    }
    if (!email.includes('@')) {
      setFormError(language === 'ar' ? 'يرجى إدخال عنوان بريد إلكتروني صحيح وموثق.' : 'Please enter a valid email address.');
      return;
    }

    setFormError('');
    setFormSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 200);
  };

  // Review submission handler
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim() || !newReviewCountry.trim()) {
      alert(language === 'ar' ? 'يرجى ملء اسمك بالكامل، دولتك، وملاحظات تقييمك للإقامة.' : 'Please fill in your name, country, and review comments.');
      return;
    }

    const brandNewReview: Review = {
      id: `rev-custom-${Math.random().toString(36).substr(2, 9)}`,
      name: newReviewName,
      country: newReviewCountry,
      rating: newReviewRating,
      text: newReviewText,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedReviews = [brandNewReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('iadh_guest_reviews', JSON.stringify(updatedReviews));

    // Reset review form
    setNewReviewName('');
    setNewReviewCountry('');
    setNewReviewRating(5);
    setNewReviewText('');
    setReviewSubmitted(true);

    setTimeout(() => {
      setReviewSubmitted(false);
    }, 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-20 text-neutral-100">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block">{t.connectTeam}</span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-tight">
          {t.contactLocation}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
          {t.contactDesc}
        </p>
      </div>

      {/* Grid: Contacts Info & Contact Form */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Column 1: Physical Coordinates & Fast Dialing channels */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="rounded-2xl border border-gold-800/20 bg-brand-purple-900/10 p-6 space-y-6 text-start">
            <h3 className="font-display text-base font-extrabold text-gold-300 uppercase tracking-wider border-b border-gold-800/20 pb-3">
              {t.directConnections}
            </h3>

            <div className="space-y-6">
              {/* Phone Channel */}
              <a
                href="tel:+971585213003"
                className="flex items-start gap-4 group text-start"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/20 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block font-bold">{t.whatsappCall}</span>
                  <span className="text-base font-extrabold text-neutral-200 font-mono tracking-wider group-hover:text-gold-400 transition-colors">+971 58 521 3003</span>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{t.whatsappCallDesc}</p>
                </div>
              </a>

              {/* Email Channel */}
              <a
                href="mailto:bookings@abudhabihostel.ae"
                className="flex items-start gap-4 group text-start"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/20 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block font-bold">{t.emailLabel}</span>
                  <span className="text-sm font-extrabold text-neutral-200 font-mono tracking-wide group-hover:text-gold-400 transition-colors">bookings@abudhabihostel.ae</span>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{t.emailDesc}</p>
                </div>
              </a>

              {/* Physical Address */}
              <div className="flex items-start gap-4 text-start">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block font-bold">{language === 'ar' ? 'عنوان النزل بالتفصيل' : 'Our Villa Address'}</span>
                  <p className="text-xs leading-relaxed text-neutral-300 font-medium">
                    {language === 'ar' 
                      ? 'دولة الإمارات العربية المتحدة، أبوظبي، حي المشرف الفاخر، قطاع W52، خلف سفارة فيتنام، شارع القريب، فيلا ٣١'
                      : 'Villa 31, Burq Al Mutla\'iyyat Street, Al Qareeb St, Behind Vietnam Embassy, Al Mushrif, W52 Sector, Abu Dhabi, United Arab Emirates'}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Security Badge */}
          <div className="rounded-xl border border-gold-800/15 bg-brand-purple-950 p-5 flex items-start gap-3.5 text-start">
            <CheckCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              <strong className="text-neutral-200 block mb-0.5">{t.preArrivalBadge}</strong>
              {t.preArrivalBadgeDesc}
            </p>
          </div>

        </div>

        {/* Column 2: Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-gold-800/20 bg-brand-purple-900/25 p-6 sm:p-8 text-start space-y-6">
            <h3 className="font-display text-lg font-extrabold text-neutral-100 uppercase tracking-wide">
              {t.sendOnlineInquiry}
            </h3>

            {formSubmitted ? (
              <div className="rounded-xl border border-gold-400/30 bg-[#0f041c]/80 p-8 text-center space-y-4 animate-fade-in">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-400/10 border border-gold-400">
                  <CheckCircle className="h-6 w-6 text-gold-400" />
                </div>
                <h4 className="font-display text-base font-extrabold text-gold-300 uppercase tracking-wider">{t.inquirySuccess}</h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  {t.inquirySuccessDesc}
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 text-xs font-bold text-gold-400 hover:underline"
                >
                  {t.sendAnotherMessage}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-start">
                {formError && (
                  <p className="text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
                    {formError}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-300 mb-1.5">{t.fullNameLabel}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Liam Smith"
                      className="w-full rounded-lg border border-gold-800/60 bg-[#0f041c] py-2 px-3 text-xs text-neutral-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-300 mb-1.5">{t.emailLabel}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. liam@example.com"
                      className="w-full rounded-lg border border-gold-800/60 bg-[#0f041c] py-2 px-3 text-xs text-neutral-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-300 mb-1.5">{t.phoneLabel}</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +971 58 521 3003"
                    className="w-full rounded-lg border border-gold-800/60 bg-[#0f041c] py-2 px-3 text-xs text-neutral-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-300 mb-1.5">{t.messageLabel}</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.messagePlaceholder}
                    className="w-full rounded-lg border border-gold-800/60 bg-[#0f041c] py-2 px-3 text-xs text-neutral-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold-600 to-gold-400 py-3 text-xs font-bold uppercase tracking-widest text-brand-purple-950 hover:brightness-110 transition-all shadow animate-pulse"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.sendInquiryBtn}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </section>

      {/* Interactive Landmarks Guide & Map Representation */}
      <section className="space-y-8">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block">{t.interactiveGuideTitle}</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-100 uppercase">
            {t.explorerTitle}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans">
            {t.explorerDesc}
          </p>
        </div>

        {/* Landmarks Container layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* List of Landmarks (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-2">
            {ATTRACTIONS.map((att) => {
              let translatedName = att.name;
              let translatedDistance = att.distance;
              let translatedCategory = att.category;

              if (language === 'ar') {
                if (att.name === 'Vietnam Embassy') {
                  translatedName = 'سفارة جمهورية فيتنام';
                  translatedDistance = '٣٠ ثانية مشياً';
                  translatedCategory = 'معلم محلي مباشر';
                } else if (att.name === 'Al Mushrif Palace & Park') {
                  translatedName = 'منتزه وقصر المشرف العامر';
                  translatedDistance = '٣ دقائق بالسيارة';
                  translatedCategory = 'ترفيه ونشاط';
                } else if (att.name === 'Sheikh Zayed Grand Mosque') {
                  translatedName = 'جامع الشيخ زايد الكبير';
                  translatedDistance = '١٢ دقيقة بالسيارة';
                  translatedCategory = 'ثقافة وعبادة';
                } else if (att.name === 'Louvre Abu Dhabi') {
                  translatedName = 'متحف اللوفر أبوظبي';
                  translatedDistance = '١٥ دقيقة بالسيارة';
                  translatedCategory = 'فنون وثقافة عالمية';
                } else if (att.name === 'Yas Island & Theme Parks') {
                  translatedName = 'جزيرة ياس والمدن الترفيهية';
                  translatedDistance = '٢٢ دقيقة بالسيارة';
                  translatedCategory = 'مغامرة وتشويق';
                } else if (att.name === 'Abu Dhabi Corniche & Beach') {
                  translatedName = 'كورنيش وشاطئ أبوظبي العام';
                  translatedDistance = '١٠ دقائق بالسيارة';
                  translatedCategory = 'شاطئ واسترخاء';
                }
              }

              return (
                <button
                  key={att.name}
                  onClick={() => setSelectedAttraction(att)}
                  className={`flex items-start gap-3 p-4 rounded-xl border text-start transition-all ${
                    selectedAttraction.name === att.name
                      ? 'border-gold-400 bg-brand-purple-800/30'
                      : 'border-gold-800/10 bg-brand-purple-900/10 hover:border-gold-800/40'
                  }`}
                >
                  <Compass className={`w-5 h-5 shrink-0 mt-0.5 ${selectedAttraction.name === att.name ? 'text-gold-400' : 'text-neutral-500'}`} />
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-extrabold text-neutral-200">{translatedName}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-bold uppercase">
                      <span className="text-gold-500 font-extrabold">{translatedDistance}</span>
                      <span>·</span>
                      <span>{translatedCategory}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Information Panel */}
          <div className="lg:col-span-7 rounded-2xl border border-gold-800/30 bg-gradient-to-tr from-[#1a0831] to-[#0f041c] p-6 sm:p-8 flex flex-col justify-between text-start">
            
            {/* Styled Map Graphic representing the connection */}
            <div className="relative rounded-xl border border-gold-800/20 bg-[#0f041c] aspect-16/9 overflow-hidden flex items-center justify-center">
              {/* Loaded Mosque Reflection Background if Grand Mosque selected */}
              {selectedAttraction.name === 'Sheikh Zayed Grand Mosque' ? (
                <img 
                  src="https://images.unsplash.com/photo-1544918877-460635b657e0?auto=format&fit=crop&w=800&q=80" 
                  alt="Sheikh Zayed Grand Mosque Map BG" 
                  className="absolute inset-0 h-full w-full object-cover opacity-20"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(#cca43b0d_1px,transparent_1.5px)] bg-[size:12px_12px]" />
              )}
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-400/10 border border-gold-400 animate-pulse">
                  <span className="text-gold-400 font-bold text-sm">🏨</span>
                </div>
                <span className="text-[9px] font-bold text-gold-400 font-mono tracking-wider uppercase bg-[#1a0831] px-2 py-0.5 border border-gold-800/40 rounded">
                  {language === 'ar' ? 'فيلا ٣١ - النزل' : 'Villa 31 Hostel'}
                </span>
              </div>

              {/* Connecting path and selected attraction point */}
              <div className="absolute top-1/4 right-1/4 flex flex-col items-center gap-1 text-center z-10">
                <div className="h-3.5 w-3.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[9px] text-neutral-100 bg-brand-purple-950 px-2 py-0.5 rounded border border-gold-800/20 font-bold">
                  {language === 'ar' && selectedAttraction.name === 'Sheikh Zayed Grand Mosque' ? 'مسجد الشيخ زايد الكبير' : selectedAttraction.name}
                </span>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <div className="flex items-center gap-2 font-bold uppercase text-[10px]">
                <span className="text-gold-400">
                  {language === 'ar' 
                    ? (selectedAttraction.category === 'Local Landmark' ? 'معلم محلي' : selectedAttraction.category === 'Leisure' ? 'ترفيه ونشاط' : selectedAttraction.category === 'Culture' ? 'ثقافة وعمارة' : selectedAttraction.category === 'Art & Museum' ? 'فن ومتاحف' : 'شواطئ ومعالم ترفيهية')
                    : selectedAttraction.category}
                </span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-400">
                  {language === 'ar' ? 'المسافة:' : 'Distance:'} {language === 'ar' 
                    ? (selectedAttraction.distance === '30 seconds walk' ? '٣٠ ثانية مشياً' : selectedAttraction.distance === '3 mins drive / 12 mins walk' ? '٣ دقائق بالسيارة / ١٢ دقيقة مشياً' : selectedAttraction.distance === '12 mins drive' ? '١٢ دقيقة بالسيارة' : selectedAttraction.distance === '15 mins drive' ? '١٥ دقيقة بالسيارة' : selectedAttraction.distance === '22 mins drive' ? '٢٢ دقيقة بالسيارة' : '١٠ دقائق بالسيارة')
                    : selectedAttraction.distance}
                </span>
              </div>
              <h3 className="font-display text-lg font-extrabold text-neutral-100 uppercase tracking-wide">
                {t.transitGuide} {language === 'ar' && selectedAttraction.name === 'Sheikh Zayed Grand Mosque' ? 'جامع الشيخ زايد الكبير' : selectedAttraction.name}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans font-medium">
                {language === 'ar'
                  ? (selectedAttraction.name === 'Vietnam Embassy' ? 'تقع فيلتنا الفاخرة خلف سفارة جمهورية فيتنام مباشرة في منطقة المشرف السكنية الفاخرة، مما يوفر للنزلاء بيئة هادئة وآمنة للغاية وسهلة التحديد على الخرائط.'
                     : selectedAttraction.name === 'Al Mushrif Palace & Park' ? 'منتزه فسيح ومورق يقع على بعد دقائق قليلة مشياً على الأقدام، وهو مثالي لرياضة الجري والمشي الصباحي، واستكشاف الحدائق النباتية المحلية.'
                     : selectedAttraction.name === 'Sheikh Zayed Grand Mosque' ? 'جامع الشيخ زايد الكبير هو تحفة معمارية إسلامية مذهلة تمثل درة معالم دولة الإمارات. يتميز بـ ٨٢ قبة رخامية بيضاء مذهلة ومساحات خلابة، ويبعد ١٢ دقيقة بالسيارة فقط عن فيلا النزل.'
                     : selectedAttraction.name === 'Louvre Abu Dhabi' ? 'متحف اللوفر العائم الرائع في جزيرة السعديات، يعرض روائع فنية وتاريخية هامة تروي قصة التراث البشري المشترك.'
                     : selectedAttraction.name === 'Yas Island & Theme Parks' ? 'موطن عالم فيراري، وعالم وارنر براذرز، وياس ووتروورلد، وحلبة مرسى ياس الشهيرة لسباقات الفورمولا ١.'
                     : 'أميال من الشاطئ الرملي العام الرائع، ومسارات المشي وركوب الدراجات المطلة على مياه الخليج العربي المتلألئة.')
                  : selectedAttraction.description}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Dynamic Guest Review Corner */}
      <section className="border-t border-gold-800/20 pt-16 space-y-12 text-start">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Submit Review Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block">{t.shareExperience}</span>
              <h2 className="font-display text-2xl font-extrabold text-neutral-100 uppercase">
                {t.writeReview}
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {t.writeReviewDesc}
              </p>
            </div>

            <form onSubmit={handleReviewSubmit} className="rounded-2xl border border-gold-800/20 bg-brand-purple-900/15 p-5 space-y-4 text-start">
              {reviewSubmitted && (
                <p className="text-xs font-semibold text-gold-400 bg-gold-400/10 border border-gold-400/20 px-3 py-2 rounded-lg">
                  {t.reviewSuccess}
                </p>
              )}
              
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-300 mb-1.5">{t.fullNameLabel}</label>
                <input
                  type="text"
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="e.g. Jean Dupont"
                  className="w-full rounded-lg border border-gold-800/60 bg-[#0f041c] py-2 px-3 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-300 mb-1.5">{t.countryLabel}</label>
                <input
                  type="text"
                  value={newReviewCountry}
                  onChange={(e) => setNewReviewCountry(e.target.value)}
                  placeholder="e.g. France"
                  className="w-full rounded-lg border border-gold-800/60 bg-[#0f041c] py-2 px-3 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-300 mb-1.5">{t.ratingLabel}</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="text-gold-500 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= newReviewRating ? 'fill-gold-500 text-gold-500' : 'text-neutral-600'}`} />
                    </button>
                  ))}
                  <span className="text-xs text-neutral-400 font-mono ml-2">({newReviewRating}/5 {t.stars})</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-300 mb-1.5">{t.reviewCommentLabel}</label>
                <textarea
                  rows={3}
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder={t.reviewCommentPlaceholder}
                  className="w-full rounded-lg border border-gold-800/60 bg-[#0f041c] py-2 px-3 text-xs text-neutral-100 focus:outline-none focus:border-gold-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-gold-400 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-purple-950 hover:bg-gold-300 transition-colors shadow"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.submitFeedbackBtn}</span>
              </button>
            </form>
          </div>

          {/* Active Review Stream */}
          <div className="lg:col-span-7 space-y-4 text-start">
            <h3 className="font-display text-base font-extrabold text-neutral-100 uppercase tracking-wide border-b border-gold-800/20 pb-3">
              {t.liveExperiences}
            </h3>

            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
              {reviews.map((rev) => {
                let translatedText = rev.text;
                if (language === 'ar') {
                  if (rev.id === 'rev-1') {
                    translatedText = 'تجربة استثنائية رائعة بحق! غرف النوم المشتركة نظيفة جداً واللمسات الذهبية تمنح النزل شعوراً بالفخامة والتميز. يقع النزل خلف سفارة فيتنام بالمشرف مباشرة، في حي سكني راقٍ جداً وآمن.';
                  } else if (rev.id === 'rev-2') {
                    translatedText = 'أنصح بشدة بغرفة الإناث الملكية! صالون المكياج والتزيين ومجففات الشعر الممتازة والستائر المخملية الثقيلة للخصوصية كانت لمسات مذهلة للغاية. المضيفون ودودون جداً ومستعدون للمساعدة في أي وقت!';
                  } else if (rev.id === 'rev-3') {
                    translatedText = 'النظافة والتعقيم ١٠ من ١٠. الغرفة التنفيذية الخاصة كانت ممتازة وهادئة جداً، سرير مريح وآلة قهوة إسبريسو رائعة. إقامة مثالية وفاخرة في أبوظبي.';
                  }
                }

                return (
                  <div
                    key={rev.id}
                    className="rounded-xl border border-gold-800/10 bg-brand-purple-900/10 p-5 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-extrabold text-neutral-200">{rev.name}</h4>
                        <span className="text-[10px] text-neutral-400 font-bold">{rev.country} · {rev.date}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans italic">
                      "{translatedText}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
