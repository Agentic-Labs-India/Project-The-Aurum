'use client'

import { Modal, useModal } from '@faceless-ui/modal'
import React, { useCallback, useEffect, useId, useState } from 'react'

import classes from './index.module.scss'

export const formatSheetSlug = (slug: string): string => `sheet_${slug}`

type SheetTogglerProps = {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  slug: string
}

export const SheetToggler: React.FC<SheetTogglerProps> = ({
  children,
  className,
  disabled,
  slug,
}) => {
  const { openModal } = useModal()

  return (
    <button
      aria-haspopup="dialog"
      className={className}
      disabled={disabled}
      onClick={() => openModal(slug)}
      type="button"
    >
      {children}
    </button>
  )
}

type SheetProps = {
  children: React.ReactNode
  className?: string
  slug: string
  title?: string
}

export const Sheet: React.FC<SheetProps> = ({ children, className, slug, title }) => {
  const { closeModal, modalState } = useModal()
  const titleId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    setIsOpen(Boolean(modalState[slug]?.isOpen))
  }, [slug, modalState])

  useEffect(() => {
    setAnimateIn(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    closeModal(slug)
  }, [closeModal, slug])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleClose, isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <Modal
      className={[classes.sheet, animateIn && classes.isOpen, className].filter(Boolean).join(' ')}
      closeOnBlur={false}
      htmlElement="div"
      slug={slug}
      trapFocus={false}
    >
      <button
        aria-label="Close menu"
        className={classes.backdrop}
        onClick={handleClose}
        type="button"
      />
      <aside
        aria-labelledby={title ? titleId : undefined}
        aria-modal="true"
        className={classes.panel}
        data-theme="light"
        role="dialog"
      >
        <div className={classes.panelHeader}>
          {title ? (
            <p className={classes.panelTitle} id={titleId}>
              {title}
            </p>
          ) : (
            <span />
          )}
          <button
            aria-label="Close menu"
            className={classes.closeButton}
            onClick={handleClose}
            type="button"
          >
            <span className={classes.closeIcon} />
          </button>
        </div>
        <div className={classes.panelBody}>{children}</div>
      </aside>
    </Modal>
  )
}
