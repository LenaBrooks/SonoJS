"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import TechText from "./tech-text"

export default function TechTextDemo() {
  return (
    <div className={`${TEXT_STAGE_COMPACT} relative text-foreground`}>
      <TechText
        text="SonoJS"
        fontWeight={600}
        fontSize={88}
        reveal="letter"
        dashLength={4}
        dashGap={2}
        specks={12}
        intro="none"
        clickKick
        guides={false}
        letterSpacing={-0.05}
        accentColor="currentColor"
        color="currentColor"
        reach={160}
        softness={0.7}
        lineStyle="dashed"
        strokeWidth={1.5}
        speed={1}
        bounce={0.4}
        selection
        labels={false}
        align="center"
        draggable
        sweep
        className="absolute inset-0"
      />
    </div>
  )
}