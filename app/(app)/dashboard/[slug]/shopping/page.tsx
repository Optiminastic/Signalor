import { CatalystShell } from '@/features/catalyst/components/CatalystShell'
import { ShoppingView } from '@/features/catalyst/components/shopping/ShoppingView'

export default function ShoppingPage(): JSX.Element {
  return (
    <CatalystShell>
      <ShoppingView />
    </CatalystShell>
  )
}
