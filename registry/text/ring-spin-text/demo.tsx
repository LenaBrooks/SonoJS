"use client"

import { SparklesIcon } from "lucide-react"

import { TEXT_STAGE_COMPACT } from "../_stage"
import RingSpinText from "./ring-spin-text"

export default function RingSpinTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8 text-foreground`}
    >
      <RingSpinText
        text="SONOJS*BUILD*SHIP*"
        onHover="speedUp"
        direction="clockwise"
        spinDuration={18}
        size={168}
        fontSize={13}
        fontWeight={800}
        color="currentColor"
        draggable
        hoverTilt={12}
        fill
        repeat={1}
      >
        <span className="flex size-12 items-center justify-center rounded-full border border-border/70 bg-card text-primary shadow-soft">
          <SparklesIcon className="size-5" aria-hidden />
        </span>
      </RingSpinText>
    </div>
  )
}