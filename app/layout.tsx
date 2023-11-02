/* eslint-disable jsdoc/require-returns */
import Footer from '@/components/layout/footer'
import Nav from '@/components/layout/nav'
import {Analytics} from '@vercel/analytics/react'
import cx from 'classnames'
import React, {Suspense} from 'react'
import {inter, sfPro} from './fonts'
import './globals.css'


export const metadata = {
  title: 'Precedent - Building blocks for your Next.js project',
  description:
    'Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.',
  twitter: {
    card: 'summary_large_image',
    title: 'Precedent - Building blocks for your Next.js project',
    description:
      'Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.',
    creator: '@steventey',
  },
  metadataBase: new URL('https://precedent.dev'),
  themeColor: '#FFF',
}

/**
 *
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cx(inter.variable, sfPro.variable)}>
        <div className="fixed w-full h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100"/>
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav/>
        </Suspense>
        <main className="flex flex-col items-center w-full min-h-screen py-20">
          {children}
        </main>
        <Footer/>
        <Analytics/>
      </body>
    </html>
  )
}
