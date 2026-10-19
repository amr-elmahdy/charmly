// ============================================================
// Charmly Worker — main entry point
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
import { generateCard } from './card/index.js';

// Rate limiting
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

// Response headers
function svgHeaders(cacheSeconds) {
  return {
    'Content-Type': 'image/svg+xml; charset=utf-8',
    'Cache-Control': `public, max-age=${cacheSeconds}`,
    'Access-Control-Allow-Origin': '*',
    'X-Content-Type-Options': 'nosniff',
  };
}

// Query param with short alias
function getParam(params, fullName, shortName) {
  const full = params.get(fullName);
  if (full !== null) return full;
  return shortName ? params.get(shortName) : null;
}

// ============================================================
// Main handler
// ============================================================
export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Rate limiting
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
    
    // Route: /card
    if (url.pathname === '/card') {
      const title = (getParam(url.searchParams, 'title', 't') || '').trim();
      const size = getParam(url.searchParams, 'size', 's');
      const imageSize = getParam(url.searchParams, 'imagewidth', 'iw');
      const corner = getParam(url.searchParams, 'corner', 'co');
      const colour = getParam(url.searchParams, 'colour', 'c');
      const img = (url.searchParams.get('img') || '').trim();
      const imgmerge = getParam(url.searchParams, 'imagermerge', 'im');
      const desc = (getParam(url.searchParams, 'desc', 'd') || '').trim();
      const titleColor = getParam(url.searchParams, 'titlecolor', 'tc');
      const titleLine = getParam(url.searchParams, 'titleline', 'tl');
      const descColor = getParam(url.searchParams, 'desccolor', 'dc');
      const descSize = getParam(url.searchParams, 'descsize', 'ds');
      
      const result = generateCard({
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
      });
      
      if (result.error) {
        return new Response(result.error, {
          status: 400,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }
      
      return new Response(result.svg, { headers: svgHeaders(60) });
    }
    
    // Route: /icons
    if (url.pathname === '/icons') {
      const iParam = url.searchParams.get('i') || '';
      const names = iParam
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      
      if (names.length === 0) {
        return new Response(
          'Missing "i" query parameter, e.g. ?i=js,html,css', { status: 400 }
        );
      }
      
      if (names.length > MAX_ICONS) {
        return new Response(
          `Too many icons requested: max ${MAX_ICONS}, got ${names.length}`, { status: 400 }
        );
      }
      
      const perlineParam = url.searchParams.get('perline');
      const perline = perlineParam ? parseInt(perlineParam, 10) : 0;
      
      // Validate size
      const size = validateNumber(
        url.searchParams.get('size'),
        SIZE_MIN,
        SIZE_MAX,
        DEFAULT_SIZE
      );
      if (size === null) {
        return new Response(
          `Invalid "size" parameter: must be a number between ${SIZE_MIN} and ${SIZE_MAX}`, { status: 400 }
        );
      }
      
      // Validate gap
      const gap = validateNumber(
        url.searchParams.get('gap'),
        GAP_MIN,
        GAP_MAX,
        DEFAULT_GAP
      );
      if (gap === null) {
        return new Response(
          `Invalid "gap" parameter: must be a number between ${GAP_MIN} and ${GAP_MAX}`, { status: 400 }
        );
      }
      
      // Validate radius
      const radius = validateNumber(
        url.searchParams.get('radius'),
        RADIUS_MIN,
        RADIUS_MAX,
        DEFAULT_RADIUS
      );
      if (radius === null) {
        return new Response(
          `Invalid "radius" parameter: must be a number between ${RADIUS_MIN} and ${RADIUS_MAX}`, { status: 400 }
        );
      }
      
      // Validate bg
      const bg = validateBoolean(url.searchParams.get('bg'), DEFAULT_BG);
      if (bg === null) {
        return new Response(
          'Invalid "bg" parameter: must be "true" or "false"', { status: 400 }
        );
      }
      
      // Validate bgcolor
      let bgcolor = DEFAULT_BGCOLOR;
      if (bg) {
        const bgcolorParam = url.searchParams.get('bgcolor');
        if (bgcolorParam !== null) {
          const validated = validateHexColor(bgcolorParam);
          if (validated === null) {
            return new Response(
              'Invalid "bgcolor" parameter: must be a 3 or 6 digit hex color', { status: 400 }
            );
          }
          bgcolor = validated;
        }
      }
      
      const svg = buildSvg(names, perline, size, gap, radius, bg, bgcolor);
      
      return new Response(svg, { headers: svgHeaders(60) });
    }
    
    // Unknown route
    return new Response('Not found', { status: 404 });
  },
};