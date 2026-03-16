# Arozen Diffuser App (v1) — UI prototype

Static HTML/CSS prototype for review and approval. Matches the screens and flows in [MD/arozon_diffuser_app_v1_design_specs.md](../MD/arozon_diffuser_app_v1_design_specs.md).

**Style**: Competitor-inspired (Kirri / Scent Aus) — clean, functional, teal accent, flat design, large central power circle on device control.

## How to preview

- **Local**: Open `index.html` in a browser (double-click or drag into Chrome/Edge/Firefox). Or open `device-list.html` to start from the device list.
- **GitHub Pages**: Enable Pages for this repo and set the source to the `preview/` folder (or root with `/preview` as subpath). Share the published URL for review.

## Contents

| File | Description |
|------|-------------|
| `index.html` | Entry; redirects to device list (or link to splash). |
| `splash.html` | Splash / branding; auto-redirects to device list after ~2.5s. |
| `device-list.html` | Device list (with mock devices). Use “See empty state” to toggle empty view. |
| `device-control.html` | Per-diffuser control: power, misting presets, countdown, time remaining. |
| `device-settings.html` | Rename diffuser; remove diffuser (with confirmation). |
| `pairing.html` | Add-diffuser flow: permissions → prepare → Wi‑Fi → pairing (with simulate success/failure). |
| `css/theme.css` | Arozen theme (colours, typography, spacing). |
| `css/components.css` | Shared components (cards, buttons, presets, toggle, banners, etc.). |
| `js/app.js` | Optional helpers (e.g. device id/name from URL). |
| `assets/logo.svg` | Arozen logo (from `OEM/Logo_-_SVG_Black.svg`). |
| `assets/diffuser-eon-pro-v2.png` | Eon Pro V2 diffuser image (from `OEM/EonProV2 - transp.png`). |

## Navigation

- **Device list** → tap card → **Device control**; “Add diffuser” → **Pairing**.
- **Device control** → “Settings” → **Device settings**; “Back” → Device list.
- **Pairing** → “Cancel” or “Back to device list” → Device list; “Done” after success → Device list.
