'use client'

import type { PaddingProps } from '@components/BlockWrapper/index'

import { BlockWrapper } from '@components/BlockWrapper/index'
import { Gutter } from '@components/Gutter/index'
import React from 'react'

import classes from './index.module.scss'
import { AurumAbout } from './sections/About/index'
import { AurumAmenities } from './sections/Amenities/index'
import { AurumDetails } from './sections/Details/index'
import { AurumGallery } from './sections/Gallery/index'
import { AurumHero } from './sections/Hero/index'
import { AurumInterior } from './sections/Interior/index'
import { AurumRooms } from './sections/Rooms/index'
import { AurumTestimonials } from './sections/Testimonials/index'

export type AurumSection = {
  blockType?: string
  id?: null | string
  [key: string]: unknown
}

export type AurumTemplateProps = {
  blockType?: 'aurumTemplate'
  aurumTemplateFields?: {
    sections?: AurumSection[] | null
    settings?: {
      background?: 'gradientDown' | 'gradientUp' | 'solid' | 'transparent' | null
      theme?: 'dark' | 'light' | null
    }
  }
  hideBackground?: boolean
  padding?: PaddingProps
}

/**
 * Maps nested Aurum section blockTypes → React components.
 * Add new section renderers here as each screenshot is implemented.
 */
const sectionComponents: Record<string, React.ComponentType<any>> = {
  aurumAbout: AurumAbout,
  aurumAmenities: AurumAmenities,
  aurumDetails: AurumDetails,
  aurumGallery: AurumGallery,
  aurumHero: AurumHero,
  aurumInterior: AurumInterior,
  aurumRooms: AurumRooms,
  aurumTestimonials: AurumTestimonials,
}

export const AurumTemplate: React.FC<AurumTemplateProps> = (props) => {
  const { aurumTemplateFields, hideBackground, padding } = props
  const settings = aurumTemplateFields?.settings
  const sections = aurumTemplateFields?.sections ?? []
  const hasHero = sections.some((section) => section?.blockType === 'aurumHero')

  return (
    <BlockWrapper
      className={[classes.template, hasHero && classes.hasHero].filter(Boolean).join(' ')}
      hideBackground={hideBackground || hasHero}
      padding={hasHero ? undefined : { bottom: 'large', top: 'large', ...padding }}
      setPadding={!hasHero}
      settings={settings}
    >
      {sections.length === 0 ? (
        <Gutter className={classes.gutter}>
          <div className={classes.empty}>
            <p className={classes.emptyEyebrow}>The Aurum Template</p>
            <h2 className={classes.emptyTitle}>Sections will appear here</h2>
            <p className={classes.emptyBody}>
              Add sections in the CMS as they are built from design screenshots. Each section is
              responsive for mobile, tablet, and desktop.
            </p>
          </div>
        </Gutter>
      ) : (
        <div className={classes.stack}>
          {sections.map((section, index) => {
            if (!section?.blockType || !(section.blockType in sectionComponents)) {
              return null
            }

            const Section = sectionComponents[section.blockType]
            const isHero = section.blockType === 'aurumHero'

            return (
              <section
                className={[classes.section, isHero && classes.heroSection]
                  .filter(Boolean)
                  .join(' ')}
                data-section={section.blockType}
                key={section.id ?? `${section.blockType}-${index}`}
              >
                <Section {...section} />
              </section>
            )
          })}
        </div>
      )}
    </BlockWrapper>
  )
}
