// ============================================================
// Card generation — entry point
// ============================================================

import { escapeXml, interpolateHex } from '../utils.js';
import { parseColors } from './colors.js';
import { renderImage, validateMergeMode } from './image.js';
import {
  computeLayout,
  validateSize,
  validateImageSize,
  validateCorner,
  CORNER_RADII,
} from './layout.js';

// Font stack
const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

// ============================================================
// Public API
// ============================================================

// Generate card SVG
export function generateCard({
  title,
  size,
  imageSize,
  corner,
  colour,
  img,
  imgmerge,
}) {
  // Validate required
  if (!title || title.trim() === '') {
    return { error: 'Missing required parameter: title' };
  }

  if (!img || img.trim() === '') {
    return { error: 'Missing required parameter: img' };
  }

  // Validate options
  const vSize = validateSize(size);
  if (vSize === null) {
    return { error: 'Invalid "size" parameter. Must be one of: s, m, l' };
  }

  const vImageSize = validateImageSize(imageSize);
  if (vImageSize === null) {
    return {
      error: 'Invalid "imagewidth" parameter. Must be one of: s, m, l, xl',
    };
  }

  const vCorner = validateCorner(corner);
  if (vCorner === null) {
    return {
      error: 'Invalid "corner" parameter. Must be one of: sharp, smooth',
    };
  }

  const vMerge = validateMergeMode(imgmerge);
  if (vMerge === null) {
    return {
      error:
        'Invalid "imagermerge" parameter. Must be one of: cut, line, smooth',
    };
  }

  const colors = parseColors(colour);
  if (colors === null) {
    return { error: 'Invalid "colour" parameter. Must be hex or hex,hex' };
  }

  // Compute layout
  const layout = computeLayout({ size: vSize, imageSize: vImageSize });
  const radius = CORNER_RADII[vCorner];

  // Compose SVG
  const svg = composeSvg({
    layout,
    colors,
    radius,
    title,
    imageUrl: img,
    mergeMode: vMerge,
  });

  return { svg };
}

// ============================================================
// Internal: SVG composition
// ============================================================

function composeSvg({
  layout,
  colors,
  radius,
  title,
  imageUrl,
  mergeMode,
}) {
  const {
    totalWidth,
    totalHeight,
    contentX,
    contentWidth,
    titleBaseline,
    imageWidth,
  } = layout;

  const safeTitle = truncateToWidth(title, contentWidth, 24);
  const gradientStops =
    `<stop offset="0%" stop-color="${escapeXml(colors[0])}"/>` +
    `<stop offset="100%" stop-color="${escapeXml(colors[1])}"/>`;

  // Panel color at image edge
  const panelColorAtImageEdge = interpolateHex(
    colors[0],
    colors[1],
    imageWidth / totalWidth
  );

  const imageSvg = renderImage({
    imageUrl,
    imageWidth,
    mergeMode,
    panelColor: panelColorAtImageEdge,
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${totalWidth}" height="${totalHeight}"
  viewBox="0 0 ${totalWidth} ${totalHeight}">
  <defs>
    <linearGradient id="cardBg" x1="0" y1="0" x2="${totalWidth}" y2="0" gradientUnits="userSpaceOnUse">
      ${gradientStops}
    </linearGradient>
    <clipPath id="cardClip">
      <rect width="${totalWidth}" height="${totalHeight}" rx="${radius}"/>
    </clipPath>
  </defs>
  <g clip-path="url(#cardClip)">
    <rect width="${totalWidth}" height="${totalHeight}" fill="url(#cardBg)"/>
    ${imageSvg}
    <text x="${contentX}" y="${titleBaseline}"
      font-family="${FONT_STACK}" font-size="24" font-weight="700"
      fill="#ffffff">${escapeXml(safeTitle)}</text>
  </g>
</svg>`;
}

// ============================================================
// Internal helpers
// ============================================================

// Truncate text to fit a width (approximate)
function truncateToWidth(text, maxWidth, fontSize) {
  const approxCharWidth = fontSize * 0.55;
  const maxChars = Math.max(1, Math.floor(maxWidth / approxCharWidth));
  if (text.length <= maxChars) return text;
  return text.slice(0, Math.max(1, maxChars - 3)) + '...';
}