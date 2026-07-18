import { CatalystShell } from '@/features/catalyst/components/CatalystShell'
import { InsightsView } from '@/features/catalyst/components/insights/InsightsView'

export default function InsightsPage(): JSX.Element {
  return (
    <CatalystShell>
      <InsightsView />
    </CatalystShell>
  )
}
