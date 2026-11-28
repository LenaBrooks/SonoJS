"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import { Typewriter } from "./typewriter"

export default function TypewriterDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8`}
    >
      <Typewriter
        phrases={["Ship the demo", "Polish the loop", "Launch the build"]}
        className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
      />
    </div>
  )
}