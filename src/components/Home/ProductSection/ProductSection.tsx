'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoFlame, IoLeaf, IoStar } from 'react-icons/io5';

import { useCart } from '@/context/CartContext';
import { getImagePath } from '@/lib/getImagePath';
import type { Product } from '@/types';

import './ProductSection.scss';

export type ProductSectionProps = {
  products: Product[];
};
const ProductSection = ({ products }: ProductSectionProps) => {
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <section className="product" id="menu">
      <h2 className="section-title">Most popular dishes</h2>
      <p className="section-text">
        Our menu highlights seasonal specialties crafted to delight and designed
        for sharing.
      </p>

      <div className="products-grid">
        {products.map(product => (
          <article
            key={product.id}
            className="product-card"
            aria-label={product.name}
          >
            <div className="img-box">
              <Image
                src={getImagePath(product.image)}
                alt={product.name}
                className="product-img"
                width={200}
                height={200}
              />
              {product.tags?.includes('vegan') && (
                <div className="card-badge green">
                  <IoLeaf aria-hidden="true" />
                  <p>Vegan</p>
                </div>
              )}
              {product.tags?.includes('hot') && (
                <div className="card-badge red">
                  <IoFlame aria-hidden="true" />
                  <p>Hot</p>
                </div>
              )}
            </div>
            <div className="product-content">
              <div className="wrapper">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">
                  <span className="small">$</span>
                  {product.price}
                </p>
              </div>
              <p className="product-text">{product.description}</p>
              <div className="product-footer">
                <div
                  className="product-rating"
                  aria-label={`Rated ${product.rating ?? 5} out of 5`}
                >
                  {Array.from({ length: product.rating ?? 5 }, (_, index) => (
                    <IoStar
                      key={`${product.id}-star-${index}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-icon add-to-cart-btn"
                  onClick={() => addToCart(product)}
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        className="btn btn-primary btn-icon"
        type="button"
        onClick={() => router.push('/menu')}
        aria-label="View full menu page"
      >
        <Image
          src={getImagePath('/images/menu.svg')}
          alt="Menu icon"
          width={18}
          height={18}
        />
        Full menu
      </button>
    </section>
  );
};

export default ProductSection;
