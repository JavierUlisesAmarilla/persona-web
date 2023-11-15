/* eslint-disable max-len */
import {ADMIN_EMAIL, WITHOUT_SIGN} from './constants'

import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import {getServerSession} from 'next-auth/next'


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


export const getCustomDateFromStr = (strDate: string) => {
  const date = new Date(strDate.split('.')[0])
  return getCustomDateFromDate(date)
}


export const getCustomDateFromDate = (date: Date) => {
  const customDate = `${date.getFullYear()}.${getDateNum(date.getMonth() + 1)}.${getDateNum(date.getDate())} ${getDateNum(date.getHours())}:${getDateNum(date.getMinutes())}:${getDateNum(date.getSeconds())}`
  return customDate
}


export const getNextCustomDateFromDate = (date: Date) => {
  const nextDate = new Date(date)
  nextDate.setDate(date.getDate() + 1)
  return getCustomDateFromDate(nextDate)
}


export const getDateNum = (num: number) => {
  const dateNum = num.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
  return dateNum
}


export const emailCanAccess = async (email: string | null = null) => {
  const session = await getServerSessionMiddle()
  const sessionEmail = session?.user?.email
  const canAccess = sessionEmail && (sessionEmail === ADMIN_EMAIL || sessionEmail === email)
  return canAccess
}
