import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/seo';

const routes = ['/'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  return routes.map(path => ({
    url: `${base}${path === '/' ? '' : path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'monthly' : 'yearly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
