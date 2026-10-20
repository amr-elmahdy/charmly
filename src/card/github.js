// ============================================================
// GitHub API client with caching
// ============================================================

const API_BASE = 'https://api.github.com';
const CACHE_TTL_SECONDS = 3600; // 1 hour
const USER_AGENT = 'Charmly/1.0 (+https://github.com/amrelmahdy001/Charmly)';

// ============================================================
// Public API
// ============================================================

// Fetch repo data (stars, language)
export async function fetchRepoData(owner, repo) {
  const cacheKey = new Request(
    `https://cache.internal/gh/repo/${owner}/${repo}`,
    { method: 'GET' }
  );

  const cached = await safeCacheMatch(cacheKey);
  if (cached) {
    try {
      return await cached.json();
    } catch {
      // Corrupt cache entry — fall through
    }
  }

  try {
    const res = await fetch(`${API_BASE}/repos/${owner}/${repo}`, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/vnd.github+json',
      },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const result = {
      stars:
        typeof data.stargazers_count === 'number' ? data.stargazers_count : 0,
      language: typeof data.language === 'string' ? data.language : null,
    };

    await safeCachePut(
      cacheKey,
      new Response(JSON.stringify(result), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `public, max-age=${CACHE_TTL_SECONDS}`,
        },
      })
    );

    return result;
  } catch {
    return null;
  }
}

// Fetch latest release tag
export async function fetchLatestRelease(owner, repo) {
  const cacheKey = new Request(
    `https://cache.internal/gh/release/${owner}/${repo}`,
    { method: 'GET' }
  );

  const cached = await safeCacheMatch(cacheKey);
  if (cached) {
    try {
      return await cached.text();
    } catch {
      // Corrupt cache — fall through
    }
  }

  try {
    const res = await fetch(
      `${API_BASE}/repos/${owner}/${repo}/releases/latest`,
      {
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'application/vnd.github+json',
        },
      }
    );
    if (!res.ok) return null;

    const data = await res.json();
    const tag = typeof data.tag_name === 'string' ? data.tag_name : null;
    if (!tag) return null;

    await safeCachePut(
      cacheKey,
      new Response(tag, {
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': `public, max-age=${CACHE_TTL_SECONDS}`,
        },
      })
    );

    return tag;
  } catch {
    return null;
  }
}

// ============================================================
// Internal: safe cache wrappers
// ============================================================

async function safeCacheMatch(key) {
  try {
    return await caches.default.match(key);
  } catch {
    return null;
  }
}

async function safeCachePut(key, response) {
  try {
    await caches.default.put(key, response);
  } catch {
    // Ignore — cache is best-effort
  }
}