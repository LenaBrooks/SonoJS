"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import { TrueFocus } from "./true-focus"

export default function TrueFocusDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8`}
    >
      <TrueFocus
        text="One sharp word at a time in the sentence"
        className="max-w-xl text-pretty text-center text-3xl font-bold leading-snug text-foreground md:text-4xl"
      />
    </div>
  )
}