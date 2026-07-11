'use client'

import type { Media as MediaType } from '@root/payload-types'

import { CMSLink } from '@components/CMSLink/index'
import { Media } from '@components/Media/index'
import { formatSheetSlug, Sheet, SheetToggler } from '@components/Sheet/index'
import { useModal } from '@faceless-ui/modal'
import Link from 'next/link'
import React, { useEffect, useId, useState } from 'react'

import classes from './index.module.scss'

type NavLinkItem = {
  id?: null | string
  link?: {
    label?: null | string
    newTab?: boolean | null
    reference?: {
      relationTo: 'case-studies' | 'pages' | 'posts'
      value: { slug?: string } | string
    } | null
    type?: 'custom' | 'reference' | null
    url?: null | string
  }
}

export type AurumHeroProps = {
  backgroundImage?: MediaType | null | string
  blockType?: 'aurumHero'
  brandName?: null | string
  cta?: NavLinkItem['link']
  description?: null | string
  headline?: null | string
  id?: null | string
  logo?: MediaType | null | string
  navLinks?: NavLinkItem[] | null
}

function AurumMark() {
  return (
    <svg
      aria-hidden
      className={classes.mark}
      fill="none"
      height="28"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 3C16 3 18.5 9.5 16 16C13.5 9.5 16 3 16 3Z" fill="currentColor" />
      <path d="M29 16C29 16 22.5 18.5 16 16C22.5 13.5 29 16 29 16Z" fill="currentColor" />
      <path d="M16 29C16 29 13.5 22.5 16 16C18.5 22.5 16 29 16 29Z" fill="currentColor" />
      <path d="M3 16C3 16 9.5 13.5 16 16C9.5 18.5 3 16 3 16Z" fill="currentColor" />
      <circle cx="16" cy="16" fill="currentColor" r="2.25" />
    </svg>
  )
}

export const AurumHero: React.FC<AurumHeroProps> = ({
  backgroundImage,
  brandName,
  cta,
  description,
  headline,
  logo,
  navLinks,
}) => {
  const reactId = useId().replace(/:/g, '')
  const sheetSlug = formatSheetSlug(`aurum-nav-${reactId}`)
  const { closeModal, isModalOpen } = useModal()
  const sheetOpen = isModalOpen(sheetSlug)
  const [scrolled, setScrolled] = useState(false)
  const name = brandName || 'The Aurum'
  const hasLogo = Boolean(logo && typeof logo !== 'string')
  const links = navLinks ?? []
  const navSolid = sheetOpen || scrolled

  useEffect(() => {
    document.documentElement.setAttribute('data-aurum-hero', 'true')
    return () => {
      document.documentElement.removeAttribute('data-aurum-hero')
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={classes.root} data-aurum-nav>
      <header
        className={[
          classes.nav,
          navSolid && classes.navSolid,
          sheetOpen && classes.navSheetOpen,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className={classes.navInner}>
          <Link aria-label={name} className={classes.brand} href="/" prefetch={false}>
            {hasLogo ? (
              <span className={classes.logoImage}>
                <Media resource={logo as MediaType} />
              </span>
            ) : (
              <AurumMark />
            )}
          </Link>

          <SheetToggler className={classes.menuButton} slug={sheetSlug}>
            <span className={classes.menuLabel}>Menu</span>
            <span aria-hidden className={classes.menuIcon}>
              <span />
              <span />
            </span>
          </SheetToggler>
        </div>
      </header>

      <div className={classes.hero}>
        <div className={classes.media}>
          {backgroundImage && typeof backgroundImage !== 'string' ? (
            <Media
              className={classes.mediaInner}
              fill
              imgClassName={classes.image}
              priority
              resource={backgroundImage}
              sizes="100vw"
            />
          ) : (
            <div className={classes.mediaFallback} />
          )}
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

      <Sheet slug={sheetSlug} title={name}>
        <nav aria-label="Primary" className={classes.sheetNav}>
          {links.map((item, index) => {
            if (!item?.link?.label) {
              return null
            }

            return (
              <CMSLink
                {...item.link}
                className={classes.sheetLink}
                key={item.id ?? `${item.link.label}-${index}`}
                onClick={() => closeModal(sheetSlug)}
              />
            )
          })}
        </nav>
      </Sheet>
    </div>
  )
}
