import {
  compareTextCatalogOrder,
  TEXT_SPOTLIGHT_IDS,
  textCatalog,
  textHref,
  isTextFeatured,
  isTextNewBadge,
} from "@/lib/text-catalog"

export type TextNavPage = {
  id: string
  title: string
  href: string
  featured?: boolean
  status: "pending" | "ported"
  badge?: "new"
}

export type TextNavGroup = {
  title: string
  pages: TextNavPage[]
}

/** Spotlight group — first in the sidebar (no heading). */
export const TEXT_FEATURED_GROUP = "Featured"

function mapNavPage(
  entry: (typeof textCatalog)[number]
): TextNavPage {
  return {
    id: entry.id,
    title: entry.title,
    href: textHref(entry.id),
    featured: isTextFeatured(entry.id),
    status: entry.status,
    badge: isTextNewBadge(entry.id) ? "new" : undefined,
  }
}

const allTextPages: TextNavPage[] = [...textCatalog]
  .sort(compareTextCatalogOrder)
  .map(mapNavPage)

const pageById = new Map(allTextPages.map((page) => [page.id, page]))

const featuredTextPages: TextNavPage[] = TEXT_SPOTLIGHT_IDS.map((id) => {
  const page = pageById.get(id)
  if (!page) {
    throw new Error(`Missing text spotlight page: ${id}`)
  }
  return page
})

/** Sidebar + index for `/text` — flat list (optional spotlight group when ids are set). */
export const textNav: {
  top: { title: string; href: string }[]
  groups: TextNavGroup[]
} = {
  top: [{ title: "All text", href: "/text" }],
  groups: [
    ...(featuredTextPages.length > 0
      ? [
          {
            title: TEXT_FEATURED_GROUP,
            pages: featuredTextPages,
          },
        ]
      : []),
    {
      title: "",
      pages: allTextPages,
    },
  ],
}

export function getTextPages(): TextNavPage[] {
  return allTextPages.filter((page) => page.status === "ported")
}

export function getTextCurrentLabel(pathname: string): string | null {
  if (pathname === "/text") return "Text"

  if (pathname.startsWith("/text/")) {
    const id = pathname.startsWith("/text/view/")
      ? pathname.slice("/text/view/".length)
      : pathname.slice("/text/".length)
    if (isTextCategoryRouteSegment(id)) return null
    return textCatalog.find((e) => e.id === id)?.title ?? "Text effect"
  }

  return null
}

function isTextCategoryRouteSegment(segment: string): boolean {
  return (
    segment === "highlight" ||
    segment === "reveal" ||
    segment === "motion"
  )
}

export function getTextAdjacent(pathname: string): {
  previous: { href: string; title: string } | null
  next: { href: string; title: string } | null
} {
  if (!pathname.startsWith("/text/")) {
    return { previous: null, next: null }
  }
  const id = pathname.startsWith("/text/view/")
    ? pathname.slice("/text/view/".length)
    : pathname.slice("/text/".length)

  const pages = getTextPages().filter((p) => p.status === "ported")
  const index = pages.findIndex((p) => p.id === id)
  if (index < 0) return { previous: null, next: null }

  const previous = index > 0 ? pages[index - 1]! : null
  const next = index < pages.length - 1 ? pages[index + 1]! : null

  return {
    previous: previous
      ? { href: previous.href, title: previous.title }
      : null,
    next: next ? { href: next.href, title: next.title } : null,
  }
}

export function getTextNavStats() {
  const ported = textCatalog.filter((e) => e.status === "ported").length
  return { total: textCatalog.length, ported }
}