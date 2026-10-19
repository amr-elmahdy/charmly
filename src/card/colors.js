// ============================================================
// Card colors module
// ============================================================

import { validateHexColor } from '../utils.js';

// Default colors
export const DEFAULT_COLORS = ['#5865F2', '#1a1d2e'];

// ============================================================
// Public API
// ============================================================

// Parse colors parameter
export function parseColors(param) {
  if (param === null) return DEFAULT_COLORS.slice();
  
  const parts = String(param)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  
  if (parts.length === 0 || parts.length > 2) return null;
  
  const validated = parts.map((hex) => validateHexColor(hex));
  if (validated.some((v) => v === null)) return null;
  
  // Single color
  if (validated.length === 1) return [validated[0], validated[0]];
  
  return [validated[0], validated[1]];
}