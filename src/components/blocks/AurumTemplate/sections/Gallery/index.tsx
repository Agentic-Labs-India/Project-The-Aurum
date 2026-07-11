'use client'

import type { Media as MediaType } from '@root/payload-types'

import { Media } from '@components/Media/index'
import React from 'react'

import classes from './index.module.scss'

export type AurumGalleryProps = {
  blockType?: 'aurumGallery'
  id?: null | string
  images?:
    | {
        alt?: null | string
        id?: null | string
        image?: MediaType | null | string
      }[]
    | null
}

export const AurumGallery: React.FC<AurumGalleryProps> = ({ images }) => {
  const items = (images ?? []).filter((item) => item?.image && typeof item.image !== 'string')

  if (items.length === 0) {
    return null
  }

  return (
    <div className={classes.gallery}>
      <div className={classes.strip} role="list">
        {items.map((item, index) => {
          const media = item.image as MediaType

          return (
            <div
              className={classes.item}
              key={item.id ?? media.id ?? `gallery-${index}`}
              role="listitem"
            >
              <Media
                alt={item.alt || media.alt || ''}
                className={classes.mediaInner}
                fill
                imgClassName={classes.image}
                resource={media}
                sizes={`${Math.round(100 / items.length)}vw`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
