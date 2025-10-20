import type { NavLink, CartItem } from '@/types';

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Menu', href: '#menu' },
  { label: 'Testimonials', href: '#testimonials' },
];

export const cartItems: CartItem[] = [
  {
    id: 'saumon-gravlax',
    name: 'Saumon Gravlax',
    price: 9,
    image: '/images/menu1.jpg',
  },
  {
    id: 'chevrefrit',
    name: 'Chevrefrit au miel',
    price: 14,
    image: '/images/menu2.jpg',
  },
  {
    id: 'crispy-fish',
    name: 'Crispy Fish',
    price: 12,
    image: '/images/menu3.jpg',
  },
  {
    id: 'stracciatella',
    name: 'Stracciatella',
    price: 11,
    image: '/images/menu4.jpg',
  },
  {
    id: 'carpaccio',
    name: 'Sea Bream Carpaccio',
    price: 19,
    image: '/images/menu5.jpg',
  },
];
