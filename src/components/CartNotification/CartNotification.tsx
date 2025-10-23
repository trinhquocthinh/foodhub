'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { IoCheckmarkCircle, IoClose } from 'react-icons/io5';

import { useCart } from '@/context/CartContext';
import { getImagePath } from '@/lib/getImagePath';

import './CartNotification.scss';

const AUTO_DISMISS_DELAY = 3200;

const CartNotification = () => {
  const { notification, clearNotification } = useCart();

  useEffect(() => {
    if (!notification) {
      return;
    }

    // no-op here; seq is provided by context to force remount when needed

    const timer = window.setTimeout(() => {
      clearNotification();
    }, AUTO_DISMISS_DELAY);

    return () => window.clearTimeout(timer);
  }, [notification, clearNotification]);

  if (!notification) {
    return null;
  }

  return (
    <aside
      key={notification.seq}
      className="cart-notification"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="cart-notification__media" aria-hidden="true">
        <Image
          src={getImagePath(notification.image)}
          alt=""
          width={56}
          height={56}
        />
      </div>

      <div className="cart-notification__content">
        <p className="cart-notification__title">
          <IoCheckmarkCircle aria-hidden="true" />
          Added to cart
        </p>
        <p className="cart-notification__body">
          {notification.name}
          <span aria-hidden="true">×{notification.quantity}</span>
        </p>
      </div>

      <button
        type="button"
        className="cart-notification__close"
        onClick={clearNotification}
        aria-label="Dismiss cart notification"
      >
        <IoClose aria-hidden="true" />
      </button>
    </aside>
  );
};

export default CartNotification;
