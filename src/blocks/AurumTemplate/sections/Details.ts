import type { Block } from 'payload'

import link from '@root/fields/link'

/**
 * Aurum Details — hotel details at a glance with image + CTA.
 */
export const AurumDetailsSection: Block = {
  slug: 'aurumDetails',
  interfaceName: 'AurumDetailsSection',
  labels: {
    plural: 'Details',
    singular: 'Details',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'caption',
      type: 'text',
      defaultValue: 'Explore our hotel through stunning visuals.',
      label: 'Caption',
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Call to Action',
        defaultValue: {
          type: 'custom',
          label: 'Contact Now',
          url: '/contact',
        },
      },
    }),
    {
      name: 'headline',
      type: 'text',
      defaultValue: 'Hotel Details At a Glance',
      label: 'Headline',
      required: true,
    },
    {
      name: 'details',
      type: 'array',
      label: 'Details',
      labels: {
        plural: 'Details',
        singular: 'Detail',
      },
      defaultValue: [
        { label: 'Location', value: 'Beverly Hills, California' },
        { label: 'Total area', value: '4,500 sq ft' },
        { label: 'Living space', value: '3,200 sq ft' },
        { label: 'Floors', value: '2 Floors' },
        { label: 'Built-in year', value: '2016' },
        { label: 'Bathrooms', value: '4 Modern Bathrooms' },
        { label: 'Bedrooms', value: '5 Luxurious Bedrooms' },
        { label: 'Private pool', value: 'Infinity Pool (15 x 30 ft)' },
        { label: 'Outdoor space', value: '1,200 sq ft of garden and patio areas' },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value',
        },
      ],
    },
  ],
}
