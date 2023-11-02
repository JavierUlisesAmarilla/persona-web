import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import Home from '@/components/page/home'
import SignHome from '@/components/page/sign-home'
import {WITHOUT_SIGN} from '@/lib/constants'
import {getServerSession} from 'next-auth/next'
import React from 'react'

/**
 *
 */
export default async function Page() {
  const session = await getServerSession(authOptions)
  return session || WITHOUT_SIGN ? <SignHome session={session}/> : <Home/>
}
