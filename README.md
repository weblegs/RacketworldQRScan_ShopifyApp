# Weblegs QR Scan — App Overview

## What Does This App Do?

**Weblegs QR Scan** is a Shopify embedded app that lets merchants generate QR codes for their existing discount codes. When a customer scans the QR code (e.g. from a flyer, sign, or receipt), they are taken straight to the store with the discount already applied — no typing required.

### Core Workflow
1. Merchant opens the app inside Shopify Admin
2. The app loads all active discount codes from the store automatically
3. Merchant selects a discount code from the dropdown
4. App generates a QR code linked to that discount URL
5. Merchant previews the QR code and prints it

---

## App Pages

### 1. Home (QR Generator)
- Dropdown list of all active discount codes pulled from Shopify
- "Generate QR Code" button to create the QR image
- QR code preview displayed on screen
- "Print QR Code" button — opens a clean print-ready page

### 2. About
- Description of what the app does
- Weblegs branding and contact info

---

## How the QR Code Works

When a customer scans the QR code, it takes them to:

```
https://www.racketworld.co.uk/discount/{DISCOUNT_CODE}
```

Shopify automatically applies the discount when the customer lands on that URL. No extra steps needed.

---

## Tech Stack (For Developers)

| Component | Technology |
|----------|-----------|
| Framework | React Router v7 (Node.js) |
| Shopify Integration | Shopify Admin GraphQL API |
| Database | PostgreSQL (hosted on Railway) |
| ORM | Prisma |
| QR Code Generation | QuickChart QR API |
| UI | Shopify Polaris Web Components |
| Build Tool | Vite |

---

## Key Files (For Developers)

```
app/
├── routes/
│   ├── app._index.jsx     — Main page: discount selector, QR generator, print
│   ├── app.about.jsx      — About page
│   ├── app.jsx            — App shell with nav (Home / About)
│   ├── auth.$.jsx         — Shopify OAuth handler
│   └── webhooks.*         — Webhook handlers (uninstall, scopes update)
├── shopify.server.js      — Shopify app config and auth helpers
└── db.server.js           — Prisma client
prisma/
└── schema.prisma          — Database schema (session storage)
```

---

## Shopify Permissions Required

| Permission | Reason |
|-----------|--------|
| `read_discounts` | Fetch all active discount codes to populate the dropdown |

---

## Hosting & Deployment

- **App URL:** `https://wonderful-enjoyment-production-fa56.up.railway.app`
- **Database:** PostgreSQL on Railway
- **Deploy:** Push to `main` branch on GitHub → Railway auto-deploys
- **Store:** `racketworlduk.myshopify.com`
