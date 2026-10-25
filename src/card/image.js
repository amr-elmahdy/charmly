// ============================================================
// Card image module
// ============================================================

import { escapeXml } from '../utils.js';
import { CARD_HEIGHT } from './layout.js';

// Merge modes
export const MERGE_MODES = ['cut', 'line', 'smooth'];
export const DEFAULT_MERGE = 'cut';

// Smooth mode constants
const SMOOTH_FADE_START = 0.9;

// Line mode constants
const LINE_WIDTH = 2;
const LINE_COLOR = '#ffffff';
const LINE_OPACITY = 0.6;

// ============================================================
// Validators
// ============================================================

export function validateMergeMode(mode) {
  if (mode === null) return DEFAULT_MERGE;
  const lower = String(mode).toLowerCase();
  if (!MERGE_MODES.includes(lower)) return null;
  return lower;
}

// ============================================================
// Public API
// ============================================================

export function renderImage({ imageUrl, imageWidth, mergeMode, panelColor }) {
  if (!imageUrl) return '';
  
  const imageEl =
    `<image href="${escapeXml(imageUrl)}" x="0" y="0" ` +
    `width="${imageWidth}" height="${CARD_HEIGHT}" ` +
    `preserveAspectRatio="xMidYMid slice"/>`;
  
  switch (mergeMode) {
    case 'line': {
      const lineX = imageWidth - LINE_WIDTH;
      return (
        imageEl +
        `<rect x="${lineX}" y="0" width="${LINE_WIDTH}" height="${CARD_HEIGHT}" ` +
        `fill="${LINE_COLOR}" fill-opacity="${LINE_OPACITY}"/>`
      );
    }
    
    case 'smooth': {
      const fadeWidth = imageWidth * 0.15;
      const fadeStartX = imageWidth - fadeWidth;
      const gradientId = 'cardSmoothFade';
      
      return (
        imageEl +
        `<rect x="${fadeStartX}" y="0" width="${fadeWidth}" height="${CARD_HEIGHT}" ` +
        `fill="url(#${gradientId})"/>` +
        `<defs>` +
        `<linearGradient id="${gradientId}" ` +
        `x1="${fadeStartX}" y1="0" x2="${imageWidth}" y2="0" ` +
        `gradientUnits="userSpaceOnUse">` +
        `<stop offset="0%" stop-color="${escapeXml(panelColor)}" stop-opacity="0"/>` +
        `<stop offset="100%" stop-color="${escapeXml(panelColor)}" stop-opacity="1"/>` +
        `</linearGradient>` +
        `</defs>`
      );
    }
    
    case 'cut':
    default:
      return imageEl;
  }
}