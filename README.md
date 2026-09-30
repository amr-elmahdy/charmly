![banner](./.github/imgs/banner.png)

<a name="readme-top"></a>
<div align="center">

# Charmly Icons

**Generate beautiful skill icons for your GitHub README using a simple URL.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-C071FF?style=for-the-badge&logo=googlechrome&logoColor=white)](https://charmly-dev.web.app/)
[![License](https://img.shields.io/badge/License-MIT-C071FF?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![Stars](https://img.shields.io/github/stars/amrelmahdy001/charmly?style=for-the-badge&color=C071FF&logo=github&logoColor=white)](https://github.com/amrelmahdy001/charmly/stargazers)

</div>

---

## What is Charmly?

Charmly is a lightweight API that generates a row of skill icons as an SVG image. Use it in your GitHub profile, project README, or resume — no configuration needed.

**Powered by Cloudflare Workers ⚡**

## Quick Example

```markdown
![My Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=swift,typescript,react,go,flask&perline=5)
```

![My Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=swift,typescript,react,go,flask&perline=5)

---

## Usage Guide

### Basic Usage
Simply replace `i=` with comma-separated icon names:
```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,typescript,html,css)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,typescript,html,css)

### Icons Per Line
```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws,figma,azure,cloudflare,angular,npm&perline=3)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws,figma,azure,cloudflare,angular,npm&perline=3)

### Custom Size
```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,python,java,go&size=64)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript,python,java,go&size=64)

### Custom Colors & Style
```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cloudflare,swift,supabase&bgcolor=212125&radius=24&gap=20)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cloudflare,swift,supabase&bgcolor=212125&radius=24&gap=20)

### Without Background
```markdown
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,firebase,gitlab&bg=false&size=48)
```
![Skills](https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,firebase,gitlab&bg=false&size=48)

### Centered Display
```html
<p align="center">
  <img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,kubernetes,gitlab,c,github&size=52&radius=10" />
</p>
```
<p align="center">
  <img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git,kubernetes,gitlab,c,github&size=52&radius=10" />
</p>

---

## Parameters

| Parameter | Description | Range | Default |
|-----------|-------------|-------|---------|
| `i` | Comma-separated icon names **(required)** | — | — |
| `perline` | Icons per line | 1–50 | All in one line |
| `size` | Icon size (pixels) | 16–128 | 48 |
| `gap` | Space between icons (pixels) | 0–32 | 8 |
| `radius` | Corner radius (pixels) | 0–24 | 12 |
| `bg` | Show background box | true/false | true |
| `bgcolor` | Background color (hex) | #RGB or #RRGGBB | #1a1b2e |

**Example combinations:**
```
?i=js,html,css&size=32&perline=3&gap=10
?i=python,java&bgcolor=ff6b6b&radius=20
?i=react,vue&size=56&bg=false
```

---

## Features

✅ **Dynamic SVG Generation** — Icons generated on-demand  
✅ **Highly Customizable** — Size, spacing, colors, and layout  
✅ **Rate Limited** — 100 requests per minute per IP  
✅ **Cached** — 60-second cache for performance  
✅ **CORS Enabled** — Works across domains  
✅ **No Background Option** — Display icons without boxes  

---

## Available Icons

1028+ icons across 50+ categories. Use the icon `id`: `?i=javascript,react,docker`

<table>
  <tbody>
    <tr>
      <td align="center"><code>javascript</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=javascript&perline=1" alt="javascript" width="48" height="48"></td>
      <td align="center"><code>typescript</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=typescript&perline=1" alt="typescript" width="48" height="48"></td>
      <td align="center"><code>python</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=python&perline=1" alt="python" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>java</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=java&perline=1" alt="java" width="48" height="48"></td>
      <td align="center"><code>csharp</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=csharp&perline=1" alt="csharp" width="48" height="48"></td>
      <td align="center"><code>go</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=go&perline=1" alt="go" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>rust</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=rust&perline=1" alt="rust" width="48" height="48"></td>
      <td align="center"><code>php</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=php&perline=1" alt="php" width="48" height="48"></td>
      <td align="center"><code>swift</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=swift&perline=1" alt="swift" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>kotlin</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=kotlin&perline=1" alt="kotlin" width="48" height="48"></td>
      <td align="center"><code>dart</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=dart&perline=1" alt="dart" width="48" height="48"></td>
      <td align="center"><code>cplusplus</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cplusplus&perline=1" alt="cplusplus" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>react</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=react&perline=1" alt="react" width="48" height="48"></td>
      <td align="center"><code>vue</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vue&perline=1" alt="vue" width="48" height="48"></td>
      <td align="center"><code>angular</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=angular&perline=1" alt="angular" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>svelte</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=svelte&perline=1" alt="svelte" width="48" height="48"></td>
      <td align="center"><code>nextjs</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nextjs&perline=1" alt="nextjs" width="48" height="48"></td>
      <td align="center"><code>nuxtjs</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nuxtjs&perline=1" alt="nuxtjs" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>tailwindcss</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=tailwindcss&perline=1" alt="tailwindcss" width="48" height="48"></td>
      <td align="center"><code>bootstrap</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=bootstrap&perline=1" alt="bootstrap" width="48" height="48"></td>
      <td align="center"><code>sass</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sass&perline=1" alt="sass" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>redux</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=redux&perline=1" alt="redux" width="48" height="48"></td>
      <td align="center"><code>materialui</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=materialui&perline=1" alt="materialui" width="48" height="48"></td>
      <td align="center"><code>storybook</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=storybook&perline=1" alt="storybook" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>nodejs</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nodejs&perline=1" alt="nodejs" width="48" height="48"></td>
      <td align="center"><code>express</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=express&perline=1" alt="express" width="48" height="48"></td>
      <td align="center"><code>nestjs</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nestjs&perline=1" alt="nestjs" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>django</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=django&perline=1" alt="django" width="48" height="48"></td>
      <td align="center"><code>flask</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=flask&perline=1" alt="flask" width="48" height="48"></td>
      <td align="center"><code>fastapi</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=fastapi&perline=1" alt="fastapi" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>spring</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=spring&perline=1" alt="spring" width="48" height="48"></td>
      <td align="center"><code>laravel</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=laravel&perline=1" alt="laravel" width="48" height="48"></td>
      <td align="center"><code>graphql</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=graphql&perline=1" alt="graphql" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>postgresql</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=postgresql&perline=1" alt="postgresql" width="48" height="48"></td>
      <td align="center"><code>mysql</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mysql&perline=1" alt="mysql" width="48" height="48"></td>
      <td align="center"><code>mongodb</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=mongodb&perline=1" alt="mongodb" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>redis</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=redis&perline=1" alt="redis" width="48" height="48"></td>
      <td align="center"><code>sqlite</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=sqlite&perline=1" alt="sqlite" width="48" height="48"></td>
      <td align="center"><code>supabase</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=supabase&perline=1" alt="supabase" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>docker</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=docker&perline=1" alt="docker" width="48" height="48"></td>
      <td align="center"><code>kubernetes</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=kubernetes&perline=1" alt="kubernetes" width="48" height="48"></td>
      <td align="center"><code>terraform</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=terraform&perline=1" alt="terraform" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>aws</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=aws&perline=1" alt="aws" width="48" height="48"></td>
      <td align="center"><code>azure</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=azure&perline=1" alt="azure" width="48" height="48"></td>
      <td align="center"><code>googlecloud</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=googlecloud&perline=1" alt="googlecloud" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>firebase</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=firebase&perline=1" alt="firebase" width="48" height="48"></td>
      <td align="center"><code>vercel</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vercel&perline=1" alt="vercel" width="48" height="48"></td>
      <td align="center"><code>cloudflare</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cloudflare&perline=1" alt="cloudflare" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>nginx</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=nginx&perline=1" alt="nginx" width="48" height="48"></td>
      <td align="center"><code>githubactions</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=githubactions&perline=1" alt="githubactions" width="48" height="48"></td>
      <td align="center"><code>grafana</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=grafana&perline=1" alt="grafana" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>tensorflow</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=tensorflow&perline=1" alt="tensorflow" width="48" height="48"></td>
      <td align="center"><code>pytorch</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=pytorch&perline=1" alt="pytorch" width="48" height="48"></td>
      <td align="center"><code>huggingface</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=huggingface&perline=1" alt="huggingface" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>openai</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=openai&perline=1" alt="openai" width="48" height="48"></td>
      <td align="center"><code>langchain</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=langchain&perline=1" alt="langchain" width="48" height="48"></td>
      <td align="center"><code>pandas</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=pandas&perline=1" alt="pandas" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>flutter</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=flutter&perline=1" alt="flutter" width="48" height="48"></td>
      <td align="center"><code>reactnative</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=reactnative&perline=1" alt="reactnative" width="48" height="48"></td>
      <td align="center"><code>android</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=android&perline=1" alt="android" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>git</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=git&perline=1" alt="git" width="48" height="48"></td>
      <td align="center"><code>github</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=github&perline=1" alt="github" width="48" height="48"></td>
      <td align="center"><code>gitlab</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=gitlab&perline=1" alt="gitlab" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>vscode</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vscode&perline=1" alt="vscode" width="48" height="48"></td>
      <td align="center"><code>vim</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vim&perline=1" alt="vim" width="48" height="48"></td>
      <td align="center"><code>intellij</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=intellij&perline=1" alt="intellij" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>npm</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=npm&perline=1" alt="npm" width="48" height="48"></td>
      <td align="center"><code>vite</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vite&perline=1" alt="vite" width="48" height="48"></td>
      <td align="center"><code>webpack</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=webpack&perline=1" alt="webpack" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>figma</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=figma&perline=1" alt="figma" width="48" height="48"></td>
      <td align="center"><code>postman</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=postman&perline=1" alt="postman" width="48" height="48"></td>
      <td align="center"><code>jest</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=jest&perline=1" alt="jest" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>cypress</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=cypress&perline=1" alt="cypress" width="48" height="48"></td>
      <td align="center"><code>playwright</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=playwright&perline=1" alt="playwright" width="48" height="48"></td>
      <td align="center"><code>vitest</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=vitest&perline=1" alt="vitest" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>eslint</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=eslint&perline=1" alt="eslint" width="48" height="48"></td>
      <td align="center"><code>prettier</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=prettier&perline=1" alt="prettier" width="48" height="48"></td>
      <td align="center"><code>linux</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=linux&perline=1" alt="linux" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>ubuntu</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=ubuntu&perline=1" alt="ubuntu" width="48" height="48"></td>
      <td align="center"><code>windows</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=windows&perline=1" alt="windows" width="48" height="48"></td>
      <td align="center"><code>macos</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=macos&perline=1" alt="macos" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>apple</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=apple&perline=1" alt="apple" width="48" height="48"></td>
      <td align="center"><code>google</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=google&perline=1" alt="google" width="48" height="48"></td>
      <td align="center"><code>html</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=html&perline=1" alt="html" width="48" height="48"></td>
    </tr>
    <tr>
      <td align="center"><code>css</code></td>
      <td align="center"><img src="https://charmly.amrelmahdy001-b28.workers.dev/icons?i=css&perline=1" alt="css" width="48" height="48"></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

✨ **See the full list of 1028+ icons in [ICONS.md](ICONS.md)**

---

## How It Works

1. Icon SVGs stored in `icons/` folder
2. `build-icons.js` extracts SVG data to `dist/icons.json`
3. Cloudflare Worker generates customized SVG on-demand
4. Parameters control size, spacing, colors, and layout
5. Response cached for 60 seconds

---

## Contributing

Contributions welcome! To suggest an icon:
- Open an issue, or
- Add the SVG to `icons/` folder and submit a PR

---

## License

MIT License — See [LICENSE](LICENSE) for details.

Icons are trademarks of their respective owners — See [NOTICE.md](NOTICE.md).

---

<p align="center">Made by <a href="https://github.com/amrelmahdy001">amrelmahdy001</a></p>
