/* eslint-disable require-jsdoc */
/* eslint-disable jsdoc/require-jsdoc */
import 'primereact/resources/themes/lara-light-indigo/theme.css'

import {Home} from '@/components/page/home'
import {getServerSessionMiddle} from '@/lib/common'


export default async function Page() {
  console.log('*** RENDERING PAGE ***')
  const session = await getServerSessionMiddle()
  return <Home session={session}/>
}
