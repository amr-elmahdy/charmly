# Charmly FAQ

Answers to the questions people ask most when using icons and cards in a README.

📋 Guides: [Icons](./ICONS.md) · [Cards](./CARDS.md) · [Full icon list](./ICONS-LIST.md)

---

## Icons

### My icon is not showing. What should I check?

Check the name against the [icon list](./ICONS-LIST.md). Names must match exactly, with no spaces. For example, use `nodejs`, not `node js`. Unknown names are skipped without an error, and if every name is unknown you get an image that says `No valid icons found`.

### Can I use the names in any letter case?

Yes. `React`, `REACT`, and `react` all work.

### Why did my request fail with "Too many icons requested"?

One request can include at most 50 names. The limit counts every name you typed, including unknown ones and repeats. Split the list into two images if you need more.

### Can I show the same icon twice?

Yes, but each copy is drawn separately, so repeats take up space in the row.

### How do I put icons on one line?

Leave out `perline`. All icons go in one row. To wrap after a set number, use `perline=6` for six per row.

### Why is `bgcolor` being ignored?

It only applies when the background is visible. Use `bg=true` (the default) for `bgcolor` to take effect. With `bg=false` the value is not checked at all.

### What colour format does `bgcolor` take?

Three or six hex digits, with or without `#`. Both `f00` and `#ff0000` work.

### What are the allowed sizes, gaps, and corner radii?

Size is 16 to 128 px, gap is 0 to 32 px, and radius is 0 to 24 px. Values outside these ranges return `400`.

### Why does the image look different after I changed the URL?

Charmly caches each response for 60 seconds, so changes can take up to a minute to appear.

### My change still does not show up on GitHub. Why?

GitHub keeps its own copy of images for longer than 60 seconds. Add a dummy parameter to force a fresh copy, for example `&v=2`. Change the number each time you update.

### Can I use icons outside a README?

Yes. The response is a standard SVG with cross-origin access enabled, so it works in websites, documentation sites, and HTML pages.

### How do I add a new icon?

Add an SVG file to the `icons/` folder and run `npm run build` to check it. The guide has the full steps.

---

## Cards

### My cover image is not showing. Why?

Check these in order:

1. The `img` URL opens in a browser.
2. The file is a PNG, JPEG, WebP, or GIF.
3. The file is under 200 KB. Larger images are not embedded, and the card falls back to linking the original, which GitHub may not display.

If the image URL is wrong, the card still renders, just without the image. There is no error message for this.

### Why does the card say "Missing required parameter"?

`title` and `img` are both required. Add the missing one.

### Why does my card show an error about a parameter?

The error names the parameter and lists the allowed values, such as `Invalid "size" parameter. Must be one of: s, m, l`. Check that spelling and case match the list in the [Cards guide](./CARDS.md#-customize).

### How do I show the line under the title?

Use `tl=true`. Other values, such as `tl=1` or `tl=yes`, are ignored.

### Why does the star count show `★ ?`?

GitHub did not return data for that repo. Check the spelling of `owner/repo`, and confirm the repo is public. The widget can also fail when the shared GitHub rate limit is reached, and it retries after the 1-hour cache expires.

### Can I show stats for a private repo?

No. Live widgets read public data without a token, so private repos show placeholders.

### Why does the language icon not appear?

Only languages with a matching icon get one. The name is lowercased and spaces are removed, so `Python` shows the Python icon, but `Jupyter Notebook` has no icon and shows as text only.

### Why are some of my badges missing?

There was not enough space. Badges are added left to right until the row is full. Shorten them, or use fewer.

### Why is my title cut off?

Long titles are shortened with `...` to fit the card. Adding a `topright` widget makes the title area smaller, so it gets cut sooner. Shorten the title or drop the widget.

### Can I change the card height?

No. The card is always 250 px tall. Change the width with `size` and `imagewidth`.

### Can I use one colour instead of a gradient?

Yes. Give a single colour, such as `c=1a1d2e`. Two colours, separated by a comma, make a gradient from left to right.

### Why does the card update slowly?

The card image is cached for 60 seconds. Star counts, release tags, and languages are cached for 1 hour, so GitHub changes take that long to appear.

### What is the difference between `smooth` and `line` merge?

`line` adds a thin white divider where the image meets the panel. `smooth` fades the image into the panel colour. `cut` has no divider or fade.

### Can I link the card to my project?

Yes. Wrap the image in a Markdown link:

```markdown
[![My Project](CARD_URL)](https://github.com/you/my-project)
```

---

## Both

### I'm getting "Too Many Requests". What now?

The limit is 100 requests per minute from one IP, shared by icons and cards. Wait a minute and try again. This mostly happens when you test many URLs in a short time.

### Do I need an API key or account?

No. Charmly works with plain URLs.

### Why do the images look fine in one place and broken in another?

Make sure the image URL has no spaces and that special characters are encoded, for example `%20` for a space. Also check that the link works in a browser.
