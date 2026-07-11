import type { GlobalConfig } from 'payload'

import { revalidatePath } from 'next/cache'

import { isAdmin } from '../access/isAdmin'
import link from '../fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Newsletter',
      fields: [
        {
          name: 'newsletterHeadline',
          type: 'textarea',
          defaultValue: 'Subscribe To Receive Exclusive Offers And News',
          label: 'Headline',
        },
        {
          name: 'newsletterDescription',
          type: 'text',
          defaultValue: 'Subscribe to receive exclusive offers and news.',
          label: 'Description',
        },
        {
          name: 'newsletterPlaceholder',
          type: 'text',
          defaultValue: 'Enter your email address',
          label: 'Email placeholder',
        },
        {
          name: 'newsletterButtonLabel',
          type: 'text',
          defaultValue: 'Subscribe',
          label: 'Button label',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Brand',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo image',
          admin: {
            description: 'Logo only — brand name text is not shown.',
          },
        },
        {
          name: 'tagline',
          type: 'textarea',
          defaultValue:
            'Experience timeless luxury, unmatched comfort, and exceptional service at The Aurum.',
          label: 'Tagline',
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social links',
          labels: {
            plural: 'Social links',
            singular: 'Social link',
          },
          maxRows: 6,
          defaultValue: [
            { platform: 'facebook', url: 'https://facebook.com' },
            { platform: 'instagram', url: 'https://instagram.com' },
            { platform: 'x', url: 'https://x.com' },
          ],
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'X', value: 'x' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL',
            },
          ],
        },
      ],
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Links',
      labels: {
        plural: 'Links',
        singular: 'Link',
      },
      defaultValue: [
        { link: { type: 'custom', label: 'Home', url: '/' } },
        { link: { type: 'custom', label: 'About', url: '/about' } },
        { link: { type: 'custom', label: 'Rooms', url: '/rooms' } },
        { link: { type: 'custom', label: 'Amenities', url: '/amenities' } },
        { link: { type: 'custom', label: 'Testimonials', url: '/#testimonials' } },
      ],
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      type: 'collapsible',
      label: 'Contact',
      fields: [
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+880 1234-567890',
          label: 'Phone',
        },
        {
          name: 'email',
          type: 'email',
          defaultValue: 'info@theaurum.com',
          label: 'Email',
        },
        {
          name: 'address',
          type: 'textarea',
          defaultValue: '123 Luxury Street, Beverly Hills, California, USA',
          label: 'Address',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Bottom bar',
      fields: [
        {
          name: 'copyright',
          type: 'text',
          defaultValue: '© 2026 The Aurum. All Rights Reserved',
          label: 'Copyright',
        },
        {
          name: 'legalLinks',
          type: 'array',
          label: 'Legal links',
          labels: {
            plural: 'Legal links',
            singular: 'Legal link',
          },
          maxRows: 4,
          defaultValue: [
            { link: { type: 'custom', label: 'Privacy Policy', url: '/privacy' } },
            { link: { type: 'custom', label: 'Terms & Conditions', url: '/terms' } },
          ],
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [() => revalidatePath('/', 'layout')],
  },
}
