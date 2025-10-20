# Foodhub Restaurant – Next.js Conversion

Modernized the legacy Foodhub landing page by migrating the static HTML, CSS, and vanilla JavaScript experience to **Next.js 14** with **TypeScript** and **SCSS**. The refreshed build keeps the playful brand styling, adds structured data-driven sections, and ships with server-rendered SEO metadata.

## 🍽️ Highlights

- App Router architecture with a dedicated `layout.tsx` and typed `page.tsx`
- Reusable `LandingPage` client component that handles navigation and cart toggling
- Global SCSS port of the original design, optimized for responsive breakpoints
- Google Fonts (`Rubik`, `Monoton`) loaded via `next/font/google`
- Accessible icons rendered with `react-icons` instead of runtime Ionicon scripts
- Custom static image loader tailored for GitHub Pages style deployments

## � Project Structure

```
foodhub-website/
├── public/
│   ├── favicon.svg       # Updated favicon
│   └── images/           # Project imagery (logos, dishes, shapes)
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── LandingPage.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   └── imageLoader.ts
│   └── styles/
│       ├── _mixins.scss
│       ├── _variables.scss
│       └── globals.scss
├── next.config.mjs
└── package.json
```

## ▶️ Getting Started

```bash
yarn install       # install dependencies
yarn dev           # start the Next.js dev server at http://localhost:3000

yarn build         # production build
yarn start         # serve the production bundle
yarn lint          # run ESLint and Prettier checks
```

No environment variables are required for local development. `NEXT_PUBLIC_SITE_URL` is optional and defaults to `https://foodhub.com` for metadata.

## 🛠️ Key Implementation Notes

- **LandingPage.tsx** maps menu dishes, services, testimonials, and cart items from typed data exported by `page.tsx`.
- **globals.scss** consolidates the converted legacy styling (including media queries) and aligns it with the Next.js font variables.
- **imageLoader.ts** ensures the `next/image` component works seamlessly when the site is exported statically or served from a nested base path.
- **next.config.mjs** keeps the previous optimizations, removes obsolete rewrites, and updates the default site URL.

## ✅ Recommended Next Steps

1. Hook the “View order” and “Checkout” buttons to real cart endpoints.
2. Replace placeholder social URLs with real Foodhub profiles.
3. Add analytics or event tracking within `layout.tsx` if needed.

Enjoy the refreshed Foodhub experience! 🍲
