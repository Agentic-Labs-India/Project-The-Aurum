import { AurumNav } from '@components/AurumNav/index'
import { ErrorMessage } from '@components/ErrorMessage/index'
import { Footer } from '@components/Footer/index'
import { fetchGlobals } from '@data/index'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import React from 'react'

export default async function NotFound() {
  const { isEnabled: draft } = await draftMode()

  const getGlobals = draft
    ? fetchGlobals
    : unstable_cache(fetchGlobals, ['globals'], {
        tags: ['globals', 'mainMenu', 'footer', 'topBar'],
      })

  const { footer, mainMenu } = await getGlobals()

  return (
    <React.Fragment>
      <AurumNav brandName={mainMenu?.brandName || 'The Aurum'} spacer />
      <div>
        <ErrorMessage />
        <Footer {...footer} fallbackLogo={mainMenu?.logo} />
      </div>
    </React.Fragment>
  )
}
