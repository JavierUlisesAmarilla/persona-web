import {getServerSessionMiddle} from '@/lib/common'
import {NavBar} from './navbar'


export const Nav = async () => {
  const session = await getServerSessionMiddle()
  return <NavBar session={session}/>
}
