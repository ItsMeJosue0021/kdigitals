export interface NavItem {
  /** Stable identifier, also used as the React list key. */
  id: string;
  /** Visible link text. */
  label: string;
  /** Destination. Swap for a route path once a router is introduced. */
  href: string;
}
