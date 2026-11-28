"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import WarpText from "./warp-text"

export default function WarpTextDemo() {
  return (
    <div className={`${TEXT_STAGE_COMPACT} relative text-foreground`}>
      <WarpText
        text="SonoJS"
        color="currentColor"
        warpStrength={0.08}
        warpScale={1.7}
        speed={0.55}
        lens="bulge"
        pointerInfluence={0.42}
        pointerStrength={0.38}
        refraction={0.018}
        chromatic={0.35}
        idleDrift={0.2}
        ripple
        clickRipple
        intro
        fontSize="clamp(2.5rem, 10vw, 5.5rem)"
        fontWeight={800}
        fontFamily="inherit"
        letterSpacing="-0.06em"
        lineHeight={0.9}
        className="absolute inset-0 min-h-0"
      />
    </div>
  )
}