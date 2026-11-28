"use client"

import { Fragment, useEffect, useMemo, useRef } from "react"

import { cn } from "@/lib/utils"

export type HighlighterTextProps = {
  /** The full text. */
  text: string
  /** Words or short phrases to mark, matched without case or punctuation. */
  highlight?: string[]
  /** Color of the marker. */
  color?: string
  /** Color of the marked words while the marker is behind them. Used by the "full" variant. */
  markedTextColor?: string
  /** "full" covers the whole word, "underline" draws a stroke along its lower half. */
  variant?: "full" | "underline"
  /** Milliseconds the pen spends on each letter. */
  pace?: number
  /** Milliseconds before the first stroke starts. */
  delay?: number
  /** Draw only the first time the words enter the viewport. */
  once?: boolean
  className?: string
}

type Token = {
  lead: string
  core: string
  tail: string
  marked: boolean
  joins: boolean
  run: number
  offset: number
}

const OVERHANG = 0.14
const SEPARATOR = "\u0000"
const HIDDEN = "inset(-30% 100% -30% 0)"
const SHOWN = "inset(-30% 0% -30% 0)"

function noise(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const clean = (word: string) =>
  word.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "")

function tokenize(text: string, phrases: string[]) {
  const words = text.split(/\s+/).filter(Boolean)
  const cleaned = words.map(clean)
  const marked = words.map(() => false)
  for (const phrase of phrases) {
    const parts = phrase.split(/\s+/).map(clean).filter(Boolean)
    if (!parts.length) continue
    for (let i = 0; i + parts.length <= words.length; i++) {
      if (parts.every((part, k) => cleaned[i + k] === part)) {
        for (let k = 0; k < parts.length; k++) marked[i + k] = true
      }
    }
  }
  let run = -1
  let drawn = 0
  return words.map((word, i): Token => {
    const joins = marked[i] && Boolean(marked[i + 1])
    if (marked[i] && !marked[i - 1]) {
      run++
      drawn = 0
    }
    const edges = /^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/u.exec(word)
    const lead = marked[i] && !marked[i - 1] ? (edges?.[1] ?? "") : ""
    const tail = marked[i] && !joins ? (edges?.[3] ?? "") : ""
    const core = word.slice(lead.length, word.length - tail.length)
    const offset = drawn
    drawn += Array.from(core).length + 1
    return { lead, core, tail, marked: marked[i], joins, run, offset }
  })
}

type Band = {
  seed: number
  from: number
  letters: number
  top: number
  bottom: number
  wobble: number
  openLeft: boolean
  openRight: boolean
}

function curve(points: [number, number][]) {
  let d = ""
  for (let i = 0; i < points.length - 1; i++) {
    const [x, y] = points[i]
    const [nx, ny] = points[i + 1]
    d += ` Q ${x.toFixed(1)} ${y.toFixed(1)} ${((x + nx) / 2).toFixed(1)} ${((y + ny) / 2).toFixed(1)}`
  }
  const [lx, ly] = points[points.length - 1]
  return `${d} L ${lx.toFixed(1)} ${ly.toFixed(1)}`
}

function bandPath({
  seed,
  from,
  letters,
  top,
  bottom,
  wobble,
  openLeft,
  openRight,
}: Band) {
  const steps = letters + 1
  const upper: [number, number][] = []
  const lower: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * 100
    upper.push([
      i === 0 && !openLeft ? 3 + noise(seed + 1) * 2 : x,
      top + noise(seed + from + i) * wobble,
    ])
    lower.push([
      i === steps && !openRight ? 96.5 - noise(seed + 2) * 2 : x,
      bottom - noise(seed + 50 + from + i) * wobble,
    ])
  }
  lower.reverse()
  return `M ${upper[0][0].toFixed(1)} ${upper[0][1].toFixed(1)}${curve(upper)} L ${lower[0][0].toFixed(1)} ${lower[0][1].toFixed(1)}${curve(lower)} Z`
}

/** Marker stroke behind chosen words when they scroll into view. */
export function HighlighterText({
  text = "",
  highlight = [],
  color = "#ff784f",
  markedTextColor = "#070606",
  variant = "full",
  pace = 34,
  delay = 150,
  once = true,
  className,
}: HighlighterTextProps) {
  const root = useRef<HTMLSpanElement>(null)
  const phrasesKey = highlight.join(SEPARATOR)
  const tokens = useMemo(
    () => tokenize(text, phrasesKey.split(SEPARATOR)),
    [text, phrasesKey]
  )

  useEffect(() => {
    const el = root.current
    if (!el) return
    const wipes = Array.from(el.querySelectorAll<HTMLElement>("[data-wipe]"))
    if (!wipes.length) return

    wipes.forEach((wipe) => {
      wipe.style.clipPath = HIDDEN
    })
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wipes.forEach((wipe) => {
        wipe.style.clipPath = "none"
      })
      return
    }

    const runs = new Map<string, HTMLElement[]>()
    wipes.forEach((wipe) => {
      const key = wipe.dataset.wipe ?? ""
      runs.set(key, [...(runs.get(key) ?? []), wipe])
    })

    const playing = new Map<string, Animation[]>()
    let penFreeAt = 0

    const draw = (key: string, group: HTMLElement[]) => {
      const now = performance.now()
      let at = Math.max(now + delay, penFreeAt) - now
      const animations = group.map((wipe, i) => {
        const letters = Number(wipe.dataset.letters) || 1
        const time =
          Math.max(90, letters * Math.max(5, pace)) +
          (i === group.length - 1 ? 90 : 0)
        const first = i === 0
        const last = i === group.length - 1
        const easing =
          first && last
            ? "cubic-bezier(0.4, 0, 0.3, 1)"
            : first
              ? "cubic-bezier(0.5, 0, 1, 1)"
              : last
                ? "cubic-bezier(0, 0, 0.3, 1)"
                : "linear"
        wipe.style.clipPath = SHOWN
        const animation = wipe.animate(
          [{ clipPath: HIDDEN }, { clipPath: SHOWN }],
          { duration: time, delay: at, easing, fill: "backwards" }
        )
        at += time
        return animation
      })
      playing.set(key, animations)
      penFreeAt = now + at + 140
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key = (entry.target as HTMLElement).dataset.mark ?? ""
          const group = runs.get(key)
          if (!group) continue
          if (entry.isIntersecting && !playing.has(key)) {
            draw(key, group)
            if (once) observer.unobserve(entry.target)
          } else if (!entry.isIntersecting && !once && playing.has(key)) {
            playing.get(key)?.forEach((animation) => animation.cancel())
            playing.delete(key)
            group.forEach((wipe) => {
              wipe.style.clipPath = HIDDEN
            })
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    )
    el.querySelectorAll("[data-mark]").forEach((node) => observer.observe(node))

    return () => {
      observer.disconnect()
      playing.forEach((animations) =>
        animations.forEach((animation) => animation.cancel())
      )
    }
  }, [tokens, pace, delay, once])

  return (
    <span ref={root} className={cn(className)}>
      {tokens.map((token, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          {token.marked ? (
            <span className="whitespace-nowrap">
              {token.lead}
              <Mark
                token={token}
                index={i}
                color={color}
                markedTextColor={markedTextColor}
                variant={variant}
                first={i === 0 || !tokens[i - 1]!.marked}
              />
              {token.tail}
            </span>
          ) : (
            token.core
          )}
        </Fragment>
      ))}
    </span>
  )
}

function Mark({
  token,
  index,
  color,
  markedTextColor,
  variant,
  first,
}: {
  token: Token
  index: number
  color: string
  markedTextColor: string
  variant: "full" | "underline"
  first: boolean
}) {
  const letters = Array.from(token.core).length
  const seed = token.run * 37 + 11
  const full = variant === "full"
  const shape = {
    from: token.offset,
    letters,
    openLeft: !first,
    openRight: token.joins,
  }
  const right = token.joins ? 0.3 : OVERHANG
  const tilt =
    first && !token.joins
      ? `${((noise(index * 13 + 7) - 0.5) * 1.2).toFixed(2)}deg`
      : undefined

  return (
    <mark
      {...(first ? { "data-mark": String(token.run) } : null)}
      className="relative inline-block bg-transparent text-inherit"
    >
      {token.core}
      <span
        aria-hidden="true"
        data-wipe={token.run}
        data-letters={letters}
        className="pointer-events-none absolute inset-y-0 select-none"
        style={{ left: `-${OVERHANG}em`, right: `-${right}em`, clipPath: HIDDEN }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute start-0 w-full overflow-visible"
          style={{
            top: "50%",
            height: full ? "1.24em" : "0.42em",
            marginTop: full ? "-0.6em" : "0.16em",
            rotate: tilt,
          }}
        >
          <path
            d={bandPath({
              ...shape,
              seed,
              top: 0,
              bottom: 100,
              wobble: full ? 5 : 16,
            })}
            fill={color}
          />
          <path
            d={bandPath({
              ...shape,
              seed: seed + 200,
              top: 9,
              bottom: 30,
              wobble: 6,
            })}
            fill="#fff"
            opacity="0.1"
          />
          <path
            d={bandPath({
              ...shape,
              seed: seed + 300,
              top: 70,
              bottom: 90,
              wobble: 6,
            })}
            fill="#000"
            opacity="0.08"
          />
        </svg>
        <span
          className="absolute inset-y-0 whitespace-pre"
          style={{
            insetInlineStart: `${OVERHANG}em`,
            color: full ? markedTextColor : "inherit",
          }}
        >
          {token.core}
        </span>
      </span>
    </mark>
  )
}

export default HighlighterText