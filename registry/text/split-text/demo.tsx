"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import { SplitText } from "./split-text"

export default function SplitTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8`}
    >
      <SplitText
        text="Letters spring into place"
        className="text-4xl font-bold tracking-tight text-foreground md:text-5xl"
      />
    </div>
  )
}