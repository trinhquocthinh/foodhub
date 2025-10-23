import type { Metadata } from 'next';

import { OrderPage } from '@/components';

export const metadata: Metadata = {
  title: 'View Order',
  description:
    'Review your Foodhub order, fine-tune plate quantities, and get a clear summary before checkout.',
};

const OrderRoute = () => <OrderPage />;

export default OrderRoute;
