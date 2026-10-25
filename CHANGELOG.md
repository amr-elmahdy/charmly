# Changelog

![Version](https://img.shields.io/badge/version-1.2.0-C071FF?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-C071FF?style=for-the-badge)

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## Release History

| Version | Date | Type | Focus |
|---------|------|------|-------|
| [1.2.0](#120--2026-10-24) | 2026-10-24 | Minor | Cards endpoint, domain move |
| [1.1.0](#110--2026-10-16) | 2026-10-16 | Minor | Icon library expansion, customization params |
| [1.0.0](#100--2026-09-08) | 2026-09-08 | Initial | First public release |

---

## [1.2.0] — 2026-10-24

![Minor Release](https://img.shields.io/badge/MINOR-C071FF?style=for-the-badge)
![Focus: Cards](https://img.shields.io/badge/FOCUS-Cards-C071FF?style=for-the-badge)
![Domain Moved](https://img.shields.io/badge/DOMAIN-Moved-E53935?style=for-the-badge)

Adds a second endpoint. The Worker now serves both `/icons` and `/card` from one entry point. Icon rendering and the icon set are unchanged in this release.

### Added
![Added](https://img.shields.io/badge/ADDED-4CAF50?style=flat-square)

- `/card` endpoint that returns a single SVG card
- Three card sizes: `s`, `m`, `l`
- Three cover image merge modes: `cut`, `line`, `smooth`
- Two-color background gradients
- Independent title and description text colors
- Widgets: release status, category badges, GitHub stars, version, and primary language
- Live GitHub metadata fetched at render time
- Card modules under `src/card/` for layout, colors, content, image fetching, and GitHub data

### Changed
![Changed](https://img.shields.io/badge/CHANGED-2196F3?style=flat-square)

- Worker entry point now routes both `/icons` and `/card`
- Shared helpers moved to `src/utils.js` (validation, escaping, color utilities)
- Documentation restructured into `ICONS.md`, `CARDS.md`, `ICONS-LIST.md`, and `FAQ.md`
- README updated with card examples and a dedicated cards section

### Security
![Security](https://img.shields.io/badge/SECURITY-9C27B0?style=flat-square)

- Rate limiting now covers `/card` in addition to `/icons`
- Card input validation runs before any external fetch or rendering

### Breaking Changes
![Breaking](https://img.shields.io/badge/BREAKING-E53935?style=flat-square)

- API domain moved from `charmly.amrelmahdy001-b28.workers.dev` to `charmly.read-me.workers.dev`. Existing URLs pointing to the old domain no longer resolve.

---

## [1.1.0] — 2026-10-16

![Minor Release](https://img.shields.io/badge/MINOR-C071FF?style=for-the-badge)
![Focus: Icon API](https://img.shields.io/badge/FOCUS-Icon%20API-C071FF?style=for-the-badge)

The icon library grew from 50 to 1,028, and the API gained per-parameter control over layout and appearance.

### Added
![Added](https://img.shields.io/badge/ADDED-4CAF50?style=flat-square)

- Icon library expanded to 1,028 icons across 50+ categories
- `size` parameter (16–128) for icon dimensions
- `gap` parameter (0–32) for spacing between icons
- `radius` parameter (0–24) for corner roundness
- `bg` parameter (`true` or `false`) to toggle background boxes
- `bgcolor` parameter (hex) to customize background color
- `X-Content-Type-Options: nosniff` response header
- Full icon catalog in `ICONS.md`

### Changed
![Changed](https://img.shields.io/badge/CHANGED-2196F3?style=flat-square)

- SVG generation now uses `array.join()` instead of string concatenation
- `Cache-Control` max-age reduced to 60 seconds during active development

### Fixed
![Fixed](https://img.shields.io/badge/FIXED-F44336?style=flat-square)

- SVG ID collisions when combining multiple icons, fixed via ID namespacing
- Icon lookup now uses `hasOwnProperty`, preventing prototype pollution through names like `constructor` and `__proto__`
- Missing `xmlns:xlink` namespace that caused some icons to fail rendering

### Security
![Security](https://img.shields.io/badge/SECURITY-9C27B0?style=flat-square)

- Per-IP rate limiting: 100 requests per minute
- `MAX_ICONS` limit: 50 icons per request
- Input validation for all query parameters

---

## [1.0.0] — 2026-09-08

![Initial Release](https://img.shields.io/badge/INITIAL-C071FF?style=for-the-badge)

First public release. One endpoint for generating icon rows.

### Added
![Added](https://img.shields.io/badge/ADDED-4CAF50?style=flat-square)

- `/icons` endpoint for generating SVG skill icons
- 50+ icons
- `i` parameter (comma-separated icon names)
- `perline` parameter (icons per line)
- Rounded dark boxes with clipping
- CORS support
- `build-icons.js` script to convert SVG files to JSON
- MIT License

---

[1.2.0]: https://github.com/amr-elmahdy/charmly/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/amr-elmahdy/charmly/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/amr-elmahdy/charmly/releases/tag/v1.0.0