import type { ImageLoaderProps } from 'next/image';

/**
 * Custom image loader to make Next.js Image component work with static exports
 * and optional base paths (e.g. GitHub Pages deployments).
 */
const imageLoader = ({ src }: ImageLoaderProps): string => {
  if (src.startsWith('http')) {
    return src;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return `${basePath}${src}`;
};

export default imageLoader;
