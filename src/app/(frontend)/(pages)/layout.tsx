import { Footer } from '@components/Footer/index'
import { Header } from '@components/Header/index'
import { fetchGlobals } from '@data/index'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { isEnabled: draft } = await draftMode()
  const getGlobals = draft
    ? fetchGlobals
    : unstable_cache(fetchGlobals, ['globals'], {
        tags: ['globals', 'mainMenu', 'footer', 'topBar'],
      })

  const { footer, mainMenu, topBar } = await getGlobals()

  return (
    <React.Fragment>
      <Header {...mainMenu} topBar={topBar} />
      <div>
        {children}
        <Footer {...footer} fallbackLogo={mainMenu?.logo} />
      </div>
    </React.Fragment>
  )
}
