import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

/** Full-width brand promo strip above the nav. */
export function AnnouncementBar(): JSX.Element {
  return (
    <div className="w-full bg-[#e04a3d] text-white">
      <Link
        href="/sign-up"
        className="mx-auto flex items-center justify-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-opacity hover:opacity-90"
      >
        Start tracking your first 50 prompts for free
        <ArrowRight size={15} strokeWidth={2.4} />
      </Link>
    </div>
  )
}
