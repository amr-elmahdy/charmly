// ============================================================
// Card layout module
// ============================================================

// Base dimensions
export const CARD_HEIGHT = 250;

export const CARD_SIZES = {
  s: 250,
  m: 500,
  l: 750,
};

export const IMAGE_WIDTHS = {
  s: 150,
  m: 250,
  l: 350,
  xl: 500,
};

// Spacing & style
export const CARD_PADDING = 24;
export const CORNER_RADII = {
  sharp: 0,
  smooth: 12,
};

// Defaults
export const DEFAULT_SIZE = 'm';
export const DEFAULT_IMAGE_SIZE = 'm';
export const DEFAULT_CORNER = 'smooth';

// Vertical baselines
const TITLE_BASELINE = 55;
const TITLE_LINE_Y = 75;
const DESC_START_Y = 105;
const DESC_LINE_HEIGHT = 22;
const DESC_MAX_LINES = 3;
const WIDGETS_BASELINE = 215;

// ============================================================
// Validators
// ============================================================

export function validateSize(size) {
  if (size === null) return DEFAULT_SIZE;
  const lower = String(size).toLowerCase();
  if (!(lower in CARD_SIZES)) return null;
  return lower;
}

export function validateImageSize(size) {
  if (size === null) return DEFAULT_IMAGE_SIZE;
  const lower = String(size).toLowerCase();
  if (!(lower in IMAGE_WIDTHS)) return null;
  return lower;
}

export function validateCorner(corner) {
  if (corner === null) return DEFAULT_CORNER;
  const lower = String(corner).toLowerCase();
  if (!(lower in CORNER_RADII)) return null;
  return lower;
}

// ============================================================
// Layout computation
// ============================================================

export function computeLayout({ size, imageSize }) {
  const panelWidth = CARD_SIZES[size];
  const imageWidth = IMAGE_WIDTHS[imageSize];
  const totalWidth = imageWidth + panelWidth;
  
  const contentX = imageWidth + CARD_PADDING;
  const contentWidth = panelWidth - CARD_PADDING * 2;
  const rightEdge = totalWidth - CARD_PADDING;
  
  return {
    // Overall
    totalWidth,
    totalHeight: CARD_HEIGHT,
    cornerRadius: CORNER_RADII.smooth,
    
    // Image side
    imageWidth,
    imageHeight: CARD_HEIGHT,
    panelWidth,
    
    // Content side
    contentX,
    contentWidth,
    rightEdge,
    
    // Vertical baselines
    titleBaseline: TITLE_BASELINE,
    titleLineY: TITLE_LINE_Y,
    descStartY: DESC_START_Y,
    descLineHeight: DESC_LINE_HEIGHT,
    descMaxLines: DESC_MAX_LINES,
    widgetsBaseline: WIDGETS_BASELINE,
  };
}