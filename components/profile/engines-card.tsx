import { SectionCard } from './section-card'

/** The AI engines/surfaces we track the brand across. */
export function EnginesCard({ engines }: { engines: string[] }): JSX.Element {
  return (
    <SectionCard title="AI engines" description="Surfaces we track your brand across.">
      <div className="flex flex-wrap gap-1.5">
        {engines.map(engine => (
          <span
            key={engine}
            className="rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] px-2.5 py-1 text-[11px] font-medium text-[var(--cat-ink-2)]"
          >
            {engine}
          </span>
        ))}
      </div>
    </SectionCard>
  )
}
