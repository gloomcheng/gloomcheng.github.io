import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import * as z from 'astro/zod'

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    legacyPath: z.string().startsWith('/'),
    kind: z.enum(['article', 'technical']),
    tags: z.array(z.string()),
    legacyNid: z.number().int().positive(),
    archived: z.literal(true),
  }),
})

export const collections = { blog }
