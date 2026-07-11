'use client'

import type { Media as MediaType } from '@root/payload-types'

import { CMSLink, type CMSLinkType } from '@components/CMSLink/index'
import { Media } from '@components/Media/index'
import React from 'react'

import classes from './index.module.scss'

export type AurumAmenitiesProps = {
  blockType?: 'aurumAmenities'
  description?: null | string
  eyebrow?: null | string
  headline?: null | string
  id?: null | string
  items?:
    | {
        description?: null | string
        id?: null | string
        image?: MediaType | null | string
        link?: CMSLinkType | null
        title?: null | string
      }[]
    | null
}

function ArrowIcon() {
  return (
    <span aria-hidden className={classes.arrow}>
      <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.5 9H14.5M14.5 9L10 4.5M14.5 9L10 13.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </span>
  )
}

export const AurumAmenities: React.FC<AurumAmenitiesProps> = ({
  description,
  eyebrow,
  headline,
  items,
}) => {
  const list = items ?? []

  return (
    <div className={classes.amenities}>
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
          {description ? <p className={classes.description}>{description}</p> : null}
        </div>

        {list.length > 0 ? (
          <ul className={classes.list}>
            {list.map((item, index) => {
              if (!item?.title) {
                return null
              }

              const hasLink = Boolean(item.link?.label || item.link?.url || item.link?.reference)
              const key = item.id ?? `${item.title}-${index}`

              const body = (
                <>
                  <div className={classes.itemMedia}>
                    {item.image && typeof item.image !== 'string' ? (
                      <Media
                        className={classes.mediaInner}
                        fill
                        imgClassName={classes.image}
                        resource={item.image}
                        sizes="(max-width: 768px) 40vw, 220px"
                      />
                    ) : (
                      <div className={classes.mediaFallback} />
                    )}
                  </div>

                  <div className={classes.itemCopy}>
                    <h3 className={classes.itemTitle}>{item.title}</h3>
                    {item.description ? (
                      <p className={classes.itemDescription}>{item.description}</p>
                    ) : null}
                  </div>

                  <ArrowIcon />
                </>
              )

              return (
                <li className={classes.item} key={key}>
                  {hasLink ? (
                    <CMSLink {...item.link} className={classes.itemLink} label={null}>
                      {body}
                    </CMSLink>
                  ) : (
                    <div className={classes.itemLink}>{body}</div>
                  )}
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </div>
  )
}
