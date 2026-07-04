/**
 * Centralized query keys. Group by feature so cache invalidation has a single source of truth.
 */
export const queryKeys = {
  auth: {
    session: ['auth', 'session'] as const,
  },
  user: {
    me: ['user', 'me'] as const,
    byId: (id: string) => ['user', id] as const,
  },
  runs: {
    byOrg: (orgId: number) => ['runs', 'org', orgId] as const,
    byEmail: (email: string) => ['runs', 'email', email] as const,
  },
  backlinks: {
    auto: (slug: string) => ['backlinks', 'auto', slug] as const,
    schedule: (slug: string) => ['backlinks', 'schedule', slug] as const,
  },
} as const
