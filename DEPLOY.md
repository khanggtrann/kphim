# Putting KPhim on GitHub Pages (free)

Everything in this repo is already configured and committed. You just need to
create the repo on GitHub and push. Final site URL will be:

**https://YOUR_USERNAME.github.io/kphim/**

---

## 1. Create the GitHub repo (website, no CLI needed)

1. Sign in at https://github.com (create a free account if you don't have one).
2. Click the **+** (top-right) → **New repository**.
3. **Repository name:** `kphim`  ← must match exactly (the build is configured for `/kphim/`).
4. Set it to **Public** (Pages is free on public repos).
5. **Do NOT** check "Add a README", ".gitignore", or "license" — the repo already has them.
6. Click **Create repository**.

## 2. Push your code

GitHub will show a page with a URL. Copy the HTTPS one, then run these in a
terminal **inside this folder** (`kphim`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/kphim.git
git push -u origin main
```

When prompted to log in, use your GitHub username and a **Personal Access Token**
as the password (GitHub no longer accepts your account password for git):
- Create one at https://github.com/settings/tokens → "Generate new token (classic)"
  → tick the **repo** scope → generate → copy → paste it as the password.

## 3. Turn on GitHub Pages

1. In your repo on github.com, go to **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**.
   (You do NOT pick a branch — the included workflow handles building.)
3. That's it. Go to the **Actions** tab; you'll see "Deploy to GitHub Pages"
   running. When it finishes (about 1–2 min), your site is live at:

   **https://YOUR_USERNAME.github.io/kphim/**

## 4. Future updates

Every time you push to `main`, the site rebuilds and redeploys automatically:

```bash
git add -A
git commit -m "your message"
git push
```

---

## What was already set up for you

- `vite.config.js` — `base: '/kphim/'` so assets load at the project URL.
- `src/App.jsx` — router `basename` derived from the base path.
- `public/404.html` + a snippet in `index.html` — makes deep links and page
  refreshes work on GitHub Pages (single-page-app fallback).
- `.github/workflows/deploy.yml` — installs deps with pnpm, builds, and deploys.

## Want a real custom domain later? (optional, not free)

The github.io URL is free forever. A domain like `kphim.com` costs ~$10/yr from a
registrar (Namecheap, Cloudflare, etc.). After buying one: repo **Settings → Pages
→ Custom domain**, enter it, then add the DNS records GitHub shows you. Ask me and
I'll walk you through it.
