// ============================================================
// Image fetcher for the card module
// ============================================================

// Limits
const MAX_IMAGE_BYTES = 200 * 1024; // 200 KB

// Allowed MIME types
const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/gif',
];

// ============================================================
// Public API
// ============================================================

// Fetch remote image as data URI
export async function fetchImageAsDataUri(imageUrl) {
  // Validate URL
  let parsed;
  try {
    parsed = new URL(imageUrl);
  } catch {
    return null;
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return null;
  }
  
  // Fetch
  let res;
  try {
    res = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Charmly/1.0 (+https://github.com/amrelmahdy001/Charmly)',
        Accept: 'image/*',
      },
    });
  } catch {
    return null;
  }
  
  if (!res.ok) return null;
  
  // Validate content-type
  const contentType = (res.headers.get('content-type') || '').toLowerCase();
  const mime = contentType.split(';')[0].trim();
  if (!ALLOWED_TYPES.includes(mime)) return null;
  
  // Check declared size
  const declaredLength = parseInt(res.headers.get('content-length') || '0', 10);
  if (declaredLength > MAX_IMAGE_BYTES) return null;
  
  // Read body
  let buffer;
  try {
    buffer = await res.arrayBuffer();
  } catch {
    return null;
  }
  
  if (buffer.byteLength === 0) return null;
  if (buffer.byteLength > MAX_IMAGE_BYTES) return null;
  
  // Convert to base64 (chunked)
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const CHUNK_SIZE = 8192;
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    const chunk = bytes.subarray(i, i + CHUNK_SIZE);
    binary += String.fromCharCode.apply(null, chunk);
  }
  
  let base64;
  try {
    base64 = btoa(binary);
  } catch {
    return null;
  }
  
  return `data:${mime};base64,${base64}`;
}