# bretdubois.github.io

Personal portfolio of **Bret DuBois** — technical sales professional with an HCI / engineering background.

Live at [bretdubois.github.io](https://bretdubois.github.io).

## Stack

- **Next.js 16** (Turbopack) with `output: "export"` — deployed as static HTML to GitHub Pages
- **TypeScript** — strict mode
- **Tailwind CSS v4** — custom warm design tokens via `@theme`
- **Framer Motion 12** — scroll-triggered reveals, stagger, clip-path text reveals
- **GSAP + ScrollTrigger** — timeline scroll-linked line draw
- **React Three Fiber + Drei** — the animated network graph behind the hero
- **Lenis** — smooth scroll, integrated with the GSAP ticker
- **next/og** `ImageResponse` — favicon, apple-touch-icon, and OG image generated at build time

## Local development

```bash
npm install
npm run dev    # http://localhost:3000
```

Other scripts:

```bash
npm run lint   # ESLint
npm run build  # static export → out/
```

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and publishes `out/` via `actions/deploy-pages@v4`. The repo name matches the host (`bretdubois.github.io`) so the URL has no path prefix.

## Layout

```
src/
  app/
    layout.tsx          root metadata, JSON-LD Person schema, FOUC script
    page.tsx            single-page layout — all sections mount here
    icon.tsx            favicon (64×64, ImageResponse)
    apple-icon.tsx      apple-touch-icon (180×180)
    opengraph-image.tsx 1200×630 OG card
    globals.css         design tokens + base styles
  components/
    layout/             Header (nav + dark toggle + scroll progress) and Footer
    sections/           Hero, About, Work, Projects, Skills, Contact
    three/              NetworkScene — the R3F hero background
    ui/                 TextReveal, AnimatedCounter
  data/
    work.ts             case studies + timeline entries
    projects.ts         personal/technical projects
    skills.ts           skill clusters + proficiencies
  lib/
    animation.ts        shared Framer Motion variants
    utils.ts            smoothScrollTo helper (prefers Lenis)
  providers/
    LenisProvider.tsx   Lenis + GSAP ticker wiring, reduced-motion aware
```

## Notes

- Dark mode is applied via a blocking inline script in `<head>` before hydration to prevent FOUC. The toggle persists choice in `localStorage`.
- `prefers-reduced-motion` is honored in CSS (disables animations/transitions) and in `LenisProvider` (skips smooth scroll).
- Contact email is intentionally not on the page — scraper-bait. LinkedIn is the entry point.

## License

[MIT](./LICENSE)
