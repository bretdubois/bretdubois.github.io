# brdubois.com

Personal site of **Bret DuBois**: technical seller who builds. Solutions
engineering, infrastructure, and the systems documented at
[brdubois.com](https://brdubois.com).

## Design principles

- **Light, minimal, typographic.** One column, generous whitespace, content in
  version control. No animation framework, no 3D hero, no scroll-jacking.
- **Evidence over adjectives.** Project pages are case studies with real
  architecture diagrams (plain `<pre>` box drawings) and real code excerpts from
  the systems they describe.
- **Nothing sensitive.** No internal IPs, ports, hostnames, bot handles, or
  network topology details. No phone number.

## Stack

- **Next.js 16** with `output: "export"`, deployed as static HTML to GitHub Pages
- **TypeScript** strict mode, **Tailwind CSS v4**
- **next/og** `ImageResponse` for favicon and OG image at build time
- Fonts: Inter + JetBrains Mono via `next/font`

## Local development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static export to ./out
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`: build → static
export → GitHub Pages. The custom domain (`brdubois.com`) is configured in the
repo's Pages settings and DNS is managed in Cloudflare.
