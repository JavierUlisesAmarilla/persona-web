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
  title: 'Persona - Conversational speech AI.',
  description:
    'Persona enables you to add conversational speech AI to your product in minutes.',
  twitter: {
    card: 'summary_large_image',
    title: 'Persona on Twitter',
    description:
      'Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.',
    creator: '@steventey',
  },
  metadataBase: new URL('https://precedent.dev'),
  themeColor: '#FFF',
}


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='w-full h-full' lang="en">
      <body className={cx(inter.variable, sfPro.variable, 'bg-bg-light text-text-dark w-full h-full flex flex-col')}>
        <Suspense fallback="">
          <div className='border-b h-14 border-b-border-gray'>
            {/* @ts-expect-error Server Component */}
            <Nav/>
          </div>
          <div className='h-[100%-3.5rem] flex overflow-auto'>
            <div className='h-full overflow-auto border-r w-60 border-border-gray'>
              <Sidebar/>
            </div>
            <main className="w-[calc(100%-15rem)] h-full overflow-auto">
              {children}
            </main>
          </div>
          <Analytics/>
        </Suspense>
      </body>
    </html>
  )
}
