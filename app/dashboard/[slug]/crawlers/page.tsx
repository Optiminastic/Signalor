import { CatalystShell } from '@/features/catalyst/components/CatalystShell'
import { CrawlerLogsView } from '@/features/catalyst/components/crawlers/CrawlerLogsView'

export default function CrawlerLogsPage(): JSX.Element {
  return (
    <CatalystShell>
      <CrawlerLogsView />
    </CatalystShell>
  )
}
