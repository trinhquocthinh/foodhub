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

  // Use environment variable for base path (set at build time)
  // For Netlify: NEXT_PUBLIC_BASE_PATH will be empty or '/'
  // For GitHub Pages: NEXT_PUBLIC_BASE_PATH will be '/foodhub'
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // Ensure the src starts with a slash
  const cleanSrc = src.startsWith('/') ? src : `/${src}`;

  return basePath ? `${basePath}${cleanSrc}` : cleanSrc;
};
