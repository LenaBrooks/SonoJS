import { textCatalog, type TextCategory } from "@/lib/text-catalog"

export const TEXT_GALLERY_ACTIVE_EVENT = "sonojs:text-gallery-active"

export function textGallerySectionId(category: TextCategory): string {
  return `text-type-${category}`
}

export function textGalleryHref(category: TextCategory): string {
  return `/text#${textGallerySectionId(category)}`
}

/** Thumbs live at `public/images/text/<id>.png` — keep id in sync with catalog. */
const TEXT_THUMB_IDS = new Set(
  textCatalog.filter((e) => e.status === "ported").map((e) => e.id)
)

export function textThumbSrc(id: string) {
  if (!TEXT_THUMB_IDS.has(id)) return undefined
  return `/images/text/${id}.png`
}