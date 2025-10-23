import type { Metadata } from 'next';

import { CheckoutPage } from '@/components';

export const metadata: Metadata = {
  title: 'Checkout',
  description:
    'Confirm your Foodhub order details, share arrival preferences, and send the request to our team.',
};

const CheckoutRoute = () => <CheckoutPage />;

export default CheckoutRoute;
