import type { CollectionConfig } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { isAdmin } from '../access/isAdmin'
import { publishedOnly } from '../access/publishedOnly'
import { fullTitle } from '../fields/fullTitle'
import { hero } from '../fields/hero'
import { slugField } from '../fields/slug'
import { formatPreviewURL } from '../utilities/formatPreviewURL'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: publishedOnly,
    readVersions: isAdmin,
    update: isAdmin,
  },
  admin: {
    defaultColumns: ['fullTitle', 'slug', 'createdAt', 'updatedAt'],
    livePreview: {
      url: ({ data }) => formatPreviewURL('pages', data),
    },
    preview: (doc) => formatPreviewURL('pages', doc),
    useAsTitle: 'fullTitle',
  },
  defaultPopulate: {
    slug: true,
    breadcrumbs: true,
    title: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    fullTitle,
    {
      name: 'noindex',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
      label: 'No Index',
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blockReferences: [
                'callout',
                'aurumTemplate',
                'cta',
                'cardGrid',
                'caseStudyCards',
                'caseStudiesHighlight',
                'caseStudyParallax',
                'codeFeature',
                'content',
                'contentGrid',
                'comparisonTable',
                'form',
                'hoverCards',
                'hoverHighlights',
                'linkGrid',
                'logoGrid',
                'mediaBlock',
                'mediaContent',
                'mediaContentAccordion',
                'pricing',
                'reusableContentBlock',
                'slider',
                'statement',
                'steps',
                'stickyHighlights',
                'exampleTabs',
              ],
              blocks: [],
              required: true,
            },
          ],
          label: 'Content',
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [
      ({ doc, previousDoc }) => {
        if (doc._status === 'published' || doc._status !== previousDoc._status) {
          revalidateTag('pages')
          revalidateTag(`page-${doc.slug}`)

          if (doc.breadcrumbs && doc.breadcrumbs.length > 0) {
            const url = doc.breadcrumbs[doc.breadcrumbs.length - 1].url as string
            const pathKey = url.replace(/^\/|\/$/g, '') || 'home'
            revalidateTag(`page-${pathKey}`)
            revalidatePath(url)
            if (doc.slug === 'home' || url === '/home') {
              revalidateTag('page-home')
              revalidatePath('/')
            }
          } else {
            revalidatePath(`/${doc.slug}`)
            if (doc.slug === 'home') {
              revalidateTag('page-home')
              revalidatePath('/')
            }
          }
        }
      },
    ],
  },
  versions: {
    drafts: true,
  },
}
