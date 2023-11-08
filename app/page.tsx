import 'primereact/resources/themes/lara-light-indigo/theme.css'

import SignHome from '@/components/page/sign-home'
import {getServerSessionMiddle} from '@/lib/common'
import React from 'react'

/**
 *
 */
export default async function Page() {
  const session = await getServerSessionMiddle()
  return session ? <SignHome session={session}/> : <div/>
}
