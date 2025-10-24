# Netlify Deployment Guide

This guide will help you deploy your FoodHub website to Netlify.

## Prerequisites

- A Netlify account (free tier is sufficient)
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Automatic Deployment Setup

### Method 1: Deploy via Netlify UI (Recommended)

1. **Login to Netlify**
   - Go to [https://app.netlify.com](https://app.netlify.com)
   - Sign up or log in with your Git provider

2. **Import Your Project**
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Authorize Netlify to access your repositories
   - Select your `foodhub` repository

3. **Configure Build Settings**
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `out`
   - **Node version**: 18 or higher (add environment variable: `NODE_VERSION=18`)

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site
   - Your site will be available at a random subdomain (e.g., `random-name-123.netlify.app`)

5. **Custom Domain (Optional)**
   - Go to "Site settings" → "Domain management"
   - Add your custom domain
   - Follow Netlify's DNS configuration instructions

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Netlify Site**
   ```bash
   netlify init
   ```
   - Follow the prompts to create a new site or link to an existing one
   - Build command: `npm run build:netlify`
   - Publish directory: `out`

4. **Deploy**
   ```bash
   # Deploy to production
   netlify deploy --prod
   
   # Or deploy to preview first
   netlify deploy
   ```

## Configuration Details

### netlify.toml
The `netlify.toml` file in the root of your project contains all necessary configuration:

```toml
[build]
  command = "npm run build:netlify"
  publish = "out"
```

This file also includes:
- Redirects for SPA behavior
- Security headers
- Cache control for static assets

### Environment Variables

The project automatically detects when it's running on Netlify and adjusts the base path accordingly:

- **GitHub Pages**: Uses `/foodhub` as base path
- **Netlify**: Uses `/` (root) as base path
- **Development**: Uses `/` (root) as base path

No manual environment variables are needed for basic deployment.

### Custom Environment Variables (Optional)

If you need to override the base path, you can set environment variables in Netlify:

1. Go to "Site settings" → "Environment variables"
2. Add the following variables:
   - `NEXT_PUBLIC_BASE_PATH`: Leave empty or set to `/`
   - `NEXT_PUBLIC_SITE_URL`: Your Netlify site URL (e.g., `https://your-site.netlify.app`)

## Testing Locally

Before deploying to Netlify, test the build locally:

```bash
# Build for Netlify
npm run build:netlify

# Serve the build locally
npm run test:netlify
```

Visit `http://localhost:3000` to preview your site as it will appear on Netlify.

## Continuous Deployment

Once set up, Netlify will automatically:
- Deploy your site when you push to your main branch
- Create preview deployments for pull requests
- Provide unique URLs for each deployment

## Troubleshooting

### CSS/Images Not Loading

This is the issue this configuration solves! The problem was caused by the `/foodhub` base path used for GitHub Pages. The configuration now:
- Detects the deployment platform automatically
- Uses no base path for Netlify (root deployment)
- Keeps the `/foodhub` base path for GitHub Pages

### Build Failures

If your build fails on Netlify:

1. **Check Node Version**
   - Ensure you're using Node 18 or higher
   - Set `NODE_VERSION=18` in environment variables

2. **Check Build Command**
   - Verify the build command is `npm run build:netlify`
   - Check build logs for specific error messages

3. **Clear Cache and Retry**
   - Go to "Site settings" → "Build & deploy" → "Build settings"
   - Click "Clear cache and retry deploy"

### 404 Errors on Page Refresh

If you get 404 errors when refreshing pages, the `netlify.toml` file should handle this with the redirect rule. If issues persist:

1. Check that `netlify.toml` is in your repository root
2. Verify the redirect rule exists:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

## Deploy Previews

Netlify provides deploy previews for every pull request:

1. Create a pull request in your repository
2. Netlify automatically builds and deploys a preview
3. A preview URL is posted as a comment on the PR
4. Review changes before merging

## Performance Optimization

The configuration includes several optimizations:

- **Image Optimization**: WebP/AVIF formats for modern browsers
- **Caching**: Aggressive caching for static assets (1 year)
- **Compression**: Gzip compression enabled
- **Security Headers**: XSS protection, frame options, CSP

## Monitoring and Analytics

Netlify provides built-in analytics:

1. Go to "Analytics" in your site dashboard
2. View traffic, bandwidth, and performance metrics
3. Upgrade to paid plan for more detailed analytics

## Support

For Netlify-specific issues:
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community Forums](https://answers.netlify.com)
- [Netlify Support](https://www.netlify.com/support)

For project-specific issues:
- Open an issue in your repository
- Check the main README.md for project documentation
