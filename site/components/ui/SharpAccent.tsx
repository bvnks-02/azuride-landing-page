/**
 * The signature sharp detail (design.md §4): a small 45°-rotated square
 * echoing the diamond core. Used as list bullet and active-nav indicator.
 */
export function SharpAccent({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block size-2 rotate-45 bg-accent ${className}`}
    />
  );
}
