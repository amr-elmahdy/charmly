// ============================================================
// Card generation — entry point.
// Composes the final SVG from layout + colors + content.
//
// Commit 3 scope: background + image + title + description.
// Widgets will be added in later commits.
// ============================================================

import { escapeXml, interpolateHex } from '../utils.js';
import { parseColors } from './colors.js';
import { renderImage, validateMergeMode } from './image.js';
import {
  renderTitle,
  renderTitleLine,
  renderDescription,
  validateDescSize,
  validateTitleColor,
  validateDescColor,
  DEFAULT_TITLE_COLOR,
  DEFAULT_DESC_COLOR,
  FONT_STACK,
} from './content.js';
import {
  computeLayout,
  validateSize,
  validateImageSize,
  validateCorner,
  CORNER_RADII,
} from './layout.js';

// ============================================================
// Public API
// ============================================================

export function generateCard({
  title,
  desc,
  size,
  imageSize,
  corner,
  colour,
  img,
  imgmerge,
  titleColor,
  titleLine,
  descColor,
  descSize,
}) {
  // ---- Validate required ----
  if (!title || title.trim() === '') {
    return { error: 'Missing required parameter: title' };
  }

  if (!img || img.trim() === '') {
    return { error: 'Missing required parameter: img' };
  }

  // ---- Validate options ----
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

  const vDescSize = validateDescSize(descSize);
  if (vDescSize === null) {
    return { error: 'Invalid "descsize" parameter. Must be one of: s, m, l' };
  }

const vTitleColor = validateTitleColor(titleColor);
if (vTitleColor === null) {
  return {
    error:
      'Invalid "titlecolor" parameter. Must be a 3 or 6 digit hex color',
  };
}
const vDescColor = validateDescColor(descColor);
if (vDescColor === null) {
  return {
    error:
      'Invalid "desccolor" parameter. Must be a 3 or 6 digit hex color',
  };
}

  const colors = parseColors(colour);
  if (colors === null) {
    return { error: 'Invalid "colour" parameter. Must be hex or hex,hex' };
  }

  // ---- Compute ----
  const layout = computeLayout({ size: vSize, imageSize: vImageSize });
  const radius = CORNER_RADII[vCorner];

  // ---- Compose ----
  const svg = composeSvg({
    layout,
    colors,
    radius,
    title,
    desc,
    imageUrl: img,
    mergeMode: vMerge,
    titleColor: vTitleColor,
    titleLine: titleLine === 'true' || titleLine === true,
    descColor: vDescColor,
    descSize: vDescSize,
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
  desc,
  imageUrl,
  mergeMode,
  titleColor,
  titleLine,
  descColor,
  descSize,
}) {
  const {
    totalWidth,
    totalHeight,
    contentX,
    contentWidth,
    titleBaseline,
    titleLineY,
    descStartY,
    descLineHeight,
    descMaxLines,
    imageWidth,
  } = layout;

  const gradientStops =
    `<stop offset="0%" stop-color="${escapeXml(colors[0])}"/>` +
    `<stop offset="100%" stop-color="${escapeXml(colors[1])}"/>`;

  // Panel color at the image edge (used by smooth merge)
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

  const titleSvg = renderTitle({
    title,
    color: titleColor,
    x: contentX,
    baseline: titleBaseline,
    maxWidth: contentWidth,
  });

  const titleLineSvg = titleLine
    ? renderTitleLine({
        x: contentX,
        width: contentWidth,
        y: titleLineY,
        color: titleColor,
      })
    : '';

  const descSvg = renderDescription({
    desc,
    color: descColor,
    size: descSize,
    x: contentX,
    startY: descStartY,
    maxWidth: contentWidth,
    lineHeight: descLineHeight,
    maxLines: descMaxLines,
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
    ${titleSvg}
    ${titleLineSvg}
    ${descSvg}
  </g>
</svg>`;
}