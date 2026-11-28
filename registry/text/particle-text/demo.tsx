"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import ParticleText from "./particle-text"

export default function ParticleTextDemo() {
  return (
    <div className={`${TEXT_STAGE_COMPACT} relative text-foreground`}>
      <ParticleText
        text="SonoJS"
        particleSize={2.2}
        density={4}
        color="currentColor"
        highlightColor="var(--primary)"
        highlightMode="motion"
        shape="circle"
        intro="gather"
        scatter={190}
        gatherDuration={1600}
        stagger={420}
        clickBurst
        burstStrength={1}
        pointerRepel={42}
        repelRadius={120}
        idleDrift={0.8}
        trigger="mount"
        fontSize="clamp(2.5rem, 10vw, 5.5rem)"
        fontWeight={800}
        fontFamily="inherit"
        glow
        className="absolute inset-0"
      />
    </div>
  )
}