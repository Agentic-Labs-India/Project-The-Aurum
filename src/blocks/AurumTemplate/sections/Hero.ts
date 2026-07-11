import type { Block } from 'payload'

import link from '@root/fields/link'

/**
 * Aurum Hero — full-bleed hero with overlay nav and sheet menu.
 */
export const AurumHeroSection: Block = {
  slug: 'aurumHero',
  interfaceName: 'AurumHeroSection',
  labels: {
    plural: 'Heroes',
    singular: 'Hero',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo',
      relationTo: 'media',
      admin: {
        description: 'Logo image only — brand name text is not shown in the nav.',
      },
    },
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'The Aurum',
      label: 'Brand name (accessibility)',
      admin: {
        description: 'Used for aria-label / sheet title only. Not displayed next to the logo.',
      },
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Sheet menu links',
      labels: {
        plural: 'Links',
        singular: 'Link',
      },
      admin: {
        description: 'Links shown in the sheet menu opened from the hamburger.',
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
      defaultValue: [
        {
          link: {
            type: 'custom',
            label: 'Rooms',
            url: '/rooms',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Amenities',
            url: '/amenities',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Experiences',
            url: '/experiences',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Contact',
            url: '/contact',
          },
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Background image',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'headline',
      type: 'textarea',
      defaultValue: 'Experience Timeless Luxury & Comfort',
      label: 'Headline',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Discover the perfect balance of luxury and comfort with our modern hotel and resort. Designed for travelers who seek unforgettable experiences in every moment of their stay.',
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
          label: 'Explore Our Rooms',
          url: '/rooms',
        },
      },
    }),
  ],
}
