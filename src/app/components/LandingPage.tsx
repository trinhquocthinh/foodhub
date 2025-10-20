'use client';

import AboutSection from '@/components/Home/AboutSection';
import HomeSection from '@/components/Home/HomeSection';
import Layout from '@/components/Layout';
import ProductSection from '@/components/Home/ProductSection';
import ServicesSection from '@/components/Home/ServicesSection';
import TestimonialsSection from '@/components/Home/TestimonialsSection';
import type { CartItem, NavLink, Product, Service, Testimonial } from '@/types';

export type LandingPageProps = {
  services: Service[];
  products: Product[];
  testimonials: Testimonial[];
};

const LandingPage = ({
  services,
  products,
  testimonials,
}: LandingPageProps) => {
  return (
    <>
      <HomeSection />
      <AboutSection />
      <ServicesSection services={services} />
      <ProductSection products={products} />
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
};

export default LandingPage;
