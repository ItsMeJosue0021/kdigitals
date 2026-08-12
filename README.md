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
    theme/        ThemeProvider (owns the light/dark choice)
    ui/           Reusable primitives (Button, Logo, ThemeToggle, icons)
  config/         Site content: navigation, brand, Messenger handle
  context/        React contexts, kept apart from the components that provide them
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

### Dark mode

Dark mode is a **token swap, not a second set of classes**. A `.dark` class on
`<html>` re-points the semantic tokens — `parchment` (page), `surface` (cards,
panels, inputs), `ink`, `ink-soft`, `line`, and the `--shadow-*` properties — at
their dark values, so anything built from those utilities follows the theme with
no extra markup.

What that means when writing components:

- Reach for `bg-surface`, never `bg-white`. `text-white` is still correct on a
  filled brand or Messenger button, where the background is fixed in both themes.
- Use `text-brand-ink` / `text-accent-ink` for brand-coloured **text and icons**,
  and `bg-brand` / `border-brand` for **fills**. The pair exists because a fill
  only needs 3:1 against the page while text needs 4.5:1, and the deep teal
  cannot reach that on the dark surface.
- Use the `shadow-card` / `shadow-lift` / `shadow-float` / `shadow-modal`
  utilities instead of arbitrary `shadow-[...]` values, so shadows re-tint with
  the theme. (They are defined with `@utility` in `index.css` rather than as
  `@theme` tokens because Tailwind inlines `--shadow-*` theme values into the
  generated class, which would freeze them at their light values.)
- Add a `dark:` utility only where the *shape* of a style changes rather than its
  colour — the decorative blur washes in `HomeHero` and `PageHeader`, for
  instance, need a lower opacity on a near-black page.

The plumbing: [`src/lib/theme.ts`](src/lib/theme.ts) holds the storage key, class
name, and helpers; `ThemeProvider` resolves the choice and keeps `<html>` in step;
`useTheme` reads it; `ThemeToggle` in the header flips it. Until the visitor uses
the toggle the setting is `system`, so the site follows the OS and keeps following
it mid-session. An inline script in `index.html` applies the saved theme before the
first paint so dark mode never flashes white — it mirrors `src/lib/theme.ts`, so
change the two together.
