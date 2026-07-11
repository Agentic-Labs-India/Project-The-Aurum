import type { Block } from 'payload'

import link from '@root/fields/link'

/**
 * Aurum Amenities — cream list of amenity rows with image + arrow.
 */
export const AurumAmenitiesSection: Block = {
  slug: 'aurumAmenities',
  interfaceName: 'AurumAmenitiesSection',
  labels: {
    plural: 'Amenities',
    singular: 'Amenities',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Amenities',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'text',
      defaultValue: 'Amenities Beyond Expectations',
      label: 'Headline',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Every detail is designed to provide you with the finest luxury and comfort throughout your stay.',
      label: 'Description',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Amenities',
      labels: {
        plural: 'Amenities',
        singular: 'Amenity',
      },
      minRows: 1,
      maxRows: 8,
      defaultValue: [
        {
          title: 'Luxury Spa & Wellness',
          description:
            'Relax, rejuvenate, and restore with world-class spa treatments, sauna, and wellness therapies.',
        },
        {
          title: 'Infinity Pool With Scenic Views',
          description:
            'Unwind at our infinity pool while enjoying breathtaking views of the city skyline or ocean horizon.',
        },
        {
          title: 'Fine Dining Experience',
          description:
            'Indulge in gourmet cuisine prepared by award-winning chefs, paired with exquisite wines in an elegant setting.',
        },
        {
          title: 'State-Of-The-Art Fitness Center',
          description:
            'Stay fit during your stay with our fully equipped gym, featuring modern machines and personal trainers.',
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
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        link({
          appearances: false,
          overrides: {
            name: 'link',
            label: 'Link (optional)',
          },
        }),
      ],
    },
  ],
}
