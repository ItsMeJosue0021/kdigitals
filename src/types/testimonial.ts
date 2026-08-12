export interface Testimonial {
  id: string
  /** Reviewer name as it should be displayed. */
  name: string
  /** Teaching role, e.g. "Grade 3 Teacher". */
  role: string
  /** City or province only — never a full address. */
  location: string
  quote: string
  /** Whole stars, 1–5. */
  rating: number
  /** Title of the product being reviewed. */
  product: string
}
