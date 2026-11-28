"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import { HighlighterText } from "./highlighter-text"

export default function HighlighterTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8`}
    >
      <p className="max-w-2xl text-pretty text-center text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
        <HighlighterText
          text="Most players decide in the first ten seconds, so put the best part of your game on the first screen."
          highlight={["first ten seconds", "best part"]}
        />
      </p>
    </div>
  )
}