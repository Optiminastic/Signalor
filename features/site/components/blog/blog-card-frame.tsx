import { getBlogGradient } from '@/features/site/lib/blog-gradient'

interface BlogCardFrameProps {
  /** Stable seed (the post slug or tool href) that picks the gradient. */
  seed: string
  /** Optional centered overlay above the gradient, e.g. an icon tile. */
  children?: React.ReactNode
}

/**
 * The framed cover art shared by blog and tool cards: a soft `bg-card` frame with
 * a `p-0.5` inset and `shadow-md`, wrapping a `rounded-[10px]` mesh-gradient tile
 * that carries a hairline inner border via a `::before` overlay. An optional
 * `children` overlay is centered above the gradient.
 */
export function BlogCardFrame({ seed, children }: BlogCardFrameProps): React.ReactElement {
  return (
    <div className="bg-card/75 ring-border hover:bg-card/50 rounded-xl border border-transparent p-0.5 shadow-md ring-1 transition-colors">
      <div className="before:border-border relative aspect-video overflow-hidden rounded-[10px] before:absolute before:inset-0 before:z-10 before:rounded-[10px] before:border">
        <div
          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ background: getBlogGradient(seed) }}
        />
        {children ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center">{children}</div>
        ) : null}
      </div>
    </div>
  )
}
