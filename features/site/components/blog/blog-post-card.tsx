import Link from 'next/link'

import { BlogCardFooter } from '@/features/site/components/blog/blog-card-footer'
import { BlogCardFrame } from '@/features/site/components/blog/blog-card-frame'
import { DEFAULT_BLOG_AUTHORS } from '@/features/site/lib/blog-authors'
import { formatBlogDate } from '@/features/site/lib/blog-date'
import type { SanityBlogPost } from '@/features/site/sanity/lib/queries'

interface BlogPostCardProps {
  post: SanityBlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps): React.ReactElement {
  const href = `/blog/${post.slug}`

  return (
    <article className="group relative space-y-4 duration-200">
      <BlogCardFrame seed={post.slug} />

      <time className="text-muted-foreground text-sm" dateTime={post.publishedAt}>
        {formatBlogDate(post.publishedAt)}
      </time>

      <h3 className="text-foreground font-semibold">
        <Link href={href} className="before:absolute before:inset-0">
          {post.title}
        </Link>
      </h3>

      <p className="text-muted-foreground">{post.excerpt}</p>

      <BlogCardFooter authors={DEFAULT_BLOG_AUTHORS} />
    </article>
  )
}
