import type { Block } from 'payload'

/**
 * Aurum Testimonials — cream quote carousel with portrait + prev/next.
 */
export const AurumTestimonialsSection: Block = {
  slug: 'aurumTestimonials',
  interfaceName: 'AurumTestimonialsSection',
  labels: {
    plural: 'Testimonials',
    singular: 'Testimonials',
  },
  fields: [
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      labels: {
        plural: 'Testimonials',
        singular: 'Testimonial',
      },
      minRows: 1,
      defaultValue: [
        {
          quote:
            'From the infinity pool to the fine dining, everything was world class. Truly one of the best stays I’ve ever had at The Aurum.',
          name: 'Michael Chen',
          location: 'New York, USA',
        },
        {
          quote:
            'Every detail felt intentional — the rooms, the spa, the quiet luxury. We already booked our next visit.',
          name: 'Sofia Ramirez',
          location: 'Madrid, Spain',
        },
        {
          quote:
            'A rare balance of calm and sophistication. The Aurum made our anniversary unforgettable.',
          name: 'James & Priya Okonkwo',
          location: 'London, UK',
        },
      ],
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Portrait image',
        },
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Quote',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name',
        },
        {
          name: 'location',
          type: 'text',
          required: true,
          label: 'Location',
        },
      ],
    },
  ],
}
