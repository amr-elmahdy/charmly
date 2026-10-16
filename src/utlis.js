// ============================================================
// Shared utility functions used across the project.
// Pure helpers only — no side effects, no state.
// ============================================================

// Escape a string for safe use inside an SVG attribute.
export function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// Validate a numeric query param against [min, max].
export function validateNumber(paramValue, min, max, defaultValue) {
  if (paramValue === null) return defaultValue;
  const trimmed = paramValue.trim();
  if (trimmed === '') return null;
  const num = Number(trimmed);
  if (!Number.isFinite(num)) return null;
  if (num < min || num > max) return null;
  return num;
}

// Validate a hex color string (3 or 6 hex digits, with or without #).
export function validateHexColor(color) {
  if (color === null) return null;
  const trimmed = color.trim().replace(/^#/, '');
  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) return null;
  return `#${trimmed}`;
}

// Validate a boolean-ish query param ("true"/"false", case-insensitive).
export function validateBoolean(paramValue, defaultValue) {
  if (paramValue === null) return defaultValue;
  const lower = paramValue.trim().toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;
  return null;
}