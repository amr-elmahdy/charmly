// ============================================================
// Card widgets module
// ============================================================

import { escapeXml } from '../utils.js';
import { alignX } from './layout.js';

// State widget
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

// Badges widget
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

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

// ============================================================
// Measurement
// ============================================================

function measureStateWidth(label) {
  return STATE_DOT_RADIUS * 2 + STATE_DOT_GAP + label.length * STATE_CHAR_WIDTH;
}

function measureBadgeWidth(text) {
  return Math.ceil(text.length * BADGE_CHAR_WIDTH + BADGE_PADDING_X * 2);
}

export function measureWidget(widget) {
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

// ============================================================
// Public dispatcher
// ============================================================

export function renderWidget({ widget, anchorX, baseline, align, maxWidth }) {
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
  
  return '';
}