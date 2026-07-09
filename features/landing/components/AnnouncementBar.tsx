import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

/** Rounded, contained brand promo banner floating above the nav. */
export function AnnouncementBar(): JSX.Element {
  return (
    <div className="px-3 pt-3 sm:px-4 sm:pt-4">
      <Link
        href="/sign-up"
        className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-[#e04a3d] px-4 py-3 text-center text-[13px] font-medium text-white shadow-sm transition-opacity hover:opacity-90 sm:py-3.5 sm:text-sm"
      >
        Start tracking your first 50 prompts for free
        <ArrowRight size={15} strokeWidth={2.4} />
      </Link>
    </div>
  )
}
