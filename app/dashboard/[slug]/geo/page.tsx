import { CatalystShell } from '@/features/catalyst/components/CatalystShell'
import { GeoDetailView } from '@/features/catalyst/components/geo/GeoDetailView'

export default function CatalystGeoPage(): JSX.Element {
  return (
    <CatalystShell>
      <GeoDetailView />
    </CatalystShell>
  )
}
