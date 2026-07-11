import type { Block } from 'payload'

/**
 * Aurum Interior — dark two-column features + image.
 */
export const AurumInteriorSection: Block = {
  slug: 'aurumInterior',
  interfaceName: 'AurumInteriorSection',
  labels: {
    plural: 'Interior',
    singular: 'Interior',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Interior',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      defaultValue: 'Designed For Comfort & Style',
      label: 'Headline',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Our interiors reflect elegance, warmth, and modern luxury in every detail.',
      label: 'Description',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      labels: {
        plural: 'Features',
        singular: 'Feature',
      },
      maxRows: 6,
      defaultValue: [
        {
          number: '01',
          title: 'Elegant Interiors',
          description:
            'Modern design with timeless details that create a warm, inviting atmosphere.',
        },
        {
          number: '02',
          title: 'Spacious & Functional',
          description:
            'Every room is thoughtfully designed to balance style with comfort for your perfect stay.',
        },
        {
          number: '03',
          title: 'Premium Materials & Finishes',
          description:
            'From luxury linens to fine furniture, every element is chosen for quality and elegance.',
        },
      ],
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          label: 'Number',
          defaultValue: '01',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
  ],
}
