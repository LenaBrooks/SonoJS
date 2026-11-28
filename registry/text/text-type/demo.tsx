"use client"

import { TEXT_STAGE_COMPACT } from "../_stage"
import TextType from "./text-type"

export default function TextTypeDemo() {
  return (
    <div
      className={`${TEXT_STAGE_COMPACT} flex items-center justify-center px-6 py-8 text-foreground`}
    >
      <TextType
        text={["Text typing effect", "for your websites", "Happy coding!"]}
        typingSpeed={75}
        pauseDuration={1500}
        deletingSpeed={50}
        deleteMode="backspace"
        typeEffect="none"
        mistakes={0}
        cursorStyle="underscore"
        cursorGlide
        showCursor
        cursorColor="currentColor"
        prefixColor="currentColor"
        cursorBlinkDuration={0.5}
        cursorCharacter="_"
        prefix=""
        className="text-3xl font-bold tracking-tight md:text-4xl"
      />
    </div>
  )
}