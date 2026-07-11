import type { Block } from 'payload'

import link from '@root/fields/link'

/**
 * Aurum About — two-column about section with stats and image.
 */
export const AurumAboutSection: Block = {
  slug: 'aurumAbout',
  interfaceName: 'AurumAboutSection',
  labels: {
    plural: 'About',
    singular: 'About',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'About',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'textarea',
      defaultValue: 'Experience\nUnmatched Luxury',
      label: 'Headline',
      required: true,
      admin: {
        description: 'Use a line break to split the heading across two lines.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'For over 10 years, The Aurum has offered guests an unparalleled luxury experience, blending modern comfort with timeless sophistication.',
      label: 'Description',
      required: true,
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Call to Action',
        defaultValue: {
          type: 'custom',
          label: 'About More',
          url: '/about',
        },
      },
    }),
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      labels: {
        plural: 'Stats',
        singular: 'Stat',
      },
      maxRows: 4,
      defaultValue: [
        { value: '100%', label: 'Natural Surroundings' },
        { value: '15 MIN', label: 'Nearest City' },
        { value: '10', label: 'Cozy Room' },
      ],
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      required: true,
    },
  ],
}
