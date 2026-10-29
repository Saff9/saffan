import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// ──────────────────────────────────────────────────────────────────────────
// ESLint policy
// ──────────────────────────────────────────────────────────────────────────
// Default = ON. Real bugs (unused vars, `any`, unreachable code, missing
// const, undefined globals) MUST surface in `bun run lint` and CI.
//
// The list of `off` rules below is the minimum set that genuinely conflicts
// with this codebase — each entry has a one-line justification. Do NOT add
// `off` rules here to "make lint pass"; fix the source instead. See
// `CODE-QUALITY-REPORT.md` §"Lint config disables ~25 rules" for the audit
// that motivated this cleanup.
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // ── Legitimately disabled (project-specific) ──────────────────────
      // Hash-router handlers (`useRouter().navigate`) read deps from a
      // closure but the rule can't see them — false positives on every
      // `useEffect` that wires the popstate listener.
      "react-hooks/exhaustive-deps": "off",
      // Newer rule (eslint-plugin-react-hooks v5+); not yet stable enough
      // to enforce on this codebase.
      "react-hooks/purity": "off",
      // Notebook voice uses contractions ("I'm", "don't") and em-dashes in
      // literal JSX text everywhere; escaping each one hurts readability.
      "react/no-unescaped-entities": "off",
      // Components are named via `export function X()` — display name is
      // implicit. TS + the `export` keyword already give us the guarantee.
      "react/display-name": "off",
      // TS project — `propTypes` is a JS-only concept.
      "react/prop-types": "off",
      // React Compiler is not enabled on this project; its rule's warnings
      // are advisory, not actionable yet.
      "react-compiler/react-compiler": "off",
      // `<img src="/logo.svg">` is intentional — the brand mark is an
      // inline SVG that doesn't benefit from `next/image` optimization.
      "@next/next/no-img-element": "off",
      // App Router project — the `pages/` directory doesn't exist, so the
      // rule's premise (`<a href="/page">` inside `pages/`) never applies.
      "@next/next/no-html-link-for-pages": "off",
      // `@ts-expect-error` is the right tool when consuming a third-party
      // type that's slightly wrong; banning the directive entirely is too
      // strict. (Each usage should still be commented with the reason.)
      "@typescript-eslint/ban-ts-comment": "off",
      // `as const` on a literal that's already inferred as const is noise;
      // the rule fires on patterns like `let x = 'a' as const` that we don't
      // use, but leaving it off keeps the config small.
      "@typescript-eslint/prefer-as-const": "off",
      // Allow unused `eslint-disable` directives during refactor windows —
      // we'd rather not break the build for a directive that becomes stale
      // after a fix. (Periodic `--report-unused-disable-directives` sweeps
      // can be run manually.)
      "@typescript-eslint/no-unused-disable-directive": "off",
      // Diagnostic `console.*` calls are sometimes left in place during
      // iterative dev (this is a portfolio, not a library); the next
      // `no-debugger` rule catches the actually-dangerous case.
      "no-console": "off",
      // Empty `catch (e) {}` blocks are occasionally intentional when we
      // genuinely don't care about a thrown value (e.g. `JSON.parse` on
      // untrusted input); a comment is the right fix, not a rule.
      "no-empty": "off",
      // Switch fallthrough is sometimes intentional in this codebase's
      // small dispatch tables; each intentional fallthrough is commented.
      "no-fallthrough": "off",
      // `let x; if (...) x = 1; else x = 2;` — sometimes clearer than a
      // ternary when the branches are long. Rare; left off to avoid churn.
      "no-case-declarations": "off",
      // Re-declaration is a TS error already; the JS rule is redundant in
      // a `.ts`/`.tsx` project and only fires on `.js` config files.
      "no-redeclare": "off",
      // Escapes inside regex/string literals that look "useless" to the
      // rule but are intentional (e.g. `\/` in a regex char class) would
      // otherwise need `// eslint-disable-line` noise.
      "no-useless-escape": "off",
      // Irregular whitespace (NBSP, zero-width) slips in via copy-paste
      // from design tools; the rule is too noisy on this design-heavy
      // codebase. `tsc` + Prettier catch the actually-breaking cases.
      "no-irregular-whitespace": "off",

      // ── Explicitly ENABLED (the safety net) ───────────────────────────
      // These were blanket-off before — see CODE-QUALITY-REPORT.md. They
      // are now ON so `bun run lint` actually catches the bugs it should.
      // (No entry here = the rule's default from `next/core-web-vitals` /
      // `next/typescript` applies, which is what we want for the rest.)
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "examples/**",
      "skills",
    ],
  },
];

export default eslintConfig;
