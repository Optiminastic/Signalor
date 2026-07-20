import Link from 'next/link'

import { BlogCardFooter } from '@/features/site/components/blog/blog-card-footer'
import { BlogCardFrame } from '@/features/site/components/blog/blog-card-frame'
import { DEFAULT_BLOG_AUTHORS } from '@/features/site/lib/blog-authors'
import { formatBlogDate } from '@/features/site/lib/blog-date'
import type { SanityBlogPost } from '@/features/site/sanity/lib/queries'

interface FeaturedBlogCardProps {
  post: SanityBlogPost
}

export function FeaturedBlogCard({ post }: FeaturedBlogCardProps): React.ReactElement {
  const href = `/blog/${post.slug}`

  return (
    <article className="group relative space-y-6 rounded-xl">
      <BlogCardFrame seed={post.slug} />

      <div className="grid gap-3 p-0.5">
        <time className="text-muted-foreground text-sm" dateTime={post.publishedAt}>
          {formatBlogDate(post.publishedAt)}
        </time>

        <h2 className="text-foreground text-lg font-semibold text-balance md:text-xl">
          <Link href={href} className="before:absolute before:inset-0">
            {post.title}
          </Link>
        </h2>

        <p className="text-muted-foreground">{post.excerpt}</p>

        <BlogCardFooter authors={DEFAULT_BLOG_AUTHORS} />
      </div>
    </article>
  )
}
