import { TextGallery } from "@/components/text"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Text",
  description:
    "Preview installable animated text effects for React, then add them with the CLI.",
  path: "/text",
})

export default function TextIndexPage() {
  return (
    <article className="w-full max-w-none space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Text</h1>
        <p className="text-muted-foreground">
          Preview installable animated text effects for React, then add them
          with the CLI.
        </p>
      </header>

      <TextGallery />
    </article>
  )
}