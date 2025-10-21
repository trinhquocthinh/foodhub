import Image from 'next/image';
import { IoStar } from 'react-icons/io5';

import { getImagePath } from '@/lib/getImagePath';
import type { Testimonial } from '@/types';

import './TestimonialsSection.scss';

export type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <section className="testimonials" id="testimonials">
      <h2 className="section-title">What our customers say?</h2>
      <p className="section-text">
        Hear from guests who have made Foodhub part of their weekly routine.
      </p>

      <div className="testimonials-grid">
        {testimonials.map(testimonial => (
          <div className="testimonials-card" key={testimonial.id}>
            <h4 className="card-title">{testimonial.title}</h4>
            <div
              className="testimonials-rating"
              aria-label={`Rated ${testimonial.rating} out of 5`}
            >
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <IoStar key={index} aria-hidden="true" />
              ))}
            </div>
            <p className="testimonials-text">{testimonial.body}</p>
            <div className="customer-info">
              <div className="customer-img-box">
                <Image
                  src={getImagePath(testimonial.image)}
                  alt={testimonial.name}
                  className="customer-img"
                  width={100}
                  height={100}
                />
              </div>
              <h5 className="customer-name">{testimonial.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
