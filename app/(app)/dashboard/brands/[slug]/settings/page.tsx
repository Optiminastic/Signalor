import { notFound } from 'next/navigation'

import { getBrand } from '@/features/catalyst/brands-data'
import { BrandSettingsView } from '@/features/catalyst/components/brands/BrandSettingsView'
import { CatalystShell } from '@/features/catalyst/components/CatalystShell'

export default async function BrandSettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<JSX.Element> {
  const { slug } = await params
  const brand = getBrand(slug)
  if (!brand) notFound()

  return (
    <CatalystShell>
      <BrandSettingsView brand={brand} />
    </CatalystShell>
  )
}
