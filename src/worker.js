// ============================================================
// Charmly Worker — main entry point.
// Handles routing, rate limiting, and request validation.
// Actual rendering is delegated to ./icons.js.
// ============================================================

import {
  validateNumber,
  validateHexColor,
  validateBoolean,
} from './utils.js';
import {
  buildSvg,
  DEFAULT_SIZE,
  DEFAULT_GAP,
  DEFAULT_RADIUS,
  DEFAULT_BG,
  DEFAULT_BGCOLOR,
  SIZE_MIN,
  SIZE_MAX,
  GAP_MIN,
  GAP_MAX,
  RADIUS_MIN,
  RADIUS_MAX,
  MAX_ICONS,
} from './icons.js';

// ---- Rate limiting config ----
const RATE_LIMIT_MAX = 100;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_CLEANUP_MS = 5 * 60_000;

const rateLimitStore = new Map();
let lastCleanup = Date.now();

function cleanupRateLimitStore(now) {
  if (now - lastCleanup < RATE_LIMIT_CLEANUP_MS) return;
  for (const [ip, entry] of rateLimitStore) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
  lastCleanup = now;
}

function isRateLimited(ip) {
  const now = Date.now();
  cleanupRateLimitStore(now);
  const entry = rateLimitStore.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// ---- Common response headers ----
function svgHeaders(cacheSeconds) {
  return {
    'Content-Type': 'image/svg+xml; charset=utf-8',
    'Cache-Control': `public, max-age=${cacheSeconds}`,
    'Access-Control-Allow-Origin': '*',
    'X-Content-Type-Options': 'nosniff',
  };
}

// ============================================================
// MAIN HANDLER
// ============================================================
export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname !== '/icons') {
      return new Response('Not found', { status: 404 });
    }

    // ---- Simple per-IP rate limiting ----
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
      return new Response('Too Many Requests', {
        status: 429,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Retry-After': '60',
        },
      });
    }

    const iParam = url.searchParams.get('i') || '';
    const names = iParam
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (names.length === 0) {
      return new Response(
        'Missing "i" query parameter, e.g. ?i=js,html,css',
        { status: 400 }
      );
    }

    if (names.length > MAX_ICONS) {
      return new Response(
        `Too many icons requested: max ${MAX_ICONS}, got ${names.length}`,
        { status: 400 }
      );
    }

    const perlineParam = url.searchParams.get('perline');
    const perline = perlineParam ? parseInt(perlineParam, 10) : 0;

    const size = validateNumber(
      url.searchParams.get('size'),
      SIZE_MIN,
      SIZE_MAX,
      DEFAULT_SIZE
    );
    if (size === null) {
      return new Response(
        `Invalid "size" parameter: must be a number between ${SIZE_MIN} and ${SIZE_MAX}`,
        { status: 400 }
      );
    }

    const gap = validateNumber(
      url.searchParams.get('gap'),
      GAP_MIN,
      GAP_MAX,
      DEFAULT_GAP
    );
    if (gap === null) {
      return new Response(
        `Invalid "gap" parameter: must be a number between ${GAP_MIN} and ${GAP_MAX}`,
        { status: 400 }
      );
    }

    const radius = validateNumber(
      url.searchParams.get('radius'),
      RADIUS_MIN,
      RADIUS_MAX,
      DEFAULT_RADIUS
    );
    if (radius === null) {
      return new Response(
        `Invalid "radius" parameter: must be a number between ${RADIUS_MIN} and ${RADIUS_MAX}`,
        { status: 400 }
      );
    }

    const bg = validateBoolean(url.searchParams.get('bg'), DEFAULT_BG);
    if (bg === null) {
      return new Response(
        'Invalid "bg" parameter: must be "true" or "false"',
        { status: 400 }
      );
    }

    let bgcolor = DEFAULT_BGCOLOR;
    if (bg) {
      const bgcolorParam = url.searchParams.get('bgcolor');
      if (bgcolorParam !== null) {
        const validated = validateHexColor(bgcolorParam);
        if (validated === null) {
          return new Response(
            'Invalid "bgcolor" parameter: must be a 3 or 6 digit hex color',
            { status: 400 }
          );
        }
        bgcolor = validated;
      }
    }

    const svg = buildSvg(names, perline, size, gap, radius, bg, bgcolor);

    return new Response(svg, { headers: svgHeaders(60) });
  },
};