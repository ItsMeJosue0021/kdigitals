/**
 * Photo sets bundled from `src/assets/img/<set>/<group>/`.
 *
 * The glob is resolved at build time, so dropping a file into one of those
 * folders is all it takes — there is no import to add here. Within a group the
 * file named `front-*` is the cover and is listed first; the rest follow in
 * filename order.
 */
const FILES = import.meta.glob('../assets/img/*/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/** `../assets/img/pmes/1/front-abc.jpg` → `front-abc.jpg` */
function fileName(path: string): string {
  return path.slice(path.lastIndexOf('/') + 1)
}

/** `../assets/img/pmes/1/front-abc.jpg` → `pmes/1` */
function groupName(path: string): string {
  return path.split('/').slice(-3, -1).join('/')
}

/** Cover first, then filename order. */
function byCoverThenName(a: string, b: string): number {
  const aIsCover = fileName(a).startsWith('front-')
  const bIsCover = fileName(b).startsWith('front-')

  if (aIsCover !== bIsCover) {
    return aIsCover ? -1 : 1
  }

  return a.localeCompare(b)
}

const GROUPS: Record<string, string[]> = {}

for (const path of Object.keys(FILES).sort(byCoverThenName)) {
  const group = groupName(path)
  GROUPS[group] = GROUPS[group] ?? []
  GROUPS[group].push(FILES[path])
}

/**
 * Image URLs for one photo group, cover first.
 *
 * An unknown name yields an empty array, which leaves the product on its
 * generated placeholder cover rather than breaking the page.
 */
export function imageGroup(name: string): string[] {
  return GROUPS[name] ?? []
}
