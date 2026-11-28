"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import { BlurText } from "./blur-text"

export default function BlurTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8`}
    >
      <BlurText
        text="Words sharpen into focus one after another"
        className="max-w-xl text-pretty text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl"
      />
    </div>
  )
}