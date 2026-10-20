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

const KNOWN_TYPES = ['state', 'badges'];
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