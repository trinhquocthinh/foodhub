#!/bin/bash

# Release script for Agency Website
# Usage: ./scripts/release.sh [patch|minor|major]

set -e

RELEASE_TYPE=${1:-patch}

echo "🚀 Starting release process..."

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "❌ Error: Please switch to main branch before releasing"
  exit 1
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Error: Working directory is not clean. Please commit or stash your changes."
  exit 1
fi

# Pull latest changes from remote
echo "📥 Pulling latest changes from origin/main..."
git pull origin main

# Run tests and linting
echo "🧪 Running type check..."
npm run type-check

echo "🔍 Running ESLint..."
npm run lint:strict

echo "💄 Checking code formatting..."
npm run format:check

echo "🏗️  Running build to ensure everything compiles..."
npm run build

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📋 Current version: $CURRENT_VERSION"

# Create new version
echo "📝 Creating new $RELEASE_TYPE version..."
NEW_VERSION=$(npm version $RELEASE_TYPE --no-git-tag-version)
echo "🎉 New version: $NEW_VERSION"

# Update changelog automatically
if [ -f "CHANGELOG.md" ]; then
  echo "📝 Automatically updating CHANGELOG.md..."
  npx tsx scripts/update-changelog.ts "$NEW_VERSION"
fi

# Commit version changes
echo "💾 Committing version changes..."
git add package.json package-lock.json 2>/dev/null || git add package.json yarn.lock 2>/dev/null || git add package.json
if [ -f "CHANGELOG.md" ]; then
  git add CHANGELOG.md
fi
git commit -m "chore: bump version to $NEW_VERSION"

# Create and push tag
echo "🏷️  Creating git tag..."
git tag -a "$NEW_VERSION" -m "Release $NEW_VERSION"

# Push changes and tags
echo "📤 Pushing changes and tags to remote..."
git push origin main
git push origin --tags

echo "✅ Release $NEW_VERSION completed successfully!"
echo "🔗 Create a GitHub release at: https://github.com/trinhquocthinh/Agency/releases/new?tag=$NEW_VERSION"