type TextModule = Record<string, unknown>
type DemoLoader = () => Promise<TextModule>

/** Stable map, do not recreate inside a function (breaks effect deps). */
const LOADERS: Record<string, DemoLoader> = {
  "highlighter-text": () => import("./highlighter-text/demo"),
  "scramble-text": () => import("./scramble-text/demo"),
  "blur-text": () => import("./blur-text/demo"),
  "blur-reveal-text": () => import("./blur-reveal-text/demo"),
  "split-text": () => import("./split-text/demo"),
  "shiny-text": () => import("./shiny-text/demo"),
  typewriter: () => import("./typewriter/demo"),
  "text-type": () => import("./text-type/demo"),
  "ring-path-text": () => import("./ring-path-text/demo"),
  "ring-spin-text": () => import("./ring-spin-text/demo"),
  "true-focus": () => import("./true-focus/demo"),
  "echo-text": () => import("./echo-text/demo"),
  "masked-reveal": () => import("./masked-reveal/demo"),
  "stroke-text": () => import("./stroke-text/demo"),
  "tech-text": () => import("./tech-text/demo"),
  "particle-text": () => import("./particle-text/demo"),
  "warp-text": () => import("./warp-text/demo"),
  "fuzzy-text": () => import("./fuzzy-text/demo"),
  "gradient-text": () => import("./gradient-text/demo"),
  "falling-text": () => import("./falling-text/demo"),
  "rotating-text": () => import("./rotating-text/demo"),
  "glitch-text": () => import("./glitch-text/demo"),
  "scroll-velocity": () => import("./scroll-velocity/demo"),
}

const moduleCache = new Map<string, Promise<TextModule>>()

export function getTextDemoLoader(id: string): DemoLoader | null {
  return LOADERS[id] ?? null
}

export function loadTextDemoModule(id: string): Promise<TextModule> | null {
  const load = LOADERS[id]
  if (!load) return null
  let pending = moduleCache.get(id)
  if (!pending) {
    pending = load()
    moduleCache.set(id, pending)
  }
  return pending
}

export function prefetchTextDemo(id: string): void {
  void loadTextDemoModule(id)
}