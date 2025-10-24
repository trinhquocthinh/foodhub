'use client';

import Image from 'next/image';
import { memo } from 'react';
import { IoRemove, IoAdd } from 'react-icons/io5';

import { getImagePath } from '@/lib/getImagePath';
import type { CartItem } from '@/types';

import './OrderCard.scss';

interface OrderCardProps {
  item: CartItem;
  removeItem: (id: string) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
}

const OrderCard = ({ item, incrementItem, decrementItem }: OrderCardProps) => {
  return (
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
        <h2>{item.name}</h2>

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
        </div>

        <p className="order-card__total" aria-label="Line total">
          <span className="currency">$</span>
          {(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </article>
  );
};

export default memo(OrderCard);
