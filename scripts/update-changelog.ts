#!/usr/bin/env node
/* eslint-disable sonarjs/concise-regex */
/* eslint-disable sonarjs/os-command */
/* eslint-disable sonarjs/no-os-command-from-path */
/* eslint-disable no-console */
/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-child-process */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Categories {
  Added: string[];
  Changed: string[];
  Deprecated: string[];
  Removed: string[];
  Fixed: string[];
  Security: string[];
}

type CategoryKey = keyof Categories;

/**
 * Get git commits since the last tag
 */
function getCommitsSinceLastTag(): string[] {
  try {
    // Validate we're in a git repository
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });

    // Get the last tag with safe, fixed command
    const lastTag = execSync('git describe --tags --abbrev=0', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      env: { ...process.env, PATH: '/usr/bin:/bin' },
    }).trim();

    // Build safe git command with validated tag
    let gitCommand: string;
    if (lastTag && /^[a-zA-Z0-9.\-_]+$/.test(lastTag)) {
      // Validate tag contains only safe characters
      gitCommand = `git log ${lastTag}..HEAD --pretty=format:%s`;
    } else {
      gitCommand = 'git log --pretty=format:%s';
    }

    const commits = execSync(gitCommand, {
      encoding: 'utf8',
      env: { ...process.env, PATH: '/usr/bin:/bin' },
    })
      .trim()
      .split('\n')
      .filter(Boolean);

    return commits;
  } catch (error) {
    console.error(
      '⚠️  Git error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    console.log('Using manual changelog entries');
    return [];
  }
}

/**
 * Parse commits and categorize them based on conventional commit prefixes
 */
function categorizeCommits(commits: string[]): Categories {
  const categories: Categories = {
    Added: [],
    Changed: [],
    Deprecated: [],
    Removed: [],
    Fixed: [],
    Security: [],
  };

  const prefixMap: Record<string, CategoryKey> = {
    'feat:': 'Added',
    'feature:': 'Added',
    'add:': 'Added',
    'added:': 'Added',
    'fix:': 'Fixed',
    'fixed:': 'Fixed',
    'bugfix:': 'Fixed',
    'change:': 'Changed',
    'changed:': 'Changed',
    'update:': 'Changed',
    'updated:': 'Changed',
    'refactor:': 'Changed',
    'perf:': 'Changed',
    'style:': 'Changed',
    'remove:': 'Removed',
    'removed:': 'Removed',
    'delete:': 'Removed',
    'deleted:': 'Removed',
    'deprecate:': 'Deprecated',
    'deprecated:': 'Deprecated',
    'security:': 'Security',
    'sec:': 'Security',
  };

  commits.forEach(commit => {
    // Skip version bump commits and merge commits
    if (
      commit.match(/^(chore|release|version|bump|merge)/i) ||
      commit.startsWith('Merge ')
    ) {
      return;
    }

    const lowerCommit = commit.toLowerCase();
    let categorized = false;

    // Check for prefix match
    for (const [prefix, category] of Object.entries(prefixMap)) {
      if (lowerCommit.startsWith(prefix)) {
        const message = commit.substring(prefix.length).trim();
        const capitalizedMessage =
          message.charAt(0).toUpperCase() + message.slice(1);
        categories[category].push(capitalizedMessage);
        categorized = true;
        break;
      }
    }

    // If no prefix found, try to detect from content
    if (!categorized) {
      if (lowerCommit.match(/\b(add|added|new|implement|create)\b/i)) {
        categories.Added.push(commit);
      } else if (lowerCommit.match(/\b(fix|fixed|resolve|patch|bug)\b/i)) {
        categories.Fixed.push(commit);
      } else if (
        lowerCommit.match(/\b(update|change|modify|improve|refactor)\b/i)
      ) {
        categories.Changed.push(commit);
      } else if (lowerCommit.match(/\b(remove|delete|drop)\b/i)) {
        categories.Removed.push(commit);
      } else if (lowerCommit.match(/\b(security|vulnerability|cve)\b/i)) {
        categories.Security.push(commit);
      } else if (lowerCommit.match(/\b(deprecate)\b/i)) {
        categories.Deprecated.push(commit);
      }
    }
  });

  return categories;
}

function updateChangelog(newVersion: string): void {
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');

  if (!fs.existsSync(changelogPath)) {
    console.log('⚠️  CHANGELOG.md not found, skipping update');
    return;
  }

  const content = fs.readFileSync(changelogPath, 'utf8');
  const currentDate = new Date().toISOString().split('T')[0];

  // Split content into lines
  const lines = content.split('\n');

  // Find the [Unreleased] section
  const unreleasedIndex = lines.findIndex(line =>
    line.includes('## [Unreleased]')
  );

  if (unreleasedIndex === -1) {
    console.log('⚠️  [Unreleased] section not found in CHANGELOG.md');
    return;
  }

  // Find the next version section or end of unreleased content
  let nextVersionIndex = lines.findIndex(
    (line, index) => index > unreleasedIndex && line.match(/^## \[[0-9]/)
  );

  if (nextVersionIndex === -1) {
    nextVersionIndex = lines.length;
  }

  // Get commits and categorize them
  const commits = getCommitsSinceLastTag();
  const gitCategories = categorizeCommits(commits);

  // Extract existing unreleased content (excluding the [Unreleased] header)
  const unreleasedContent = lines.slice(unreleasedIndex + 1, nextVersionIndex);

  // Parse existing unreleased content by category
  const existingCategories: Categories = {
    Added: [],
    Changed: [],
    Deprecated: [],
    Removed: [],
    Fixed: [],
    Security: [],
  };

  let currentCategory: CategoryKey | '' = '';
  unreleasedContent.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      const category = trimmed.substring(4) as CategoryKey;
      if (existingCategories.hasOwnProperty(category)) {
        currentCategory = category;
      }
    } else if (trimmed.startsWith('- ') && currentCategory) {
      existingCategories[currentCategory].push(trimmed.substring(2));
    }
  });

  // Merge git commits with existing entries (avoid duplicates)
  const mergedCategories: Record<CategoryKey, string[]> = {
    Added: [],
    Changed: [],
    Deprecated: [],
    Removed: [],
    Fixed: [],
    Security: [],
  };

  (Object.keys(existingCategories) as CategoryKey[]).forEach(category => {
    const combined = [
      ...existingCategories[category],
      ...gitCategories[category],
    ];
    // Remove duplicates (case-insensitive comparison)
    mergedCategories[category] = [
      ...new Set(combined.map(item => item.trim())),
    ].filter(Boolean);
  });

  // Build new version section with categorized changes
  const newVersionSection = [`## [${newVersion}] - ${currentDate}`, ''];

  let hasContent = false;
  (
    ['Added', 'Changed', 'Fixed', 'Removed', 'Deprecated', 'Security'] as const
  ).forEach(category => {
    if (mergedCategories[category].length > 0) {
      hasContent = true;
      newVersionSection.push(`### ${category}`, '');
      mergedCategories[category].forEach(item => {
        newVersionSection.push(`- ${item}`);
      });
      newVersionSection.push('');
    }
  });

  // Create new unreleased section
  const newUnreleasedSection = [
    '## [Unreleased]',
    '',
    '### Added',
    '',
    '### Changed',
    '',
    '### Deprecated',
    '',
    '### Removed',
    '',
    '### Fixed',
    '',
    '### Security',
    '',
  ];

  // Rebuild the changelog
  const newLines = [
    ...lines.slice(0, unreleasedIndex),
    ...newUnreleasedSection,
    ...newVersionSection,
    ...lines.slice(nextVersionIndex),
  ];

  // Write back to file
  fs.writeFileSync(changelogPath, newLines.join('\n'));

  if (hasContent) {
    console.log(`✅ CHANGELOG.md updated with version ${newVersion}`);
    console.log(`📝 Processed ${commits.length} commits from git history`);
  } else {
    console.log(
      `✅ CHANGELOG.md updated with version ${newVersion} (no changes found)`
    );
  }
}

// Get version from command line argument
const newVersion = process.argv[2];
if (!newVersion) {
  console.error('❌ Error: Version argument required');
  process.exit(1);
}

updateChangelog(newVersion);
