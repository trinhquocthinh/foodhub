import type { Service } from '@/types';

import './ServicesSection.scss';

export type ServicesSectionProps = {
  services: Service[];
};

const ServicesSection = ({ services }: ServicesSectionProps) => {
  return (
    <section className="services" id="services">
      {services.map(service => (
        <div className="service-card" key={service.id}>
          <p className="card-number">{service.number}</p>
          <h3 className="card-heading">{service.title}</h3>
          <p className="card-text">{service.description}</p>
        </div>
      ))}
    </section>
  );
};

export default ServicesSection;
