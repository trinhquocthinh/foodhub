'use client';
import Image from 'next/image';
import { memo } from 'react';
import { IoFlash, IoTimeOutline } from 'react-icons/io5';

import { ProductRating } from '@/components';
import { getImagePath } from '@/lib/getImagePath';
import type { MenuItem } from '@/types';

import './ProductCard.scss';

type MenuPageProps = {
  item: MenuItem;
  index: number;
  formatTagLabel: (tag: string) => string;
  addToCart: (item: MenuItem) => void;
};

const ProductCard = ({
  item,
  index,
  formatTagLabel,
  addToCart,
}: MenuPageProps) => (
  <article
    key={item.id}
    className="menu-card"
    data-category={item.category}
    data-tags={(item.tags ?? []).join(',')}
    data-price={item.price}
    data-rating={item.rating ?? 0}
    data-name={item.name.toLowerCase()}
    data-original-order={index}
    aria-label={`${item.name}, $${item.price}`}
  >
    <div className="menu-card__info">
      <div className="menu-card__image">
        <Image
          src={getImagePath(item.image)}
          alt={item.name}
          width={320}
          height={240}
        />
        {item.tags?.includes('signature') ? (
          <span className="menu-card__badge">Chef signature</span>
        ) : null}
      </div>

      <div className="menu-card__content">
        <header className="menu-card__header">
          <h3>{item.name}</h3>
          <p className="menu-card__price">
            <span className="currency">$</span>
            {item.price}
          </p>
        </header>

        <p className="menu-card__category">{item.category}</p>
        <p className="menu-card__description">{item.description}</p>
        {item.highlight ? (
          <p className="menu-card__highlight">{item.highlight}</p>
        ) : null}

        <ul className="menu-card__meta">
          <li>
            <IoFlash aria-hidden="true" />
            {item.calories ? `${item.calories} kcal` : 'Light & bright'}
          </li>
          <li>
            <IoTimeOutline aria-hidden="true" />
            Ready in {item.prepTime ?? 10} min
          </li>
        </ul>

        {item.tags && item.tags.length > 0 ? (
          <ul className="menu-card__tags">
            {item.tags.map(tag => (
              <li key={`${item.id}-${tag}`}>{formatTagLabel(tag)}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
    <div className="menu-card__footer">
      <ProductRating rating={item.rating} />
      <button
        type="button"
        className="btn btn-primary btn-icon menu-card__cta"
        onClick={() => addToCart(item)}
        aria-label={`Add ${item.name} to cart`}
      >
        Add to cart
      </button>
    </div>
  </article>
);

export default memo(ProductCard);
