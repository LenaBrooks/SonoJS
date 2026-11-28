"use client"

import { CatalogSection } from "@/components/catalog/catalog-section"
import { compareTextCatalogOrder, textCatalog } from "@/lib/text-catalog"

import { TextExampleCard } from "./example-card"
import { textThumbSrc } from "./thumbs"

export function TextGallery() {
  const entries = [...textCatalog].sort(compareTextCatalogOrder)

  if (entries.length === 0) {
    return (
      <p className="text-sm leading-relaxed text-muted-foreground">
        No text effects in the catalog yet. The first demo will appear here
        once it is added.
      </p>
    )
  }

  return (
    <CatalogSection title="Text" count={entries.length} showHeader={false}>
      {entries.map((entry) => (
        <TextExampleCard
          key={entry.id}
          id={entry.id}
          title={entry.title}
          status={entry.status}
          imageSrc={textThumbSrc(entry.id)}
        />
      ))}
    </CatalogSection>
  )
}