import { redirect } from 'next/navigation'

/** Growth Agent merged into the Actions page — old links land on the plan tab. */
export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<never> {
  const { slug } = await params
  redirect(`/dashboard/${slug}/actions`)
}
