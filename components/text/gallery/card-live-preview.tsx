"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  getTextDemoLoader,
  loadTextDemoModule,
} from "@/registry/text/demo-loaders"

type TextModule = Record<string, unknown>

function resolveDemo(mod: TextModule): React.ComponentType | null {
  const Comp =
    ("default" in mod && mod.default) ||
    Object.values(mod).find((value) => typeof value === "function")
  if (!Comp || typeof Comp !== "function") return null
  return Comp as React.ComponentType
}

export function CardLivePreview({
  id,
  className,
  onReady,
}: {
  id: string
  className?: string
  onReady?: () => void
}) {
  const [Demo, setDemo] = React.useState<React.ComponentType | null>(null)
  const onReadyRef = React.useRef(onReady)
  onReadyRef.current = onReady

  React.useEffect(() => {
    let cancelled = false
    const pending = loadTextDemoModule(id)
    if (!pending) return

    pending
      .then((mod) => {
        if (cancelled) return
        const Comp = resolveDemo(mod)
        if (!Comp) return
        setDemo(() => Comp)
      })
      .catch(() => {
        /* icon fallback remains */
      })

    return () => {
      cancelled = true
    }
  }, [id])

  React.useEffect(() => {
    if (Demo) onReadyRef.current?.()
  }, [Demo])

  if (!getTextDemoLoader(id)) return null

  return (
    <div
      aria-hidden
      data-sono-text-thumb=""
      className={cn(
        "absolute inset-0 overflow-hidden",
        "[&>div]:h-full! [&>div]:min-h-0! [&>div]:max-h-full!",
        "[&>div]:bg-transparent!",
        className
      )}
    >
      <style>{`
        [data-sono-text-thumb] p,
        [data-sono-text-thumb] button {
          display: none !important;
        }
        [data-sono-text-thumb] a {
          pointer-events: none !important;
        }
      `}</style>
      {Demo ? <Demo /> : null}
    </div>
  )
}