// ============================================================
// Widget string parser
// ============================================================

// Allowed values
export const STATE_VALUES = [
  'release',
  'prototype',
  'archive',
  'in-development',
];

const KNOWN_TYPES = ['state', 'badges', 'stars', 'lan', 'version'];
const MAX_BADGES = 5;
const MAX_BADGE_LENGTH = 20;

// ============================================================
// Public API
// ============================================================

// Parse widget string
export function parseWidget(str) {
  if (str === null || str === undefined) return null;
  
  const trimmed = String(str).trim();
  if (trimmed === '') return null;
  
  const colonIndex = trimmed.indexOf(':');
  if (colonIndex === -1) {
    return { error: 'expected "type:value" format' };
  }
  
  const type = trimmed.slice(0, colonIndex).trim().toLowerCase();
  const value = trimmed.slice(colonIndex + 1).trim();
  
  if (value.includes(':')) {
    return { error: 'value must not contain ":"' };
  }
  
  if (value === '') {
    return { error: 'empty value' };
  }
  
  if (!KNOWN_TYPES.includes(type)) {
    return {
      error: `unknown widget type "${type}". Allowed: ${KNOWN_TYPES.join(', ')}`,
    };
  }
  
  if (type === 'state') return parseState(value);
  if (type === 'badges') return parseBadges(value);
  if (type === 'stars') return parseRepoWidget('stars', value);
  if (type === 'lan') return parseRepoWidget('lan', value);
  if (type === 'version') return parseRepoWidget('version', value);
  
  return { error: 'unknown widget type' };
}

// ============================================================
// Type-specific parsers
// ============================================================

function parseState(value) {
  const lower = value.toLowerCase();
  if (!STATE_VALUES.includes(lower)) {
    return {
      error: `invalid state value "${value}". Allowed: ${STATE_VALUES.join(', ')}`,
    };
  }
  return { type: 'state', value: lower };
}

function parseBadges(value) {
  const parts = value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  
  if (parts.length === 0) {
    return { error: 'empty badges list' };
  }
  
  if (parts.length > MAX_BADGES) {
    return {
      error: `too many badges (max ${MAX_BADGES}, got ${parts.length})`,
    };
  }
  
  const tooLong = parts.find((b) => b.length > MAX_BADGE_LENGTH);
  if (tooLong) {
    return {
      error: `badge too long (max ${MAX_BADGE_LENGTH} chars): "${tooLong}"`,
    };
  }
  
  return { type: 'badges', value: parts };
}

// Repo widgets (stars, lan, version)
function parseRepoWidget(type, value) {
  const parsed = parseRepoString(value);
  if (!parsed) {
    return { error: `invalid repo format "${value}". Expected: owner/repo` };
  }
  return { type, owner: parsed.owner, repo: parsed.repo };
}

// Parse "owner/repo"
function parseRepoString(str) {
  if (!str) return null;
  const parts = str.split('/');
  if (parts.length !== 2) return null;
  
  const owner = parts[0].trim();
  const repo = parts[1].trim();
  if (!owner || !repo) return null;
  
  if (!/^[A-Za-z0-9._-]+$/.test(owner)) return null;
  if (!/^[A-Za-z0-9._-]+$/.test(repo)) return null;
  
  return { owner, repo };
}