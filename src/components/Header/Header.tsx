'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';

import { navLinks } from '@/constants/layout';
import { useCart } from '@/context/CartContext';
import { getImagePath } from '@/lib/getImagePath';

import './Header.scss';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const { items, cartCount, subtotal } = useCart();

  const toggleNav = useCallback(() => {
    setIsNavOpen(previous => {
      const nextValue = !previous;
      if (nextValue && isCartOpen) {
        setIsCartOpen(false);
      }
      return nextValue;
    });
  }, [isCartOpen]);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen(previous => {
      const nextValue = !previous;
      if (nextValue && isNavOpen) {
        setIsNavOpen(false);
      }
      return nextValue;
    });
  }, [isNavOpen]);

  const isCartEmpty = items.length === 0;
  const itemLabel = cartCount === 1 ? 'item' : 'items';
  const cartStatusLabel = isCartEmpty
    ? 'Add a few favorites to get started.'
    : `${cartCount} ${itemLabel} in your bag`;

  return (
    <header>
      <nav className="navbar" aria-label="Primary">
        <div className="navbar-wrapper">
          <Link href="/" onClick={closeNav} aria-label="Foodhub logo">
            <Image
              src={getImagePath('/images/logo.svg')}
              alt="Foodhub"
              width={130}
              height={36}
              priority
            />
          </Link>

          <ul
            id="primary-navigation"
            className={`navbar-nav${isNavOpen ? ' active' : ''}`}
          >
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link"
                  onClick={closeNav}
                  scroll
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-btn-group">
            <button
              type="button"
              className="shopping-cart-btn"
              onClick={toggleCart}
              aria-expanded={isCartOpen}
              aria-controls="cart"
            >
              <Image
                src={getImagePath('/images/cart.svg')}
                alt="Shopping cart"
                width={18}
                height={18}
              />
              <span
                className="count"
                aria-label={`${cartCount} ${itemLabel} in cart`}
              >
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              className={`menu-toggle-btn${isNavOpen ? ' active' : ''}`}
              onClick={toggleNav}
              aria-expanded={isNavOpen}
              aria-controls="primary-navigation"
            >
              <span className="line one" />
              <span className="line two" />
              <span className="line three" />
            </button>
          </div>
        </div>
      </nav>

      <aside
        id="cart"
        className={`cart-box${isCartOpen ? ' active' : ''}`}
        aria-hidden={!isCartOpen}
      >
        <div className="cart-panel">
          <div className="cart-header">
            <h4 className="cart-h4">Your order</h4>
            <p className="cart-subtitle">{cartStatusLabel}</p>
          </div>

          <ul className="cart-box-ul">
            {isCartEmpty ? (
              <li className="empty-cart">
                Explore the menu and tap “Add to cart” to build your order.
              </li>
            ) : (
              items.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="img-box">
                    <Image
                      src={getImagePath(item.image)}
                      alt={item.name}
                      className="product-img"
                      width={50}
                      height={50}
                    />
                  </div>

                  <h5 className="product-name">
                    <Link href="#menu" onClick={toggleCart}>
                      {item.name}
                    </Link>
                  </h5>

                  <span className="quantity-value" aria-live="polite">
                    <small>x</small>
                    {item.quantity}
                  </span>

                  <p className="product-price" aria-label="Item total">
                    <span className="small">$</span>
                    {item.price}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="cart-btn-group">
          <div className="cart-summary" aria-live="polite">
            <span className="label">Subtotal</span>
            <span className="value">
              <span className="small">$</span>
              {subtotal.toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            disabled={isCartEmpty}
            aria-disabled={isCartEmpty}
          >
            View order
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={isCartEmpty}
            aria-disabled={isCartEmpty}
          >
            Checkout
          </button>
        </div>
      </aside>
    </header>
  );
};

export default memo(Header);
