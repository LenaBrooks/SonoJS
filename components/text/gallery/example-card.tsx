"use client"

import * as React from "react"
import Link from "next/link"
import { TypeIcon } from "lucide-react"

import { textHref } from "@/lib/text-catalog"
import { cn } from "@/lib/utils"
import { prefetchTextDemo } from "@/registry/text/demo-loaders"

import { CardLivePreview } from "./card-live-preview"

export function TextExampleCard({
  id,
  title,
  status,
  imageSrc,
  disableLivePreview = false,
}: {
  id: string
  title: string
  status?: "pending" | "ported"
  imageSrc?: string
  disableLivePreview?: boolean
}) {
  const pending = status === "pending"
  const [hovered, setHovered] = React.useState(false)
  const [previewReady, setPreviewReady] = React.useState(false)
  const href = textHref(id)
  const label = pending ? `${title} (pending)` : title

  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={label}
      onMouseEnter={() => {
        if (pending || imageSrc || disableLivePreview) return
        prefetchTextDemo(id)
        setHovered(true)
      }}
      onMouseLeave={() => {
        setHovered(false)
        setPreviewReady(false)
      }}
      className={cn(
        "group flex w-full cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card text-start outline-none",
        "transition-[border-color,background-color] hover:border-border",
        "focus-visible:ring-2 focus-visible:ring-ring",
        pending && "opacity-80"
      )}
    >
      <div
        aria-hidden
        className="relative flex aspect-16/10 w-full items-center justify-center overflow-hidden bg-muted/35 dark:bg-muted/25"
      >
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- static public text thumbnail
          <img
            src={imageSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <>
            <TypeIcon
              className={cn(
                "size-10 text-muted-foreground/50 transition-[transform,opacity] duration-500",
                previewReady ? "scale-110 opacity-0" : "group-hover:scale-110"
              )}
            />
            {hovered && !pending && !disableLivePreview ? (
              <CardLivePreview
                id={id}
                onReady={() => setPreviewReady(true)}
                className={cn(
                  "transition-opacity duration-300 ease-out",
                  previewReady ? "opacity-100" : "opacity-0"
                )}
              />
            ) : null}
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 border-t border-border/50 px-3 py-2.5">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        {pending ? (
          <p className="text-xs text-muted-foreground">
            Pending
          </p>
        ) : null}
      </div>
    </Link>
  )
}