"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import { ScrambleText } from "./scramble-text"

export default function ScrambleTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle,color-mix(in_oklab,var(--foreground)_10%,transparent)_1px,transparent_1px)] [background-size:20px_20px] px-6 py-8`}
    >
      <ScrambleText
        text="Decrypting launch plan"
        duration={700}
        className="text-center text-3xl font-bold uppercase tracking-[0.18em] text-foreground md:text-4xl"
      />
      <p className="text-sm text-muted-foreground">Hover or focus the text</p>
    </div>
  )
}