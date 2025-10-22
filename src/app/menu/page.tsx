import type { Metadata } from 'next';

import { MenuPage } from '@/components';
import {
  menuCategories,
  menuDietaryFilters,
  menuItems,
  menuSortOptions,
} from '@/constants/menu';

export const metadata: Metadata = {
  title: 'Full Menu',
  description:
    'Explore the full Foodhub menu with filters, dietary tags, and animated sorting to find your perfect dish.',
};

const FullMenuPage = () => (
  <MenuPage
    items={menuItems}
    categories={menuCategories}
    dietaryFilters={menuDietaryFilters}
    sortOptions={menuSortOptions}
  />
);

export default FullMenuPage;
