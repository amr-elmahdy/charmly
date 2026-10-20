// ============================================================
// Card generation — entry point.
// Composes the final SVG from layout + colors + content + widgets.
//
// Commit 5 scope: GitHub API widgets (stars, lan, version).
// generateCard is now async because it may call the GitHub API.
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
import { fetchRepoData, fetchLatestRelease } from './github.js';

// ============================================================
// Public API
// ============================================================

export async function generateCard({
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

  // ---- Parse widgets ----
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

  // ---- Resolve widget data (parallel) ----
  const [trData, brData, blData] = await Promise.all([
    resolveWidgetData(trWidget),
    resolveWidgetData(brWidget),
    resolveWidgetData(blWidget),
  ]);

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
    trWidget,
    trData,
    brWidget,
    brData,
    blWidget,
    blData,
  });

  return { svg };
}

// ============================================================
// Widget data resolver
// ============================================================

async function resolveWidgetData(widget) {
  if (!widget) return null;

  if (widget.type === 'state' || widget.type === 'badges') {
    return null; // static — no data needed
  }

  if (widget.type === 'stars' || widget.type === 'lan') {
    return await fetchRepoData(widget.owner, widget.repo);
  }

  if (widget.type === 'version') {
    const tag = await fetchLatestRelease(widget.owner, widget.repo);
    return tag ? { tag } : null;
  }

  return null;
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
  trData,
  brWidget,
  brData,
  blWidget,
  blData,
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

  const gradientStops =
    `<stop offset="0%" stop-color="${escapeXml(colors[0])}"/>` +
    `<stop offset="100%" stop-color="${escapeXml(colors[1])}"/>`;

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

  // TR width affects title truncation
  const trWidth = measureWidget(trWidget, trData);
  const titleMaxWidth = trWidget
    ? contentWidth - trWidth - 16
    : contentWidth;

  const titleSvg = renderTitle({
    title,
    color: titleColor,
    x: contentX,
    baseline: titleBaseline,
    maxWidth: titleMaxWidth,
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

  const trSvg = renderWidget({
    widget: trWidget,
    data: trData,
    anchorX: rightEdge,
    baseline: titleBaseline,
    align: 'end',
    maxWidth: contentWidth,
  });

  const brSvg = renderWidget({
    widget: brWidget,
    data: brData,
    anchorX: rightEdge,
    baseline: widgetsBaseline,
    align: 'end',
    maxWidth: contentWidth * 0.4,
  });

  const blSvg = renderWidget({
    widget: blWidget,
    data: blData,
    anchorX: contentX,
    baseline: widgetsBaseline,
    align: 'start',
    maxWidth: contentWidth * 0.6,
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
    ${trSvg}
    ${titleLineSvg}
    ${descSvg}
    ${blSvg}
    ${brSvg}
  </g>
</svg>`;
}