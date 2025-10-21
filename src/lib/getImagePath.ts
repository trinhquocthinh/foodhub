/**
 * Helper function to get the correct image path for GitHub Pages deployment
 * This is needed because Next.js Image component with static export doesn't
 * apply basePath automatically to the src attribute
 */
export const getImagePath = (src: string): string => {
  // Don't modify external URLs
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // In production (GitHub Pages), add the base path
  const basePath = process.env.NODE_ENV === 'production' ? '/foodhub' : '';

  // Ensure the src starts with a slash
  const cleanSrc = src.startsWith('/') ? src : `/${src}`;

  return `${basePath}${cleanSrc}`;
};
