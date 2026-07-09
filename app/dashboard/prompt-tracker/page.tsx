import { redirect } from 'next/navigation'

// Prompt Tracking is now a tab inside Visibility (Monitoring). Keep this route
// working by redirecting to the consolidated tabbed page.
export default function PromptTrackerRedirect(): never {
  redirect('/dashboard/visibility?tab=prompts')
}
