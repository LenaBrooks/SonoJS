"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import GradientText from "./gradient-text"

export default function GradientTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8 text-foreground`}
    >
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        variant="linear"
        glow={0}
        className="text-3xl font-bold tracking-tight md:text-4xl"
      >
        Add a splash of color!
      </GradientText>
    </div>
  )
}