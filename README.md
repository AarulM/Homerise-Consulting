# HomeRise Consulting

A modern, high-converting marketing-agency website for **HomeRise Consulting** — done-for-you Facebook ad campaigns for roofing contractors.

Built with **React + Vite**, **Tailwind CSS**, and **React Router**. Fully static, no backend required.

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- React Router 6

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

## Pages

| Route        | Description                                              |
| ------------ | -------------------------------------------------------- |
| `/`          | Homepage (hero, stats, guarantee, how it works, services, pricing, FAQ, CTA) |
| `/book`      | Book a Call — embed GHL calendar in `#ghl-calendar`      |
| `/pre-call`  | Pre-Call — embed VSL video in `#vsl-video`               |
| `/terms`     | Terms of Service                                         |
| `/privacy`   | Privacy Policy                                           |

## Embeds

- **Calendar:** paste your GoHighLevel calendar embed code into the element with `id="ghl-calendar"` in `src/pages/Book.jsx`.
- **Video:** paste your VSL embed code into the element with `id="vsl-video"` in `src/pages/PreCall.jsx`.

## Brand colors

| Token      | Hex       | Use                        |
| ---------- | --------- | -------------------------- |
| `navy`     | `#1E3A5F` | Primary / headings         |
| `electric` | `#2563EB` | Accent / CTAs              |
| `ink`      | `#1F2937` | Body text                  |
| `subtle`   | `#F8F9FA` | Alternating section bg     |

## Deployment

Static SPA — deploy `/dist` to Netlify, Vercel, Cloudflare Pages, etc. SPA redirect rules are
included for Netlify (`public/_redirects`) and Vercel (`vercel.json`).
