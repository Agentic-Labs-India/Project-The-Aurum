import type { Block } from 'payload'

import link from '@root/fields/link'

/**
 * Aurum Rooms — dark curated rooms grid (3 + 2).
 */
export const AurumRoomsSection: Block = {
  slug: 'aurumRooms',
  interfaceName: 'AurumRoomsSection',
  labels: {
    plural: 'Rooms',
    singular: 'Rooms',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Room / Suite',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      defaultValue: 'Elegantly Curated Rooms',
      label: 'Headline',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Every room is designed with comfort, style, and sophistication to give you a truly luxurious stay.',
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
          label: 'View All Rooms',
          url: '/rooms',
        },
      },
    }),
    {
      name: 'rooms',
      type: 'array',
      label: 'Rooms',
      labels: {
        plural: 'Rooms',
        singular: 'Room',
      },
      minRows: 1,
      maxRows: 8,
      admin: {
        description: 'Displayed as a 3-up top row, then a 2-up bottom row when 5 rooms are set.',
      },
      defaultValue: [
        {
          title: 'Delux Room',
          priceLabel: 'Price from $333.0 Night',
        },
        {
          title: 'Modern Room',
          priceLabel: 'Price from $333.0 Night',
        },
        {
          title: 'Cozy Room',
          priceLabel: 'Price from $333.0 Night',
        },
        {
          title: 'Family Suite',
          priceLabel: 'Price from $333.0 Night',
        },
        {
          title: 'Grand Luxury Room',
          priceLabel: 'Price from $333.0 Night',
        },
      ],
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'priceLabel',
          type: 'text',
          required: true,
          label: 'Price label',
          defaultValue: 'Price from $333.0 Night',
        },
        link({
          appearances: false,
          overrides: {
            name: 'link',
            label: 'Room link (optional)',
          },
        }),
      ],
    },
  ],
}
