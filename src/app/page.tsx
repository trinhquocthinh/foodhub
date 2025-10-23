import { memo } from 'react';

import {
  HomeSection,
  AboutSection,
  ServicesSection,
  ProductSection,
  TestimonialsSection,
  ContactSection,
} from '@/components';
import { services, products, testimonials } from '@/constants/home';

const Page = () => (
  <>
    <HomeSection />
    <AboutSection />
    <ServicesSection services={services} />
    <ProductSection products={products} />
    <TestimonialsSection testimonials={testimonials} />
    <ContactSection />
  </>
);

export default memo(Page);
