# Charmly Icons

Add a row of tech icons to your README with one URL. No account, no API key, no install.

📋 [Full icon list](./ICONS-LIST.md)

---

## 🚀 Quick Start

**1.** Choose the icons you want, separated by commas:

```text
https://charmly.read-me.workers.dev/icons?i=javascript,react,docker
```

**2.** Paste it into your README:

```markdown
![Skills](https://charmly.read-me.workers.dev/icons?i=javascript,react,docker)
```

**3.** Done. The icons render as an image.

---

## 🎨 Customize

Add parameters to the URL with `&`.

| Parameter | What it does | Default | Allowed |
|-----------|--------------|---------|---------|
| `i` | Icons to show | required | Names from the [icon list](./ICONS-LIST.md), up to 50 |
| `perline` | Icons per row | all in one row | Any number |
| `size` | Icon size (px) | `48` | `16` – `128` |
| `gap` | Space between icons (px) | `8` | `0` – `32` |
| `radius` | Corner roundness (px) | `12` | `0` – `24` |
| `bg` | Show the background box | `true` | `true` / `false` |
| `bgcolor` | Background color (hex) | `#1a1b2e` | 3 or 6 hex digits, `#` optional |

### Examples

**Default**

```text
https://charmly.read-me.workers.dev/icons?i=html,css,csharp,cplusplus,c&perline=5
```

![Default](https://charmly.read-me.workers.dev/icons?i=html,css,csharp,cplusplus,c&perline=5)

**Soft corners and spacing**

```text
https://charmly.read-me.workers.dev/icons?i=javascript,typescript,kotlin,swift,webassembly,stimulus,keystone,appwrite&gap=12&radius=24&perline=5
```

![Soft](https://charmly.read-me.workers.dev/icons?i=javascript,typescript,kotlin,swift,webassembly,stimulus,keystone,appwrite&gap=12&radius=24&perline=5)

**Bold, dark background**

```text
https://charmly.read-me.workers.dev/icons?i=svelte,angular,react,nestjs,django&size=58&gap=0&radius=0&bgcolor=1c1c3c&perline=5
```

![Bold](https://charmly.read-me.workers.dev/icons?i=svelte,angular,react,nestjs,django&size=58&gap=0&radius=0&bgcolor=1c1c3c&perline=5)

**No background**

```text
https://charmly.read-me.workers.dev/icons?i=git,github,gitlab,vscode,vim&bg=false&size=48&gap=10
```

![No background](https://charmly.read-me.workers.dev/icons?i=git,github,gitlab,vscode,vim&bg=false&size=48&gap=10)

**Centered in HTML**

```html
<p align="center">
  <img src="https://charmly.read-me.workers.dev/icons?i=git,kubernetes,gitlab,c,github&size=52&radius=10" />
</p>
```

---

## ⚠️ Things to Know

- **Spelling matters.** Names are not case-sensitive, but they must match the [icon list](./ICONS-LIST.md). Unknown names are skipped without an error.
- **The limit is 50 names per request**, and it counts every name you type, including unknown ones.
- **`bgcolor` only applies when `bg=true`.**
- **Images refresh about every minute.** Changes you make to the URL can take up to a minute to appear.

### Errors

If a parameter is invalid, the image URL returns a plain-text message with status `400`. The message says which parameter is wrong and the allowed range, so check the table above.

If every icon name is unknown, you get an image that says `No valid icons found`.

---

## 🛠️ For Developers

Repository layout, request lifecycle, build pipeline, and how to add icons internally are documented in **[docs/DEVELOPMENT.md → Icons Architecture](./DEVELOPMENT.md#icons-architecture)**.

---

## ❓ Questions

For troubleshooting icons, see the [FAQ](./FAQ.md).