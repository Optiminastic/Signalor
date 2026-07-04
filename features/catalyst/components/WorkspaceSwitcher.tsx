'use client'

import { Building2, Check, ChevronsUpDown, Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { getOrganizations } from '@/lib/api/organizations'
import { useSession } from '@/lib/auth-client'

const LOGO_BG = 'conic-gradient(from 210deg at 50% 50%, #F2A79E, #e04a3d, #b9382d, #F2A79E)'
const ACTIVE_KEY = 'signalor.activeProjectId'

interface Project {
  id: number
  name: string
  url: string
}

const SAMPLE_PROJECTS: Project[] = [
  { id: 1, name: 'Optiminastic', url: 'optiminastic.com' },
  { id: 2, name: 'Signalor', url: 'signalor.ai' },
  { id: 3, name: 'Tech5', url: 'tech5.io' },
]

function Tile({ label }: { label: string }): JSX.Element {
  return (
    <span
      className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-[13px] font-semibold text-white uppercase"
      style={{ background: LOGO_BG }}
    >
      {label[0]}
    </span>
  )
}

interface SwitcherState {
  projects: Project[]
  activeProject: Project
  select: (id: number) => void
}

function useProjectSwitcher(): SwitcherState {
  const { data: session } = useSession()
  const email = session?.user?.email
  const [projects, setProjects] = useState<Project[]>(SAMPLE_PROJECTS)
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    const saved = Number(localStorage.getItem(ACTIVE_KEY))
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setActiveId(saved)
  }, [])

  useEffect(() => {
    if (!email) return
    let active = true
    getOrganizations(email)
      .then(orgs => {
        if (active && orgs.length)
          setProjects(orgs.map(o => ({ id: o.id, name: o.name, url: o.url })))
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [email])

  const activeProject = projects.find(p => p.id === activeId) ?? projects[0]
  const select = (id: number): void => {
    setActiveId(id)
    localStorage.setItem(ACTIVE_KEY, String(id))
  }
  return { projects, activeProject, select }
}

interface MenuProps {
  projects: Project[]
  activeId: number
  onSelect: (id: number) => void
}

function MenuFooter(): JSX.Element {
  const item =
    'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] font-medium text-[var(--cat-ink-2)] transition-colors hover:bg-[var(--cat-hover)]'
  return (
    <>
      <div className="my-1 h-px bg-[var(--cat-border)]" />
      <Link href="/dashboard/brands" className={item}>
        <Building2 size={15} className="text-[var(--cat-ink-3)]" />
        Manage brands
      </Link>
      <Link href="/dashboard/brands" className={item}>
        <Plus size={15} className="text-[var(--cat-ink-3)]" />
        Create new brand
      </Link>
    </>
  )
}

function ProjectMenu({ projects, activeId, onSelect }: MenuProps): JSX.Element {
  return (
    <div className="absolute top-[calc(100%+4px)] right-0 left-0 z-30 overflow-hidden rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] p-1 shadow-lg">
      <p className="px-2 py-1.5 text-[10px] font-semibold tracking-wider text-[var(--cat-ink-3)] uppercase">
        Switch project
      </p>
      {projects.map(p => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSelect(p.id)}
          className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-[var(--cat-hover)]"
        >
          <Tile label={p.name} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-medium text-[var(--cat-ink)]">
              {p.name}
            </span>
            <span className="block truncate text-[11px] text-[var(--cat-ink-3)]">{p.url}</span>
          </span>
          {p.id === activeId && <Check size={15} className="shrink-0 text-[#e04a3d]" />}
        </button>
      ))}
      <MenuFooter />
    </div>
  )
}

function SwitcherTrigger({
  project,
  onToggle,
}: {
  project: Project
  onToggle: () => void
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-2.5 rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] px-2 py-1.5 text-left transition-colors hover:bg-[var(--cat-hover)]"
    >
      <Tile label={project.name} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold text-[var(--cat-ink)]">
          {project.name}
        </span>
        <span className="block truncate text-[11px] text-[var(--cat-ink-3)]">{project.url}</span>
      </span>
      <ChevronsUpDown size={15} className="shrink-0 text-[var(--cat-ink-3)]" />
    </button>
  )
}

export function WorkspaceSwitcher({ collapsed }: { collapsed?: boolean }): JSX.Element {
  const { projects, activeProject, select } = useProjectSwitcher()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDown(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const choose = (id: number): void => {
    select(id)
    setOpen(false)
  }

  if (collapsed) {
    return (
      <Link
        href="/dashboard/brands"
        title={activeProject.name}
        className="mt-3 flex justify-center rounded-md py-1 transition-colors hover:bg-[var(--cat-hover)]"
      >
        <Tile label={activeProject.name} />
      </Link>
    )
  }

  return (
    <div ref={ref} className="relative mt-3">
      <SwitcherTrigger project={activeProject} onToggle={() => setOpen(o => !o)} />
      {open && <ProjectMenu projects={projects} activeId={activeProject.id} onSelect={choose} />}
    </div>
  )
}
