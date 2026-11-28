import {
  DocsAdjacentPager,
  type DocsAdjacentLink,
} from "@/components/docs/docs-adjacent-pager"
import { textHref, type TextCatalogEntry } from "@/lib/text-catalog"
import { cn } from "@/lib/utils"

function toLink(
  entry: TextCatalogEntry | null | undefined
): DocsAdjacentLink | undefined {
  if (!entry) return undefined
  return { href: textHref(entry.id), title: entry.title }
}

export function TextViewPager({
  previous,
  next,
  className,
}: {
  previous?: TextCatalogEntry | null
  next?: TextCatalogEntry | null
  className?: string
}) {
  return (
    <DocsAdjacentPager
      previous={toLink(previous)}
      next={toLink(next)}
      className={cn("hidden lg:flex", className)}
    />
  )
}