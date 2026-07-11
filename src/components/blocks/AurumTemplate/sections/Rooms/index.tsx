'use client'

import type { Media as MediaType } from '@root/payload-types'

import { CMSLink, type CMSLinkType } from '@components/CMSLink/index'
import { Media } from '@components/Media/index'
import React from 'react'

import classes from './index.module.scss'

export type AurumRoomsProps = {
  blockType?: 'aurumRooms'
  cta?: CMSLinkType | null
  description?: null | string
  eyebrow?: null | string
  headline?: null | string
  id?: null | string
  rooms?:
    | {
        id?: null | string
        image?: MediaType | null | string
        link?: CMSLinkType | null
        priceLabel?: null | string
        title?: null | string
      }[]
    | null
}

export const AurumRooms: React.FC<AurumRoomsProps> = ({
  cta,
  description,
  eyebrow,
  headline,
  rooms,
}) => {
  const items = rooms ?? []

  return (
    <div className={classes.rooms}>
      <div className={classes.inner}>
        <div className={classes.header}>
          <div className={classes.headerLeft}>
            {eyebrow ? (
              <p className={classes.eyebrow}>
                <span aria-hidden className={classes.eyebrowLine} />
                <span>{eyebrow}</span>
              </p>
            ) : null}
            {headline ? <h2 className={classes.headline}>{headline}</h2> : null}
          </div>

          <div className={classes.headerRight}>
            {description ? <p className={classes.description}>{description}</p> : null}
            {cta?.label ? (
              <CMSLink {...cta} className={classes.cta} label={null}>
                <span>{cta.label}</span>
                <span aria-hidden className={classes.ctaArrow}>
                  →
                </span>
              </CMSLink>
            ) : null}
          </div>
        </div>

        {items.length > 0 ? (
          <div className={classes.grid}>
            {items.map((room, index) => {
              if (!room?.title) {
                return null
              }

              const content = (
                <>
                  <div className={classes.cardMedia}>
                    {room.image && typeof room.image !== 'string' ? (
                      <Media
                        className={classes.mediaInner}
                        fill
                        imgClassName={classes.image}
                        resource={room.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className={classes.mediaFallback} />
                    )}
                    <div className={classes.cardOverlay} />
                  </div>
                  <div className={classes.cardCopy}>
                    <p className={classes.cardTitle}>{room.title}</p>
                    {room.priceLabel ? (
                      <p className={classes.cardPrice}>{room.priceLabel}</p>
                    ) : null}
                  </div>
                </>
              )

              const key = room.id ?? `${room.title}-${index}`

              if (room.link?.label || room.link?.url || room.link?.reference) {
                return (
                  <CMSLink {...room.link} className={classes.card} key={key} label={null}>
                    {content}
                  </CMSLink>
                )
              }

              return (
                <article className={classes.card} key={key}>
                  {content}
                </article>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}
