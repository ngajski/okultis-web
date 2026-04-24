/**
 * Fixed grain + vignette overlay. Rendered once at the root so every page
 * sits on the same warm-ink atmosphere. All effects come from the
 * `.atmosphere` class in index.css.
 */
export default function Atmosphere() {
  return <div className="atmosphere" aria-hidden="true" />
}
