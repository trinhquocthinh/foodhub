import type { ImageLoaderProps } from 'next/image';

/**
 * Custom image loader for static exports with GitHub Pages support.
 *
 * This loader adds the base path to image URLs for GitHub Pages deployments.
 * The basePath is determined at build time from NEXT_PUBLIC_BASE_PATH environment variable.
 */

const imageLoader = ({ src }: ImageLoaderProps): string => {
  // If the source is an absolute URL, return it as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // Use environment variable for base path (set at build time)
  // For Netlify: NEXT_PUBLIC_BASE_PATH will be empty or '/'
  // For GitHub Pages: NEXT_PUBLIC_BASE_PATH will be '/foodhub'
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // Ensure we don't double-add slashes
  const cleanSrc = src.startsWith('/') ? src : `/${src}`;
  return basePath ? `${basePath}${cleanSrc}` : cleanSrc;
};

export default imageLoader;
