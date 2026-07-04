import { CatalystShell } from '@/features/catalyst/components/CatalystShell'
import { PromptTrackerView } from '@/features/catalyst/components/prompt-tracker/PromptTrackerView'

export default function PromptTrackerPage(): JSX.Element {
  return (
    <CatalystShell>
      <PromptTrackerView />
    </CatalystShell>
  )
}
