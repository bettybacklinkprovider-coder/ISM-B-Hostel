import { Room, Review } from './types';

export const ROOMS_DATA: Room[] = [
  {
    id: 'gold-mixed-dorm',
    name: 'Golden Premium Mixed Dorm',
    type: 'dorm',
    gender: 'mixed',
    price: 85,
    capacity: '10 Luxury Beds',
    description: 'A spacious, premium social dorm with individual gold privacy curtains, personalized USB chargers, and private digital lockers.',
    facilities: ['Air Conditioning', 'High-speed Wi-Fi', 'Individual Locker', 'Privacy Curtain', 'Reading Light', 'Shared Luxury Bathroom'],
    gradient: 'from-[#3b1d5c] via-[#220a3b] to-[#120322]'
  },
  {
    id: 'royal-female-dorm',
    name: 'Royal Female-Only Dorm',
    type: 'dorm',
    gender: 'female',
    price: 95,
    capacity: '8 Cozy Beds',
    description: 'An elegant female-only sanctuary featuring enhanced privacy, vanity mirrors, custom makeup tables, and top-tier security.',
    facilities: ['Air Conditioning', 'High-speed Wi-Fi', 'Ensuite Bathroom', 'Vanity Mirror', 'Hairdryer & Iron', 'Secure Keycard Access'],
    gradient: 'from-[#421b5e] via-[#2d0e45] to-[#170428]'
  },
  {
    id: 'mushrif-private',
    name: 'Al Mushrif Executive Private Room',
    type: 'private',
    gender: 'private',
    price: 280,
    capacity: 'Up to 2 Guests (1 King Bed)',
    description: 'A sophisticated private double room with keycard access, a plush king bed, executive work desk, and a personal Smart TV.',
    facilities: ['King Size Bed', 'Ensuite Luxury Bathroom', '55" Smart TV', 'Work Desk & Chair', 'Minibar & Fridge', 'Espresso Machine'],
    gradient: 'from-[#4a125a] via-[#310c3d] to-[#1a0422]'
  },
  {
    id: 'deluxe-family-suite',
    name: 'Abu Dhabi Deluxe Family Suite',
    type: 'private',
    gender: 'private',
    price: 450,
    capacity: 'Up to 4 Guests',
    description: 'A luxury family-sized suite containing 1 Queen bed and 2 Single beds, a spacious lounge area, coffee bar, and stunning garden view.',
    facilities: ['1 Queen + 2 Single Beds', 'Spacious Lounge Area', 'Premium Ensuite with Bathtub', 'Mini-Fridge & Kettle', 'Smart TV with Streaming', 'Panoramic Views'],
    gradient: 'from-[#541454] via-[#380938] to-[#1d021d]'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Alexander Rostova',
    country: 'Netherlands',
    rating: 5,
    text: 'Outstanding experience! Very clean dorms and the gold accents give the hostel a super premium feel. It is literally behind the Vietnam Embassy in Al Mushrif, a very safe and high-end residential neighborhood.',
    date: '2026-09-28'
  },
  {
    id: 'rev-2',
    name: 'Sophia Sterling',
    country: 'United Kingdom',
    rating: 5,
    text: 'Highly recommend the Royal Female-Only Dorm! The makeup vanity desk, premium hairdryer, and heavy velvet privacy curtains were marvelous touches. Extremely friendly and helpful staff!',
    date: '2026-10-02'
  },
  {
    id: 'rev-3',
    name: 'Tariq Al-Mansoor',
    country: 'Saudi Arabia',
    rating: 5,
    text: 'Cleanliness is 10/10. The private executive room was excellent, very quiet, comfortable bed, and nice espresso machine. Perfect stay in Abu Dhabi.',
    date: '2026-10-05'
  }
];

export const ATTRACTIONS = [
  {
    name: 'Vietnam Embassy',
    category: 'Local Landmark',
    distance: '30 seconds walk',
    description: 'Located directly behind the Embassy. Very peaceful, safe, and easily recognizable landmark.',
    coordinates: { x: 50, y: 52 }
  },
  {
    name: 'Al Mushrif Palace & Park',
    category: 'Leisure',
    distance: '3 mins drive / 12 mins walk',
    description: 'A stunning, lush green park perfect for morning walks, jogging, and exploring local botanical gardens.',
    coordinates: { x: 42, y: 40 }
  },
  {
    name: 'Sheikh Zayed Grand Mosque',
    category: 'Culture',
    distance: '12 mins drive',
    description: 'The iconic architectural masterpiece of the UAE. A breathtakingly beautiful spiritual site with 82 white domes.',
    coordinates: { x: 25, y: 75 }
  },
  {
    name: 'Louvre Abu Dhabi',
    category: 'Art & Museum',
    distance: '15 mins drive',
    description: 'Stunning floating dome museum on Saadiyat Island, showcasing globally significant human artistic masterpieces.',
    coordinates: { x: 70, y: 15 }
  },
  {
    name: 'Yas Island & Theme Parks',
    category: 'Adventure',
    distance: '22 mins drive',
    description: 'Home to Ferrari World, Warner Bros. World, Yas Waterworld, and the famous Yas Marina Formula 1 circuit.',
    coordinates: { x: 88, y: 35 }
  },
  {
    name: 'Abu Dhabi Corniche & Beach',
    category: 'Beach',
    distance: '10 mins drive',
    description: 'Miles of pristine public beach, walking and cycling paths overlooking the Persian Gulf.',
    coordinates: { x: 20, y: 22 }
  }
];

export const FAQS = [
  {
    question: 'Where exactly is the hostel located?',
    answer: 'We are situated in the prestigious W52 Sector of Al Mushrif, Abu Dhabi, right behind the Vietnam Embassy (Villa 31, Burq Al Mutla\'iyyat Street / Al Qareeb St). This is a safe, embassy-rich neighborhood with easy access to bus stops, taxi stands, and major tourist spots.'
  },
  {
    question: 'What are the check-in and check-out timings?',
    answer: 'Our standard check-in is from 2:00 PM onwards, and check-out is by 12:00 PM. Early check-in or late check-out can be requested in advance and is subject to availability.'
  },
  {
    question: 'Do you offer airport transfers?',
    answer: 'Yes! We can arrange a premium private airport shuttle from Abu Dhabi International Airport (AUH) starting from AED 120. You can book this directly via our website booking form under Add-Ons.'
  },
  {
    question: 'How secure is the hostel?',
    answer: 'Security is our utmost priority. We feature 24/7 front desk presence, electronic smart keycard access to rooms, CCTV coverage in all common areas, and individual high-security digital code lockers for your valuables.'
  },
  {
    question: 'Is parking available?',
    answer: 'Yes, we provide free street parking in front of the villa for guests who choose to travel by or rent a car.'
  }
];
