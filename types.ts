
export enum ServiceCategory {
  AIRPORT = 'Airport Transfer',
  CORPORATE = 'Corporate Events',
  PRIVATE = 'Private Occasions',
  TOURISM = 'City Tours'
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  image: string;
  topSpeed: string;
  acceleration: string;
  power: string;
  pricePerDay: number;
  type: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
