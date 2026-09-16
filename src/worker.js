import icons from '../dist/icons.json' assert { type: 'json' };

// Layout defaults
const DEFAULT_SIZE = 48;
const DEFAULT_GAP = 8;
const DEFAULT_RADIUS = 12;
const DEFAULT_BG = true;
const DEFAULT_BGCOLOR = '#1a1b2e';
const PADDING = 0;

// Allowed ranges
const SIZE_MIN = 16, SIZE_MAX = 128;
const GAP_MIN = 0, GAP_MAX = 32;
const RADIUS_MIN = 0, RADIUS_MAX = 24;
const MAX_ICONS = 50;

// Rate limiting
const RATE_LIMIT_MAX = 100;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_CLEANUP_MS = 5 * 60_000;

// In-memory store for per-IP request counts (per-isolate, not global)
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

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
}

// Check if an icon name exists as an own property (not inherited from Object.prototype)
function hasIcon(name) {
  return Object.prototype.hasOwnProperty.call(icons, name);
}

function validateNumber(paramValue, min, max, defaultValue) {
  if (paramValue === null) return defaultValue;

  const trimmed = paramValue.trim();
  if (trimmed === '') return null;

  const num = Number(trimmed);
  if (!Number.isFinite(num)) return null;
  if (num < min || num > max) return null;

  return num;
}

function validateHexColor(color) {
  if (color === null) return null;

  const trimmed = color.trim().replace(/^#/, '');
  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) return null;

  return `#${trimmed}`;
}

function validateBoolean(paramValue, defaultValue) {
  if (paramValue === null) return defaultValue;

  const lower = paramValue.trim().toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;

  return null;
}

function renderIcon(name, x, y, index, size, radius, bg, bgcolor) {
  if (!hasIcon(name)) return '';
  const icon = icons[name];

  const clipId = `clip-${index}`;

  const innerSvg =
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
    `x="${PADDING}" y="${PADDING}" width="${size}" height="${size}" ` +
    `viewBox="${icon.viewBox}" preserveAspectRatio="xMidYMid meet">${icon.content}</svg>`;

  if (!bg) {
    return `<g transform="translate(${x}, ${y})">${innerSvg}</g>`;
  }

  return `
    <g transform="translate(${x}, ${y})">
      <rect width="${size}" height="${size}" rx="${radius}" fill="${escapeAttr(bgcolor)}"/>
      <clipPath id="${clipId}">
        <rect width="${size}" height="${size}" rx="${radius}"/>
      </clipPath>
      <g clip-path="url(#${clipId})">${innerSvg}</g>
    </g>
  `;
}

function buildSvg(names, perline, size, gap, radius, bg, bgcolor) {
  const valid = names.filter(hasIcon);

  if (valid.length === 0) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="320" height="48">
        <text x="8" y="28" font-family="monospace" font-size="13" fill="#e05252">
          No valid icons found
        </text>
      </svg>
    `;
  }

  const columns = perline && perline > 0
    ? Math.min(perline, valid.length)
    : valid.length;

  const rows = Math.ceil(valid.length / columns);
  const width = columns * size + (columns - 1) * gap;
  const height = rows * size + (rows - 1) * gap;

  const parts = [];

  valid.forEach((name, idx) => {
    const col = idx % columns;
    const row = Math.floor(idx / columns);
    const x = col * (size + gap);
    const y = row * (size + gap);
    parts.push(renderIcon(name, x, y, idx, size, radius, bg, bgcolor));
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
         width="${width}" height="${height}"
         viewBox="0 0 ${width} ${height}" fill="none">
      ${parts.join('')}
    </svg>
  `;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname !== '/icons') {
      return new Response('Not found', { status: 404 });
    }

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
            'Invalid "bgcolor" parameter: must be a 3 or 6 digit hex color, e.g. "ff0000" or "#f00"',
            { status: 400 }
          );
        }

        bgcolor = validated;
      }
    }

    const svg = buildSvg(names, perline, size, gap, radius, bg, bgcolor);

    // Note: max-age is intentionally kept short during active development.
    // It will be increased once the project reaches a stable release phase.
    const headers = {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    };

    return new Response(svg, { headers });
  },
};