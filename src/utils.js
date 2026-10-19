// ============================================================
// Shared utility functions
// ============================================================

// Escape for SVG attributes
export function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// Escape for XML text/attributes
export function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Validate numeric param against [min, max]
export function validateNumber(paramValue, min, max, defaultValue) {
  if (paramValue === null) return defaultValue;
  const trimmed = paramValue.trim();
  if (trimmed === '') return null;
  const num = Number(trimmed);
  if (!Number.isFinite(num)) return null;
  if (num < min || num > max) return null;
  return num;
}

// Validate hex color (3 or 6 digits, optional #)
export function validateHexColor(color) {
  if (color === null) return null;
  const trimmed = color.trim().replace(/^#/, '');
  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) return null;
  return `#${trimmed}`;
}

// Validate boolean param ("true"/"false")
export function validateBoolean(paramValue, defaultValue) {
  if (paramValue === null) return defaultValue;
  const lower = paramValue.trim().toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;
  return null;
}

// Blend two hex colors. t=0 → colorA, t=1 → colorB
export function interpolateHex(colorA, colorB, t) {
  const a = colorA.replace('#', '');
  const b = colorB.replace('#', '');
  const ar = parseInt(a.slice(0, 2), 16);
  const ag = parseInt(a.slice(2, 4), 16);
  const ab = parseInt(a.slice(4, 6), 16);
  const br = parseInt(b.slice(0, 2), 16);
  const bg = parseInt(b.slice(2, 4), 16);
  const bb = parseInt(b.slice(4, 6), 16);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return (
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    bl.toString(16).padStart(2, '0')
  );
}