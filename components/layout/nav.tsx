import {getServerSessionMiddle} from '@/lib/common'
import {Navbar} from './navbar'


export const Nav = async () => {
  const session = await getServerSessionMiddle()
  return <Navbar session={session}/>
}
