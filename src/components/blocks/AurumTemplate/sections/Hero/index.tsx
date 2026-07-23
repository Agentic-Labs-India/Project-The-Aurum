'use client'

import type { Media as MediaType } from '@root/payload-types'

import { AurumNav, type AurumNavLinkItem } from '@components/AurumNav/index'
import { CMSLink, type CMSLinkType } from '@components/CMSLink/index'
import { Media } from '@components/Media/index'
import { normalizeMediaUrl } from '@root/utilities/normalizeMediaUrl'
import React from 'react'

import classes from './index.module.scss'

export type AurumHeroProps = {
  backgroundImage?: MediaType | null | string
  backgroundType?: 'image' | 'video' | null
  backgroundVideo?: MediaType | null | string
  backgroundVideoPoster?: MediaType | null | string
  blockType?: 'aurumHero'
  brandName?: null | string
  cta?: CMSLinkType | null
  description?: null | string
  headline?: null | string
  id?: null | string
  logo?: MediaType | null | string
  navLinks?: AurumNavLinkItem[] | null
}

function isMedia(resource: MediaType | null | string | undefined): resource is MediaType {
  return Boolean(resource && typeof resource !== 'string')
}

export const AurumHero: React.FC<AurumHeroProps> = ({
  backgroundImage,
  backgroundType,
  backgroundVideo,
  backgroundVideoPoster,
  brandName,
  cta,
  description,
  headline,
  navLinks,
}) => {
  const useVideo = backgroundType === 'video' && isMedia(backgroundVideo)
  const useImage = !useVideo && isMedia(backgroundImage)
  const posterUrl =
    useVideo && isMedia(backgroundVideoPoster)
      ? normalizeMediaUrl(backgroundVideoPoster.url)
      : undefined

  return (
    <div className={classes.root}>
      <AurumNav brandName={brandName} navLinks={navLinks} />

      <div className={classes.hero}>
        <div className={classes.media}>
          {useVideo ? (
            <Media
              className={classes.mediaInner}
              poster={posterUrl}
              resource={backgroundVideo}
              videoClassName={classes.video}
            />
          ) : null}

          {useImage ? (
            <Media
              className={classes.mediaInner}
              fill
              imgClassName={classes.image}
              priority
              resource={backgroundImage}
              sizes="100vw"
            />
          ) : null}

          {!useVideo && !useImage ? <div className={classes.mediaFallback} /> : null}

          <div className={classes.overlay} />
        </div>

        <div className={classes.inner}>
          <div className={classes.navSpacer} aria-hidden />

          <div className={classes.content}>
            {headline ? <h1 className={classes.headline}>{headline}</h1> : null}
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
      </div>
    </div>
  )
}
