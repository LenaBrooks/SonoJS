/** Install path after `sonojs add <id>`. */
export function textImportPath(id: string): string {
  return `@/components/text/${id}/${id}`
}

/** Primary named export for each text effect id. */
export function textExportName(id: string): string {
  const map: Record<string, string> = {
    "highlighter-text": "HighlighterText",
    "scramble-text": "ScrambleText",
    "tech-text": "TechText",
    "particle-text": "ParticleText",
    "warp-text": "WarpText",
    "blur-reveal-text": "BlurRevealText",
    "ring-spin-text": "RingSpinText",
    "rotating-text": "RotatingText",
    "scroll-velocity": "ScrollVelocity",
  }
  return map[id] ?? toPascalFromSlug(id)
}

function toPascalFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

export type TextUsageSnippet = {
  blurb: string
  code: string
}

const USAGE_CENTER = `    <div className="flex min-h-svh items-center justify-center px-6">`

function usageSnippet(id: string, body: string, blurb?: string): TextUsageSnippet {
  const name = textExportName(id)
  const path = textImportPath(id)
  const defaultBlurb =
    id === "scramble-text" || id === "blur-text" || id === "split-text"
      ? "Install with the Command tab (also installs motion)."
      : id === "tech-text"
        ? "Install with the Command tab. The stage needs a defined height."
        : "Install with the Command tab, then paste this into a client page."

  return {
    blurb: blurb ?? defaultBlurb,
    code: `"use client"

import { ${name} } from "${path}"

export default function Page() {
  return (
${USAGE_CENTER}
${body}
    </div>
  )
}
`,
  }
}

const TEXT_USAGE: Record<string, TextUsageSnippet> = {
  "blur-text": usageSnippet(
    "blur-text",
    `      <BlurText
        text="Words sharpen into focus one after another"
        className="max-w-xl text-pretty text-center text-4xl font-bold tracking-tight"
      />`,
    "Scroll-reveal by word. For multi-effect blur reveals, use Blur Reveal Text (`blur-reveal-text`)."
  ),
  "blur-reveal-text": {
    blurb:
      "Different from Blur Text (`blur-text`). Supports `effect`, `trigger`, letters/words, and optional loop.",
    code: `"use client"

import BlurRevealText from "${textImportPath("blur-reveal-text")}"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center px-6">
      <BlurRevealText
        text="Soft focus, sharp copy"
        effect="blur"
        animateBy="words"
        direction="top"
        trigger="view"
        delay={120}
        stepDuration={0.35}
        blur={10}
        distance={50}
        className="max-w-xl text-pretty text-center text-4xl font-bold tracking-tight text-foreground"
      />
    </div>
  )
}
`,
  },
  "split-text": usageSnippet(
    "split-text",
    `      <SplitText
        text="Letters spring into place"
        className="text-4xl font-bold tracking-tight"
      />`
  ),
  "shiny-text": usageSnippet(
    "shiny-text",
    `      <ShinyText
        text="Shimmering headline"
        className="text-4xl font-bold tracking-tight"
      />`
  ),
  typewriter: usageSnippet(
    "typewriter",
    `      <Typewriter
        phrases={["Ship the demo", "Polish the loop", "Launch the build"]}
        className="text-3xl font-bold tracking-tight md:text-4xl"
      />`,
    "Pass a `phrases` array — the effect types each string in turn. For GSAP cursor glide + delete modes, use Text Type (`text-type`)."
  ),
  "text-type": {
    blurb:
      "Not the same slug as Typewriter (`typewriter`). Uses a `text` string or array, GSAP caret animation, and richer delete / typo options.",
    code: `"use client"

import TextType from "${textImportPath("text-type")}"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center px-6 text-foreground">
      <TextType
        text={["Text typing effect", "for your websites", "Happy coding!"]}
        typingSpeed={75}
        pauseDuration={1500}
        deletingSpeed={50}
        deleteMode="backspace"
        cursorStyle="underscore"
        cursorGlide
        showCursor
        cursorColor="currentColor"
        className="text-3xl font-bold tracking-tight md:text-4xl"
      />
    </div>
  )
}
`,
  },
  "ring-path-text": usageSnippet(
    "ring-path-text",
    `      <RingPathText
        text="DESIGN BUILD SHIP"
        duration={18}
        size={168}
        fontSize={13}
      />`,
    "SVG path ring. For drag and hover tilt on a DOM ring, use Ring Spin Text (`ring-spin-text`)."
  ),
  "ring-spin-text": {
    blurb:
      "DOM ring — pair with Ring Path Text (`ring-path-text`). Uses `spinDuration`, `onHover`, `draggable`, and `hoverTilt`.",
    code: `"use client"

import RingSpinText from "${textImportPath("ring-spin-text")}"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center text-foreground">
      <RingSpinText
        text="SONOJS*BUILD*SHIP*"
        onHover="speedUp"
        spinDuration={18}
        size={168}
        fontSize={13}
        color="currentColor"
        draggable
        hoverTilt={12}
      />
    </div>
  )
}
`,
  },
  "true-focus": usageSnippet(
    "true-focus",
    `      <TrueFocus
        text="One sharp word at a time in the sentence"
        className="max-w-xl text-pretty text-center text-3xl font-bold leading-snug md:text-4xl"
      />`
  ),
  "echo-text": usageSnippet(
    "echo-text",
    `      <EchoText
        text="Echo"
        className="text-5xl font-black uppercase tracking-tight md:text-6xl"
      />`,
    "Breathing outline echoes that lean toward the pointer (motion API)."
  ),
  "masked-reveal": usageSnippet(
    "masked-reveal",
    `      <MaskedReveal
        lines={["Masked lines", "slide up together"]}
        className="text-4xl font-bold tracking-tight md:text-5xl"
      />`,
    "Pass one string per line in `lines`."
  ),
  "stroke-text": usageSnippet(
    "stroke-text",
    `      <StrokeText
        text="Hover to fill"
        className="cursor-pointer text-4xl font-bold uppercase tracking-[0.12em] md:text-5xl"
      />`
  ),
  "highlighter-text": usageSnippet(
    "highlighter-text",
    `      <HighlighterText
        text="Most players decide in the first ten seconds."
        highlight={["first ten seconds"]}
        className="text-3xl font-bold"
      />`,
    "Nest inside your heading or paragraph. Pass `highlight` phrases to mark."
  ),
  "scramble-text": usageSnippet(
    "scramble-text",
    `      <ScrambleText
        text="Decrypting launch plan"
        duration={700}
        className="cursor-pointer text-2xl font-bold uppercase tracking-wide"
      />`,
    "Hover or focus the span to run the decode."
  ),
  "tech-text": {
    blurb:
      "Install with the Command tab. The stage needs a defined height; pointer moves reveal dashed letter paths.",
    code: `"use client"

import TechText from "${textImportPath("tech-text")}"

export default function Page() {
  return (
    <div className="relative h-[min(40vh,20rem)] min-h-[14rem] w-full text-foreground">
      <TechText
        text="SonoJS"
        fontWeight={600}
        fontSize={88}
        reveal="letter"
        color="currentColor"
        accentColor="currentColor"
        align="center"
        draggable
        sweep
        clickKick
        className="absolute inset-0"
      />
    </div>
  )
}
`,
  },
  "scroll-velocity": {
    blurb:
      "Install with the Command tab (also installs motion). Pass a `texts` array; scroll the page to see speed-up. Works best with vertical room on the page.",
    code: `"use client"

import ScrollVelocity from "${textImportPath("scroll-velocity")}"

export default function Page() {
  return (
    <div className="w-full py-12 text-foreground">
      <ScrollVelocity
        texts={["SonoJS", "Scroll"]}
        velocity={100}
        draggable
        fontSize={56}
        fontWeight={700}
        numCopies={6}
        color="currentColor"
      />
    </div>
  )
}
`,
  },
  "glitch-text": {
    blurb:
      "Not Scramble Text (`scramble-text`). Pass child text; `mode=\"noise\"` needs per-character markup. Click trigger fires a burst.",
    code: `"use client"

import GlitchText from "${textImportPath("glitch-text")}"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center px-6 text-foreground">
      <GlitchText
        mode="slices"
        trigger="hover"
        speed={1}
        intensity={0.5}
        offset={10}
        fontWeight={900}
        enableShadows
        shadowColors={["#ff0000", "#00ffff"]}
        color="currentColor"
        fontSize="clamp(2.5rem, 10vw, 4.5rem)"
      >
        SonoJS
      </GlitchText>
    </div>
  )
}
`,
  },
  "rotating-text": {
    blurb:
      "Install with the Command tab (also installs motion + `rotating-text.css`). For the highlight + static prefix layout, wrap with `text-rotate-line` / `text-rotate-line-prefix` from the CSS file (see below).",
    code: `"use client"

import RotatingText from "${textImportPath("rotating-text")}"

const WORDS = ["thinking", "coding", "components!"]
const LINE_SPRING = { type: "spring" as const, damping: 30, stiffness: 400 }

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center px-6 py-10 text-foreground">
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
            auto
            loop
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
`,
  },
  "falling-text": {
    blurb:
      "Install with the Command tab (also installs matter-js). Parent needs explicit height; use `trigger=\"hover\"` in the demo.",
    code: `"use client"

import FallingText from "${textImportPath("falling-text")}"

export default function Page() {
  return (
    <div className="relative h-[min(50vh,28rem)] w-full text-foreground">
      <FallingText
        text="Some sentences are built to last. This one falls apart on contact."
        highlightWords={["falls", "apart"]}
        trigger="hover"
        fontSize="1.5rem"
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
      />
    </div>
  )
}
`,
  },
  "gradient-text": {
    blurb:
      "Not Shiny Text (`shiny-text`). Pass children and a `colors` array; try `variant=\"flow\"` or `\"conic\"` with `followPointer`.",
    code: `"use client"

import GradientText from "${textImportPath("gradient-text")}"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center px-6">
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
`,
  },
  "fuzzy-text": {
    blurb:
      "Install with the Command tab. Pass child text (not a `text` prop). `currentColor` tracks theme ink from the canvas parent.",
    code: `"use client"

import FuzzyText from "${textImportPath("fuzzy-text")}"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center text-foreground">
      <FuzzyText
        colorSplit={0}
        trigger="hover"
        direction="horizontal"
        baseIntensity={0.2}
        hoverIntensity={0.5}
        fuzzRange={30}
        intro
        introDuration={1400}
        enableHover
        color="currentColor"
        fontSize="clamp(2.5rem, 10vw, 5rem)"
      >
        404
      </FuzzyText>
    </div>
  )
}
`,
  },
  "warp-text": {
    blurb:
      "Install runs `npm i ogl`. Needs a tall stage and WebGL; falls back to plain text if the context is lost.",
    code: `"use client"

import WarpText from "${textImportPath("warp-text")}"

export default function Page() {
  return (
    <div className="relative h-[min(40vh,20rem)] min-h-[14rem] w-full text-foreground">
      <WarpText
        text="SonoJS"
        color="currentColor"
        lens="bulge"
        chromatic={0.35}
        ripple
        clickRipple
        intro
        className="absolute inset-0"
      />
    </div>
  )
}
`,
  },
  "particle-text": {
    blurb:
      "Give the container a height. Particles use `currentColor` and `var(--primary)` so light and dark themes stay on-brand.",
    code: `"use client"

import ParticleText from "${textImportPath("particle-text")}"

export default function Page() {
  return (
    <div className="relative h-[min(40vh,20rem)] min-h-[14rem] w-full text-foreground">
      <ParticleText
        text="SonoJS"
        color="currentColor"
        highlightColor="var(--primary)"
        intro="gather"
        clickBurst
        glow
        className="absolute inset-0"
      />
    </div>
  )
}
`,
  },
}

/**
 * Minimal copy-paste usage - not the full component source.
 */
export function getTextUsage(id: string): TextUsageSnippet {
  return (
    TEXT_USAGE[id] ?? {
      blurb: "Install with the Command tab, then paste this into a client page.",
      code: `"use client"

import { ${textExportName(id)} } from "${textImportPath(id)}"

// See the docs preview for required props for this effect.
`,
    }
  )
}