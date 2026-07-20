export interface BlogAuthor {
  name: string
  /** Optional avatar URL. When absent, a brand monogram is rendered instead. */
  avatar?: string
}

/**
 * Posts in Sanity have no author field yet, so blog cards attribute to the
 * brand. Swap this out once an `author` field is added to the post schema.
 */
export const DEFAULT_BLOG_AUTHORS: BlogAuthor[] = [{ name: 'SignalorAI' }]
