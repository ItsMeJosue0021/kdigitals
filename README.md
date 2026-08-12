# kstore

React 19 + TypeScript + Vite, styled with Tailwind CSS v4.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server with HMR        |
| `npm run build`   | Type-check (`tsc -b`) and build       |
| `npm run lint`    | Run ESLint                           |
| `npm run preview` | Preview the production build locally |

## Project structure

```
src/
  components/
    layout/       Page regions (RootLayout, Header)
    product/      Catalogue components (card, grid, search, gallery)
    ui/           Reusable primitives (Button, Logo, icons)
  config/         Site content: navigation, brand, Messenger handle
  data/           Product catalogue
  hooks/          Reusable React hooks
  lib/            Framework-agnostic helpers (cn, format, search, placeholders)
  pages/          One component per route
  routes/         Route definitions and URL builders
  styles/         Tailwind theme tokens
  types/          Shared TypeScript types
```

Conventions:

- Multi-file components get their own folder with an `index.ts` barrel;
  single-file components sit directly in their group folder.
- Import from the `@/` alias (mapped to `src/`) instead of deep relative paths.
- Content (labels, links, products) lives in `src/config` and `src/data`,
  keeping components presentational.
- Build URLs with `ROUTES` / `productPath` from `src/routes/paths.ts` rather
  than hard-coding path strings.

## Products

The catalogue is a static array in [`src/data/products.ts`](src/data/products.ts)
typed by [`src/types/product.ts`](src/types/product.ts). Replacing it with an API
call requires no page changes, since everything downstream depends on the
`Product` type alone.

Products ship with an empty `images` array, which renders a generated
brand-gradient cover. To use real photos, add files under `src/assets/products/`,
import them, and list them in `images` (the first is the cover; more than one
enables the thumbnail gallery on the detail page).

## Styling

Design tokens live in [`src/styles/theme.css`](src/styles/theme.css) inside Tailwind's
`@theme` block, so each token becomes a first-class utility — `--color-brand` gives
`bg-brand`, `text-brand`, `border-brand`, and so on. The palette is documented in
[COLOR-THEME.md](COLOR-THEME.md).

Use theme utilities rather than raw hex values or arbitrary classes; add a new token
to `theme.css` when a value is missing.
