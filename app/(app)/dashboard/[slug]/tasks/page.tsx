import { redirect } from 'next/navigation'

/** Tasks merged into the Actions page — old links land on the All Tasks tab. */
export default async function CatalystTasksPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<never> {
  const { slug } = await params
  redirect(`/dashboard/${slug}/actions?tab=tasks`)
}
