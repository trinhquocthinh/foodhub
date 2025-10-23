'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  IoArrowBack,
  IoCallOutline,
  IoDocumentTextOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoTimeOutline,
} from 'react-icons/io5';

import { useCart } from '@/context/CartContext';
import { getImagePath } from '@/lib/getImagePath';

import './CheckoutPage.scss';

const SERVICE_FEE = 4.5;
const TAX_RATE = 0.08;

type CheckoutFormState = {
  fullName: string;
  email: string;
  phone: string;
  diningOption: 'dine-in' | 'takeaway';
  arrivalTime: string;
  notes: string;
};

const initialFormState: CheckoutFormState = {
  fullName: '',
  email: '',
  phone: '',
  diningOption: 'dine-in',
  arrivalTime: '19:00',
  notes: '',
};

const CheckoutPage = () => {
  const { items, subtotal } = useCart();
  const [formState, setFormState] =
    useState<CheckoutFormState>(initialFormState);

  const isEmpty = items.length === 0;
  const serviceFee = isEmpty ? 0 : SERVICE_FEE;
  const tax = isEmpty ? 0 : subtotal * TAX_RATE;
  const total = subtotal + serviceFee + tax;

  const checkoutIntro =
    'Share your details and timing so we can have everything ready the moment you arrive.';
  const emptyCopy =
    'Add a few dishes to your order before heading to checkout so we can prep everything with care.';
  const dineInCopy = 'We will have your table staged before you arrive.';
  const takeawayCopy = 'We will package everything to travel beautifully.';
  const followUpCopy =
    'After submitting, a host will confirm your order details by phone or email within a few minutes.';

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState(previous => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // This demo form simply resets after submit to keep the flow playful.
    setFormState(initialFormState);
  };

  if (isEmpty) {
    return (
      <section className="checkout-page checkout-page--empty">
        <div className="checkout-page__hero">
          <h1>Your table is waiting</h1>
          <p>{emptyCopy}</p>
          <Link href="/menu" className="btn btn-primary btn-icon">
            Browse the menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page" aria-labelledby="checkout-heading">
      <header className="checkout-page__hero">
        <Link
          href="/order"
          className="checkout-page__back"
          aria-label="Back to order review"
        >
          <IoArrowBack aria-hidden="true" />
          Order overview
        </Link>
        <div>
          <h1 id="checkout-heading">Checkout</h1>
          <p>{checkoutIntro}</p>
        </div>
      </header>

      <div className="checkout-page__layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <IoPersonOutline aria-hidden="true" /> Contact details
            </legend>

            <label htmlFor="fullName">
              Full name
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Anna Portfolio"
                required
                value={formState.fullName}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="email">
              Email address
              <input
                id="email"
                name="email"
                type="email"
                placeholder="anna@example.com"
                required
                value={formState.email}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="phone">
              Phone number
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(+84) 123 456 789"
                required
                value={formState.phone}
                onChange={handleChange}
              />
            </label>
          </fieldset>

          <fieldset>
            <legend>
              <IoLocationOutline aria-hidden="true" /> Dining preferences
            </legend>

            <div className="checkout-form__options" role="radiogroup">
              <label className="option">
                <input
                  type="radio"
                  name="diningOption"
                  value="dine-in"
                  checked={formState.diningOption === 'dine-in'}
                  onChange={handleChange}
                />
                <span>
                  Dine in
                  <small>{dineInCopy}</small>
                </span>
              </label>

              <label className="option">
                <input
                  type="radio"
                  name="diningOption"
                  value="takeaway"
                  checked={formState.diningOption === 'takeaway'}
                  onChange={handleChange}
                />
                <span>
                  Takeaway
                  <small>{takeawayCopy}</small>
                </span>
              </label>
            </div>

            <label htmlFor="arrivalTime">
              <IoTimeOutline aria-hidden="true" /> Desired arrival time
              <input
                id="arrivalTime"
                name="arrivalTime"
                type="time"
                value={formState.arrivalTime}
                onChange={handleChange}
              />
            </label>
          </fieldset>

          <fieldset>
            <legend>
              <IoDocumentTextOutline aria-hidden="true" /> Special notes
            </legend>

            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Allergies, celebrations, seating preferences..."
              value={formState.notes}
              onChange={handleChange}
            />
          </fieldset>

          <button
            type="submit"
            className="btn btn-primary btn-icon checkout-form__submit"
          >
            <IoCallOutline aria-hidden="true" /> Place order request
          </button>
        </form>

        <aside
          className="checkout-summary"
          aria-labelledby="checkout-summary-heading"
        >
          <h2 id="checkout-summary-heading">Your order</h2>

          <ul className="checkout-summary__list">
            {items.map(item => (
              <li key={item.id}>
                <div className="media">
                  <Image
                    src={getImagePath(item.image)}
                    alt={item.name}
                    width={64}
                    height={64}
                  />
                </div>
                <div className="copy">
                  <p className="name">{item.name}</p>
                  <p className="meta">Quantity: {item.quantity}</p>
                </div>
                <span className="price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="checkout-summary__totals">
            <div>
              <dt>Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Tax (8%)</dt>
              <dd>${tax.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Service fee</dt>
              <dd>${serviceFee.toFixed(2)}</dd>
            </div>
            <div className="checkout-summary__total">
              <dt>Total due</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>

          <p className="checkout-summary__note">{followUpCopy}</p>
        </aside>
      </div>
    </section>
  );
};

export default CheckoutPage;
