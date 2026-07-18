import { CatalystShell } from '@/features/catalyst/components/CatalystShell'
import { TaskDetailView } from '@/features/catalyst/components/tasks/detail/TaskDetailView'

export default function TaskDetailPage(): JSX.Element {
  return (
    <CatalystShell>
      <TaskDetailView />
    </CatalystShell>
  )
}
