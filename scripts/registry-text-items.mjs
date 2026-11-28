/** Animated text effects for `registry:text`. */

/** @typedef {{ path: string, type: string, target?: string }} RegistryFileDef */
/** @typedef {{
 *   name: string,
 *   type: string,
 *   title: string,
 *   description?: string,
 *   access?: "public" | "member" | "pro",
 *   dependencies?: string[],
 *   registryDependencies?: string[],
 *   files: RegistryFileDef[]
 * }} RegistryItemDef
 */

const TEXT_SITE_ACCESS = "member"

/** @param {string} name */
function textComponentFile(name) {
  return {
    path: `registry/text/${name}/${name}.tsx`,
    type: "registry:component",
    target: `components/text/${name}/${name}.tsx`,
  }
}

/** @param {string} name @param {string} title @param {string} description @param {string[]} [dependencies] */
function textItem(name, title, description, dependencies = []) {
  return {
    name,
    type: "registry:text",
    title,
    description,
    ...(dependencies.length ? { dependencies } : {}),
    files: [textComponentFile(name)],
  }
}

/** @type {RegistryItemDef[]} */
export const textRegistryItems = [
  textItem(
    "highlighter-text",
    "Highlighter Text",
    "A marker stroke draws behind chosen words when they scroll into view, with a hand-drawn edge."
  ),
  textItem(
    "scramble-text",
    "Scramble Text",
    "Text that decodes from random glyphs, left to right, on hover or focus.",
    ["motion"]
  ),
  textItem(
    "blur-text",
    "Blur Text",
    "Simple scroll reveal: each word de-blurs and slides in.",
    ["motion"]
  ),
  textItem(
    "blur-reveal-text",
    "Blur Reveal Text",
    "Text starts blurred then crisply resolves (blur, zoom, tilt, drift, or focus).",
    ["motion"]
  ),
  textItem(
    "split-text",
    "Split Text",
    "Letters that spring into place one by one when the text scrolls into view.",
    ["motion"]
  ),
  textItem(
    "shiny-text",
    "Shiny Text",
    "Text with a soft band of light that sweeps across it on a loop.",
    ["motion"]
  ),
  textItem(
    "typewriter",
    "Typewriter",
    "Types phrases one character at a time with a blinking caret.",
    ["motion"]
  ),
  {
    name: "text-type",
    type: "registry:text",
    title: "Text Type",
    description:
      "Multi-line typewriter with GSAP cursor glide, delete modes, mistakes, and per-character effects.",
    dependencies: ["gsap@^3.13.0"],
    files: [
      {
        path: "registry/text/text-type/text-type.tsx",
        type: "registry:component",
        target: "components/text/text-type/text-type.tsx",
      },
      {
        path: "registry/text/text-type/text-type.css",
        type: "registry:file",
        target: "components/text/text-type/text-type.css",
      },
    ],
  },
  textItem(
    "ring-path-text",
    "Ring Path Text",
    "SVG text on a circular path with hover speed-up or pause.",
    ["motion"]
  ),
  {
    name: "ring-spin-text",
    type: "registry:text",
    title: "Ring Spin Text",
    description: "Layouts characters around a circle with rotation, drag, and hover tilt.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/text/ring-spin-text/ring-spin-text.tsx",
        type: "registry:component",
        target: "components/text/ring-spin-text/ring-spin-text.tsx",
      },
      {
        path: "registry/text/ring-spin-text/ring-spin-text.css",
        type: "registry:file",
        target: "components/text/ring-spin-text/ring-spin-text.css",
      },
    ],
  },
  textItem(
    "true-focus",
    "True Focus",
    "One sharp word at a time with gliding corner brackets.",
    ["motion"]
  ),
  textItem(
    "echo-text",
    "Echo Text",
    "Outlined echoes that breathe on a loop and lean toward the pointer.",
    ["motion"]
  ),
  textItem(
    "masked-reveal",
    "Masked Reveal",
    "Multi-line heading whose lines slide up from behind a mask.",
    ["motion"]
  ),
  textItem(
    "stroke-text",
    "Stroke Text",
    "Outlined text that fills with color on hover or focus.",
    ["motion"]
  ),
  {
    name: "tech-text",
    type: "registry:text",
    title: "Tech Text",
    description:
      "A wordmark whose letters turn into dashed vector paths under the cursor.",
    files: [
      {
        path: "registry/text/tech-text/tech-text.tsx",
        type: "registry:component",
        target: "components/text/tech-text/tech-text.tsx",
      },
      {
        path: "registry/text/tech-text/tech-text.css",
        type: "registry:file",
        target: "components/text/tech-text/tech-text.css",
      },
    ],
  },
  {
    name: "particle-text",
    type: "registry:text",
    title: "Particle Text",
    description:
      "Text assembles from drifting particles that scatter and reform on demand.",
    files: [
      {
        path: "registry/text/particle-text/particle-text.tsx",
        type: "registry:component",
        target: "components/text/particle-text/particle-text.tsx",
      },
      {
        path: "registry/text/particle-text/particle-text.css",
        type: "registry:file",
        target: "components/text/particle-text/particle-text.css",
      },
    ],
  },
  textItem(
    "fuzzy-text",
    "Fuzzy Text",
    "Canvas type that vibrates with controllable hover, click, and intro intensity.",
    []
  ),
  {
    name: "scroll-velocity",
    type: "registry:text",
    title: "Scroll Velocity",
    description:
      "Marquee rows whose speed, skew, and scale follow scroll velocity; optional drag and fling.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/text/scroll-velocity/scroll-velocity.tsx",
        type: "registry:component",
        target: "components/text/scroll-velocity/scroll-velocity.tsx",
      },
      {
        path: "registry/text/scroll-velocity/scroll-velocity.css",
        type: "registry:file",
        target: "components/text/scroll-velocity/scroll-velocity.css",
      },
    ],
  },
  {
    name: "glitch-text",
    type: "registry:text",
    title: "Glitch Text",
    description:
      "RGB split and slice distortion with slices, scan, rgb, and noise modes plus hover or click bursts.",
    files: [
      {
        path: "registry/text/glitch-text/glitch-text.tsx",
        type: "registry:component",
        target: "components/text/glitch-text/glitch-text.tsx",
      },
      {
        path: "registry/text/glitch-text/glitch-text.css",
        type: "registry:file",
        target: "components/text/glitch-text/glitch-text.css",
      },
    ],
  },
  {
    name: "rotating-text",
    type: "registry:text",
    title: "Rotating Text",
    description:
      "Cycles through phrases with slide, flip, blur, scale, or drop transitions and per-character stagger.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/text/rotating-text/rotating-text.tsx",
        type: "registry:component",
        target: "components/text/rotating-text/rotating-text.tsx",
      },
      {
        path: "registry/text/rotating-text/rotating-text.css",
        type: "registry:file",
        target: "components/text/rotating-text/rotating-text.css",
      },
    ],
  },
  {
    name: "falling-text",
    type: "registry:text",
    title: "Falling Text",
    description:
      "Words break apart into a Matter.js pile you can drag and throw; pieces spring back after a delay.",
    dependencies: ["matter-js@^0.20.0"],
    files: [
      {
        path: "registry/text/falling-text/falling-text.tsx",
        type: "registry:component",
        target: "components/text/falling-text/falling-text.tsx",
      },
      {
        path: "registry/text/falling-text/falling-text.css",
        type: "registry:file",
        target: "components/text/falling-text/falling-text.css",
      },
    ],
  },
  {
    name: "gradient-text",
    type: "registry:text",
    title: "Gradient Text",
    description:
      "Living gradients inside text: linear sweep, drifting flow mesh, or swinging conic fan.",
    files: [
      {
        path: "registry/text/gradient-text/gradient-text.tsx",
        type: "registry:component",
        target: "components/text/gradient-text/gradient-text.tsx",
      },
      {
        path: "registry/text/gradient-text/gradient-text.css",
        type: "registry:file",
        target: "components/text/gradient-text/gradient-text.css",
      },
    ],
  },
  {
    name: "warp-text",
    type: "registry:text",
    title: "Warp Text",
    description: "WebGL warp that bends and refracts the text around the pointer.",
    dependencies: ["ogl"],
    files: [
      {
        path: "registry/text/warp-text/warp-text.tsx",
        type: "registry:component",
        target: "components/text/warp-text/warp-text.tsx",
      },
      {
        path: "registry/text/warp-text/warp-text.css",
        type: "registry:file",
        target: "components/text/warp-text/warp-text.css",
      },
    ],
  },
]

for (const item of textRegistryItems) {
  if (item.type === "registry:text") {
    item.access = TEXT_SITE_ACCESS
  }
}