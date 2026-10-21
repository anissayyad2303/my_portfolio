# Deploy this portfolio to Vercel

## Vercel settings
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

The included `vercel.json` sets these values and adds an SPA rewrite for client-side routes.

## Deploy
1. Extract this ZIP.
2. Upload/push the extracted project folder to a GitHub repository.
3. In Vercel, choose **Add New → Project**, import the repository, and click **Deploy**.
4. Before sharing the live URL, verify the personal information and links in `src/data.ts`.

## Run locally
```bash
npm install
npm run dev
```

Build test:
```bash
npm run build
```
