import type { Block } from 'payload'

/**
 * Aurum Gallery — seamless full-bleed image strip.
 */
export const AurumGallerySection: Block = {
  slug: 'aurumGallery',
  interfaceName: 'AurumGallerySection',
  labels: {
    plural: 'Gallery',
    singular: 'Gallery',
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      labels: {
        plural: 'Images',
        singular: 'Image',
      },
      minRows: 1,
      maxRows: 8,
      admin: {
        description: 'Displayed as a seamless full-width strip with no gaps between images.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt text (optional)',
        },
      ],
    },
  ],
}
