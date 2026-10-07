import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

// Pages
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import About from './pages/About';
import Contact from './pages/Contact';
import BookingsDashboard from './pages/BookingsDashboard';

// Types
import { Booking } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [currency, setCurrency] = useState('AED');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [language, setLanguage] = useState<'en' | 'ar'>(() => {
    const saved = localStorage.getItem('iadh_language');
    return (saved === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  });

  const handleSetLanguage = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    localStorage.setItem('iadh_language', lang);
  };

  // Hash Router Synchronizer
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['home', 'rooms', 'about', 'contact', 'bookings'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
        // Scroll to top upon navigation
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Fallback or default
        setActiveTab('home');
      }
    };

    // Trigger on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Load Bookings from Local Storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('iadh_user_bookings');
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch (e) {
        setBookings([]);
      }
    }
  }, []);

  // Save/Update Bookings
  const handleSaveBooking = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('iadh_user_bookings', JSON.stringify(updated));
  };

  // Cancel Booking Request
  const handleCancelBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking stay request?')) {
      const updated = bookings.filter((b) => b.id !== bookingId);
      setBookings(updated);
      localStorage.setItem('iadh_user_bookings', JSON.stringify(updated));
    }
  };

  // Nav actions
  const handleNavigate = (tab: string) => {
    window.location.hash = tab;
    setActiveTab(tab);
  };

  const handleOpenBookingWithRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setIsBookingOpen(true);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home
            onNavigate={handleNavigate}
            onOpenBookingWithRoom={handleOpenBookingWithRoom}
            currency={currency}
            language={language}
          />
        );
      case 'rooms':
        return (
          <Rooms
            onOpenBookingWithRoom={handleOpenBookingWithRoom}
            currency={currency}
            language={language}
          />
        );
      case 'about':
        return <About language={language} />;
      case 'contact':
        return <Contact currency={currency} language={language} />;
      case 'bookings':
        return (
          <BookingsDashboard
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onOpenBooking={() => handleOpenBookingWithRoom('')}
            currency={currency}
            language={language}
          />
        );
      default:
        return (
          <Home
            onNavigate={handleNavigate}
            onOpenBookingWithRoom={handleOpenBookingWithRoom}
            currency={currency}
            language={language}
          />
        );
    }
  };

  return (
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={{ 
        fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Plus Jakarta Sans, sans-serif',
        backgroundImage: `linear-gradient(rgba(15, 4, 28, 0.94), rgba(15, 4, 28, 0.94)), url('https://res.cloudinary.com/k7og2ybq/image/upload/v1791365699/unnamed_2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
      className="min-h-screen flex flex-col justify-between text-neutral-100 font-sans selection:bg-gold-500 selection:text-brand-purple-950 overflow-x-hidden"
    >
      
      {/* Universal Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBookingWithRoom('')}
        bookingsCount={bookings.length}
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={handleSetLanguage}
      />

      {/* Main Dynamic Viewport Container */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Universal footer */}
      <Footer onNavigate={handleNavigate} language={language} />

      {/* Step-by-Step Booking Wizard Modal popup */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialRoomId={selectedRoomId}
        onSaveBooking={handleSaveBooking}
        currency={currency}
        language={language}
      />
      
    </div>
  );
}
