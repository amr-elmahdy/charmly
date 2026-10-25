<!--
PR title format:
  <type>: <short description>

Types: feat, fix, docs, refactor, perf, chore, security

Examples:
  feat: add size parameter to /icons
  fix: prevent SVG ID collision when combining icons
  docs: update ICONS.md examples
-->

## What does this PR do?

<!--
One or two sentences. Link the issue this closes if relevant.
Write "Closes #123" to auto-close it on merge.
-->

Closes #

## Type of change

- [ ] New icon(s)
- [ ] Icon fix (viewBox, colors, broken SVG)
- [ ] Bug fix in code (`src/worker.js`, `src/icons.js`, `src/utils.js`, `src/card/`)
- [ ] New feature (parameter, widget, endpoint)
- [ ] Refactor (no behavior change)
- [ ] Performance improvement
- [ ] Documentation
- [ ] CI/CD or build
- [ ] Security fix
- [ ] Other

## Changes

<!--
One bullet per item. If you changed rendering, describe the visual effect.
-->

-
-
-

---

## For icon contributions

<!--
Skip this section if your PR does not add or change icons.
-->

### Icons added or changed

<!-- List the icon slugs. Example: `svelte`, `bun`, `astro` -->

-

### Source and license

- Source: <!-- where the SVG came from: theSVG / Devicon / Simple Icons /
  official brand assets / custom / other -->
- License: <!-- CC0 / MIT / Apache-2.0 / other -->

### Icon checklist

- [ ] SVG has a valid `viewBox`
- [ ] No external references (`<image>`, remote CSS, web fonts)
- [ ] No `<script>` tags, event handlers, or `<foreignObject>`
- [ ] Icon renders correctly in a browser
- [ ] Icon renders correctly in a combined request, e.g. `?i=<new-icon>,react`
- [ ] Icon renders correctly on the default dark background
- [ ] Icon renders correctly with `bg=false`
- [ ] License allows redistribution
- [ ] Icon represents a real tool, language, or platform

### Preview

<!--
Paste a URL that previews the icon through the deployed worker,
or a screenshot if the icon is not yet deployed.
-->

```

https://charmly.read-me.workers.dev/icons?i=<your-icon>&perline=1

```

---

## For code changes

<!--
Skip this section if your PR does not touch code.
-->

### What was tested?

- [ ] Tested locally with `wrangler dev`
- [ ] Tested against the deployed worker
- [ ] Added or updated tests (if applicable)

### Affected endpoints

- [ ] `/icons`
- [ ] `/card`

### Backward compatibility

- [ ] No breaking changes
- [ ] Breaking change (explain below)

<!-- If breaking, describe what changes for existing users. -->

### Response or screenshots

<!-- Before / after, or the raw response body. -->

---

## General checklist

- [ ] PR title follows the format at the top of this file
- [ ] Documentation updated if needed (`README.md`, `ICONS.md`, `CARDS.md`, `ICONS-LIST.md`)
- [ ] No secrets, tokens, or credentials in the diff
- [ ] Changes are scoped to a single concern
- [ ] I have read `CONTRIBUTING.md`

## Additional notes

<!--
Anything reviewers should know: edge cases, known limitations,
follow-up work, or questions.
-->