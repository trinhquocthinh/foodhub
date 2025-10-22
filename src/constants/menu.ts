import type { MenuItem } from '@/types';

type MenuCategory = {
  id: 'all' | MenuItem['category'];
  label: string;
  helper?: string;
};

type MenuDietaryFilter = {
  id: NonNullable<MenuItem['tags']>[number];
  label: string;
};

type MenuSortOption = {
  id: 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'alphabetical';
  label: string;
  sortBy: 'original' | 'price' | 'rating' | 'name';
  sortAscending?: boolean;
  helper?: string;
};

export const menuCategories: MenuCategory[] = [
  {
    id: 'all',
    label: 'All dishes',
    helper: 'Browse the full experience curated by our kitchen team.',
  },
  {
    id: 'starters',
    label: 'Starters',
    helper: 'Seasonal small plates designed for sharing.',
  },
  {
    id: 'mains',
    label: 'Mains',
    helper: 'Comforting signatures and modern classics.',
  },
  {
    id: 'sides',
    label: 'Sides',
    helper: 'Vibrant accompaniments to round out the table.',
  },
  {
    id: 'desserts',
    label: 'Desserts',
    helper: 'Sweet finishes crafted in-house daily.',
  },
  {
    id: 'drinks',
    label: 'Drinks',
    helper: 'Refreshers, juices, and crafted mocktails.',
  },
];

export const menuDietaryFilters: MenuDietaryFilter[] = [
  { id: 'vegan', label: 'Plant-based' },
  { id: 'gluten-free', label: 'Gluten friendly' },
  { id: 'hot', label: 'Spicy' },
  { id: 'signature', label: 'Chef signature' },
  { id: 'seasonal', label: 'Seasonal pick' },
];

export const menuSortOptions: MenuSortOption[] = [
  {
    id: 'recommended',
    label: 'Chef recommends',
    sortBy: 'original',
    helper: 'Balanced tasting journey from light to bold.',
  },
  {
    id: 'price-asc',
    label: 'Price · Low to high',
    sortBy: 'price',
    sortAscending: true,
  },
  {
    id: 'price-desc',
    label: 'Price · High to low',
    sortBy: 'price',
    sortAscending: false,
  },
  {
    id: 'rating',
    label: 'Top rated',
    sortBy: 'rating',
    sortAscending: false,
  },
  {
    id: 'alphabetical',
    label: 'A to Z',
    sortBy: 'name',
    sortAscending: true,
  },
];

export const menuItems: MenuItem[] = [
  {
    id: 'menu-burrata-citrus',
    name: 'Burrata & Citrus',
    description:
      'Creamy burrata, charred grapefruit, basil oil, and toasted pistachio crumble.',
    price: 13,
    category: 'starters',
    tags: ['seasonal', 'gluten-free'],
    image: '/images/menu1.jpg',
    rating: 5,
    calories: 320,
    prepTime: 8,
    highlight: 'Pair with a crisp elderflower spritz to brighten the citrus.',
  },
  {
    id: 'menu-charred-carrot',
    name: 'Charred Carrot Hummus',
    description:
      'Smoked chickpea purée, roasted rainbow carrots, pomegranate, and mint tahini.',
    price: 11,
    category: 'starters',
    tags: ['vegan', 'seasonal'],
    image: '/images/menu2.jpg',
    rating: 4.8,
    calories: 280,
    prepTime: 10,
  },
  {
    id: 'menu-crispy-cauliflower',
    name: 'Crispy Cauliflower',
    description:
      'Harissa glaze, golden raisins, and whipped labneh finished with toasted sesame.',
    price: 12,
    category: 'sides',
    tags: ['hot', 'signature'],
    image: '/images/menu3.jpg',
    rating: 4.9,
    calories: 260,
    prepTime: 12,
  },
  {
    id: 'menu-citrus-salmon',
    name: 'Citrus-Cured Salmon',
    description:
      'House-cured salmon, dill crème fraîche, pickled cucumber, and rye crumble.',
    price: 18,
    category: 'starters',
    tags: ['signature'],
    image: '/images/menu4.jpg',
    rating: 5,
    calories: 340,
    prepTime: 9,
  },
  {
    id: 'menu-black-garlic-risotto',
    name: 'Black Garlic Risotto',
    description:
      'Aged carnaroli rice, wild mushrooms, truffle espuma, and parmesan crisp.',
    price: 24,
    category: 'mains',
    tags: ['signature', 'gluten-free'],
    image: '/images/food1.png',
    rating: 5,
    calories: 540,
    prepTime: 16,
  },
  {
    id: 'menu-miso-cod',
    name: 'Miso Glazed Cod',
    description:
      'Caramelized black cod, citrus kosho, charred broccolini, and jasmine rice.',
    price: 27,
    category: 'mains',
    tags: ['seasonal', 'gluten-free'],
    image: '/images/food2.png',
    rating: 4.9,
    calories: 480,
    prepTime: 14,
  },
  {
    id: 'menu-saffron-gnocchi',
    name: 'Saffron Gnocchi',
    description:
      'Hand-rolled potato gnocchi, blistered tomato fondue, basil pesto, and pecorino.',
    price: 21,
    category: 'mains',
    tags: ['signature'],
    image: '/images/food3.png',
    rating: 4.7,
    calories: 510,
    prepTime: 13,
  },
  {
    id: 'menu-charred-cabbage',
    name: 'Charred Savoy Cabbage',
    description:
      'Smoked almond romesco, crisp apple, pickled mustard seeds, and almond praline.',
    price: 18,
    category: 'mains',
    tags: ['vegan', 'seasonal'],
    image: '/images/menu5.jpg',
    rating: 4.8,
    calories: 390,
    prepTime: 15,
  },
  {
    id: 'menu-crispy-potatoes',
    name: 'Crispy Potatoes',
    description:
      'Triple-cooked potatoes with rosemary salt, preserved lemon aioli, and chives.',
    price: 9,
    category: 'sides',
    tags: ['gluten-free'],
    image: '/images/menu2.jpg',
    rating: 4.6,
    calories: 320,
    prepTime: 7,
  },
  {
    id: 'menu-chocolate-silk',
    name: 'Midnight Chocolate Silk',
    description:
      'Single-origin chocolate mousse, smoked sea salt caramel, and cocoa nib crunch.',
    price: 11,
    category: 'desserts',
    tags: ['signature'],
    image: '/images/menu3.jpg',
    rating: 5,
    calories: 420,
    prepTime: 6,
  },
  {
    id: 'menu-citrus-panna-cotta',
    name: 'Citrus Panna Cotta',
    description:
      'Silky vanilla panna cotta with blood orange gelée, candied zest, and pistachio dust.',
    price: 10,
    category: 'desserts',
    tags: ['gluten-free', 'seasonal'],
    image: '/images/menu1.jpg',
    rating: 4.9,
    calories: 360,
    prepTime: 5,
  },
  {
    id: 'menu-elderflower-spritz',
    name: 'Elderflower Spritz',
    description:
      'Sparkling citrus, cucumber coolers, and elderflower tonic with botanical ice.',
    price: 8,
    category: 'drinks',
    tags: ['seasonal'],
    image: '/images/menu4.jpg',
    rating: 4.5,
    calories: 80,
    prepTime: 4,
  },
  {
    id: 'menu-smoked-espresso',
    name: 'Smoked Espresso Tonic',
    description:
      'Cold-brew espresso, smoked rosemary syrup, tonic, and charred orange.',
    price: 7,
    category: 'drinks',
    tags: ['signature'],
    image: '/images/menu5.jpg',
    rating: 4.7,
    calories: 90,
    prepTime: 3,
  },
];
