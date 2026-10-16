# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-10-16

### Added
- **Icon library expanded to 1,028 icons** (up from 50)
- 50+ icon categories (Languages, Frontend, Backend, Databases, DevOps, AI/ML, Security, Blockchain, Mobile, Game Dev, CMS, OS, and more)
- Full icon catalog in `ICONS.md`
- New `size` parameter (16–128) for icon dimensions
- New `gap` parameter (0–32) for spacing between icons
- New `radius` parameter (0–24) for corner roundness
- New `bg` parameter (true/false) to toggle background boxes
- New `bgcolor` parameter (hex) to customize background color
- Rate limiting: 100 requests per minute per IP
- `MAX_ICONS` limit: 50 icons per request
- `X-Content-Type-Options: nosniff` header for security

### Changed
- Switched from string concatenation to `array.join()` for SVG generation

### Fixed
- SVG ID collisions when combining multiple icons (via ID namespacing)
- Missing `xmlns:xlink` namespace causing SVG rendering failures
- Icon lookup now uses `hasOwnProperty` to prevent prototype pollution (`constructor`, `__proto__`)

### Security
- Added basic per-IP rate limiting
- Added input validation for all query parameters

---

## [1.0.0] - 2026-09-08

### Added
- Initial public release
- `/icons` endpoint for generating SVG skill icons
- Support for 50+ popular icons
- `i` parameter (comma-separated icon names)
- `perline` parameter (icons per line)
- Rounded dark boxes with clipping
- CORS support
- `build-icons.js` script to convert SVG files to JSON
- Documentation in `README.md`
- MIT License

---

[1.1.0]: https://github.com/amrelmahdy001/Charmly/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/amrelmahdy001/Charmly/releases/tag/v1.0.0