import type { GlobalConfig } from 'payload'

import link from '@root/fields/link'
import { revalidatePath, revalidateTag } from 'next/cache'

export const TopBar: GlobalConfig = {
  slug: 'topBar',
  fields: [
    {
      name: 'enableTopBar',
      type: 'checkbox',
      label: 'Enable Top Bar?',
    },
    {
      name: 'message',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.enableTopBar,
      },
      label: 'Message',
      required: true,
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          condition: (_, siblingData) => siblingData.enableTopBar,
        },
      },
    }),
  ],
  hooks: {
    afterChange: [
      () => {
        revalidateTag('globals')
        revalidateTag('topBar')
        revalidatePath('/', 'layout')
      },
    ],
  },
}
