'use client'

import { ExternalLink, GitPullRequest, Loader2 } from 'lucide-react'

import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import { Delta } from '@/features/catalyst/components/Delta'
import type { AutoFixProofState } from '@/hooks/useTaskAutoFix'
import type { AutoFixResult } from '@/lib/api/autofix'
import type { GithubJob } from '@/lib/api/github'

const PILL_TONE: Record<string, string> = {
  open: 'bg-[rgba(246,185,59,0.15)] text-[#a06f0a]',
  merged: 'bg-[#E7F7EF] text-[#1e8a5c]',
  applied: 'bg-[#E7F7EF] text-[#1e8a5c]',
  manual: 'bg-[rgba(246,185,59,0.15)] text-[#a06f0a]',
  failed: 'bg-[#FDECEC] text-[#E5484D]',
}

function Pill({ tone, children }: { tone: string; children: string }): JSX.Element {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${PILL_TONE[tone] ?? 'bg-[var(--cat-hover)] text-[var(--cat-ink-2)]'}`}
    >
      {children}
    </span>
  )
}

function ExternalAction({ href, children }: { href: string; children: string }): JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 self-start rounded-md border border-[var(--cat-border)] px-3 py-1.5 text-[12px] font-medium text-[var(--cat-ink)] transition-colors hover:bg-[var(--cat-hover)]"
    >
      {children}
      <ExternalLink size={12} />
    </a>
  )
}

function JobScore({ job }: { job: GithubJob }): JSX.Element | null {
  if (job.score_before === null || job.score_after === null) return null
  const diff = Math.round(job.score_after - job.score_before)
  return (
    <p className="flex items-center gap-2 text-[12px] text-[var(--cat-ink-2)]">
      Score {Math.round(job.score_before)} → {Math.round(job.score_after)}
      {diff !== 0 && <Delta positive={diff > 0}>{`${Math.abs(diff)} pts`}</Delta>}
    </p>
  )
}

function JobHeader({ job }: { job: GithubJob }): JSX.Element {
  const working = job.status === 'pending' || job.status === 'running'
  return (
    <div className="flex items-center gap-2">
      <GitPullRequest size={15} className="text-[var(--cat-ink-2)]" />
      <span className="text-[13px] font-semibold text-[var(--cat-ink)]">
        {job.pr_number ? `Pull request #${job.pr_number}` : 'Fix job'}
      </span>
      <span className="ml-auto">
        {working ? (
          <span className="inline-flex items-center gap-1.5 text-[12px] text-[var(--cat-ink-2)]">
            <Loader2 size={13} className="animate-spin" /> Writing the fix…
          </span>
        ) : (
          <Pill tone={job.status}>{job.status === 'open' ? 'PR open' : job.status}</Pill>
        )}
      </span>
    </div>
  )
}

function GithubProof({ job }: { job: GithubJob }): JSX.Element {
  return (
    <>
      <JobHeader job={job} />
      {job.files_changed.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {job.files_changed.map(file => (
            <p key={file.path} className="text-[12px] text-[var(--cat-ink-3)]">
              <span className="mr-2 rounded-sm bg-[var(--cat-hover)] px-1.5 py-0.5 font-mono text-[11px] text-[var(--cat-ink-2)]">
                {file.path}
              </span>
              {file.summary}
            </p>
          ))}
        </div>
      )}
      {job.reasoning && (
        <p className="line-clamp-4 text-[12px] leading-relaxed text-[var(--cat-ink-3)]">
          {job.reasoning}
        </p>
      )}
      {job.error_message && <p className="text-[12px] text-[#E5484D]">{job.error_message}</p>}
      <JobScore job={job} />
      {job.pr_url && <ExternalAction href={job.pr_url}>View pull request</ExternalAction>}
    </>
  )
}

/** Pill tone + label for a CMS apply result. */
function cmsBadge(result: AutoFixResult | null): { tone: string; label: string } {
  if (!result) return { tone: '', label: 'Working' }
  if (result.status === 'success' || result.status === 'verified') {
    return { tone: 'applied', label: result.status === 'verified' ? 'Verified' : 'Applied' }
  }
  return { tone: result.status, label: result.status }
}

function CmsHeader({ fix }: { fix: AutoFixProofState }): JSX.Element {
  const { tone, label } = cmsBadge(fix.result)
  return (
    <div className="flex items-center gap-2">
      <span className="text-[13px] font-semibold text-[var(--cat-ink)] capitalize">
        {fix.platform} fix
      </span>
      <span className="ml-auto">
        {fix.phase === 'working' ? (
          <span className="inline-flex items-center gap-1.5 text-[12px] text-[var(--cat-ink-2)]">
            <Loader2 size={13} className="animate-spin" /> Applying…
          </span>
        ) : (
          <Pill tone={tone}>{label}</Pill>
        )}
      </span>
    </div>
  )
}

function CmsProof({ fix }: { fix: AutoFixProofState }): JSX.Element {
  const { result, siteUrl } = fix
  return (
    <>
      <CmsHeader fix={fix} />
      {result?.message && (
        <p className="text-[12px] leading-relaxed text-[var(--cat-ink-2)]">{result.message}</p>
      )}
      {result?.generated_content && (
        <pre className="max-h-56 overflow-auto rounded-md border border-[var(--cat-border)] bg-[var(--cat-content)] p-3 font-mono text-[11.5px] leading-relaxed whitespace-pre-wrap text-[var(--cat-ink-2)]">
          {result.generated_content}
        </pre>
      )}
      {fix.phase === 'done' && siteUrl && (
        <ExternalAction href={siteUrl}>View the change live</ExternalAction>
      )}
    </>
  )
}

function RequestingRow(): JSX.Element {
  return (
    <p className="inline-flex items-center gap-1.5 text-[12px] text-[var(--cat-ink-2)]">
      <Loader2 size={13} className="animate-spin" />
      Opening a fix pull request on your repository…
    </p>
  )
}

function Proof({ fix }: { fix: AutoFixProofState }): JSX.Element {
  if (fix.platform !== 'nextjs') return <CmsProof fix={fix} />
  if (fix.job) return <GithubProof job={fix.job} />
  return <RequestingRow />
}

/** Integration-aware proof of the auto-fix: the PR it opened or the CMS push. */
export function TaskFixResultCard({ fix }: { fix: AutoFixProofState }): JSX.Element | null {
  const hasActivity = fix.phase !== 'idle' || fix.job !== null || fix.result !== null
  if (!hasActivity) return null
  return (
    <Card>
      <CardHead title="Auto-fix" />
      <div className="flex flex-col gap-2.5">
        <Proof fix={fix} />
      </div>
    </Card>
  )
}
