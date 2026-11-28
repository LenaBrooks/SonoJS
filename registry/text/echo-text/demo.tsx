"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import { EchoText } from "./echo-text"

export default function EchoTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8`}
    >
      <EchoText
        text="Echo"
        className="text-5xl font-black uppercase tracking-tight text-foreground md:text-6xl"
      />
    </div>
  )
}