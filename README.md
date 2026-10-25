<div align="center">

![Charmly banner](./.github/imgs/banner.png)

# Charmly

**Customizable icon rows and project cards for your README — from a single URL.**

[![Version](https://img.shields.io/github/package-json/v/amr-elmahdy/charmly?style=for-the-badge&color=C071FF&logo=semanticrelease&logoColor=white)](https://github.com/amr-elmahdy/charmly/releases)
[![Stars](https://img.shields.io/github/stars/amr-elmahdy/charmly?style=for-the-badge&color=C071FF&logo=github&logoColor=white)](https://github.com/amr-elmahdy/charmly/stargazers)

</div>

---

## What is Charmly?

Charmly generates SVG images for your README — a row of skill icons, a project card, or both. Pass a URL with what you want, and it returns an image that renders in most markdown environments that allow external images (GitHub, GitLab, Obsidian, etc.).

- 🎨 **Icons** — arrange your tech stack in a clean, customizable row
- 🎴 **Cards** — turn a project, game, or wiki into a card with a cover image, title, description, and live GitHub stats

No setup, no API keys, no build steps.

> ⚡ **Actively in development** — new features ship regularly. See [releases](https://github.com/amr-elmahdy/charmly/releases) for what's new.

---

## Quick Start

**Icons:**

```
![Tech stack](https://charmly.read-me.workers.dev/icons?i=javascript,react,docker)
```

**Cards:**

```
![My Project](https://charmly.read-me.workers.dev/card?title=My+Project&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/main/assets/charmly-500.jpg)
```

Drop either into a README and it renders. For customization, see the [Icons](./docs/ICONS.md) and [Cards](./docs/CARDS.md) docs.

---

## 🎨 Icons

1,028 icons across 50+ categories. Every icon renders on-demand from a URL — no setup, no API key.

### Default

![Skills](https://charmly.read-me.workers.dev/icons?i=html,css,csharp,cplusplus,c&perline=5)

### Soft — rounded corners, airy spacing

![Skills](https://charmly.read-me.workers.dev/icons?i=javascript,typescript,kotlin,swift,webassembly,stimulus,keystone,appwrite&gap=12&radius=24&perline=5)

### Bold — flat edges, tight grid, custom dark background

![Skills](https://charmly.read-me.workers.dev/icons?i=svelte,angular,react,nestjs,django&size=58&gap=0&radius=0&bgcolor=1c1c3c&perline=5)

### Highlights

- 🎯 **1,028 icons** across 50+ categories
- 🎨 **Full visual control** — size, spacing, radius, and background color
- 🚫 **Transparent or solid** — hide the background, or set any hex color
- 📐 **Flexible layouts** — control icons per line, up to 50 icons per URL

[📖 Icons guide](./docs/ICONS.md) · [🎨 Full icons list](./docs/ICONS-LIST.md)

---

## 🎴 Cards

Cover image, title, description, and live GitHub widgets — all in one SVG card. Works for projects, games, and wikis.

### For Developer Repos

Live GitHub stats — stars, version, and primary language.

[![Charmly](https://charmly.read-me.workers.dev/card?title=Charmly&desc=An+icon+API+for+READMEs+%E2%80%94+drop+a+URL%2C+get+an+icon.+Now+growing+with+widgets+and+more+display+tools.+Built+on+Cloudflare+Workers.&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/refs/heads/main/assets/charmly-500.jpg&c=140035,100030&tc=B048D0&dc=D0C0D0&tl=true&im=smooth&co=smooth&tr=stars:amr-elmahdy/charmly&br=version:amr-elmahdy/charmly&bl=lan:amr-elmahdy/charmly)](https://github.com/amr-elmahdy/charmly)

### For Game Development

Release state and genre tags.

[![The Last Lantern](https://charmly.read-me.workers.dev/card?title=The+Last+Lantern&desc=You+have+20+seconds+of+light.+Make+them+count.+A+2D+horror+exploration+game+set+in+your+late+grandmother%27s+abandoned+mansion.+Made+for+GMTK+2026.&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/refs/heads/main/assets/the-last-lantern-500.jpg&c=0a0a0f,2a1a0a&tc=fef3c7&dc=a1a1aa&tl=true&im=smooth&co=smooth&tr=state:release&bl=badges:Horror,Exploration,GMTK+2026)](https://github.com/Orpita-Community/the-last-lantern)

### For Encyclopedias & Knowledge Bases

Version, status, and topic badges.

[![Jurdian Cipher Wiki](https://charmly.read-me.workers.dev/card?title=Jurdian+Cipher+Wiki&desc=A+large+encyclopedia+of+ciphers+%E2%80%94+classical%2C+modern%2C+and+experimental+%E2%80%94+with+study%2C+analysis%2C+and+usage+for+each+entry.+Written+in+Markdown+for+Obsidian.+Currently+in+active+development.&img=https://raw.githubusercontent.com/amr-elmahdy/amr-elmahdy/refs/heads/main/assets/jurdian-500.jpg&c=303030,000000&tc=C0A038&dc=786848&tl=true&im=smooth&co=smooth&tr=state:in-development&bl=badges:Ciphers,Cryptography,Wiki,Jurdian)](https://github.com/Jurdian-Project/jurdian-cipher-wiki)

### Highlights

- 🖼️ **Cover image** with 3 merge styles — cut, line, and smooth
- 🎨 **Background gradients** — solid color or two-color blend
- ✍️ **Independent text colors** — title and description styled separately
- 🏷️ **Static Widgets** — release status and category badges
- 🔢 **Live GitHub data** — stars, version, and language update automatically
- 📐 **Flexible card layout** — 3 panel widths and 4 cover‑image widths


[📖 Cards guide](./docs/CARDS.md) · [🖼️ Live showcase](./docs/CARDS.md#-Live-Showcase)

---

## Support

Charmly is **free and open source**. The best ways to support it:

- ⭐ **Star the repo** — helps others discover it
- 🐛 **Report bugs** — makes the project better
- 💡 **Suggest features** — shapes the roadmap
- 🔗 **Share it** — tell a friend who writes READMEs

Every star and share makes a real difference.

---

## 🙏 Acknowledgments

Charmly wouldn't exist without these incredible projects and platforms:

- **☁️ [Cloudflare Workers](https://workers.cloudflare.com/)** — the edge runtime that powers Charmly
- **🎨 [theSVG](https://thesvg.org/)** — a primary source for many of the icons in this library
- **💡 [skill-icons](https://github.com/tandpfun/skill-icons)** — the original inspiration
- **🌐 [GitHub](https://github.com/)** — for hosting the code and providing free CI/CD

---

## Documentation

| | |
|---|---|
| 🎨 **Icons** | [Guide & Parameters](./docs/ICONS.md) |
| 📋 **Icons List** | [All 1,028 Icons](./docs/ICONS-LIST.md) |
| 🎴 **Cards** | [Guide & Examples](./docs/CARDS.md) |
| 📝 **Changelog** | [Version History](./CHANGELOG.md) |
| ❓ **FAQ** | [Common Questions](./docs/FAQ.md) |
| ⚖️ **Legal** | [License](./LICENSE) · [Notices](./NOTICE.md) |
| 🛠️ **Contributing** | [How to contribute](./CHANGELOG.md) |
| 🔒 **Security** | [Report a vulnerability](./SECURITY.md) |

---

## Contributing

Contributions are welcome — new icons, bug fixes, or documentation improvements.

- 💡 **Suggest an icon:** [open an issue](https://github.com/amr-elmahdy/charmly/issues/new?template=icon_request.md)
- 🐛 **Report a bug:** [open an issue](https://github.com/amr-elmahdy/charmly/issues/new?template=bug_report.md)
- 🚀 **Submit a PR:** see [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## License

MIT — see [LICENSE](./LICENSE) for details.

Icons are trademarks of their respective owners — see [NOTICE.md](./NOTICE.md).

---

<div align="center">

**Built with ☁️ Cloudflare Workers**

Made by [@amr-elmahdy](https://github.com/amr-elmahdy)

[Report an issue](https://github.com/amr-elmahdy/charmly/issues) · [Star on GitHub](https://github.com/amr-elmahdy/charmly)

</div>