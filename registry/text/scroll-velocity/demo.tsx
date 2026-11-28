"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import ScrollVelocity from "./scroll-velocity"

export default function ScrollVelocityDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex w-full flex-col justify-center gap-3 overflow-hidden px-0 py-6 text-foreground`}
    >
      <ScrollVelocity
        texts={[
          "Scroll the page — the band speeds up",
          "Drag the row and fling it",
        ]}
        velocity={80}
        skewWithVelocity={0}
        scaleWithVelocity={0}
        draggable
        fontSize="clamp(1.75rem, 5vw, 2.75rem)"
        fontWeight={700}
        className="text-foreground"
        numCopies={8}
        damping={50}
        stiffness={400}
        separator=" · "
        fadeEdges
        outlineAlternate={false}
        gap={0}
        pauseOnHover={false}
        color="currentColor"
        scrollerClassName="scroller scroll-velocity-scroller"
      />
    </div>
  )
}