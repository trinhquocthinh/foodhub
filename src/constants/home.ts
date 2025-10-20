import type { Service, Product, Testimonial } from '@/types';

export const services: Service[] = [
  {
    id: 'service-01',
    number: '01',
    title: 'Located in the heart of the city',
    description:
      'Find us steps away from downtown landmarks with easy access and extended opening hours.',
  },
  {
    id: 'service-02',
    number: '02',
    title: 'Fresh ingredients from organic farms',
    description:
      'We partner with trusted growers to source seasonal produce harvested at peak flavor.',
  },
  {
    id: 'service-03',
    number: '03',
    title: 'Swift delivery, 30 minutes or less',
    description:
      'Enjoy Foodhub favorites at home thanks to our dedicated delivery fleet and smart routing.',
  },
  {
    id: 'service-04',
    number: '04',
    title: 'Experienced, passionate chefs',
    description:
      'Our culinary team blends global inspiration with classic techniques to craft signature dishes.',
  },
  {
    id: 'service-05',
    number: '05',
    title: 'Hospitality that feels personal',
    description:
      'From the first greeting to the final course, we focus on meaningful, memorable guest experiences.',
  },
];

export const products: Product[] = [
  {
    id: 'dish-01',
    name: 'Stracciatella',
    price: 11,
    description:
      'Heirloom tomatoes, basil oil, charred corn, and creamy stracciatella with toasted focaccia.',
    image: '/images/menu1.jpg',
    tags: ['vegan'],
    rating: 5,
  },
  {
    id: 'dish-02',
    name: 'Chevrefrit au miel',
    price: 14,
    description:
      'Crispy goat cheese with wildflower honey, arugula, and toasted walnuts.',
    image: '/images/menu2.jpg',
    rating: 5,
  },
  {
    id: 'dish-03',
    name: 'Saumon Gravlax',
    price: 9,
    description:
      'House-cured salmon, pickled cucumber, dill crème fraîche, and rye crumble.',
    image: '/images/menu3.jpg',
    rating: 5,
  },
  {
    id: 'dish-04',
    name: 'Croustillant de poisson',
    price: 12,
    description:
      'Spiced crispy fish, chili aioli, charred citrus, and shaved fennel salad.',
    image: '/images/menu4.jpg',
    tags: ['hot'],
    rating: 5,
  },
  {
    id: 'dish-05',
    name: 'Carpaccio de daurade',
    price: 19,
    description:
      'Sea bream with lime zest, pink peppercorn, micro herbs, and olive oil pearls.',
    image: '/images/menu5.jpg',
    tags: ['vegan'],
    rating: 5,
  },
  {
    id: 'dish-06',
    name: 'Citrus Panna Cotta',
    price: 8,
    description:
      'Silky vanilla panna cotta, blood orange gelée, candied zest, and pistachio crumble.',
    image: '/images/menu2.jpg',
    rating: 5,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-01',
    title: 'Very tasty',
    body: 'Foodhub has become my go-to for business lunches. The dishes are vibrant, balanced, and always beautifully presented.',
    name: 'Emma Newman',
    image: '/images/testimonials1.jpg',
    rating: 5,
  },
  {
    id: 'testimonial-02',
    title: 'I have lunch here every day',
    body: 'The team remembers my favorite orders and the menu never stops surprising me. Comfort food elevated in the best way.',
    name: 'Paul Trueman',
    image: '/images/testimonials2.jpg',
    rating: 5,
  },
];
