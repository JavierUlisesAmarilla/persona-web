/* eslint-disable require-jsdoc */
/* eslint-disable jsdoc/require-jsdoc */

import './globals.css'

import React, {Suspense} from 'react'
import {inter, sfPro} from './fonts'

import {Nav} from '@/components/layout/nav'
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
    <html lang="en">
      <body className={cx(inter.variable, sfPro.variable, 'bg-bg-light text-text-dark')}>
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav/>
          <main className="flex flex-col items-center w-full min-h-screen pt-20">
            {children}
          </main>
          <Analytics/>
        </Suspense>
      </body>
    </html>
  )
}
