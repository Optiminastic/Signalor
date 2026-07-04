import { FooterColumns } from '@/features/landing/components/FooterColumns'
import { FooterCta } from '@/features/landing/components/FooterCta'
import { FooterLegal } from '@/features/landing/components/FooterLegal'

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-black/[0.06] bg-white">
      <FooterCta />
      <FooterColumns />
      <FooterLegal />
    </footer>
  )
}
