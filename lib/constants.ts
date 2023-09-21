// Environment

export const NEXT_PUBLIC_DEPLOY_URL = process.env.NEXT_PUBLIC_DEPLOY_URL || 'http://localhost:3000'
export const NEXT_PUBLIC_GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
export const NEXT_PUBLIC_GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
export const NEXT_PUBLIC_MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb+srv://personaWebappUser:wWHDZE9OcqID13e1@cluster0.30jw4wc.mongodb.net/?retryWrites=true&w=majority'
export const NEXT_PUBLIC_DB_NAME = process.env.NEXT_PUBLIC_DB_NAME || 'persona'
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const WITHOUT_SIGN = false

// Setting

export const COMMON_API_KEY = 'abc'
export const MENUS: any = {
  setting: 'Setting',
  voiceChat: 'VoiceChat',
}
