export type NavLink = {
  label: string;
  href: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  tags?: Array<'vegan' | 'hot'>;
  rating?: number;
};

export type Testimonial = {
  id: string;
  title: string;
  body: string;
  name: string;
  image: string;
  rating: number;
};
