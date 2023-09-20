/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
import {PrismaClient} from '@prisma/client'
import {NODE_ENV} from './constants'


declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma
