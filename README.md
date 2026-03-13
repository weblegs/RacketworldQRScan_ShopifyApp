# Weblegs QR Scan — Shopify App

A Shopify embedded app built by [Weblegs](https://www.weblegs.co.uk) that lets merchants generate printable QR codes linked to their store's discount codes. When a customer scans the QR code, they are taken directly to the store with the discount pre-applied — no manual code entry required.

---

## Overview

Weblegs QR Scan integrates with the Shopify Admin to pull existing discount codes and turn them into scannable QR codes. This is ideal for in-store signage, printed flyers, events, or any physical marketing material where you want to bridge offline promotion with online checkout.

**How it works:**

1. The merchant opens the app inside Shopify Admin.
2. The app fetches all active discount codes from the store via the Shopify Admin GraphQL API.
3. The merchant selects a discount code from the dropdown.
4. The app generates a QR code that encodes a direct URL to the store with the discount pre-applied (`/discount/{code}`).
5. The merchant can preview and print the QR code from within the app.

---

## Features

- **Discount code selector** — Automatically lists all active discount codes from your Shopify store.
- **QR code generation** — Instantly creates a QR code linked to the selected discount URL.
- **One-click print** — Opens a clean print dialog to produce a print-ready QR code.
- **Embedded in Shopify Admin** — Runs natively inside Shopify Admin via App Bridge; no external login needed.
- **Secure & authenticated** — Uses Shopify OAuth and session storage via Prisma to keep merchant sessions secure.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React Router v7](https://reactrouter.com/) |
| Shopify integration | [@shopify/shopify-app-react-router](https://shopify.dev/docs/api/shopify-app-react-router) |
| UI components | [Shopify Polaris Web Components](https://shopify.dev/docs/api/app-home/polaris-web-components) |
| Session storage | [Prisma](https://www.prisma.io/) + SQLite |
| QR generation | [QuickChart QR API](https://quickchart.io/documentation/qr-codes/) |
| Build tool | [Vite](https://vite.dev/) |

---

## App Structure

```
app/
├── routes/
│   ├── app._index.jsx        # Main page — discount selector & QR generator
│   ├── app.about.jsx         # About page with app info
│   ├── app.jsx               # App shell with nav (Home / About)
│   ├── auth.$.jsx            # Shopify OAuth handler
│   ├── webhooks.app.uninstalled.jsx    # Webhook: app uninstalled
│   └── webhooks.app.scopes_update.jsx  # Webhook: scopes updated
├── shopify.server.js         # Shopify app config & auth helpers
├── db.server.js              # Prisma client
└── root.jsx                  # Root layout
prisma/
└── schema.prisma             # Database schema (session storage)
```

---

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli/getting-started)
- A Shopify Partner account and a development store

### Setup

```shell
npm install
npm run setup        # Runs Prisma migrations
shopify app dev      # Starts the dev server with a tunnel
```

Press **P** in the terminal to open the app URL, then install it on your development store.

### Environment Variables

Shopify CLI sets these automatically during `shopify app dev`. For production deployments you must set them manually:

| Variable | Description |
|---|---|
| `SHOPIFY_API_KEY` | Your app's API key from the Partner Dashboard |
| `SHOPIFY_API_SECRET` | Your app's API secret |
| `SHOPIFY_APP_URL` | The public URL of your deployed app |
| `SCOPES` | Comma-separated list of API scopes (e.g. `read_discounts`) |
| `NODE_ENV` | Set to `production` for production deployments |

---

## Deployment

Build the app:

```shell
npm run build
```

Then deploy to your hosting provider of choice. The app runs as a standard Node.js server. Recommended options:

- [Google Cloud Run](https://shopify.dev/docs/apps/launch/deployment/deploy-to-google-cloud-run)
- [Fly.io](https://fly.io/docs/js/shopify/)
- [Render](https://render.com/docs/deploy-shopify-app)

> **Note:** SQLite works for single-instance deployments. For multi-instance or high-availability setups, switch the Prisma datasource to PostgreSQL or MySQL.

---

## Troubleshooting

**Database table does not exist**

Run the setup script to apply Prisma migrations:

```shell
npm run setup
```

**Prisma engine error on Windows ARM64**

Set this environment variable before running the app:

```shell
PRISMA_CLIENT_ENGINE_TYPE=binary
```

---

## Built by

[Weblegs](https://www.weblegs.co.uk) — Web design & development agency.
