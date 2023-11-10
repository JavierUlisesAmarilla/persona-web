import {AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_ISSUER, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from '@/lib/constants'
/* eslint-disable new-cap */
import NextAuth, {NextAuthOptions} from 'next-auth'

import {prisma} from '@/lib/prisma'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import Auth0Provider from 'next-auth/providers/auth0'
import GoogleProvider from 'next-auth/providers/google'


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
      issuer: AUTH0_ISSUER,
    }),
  ],
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
