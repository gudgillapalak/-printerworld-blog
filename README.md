# Printerworld Blog

A fast, responsive blog for Printerworld built with **React + Vite + React Router**. It contains 50 articles on printers, laptops, ink and toner, troubleshooting and repairs. Everything runs in the browser from local data: no backend, database, API or login.

## Features
- Home page with search, category filters, article cards and a "Load more" button
- One page per article at `/blog/<slug>` with related articles
- A unique SEO title and meta description for every article, plus social sharing tags
- Direct article links work on refresh (see `vercel.json`)
- Favicon, app icons and a social sharing image (`public/`)

## Run locally
Requires Node.js 18 or newer.

    npm install
    npm run dev          # http://localhost:5173

## Build for production

    npm run build        # creates the /dist folder
    npm run preview      # optional: serve /dist locally

`npm run build` runs `vite build`, then `scripts/postbuild.mjs`, which writes a separate HTML file for each article (with its own title and description for search engines), plus `sitemap.xml` and `robots.txt`.

## Deploy: GitHub, then Vercel
1. **Push to GitHub**

       git init
       git add .
       git commit -m "Printerworld blog"
       git branch -M main
       git remote add origin https://github.com/<your-username>/<your-repo>.git
       git push -u origin main

   Commit the `package-lock.json` that `npm install` creates, so Vercel installs the same versions.

2. **Import into Vercel**
   - Go to vercel.com, choose **Add New > Project** and select your GitHub repository.
   - Vercel detects Vite automatically. Use these settings if asked:
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click **Deploy**. Every push to `main` redeploys the site.

3. **Optional: custom domain and sitemap**
   - Add your domain in **Project > Settings > Domains**.
   - In **Settings > Environment Variables** add `SITE_URL` with your live address, for example `https://www.printerworld.com`, then redeploy. This adds canonical links and `sitemap.xml` for your domain. Without it, Vercel's production address is used automatically.

Direct links such as `/blog/some-article` work because `vercel.json` sends every route to the app. On other hosts (Netlify, Cloudflare Pages, Apache, Nginx) add an equivalent "fallback to index.html" rule.

## Editing articles
All articles are in `src/data/blogsData.json`. Each one has:

| Field | Purpose |
| --- | --- |
| `title`, `slug` | Heading and web address (`/blog/<slug>`). Keep slugs unique. |
| `category` | Used by the filter chips. New categories appear automatically. |
| `seoTitle`, `metaDescription` | Search result title and description |
| `excerpt` | Short text on the article card |
| `keywords` | Used by the search box |
| `content` | List of `{ "heading", "paragraphs": [...] }` sections |

After editing, run `npm run build` to check the result.

## Project structure

    index.html                page shell, favicon and default SEO tags
    vercel.json               route fallback for Vercel
    public/                   favicon, app icons, social image, manifest
    scripts/postbuild.mjs     per-article HTML, sitemap and robots.txt
    src/
      main.jsx, App.jsx       app entry and routes
      index.css               all styling
      data/                   blogsData.json, blogs.js, seoTitle.js
      pages/                  Home.jsx, BlogDetail.jsx
      components/             Navbar, Hero, SearchBar, CategoryFilter, BlogCard,
                              RelatedArticles, Footer, Logo, Seo, ScrollToTop
