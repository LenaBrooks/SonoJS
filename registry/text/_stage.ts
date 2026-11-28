/** Shared demo stage — theme canvas (`bg-canvas`), same idea as `registry/cursors/_stage.ts`. */
export const TEXT_STAGE_BASE = "relative w-full overflow-hidden"

export const TEXT_STAGE = `${TEXT_STAGE_BASE} h-[min(70vh,32rem)] min-h-[28rem] bg-canvas`

/** Catalog / docs preview frame when `previewSize` is `compact`. */
export const TEXT_STAGE_COMPACT = `${TEXT_STAGE_BASE} h-[min(40vh,20rem)] min-h-[14rem] bg-canvas`