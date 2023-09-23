/* eslint-disable new-cap */
import NextAuth, {NextAuthOptions} from 'next-auth'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import GoogleProvider from 'next-auth/providers/google'
import Auth0Provider from 'next-auth/providers/auth0'
import {AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from '@/lib/constants'


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    }),
    Auth0Provider({
      clientId: AUTH0_CLIENT_ID as string,
      clientSecret: AUTH0_CLIENT_SECRET as string,
    }),
  ],
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
