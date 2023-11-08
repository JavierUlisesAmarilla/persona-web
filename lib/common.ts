import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import {getServerSession} from 'next-auth/next'
import {WITHOUT_SIGN} from './constants'


export const getServerSessionMiddle = async () => {
  const session = WITHOUT_SIGN ?
    {
      user: {
        name: 'Meta Developer',
        email: 'metadev26@gmail.com',
        image: 'https://lh3.googleusercontent.com/a/ACg8ocJMdpkHkgnXJ5NrfyxKrtTPB09njAcnQFJ7_RDERRjL=s96-c',
      },
    } :
    await getServerSession(authOptions)
  return session
}


export const getUniqueArr = (arr: Array<any>) => {
  const uniqueArr = arr.filter((value: any, index: number, array: Array<any>) => array.indexOf(value) === index)
  return uniqueArr
}
