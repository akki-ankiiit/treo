/**
 * Authentic TREO Construction logo (from treoconstruction.com), rendered as a
 * mask so it inherits the surrounding theme colour exactly like the previous
 * inline SVG symbol did.
 */
export default function TreoLogo({ variant = "mark", label = "TREO Construction" }) {
  return (
    <span
      className={`treo-logo treo-logo--${variant}`}
      role="img"
      aria-label={label}
    />
  );
}
