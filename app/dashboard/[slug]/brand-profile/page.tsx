import { BrandProfileView } from '@/features/catalyst/components/brand-profile/BrandProfileView'
import { CatalystShell } from '@/features/catalyst/components/CatalystShell'

export default function BrandProfilePage(): JSX.Element {
  return (
    <CatalystShell>
      <BrandProfileView />
    </CatalystShell>
  )
}
