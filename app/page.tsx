/* eslint-disable require-jsdoc */
/* eslint-disable jsdoc/require-jsdoc */
import 'primereact/resources/themes/lara-light-indigo/theme.css'

import SignHome from '@/components/page/sign-home'
import {getServerSessionMiddle} from '@/lib/common'
import {USE_NOTION_X} from '../lib/constants'
import {getNotionPage} from '../lib/notion'


export default async function Page() {
  console.log('*** RENDERING PAGE ***')
  const session = await getServerSessionMiddle()
  const recordMap = USE_NOTION_X ? (await getNotionPage())?.recordMap : undefined
  return session ?
    <SignHome
      session={session}
      recordMap={recordMap}
    /> :
    <div/>
}
