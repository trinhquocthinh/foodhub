import Link from 'next/link';
import {
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
} from 'react-icons/io5';

import './ContactSection.scss';

const ContactSection = () => {
  const details = [
    {
      id: 'contact-location',
      icon: <IoLocationOutline aria-hidden="true" />,
      label: 'Visit',
      value: '456 Nguyen Truong To, District 4, Ho Chi Minh City',
    },
    {
      id: 'contact-phone',
      icon: <IoCallOutline aria-hidden="true" />,
      label: 'Call',
      value: '+84 28 1234 5678',
      href: 'tel:+842812345678',
    },
    {
      id: 'contact-email',
      icon: <IoMailOutline aria-hidden="true" />,
      label: 'Email',
      value: 'hello@foodhub.vn',
      href: 'mailto:hello@foodhub.vn',
    },
  ];
  const leadCopy =
    'Contact us for large orders, catering, or personalized meal plans. We’ll get back to you within an hour during our service hours.';
  const conversationCopy =
    'Want some help choosing your dishes? Book a quick call and our team will help you create your ideal order.';

  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div className="contact__inner">
        <header className="contact__header">
          <h2 id="contact-heading">Let&apos;s plan your next visit</h2>
          <p className="contact__lead">{leadCopy}</p>
        </header>

        <div className="contact__grid">
          <div className="contact__card">
            <form className="contact__form" aria-label="Send us a message">
              <label htmlFor="contact-name">
                Your name
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Lin Tran"
                  required
                />
              </label>
              <label htmlFor="contact-email-field">
                Email address
                <input
                  id="contact-email-field"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label htmlFor="contact-message">
                Message
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your occasion..."
                  required
                />
              </label>
              <button
                type="submit"
                className="btn btn-primary btn-icon contact__submit"
              >
                Send request
              </button>
            </form>
          </div>

          <div className="contact__card contact__card--details">
            <ul className="contact__details" aria-label="Contact details">
              {details.map(detail => (
                <li key={detail.id} className="contact__detail">
                  <span className="contact__icon">{detail.icon}</span>
                  <div>
                    <p className="contact__detail-label">{detail.label}</p>
                    {detail.href ? (
                      <Link href={detail.href}>{detail.value}</Link>
                    ) : (
                      <p className="contact__detail-value">{detail.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="contact__cta">
              <p>{conversationCopy}</p>
              <Link href="/menu" className="btn btn-secondary btn-icon">
                Choose your dishes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
