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

## 3. Commit the built `dist` folder

`dist` is listed in `.gitignore`, so Git will not track it unless you force-add it. That is intentional for local builds; for GitHub Pages you **must** commit the production output, same as `preview-2` and `preview-3`.

```bash
git add preview-4/vite.config.ts
git add -f preview-4/dist/
git commit -m "Add preview-4 and publish dist for GitHub Pages"
git push
```

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which publishes only static assets (`preview/` and each `preview-*/dist/`) to GitHub Pages. In **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**.

## 4. Check the live URL

After the push, wait a minute for Pages to update, then open:

`https://screenicom.github.io/arozen-previews/preview-4/dist/`

(Again, substitute your folder name for `preview-4`.)

## After you change source code

Whenever you edit the app under a preview folder, run `npm run build` again, commit the updated files under `that-preview/dist/` (`git add -f …/dist/`), and push. If you only push source changes and not a new `dist`, the live site will stay on the old build.

## Quick checklist

| Step | Done |
|------|------|
| `base` in `vite.config.ts` is `/arozen-previews/<folder>/dist/` | |
| No `src="/..."` for images; use `src/assets/` imports or `${import.meta.env.BASE_URL}...` | |
| `npm run build` completed | |
| `git add -f <folder>/dist/` (and vite config if changed) | |
| Pushed to `main` | |
