'use client'

import type { Media as MediaType } from '@root/payload-types'

import { Media } from '@components/Media/index'
import React, { useCallback, useEffect, useState } from 'react'

import classes from './index.module.scss'

export type AurumTestimonialsProps = {
  blockType?: 'aurumTestimonials'
  id?: null | string
  testimonials?:
    | {
        id?: null | string
        image?: MediaType | null | string
        location?: null | string
        name?: null | string
        quote?: null | string
      }[]
    | null
}

export const AurumTestimonials: React.FC<AurumTestimonialsProps> = ({ testimonials }) => {
  const items = (testimonials ?? []).filter((item) => item?.quote && item?.name)
  const [index, setIndex] = useState(0)
  const count = items.length
  const active = items[index]

  const goPrev = useCallback(() => {
    setIndex((current) => (count === 0 ? 0 : (current - 1 + count) % count))
  }, [count])

  const goNext = useCallback(() => {
    setIndex((current) => (count === 0 ? 0 : (current + 1) % count))
  }, [count])

  useEffect(() => {
    if (index > count - 1) {
      setIndex(0)
    }
  }, [count, index])

  if (!active) {
    return null
  }

  return (
    <div className={classes.testimonials}>
      <div className={classes.inner}>
        <div className={classes.media}>
          {active.image && typeof active.image !== 'string' ? (
            <Media
              className={classes.mediaInner}
              fill
              imgClassName={classes.image}
              key={active.id ?? `${active.name}-${index}`}
              resource={active.image}
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          ) : (
            <div className={classes.mediaFallback} key={active.id ?? `${active.name}-${index}`} />
          )}
        </div>

        <div className={classes.content}>
          {count > 1 ? (
            <div className={classes.controls}>
              <button
                aria-label="Previous testimonial"
                className={classes.control}
                onClick={goPrev}
                type="button"
              >
                <span aria-hidden>←</span>
              </button>
              <button
                aria-label="Next testimonial"
                className={classes.control}
                onClick={goNext}
                type="button"
              >
                <span aria-hidden>→</span>
              </button>
            </div>
          ) : null}

          <div
            aria-live="polite"
            className={classes.quoteBlock}
            key={active.id ?? `${active.name}-${index}-quote`}
          >
            <span aria-hidden className={classes.quoteMark}>
              “
            </span>
            <div className={classes.quoteBody}>
              <p className={classes.quote}>{active.quote}</p>
              <div className={classes.author}>
                <p className={classes.name}>{active.name}</p>
                {active.location ? <p className={classes.location}>{active.location}</p> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
