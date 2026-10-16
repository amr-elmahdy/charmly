// ============================================================
// Icon rendering module.
// Handles everything related to the /icons endpoint.
// ============================================================

import icons from '../dist/icons.json' assert { type: 'json' };
import { escapeAttr } from './utils.js';

// ---- Layout defaults ----
export const DEFAULT_SIZE = 48;
export const DEFAULT_GAP = 8;
export const DEFAULT_RADIUS = 12;
export const DEFAULT_BG = true;
export const DEFAULT_BGCOLOR = '#1a1b2e';
export const PADDING = 0;

// ---- Allowed ranges ----
export const SIZE_MIN = 16, SIZE_MAX = 128;
export const GAP_MIN = 0, GAP_MAX = 32;
export const RADIUS_MIN = 0, RADIUS_MAX = 24;

export const MAX_ICONS = 50;

// Safe "does this icon exist" check (avoids Object.prototype pitfalls).
function hasIcon(name) {
  return Object.prototype.hasOwnProperty.call(icons, name);
}

function renderIcon(name, x, y, index, size, radius, bg, bgcolor) {
  if (!hasIcon(name)) return '';
  const icon = icons[name];
  const clipId = `clip-${index}`;

  const innerSvg =
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
    `x="${PADDING}" y="${PADDING}" width="${size}" height="${size}" ` +
    `viewBox="${icon.viewBox}" preserveAspectRatio="xMidYMid meet">${icon.content}</svg>`;

  if (!bg) {
    return `<g transform="translate(${x}, ${y})">${innerSvg}</g>`;
  }

  return (
    `<g transform="translate(${x}, ${y})">` +
    `<rect width="${size}" height="${size}" rx="${radius}" fill="${escapeAttr(bgcolor)}"/>` +
    `<clipPath id="${clipId}"><rect width="${size}" height="${size}" rx="${radius}"/></clipPath>` +
    `<g clip-path="url(#${clipId})">${innerSvg}</g>` +
    `</g>`
  );
}

export function buildSvg(names, perline, size, gap, radius, bg, bgcolor) {
  const valid = names.filter(hasIcon);

  if (valid.length === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="48"><text x="8" y="28" font-family="monospace" font-size="13" fill="#e05252">No valid icons found</text></svg>`;
  }

  const columns = perline && perline > 0 ? Math.min(perline, valid.length) : valid.length;
  const rows = Math.ceil(valid.length / columns);
  const width = columns * size + (columns - 1) * gap;
  const height = rows * size + (rows - 1) * gap;

  const parts = [];
  valid.forEach((name, idx) => {
    const col = idx % columns;
    const row = Math.floor(idx / columns);
    const x = col * (size + gap);
    const y = row * (size + gap);
    parts.push(renderIcon(name, x, y, idx, size, radius, bg, bgcolor));
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">${parts.join('')}</svg>`;
}