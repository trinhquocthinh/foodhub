import type { ImageLoaderProps } from 'next/image';

/**
 * Custom image loader for static exports with GitHub Pages support.
 *
 * This loader adds the base path to image URLs for GitHub Pages deployments.
 * The basePath is determined at build time from NODE_ENV.
 */

const imageLoader = ({ src }: ImageLoaderProps): string => {
  // If the source is an absolute URL, return it as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // For GitHub Pages production builds, always use /foodhub as base path
  // For development, use empty string
  const basePath = process.env.NODE_ENV === 'production' ? '/foodhub' : '';

  // Ensure we don't double-add slashes
  const cleanSrc = src.startsWith('/') ? src : `/${src}`;
  return basePath ? `${basePath}${cleanSrc}` : cleanSrc;
};

export default imageLoader;
