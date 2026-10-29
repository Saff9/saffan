// Twitter card image — served at /twitter-image by Next.js metadata
// route. Mirrors the Open Graph image so the same notebook-design share
// card renders on Twitter/X, LinkedIn, and any client reading the
// twitter:image meta tag. Re-exporting keeps the two visuals in lockstep
// (no risk of one drifting from the other) at the cost of an extra
// metadata-route entry.
export { default, alt, size, contentType } from './opengraph-image';
