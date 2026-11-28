"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import FallingText from "./falling-text"

export default function FallingTextDemo() {
  return (
    <div className={`${TEXT_STAGE_COMPACT} relative min-h-[20rem] text-foreground`}>
      <div className="absolute inset-0">
        <FallingText
          text="Some sentences are built to last. This one falls apart on contact."
          highlightWords={["falls", "apart"]}
          trigger="hover"
          fontSize="1.35rem"
          gravity={1}
          restoreDelay={2}
          variant="text"
          split="words"
          order="random"
          bounciness={0.2}
          scatter={0.5}
          stagger={0.03}
          cursorPush={0.5}
          mouseConstraintStiffness={0.2}
          accentColor="var(--primary)"
          theme="light"
          draggable
          wireframes={false}
        />
      </div>
    </div>
  )
}