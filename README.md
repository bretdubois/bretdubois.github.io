# bretdubois.github.io

Personal portfolio of **Bret DuBois** — Solutions Engineering and technical consulting with a networking and HCI background.

Live at [bretdubois.github.io](https://bretdubois.github.io).

## Design

Designed with the [Hallmark](https://github.com/nutlope/hallmark) anti-AI-slop discipline applied at the **Almanac** theme.

- **Genre:** editorial
- **Macrostructure:** Stat-Led
- **Theme:** Almanac (OKLCH cool-blue paper, cool-blue accent)
- **Display:** Hanken Grotesk
- **Serif:** Newsreader
- **Mono:** IBM Plex Mono
- **Nav:** N6 Newspaper masthead
- **Footer:** Ft4 Dense typographic colophon
- **Enrichment:** none, typography only
- **Motion:** one orchestrated reveal on first paint, otherwise silent

Design tokens live in [`tokens.css`](./tokens.css) at the project root, portable to any other project that wants the same language.

## Stack

- **Next.js 16** (Turbopack) with `output: "export"`, deployed as static HTML to GitHub Pages
- **TypeScript** in strict mode
- **Tailwind CSS v4** with `@theme` design tokens
- **next/font/google** for Hanken Grotesk, Newsreader, IBM Plex Mono
- **lucide-react** for the two icons used in the dark-mode toggle
- **next/og** `ImageResponse` for the favicon, apple-touch-icon, and OG image generated at build time

No framer-motion, no gsap, no lenis, no Three.js, no marquees. The page is just there.

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
    page.tsx            single-page layout, all sections mount here
    icon.tsx            favicon (64×64, ImageResponse)
    apple-icon.tsx      apple-touch-icon (180×180)
    opengraph-image.tsx 1200×630 OG card
    globals.css         Almanac tokens + utility classes
  components/
    layout/             Header (N6 masthead), Footer (Ft4 colophon)
    sections/           Hero (Stat-Led), HowIWork, WhySE, About, Work, Projects, Skills, Contact
  data/
    work.ts             case studies + timeline entries (factual reference)
    projects.ts         personal/technical projects (factual reference)
    skills.ts           skill clusters
  lib/
    utils.ts            `cn` helper for class composition
tokens.css              portable design tokens (drop into another project)
.hallmark/              Hallmark project memory (preflight cache + run log)
```

## Notes

- Dark mode is applied via a blocking inline script in `<head>` before hydration to prevent FOUC. The toggle persists choice in `localStorage`.
- `prefers-reduced-motion` is honored in CSS (disables the single reveal animation).
- Contact email is intentionally not on the page. LinkedIn and Calendly are the entry points.

## License

[MIT](./LICENSE)
