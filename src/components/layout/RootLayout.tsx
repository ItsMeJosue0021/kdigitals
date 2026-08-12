import { Outlet, ScrollRestoration } from 'react-router'
import { Header } from './Header'

/** Shared chrome for every route: skip link, header, and the page outlet. */
export function RootLayout() {
  return (
    <>
      <a
        href="#main"
        className="bg-brand sr-only rounded-md px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-60"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Outlet />
      </main>

      {/*
        Key scroll position by pathname rather than the default history key.
        Search and filters live in the query string, so every keystroke is a
        navigation — with the default key each one would restore to the top.
        Keying by pathname also returns you to your place in the grid when
        you come back from a product page.
      */}
      <ScrollRestoration getKey={(location) => location.pathname} />
    </>
  )
}
