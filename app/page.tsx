import React from 'react'
import Home from '@/components/page/home'
import SignHome from '@/components/page/sign-home'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import {withoutSign} from '@/lib/constants'


/**
 *
 */
export default async function Page() {
  const session = await getServerSession(authOptions)
  return session || withoutSign ? <SignHome/> : <Home/>
}
