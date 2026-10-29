// ============================================================
// Barrel — single import surface for all portfolio content.
//
// Pages and components import from `@/lib/portfolio-data` instead of
// reaching into `./content/*` directly. This keeps the import paths
// stable when content files are renamed or split, and lets multiple
// agents edit content files in parallel without touching consumers.
//
// Pattern: types first, then data. Add a new content file by (1)
// declaring its exports in the right section below, (2) verifying a
// page actually consumes them — every re-export here must have at
// least one consumer in src/components/ or src/app/.
// ============================================================

// ── Types (shape of the content) ────────────────────────────────
export type {
  Project,
  ProjectCategory,
  ProjectTone,
  DeepDiveBlock,
  SkillCategory,
  AboutFacet,
  SoulItem,
  ServicePackage,
  BlogPost,
  BlogBlock,
} from './content/types';

// ── Data (the content itself) ───────────────────────────────────
export { PERSONAL_INFO } from './content/personal';
export { PROJECTS } from './content/projects';
export { SKILL_CATEGORIES } from './content/skills';
export {
  ABOUT_FACETS,
  SOUL_FUEL,
  NERD_OUTS,
  ENERGY_SOURCES,
  WORK_INTRO,
  STACK_INTRO,
} from './content/about';
export { SERVICES_INTRO, SERVICE_PACKAGES } from './content/services';
export { BLOG_POSTS } from './content/blog';
