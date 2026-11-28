import type { LucideIcon } from "lucide-react"
import { HighlighterIcon, SparklesIcon, TypeIcon } from "lucide-react"

export type TextCategory = "highlight" | "reveal" | "motion"
export type TextPortStatus = "pending" | "ported"

export type TextCatalogEntry = {
  id: string
  category: TextCategory
  title: string
  description: string
  status: TextPortStatus
  featured?: boolean
  previewSize?: "default" | "compact"
}

export const TEXT_CATEGORIES = [
  "highlight",
  "reveal",
  "motion",
] as const satisfies readonly TextCategory[]

export const TEXT_CATEGORY_META: Record<
  TextCategory,
  { title: string; description: string; icon: LucideIcon }
> = {
  highlight: {
    title: "Highlight",
    description: "Markers, highlighters, and emphasis sweeps on live copy.",
    icon: HighlighterIcon,
  },
  reveal: {
    title: "Reveal",
    description: "Staggered lines, masks, and scroll or hover entrances.",
    icon: SparklesIcon,
  },
  motion: {
    title: "Motion",
    description: "Looping kinetic type, morphs, and playful micro-motion.",
    icon: TypeIcon,
  },
}

export const TEXT_FEATURED_IDS = new Set<string>([
  "highlighter-text",
  "scramble-text",
  "blur-text",
  "blur-reveal-text",
  "split-text",
  "masked-reveal",
  "true-focus",
  "shiny-text",
  "stroke-text",
  "gradient-text",
  "typewriter",
  "text-type",
  "falling-text",
  "rotating-text",
  "glitch-text",
  "scroll-velocity",
  "fuzzy-text",
  "ring-path-text",
  "ring-spin-text",
  "echo-text",
  "tech-text",
  "particle-text",
  "warp-text",
])

/** Sidebar spotlight group (hidden when empty). */
export const TEXT_SPOTLIGHT_IDS = [] as const

/** Sidebar “New” chip — recent or high-traffic ports. */
export const TEXT_NEW_BADGE_IDS = new Set<string>([
  "rotating-text",
  "falling-text",
  "scroll-velocity",
  "glitch-text",
  "gradient-text",
  "fuzzy-text",
  "text-type",
  "ring-path-text",
  "ring-spin-text",
])

export function isTextNewBadge(id: string): boolean {
  return TEXT_NEW_BADGE_IDS.has(id)
}

export function isTextSpotlight(id: string) {
  return (TEXT_SPOTLIGHT_IDS as readonly string[]).includes(id)
}

function textSpotlightRank(id: string): number {
  const index = (TEXT_SPOTLIGHT_IDS as readonly string[]).indexOf(id)
  return index === -1 ? Number.MAX_SAFE_INTEGER : index
}

export function compareTextCatalogOrder(
  a: TextCatalogEntry,
  b: TextCatalogEntry
): number {
  if (a.status !== b.status) {
    return a.status === "ported" ? -1 : 1
  }
  const ar = textSpotlightRank(a.id)
  const br = textSpotlightRank(b.id)
  if (ar !== br) return ar - br
  return a.title.localeCompare(b.title)
}

/** Free text animations shipped in the registry (MIT source). */
export const textCatalog: TextCatalogEntry[] = [
  {
    id: "highlighter-text",
    category: "highlight",
    title: "Highlighter Text",
    description:
      "A marker stroke draws behind the words you choose when they scroll into view, with an uneven hand-drawn edge and text that changes color under the pen.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "scramble-text",
    category: "reveal",
    title: "Scramble Text",
    description:
      "Text that decodes from random glyphs, left to right, on hover or focus.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "blur-text",
    category: "reveal",
    title: "Blur Text",
    description:
      "Simple scroll reveal: each word de-blurs and slides in (compact motion API).",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "blur-reveal-text",
    category: "reveal",
    title: "Blur Reveal Text",
    description:
      "Blurred copy resolves in with blur, zoom, tilt, drift, or focus effects and flexible triggers.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "split-text",
    category: "reveal",
    title: "Split Text",
    description:
      "Letters that spring into place one by one when the text scrolls into view.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "shiny-text",
    category: "highlight",
    title: "Shiny Text",
    description: "Text with a soft band of light that sweeps across it on a loop.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "scroll-velocity",
    category: "motion",
    title: "Scroll Velocity",
    description:
      "Dual marquees react to page scroll speed; drag to throw, optional fade edges and outline alternation.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "glitch-text",
    category: "motion",
    title: "Glitch Text",
    description:
      "Slice, RGB, scan, and noise glitch modes with jitter, flicker, and click-triggered bursts.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "rotating-text",
    category: "motion",
    title: "Rotating Text",
    description:
      "Auto-cycles phrases with 3D flip, slide, blur, scale, or drop; optional highlight chip and staggered glyphs.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "falling-text",
    category: "motion",
    title: "Falling Text",
    description:
      "Sentence shatters into physics bodies on hover, click, scroll, or auto; drag, swipe, and watch them snap back.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "gradient-text",
    category: "highlight",
    title: "Gradient Text",
    description:
      "Animated gradient fill with linear, flow, or conic variants plus optional glow and border.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "typewriter",
    category: "motion",
    title: "Typewriter",
    description:
      "Types a list of phrases one character at a time, deletes them and moves on, with a blinking caret (motion API).",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "text-type",
    category: "motion",
    title: "Text Type",
    description:
      "Cycles through sentences with GSAP cursor glide, selectable delete, typos, and optional character reveal effects.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "ring-path-text",
    category: "motion",
    title: "Ring Path Text",
    description:
      "SVG text on a circular path with hover speed-up, pause, or reverse (compact API).",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "ring-spin-text",
    category: "motion",
    title: "Ring Spin Text",
    description:
      "DOM characters around a spinning ring with drag, tilt, hover modes, and optional center content.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "true-focus",
    category: "reveal",
    title: "True Focus",
    description:
      "A sentence where one word at a time is sharp, framed by corner brackets that glide from word to word.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "echo-text",
    category: "motion",
    title: "Echo Text",
    description:
      "Outlined echoes that breathe on a loop and lean toward the pointer (motion-based, compact API).",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "masked-reveal",
    category: "reveal",
    title: "Masked Reveal",
    description:
      "A multi-line heading whose lines slide up from behind a mask, then an accent line draws in underneath.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "stroke-text",
    category: "highlight",
    title: "Stroke Text",
    description:
      "Outlined text that fills with color on hover or focus, sweeping in from the left, the bottom or the center.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "tech-text",
    category: "motion",
    title: "Tech Text",
    description:
      "A wordmark whose letters turn into dashed vector paths under the cursor.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "particle-text",
    category: "motion",
    title: "Particle Text",
    description:
      "Text assembles from drifting particles that scatter and reform on demand.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "fuzzy-text",
    category: "motion",
    title: "Fuzzy Text",
    description:
      "Canvas-rendered type that jitters with adjustable base and hover intensity, intro burst, and optional RGB split.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
  {
    id: "warp-text",
    category: "motion",
    title: "Warp Text",
    description: "WebGL warp that bends and refracts the text around the pointer.",
    status: "ported",
    featured: true,
    previewSize: "compact",
  },
]

export function isTextCategory(value: string): value is TextCategory {
  return (TEXT_CATEGORIES as readonly string[]).includes(value)
}

export function isTextFeatured(id: string): boolean {
  return TEXT_FEATURED_IDS.has(id)
}

export function getTextCategoryIcon(category: TextCategory): LucideIcon {
  return TEXT_CATEGORY_META[category].icon
}

export function getTextEntry(id: string): TextCatalogEntry | undefined {
  return textCatalog.find((e) => e.id === id)
}

export function getTextByCategory(
  category: TextCategory
): TextCatalogEntry[] {
  return textCatalog.filter((e) => e.category === category)
}

export function textHref(id: string): string {
  return `/text/${id}`
}

export function textCategoryHref(category: TextCategory): string {
  return `/text/${category}`
}

export function getTextAdjacent(id: string): {
  previous: TextCatalogEntry | null
  next: TextCatalogEntry | null
} {
  const ported = [...textCatalog]
    .filter((e) => e.status === "ported")
    .sort(compareTextCatalogOrder)
  const index = ported.findIndex((e) => e.id === id)
  if (index < 0) return { previous: null, next: null }
  return {
    previous: ported[index - 1] ?? null,
    next: ported[index + 1] ?? null,
  }
}