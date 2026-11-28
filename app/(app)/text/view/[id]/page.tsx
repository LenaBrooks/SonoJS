import { permanentRedirect } from "next/navigation"

export default async function LegacyTextViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  permanentRedirect(`/text/${id}`)
}