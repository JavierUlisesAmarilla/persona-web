/* eslint-disable require-jsdoc */
/* eslint-disable jsdoc/require-jsdoc */
import './globals.css'

import React, {Suspense} from 'react'
import {inter, sfPro} from './fonts'

import {Nav} from '@/components/layout/nav'
import {Sidebar} from '@/components/layout/sidebar'
import {Analytics} from '@vercel/analytics/react'
import cx from 'classnames'


export const metadata = {
  title: 'Persona - Conversational speech AI',
  description:
    'Persona enables you to add conversational speech AI to your product in minutes.',
  twitter: {
    card: 'summary_large_image',
    title: 'Persona',
    description:
      'Persona enables you to add conversational speech AI to your product in minutes.',
  },
  metadataBase: new URL('https://sindarin.tech/'),
  themeColor: '#FFF',
}

export default function Layout({children}: { children: React.ReactNode }) {
  return (
    <html className="h-full w-full" lang="en">
      <body
        className={cx(
            inter.variable,
            sfPro.variable,
            'flex h-full w-full flex-col bg-bg-light text-text-dark',
        )}
      >
        <Suspense fallback="">
          <div className="h-14 border-b border-b-border-gray">
            {/* @ts-expect-error Server Component */}
            <Nav/>
          </div>
          <div className="flex h-full overflow-auto">
            <div className="h-full w-60 overflow-auto border-r border-border-gray">
              <Sidebar/>
            </div>
            <main className="h-full w-[calc(100%-15rem)] overflow-auto">
              {children}
            </main>
          </div>
          <Analytics/>
        </Suspense>
      </body>
    </html>
  )
}
