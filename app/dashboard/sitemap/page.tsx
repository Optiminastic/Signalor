import { redirect } from 'next/navigation'

// Sitemap is now a tab inside Visibility (Monitoring). Keep this route working
// by redirecting to the consolidated tabbed page.
export default function SitemapRedirect(): never {
  redirect('/dashboard/visibility?tab=sitemap')
}
