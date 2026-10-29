# Saffan — Portfolio

My personal portfolio. Built with Next.js, TypeScript, and Tailwind CSS. A notebook-style design — cream paper on a dark background, hand-drawn accents, terracotta highlights.

## What's here

- **Home** — who I am, what I build, selected work
- **About** — how I work, what I care about, what I'm using now
- **Work** — 6 projects (web apps, APIs, AI agents) with case-study detail pages
- **Blog** — 4 posts on web dev, AI, and performance
- **Services** — 4 fixed-price packages (landing 5k, multi-page 9.9k, full custom 20k, custom)
- **Stack** — the tools I use, grouped by category
- **Connect** — email, GitHub, Telegram, Discord

## Tech stack

- **Next.js 16** — App Router, server components, file-based metadata
- **TypeScript 5** — strict mode, zero `any`
- **Tailwind CSS 4** — utility-first, custom design tokens
- **Framer Motion** — page transitions, scroll reveals, mobile menu animation
- **simple-icons** — real brand icons (Next.js, React, FastAPI, etc.)
- **Fonts** — DM Sans (body), Caveat (handwritten headings), JetBrains Mono (code)

## Getting started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Lint
bun run lint

# Type check
bunx tsc --noEmit
```

The site runs on `http://localhost:3000`.

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo
3. Set environment variable (optional — defaults to a placeholder):
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```
4. Deploy — Vercel auto-detects Next.js, no config needed

The site works on any hosting that supports Next.js (Vercel, Netlify, self-hosted). For self-hosting, run `bun run build` and serve the `.next/standalone` output.

## Project structure

```
src/
  app/                    # Next.js App Router
    layout.tsx            # Root layout — fonts, SEO metadata, JSON-LD
    page.tsx              # Home route — mounts the shell
    globals.css           # Design system — colors, typography, utilities
    icon.tsx              # Favicon (terracotta S)
    apple-icon.tsx        # Apple touch icon
    opengraph-image.tsx   # Social share image (1200x630)
    twitter-image.tsx     # Twitter card image
    robots.ts             # robots.txt
    sitemap.ts            # sitemap.xml
    manifest.ts           # PWA manifest
    api/route.ts          # Health check endpoint
  components/
    notebook-shell.tsx    # Shell — nav, footer, page router, mobile menu
    router.tsx            # Client-side hash router (6 views)
    reveal.tsx            # Scroll animation wrapper
    page-header.tsx       # Shared page header (eyebrow + title + subtitle)
    tech-icon.tsx         # Brand icon component (simple-icons)
    shared/
      filter-bar.tsx      # Reusable filter bar (Work, Stack pages)
      code-block.tsx      # Reusable code block with syntax styling
      tech-glyph.tsx      # Tech icon + label wrapper
    pages/
      HomePage.tsx
      AboutPage.tsx
      WorkPage.tsx
      WorkDetailPage.tsx
      BlogPage.tsx
      BlogDetailPage.tsx
      ServicesPage.tsx
      StackPage.tsx
      ConnectPage.tsx
      work-detail/        # Work detail sub-components
        diagrams.tsx      # 6 SVG architecture diagrams
        blocks.tsx        # Reusable blocks (metrics, code, highlights)
        layouts.tsx       # 4 tone-based layouts (deep/essay/results/problem)
  lib/
    site.ts               # Site config (URL, title, description)
    portfolio-data.ts     # Barrel — re-exports all content
    utils.ts              # cn() helper
    content/
      types.ts            # TypeScript interfaces for all content
      personal.ts         # Your info — bio, stats, tools, currently
      projects.ts         # Your projects — edit to add/remove
      skills.ts           # Your skills — edit to add/remove
      services.ts         # Pricing packages — edit to change prices
      blog.ts             # Blog posts — edit to add posts
      about.ts            # About page content — facets, lists, intros
  hooks/
    use-copy.ts           # Copy-to-clipboard hook
public/
  logo.svg                # Hand-drawn S logo
```

## How to edit content

All content lives in `src/lib/content/`. You don't need to touch any components.

### Add a project

Edit `src/lib/content/projects.ts`. Copy an existing project object, change the fields. The `slug` must be unique — it's used in the URL (`#/work/your-slug`). The `tone` field controls the layout:
- `'deep'` — full case study (diagram + benchmark table + deep-dive code blocks)
- `'essay'` — short, one screen (lead + diagram + tech)
- `'results'` — metrics first, then story
- `'problem'` — problem statement first, then solution

### Add a blog post

Edit `src/lib/content/blog.ts`. Copy an existing post, change the fields. Body blocks: `paragraph`, `heading`, `code`, `quote`, `list`.

### Change pricing

Edit `src/lib/content/services.ts`. Each package has: `name`, `price`, `tagline`, `blurb`, `features[]`, `highlighted` (only one should be `true`), `cta`.

### Update your info

Edit `src/lib/content/personal.ts`. Change `bio`, `longBio`, `stats`, `currently`, `tools`, `email`, social links.

### Change colors

Edit `src/app/globals.css`. The design tokens are at the top of `:root`:
```css
--void: #1a1a1a;        /* dark background */
--paper: #fbf8f0;       /* cream paper */
--ink: #2c2c2c;         /* text color */
--accent: #df5e4b;      /* terracotta */
--accent-deep: #c44a38; /* WCAG AA terracotta for text */
```

### Set your domain

Set the `NEXT_PUBLIC_SITE_URL` environment variable on your hosting platform. This updates the canonical URL, sitemap, robots.txt, OpenGraph image, and JSON-LD schema.

### Add Google/Bing verification

Edit `src/app/layout.tsx` — find the `verification` block in the metadata and replace the placeholder strings with your real codes from Google Search Console and Bing Webmaster Tools.

## Client vs Server

The site uses server components by default. Client components (`'use client'`) are only used where needed:
- **Router** — uses useState/useEffect for view state
- **Shell** — uses useState for mobile menu, scroll detection
- **Reveal** — uses framer-motion for animations
- **Pages** — use the router (navigate, back)
- **FilterBar** — uses useState for active filter
- **useCopy** — uses navigator.clipboard

Everything else (layout, page, metadata routes, content files, tech-icon, code-block) is server-rendered.

## SEO

- **Metadata** — title, description, keywords, OpenGraph, Twitter cards
- **JSON-LD** — Person, WebSite, WebPage, ProfilePage, CollectionPage schemas
- **Sitemap** — auto-generated at `/sitemap.xml`
- **Robots** — auto-generated at `/robots.txt`
- **Canonical URL** — set via `NEXT_PUBLIC_SITE_URL`
- **Social images** — OG image + Twitter card auto-generated at 1200x630
- **Icons** — favicon + Apple touch icon auto-generated

## Performance

- **Lazy loading** — all pages except Home are loaded via `next/dynamic`
- **Font optimization** — DM Sans + JetBrains Mono (variable), Caveat (weight 500 only)
- **Tree shaking** — `optimizePackageImports` for lucide-react, framer-motion, simple-icons
- **No raster images** — logo is SVG, OG image is generated on-demand
- **Compression** — enabled, `X-Powered-By` header removed
- **CLS** — zero (no layout shift, fixed dimensions on all elements)
- **Estimated Lighthouse** — 97-100 (Performance, Accessibility, Best Practices, SEO)

## Accessibility

- Skip-to-content link
- `aria-label` on nav, footer, icon buttons
- `aria-current="page"` on active nav item
- `aria-expanded` on mobile menu + FAQ accordion
- Focus management on view changes
- Screen reader live region announces page changes
- `prefers-reduced-motion` respected (MotionConfig)
- WCAG AA color contrast (terracotta text uses `--accent-deep`)

## License

MIT — do whatever you want with it.
