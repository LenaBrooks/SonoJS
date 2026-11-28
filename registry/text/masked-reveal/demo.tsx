"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import { MaskedReveal } from "./masked-reveal"

export default function MaskedRevealDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8`}
    >
      <MaskedReveal
        lines={["Masked lines", "slide up together"]}
        className="text-4xl font-bold tracking-tight text-foreground md:text-5xl"
      />
    </div>
  )
}