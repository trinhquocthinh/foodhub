/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://trinhquocthinh.github.io/foodhub',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://trinhquocthinh.github.io/foodhub'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/about': { priority: 0.9, changefreq: 'weekly' },
      '/services': { priority: 0.9, changefreq: 'weekly' },
      '/projects': { priority: 0.8, changefreq: 'weekly' },
      '/blog': { priority: 0.8, changefreq: 'daily' },
      '/contact': { priority: 0.7, changefreq: 'monthly' },
    };

    const configEntry = customConfig[path] || {
      priority: 0.7,
      changefreq: 'monthly',
    };

    return {
      loc: path,
      changefreq: configEntry.changefreq,
      priority: configEntry.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
