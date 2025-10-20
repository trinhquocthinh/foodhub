import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/seo';

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
