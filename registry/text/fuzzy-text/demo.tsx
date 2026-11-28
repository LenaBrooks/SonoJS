"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import FuzzyText from "./fuzzy-text"

export default function FuzzyTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8 text-foreground`}
    >
      <FuzzyText
        colorSplit={0}
        trigger="hover"
        direction="horizontal"
        baseIntensity={0.2}
        hoverIntensity={0.5}
        fuzzRange={30}
        sliceSize={1}
        fps={60}
        transitionDuration={0}
        intro
        introDuration={1400}
        letterSpacing={0}
        enableHover
        clickEffect={false}
        glitchMode={false}
        glitchInterval={2000}
        glitchDuration={200}
        fontSize="clamp(2.5rem, 10vw, 5rem)"
        color="currentColor"
      >
        404
      </FuzzyText>
    </div>
  )
}