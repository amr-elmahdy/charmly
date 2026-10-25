# Security Policy

Charmly is a public API that returns SVG images. There is no authentication, no user data, and no database. The attack surface is small but not empty: the service parses query parameters, fetches external images for cards, and returns SVG that is rendered in browsers and on GitHub.

This document explains how to report a vulnerability, what counts as one, and what is already in place.

---

## Reporting a vulnerability

Open a private security advisory:

https://github.com/amr-elmahdy/charmly/security/advisories/new

Do not open a public issue for security problems.

Include in the report:

- The endpoint (`/icons` or `/card`) and the full URL
- What you expected to happen, and what actually happened
- Steps to reproduce
- Browser, client, or tool used
- Whether the issue is already visible to others
- Any proof-of-concept payload or screenshot

If the vulnerability involves an image or card parameter, include the exact query string you used. Redact anything private before posting.

---

## Response timeline

This is a small project maintained in spare time. Timelines are best-effort:

- Acknowledgment: within 48 hours
- Initial assessment: within 5 days
- Fix or mitigation for confirmed issues: within 30 days

If the issue is critical and actively exploitable, mention that in the report so it is prioritized.

---

## In scope

The following classes of issues are considered security vulnerabilities for this project:

- **SVG injection** — a crafted icon or card that executes script when rendered in a browser. This includes `<script>` tags, event handlers (`onload`, `onerror`), `<foreignObject>` with HTML, and external references through `<image>` or CSS `url()`.
- **SSRF via card images** — a card `img` parameter that reaches internal services, bypasses a host or content-type check, or uses DNS rebinding to fetch private addresses.
- **Prototype pollution** — query parameters or icon names that modify `Object.prototype` or bypass the `hasIcon` own-property check.
- **Cache poisoning** — a crafted request that stores a malicious response in the 60-second cache, affecting other users.
- **Rate limit bypass** — exceeding 100 requests per minute per IP without receiving a `429`.
- **Resource exhaustion** — inputs that cause a single request to consume excessive CPU, memory, or bandwidth. Examples: oversized SVG content, deeply nested markup, or a very large icon list within the `MAX_ICONS` limit.
- **Information disclosure** — leaking source IP addresses, Worker internals, environment variables, or tokens in the response body or headers.
- **Reflected content** — untrusted input (icon name, card title, description, image URL) returned in the response without escaping.

---

## Out of scope

The following are not security vulnerabilities, even if they feel like one:

- The API being usable by anyone. It is public by design and requires no authentication.
- Rate limiting triggering on legitimate traffic. Report it as a bug, not a security issue.
- Icons or cards not rendering. Report it as a bug.
- Brand icons whose presence you disagree with. Open a content request instead.
- Third-party service downtime (GitHub API, external image hosts).
- Requests you made that are now cached for 60 seconds.
- Sending 50 icons in one request and getting a large image. That is the intended behavior within the limit.
- Icon IDs being prefixed with `i-<name>-` in `dist/icons.json`. This is namespacing, not obfuscation.

---

## Already in place

The following protections are deployed. Reports that duplicate these will be closed without a fix.

- All query parameters are validated before rendering.
- `hasIcon` uses `hasOwnProperty`, so names like `constructor` and `__proto__` are treated as unknown icons and skipped.
- SVG IDs are namespaced per icon (`i-<name>-<id>`), which prevents one icon from referencing another icon's gradients or clip paths.
- Card image fetching applies validation before making requests and enforces a content-type and size cap.
- Rate limiting: 100 requests per minute per IP.
- `MAX_ICONS`: 50 icons per request.
- `X-Content-Type-Options: nosniff` is set on all responses.
- Icons are stored as static SVG files in the repository. User input is not written to disk.

---

## Supported versions

Only the latest release receives security updates.

| Version | Supported |
|---------|-----------|
| Latest  | Yes       |
| Older   | No        |

If you are running an older fork, apply the latest fixes from `main` before reporting.

---

## After a fix

When a confirmed vulnerability is fixed:

1. A patch is released as soon as practical.
2. A note is added to `CHANGELOG.md` under a `Security` heading.
3. Credit is given in the release notes, unless you prefer to stay anonymous.

Thank you for taking the time to report.