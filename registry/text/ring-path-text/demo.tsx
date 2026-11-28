"use client"

import { SparklesIcon } from "lucide-react"

import { TEXT_STAGE_COMPACT } from "../_stage"
import { RingPathText } from "./ring-path-text"

export default function RingPathTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8`}
    >
      <RingPathText
        text="DESIGN BUILD SHIP"
        duration={18}
        size={168}
        fontSize={13}
        className="text-foreground"
      >
        <span className="flex size-12 items-center justify-center rounded-full border border-border/70 bg-card text-primary shadow-soft">
          <SparklesIcon className="size-5" aria-hidden />
        </span>
      </RingPathText>
    </div>
  )
}