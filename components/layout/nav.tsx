import {getServerSessionMiddle} from '@/lib/common'
import React from 'react'
import Navbar from './navbar'

/**
 *
 */
export default async function Nav() {
  const session = await getServerSessionMiddle()
  return <Navbar session={session}/>
}
