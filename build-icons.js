const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'icons');
const distDir = path.join(__dirname, 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

/**
 * Extract the viewBox attribute from raw SVG content.
 * Falls back to width/height attributes, or 24x24 as default.
 */
function extractViewBox(raw) {
  const m = raw.match(/viewBox=["']([^"']+)["']/i);
  if (m) return m[1].trim();
  
  const w = raw.match(/\swidth=["']([0-9.]+)(?:px)?["']/i);
  const h = raw.match(/\sheight=["']([0-9.]+)(?:px)?["']/i);
  return `0 0 ${w ? w[1] : 24} ${h ? h[1] : 24}`;
}

/**
 * Extract the inner content of an SVG file.
 * Removes anything before the opening <svg> tag and after the closing </svg> tag.
 */
function extractInner(raw) {
  const svgStart = raw.indexOf('<svg');
  if (svgStart === -1) return null;
  
  const openTagEnd = raw.indexOf('>', svgStart);
  const closeTagStart = raw.lastIndexOf('</svg>');
  
  if (openTagEnd === -1 || closeTagStart === -1) return null;
  
  return raw.slice(openTagEnd + 1, closeTagStart).trim();
}

/**
 * Escape special regex characters in a string.
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Namespace all IDs inside an icon to prevent collisions when
 * multiple icons are combined into a single SVG.
 *
 * For each id="foo", renames it to id="<prefix>foo" and updates
 * all references: url(#foo), xlink:href="#foo", href="#foo".
 *
 * Prefix format: "i-<iconname>-"
 */
function namespaceIds(content, prefix) {
  const idMatches = [...content.matchAll(/\bid=["']([^"']+)["']/g)];
  const ids = [...new Set(idMatches.map((m) => m[1]))];
  
  if (ids.length === 0) return content;
  
  let result = content;
  
  for (const id of ids) {
    const escaped = escapeRegex(id);
    const newId = `${prefix}${id}`;
    
    // 1. Rename the definition itself
    result = result.replace(
      new RegExp(`\\bid=["']${escaped}["']`, 'g'),
      `id="${newId}"`
    );
    
    // 2. Update url(#id) references (fills, clip-paths, masks, filters)
    result = result.replace(
      new RegExp(`url\\(\\s*#${escaped}\\s*\\)`, 'g'),
      `url(#${newId})`
    );
    
    // 3. Update xlink:href="#id" (SVG 1.1)
    result = result.replace(
      new RegExp(`xlink:href=["']#${escaped}["']`, 'g'),
      `xlink:href="#${newId}"`
    );
    
    // 4. Update href="#id" (SVG 2.0)
    result = result.replace(
      new RegExp(`\\bhref=["']#${escaped}["']`, 'g'),
      `href="#${newId}"`
    );
  }
  
  return result;
}

// Read all SVG files from the icons directory
const icons = {};
const files = fs.readdirSync(iconsDir);
let skipped = 0;

for (const file of files) {
  if (!file.endsWith('.svg')) continue;
  
  const name = file.replace('.svg', '').toLowerCase();
  const raw = fs.readFileSync(path.join(iconsDir, file), 'utf8');
  
  const viewBox = extractViewBox(raw);
  let content = extractInner(raw);
  
  if (!content) {
    console.warn(`⚠️  Skipped "${file}": unable to parse SVG content.`);
    skipped++;
    continue;
  }
  
  // Namespace all IDs inside this icon to prevent collisions
  // when multiple icons are combined into a single SVG.
  const prefix = `i-${name}-`;
  content = namespaceIds(content, prefix);
  
  // Store only viewBox and inner content — not the full file
  icons[name] = { viewBox, content };
}

// Write the generated icon data to dist/icons.json
fs.writeFileSync(path.join(distDir, 'icons.json'), JSON.stringify(icons));

console.log(`✅ Generated ${Object.keys(icons).length} icons`);
if (skipped) {
  console.log(`   (Skipped ${skipped} file${skipped !== 1 ? 's' : ''} — check warnings above)`);}