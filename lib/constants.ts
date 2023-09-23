// Environment

export const NODE_ENV = process.env.NODE_ENV
export const DEPLOY_URL = process.env.NEXT_PUBLIC_DEPLOY_URL

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
export const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
export const AUTH0_CLIENT_SECRET = process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET
export const AUTH0_ISSUER = process.env.NEXT_PUBLIC_AUTH0_ISSUER

export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL
export const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb+srv://personaWebappUser:wWHDZE9OcqID13e1@cluster0.30jw4wc.mongodb.net/?retryWrites=true&w=majority'
export const DB_NAME = process.env.NEXT_PUBLIC_DB_NAME || 'persona'
export const WITHOUT_SIGN = false

// Setting

export const COMMON_API_KEY = 'abc'
export const MENUS: any = {
  setting: 'Setting',
  voiceChat: 'VoiceChat',
}
