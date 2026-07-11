'use client'

import type { Footer as FooterType, Media as MediaType } from '@types'

import { CMSLink } from '@components/CMSLink/index'
import { Gutter } from '@components/Gutter/index'
import { Media } from '@components/Media/index'
import Link from 'next/link'
import React, { useState } from 'react'

import classes from './index.module.scss'

type FooterProps = {
  fallbackLogo?: MediaType | null | string
} & FooterType

function AurumMark() {
  return (
    <svg
      aria-hidden
      className={classes.mark}
      fill="none"
      height="32"
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

function SocialIcon({ platform }: { platform?: null | string }) {
  if (platform === 'facebook') {
    return (
      <svg aria-hidden fill="none" height="16" viewBox="0 0 16 16" width="16">
        <path
          d="M10.5 3.5H9.25C8.56 3.5 8 4.06 8 4.75V6.25H10.5L10.15 8.5H8V13.5H5.5V8.5H3.75V6.25H5.5V4.9C5.5 3.02 6.77 1.5 8.9 1.5H10.5V3.5Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (platform === 'instagram') {
    return (
      <svg aria-hidden fill="none" height="16" viewBox="0 0 16 16" width="16">
        <rect height="10" rx="2.5" stroke="currentColor" strokeWidth="1.3" width="10" x="3" y="3" />
        <circle cx="8" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="11.2" cy="4.8" fill="currentColor" r="0.8" />
      </svg>
    )
  }

  return (
    <svg aria-hidden fill="none" height="14" viewBox="0 0 16 16" width="14">
      <path
        d="M3 3.5L7.1 8.2L3.2 12.5H4.4L7.6 8.95L10.35 12.5H13L8.75 7.55L12.4 3.5H11.2L8.2 6.8L5.65 3.5H3Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const Footer: React.FC<FooterProps> = (props) => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const logo = props.logo && typeof props.logo !== 'string' ? props.logo : null
  const fallbackLogo =
    props.fallbackLogo && typeof props.fallbackLogo !== 'string' ? props.fallbackLogo : null
  const logoToUse = logo || fallbackLogo

  const newsletterHeadline =
    props.newsletterHeadline || 'Subscribe To Receive Exclusive Offers And News'
  const newsletterDescription =
    props.newsletterDescription || 'Subscribe to receive exclusive offers and news.'
  const newsletterPlaceholder = props.newsletterPlaceholder || 'Enter your email address'
  const newsletterButtonLabel = props.newsletterButtonLabel || 'Subscribe'
  const tagline =
    props.tagline ||
    'Experience timeless luxury, unmatched comfort, and exceptional service at The Aurum.'
  const phone = props.phone || '+880 1234-567890'
  const emailAddress = props.email || 'info@theaurum.com'
  const address = props.address || '123 Luxury Street, Beverly Hills, California, USA'
  const copyright = props.copyright || '© 2026 The Aurum. All Rights Reserved'
  const navLinks = props.navLinks?.length
    ? props.navLinks
    : [
        { link: { type: 'custom' as const, label: 'Home', url: '/' } },
        { link: { type: 'custom' as const, label: 'About', url: '/about' } },
        { link: { type: 'custom' as const, label: 'Rooms', url: '/rooms' } },
        { link: { type: 'custom' as const, label: 'Amenities', url: '/amenities' } },
        { link: { type: 'custom' as const, label: 'Testimonials', url: '/#testimonials' } },
      ]
  const socialLinks = props.socialLinks?.length
    ? props.socialLinks
    : [
        { platform: 'facebook' as const, url: 'https://facebook.com' },
        { platform: 'instagram' as const, url: 'https://instagram.com' },
        { platform: 'x' as const, url: 'https://x.com' },
      ]
  const legalLinks = props.legalLinks?.length
    ? props.legalLinks
    : [
        { link: { type: 'custom' as const, label: 'Privacy Policy', url: '/privacy' } },
        { link: { type: 'custom' as const, label: 'Terms & Conditions', url: '/terms' } },
      ]

  const onSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) {
      return
    }
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer className={classes.footer}>
      <Gutter className={classes.container}>
        <div className={classes.newsletter}>
          <div className={classes.newsletterCopy}>
            <h2 className={classes.newsletterHeadline}>{newsletterHeadline}</h2>
            <p className={classes.newsletterDescription}>{newsletterDescription}</p>
          </div>

          <form className={classes.newsletterForm} onSubmit={onSubscribe}>
            <label className={classes.srOnly} htmlFor="aurum-footer-email">
              Email address
            </label>
            <input
              autoComplete="email"
              className={classes.newsletterInput}
              id="aurum-footer-email"
              onChange={(event) => {
                setSubmitted(false)
                setEmail(event.target.value)
              }}
              placeholder={newsletterPlaceholder}
              type="email"
              value={email}
            />
            <button className={classes.newsletterButton} type="submit">
              <span>{newsletterButtonLabel}</span>
              <span aria-hidden>→</span>
            </button>
            {submitted ? (
              <p className={classes.newsletterSuccess} role="status">
                Thanks — you’re on the list.
              </p>
            ) : null}
          </form>
        </div>

        <div className={classes.main}>
          <div className={classes.brand}>
            <Link aria-label="The Aurum" className={classes.logoLink} href="/" prefetch={false}>
              {logoToUse ? (
                <span className={classes.logoImage}>
                  <Media resource={logoToUse} />
                </span>
              ) : (
                <AurumMark />
              )}
            </Link>
            {tagline ? <p className={classes.tagline}>{tagline}</p> : null}

            <div className={classes.socials}>
              {socialLinks.map((item, index) => {
                if (!item?.url) {
                  return null
                }

                return (
                  <a
                    aria-label={item.platform || 'Social link'}
                    className={[
                      classes.social,
                      item.platform === 'instagram' && classes.socialFilled,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    href={item.url}
                    key={`${item.platform}-${index}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <SocialIcon platform={item.platform} />
                  </a>
                )
              })}
            </div>
          </div>

          <div className={classes.linksCol}>
            <p className={classes.colTitle}>Links</p>
            <ul className={classes.linkList}>
              {navLinks.map((item, index) => {
                if (!item?.link?.label) {
                  return null
                }

                return (
                  <li key={`${item.link.label}-${index}`}>
                    <CMSLink className={classes.link} {...item.link} />
                  </li>
                )
              })}
            </ul>
          </div>

          <div className={classes.metaCol}>
            <div className={classes.metaBlock}>
              <p className={classes.colTitle}>Contact</p>
              <a className={classes.metaItem} href={`tel:${phone.replace(/\s+/g, '')}`}>
                <span aria-hidden className={classes.metaIcon}>
                  ☎
                </span>
                <span>{phone}</span>
              </a>
              <a className={classes.metaItem} href={`mailto:${emailAddress}`}>
                <span aria-hidden className={classes.metaIcon}>
                  ✉
                </span>
                <span>{emailAddress}</span>
              </a>
            </div>

            <div className={classes.metaBlock}>
              <p className={classes.colTitle}>Address</p>
              <p className={classes.address}>{address}</p>
            </div>
          </div>
        </div>

        <div className={classes.bottom}>
          <p className={classes.copyright}>{copyright}</p>
          <div className={classes.legal}>
            {legalLinks.map((item, index) => {
              if (!item?.link?.label) {
                return null
              }

              return (
                <React.Fragment key={`${item.link.label}-${index}`}>
                  {index > 0 ? <span className={classes.legalSep}>|</span> : null}
                  <CMSLink className={classes.legalLink} {...item.link} />
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </Gutter>
    </footer>
  )
}
