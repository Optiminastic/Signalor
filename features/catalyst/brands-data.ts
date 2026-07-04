export type Role = 'Owner' | 'Admin' | 'Editor' | 'Viewer'
export type BrandStatus = 'active' | 'paused'

export interface Brand {
  slug: string
  name: string
  url: string
  plan: string
  geoScore: number
  visibility: number
  status: BrandStatus
  lastRun: string
  members: number
}

export const BRANDS: Brand[] = [
  {
    slug: 'optiminastic',
    name: 'Optiminastic',
    url: 'optiminastic.com',
    plan: 'Pro',
    geoScore: 74,
    visibility: 68,
    status: 'active',
    lastRun: '2h ago',
    members: 5,
  },
  {
    slug: 'signalor',
    name: 'Signalor',
    url: 'signalor.ai',
    plan: 'Business',
    geoScore: 88,
    visibility: 91,
    status: 'active',
    lastRun: '1h ago',
    members: 8,
  },
  {
    slug: 'tech5',
    name: 'Tech5',
    url: 'tech5.io',
    plan: 'Pro',
    geoScore: 56,
    visibility: 42,
    status: 'active',
    lastRun: '5h ago',
    members: 3,
  },
  {
    slug: 'carboncut',
    name: 'CarbonCut',
    url: 'carboncut.co',
    plan: 'Starter',
    geoScore: 39,
    visibility: 28,
    status: 'paused',
    lastRun: '3d ago',
    members: 2,
  },
  {
    slug: 'northwind',
    name: 'Northwind',
    url: 'northwind.com',
    plan: 'Pro',
    geoScore: 63,
    visibility: 59,
    status: 'active',
    lastRun: '8h ago',
    members: 4,
  },
  {
    slug: 'helios',
    name: 'Helios',
    url: 'helios.app',
    plan: 'Business',
    geoScore: 81,
    visibility: 77,
    status: 'active',
    lastRun: '30m ago',
    members: 6,
  },
]

export interface Member {
  name: string
  email: string
  role: Role
  status: 'active' | 'invited'
}

export const MEMBERS: Member[] = [
  { name: 'Rishi Patel', email: 'tech1@optiminastic.com', role: 'Owner', status: 'active' },
  { name: 'Aditi Rao', email: 'aditi@optiminastic.com', role: 'Admin', status: 'active' },
  { name: 'Marcus Lee', email: 'marcus@optiminastic.com', role: 'Editor', status: 'active' },
  { name: 'Sofia Martin', email: 'sofia@client.com', role: 'Viewer', status: 'active' },
  { name: 'james@agency.io', email: 'james@agency.io', role: 'Editor', status: 'invited' },
]

export const ROLES: { role: Role; desc: string }[] = [
  { role: 'Owner', desc: 'Full access — billing, members, and can delete the brand.' },
  { role: 'Admin', desc: 'Manage settings, integrations, and team members.' },
  { role: 'Editor', desc: 'Run analyses, apply fixes, and edit content.' },
  { role: 'Viewer', desc: 'Read-only access to reports and dashboards.' },
]

export const ROLE_STYLES: Record<Role, string> = {
  Owner: 'bg-[rgba(224,74,61,0.12)] text-[#e04a3d]',
  Admin: 'bg-[rgba(139,92,246,0.14)] text-[#8B5CF6]',
  Editor: 'bg-[rgba(59,158,246,0.14)] text-[#3B9EF6]',
  Viewer: 'bg-[var(--cat-hover)] text-[var(--cat-ink-2)]',
}

export function getBrand(slug: string): Brand | undefined {
  return BRANDS.find(b => b.slug === slug)
}
