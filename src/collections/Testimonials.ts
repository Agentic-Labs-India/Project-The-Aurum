import type { CollectionConfig } from 'payload'

import { isAdmin } from '@root/access/isAdmin'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },
  admin: {
    defaultColumns: ['title', 'location', 'rating', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Role / title',
      required: true,
      admin: {
        description: 'e.g. Villa Owner',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Coorg (Kodagu)',
      },
    },
    {
      name: 'initial',
      type: 'text',
      label: 'Avatar initial',
      required: true,
      maxLength: 1,
      admin: {
        description: 'Single letter shown in the avatar circle',
        width: '50%',
      },
    },
    {
      name: 'rating',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 5,
      required: true,
      admin: {
        description: 'Star rating from 1 to 5',
        step: 1,
        width: '50%',
      },
    },
  ],
}
