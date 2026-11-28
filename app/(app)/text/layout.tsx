import { TextListIndex, TextSidebar } from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

import "@/styles/registry-catalog.css"

export default function TextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceShell
      listIndex={<TextListIndex />}
      sidebar={<TextSidebar />}
    >
      {children}
    </WorkspaceShell>
  )
}