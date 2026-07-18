'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { groq } from 'next-sanity'

import { client } from '@/features/site/sanity/lib/client'

const RECENT_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3] {
  "slug": slug.current,
  title
}`

interface RecentPost {
  slug: string
  title: string
}

const TITLE_MAX_CHARS = 34

function truncateTitle(title: string): string {
  if (title.length <= TITLE_MAX_CHARS) return title
  return title.slice(0, TITLE_MAX_CHARS).trimEnd() + '…'
}

/** Latest blog posts for the footer's resources column (client-side fetch). */
export function HomeFooterRecentPosts(): JSX.Element {
  const [posts, setPosts] = useState<RecentPost[]>([])

  useEffect(() => {
    client
      .fetch<RecentPost[]>(RECENT_POSTS_QUERY)
      .then(setPosts)
      .catch(() => {
        /* graceful: column simply shows the static Blog link */
      })
  }, [])

  return (
    <>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {truncateTitle(post.title)}
          </Link>
        </li>
      ))}
    </>
  )
}
