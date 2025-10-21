'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';

import { cartItems, navLinks } from '@/constants/layout';
import { getImagePath } from '@/lib/getImagePath';

import './Header.scss';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

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

  const cartCount = cartItems.length;

  return (
    <header>
      <nav className="navbar" aria-label="Primary">
        <div className="navbar-wrapper">
          <Link href="#home" onClick={closeNav} aria-label="Foodhub logo">
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
              <span className="count" aria-label={`${cartCount} items in cart`}>
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
        <ul className="cart-box-ul">
          <h4 className="cart-h4">Your order.</h4>
          {cartItems.map(item => (
            <li key={item.id}>
              <Link href="#menu" className="cart-item" onClick={toggleCart}>
                <div className="img-box">
                  <Image
                    src={getImagePath(item.image)}
                    alt={item.name}
                    className="product-img"
                    width={50}
                    height={50}
                  />
                </div>
                <h5 className="product-name">{item.name}</h5>
                <p className="product-price">
                  <span className="small">$</span>
                  {item.price}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="cart-btn-group">
          <button type="button" className="btn btn-secondary">
            View order
          </button>
          <button type="button" className="btn btn-primary">
            Checkout
          </button>
        </div>
      </aside>
    </header>
  );
};

export default memo(Header);
