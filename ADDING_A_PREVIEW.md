# Adding a new preview (GitHub Pages)

When you add a new preview folder (for example `preview-4`), do the following **once the source is in the repo** so the static site works and does not 404.

## 1. Set the Vite `base` URL

In `preview-4/vite.config.ts` (adjust the folder name), set `base` to your preview’s **published path** on GitHub Pages:

```ts
export default defineConfig({
  plugins: [react()],
  base: '/arozen-previews/preview-4/dist/',
})
```

- Replace `preview-4` with your actual folder name.
- Keep `/arozen-previews/` as the first segment: that matches this repository’s **project site** URL (`https://screenicom.github.io/arozen-previews/`).
- Always end with `/dist/` because that is where Vite writes the build.

If you skip this step, the app may load a blank page or break assets, because script and CSS paths will be wrong under a subfolder.

### Images and static files (avoid broken logos / missing images)

**Do not** use root-absolute paths in JSX or CSS, for example `src="/logo.png"` or `url(/logo.png)`. On GitHub Pages those resolve to `https://screenicom.github.io/logo.png`, not under your preview, so the browser shows a broken image.

**Preferred: import from `src/assets/`**  
Put images next to your code (e.g. `src/assets/logo.png`) and import them. Vite emits them under `dist/assets/` with hashed filenames and correct `/arozen-previews/<folder>/dist/assets/...` URLs—the same mechanism as your JS and CSS bundles.

```tsx
import logo from '../assets/logo.png';

<img src={logo} alt="" />
```

For TypeScript, ensure `src/vite-env.d.ts` exists with:

```ts
/// <reference types="vite/client" />
```

**Alternative: files in `public/`**  
If the file must live in `public/`, reference it with the base URL (not a leading `/` alone):

```tsx
<img src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
```

Imports from `src/assets/` are still recommended for UI images because they are less error-prone than remembering `BASE_URL` for every asset.

## 2. Install and build

From the preview folder:

```bash
cd preview-4
npm install
npm run build
```

This creates `preview-4/dist/`.

## 3. Register the folder for deploy

The GitHub Actions workflow only publishes folders listed in `scripts/build-pages-site.sh`. Add your preview name to the `for dir in …` line (same pattern as `preview-5d`):

```bash
for dir in preview-2 preview-3 … preview-4 …; do
```

If you skip this, `dist` can be committed on `main` but the live site will still 404 until the script includes your folder.

## 4. Commit the built `dist` folder

`dist` is listed in each preview’s `.gitignore`, so Git will not track it unless you force-add it. That is intentional for local builds; the deploy workflow reads **committed** `dist/` output from `main`.

```bash
git add preview-4/vite.config.ts scripts/build-pages-site.sh
git add -f preview-4/dist/
git commit -m "Add preview-4 and publish dist for GitHub Pages"
git push
```

Pushing to `main` runs `.github/workflows/deploy-pages.yml`. That job builds a minimal `_site` (static `preview/` plus each listed `preview-*/dist/`) and deploys with the Pages Actions (`v4` only — do not add a second `upload-pages-artifact` step).

**One-time repo setting:** **Settings → Pages → Build and deployment → Source** must be **GitHub Actions** (not “Deploy from a branch”). This repo is already configured that way.

## 5. Check the deploy and live URL

1. Open **Actions** on GitHub and confirm **Deploy GitHub Pages** succeeded for your push (a green run).
2. After a minute, open:

`https://screenicom.github.io/arozen-previews/preview-4/dist/`

(Substitute your folder name for `preview-4`.)

If the workflow is green but the URL 404s, check that your folder is in `scripts/build-pages-site.sh` and that `dist/` was force-added and pushed.

## After you change source code

Whenever you edit the app under a preview folder, run `npm run build` again, commit the updated files under `that-preview/dist/` (`git add -f …/dist/`), and push. If you only push source changes and not a new `dist`, the live site will stay on the old build.

Optionally add the live link to `PREVIEW-LINKS.md`.

## Quick checklist

| Step | Done |
|------|------|
| `base` in `vite.config.ts` is `/arozen-previews/<folder>/dist/` | |
| No `src="/..."` for images; use `src/assets/` imports or `${import.meta.env.BASE_URL}...` | |
| `npm run build` completed | |
| Folder added to `scripts/build-pages-site.sh` | |
| `git add -f <folder>/dist/` (and vite config / build script if changed) | |
| Pushed to `main` | |
| **Deploy GitHub Pages** workflow succeeded in Actions | |
