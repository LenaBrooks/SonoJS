"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import GlitchText from "./glitch-text"

export default function GlitchTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8 text-foreground`}
    >
      <GlitchText
        mode="slices"
        trigger="always"
        speed={1}
        intensity={0.5}
        burstDuration={0.6}
        offset={10}
        skew={0}
        flicker={false}
        fontWeight={900}
        enableShadows
        shadowColors={["#ff0000", "#00ffff"]}
        color="currentColor"
        fontSize="clamp(2.5rem, 10vw, 4.5rem)"
      >
        SonoJS
      </GlitchText>
    </div>
  )
}