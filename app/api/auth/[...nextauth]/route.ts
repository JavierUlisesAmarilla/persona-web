/* eslint-disable new-cap */
import NextAuth, {NextAuthOptions} from 'next-auth'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import GoogleProvider from 'next-auth/providers/google'
import {NEXT_PUBLIC_GOOGLE_CLIENT_ID, NEXT_PUBLIC_GOOGLE_CLIENT_SECRET} from '@/lib/constants'


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
