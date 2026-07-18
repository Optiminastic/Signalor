'use client'

import { ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'

import { TransitionLink } from '@/components/TransitionLink'
import { BRAND, BRAND_SOFT, BRAND_STRONG } from '@/features/catalyst/constants'

interface NavItemProps {
  icon: LucideIcon
  /** Brand-relative sub-path (e.g. 'tasks', '' for overview) or an absolute
   *  path starting with '/' for account-level pages (e.g. '/dashboard/team'). */
  href: string
  label: string
  badge?: number
  collapsed?: boolean
  /** Extra brand-relative paths that also count as "on this page" (drill-downs). */
  alsoMatch?: string[]
}

/** Resolve a nav entry's href against the active brand slug in the URL. */
export function resolveHref(href: string, slug: string | undefined): string {
  if (href.startsWith('/')) return href
  if (!slug) return '/dashboard'
  return href ? `/dashboard/${slug}/${href}` : `/dashboard/${slug}`
}

function Trailing({ active, badge }: { active: boolean; badge?: number }): JSX.Element | null {
  if (active) return <ChevronRight size={15} className="ml-auto text-[var(--cat-ink-3)]" />
  if (badge) {
    return (
      <span
        className="ml-auto grid h-[18px] min-w-[18px] place-items-center rounded-sm px-1 text-[10px] font-semibold text-white"
        style={{ background: BRAND }}
      >
        {badge}
      </span>
    )
  }
  return null
}

function isActive(pathname: string, href: string, isIndex: boolean): boolean {
  if (href === '#') return false
  if (pathname === href) return true
  // The brand index (/dashboard/<slug>) must not stay active on every sub-page.
  return !isIndex && pathname.startsWith(`${href}/`)
}

function NavRight({
  collapsed,
  active,
  badge,
}: {
  collapsed?: boolean
  active: boolean
  badge?: number
}): JSX.Element | null {
  if (!collapsed) return <Trailing active={active} badge={badge} />
  if (!badge) return null
  return (
    <span
      className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full"
      style={{ background: BRAND }}
    />
  )
}

export function NavItem({
  icon: Icon,
  label,
  href,
  badge,
  collapsed,
  alsoMatch,
}: NavItemProps): JSX.Element {
  const pathname = usePathname()
  const params = useParams()
  const slug = typeof params?.slug === 'string' ? params.slug : undefined
  const fullHref = resolveHref(href, slug)
  const active =
    isActive(pathname, fullHref, href === '') ||
    (alsoMatch ?? []).some(sub => isActive(pathname, resolveHref(sub, slug), false))
  const style = active
    ? { background: BRAND_SOFT, color: BRAND_STRONG }
    : { color: 'var(--cat-ink-2)' }

  return (
    <TransitionLink
      href={fullHref}
      title={collapsed ? label : undefined}
      className={`relative flex items-center rounded-md py-2 text-[14px] font-medium transition-colors hover:bg-[var(--cat-hover)] focus-visible:ring-2 focus-visible:ring-[rgba(224,74,61,0.4)] focus-visible:outline-none ${collapsed ? 'justify-center px-0' : 'gap-3 px-2.5'}`}
      style={style}
    >
      {active && (
        <span
          className="absolute top-1/2 left-0 h-5 w-[3px] -translate-y-1/2 rounded-r"
          style={{ background: BRAND }}
        />
      )}
      <Icon size={18} strokeWidth={1.8} className="shrink-0" />
      {!collapsed && label}
      <NavRight collapsed={collapsed} active={active} badge={badge} />
    </TransitionLink>
  )
}
