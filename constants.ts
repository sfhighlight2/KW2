
import { Car, Testimonial, FAQItem } from './types';

export const FLEET: Car[] = [
  {
    id: '1',
    name: 'Cadillac Escalade',
    brand: 'Cadillac',
    image: '/cadillac-escalade-4.jpg',
    topSpeed: '200 km/h',
    acceleration: '4.4 sec',
    power: '682 hp',
    pricePerDay: 900,
    type: 'Luxury SUV'
  },
  {
    id: '2',
    name: 'Cadillac Escalade',
    brand: 'Cadillac',
    image: '/cadillac-escalade.jpg',
    topSpeed: '200 km/h',
    acceleration: '4.4 sec',
    power: '682 hp',
    pricePerDay: 900,
    type: 'Luxury SUV'
  },
  {
    id: '3',
    name: 'Cadillac Escalade',
    brand: 'Cadillac',
    image: '/cadillac-escalade-2.jpg',
    topSpeed: '200 km/h',
    acceleration: '4.4 sec',
    power: '682 hp',
    pricePerDay: 900,
    type: 'Luxury SUV'
  },
  {
    id: '4',
    name: 'Cadillac Escalade',
    brand: 'Cadillac',
    image: '/cadillac-escalade-3.jpg',
    topSpeed: '200 km/h',
    acceleration: '4.4 sec',
    power: '682 hp',
    pricePerDay: 900,
    type: 'Luxury SUV'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Michael R.',
    role: 'Corporate Executive',
    content: 'Professional, punctual, and flawless every time. The level of service is unmatched.',
    avatar: 'https://i.pravatar.cc/100?img=12'
  },
  {
    id: '2',
    name: 'Sophia L.',
    role: 'Event Client',
    content: 'From airport pickup to event transportation, everything was seamless. Highly recommend.',
    avatar: 'https://i.pravatar.cc/100?img=25'
  },
  {
    id: '3',
    name: 'Daniel P.',
    role: 'Business Owner',
    content: 'Clean vehicles, courteous drivers, and absolute reliability. Kingsway sets the standard.',
    avatar: 'https://i.pravatar.cc/100?img=33'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'What is the minimum booking time?',
    answer: 'Minimum booking is 4 hours for hourly service. Airport transfers are flat-rate.'
  },
  {
    question: 'Are chauffeurs professionally trained?',
    answer: 'Yes. All chauffeurs are licensed, experienced, and trained in luxury service standards.'
  },
  {
    question: 'Do you monitor flight delays?',
    answer: 'Yes. We track flights in real time to ensure timely airport pickups.'
  },
  {
    question: 'Can I request a specific vehicle?',
    answer: 'Absolutely. Vehicle selection is subject to availability.'
  }
];
