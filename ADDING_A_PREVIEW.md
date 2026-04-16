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

### Images and files in `public/`

Do **not** use root-absolute URLs like `src="/logo.png"` in components. On GitHub Pages that resolves to the domain root, not your preview, so images disappear. Prefix with Vite’s base URL:

```tsx
<img src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
```

(Or import assets from `src/` so Vite rewrites the URL in the bundle.)

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
| `npm run build` completed | |
| `git add -f <folder>/dist/` (and vite config if changed) | |
| Pushed to `main` | |
