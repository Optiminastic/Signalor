'use client'

import { Trash2, UserPlus } from 'lucide-react'
import { useState } from 'react'

import {
  MEMBERS,
  ROLES,
  ROLE_STYLES,
  type Member,
  type Role,
} from '@/features/catalyst/brands-data'

const ASSIGNABLE: Role[] = ['Admin', 'Editor', 'Viewer']

function RoleControl({
  member,
  onRole,
}: {
  member: Member
  onRole: (email: string, role: Role) => void
}): JSX.Element {
  if (member.role === 'Owner') {
    return (
      <span className={`rounded-md px-2.5 py-1 text-[12px] font-semibold ${ROLE_STYLES.Owner}`}>
        Owner
      </span>
    )
  }
  return (
    <select
      value={member.role}
      onChange={e => onRole(member.email, e.target.value as Role)}
      className="h-8 rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] px-2 text-[12px] font-medium text-[var(--cat-ink-2)] outline-none"
    >
      {ASSIGNABLE.map(r => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
  )
}

function MemberRow({
  member,
  onRole,
  onRemove,
}: {
  member: Member
  onRole: (email: string, role: Role) => void
  onRemove: (email: string) => void
}): JSX.Element {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[rgba(224,74,61,0.12)] text-[12px] font-semibold text-[#e04a3d] uppercase">
        {member.name[0]}
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 truncate text-[13px] font-medium text-[var(--cat-ink)]">
          {member.name}
          {member.status === 'invited' && (
            <span className="rounded-sm bg-[var(--cat-hover)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--cat-ink-3)]">
              Invited
            </span>
          )}
        </p>
        <p className="truncate text-[12px] text-[var(--cat-ink-3)]">{member.email}</p>
      </div>
      <RoleControl member={member} onRole={onRole} />
      <button
        type="button"
        onClick={() => onRemove(member.email)}
        disabled={member.role === 'Owner'}
        className="grid h-8 w-8 place-items-center rounded-md text-[var(--cat-ink-3)] transition-colors hover:bg-[var(--cat-hover)] hover:text-[#E5484D] disabled:opacity-30"
        aria-label="Remove member"
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}

function InviteRow({
  value,
  setValue,
  onInvite,
}: {
  value: string
  setValue: (v: string) => void
  onInvite: () => void
}): JSX.Element {
  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onInvite()}
        placeholder="teammate@company.com"
        className="h-9 flex-1 rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] px-3 text-[13px] text-[var(--cat-ink)] outline-none placeholder:text-[var(--cat-ink-3)]"
      />
      <button
        type="button"
        onClick={onInvite}
        className="flex h-9 items-center gap-1.5 rounded-md px-3.5 text-[13px] font-medium text-white"
        style={{ background: '#e04a3d' }}
      >
        <UserPlus size={15} />
        Invite
      </button>
    </div>
  )
}

function RolesLegend(): JSX.Element {
  return (
    <div className="grid gap-1.5 rounded-lg border border-[var(--cat-border)] bg-[var(--cat-bg)] p-4 sm:grid-cols-2">
      {ROLES.map(r => (
        <div key={r.role} className="flex items-start gap-2">
          <span
            className={`mt-0.5 rounded-md px-2 py-0.5 text-[11px] font-semibold ${ROLE_STYLES[r.role]}`}
          >
            {r.role}
          </span>
          <p className="text-[12px] text-[var(--cat-ink-3)]">{r.desc}</p>
        </div>
      ))}
    </div>
  )
}

export function MembersTable(): JSX.Element {
  const [members, setMembers] = useState<Member[]>(MEMBERS)
  const [invite, setInvite] = useState('')

  const onRole = (email: string, role: Role): void =>
    setMembers(m => m.map(x => (x.email === email ? { ...x, role } : x)))
  const onRemove = (email: string): void => setMembers(m => m.filter(x => x.email !== email))
  const onInvite = (): void => {
    const email = invite.trim().toLowerCase()
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || members.some(m => m.email === email)) return
    setMembers([...members, { name: email, email, role: 'Viewer', status: 'invited' }])
    setInvite('')
  }

  return (
    <div className="space-y-4">
      <InviteRow value={invite} setValue={setInvite} onInvite={onInvite} />
      <div className="divide-y divide-[var(--cat-border)] overflow-hidden rounded-lg border border-[var(--cat-border)] bg-[var(--cat-card)]">
        {members.map(m => (
          <MemberRow key={m.email} member={m} onRole={onRole} onRemove={onRemove} />
        ))}
      </div>
      <RolesLegend />
    </div>
  )
}
