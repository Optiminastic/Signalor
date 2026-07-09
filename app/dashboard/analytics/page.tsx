import { redirect } from 'next/navigation'

// Analytics is now a tab inside Visibility (Monitoring). Keep this route working
// by redirecting to the consolidated tabbed page.
export default function AnalyticsRedirect(): never {
  redirect('/dashboard/visibility?tab=analytics')
}
