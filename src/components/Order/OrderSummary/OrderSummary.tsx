'use client';

import Link from 'next/link';
import { memo } from 'react';

import './OrderSummary.scss';

interface OrderSummaryProps {
  itemsCount: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  summaryNote: string;
}

const OrderSummary = ({
  itemsCount,
  subtotal,
  serviceFee,
  total,
  summaryNote,
}: OrderSummaryProps) => {
  return (
    <aside className="order-summary" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Order summary</h2>

      <dl className="order-summary__totals">
        <div>
          <dt>Items ({itemsCount})</dt>
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
  );
};

export default memo(OrderSummary);
