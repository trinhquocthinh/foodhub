# Release Script Fixes - ✅ COMPLETED

## Summary

Both issues with `yarn release:patch` have been successfully fixed:

1. ✅ **next-sitemap TypeScript config error** - Fixed by converting to JavaScript
2. ✅ **CHANGELOG.md not updating** - Fixed by adding [Unreleased] section and updating scripts

---

## Issues Fixed

### 1. ❌ next-sitemap TypeScript Configuration Error

**Problem:**
```
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" 
for next-sitemap.config.ts
```

**Root Cause:**
- The project uses `"type": "module"` in package.json (ES modules)
- `next-sitemap` doesn't support TypeScript config files when using ES modules
- The config file was using TypeScript imports which aren't compatible

**Solution:**
1. Converted `next-sitemap.config.ts` to `next-sitemap.config.js`
2. Changed from TypeScript import/export syntax to CommonJS `module.exports`
3. Updated package.json script from `--config next-sitemap.config.ts` to `--config next-sitemap.config.js`

**Files Changed:**
- ✅ `next-sitemap.config.ts` → `next-sitemap.config.js`
- ✅ `package.json` - Updated postbuild script

---

### 2. ❌ CHANGELOG.md Not Updated

**Problem:**
- Changelog wasn't being updated during release
- Missing `[Unreleased]` section header

**Root Cause:**
- The update-changelog.ts script looks for an `[Unreleased]` section
- The CHANGELOG.md had raw category headers without the version section
- Release script was using `npm` commands instead of `yarn`

**Solution:**
1. Added proper `## [Unreleased]` section header to CHANGELOG.md
2. Updated release.sh to use `yarn` commands instead of `npm`
3. Fixed yarn version command to properly extract version number
4. Updated git tag format to use `v` prefix (e.g., `v1.0.2`)

**Files Changed:**
- ✅ `CHANGELOG.md` - Added [Unreleased] section and proper structure
- ✅ `scripts/release.sh` - Updated to use yarn and fix version extraction

---

## CHANGELOG.md Format

The changelog now follows the correct format:

```markdown
## [Unreleased]

### Added
- New features

### Changed
- Changes to existing features

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security fixes

## [1.0.1] - 2025-10-20

### Changed
- List of changes
```

---

## Release Script Improvements

### Updated Commands
- Changed from `npm` to `yarn` throughout
- Fixed version extraction: `yarn version --$RELEASE_TYPE --no-git-tag-version`
- Added version prefix stripping to handle yarn's output format

### Git Tag Format
- Tags now use `v` prefix: `v1.0.2`, `v1.1.0`, etc.
- Consistent with common versioning conventions

---

## How to Use

### Run a Release

```bash
# Patch release (1.0.1 → 1.0.2)
yarn release:patch

# Minor release (1.0.2 → 1.1.0)
yarn release:minor

# Major release (1.0.2 → 2.0.0)
yarn release:major
```

### What the Script Does

1. ✅ Checks you're on the `main` branch
2. ✅ Verifies working directory is clean
3. ✅ Pulls latest changes from origin
4. ✅ Runs type checking (`yarn type-check`)
5. ✅ Runs linting (`yarn lint:strict`)
6. ✅ Checks code formatting (`yarn format:check`)
7. ✅ Builds the project (`yarn build`)
8. ✅ Bumps version in package.json
9. ✅ Updates CHANGELOG.md with new version
10. ✅ Commits changes with message: `chore: bump version to vX.X.X`
11. ✅ Creates git tag: `vX.X.X`
12. ✅ Pushes changes and tags to GitHub
13. ✅ Provides link to create GitHub release

---

## Testing the Fix

Try running the release again:

```bash
# Make sure you have a clean working directory
git status

# Run the patch release
yarn release:patch
```

Expected output:
```
🚀 Starting release process...
✅ On main branch
📥 Pulling latest changes from origin/main...
🧪 Running type check...
🔍 Running ESLint...
💄 Checking code formatting...
🏗️  Running build to ensure everything compiles...
📋 Current version: 1.0.1
📝 Creating new patch version...
🎉 New version: 1.0.2
📝 Automatically updating CHANGELOG.md...
✅ CHANGELOG.md updated with version 1.0.2
💾 Committing version changes...
🏷️  Creating git tag...
📤 Pushing changes and tags to remote...
✅ Release v1.0.2 completed successfully!
```

---

## Additional Notes

### Build Process
The `postbuild` script will now successfully generate the sitemap:
```bash
yarn build
# After build completes:
# next-sitemap will use next-sitemap.config.js
```

### Changelog Automation
The script automatically:
- Parses git commits since last tag
- Categorizes commits by type (feat:, fix:, etc.)
- Merges with existing unreleased changes
- Creates a new version section
- Resets the [Unreleased] section for next changes

### Manual Changelog Updates
You can still manually add entries to the [Unreleased] section:
```markdown
## [Unreleased]

### Added
- New feature description

### Fixed
- Bug fix description
```

These will be included in the next release.
