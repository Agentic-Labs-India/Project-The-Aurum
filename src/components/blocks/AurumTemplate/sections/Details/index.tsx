'use client'

import type { Media as MediaType } from '@root/payload-types'

import { CMSLink, type CMSLinkType } from '@components/CMSLink/index'
import { Media } from '@components/Media/index'
import React from 'react'

import classes from './index.module.scss'

export type AurumDetailsProps = {
  blockType?: 'aurumDetails'
  caption?: null | string
  cta?: CMSLinkType | null
  details?:
    | {
        id?: null | string
        label?: null | string
        value?: null | string
      }[]
    | null
  headline?: null | string
  id?: null | string
  image?: MediaType | null | string
}

export const AurumDetails: React.FC<AurumDetailsProps> = ({
  caption,
  cta,
  details,
  headline,
  image,
}) => {
  const rows = details ?? []

  return (
    <div className={classes.details}>
      <div className={classes.inner}>
        <div className={classes.visual}>
          <div className={classes.media}>
            {image && typeof image !== 'string' ? (
              <Media
                className={classes.mediaInner}
                fill
                imgClassName={classes.image}
                resource={image}
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            ) : (
              <div className={classes.mediaFallback} />
            )}
          </div>

          {caption ? <p className={classes.caption}>{caption}</p> : null}

          {cta?.label ? (
            <CMSLink {...cta} className={classes.cta} label={null}>
              <span>{cta.label}</span>
              <span aria-hidden className={classes.ctaArrow}>
                →
              </span>
            </CMSLink>
          ) : null}
        </div>

        <div className={classes.panel}>
          {headline ? <h2 className={classes.headline}>{headline}</h2> : null}

          {rows.length > 0 ? (
            <dl className={classes.list}>
              {rows.map((row, index) => {
                if (!row?.label || !row?.value) {
                  return null
                }

                return (
                  <div className={classes.row} key={row.id ?? `${row.label}-${index}`}>
                    <dt className={classes.label}>{row.label}</dt>
                    <dd className={classes.value}>{row.value}</dd>
                  </div>
                )
              })}
            </dl>
          ) : null}
        </div>
      </div>
    </div>
  )
}
