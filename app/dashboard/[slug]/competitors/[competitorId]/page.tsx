import { CatalystShell } from '@/features/catalyst/components/CatalystShell'
import { CompetitorDetailView } from '@/features/catalyst/components/competitors/detail/CompetitorDetailView'

export default function CompetitorDetailPage(): JSX.Element {
  return (
    <CatalystShell>
      <CompetitorDetailView />
    </CatalystShell>
  )
}
