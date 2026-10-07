export interface Room {
  id: string;
  name: string;
  type: 'dorm' | 'private';
  price: number; // In AED
  capacity: string;
  description: string;
  facilities: string[];
  gradient: string;
  gender?: 'mixed' | 'female' | 'private';
}

export interface Booking {
  id: string;
  roomName: string;
  roomPrice: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  addOns: string[];
  totalPrice: number;
  bookingRef: string;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  date: string;
}
