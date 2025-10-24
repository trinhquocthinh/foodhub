'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';

import { OrderCard, OrderSummary } from '@/components';
import { useCart } from '@/context/CartContext';

import './OrderPage.scss';

const SERVICE_FEE = 4.5;

const OrderPage = () => {
  const {
    items,
    subtotal,
    isHydrated,
    incrementItem,
    decrementItem,
    removeItem,
  } = useCart();
  const router = useRouter();

  const isEmpty = items.length === 0;

  useEffect(() => {
    if (isHydrated && isEmpty) {
      router.push('/menu');
    }
  }, [isHydrated, isEmpty, router]);

  const totalItems = items
    .map(item => item.quantity)
    .reduce((a, b) => a + b, 0);
  const serviceFee = isEmpty ? 0 : SERVICE_FEE;
  const total = subtotal + serviceFee;
  const emptyCopy =
    'Your cart is quietly waiting. Discover the menu and tap the dishes you want to bring to the table.';
  const orderLead =
    'Fine-tune quantities, remove plates, and make sure the spread feels just right before checkout.';
  const summaryNote =
    'Need dietary tweaks or timing adjustments? Add a note during checkout and our team will tailor it.';

  // Show loading state during hydration to prevent flash of empty state
  if (!isHydrated) {
    return (
      <section className="order-page">
        <div className="order-page__hero">
          <h1>Loading your order...</h1>
        </div>
      </section>
    );
  }

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
            <OrderCard
              key={item.id}
              item={item}
              removeItem={removeItem}
              incrementItem={incrementItem}
              decrementItem={decrementItem}
            />
          ))}
        </div>

        <OrderSummary
          itemsCount={totalItems}
          subtotal={subtotal}
          serviceFee={serviceFee}
          total={total}
          summaryNote={summaryNote}
        />
      </div>
    </section>
  );
};

export default OrderPage;
