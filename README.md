# Ammara Maner — Premium Portfolio

A responsive React + Vite + TypeScript portfolio with custom CSS, Motion animations, Lucide icons, editable project data, project-detail modals, theme toggle, responsive navigation, resume placeholder handling, and validated contact-to-email flow.

## Requirements
- Windows 10/11
- Node.js 20 LTS or newer (recommended)
- Visual Studio Code

## Run locally (Windows)
1. Extract the ZIP.
2. Open the `anis_portfolio` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

```powershell
npm install
npm run dev
```

5. Open the local address Vite prints, usually `http://localhost:5173`.

To test a production build:

```powershell
npm run build
npm run preview
```

## Personalize before publishing
Edit `src/data.ts`:
- `email`: replace `your.email@example.com` with a professional email address.
- `github` and `linkedin`: paste your full profile URLs. Buttons stay disabled if links are blank.
- `showAvailability` and `availabilityLabel`: availability badge is off by default; turn it on only when accurate. (The starter does not assert availability in the hero.)
- `graduationYear`: replace with confirmed information.
- `skillGroups`: remove anything you haven't learned yet; suggested skills are not verified claims.
- `projects`: update descriptions, status, feature list, stack, and add real `repoUrl` / `liveUrl` when available. Concepts are clearly marked.
- Education timeline: edit the academic status/course wording and add confirmed academic years and subjects. The supplied 10th score in the current data is 87%; keep only if accurate.

## Add a real resume PDF
1. Add your actual PDF at `public/resume.pdf`.
2. Keep `resumePath: '/resume.pdf'` in `src/data.ts`.
3. Resume buttons check whether the file exists. If it does not, the site shows setup instructions rather than downloading a fake file.

## Add a real profile photograph (optional)
Put an optimized image at `public/profile.jpg`. The current hero uses an original CSS/SVG-like code workspace illustration, not a fake personal photo. If you want to use a photo, replace the hero illustration area in `src/App.tsx` and provide meaningful `alt` text.

## Contact form behavior
This is a static front-end project. It validates required fields and email format, then opens the visitor's default email application with a prefilled message (`mailto:`). It does **not** send messages itself, store form submissions, or show a false “sent successfully” status. For direct in-site sending, connect a trusted form provider or a backend endpoint and keep any private API credentials on the server, never in client-side code.

## Deploy to GitHub Pages
For the simplest deployment, use Vercel (below). If you prefer GitHub Pages:
1. Create a GitHub repository and push this folder.
2. Install `gh-pages` as a dev dependency: `npm install -D gh-pages`.
3. In `vite.config.ts`, set `base: '/YOUR_REPOSITORY_NAME/'`.
4. Add scripts to `package.json`: `"predeploy": "npm run build", "deploy": "gh-pages -d dist"`.
5. Run `npm run deploy`.
6. In GitHub repository Settings → Pages, choose the `gh-pages` branch if it is not automatically selected.
7. If using a custom domain, follow GitHub's current Pages documentation and update DNS. Recheck asset paths after changing the Vite base.

## Deploy to Vercel
1. Push the project to GitHub.
2. Sign in to Vercel and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. Vercel will create a public URL.
5. Add the URL to your LinkedIn/GitHub profile. Keep all public links accurate.
6. For future changes, commit and push to the connected branch; Vercel rebuilds automatically.

## Folder structure

```text
anis_portfolio/
├── public/
│   ├── favicon.svg
│   └── README-assets.txt
├── src/
│   ├── App.tsx
│   ├── data.ts
│   ├── main.tsx
│   └── styles.css
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Functionality checklist
- [x] Sticky navigation and mobile hamburger menu
- [x] Smooth section scrolling and active section highlight
- [x] Scroll progress and back-to-top control
- [x] Dark/light theme toggle
- [x] Reduced-motion preference support
- [x] Responsive CSS layouts for mobile, tablet, desktop
- [x] Project detail modal with Escape/backdrop close
- [x] Editable project and skill data
- [x] Explicit project status labels; no invented production claims
- [x] Resume buttons detect missing PDF and explain how to add it
- [x] Contact form required-field and email validation
- [x] Honest `mailto:` flow instead of fake backend success
- [x] Social links disabled until configured
- [x] Dynamic copyright year
- [x] SEO title, description, Open Graph basics, custom AS favicon
- [x] Keyboard focus styles and reduced-motion support

Before publishing, run `npm install`, `npm run build`, verify your personal details, and test the deployed site on a phone. A build/test could not be executed in this file-generation environment, so run the commands locally and resolve any environment-specific package errors before sharing publicly.
