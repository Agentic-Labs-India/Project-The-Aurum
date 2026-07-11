'use client'

import type { Media as MediaType } from '@root/payload-types'

import { Media } from '@components/Media/index'
import React from 'react'

import classes from './index.module.scss'

export type AurumInteriorProps = {
  blockType?: 'aurumInterior'
  description?: null | string
  eyebrow?: null | string
  features?:
    | {
        description?: null | string
        id?: null | string
        number?: null | string
        title?: null | string
      }[]
    | null
  headline?: null | string
  id?: null | string
  image?: MediaType | null | string
}

export const AurumInterior: React.FC<AurumInteriorProps> = ({
  description,
  eyebrow,
  features,
  headline,
  image,
}) => {
  const items = features ?? []

  return (
    <div className={classes.interior}>
      <div className={classes.inner}>
        <div className={classes.copy}>
          {eyebrow ? (
            <p className={classes.eyebrow}>
              <span aria-hidden className={classes.eyebrowLine} />
              <span>{eyebrow}</span>
            </p>
          ) : null}
          {headline ? <h2 className={classes.headline}>{headline}</h2> : null}
          {description ? <p className={classes.description}>{description}</p> : null}

          {items.length > 0 ? (
            <ol className={classes.features}>
              {items.map((feature, index) => {
                if (!feature?.title) {
                  return null
                }

                return (
                  <li
                    className={classes.feature}
                    key={feature.id ?? `${feature.title}-${index}`}
                  >
                    <p className={classes.featureTitle}>
                      <span className={classes.featureNumber}>
                        ({feature.number || String(index + 1).padStart(2, '0')})
                      </span>{' '}
                      {feature.title}
                    </p>
                    {feature.description ? (
                      <p className={classes.featureDescription}>{feature.description}</p>
                    ) : null}
                  </li>
                )
              })}
            </ol>
          ) : null}
        </div>

        <div className={classes.media}>
          {image && typeof image !== 'string' ? (
            <Media
              className={classes.mediaInner}
              fill
              imgClassName={classes.image}
              resource={image}
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
          ) : (
            <div className={classes.mediaFallback} />
          )}
        </div>
      </div>
    </div>
  )
}
