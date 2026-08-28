# Tequila Town Tech

An immersive product site for the Tequila Town technology ecosystem. This repository is a standalone Next.js app with no authentication gate or proprietary hosting dependency.

## Run locally

Use Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Import `Blocpod/TequilaTownTech-IRV2` in Vercel.
2. Keep the detected framework preset set to **Next.js**.
3. Deploy. The default build command is `npm run build`; no required environment variables are needed.

Vercel's generated URL will be publicly viewable without a sign-in screen. After attaching a custom production domain, optionally set `NEXT_PUBLIC_SITE_URL` to that full `https://` URL so social share metadata uses the final domain.

## Checks

```bash
npm run lint
npm run build
```
