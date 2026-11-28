"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import { ShinyText } from "./shiny-text"

export default function ShinyTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8`}
    >
      <ShinyText
        text="Shimmering headline"
        className="text-4xl font-bold tracking-tight md:text-5xl"
      />
    </div>
  )
}