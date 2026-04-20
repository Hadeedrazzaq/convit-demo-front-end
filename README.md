# Corvit-Demo · Frontend

Next.js (App Router) + Tailwind storefront for the Corvit-Demo COD e-commerce app.

## Stack
- Next.js 14 (App Router)
- Tailwind CSS with themeable CSS-variable tokens
- Axios service layer with JWT interceptor
- React Context for Auth, Cart, and Catalog (shared category filter)

## Quick start
```bash
cp .env.local.example .env.local  # NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm install
npm run dev                       # http://localhost:3000
```

## Routes

**Customer**
- `/` — storefront (hero + category filter + paginated grid)
- `/login`, `/signup`
- `/cart`
- `/order-success?id=…`
- `/orders` — my orders list
- `/orders/[id]` — order detail with tracking timeline

**Admin** (JWT + `isAdmin` required)
- `/admin/products` — CRUD + paginated table
- `/admin/orders` — order list + mark delivered

## Theming

All colors and fonts live as CSS variables in `app/globals.css`, exposed as Tailwind tokens via `tailwind.config.js`. Retheme by editing the RGB triplets in `:root`:

```css
--color-primary: 220 38 38;
--color-secondary: 10 10 10;
--color-background: 255 255 255;
```

Brand name / tagline / logo path are centralized in `config/brand.js`.

## Reusable component classes
- `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-outline-active`
- `.input`, `.card`
- `.eyebrow`, `.link-nav`

## Deploy (free tier)
- **Vercel** → root `/`, set `NEXT_PUBLIC_API_URL` to your backend URL.
