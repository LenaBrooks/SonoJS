"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import RotatingText from "./rotating-text"

const WORDS = ["thinking", "coding", "components!"]
const LINE_SPRING = { type: "spring" as const, damping: 30, stiffness: 400 }

export default function RotatingTextDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex min-h-[14rem] w-full items-center justify-center px-6 py-10 text-foreground`}
    >
      <div className="grid w-max max-w-full text-5xl font-black tracking-tight md:text-6xl">
        <p className="text-rotate-line invisible col-start-1 row-start-1 m-0" aria-hidden>
          <span className="text-rotate-line-prefix">Creative</span>
          <span>components!</span>
        </p>
        <p className="text-rotate-line col-start-1 row-start-1 m-0">
          <span className="text-rotate-line-prefix">Creative</span>
          <RotatingText
            texts={WORDS}
            effect="slide"
            direction="up"
            highlight
            highlightColor="#a855f7"
            staggerFrom="last"
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-[0.12em]"
            rotationInterval={2000}
            splitBy="characters"
            blur={0}
            auto
            loop
            pauseOnHover={false}
            transition={LINE_SPRING}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
          />
        </p>
      </div>
    </div>
  )
}