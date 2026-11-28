import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AccessGate } from "@/components/access/access-gate"
import { ComponentSource, DocsInstallation } from "@/components/docs"
import { TextDemo, TextPreview, TextViewPager } from "@/components/text"
import {
  getTextAdjacent,
  getTextEntry,
  textCatalog,
} from "@/lib/text-catalog"
import { getTextUsage } from "@/lib/text-usage"
import { textMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return textCatalog.map((entry) => ({ id: entry.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const entry = getTextEntry(id)
  if (!entry) return { title: "Text" }
  return textMetadata(id, entry.title, entry.status === "ported")
}

export default async function TextViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const entry = getTextEntry(id)
  if (!entry) notFound()

  const { previous, next } = getTextAdjacent(id)
  const usage = entry.status === "ported" ? getTextUsage(id) : null

  return (
    <article className="w-full max-w-none space-y-8">
      <header className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h1
            className="text-h1 min-w-0 flex-1 truncate"
            title={entry.title}
          >
            {entry.title}
          </h1>
          <TextViewPager
            previous={previous}
            next={next}
            className="mt-1.5"
          />
        </div>
        <p className="text-muted-foreground">{entry.description}</p>
        {entry.status === "pending" ? (
          <p className="text-sm text-amber-600 dark:text-amber-400">
            This text effect is listed in the catalog but not ported yet.
          </p>
        ) : null}
      </header>

      {entry.status === "ported" ? (
        <>
          <TextPreview title="Preview">
            <TextDemo id={id} />
          </TextPreview>

          <DocsInstallation name={id} />

          {usage ? (
            <section className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-h3">Usage</h2>
                <AccessGate access="member">
                  <div className="space-y-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {usage.blurb}
                    </p>
                    <ComponentSource
                      title="Default"
                      lang="tsx"
                      code={usage.code}
                    />
                  </div>
                </AccessGate>
              </div>
            </section>
          ) : null}
        </>
      ) : null}
    </article>
  )
}