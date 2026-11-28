"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import { StrokeText } from "./stroke-text"

export default function StrokeTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} relative flex flex-col items-center justify-center gap-4 px-6 py-8`}
    >
      <StrokeText
        text="Hover to fill"
        className="cursor-pointer text-4xl font-bold uppercase tracking-[0.12em] md:text-5xl"
      />
      <p className="text-sm text-muted-foreground">Hover or focus the label</p>
    </div>
  )
}