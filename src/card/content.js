// ============================================================
// Card content module.
// Renders the title, optional title-line, and description.
// Font measurement is approximate (character-count based).
// ============================================================

import { escapeXml, wrapText, validateHexColor } from '../utils.js';

// ---- Font sizes ----
const TITLE_FONT_SIZE = 24;
export const DESC_SIZES = { s: 12, m: 14, l: 16 };
export const DEFAULT_DESC_SIZE = 'm';

// ---- Default colors ----
export const DEFAULT_TITLE_COLOR = '#ffffff';
export const DEFAULT_DESC_COLOR = '#a8b0c0';

// ---- Font stack ----
export const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

// Approximate width of a single character relative to font size.
const CHAR_WIDTH_RATIO = 0.55;

// ============================================================
// Validators
// ============================================================

// Returns the normalised desc-size key, or null on error.
// `null` input → default.

export function validateDescSize(size) {
  if (size === null) return DEFAULT_DESC_SIZE;
  const lower = String(size).toLowerCase();
  if (!(lower in DESC_SIZES)) return null;
  return lower;
}

export function validateTitleColor(color) {
  if (color === null) return DEFAULT_TITLE_COLOR;
  return validateHexColor(color);
}

export function validateDescColor(color) {
  if (color === null) return DEFAULT_DESC_COLOR;
  return validateHexColor(color);
}

// ============================================================
// Public API
// ============================================================

// Renders the title text. Truncates to fit the available width.
export function renderTitle({ title, color, x, baseline, maxWidth }) {
  const safeTitle = truncateToWidth(title, maxWidth, TITLE_FONT_SIZE);
  const fill = color || DEFAULT_TITLE_COLOR;
  return `<text x="${x}" y="${baseline}" font-family="${FONT_STACK}" font-size="${TITLE_FONT_SIZE}" font-weight="700" fill="${escapeXml(fill)}">${escapeXml(safeTitle)}</text>`;
}

// Renders a thin horizontal separator under the title.
export function renderTitleLine({ x, width, y, color }) {
  const stroke = color || DEFAULT_TITLE_COLOR;
  return `<line x1="${x}" y1="${y}" x2="${x + width}" y2="${y}" stroke="${escapeXml(stroke)}" stroke-width="1" stroke-opacity="0.25"/>`;
}

// Renders the description as multiple lines.
export function renderDescription({
  desc,
  color,
  size,
  x,
  startY,
  maxWidth,
  lineHeight,
  maxLines,
}) {
  if (!desc || desc.trim() === '') return '';
  
  const fontSize = DESC_SIZES[size];
  const charsPerLine = Math.max(
    1,
    Math.floor(maxWidth / (fontSize * CHAR_WIDTH_RATIO))
  );
  const lines = wrapText(desc, charsPerLine, maxLines);
  const fill = color || DEFAULT_DESC_COLOR;
  
  return lines
    .map(
      (line, i) =>
      `<text x="${x}" y="${startY + i * lineHeight}" ` +
      `font-family="${FONT_STACK}" font-size="${fontSize}" ` +
      `fill="${escapeXml(fill)}">${escapeXml(line)}</text>`
    )
    .join('');
}

// ============================================================
// Internal helpers
// ============================================================

function truncateToWidth(text, maxWidth, fontSize) {
  const approxCharWidth = fontSize * CHAR_WIDTH_RATIO;
  const maxChars = Math.max(1, Math.floor(maxWidth / approxCharWidth));
  if (text.length <= maxChars) return text;
  return text.slice(0, Math.max(1, maxChars - 3)) + '...';
}