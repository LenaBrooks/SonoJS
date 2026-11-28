import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Bordered preview stage for text motion demos (same chrome as cursors).
 */
export function TextPreview({
  children,
  title = "Preview",
  description,
  className,
}: {
  children: ReactNode
  title?: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("w-full min-w-0 space-y-3", className)}>
      <div className="space-y-1.5">
        <h2 className="text-h3">{title}</h2>
        {description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className="w-full min-w-0 max-w-none overflow-hidden rounded-xl border border-border/70">
        <div className="w-full min-w-0">{children}</div>
      </div>
    </div>
  )
}