// ============================================================
// Card widgets module
// ============================================================

import icons from '../../dist/icons.json' assert { type: 'json' };
import { escapeXml } from '../utils.js';
import { alignX } from './layout.js';

// Shared
const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

// State
export const STATE_COLORS = {
  release: '#4ade80',
  prototype: '#94a3b8',
  archive: '#ef4444',
  'in-development': '#a78bfa',
};
const STATE_DOT_RADIUS = 3.5;
const STATE_DOT_GAP = 5;
const STATE_FONT_SIZE = 11;
const STATE_CHAR_WIDTH = 7;

// Badges
const BADGE_HEIGHT = 22;
const BADGE_PADDING_X = 10;
const BADGE_GAP = 6;
const BADGE_FONT_SIZE = 11;
const BADGE_CHAR_WIDTH = 6.3;
const BADGE_BG = '#ffffff';
const BADGE_BG_OPACITY = 0.08;
const BADGE_STROKE = '#ffffff';
const BADGE_STROKE_OPACITY = 0.15;
const BADGE_TEXT_COLOR = '#c8d0e0';

// Stars
const STAR_FONT_SIZE = 13;
const STAR_CHAR_WIDTH = 7.5;
const STAR_COLOR = '#fbbf24';

// Language
const LAN_ICON_SIZE = 14;
const LAN_ICON_GAP = 6;
const LAN_FONT_SIZE = 13;
const LAN_CHAR_WIDTH = 7.5;
const LAN_COLOR = '#e6ebf5';

// Version
const VERSION_FONT_SIZE = 13;
const VERSION_CHAR_WIDTH = 7;
const VERSION_COLOR = '#8892a6';

// Language name → icon id
const LANGUAGE_ALIASES = {
  'c++': 'cplusplus',
  'c#': 'csharp',
  'f#': 'fsharp',
  'objective-c': 'objectivec',
  'shell': 'bash',
  'vue': 'vue',
  'svelte': 'svelte',
};

// ============================================================
// Measurement
// ============================================================

function measureStateWidth(label) {
  return STATE_DOT_RADIUS * 2 + STATE_DOT_GAP + label.length * STATE_CHAR_WIDTH;
}

function measureBadgeWidth(text) {
  return Math.ceil(text.length * BADGE_CHAR_WIDTH + BADGE_PADDING_X * 2);
}

export function measureWidget(widget, data) {
  if (!widget) return 0;

  if (widget.type === 'state') {
    const label = widget.value.replace(/-/g, ' ').toUpperCase();
    return measureStateWidth(label);
  }

  if (widget.type === 'badges') {
    let total = 0;
    for (let i = 0; i < widget.value.length; i++) {
      total += measureBadgeWidth(widget.value[i]);
      if (i > 0) total += BADGE_GAP;
    }
    return total;
  }

  if (widget.type === 'stars') {
    const label = data && typeof data.stars === 'number'
      ? `★ ${data.stars}`
      : '★ ?';
    return label.length * STAR_CHAR_WIDTH;
  }

  if (widget.type === 'lan') {
    if (!data || !data.language) return 0;
    const textWidth = data.language.length * LAN_CHAR_WIDTH;
    const hasIcon = !!getIconForLanguage(data.language);
    return hasIcon
      ? LAN_ICON_SIZE + LAN_ICON_GAP + textWidth
      : textWidth;
  }

  if (widget.type === 'version') {
    const label = data && data.tag
      ? (data.tag.startsWith('v') ? data.tag : `v${data.tag}`)
      : 'v?';
    return label.length * VERSION_CHAR_WIDTH;
  }

  return 0;
}

// ============================================================
// Rendering
// ============================================================

function renderState({ value, anchorX, baseline, align }) {
  const color = STATE_COLORS[value] || STATE_COLORS.prototype;
  const label = value.replace(/-/g, ' ').toUpperCase();
  const width = measureStateWidth(label);
  const x = alignX(anchorX, width, align);

  const dotCx = x + STATE_DOT_RADIUS;
  const dotCy = baseline - STATE_DOT_RADIUS + 1;
  const textX = dotCx + STATE_DOT_RADIUS + STATE_DOT_GAP;

  return (
    `<circle cx="${dotCx}" cy="${dotCy}" r="${STATE_DOT_RADIUS}" fill="${color}"/>` +
    `<text x="${textX}" y="${baseline}" font-family="${FONT_STACK}" font-size="${STATE_FONT_SIZE}" font-weight="600" fill="${color}" letter-spacing="0.5">${escapeXml(label)}</text>`
  );
}

function renderBadges({ values, anchorX, baseline, align, maxWidth }) {
  const shown = [];
  let accWidth = 0;

  for (const v of values) {
    const w = measureBadgeWidth(v);
    const needed = shown.length === 0 ? w : accWidth + BADGE_GAP + w;
    if (needed > maxWidth) break;
    shown.push({ text: v, width: w });
    accWidth = needed;
  }

  if (shown.length === 0) return '';

  let currentX = alignX(anchorX, accWidth, align);
  const pillTopY = baseline - 15;

  let svg = '';
  for (const badge of shown) {
    svg +=
      `<rect x="${currentX}" y="${pillTopY}" width="${badge.width}" height="${BADGE_HEIGHT}" rx="${BADGE_HEIGHT / 2}" fill="${BADGE_BG}" fill-opacity="${BADGE_BG_OPACITY}" stroke="${BADGE_STROKE}" stroke-opacity="${BADGE_STROKE_OPACITY}" stroke-width="1"/>` +
      `<text x="${currentX + badge.width / 2}" y="${baseline}" text-anchor="middle" font-family="${FONT_STACK}" font-size="${BADGE_FONT_SIZE}" font-weight="500" fill="${BADGE_TEXT_COLOR}">${escapeXml(badge.text)}</text>`;
    currentX += badge.width + BADGE_GAP;
  }

  return svg;
}

function renderStars({ data, anchorX, baseline, align }) {
  const label =
    data && typeof data.stars === 'number' ? `★ ${data.stars}` : '★ ?';
  const width = label.length * STAR_CHAR_WIDTH;
  const x = alignX(anchorX, width, align);
  return `<text x="${x}" y="${baseline}" font-family="${FONT_STACK}" font-size="${STAR_FONT_SIZE}" fill="${STAR_COLOR}">${escapeXml(label)}</text>`;
}

function renderLan({ data, anchorX, baseline, align }) {
  if (!data || !data.language) return '';

  const textWidth = data.language.length * LAN_CHAR_WIDTH;
  const iconKey = getIconForLanguage(data.language);
  const hasIcon = !!iconKey;

  const totalWidth = hasIcon
    ? LAN_ICON_SIZE + LAN_ICON_GAP + textWidth
    : textWidth;
  const x = alignX(anchorX, totalWidth, align);

  let svg = '';
  if (hasIcon) {
    const icon = icons[iconKey];
    svg +=
      `<svg x="${x}" y="${baseline - LAN_ICON_SIZE + 3}" width="${LAN_ICON_SIZE}" height="${LAN_ICON_SIZE}" viewBox="${icon.viewBox}" preserveAspectRatio="xMidYMid meet">${icon.content}</svg>` +
      `<text x="${x + LAN_ICON_SIZE + LAN_ICON_GAP}" y="${baseline}" font-family="${FONT_STACK}" font-size="${LAN_FONT_SIZE}" fill="${LAN_COLOR}">${escapeXml(data.language)}</text>`;
  } else {
    svg += `<text x="${x}" y="${baseline}" font-family="${FONT_STACK}" font-size="${LAN_FONT_SIZE}" fill="${LAN_COLOR}">${escapeXml(data.language)}</text>`;
  }

  return svg;
}

function renderVersion({ data, anchorX, baseline, align }) {
  const label =
    data && data.tag
      ? (data.tag.startsWith('v') ? data.tag : `v${data.tag}`)
      : 'v?';
  const width = label.length * VERSION_CHAR_WIDTH;
  const x = alignX(anchorX, width, align);
  return `<text x="${x}" y="${baseline}" font-family="${FONT_STACK}" font-size="${VERSION_FONT_SIZE}" font-weight="500" fill="${VERSION_COLOR}">${escapeXml(label)}</text>`;
}

// ============================================================
// Public dispatcher
// ============================================================

export function renderWidget({
  widget,
  data,
  anchorX,
  baseline,
  align,
  maxWidth,
}) {
  if (!widget) return '';

  if (widget.type === 'state') {
    return renderState({ value: widget.value, anchorX, baseline, align });
  }
  if (widget.type === 'badges') {
    return renderBadges({
      values: widget.value,
      anchorX,
      baseline,
      align,
      maxWidth: maxWidth || 500,
    });
  }
  if (widget.type === 'stars') {
    return renderStars({ data, anchorX, baseline, align });
  }
  if (widget.type === 'lan') {
    return renderLan({ data, anchorX, baseline, align });
  }
  if (widget.type === 'version') {
    return renderVersion({ data, anchorX, baseline, align });
  }

  return '';
}

// ============================================================
// Internal helpers
// ============================================================

function getIconForLanguage(lang) {
  const lower = lang.toLowerCase();
  const aliased = LANGUAGE_ALIASES[lower] || lower.replace(/\s+/g, '');
  return Object.prototype.hasOwnProperty.call(icons, aliased) ? aliased : null;
}