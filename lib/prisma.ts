/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
import {IS_DEV_MODE, NODE_ENV} from './constants'

import {PrismaClient} from '@prisma/client'


declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || (IS_DEV_MODE ? undefined : new PrismaClient())

if (NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma
