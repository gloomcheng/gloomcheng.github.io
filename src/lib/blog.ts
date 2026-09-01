import { getCollection } from 'astro:content'

export interface BlogPost {
  id: string
  body?: string
  collection: 'blog'
  data: {
    title: string
    description: string
    publishedAt: Date
    updatedAt: Date
    legacyPath: string
    kind: 'article' | 'technical'
    tags: string[]
    legacyNid: number
    archived: true
  }
}

export const getBlogPosts = async () =>
  ((await getCollection('blog')) as BlogPost[]).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  )

export const blogPath = (legacyPath: string) =>
  `/blog${legacyPath.replace(/\/$/, '')}/`

export const formatBlogDate = (date: Date) =>
  new Intl.DateTimeFormat('zh-Hant-TW', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)

export const blogYear = (date: Date) =>
  new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
  }).format(date)
