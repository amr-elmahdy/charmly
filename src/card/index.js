// ============================================================
// Card generation — entry point
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
} from './content.js';
import {
  computeLayout,
  validateSize,
  validateImageSize,
  validateCorner,
  CORNER_RADII,
} from './layout.js';
import { parseWidget } from './parser.js';
import { renderWidget, measureWidget } from './widgets.js';

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
  tr,
  br,
  bl,
}) {
  // Required params
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
      error: 'Invalid "imagermerge" parameter. Must be one of: cut, line, smooth',
    };
  }
  
  const vDescSize = validateDescSize(descSize);
  if (vDescSize === null) {
    return { error: 'Invalid "descsize" parameter. Must be one of: s, m, l' };
  }
  
  const vTitleColor = validateTitleColor(titleColor);
  if (vTitleColor === null) {
    return {
      error: 'Invalid "titlecolor" parameter. Must be a 3 or 6 digit hex color',
    };
  }
  
  const vDescColor = validateDescColor(descColor);
  if (vDescColor === null) {
    return {
      error: 'Invalid "desccolor" parameter. Must be a 3 or 6 digit hex color',
    };
  }
  
  const colors = parseColors(colour);
  if (colors === null) {
    return { error: 'Invalid "colour" parameter. Must be hex or hex,hex' };
  }
  
  // Parse widgets
  const trWidget = parseWidget(tr);
  if (trWidget && trWidget.error) {
    return { error: `"topright": ${trWidget.error}` };
  }
  const brWidget = parseWidget(br);
  if (brWidget && brWidget.error) {
    return { error: `"bottomright": ${brWidget.error}` };
  }
  const blWidget = parseWidget(bl);
  if (blWidget && blWidget.error) {
    return { error: `"bottomleft": ${blWidget.error}` };
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
    desc,
    imageUrl: img,
    mergeMode: vMerge,
    titleColor: vTitleColor,
    titleLine: titleLine === 'true' || titleLine === true,
    descColor: vDescColor,
    descSize: vDescSize,
    trWidget,
    brWidget,
    blWidget,
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
  trWidget,
  brWidget,
  blWidget,
}) {
  const {
    totalWidth,
    totalHeight,
    contentX,
    contentWidth,
    rightEdge,
    titleBaseline,
    titleLineY,
    descStartY,
    descLineHeight,
    descMaxLines,
    widgetsBaseline,
    imageWidth,
  } = layout;
  
  // Background gradient
  const gradientStops =
    `<stop offset="0%" stop-color="${escapeXml(colors[0])}"/>` +
    `<stop offset="100%" stop-color="${escapeXml(colors[1])}"/>`;
  
  // Panel color at image edge
  const panelColorAtImageEdge = interpolateHex(
    colors[0],
    colors[1],
    imageWidth / totalWidth
  );
  
  // Image
  const imageSvg = renderImage({
    imageUrl,
    imageWidth,
    mergeMode,
    panelColor: panelColorAtImageEdge,
  });
  
  // Title (width reduced by TR widget)
  const trWidth = measureWidget(trWidget);
  const titleMaxWidth = trWidget ? contentWidth - trWidth - 16 : contentWidth;
  
  const titleSvg = renderTitle({
    title,
    color: titleColor,
    x: contentX,
    baseline: titleBaseline,
    maxWidth: titleMaxWidth,
  });
  
  // Title underline
  const titleLineSvg = titleLine ?
    renderTitleLine({
      x: contentX,
      width: contentWidth,
      y: titleLineY,
      color: titleColor,
    }) :
    '';
  
  // Description
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
  
  // Widgets
  const trSvg = renderWidget({
    widget: trWidget,
    anchorX: rightEdge,
    baseline: titleBaseline,
    align: 'end',
    maxWidth: contentWidth,
  });
  
  const brSvg = renderWidget({
    widget: brWidget,
    anchorX: rightEdge,
    baseline: widgetsBaseline,
    align: 'end',
    maxWidth: contentWidth * 0.4,
  });
  
  const blSvg = renderWidget({
    widget: blWidget,
    anchorX: contentX,
    baseline: widgetsBaseline,
    align: 'start',
    maxWidth: contentWidth * 0.6,
  });
  
  // Final SVG
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
    ${trSvg}
    ${titleLineSvg}
    ${descSvg}
    ${blSvg}
    ${brSvg}
  </g>
</svg>`;
}