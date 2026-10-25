# Charmly Cards

Turn any project, game, or wiki into a card for your README: a cover image, a title, a description, and live GitHub info. One URL, no account, no API key.

📋 [Icons guide](./ICONS.md)

---

## 🚀 Quick Start

**1.** Build a URL. `title` and `img` are required:

```text
https://charmly.read-me.workers.dev/card?title=My+Project&img=https://example.com/cover.jpg
```

**2.** Wrap it in a link so the card points to your project:

```markdown
[![My Project](https://charmly.read-me.workers.dev/card?title=My+Project&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/main/assets/charmly-500.jpg)](https://github.com/amr-elmahdy/charmly)
```

**3.** Done. The card renders as an image.

> Spaces in `title` and `desc` can be written as `+`. Encode special characters in the `img` URL, for example `%20` for spaces.

---

## 🎨 Customize

Add parameters with `&`. Most parameters have a short alias in brackets.

### Required

| Parameter | Alias | What it does |
|-----------|:-----:|--------------|
| `title` | `t` | Card title. Truncated with `...` if it does not fit. |
| `img` | — | Cover image URL. Must be `http(s)`. |

### Layout

| Parameter | Alias | Values | Default | Effect |
|-----------|:-----:|--------|---------|--------|
| `size` | `s` | `s`, `m`, `l` | `m` | Width of the text panel: 250, 500, or 750 px |
| `imagewidth` | `iw` | `s`, `m`, `l`, `xl` | `m` | Width of the image: 150, 250, 350, or 500 px |
| `corner` | `co` | `sharp`, `smooth` | `smooth` | Corner style |

The card is always **250 px tall**. Total width is the image width plus the panel width.

### Image

| Parameter | Alias | Values | Default | Effect |
|-----------|:-----:|--------|---------|--------|
| `imagermerge` | `im` | `cut`, `line`, `smooth` | `cut` | How the image meets the panel. `cut` is a hard edge, `line` adds a thin white divider, `smooth` fades into the panel color. |

### Colors and Text

| Parameter | Alias | Values | Default | Effect |
|-----------|:-----:|--------|---------|--------|
| `colour` | `c` | One or two hex colors, comma-separated | `#5865F2,#1a1d2e` | Panel background. Two colors make a left-to-right gradient. |
| `titlecolor` | `tc` | 3 or 6 hex digits | `#ffffff` | Title color |
| `desc` | `d` | Text | none | Description. Up to 3 lines. |
| `descsize` | `ds` | `s`, `m`, `l` | `m` | Description size: 12, 14, or 16 px |
| `desccolor` | `dc` | 3 or 6 hex digits | `#a8b0c0` | Description color |
| `titleline` | `tl` | `true` | off | Draws a thin separator under the title. Only the exact value `true` works. |

### Widgets

Widgets go in three corners of the card.

| Parameter | Alias | Position |
|-----------|:-----:|----------|
| `topright` | `tr` | Right side, on the title line |
| `bottomright` | `br` | Bottom right |
| `bottomleft` | `bl` | Bottom left |

Each widget is written as `type:value`:

| Widget | Value | Shows |
|--------|-------|-------|
| `state` | `release`, `prototype`, `archive`, `in-development` | A colored dot and status label |
| `badges` | Up to 5 comma-separated labels, 20 characters each | Pill-shaped tags |
| `stars` | `owner/repo` | ★ and the repo's star count (live) |
| `version` | `owner/repo` | Latest release tag, such as `v1.2.0` (live) |
| `lan` | `owner/repo` | Primary language, with its icon when one exists (live) |

Example: `tr=stars:amr-elmahdy/charmly&bl=lan:amr-elmahdy/charmly`



---

## 🖼️ Live Showcase

Each image below is a live card. Copy any URL into a README to use it.

### Real Projects

[![Charmly](https://charmly.read-me.workers.dev/card?title=Charmly&desc=An+icon+API+for+READMEs+-+drop+a+URL%2C+get+an+icon.&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/refs/heads/main/assets/charmly-500.jpg&c=140035,100030&tc=B048D0&dc=D0C0D0&tl=true&im=smooth&tr=stars:amr-elmahdy/charmly&br=version:amr-elmahdy/charmly&bl=lan:amr-elmahdy/charmly)](https://github.com/amr-elmahdy/charmly)

[![The Last Lantern](https://charmly.read-me.workers.dev/card?title=The+Last+Lantern&desc=You+have+20+seconds+of+light.+Make+them+count.&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/refs/heads/main/assets/the-last-lantern-500.jpg&c=0a0a0f,2a1a0a&tc=fef3c7&dc=a1a1aa&tl=true&tr=state:release&bl=badges:Horror,Exploration,GMTK+2026)](https://github.com/Orpita-Community/the-last-lantern)

[![Jurdian Cipher Wiki](https://charmly.read-me.workers.dev/card?title=Jurdian+Cipher+Wiki&desc=A+large+encyclopedia+of+ciphers.&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/refs/heads/main/assets/jurdian-500.jpg&c=303030,000000&tc=C0A038&dc=786848&tl=true&tr=state:in-development&bl=badges:Ciphers,Cryptography,Wiki)](https://github.com/Jurdian-Project/jurdian-cipher-wiki)

> These images load from the live endpoint. If one shows a broken image, open its URL in a browser to see the error message.

---

## ⚠️ Things to Know

- **`tl=true` is the only valid value** for the title line. `tl=1` or `tl=yes` is ignored.
- **Invalid parameters return an error**, not a fallback. The error names the parameter, for example `Invalid "size" parameter. Must be one of: s, m, l`. Widget errors start with the widget name, for example `"topright": unknown widget type "star"`.
- **A bad `img` URL does not return an error.** The image is just missing. Make sure the link opens in a browser and points to a PNG, JPEG, WebP, or GIF.
- **Live widgets come from GitHub.** Private repos and repos that do not exist show `★ ?` or `v?`, and the language widget shows nothing.
- **Badges are dropped when space runs out.** If a badge row is too wide, the extra badges are hidden.

### Errors

| Problem | Message |
|---------|---------|
| No title | `Missing required parameter: title` |
| No image | `Missing required parameter: img` |
| Bad `size` | `Invalid "size" parameter. Must be one of: s, m, l` |
| Bad `imagewidth` | `Invalid "imagewidth" parameter. Must be one of: s, m, l, xl` |
| Bad `corner` | `Invalid "corner" parameter. Must be one of: sharp, smooth` |
| Bad `imagermerge` | `Invalid "imagermerge" parameter. Must be one of: cut, line, smooth` |
| Bad `descsize` | `Invalid "descsize" parameter. Must be one of: s, m, l` |
| Bad `titlecolor` or `desccolor` | `Invalid "titlecolor" parameter. Must be a 3 or 6 digit hex color` |
| Bad `colour` | `Invalid "colour" parameter. Must be hex or hex,hex` |
| Bad widget | `"topright": …`, `"bottomright": …`, or `"bottomleft": …` followed by the reason |

All errors return status `400` with a plain-text body. Rate-limited requests return `429`, shared with the icons endpoint (100 per minute per IP).

---

## 🛠️ For Developers

Architecture, request lifecycle, caching, and how to add a widget type are documented in **[docs/DEVELOPMENT.md → Card Architecture](./DEVELOPMENT.md#card-architecture)**.

---

## ❓ Questions

For troubleshooting icons and cards, see the [FAQ](./FAQ.md).