#!/bin/bash

# Build script for GitHub Pages deployment
# This ensures all environment variables are properly set

# Set environment to production
export NODE_ENV=production

# Set GitHub Pages specific variables
export NEXT_PUBLIC_SITE_URL="https://trinhquocthinh.github.io/foodhub"
export NEXT_PUBLIC_BASE_PATH="/foodhub"

# Clean previous builds
rm -rf .next out

echo "🏗️  Building for GitHub Pages..."
echo "   Site URL: $NEXT_PUBLIC_SITE_URL"
echo "   Base Path: $NEXT_PUBLIC_BASE_PATH"
echo ""

# Run Next.js build
yarn next build

# Add .nojekyll file
if [ -d "out" ]; then
  touch out/.nojekyll
  echo ""
  echo "✅ Build complete! Output in ./out directory"
  echo "📁 Images location: ./out/images/"
  echo "🌐 Test locally: npx serve out -l 3000"
  echo "   Then visit: http://localhost:3000/foodhub"
else
  echo "❌ Build failed - out directory not found"
  exit 1
fi
