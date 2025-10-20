import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://foodhub.com';

export const siteConfig = {
  name: 'Anna Portfolio',
  description:
    'Frontend developer portfolio highlighting services, projects, and contact information.',
  url: siteUrl,
  ogImage: '/assets/images/hero-banner.png',
  links: {
    twitter: 'https://twitter.com/',
    linkedin: 'https://www.linkedin.com/',
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Foodhub | Crafted Culinary Experiences',
    template: '%s | Foodhub',
  },
  description:
    'Foodhub is a modern culinary destination serving vibrant dishes, organic ingredients, and welcoming hospitality in the heart of the city.',
  keywords: [
    'Foodhub',
    'restaurant',
    'farm-to-table',
    'organic ingredients',
    'gourmet menu',
    'city dining',
  ],
  openGraph: {
    title: 'Foodhub | Crafted Culinary Experiences',
    description:
      'Discover Foodhub, a contemporary restaurant featuring seasonal menus, inspired chefs, and delightful dining experiences.',
    url: siteUrl,
    siteName: 'Foodhub',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${siteUrl}/images/food1.png`,
        width: 1200,
        height: 630,
        alt: 'Foodhub signature dish',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foodhub | Crafted Culinary Experiences',
    description:
      'Experience vibrant flavors and curated menus at Foodhub, your go-to destination for memorable meals.',
    images: [`${siteUrl}/images/food2.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/favicon.svg',
  },
};
