---
name: Bug report
about: Something on Charmly isn't working as expected
title: '[Bug] '
labels: bug
assignees: ''
---

<!--
Before submitting, please check:

1. Hard-refresh the page (the response is cached for 60 seconds).
2. Confirm the icon IDs are correct. See ICONS-LIST.md.
3. Search existing issues to avoid duplicates.
-->

## What's wrong?

<!-- One or two sentences. What did you expect, and what did you get? -->

## Endpoint

- [ ] `/icons`
- [ ] `/card`
- [ ] Both
- [ ] Other (build, deployment, documentation)

## Reproducing URL

<!--
Paste the exact URL that triggers the issue.
This is the most important part of the report.
If the URL contains a private image, replace it with a public
placeholder that reproduces the same problem.
-->

```

https://charmly.read-me.workers.dev/...

```

## Expected behavior

<!-- What should the image look like, or what response should you get? -->

## Actual behavior

<!--
What do you see instead? Be specific:
- Empty box
- Wrong color
- Cut text
- Missing widget
- 400/404/429/500 response
- Broken layout
-->

## Screenshot or response body

<!--
A screenshot of the rendered output helps a lot.
If the response is an error, paste the text.
-->

## Where are you seeing this?

- [ ] GitHub README (rendered by GitHub)
- [ ] Directly in a browser
- [ ] Another markdown renderer (Slack, Discord, Notion, etc.)
- [ ] API client (curl, Postman, etc.)

**Browser and OS:**
<!-- e.g. Chrome 120 on Android 14 -->

## Parameters used

<!--
Only the parameters you actually passed.
Icons: i, perline, size, gap, radius, bg, bgcolor
Cards: title, desc, img, c, tc, dc, im, co, tr, br, bl
-->

## Additional context

<!--
Anything else: recent changes on your side, frequency, related issues.
-->