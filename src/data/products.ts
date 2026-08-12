import type { Product } from '@/types/product'

/**
 * Product catalogue.
 *
 * Static for now — swap this module for an API call and the pages keep
 * working, since everything downstream depends on the `Product` type only.
 *
 * Images: every entry ships with an empty `images` array, so a generated
 * brand placeholder is rendered. Add real files under `src/assets/products/`,
 * import them, and list them here (first image is the cover).
 */
export const PRODUCTS: readonly Product[] = [
  {
    id: 'dll-templates',
    slug: 'editable-daily-lesson-log-templates',
    title: 'Editable Daily Lesson Log (DLL) Templates',
    images: [],
    description:
      'A complete set of Daily Lesson Log templates you can edit in Microsoft Word and Google Docs. Layouts follow the familiar weekly format, with sections for objectives, content standards, learning resources, procedures, remarks, and reflection. Designed to be printer-friendly in both A4 and Letter, so you can file hard copies without reformatting.',
    inclusions: [
      '5 weekly DLL layouts (Word + Google Docs)',
      'Separate versions for Kinder, Grades 1–6, and Junior High',
      'Editable header for school name, teacher, and section',
      'Printer-friendly A4 and Letter sizes',
      'Quick-start guide for editing in Google Docs',
    ],
    price: 249,
    category: 'Lesson Planning',
  },
  {
    id: 'class-record-tracker',
    slug: 'automated-class-record-and-grade-tracker',
    title: 'Automated Class Record & Grade Tracker',
    images: [],
    description:
      'A spreadsheet that computes written work, performance tasks, and quarterly assessment weights for you. Enter raw scores and the initial and transmuted grades update automatically, with a summary sheet you can use during card distribution. Works in Google Sheets and Microsoft Excel.',
    inclusions: [
      'Google Sheets template (make your own copy)',
      'Microsoft Excel version (.xlsx)',
      'Automatic weighted computation per component',
      'Class summary and per-learner breakdown sheets',
      'Attendance tracker with monthly totals',
      'Video walkthrough on setting up your class list',
    ],
    price: 299,
    category: 'Teacher Forms',
  },
  {
    id: 'bulletin-board-kit',
    slug: 'printable-bulletin-board-decor-kit',
    title: 'Printable Bulletin Board & Classroom Decor Kit',
    images: [],
    description:
      'Everything you need to set up a bright, coordinated classroom display without buying new materials every quarter. Print on A4 bond paper or cartolina, cut, and post. The set keeps one colour palette across all pieces so your bulletin boards look put together all year.',
    inclusions: [
      'Alphabet, number, and shape charts',
      'Classroom rules and daily routine posters',
      'Weather chart, calendar set, and birthday board',
      "Editable name tags and 'Star of the Week' frames",
      'Bulletin board headers for all four quarters',
      'PDF (print-ready) + Canva template links',
    ],
    price: 349,
    category: 'Classroom Decor',
  },
  {
    id: 'primary-worksheets',
    slug: 'grades-1-3-worksheet-mega-pack',
    title: 'Grades 1–3 Worksheet Mega Pack',
    images: [],
    description:
      'Ready-to-print practice sheets for Filipino, English, and Mathematics in the primary grades. Each set moves from guided practice to independent work, so the same worksheet can serve both your fast finishers and learners who need more repetition. Answer keys are included to cut your checking time.',
    inclusions: [
      '120+ worksheets across Filipino, English, and Math',
      'Marungko-aligned beginning reading sheets',
      'Number sense, addition, and subtraction drills',
      'Answer keys for every worksheet',
      'Black-and-white layouts to save on ink',
      'PDF format, A4 and Letter',
    ],
    price: 399,
    category: 'Worksheets',
  },
  {
    id: 'interactive-ppt-games',
    slug: 'interactive-powerpoint-classroom-games',
    title: 'Interactive PowerPoint Classroom Games',
    images: [],
    description:
      'Turn review sessions into something learners actually look forward to. These PowerPoint games run on any laptop with a projector or smart TV, no internet needed once downloaded. Replace the sample questions with your own and the animations, scoring, and sound effects keep working.',
    inclusions: [
      '10 game templates (Jeopardy-style, Wheel, Memory, and more)',
      'Fully editable questions and answers',
      'Built-in timers, scoreboards, and sound effects',
      'Works offline in PowerPoint 2016 and newer',
      'Tutorial on replacing questions safely',
    ],
    price: 279,
    category: 'Presentations',
  },
  {
    id: 'ipcrf-portfolio',
    slug: 'ipcrf-portfolio-and-mov-organizer',
    title: 'IPCRF Portfolio & MOV Organizer',
    images: [],
    description:
      'A clean, consistent portfolio layout for organising your Means of Verification. Dividers, cover pages, and annotation templates are laid out so each objective has a clear place, which makes review and submission far less stressful at the end of the school year.',
    inclusions: [
      'Portfolio cover pages and spine labels',
      'Dividers and tabs for each objective',
      'MOV annotation templates with guide questions',
      'Checklist for tracking completed objectives',
      'Editable in Word, PowerPoint, and Canva',
    ],
    price: 249,
    category: 'Teacher Forms',
  },
  {
    id: 'certificate-templates',
    slug: 'editable-certificate-template-bundle',
    title: 'Editable Certificate Template Bundle',
    images: [],
    description:
      'Recognition certificates for every occasion in the school calendar, from quarterly awarding to recognition rites and moving up ceremonies. Type the learner name, adjust the signatories, and print. Borders are designed to stay crisp even on ordinary bond paper.',
    inclusions: [
      '30 certificate designs (landscape and portrait)',
      'Perfect Attendance, Academic Excellence, and Character awards',
      'Blank layouts for custom award titles',
      'Editable signatory blocks for up to three signatures',
      'PDF + Canva + PowerPoint versions',
    ],
    price: 199,
    category: 'Classroom Decor',
  },
  {
    id: 'teacher-planner',
    slug: 'digital-teacher-planner',
    title: 'Digital Teacher Planner',
    images: [],
    description:
      'A hyperlinked planner for teachers who work from a tablet. Jump between the yearly overview, monthly spreads, and weekly plans with a tap, and keep your class lists, seat plans, and meeting notes in the same file. Built for GoodNotes and Notability, and printable if you prefer paper.',
    inclusions: [
      'Undated yearly, monthly, and weekly spreads',
      'Hyperlinked tabs for fast navigation',
      'Class list, seat plan, and parent contact pages',
      'Meeting notes and professional development log',
      'Works in GoodNotes, Notability, and other PDF annotators',
      'Printable version included',
    ],
    price: 329,
    category: 'Planners',
  },
]
