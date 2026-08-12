/**
 * Generates a brand-coloured cover image for products that have no photo yet.
 *
 * The result is an inline SVG data URI: no network request, no bundled asset,
 * and the same product always gets the same cover because everything is
 * derived from a hash of the seed. Callers can pin the gradient with the
 * optional `palette` argument when a layout needs a specific colour.
 */

/** Named gradient pairs drawn from the brand palette (COLOR-THEME.md). */
export type CoverPalette =
  | 'teal'
  | 'mist'
  | 'gold'
  | 'sunrise'
  | 'forest'
  | 'sand'

const PALETTES: Record<CoverPalette, readonly [string, string]> = {
  teal: ['#3a7b6b', '#88b5b2'],
  mist: ['#88b5b2', '#cebbb4'],
  gold: ['#f6ad15', '#cebbb4'],
  sunrise: ['#3a7b6b', '#f6ad15'],
  forest: ['#88b5b2', '#3a7b6b'],
  sand: ['#cebbb4', '#88b5b2'],
}

/** Rotation order used when no palette is named. */
const PALETTE_NAMES = Object.keys(PALETTES) as CoverPalette[]

/** Small deterministic string hash (djb2-style). */
function hash(seed: string): number {
  let value = 0
  for (let index = 0; index < seed.length; index += 1) {
    value = (value << 5) - value + seed.charCodeAt(index)
    value |= 0 // keep it a 32-bit int
  }
  return Math.abs(value)
}

export function placeholderCover(
  seed: string,
  /** Pins the gradient instead of deriving it from the seed. */
  palette?: CoverPalette,
): string {
  const seedValue = hash(seed)
  const [from, to] =
    PALETTES[palette ?? PALETTE_NAMES[seedValue % PALETTE_NAMES.length]]

  // Vary the composition so a grid of placeholders does not look repetitive.
  const circleX = 120 + (seedValue % 5) * 130
  const circleY = 90 + (seedValue % 3) * 140
  const rotation = ((seedValue % 7) - 3) * 1.6

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
</linearGradient></defs>
<rect width="800" height="600" fill="url(#bg)"/>
<circle cx="${circleX}" cy="${circleY}" r="230" fill="#ffffff" opacity="0.10"/>
<circle cx="${800 - circleX}" cy="${600 - circleY}" r="150" fill="#ffffff" opacity="0.08"/>
<g transform="translate(400 300) rotate(${rotation}) translate(-130 -172)">
<rect width="260" height="344" rx="16" fill="#ffffff" opacity="0.94"/>
<rect x="36" y="46" width="140" height="16" rx="8" fill="${from}" opacity="0.55"/>
<rect x="36" y="98" width="188" height="11" rx="5.5" fill="#14201d" opacity="0.13"/>
<rect x="36" y="130" width="188" height="11" rx="5.5" fill="#14201d" opacity="0.13"/>
<rect x="36" y="162" width="124" height="11" rx="5.5" fill="#14201d" opacity="0.13"/>
<rect x="36" y="212" width="188" height="11" rx="5.5" fill="#14201d" opacity="0.10"/>
<rect x="36" y="244" width="188" height="11" rx="5.5" fill="#14201d" opacity="0.10"/>
<rect x="36" y="276" width="96" height="11" rx="5.5" fill="#14201d" opacity="0.10"/>
</g></svg>`

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
