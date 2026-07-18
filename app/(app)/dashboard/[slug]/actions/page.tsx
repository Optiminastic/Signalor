import { Suspense } from 'react'

import { ActionsView } from '@/features/catalyst/components/actions/ActionsView'
import { CatalystShell } from '@/features/catalyst/components/CatalystShell'

export default function ActionsPage(): JSX.Element {
  return (
    <CatalystShell>
      <Suspense>
        <ActionsView />
      </Suspense>
    </CatalystShell>
  )
}
