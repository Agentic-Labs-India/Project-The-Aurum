'use client'

import { CMSLink, type CMSLinkType } from '@components/CMSLink/index'
import { formatSheetSlug, Sheet, SheetToggler } from '@components/Sheet/index'
import { useModal } from '@faceless-ui/modal'
import Link from 'next/link'
import React, { useEffect, useId } from 'react'

import classes from './index.module.scss'

export type AurumNavLinkItem = {
  id?: null | string
  link?: CMSLinkType | null
}

export type AurumNavProps = {
  brandName?: null | string
  hideSiteHeader?: boolean
  navLinks?: AurumNavLinkItem[] | null
  spacer?: boolean
}

const defaultLinks: AurumNavLinkItem[] = [
  { link: { type: 'custom', label: 'Rooms', url: '/rooms' } },
  { link: { type: 'custom', label: 'Amenities', url: '/amenities' } },
  { link: { type: 'custom', label: 'Experiences', url: '/experiences' } },
  { link: { type: 'custom', label: 'Contact', url: '/contact' } },
]

export const AurumNav: React.FC<AurumNavProps> = ({
  brandName,
  hideSiteHeader = true,
  navLinks,
  spacer = false,
}) => {
  const reactId = useId().replace(/:/g, '')
  const sheetSlug = formatSheetSlug(`aurum-nav-${reactId}`)
  const { closeModal, isModalOpen } = useModal()
  const sheetOpen = isModalOpen(sheetSlug)
  const name = brandName || 'The Aurum'
  const links = navLinks?.length ? navLinks : defaultLinks

  useEffect(() => {
    if (!hideSiteHeader) {
      return
    }

    document.documentElement.setAttribute('data-aurum-hero', 'true')
    return () => {
      document.documentElement.removeAttribute('data-aurum-hero')
    }
  }, [hideSiteHeader])

  return (
    <>
      <header
        className={[classes.nav, classes.navSolid, sheetOpen && classes.navSheetOpen]
          .filter(Boolean)
          .join(' ')}
        data-aurum-nav
      >
        <div className={classes.navInner}>
          <Link aria-label={name} className={classes.brand} href="/" prefetch={false}>
            <span className={classes.logoImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={name} height={36} src="/logo.webp" width={144} />
            </span>
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

      {spacer ? <div aria-hidden className={classes.navSpacer} /> : null}

      <Sheet className={classes.sheet} slug={sheetSlug} title={name}>
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
    </>
  )
}
