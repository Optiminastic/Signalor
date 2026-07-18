import { CatalystShell } from '@/features/catalyst/components/CatalystShell'
import { PillarsDetailView } from '@/features/catalyst/components/pillars/PillarsDetailView'

export default function PillarsPage(): JSX.Element {
  return (
    <CatalystShell>
      <PillarsDetailView />
    </CatalystShell>
  )
}
