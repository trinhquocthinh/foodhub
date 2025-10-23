'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IoAdd, IoArrowBack, IoRemove, IoTrashOutline } from 'react-icons/io5';

import { useCart } from '@/context/CartContext';
import { getImagePath } from '@/lib/getImagePath';

import './OrderPage.scss';

const SERVICE_FEE = 4.5;

const OrderPage = () => {
  const { items, subtotal, incrementItem, decrementItem, removeItem } =
    useCart();

  const isEmpty = items.length === 0;
  const serviceFee = isEmpty ? 0 : SERVICE_FEE;
  const total = subtotal + serviceFee;
  const emptyCopy =
    'Your cart is quietly waiting. Discover the menu and tap the dishes you want to bring to the table.';
  const orderLead =
    'Fine-tune quantities, remove plates, and make sure the spread feels just right before checkout.';
  const summaryNote =
    'Need dietary tweaks or timing adjustments? Add a note during checkout and our team will tailor it.';

  if (isEmpty) {
    return (
      <section className="order-page order-page--empty">
        <div className="order-page__hero">
          <h1>Build your first order</h1>
          <p>{emptyCopy}</p>
          <Link href="/menu" className="btn btn-primary btn-icon">
            Explore menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="order-page" aria-labelledby="order-heading">
      <header className="order-page__hero">
        <Link href="/" className="order-page__back" aria-label="Back to home">
          <IoArrowBack aria-hidden="true" />
          Home
        </Link>
        <div>
          <h1 id="order-heading">Review your order</h1>
          <p>{orderLead}</p>
        </div>
      </header>

      <div className="order-page__layout">
        <div className="order-page__list" aria-live="polite">
          {items.map(item => (
            <article key={item.id} className="order-card">
              <div className="order-card__media">
                <Image
                  src={getImagePath(item.image)}
                  alt={item.name}
                  width={96}
                  height={96}
                />
              </div>

              <div className="order-card__content">
                <header className="order-card__header">
                  <h2>{item.name}</h2>
                  <button
                    type="button"
                    className="order-card__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from order`}
                  >
                    <IoTrashOutline aria-hidden="true" />
                  </button>
                </header>

                <p className="order-card__price" aria-label="Price per item">
                  <span className="currency">$</span>
                  {item.price}
                </p>

                <div className="order-card__actions">
                  <div
                    className="order-card__quantity"
                    role="group"
                    aria-label="Quantity"
                  >
                    <button
                      type="button"
                      onClick={() => decrementItem(item.id)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <IoRemove aria-hidden="true" />
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => incrementItem(item.id)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <IoAdd aria-hidden="true" />
                    </button>
                  </div>

                  <p className="order-card__total" aria-label="Line total">
                    <span className="currency">$</span>
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="order-summary" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Order summary</h2>

          <dl className="order-summary__totals">
            <div>
              <dt>Items ({items.length})</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Service fee</dt>
              <dd>${serviceFee.toFixed(2)}</dd>
            </div>
            <div className="order-summary__grand">
              <dt>Total due</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>

          <p className="order-summary__note">{summaryNote}</p>

          <Link
            href="/checkout"
            className="btn btn-primary btn-icon order-summary__cta"
            aria-label="Continue to checkout"
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default OrderPage;
