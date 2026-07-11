'use client'

import type { Media as MediaType } from '@root/payload-types'

import { CMSLink } from '@components/CMSLink/index'
import { Media } from '@components/Media/index'
import React from 'react'

import classes from './index.module.scss'

type LinkField = {
  label?: null | string
  newTab?: boolean | null
  reference?: {
    relationTo: 'case-studies' | 'pages' | 'posts'
    value: { slug?: string } | string
  } | null
  type?: 'custom' | 'reference' | null
  url?: null | string
}

export type AurumAboutProps = {
  blockType?: 'aurumAbout'
  cta?: LinkField
  description?: null | string
  eyebrow?: null | string
  headline?: null | string
  id?: null | string
  image?: MediaType | null | string
  stats?:
    | {
        id?: null | string
        label?: null | string
        value?: null | string
      }[]
    | null
}

export const AurumAbout: React.FC<AurumAboutProps> = ({
  cta,
  description,
  eyebrow,
  headline,
  image,
  stats,
}) => {
  const headlineLines = (headline || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return (
    <div className={classes.about}>
      <div className={classes.inner}>
        <div className={classes.copy}>
          {eyebrow ? (
            <p className={classes.eyebrow}>
              <span className={classes.eyebrowLine} aria-hidden />
              <span>{eyebrow}</span>
            </p>
          ) : null}

          {headlineLines.length > 0 ? (
            <h2 className={classes.headline}>
              {headlineLines.map((line, index) => (
                <span className={classes.headlineLine} key={`${line}-${index}`}>
                  {line}
                </span>
              ))}
            </h2>
          ) : null}

          {description ? <p className={classes.description}>{description}</p> : null}

          {cta?.label ? (
            <CMSLink {...cta} className={classes.cta} label={null}>
              <span>{cta.label}</span>
              <span aria-hidden className={classes.ctaArrow}>
                →
              </span>
            </CMSLink>
          ) : null}

          {stats && stats.length > 0 ? (
            <dl className={classes.stats}>
              {stats.map((stat, index) => {
                if (!stat?.value || !stat?.label) {
                  return null
                }

                return (
                  <div className={classes.stat} key={stat.id ?? `${stat.value}-${index}`}>
                    <dt className={classes.statValue}>{stat.value}</dt>
                    <dd className={classes.statLabel}>{stat.label}</dd>
                  </div>
                )
              })}
            </dl>
          ) : null}
        </div>

        <div className={classes.media}>
          {image && typeof image !== 'string' ? (
            <Media
              className={classes.mediaInner}
              fill
              imgClassName={classes.image}
              resource={image}
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          ) : (
            <div className={classes.mediaFallback} />
          )}
        </div>
      </div>
    </div>
  )
}
