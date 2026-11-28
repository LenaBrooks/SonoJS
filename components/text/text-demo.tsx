"use client"

import * as React from "react"

import { LoadingRing } from "@/components/sono-loader"
import { cn } from "@/lib/utils"
import { getTextEntry } from "@/lib/text-catalog"
import { getTextDemoLoader } from "@/registry/text/demo-loaders"

const STAGE_CLASS = "relative w-full min-w-0"
const STAGE_LOADING_MIN_DEFAULT = "min-h-[28rem] sm:min-h-[32rem]"
const STAGE_LOADING_MIN_COMPACT = "min-h-[14rem]"

type TextModule = Record<string, unknown>

function resolveDemo(mod: TextModule): React.ComponentType | null {
  const Comp =
    ("default" in mod && mod.default) ||
    Object.values(mod).find((value) => typeof value === "function")
  if (!Comp || typeof Comp !== "function") return null
  return Comp as React.ComponentType
}

export function TextDemo({ id }: { id: string }) {
  const load = getTextDemoLoader(id)

  if (!load) {
    return (
      <p className="text-sm text-destructive">No loader for this text effect.</p>
    )
  }

  const compact = getTextEntry(id)?.previewSize === "compact"

  return <TextDemoLoader key={id} load={load} compact={compact} />
}

function TextDemoSplash({ active }: { active: boolean }) {
  const [gone, setGone] = React.useState(false)

  React.useEffect(() => {
    if (active) setGone(false)
  }, [active])

  if (gone) return null

  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 ease-out",
        active ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      role="status"
      aria-label="Loading demo"
      aria-hidden={!active}
      onTransitionEnd={(event) => {
        if (event.propertyName === "opacity" && !active) {
          setGone(true)
        }
      }}
    >
      <LoadingRing size={40} showLabel label="Loading…" />
    </div>
  )
}

function TextDemoLoader({
  load,
  compact = false,
}: {
  load: () => Promise<TextModule>
  compact?: boolean
}) {
  const [Demo, setDemo] = React.useState<React.ComponentType | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [revealed, setRevealed] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    setDemo(null)
    setError(null)
    setRevealed(false)

    load()
      .then((mod) => {
        if (cancelled) return
        const Comp = resolveDemo(mod)
        if (!Comp) {
          setError("Demo export not found.")
          return
        }
        setDemo(() => Comp)
        requestAnimationFrame(() => {
          if (!cancelled) setRevealed(true)
        })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : "Failed to load demo.")
      })

    return () => {
      cancelled = true
    }
  }, [load])

  const loadingMin = compact
    ? STAGE_LOADING_MIN_COMPACT
    : STAGE_LOADING_MIN_DEFAULT

  return (
    <div className={cn(STAGE_CLASS, !Demo && !error && loadingMin)}>
      <TextDemoSplash active={!revealed && !error} />
      {error ? (
        <p className="p-6 text-sm text-destructive">{error}</p>
      ) : Demo ? (
        <Demo />
      ) : null}
    </div>
  )
}