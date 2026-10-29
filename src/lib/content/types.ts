// ============================================================
// Shared types for portfolio content.
//
// Every content file in this folder (projects.ts, skills.ts,
// services.ts, blog.ts, about.ts, personal.ts) imports the
// interfaces it needs from here. Edit this file when you need
// to change the SHAPE of a content entry — not the values.
// ============================================================

/**
 * Narrative tone for a project's case-study layout. The Work detail
 * page picks one of four layouts based on this value, so the union
 * must stay in sync with `src/components/pages/work-detail/layouts.tsx`.
 */
export type ProjectTone = 'deep' | 'essay' | 'results' | 'problem';

/**
 * One block of an optional long-form "deep dive" section on a project.
 * `heading` + `body` always render; `code` renders only when provided.
 */
export interface DeepDiveBlock {
  heading: string;
  body: string;
  code?: { lang: string; code: string };
}

/**
 * A single project entry. Drives both the Work grid card and the
 * Work detail page. `slug` becomes the URL hash (#/work/<slug>).
 */
export interface Project {
  id: string;
  title: string;
  slug: string; // unique — used in the URL hash
  tagline: string; // one-line summary on the grid card
  tone: ProjectTone; // picks the detail-page layout
  category: ProjectCategory;
  year: string;
  fullStory: string; // opening paragraph on the detail page
  problemStatement: string;
  solution: string;
  architectureDetails: string[]; // bullet list of implementation notes
  deepDive?: DeepDiveBlock[]; // optional long-form sections
  metrics: { label: string; value: string; note: string }[];
  techStack: string[]; // also feeds the TechGlyph icon map
  githubUrl: string;
  liveUrl?: string;
  highlights: string[]; // 3-5 "what shipped" bullets
  challenges: string[]; // 2-3 "what was hard" bullets
}

/**
 * Coarse grouping shown as filter pills on the Work page. Add a new
 * value here AND on the WorkPage filter bar when introducing a new
 * project type.
 */
export type ProjectCategory =
  | 'Full-Stack & Platforms'
  | 'AI & Autonomous Agents';

/**
 * One skill-grouping row on the Stack page (e.g. "Frontend", "Backend").
 */
export interface SkillCategory {
  name: string;
  blurb: string;
  skills: {
    name: string;
    /**
     * Proficiency label. NOTE: the data in skills.ts currently uses
     * 'Advanced', 'Intermediate', and 'Beginner'. The narrower union
     * below ('Expert' | 'Advanced' | 'Proficient') is a pre-existing
     * mismatch kept for compatibility with StackPage.tsx's local
     * `Level` type. See worklog Task C2.
     */
    level: 'Expert' | 'Advanced' | 'Proficient' | 'Intermediate' | 'Beginner';
    years: string; // e.g. "2 yrs"
    note: string; // one-line context
    shipped: string[]; // project titles this skill was used on
  }[];
}

/**
 * One "how I work / what I build" row on the About page.
 */
export interface AboutFacet {
  role: string; // left-column label, e.g. "How I work"
  blurb: string; // right-column body
}

/**
 * A small titled blurb used across the About page's "soul fuel",
 * "nerd outs", and "energy sources" lists. Same shape, three lists.
 */
export interface SoulItem {
  title: string;
  body: string;
}

/**
 * One pricing tier on the Services page. `highlighted` marks the
 * recommended package (renders with an accent border).
 */
export interface ServicePackage {
  id: string;
  name: string;
  price: string; // display string, e.g. "5k" or "let's talk"
  tagline: string; // short qualifier under the name
  blurb: string; // one-line description
  features: string[]; // checklist bullets
  highlighted: boolean; // accent styling for the recommended tier
  cta: string; // button label
}

/**
 * One block of a blog post's body. Discriminated by `type` so the
 * renderer can switch on it. Mirrored inline in blog.ts so the blog
 * file can be edited without reaching back here — keep them in sync.
 */
export interface BlogBlock {
  type: 'paragraph' | 'heading' | 'code' | 'quote' | 'list';
  text?: string; // for paragraph / heading / quote
  lang?: string; // for code blocks
  code?: string; // for code blocks
  items?: string[]; // for list blocks
}

/**
 * One blog post. `slug` becomes the URL hash (#/blog/<slug>).
 */
export interface BlogPost {
  slug: string; // unique — used in the URL hash
  title: string;
  dek: string; // subtitle / dek under the title
  date: string; // ISO date (YYYY-MM-DD)
  readTime: string; // e.g. "5 min"
  tags: string[];
  body: BlogBlock[];
}
