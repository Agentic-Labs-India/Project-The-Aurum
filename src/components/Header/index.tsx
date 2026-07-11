'use client'

import type { MainMenu, TopBar as TopBarType } from '@root/payload-types'

import { TopBar } from '@components/TopBar'
import { UniversalTruth } from '@components/UniversalTruth/index'
import { useModal } from '@faceless-ui/modal'
import { useScrollInfo } from '@faceless-ui/scroll-info'
import { useHeaderObserver } from '@root/providers/HeaderIntersectionObserver/index'
import * as React from 'react'

import { DesktopNav } from './DesktopNav/index'
import classes from './index.module.scss'
import { MobileNav, modalSlug as mobileNavModalSlug } from './MobileNav/index'

export const Header: React.FC<
  {
    topBar?: TopBarType
  } & MainMenu
> = ({
  brandName,
  enableWhatsApp,
  logo,
  menuCta,
  tabs,
  topBar,
  whatsappUrl,
}) => {
  const { isModalOpen } = useModal()
  const isMobileNavOpen = isModalOpen(mobileNavModalSlug)
  const { headerTheme } = useHeaderObserver()
  const { y } = useScrollInfo()
  const [hideBackground, setHideBackground] = React.useState(true)

  React.useEffect(() => {
    if (!topBar?.enableTopBar) {
      setHideBackground(false)
      document.documentElement.style.setProperty('--top-bar-height', '0px')
    } else {
      document.documentElement.style.setProperty('--top-bar-height', y > 30 ? '0px' : '3rem')
    }
  }, [topBar?.enableTopBar, y])

  React.useEffect(() => {
    if (isMobileNavOpen) {
      setHideBackground(false)
    } else {
      setHideBackground(y < 30)
    }
  }, [y, isMobileNavOpen])

  return (
    <div className={classes.wrapper} data-site-header data-theme={headerTheme || 'light'}>
      {topBar?.enableTopBar && (
        <div className={classes.topBar} id="topBar">
          <TopBar {...topBar} />
        </div>
      )}
      <header
        className={[
          classes.header,
          hideBackground && classes.hideBackground,
          isMobileNavOpen && classes.mobileNavOpen,
          headerTheme && classes.themeIsSet,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <DesktopNav
          brandName={brandName}
          enableWhatsApp={enableWhatsApp}
          hideBackground={hideBackground}
          logo={logo}
          menuCta={menuCta}
          showBrandName={false}
          tabs={tabs}
          whatsappUrl={whatsappUrl}
        />
        <MobileNav
          brandName={brandName}
          enableWhatsApp={enableWhatsApp}
          logo={logo}
          menuCta={menuCta}
          showBrandName={false}
          tabs={tabs}
          whatsappUrl={whatsappUrl}
        />
        <React.Suspense>
          <UniversalTruth />
        </React.Suspense>
      </header>
    </div>
  )
}
