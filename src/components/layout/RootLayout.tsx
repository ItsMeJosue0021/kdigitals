import { Outlet, ScrollRestoration } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'

/** Shared chrome for every route: skip link, header, page outlet, footer. */
export function RootLayout() {
  return (
    // Column layout + `mt-auto` on the footer keeps it at the bottom of the
    // viewport on short pages instead of floating mid-screen.
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="bg-brand sr-only rounded-md px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-60"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/*
        Key scroll position by pathname rather than the default history key.
        Search and filters live in the query string, so every keystroke is a
        navigation — with the default key each one would restore to the top.
        Keying by pathname also returns you to your place in the grid when
        you come back from a product page.
      */}
      <ScrollRestoration getKey={(location) => location.pathname} />
    </div>
  )
}
