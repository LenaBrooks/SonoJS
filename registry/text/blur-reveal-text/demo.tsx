"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import BlurRevealText from "./blur-reveal-text"

export default function BlurRevealTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8`}
    >
      <BlurRevealText
        text="Soft focus, sharp copy"
        effect="blur"
        animateBy="words"
        direction="top"
        staggerFrom="start"
        trigger="view"
        delay={120}
        stepDuration={0.35}
        blur={10}
        distance={50}
        className="max-w-xl text-pretty text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl"
        loop={false}
        focusOnHover={false}
      />
    </div>
  )
}