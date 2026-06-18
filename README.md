# HomeRise Consulting

**HomeRise Consulting** is a Social Media Marketing Agency (SMMA) built exclusively for **roofing
contractors**. We run done-for-you Facebook ad campaigns, qualify every lead before it reaches the
client, and book ready-to-close appointments straight onto their calendar — so roofers spend their
time closing jobs, not chasing leads.

This repository is the agency's marketing website: a fast, modern, high-converting landing site
where prospective roofing clients learn about the offer, see the pricing and guarantee, and book a
free strategy call.

📩 **Want to grow your roofing business? Get in touch:** [homeriseconsulting@gmail.com](mailto:homeriseconsulting@gmail.com)

## What the site does

- **Sells the offer** — hero, results stats, performance guarantee, how-it-works, full service
  list, and transparent flat-rate pricing.
- **Answers objections** — an FAQ section addressing the most common roofing-contractor concerns.
- **Books calls** — a dedicated booking page with an embedded GoHighLevel calendar.
- **Live chat** — an embedded LeadConnector chat widget for instant questions.
- **Converts** — a smart booking popup and clear CTAs guide visitors toward booking a strategy call.

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- React Router 6
- Vitest + React Testing Library (component tests)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & test

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
npm test           # run the test suite
```

## Pages

| Route      | Description                                                                   |
| ---------- | ----------------------------------------------------------------------------- |
| `/`        | Homepage (hero, stats, guarantee, how it works, services, pricing, FAQ, CTA)  |
| `/book`    | Book a free strategy call — embedded GoHighLevel calendar                     |
| `/terms`   | Terms of Service                                                              |
| `/privacy` | Privacy Policy                                                                |

## Embeds

- **Calendar:** the GoHighLevel booking calendar is embedded on `src/pages/Book.jsx`.
- **Chat:** the LeadConnector chat widget loads via the script in `index.html`.

## Brand colors

| Token      | Hex       | Use                    |
| ---------- | --------- | ---------------------- |
| `navy`     | `#1E3A5F` | Primary / headings     |
| `electric` | `#2563EB` | Accent / CTAs          |
| `ink`      | `#1F2937` | Body text              |
| `subtle`   | `#F8F9FA` | Page background        |

## Deployment

Static SPA — deploy `/dist` to Vercel, Netlify, Cloudflare Pages, etc. SPA redirect rules are
included for Vercel (`vercel.json`) and Netlify (`public/_redirects`).
