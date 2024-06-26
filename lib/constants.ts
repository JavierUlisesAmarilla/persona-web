// Both (Client + Server)
export const WITHOUT_SIGN = true
export const USE_SAMPLE_DATA = true
export const USE_NOTION_X = false
export const USE_REAL_NOTION = true

export const DEPLOY_URL = process.env.NEXT_PUBLIC_DEPLOY_URL
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
export const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
export const AUTH0_CLIENT_SECRET = process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET
export const AUTH0_ISSUER = process.env.NEXT_PUBLIC_AUTH0_ISSUER
export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL
export const SINDARIN_API_URL = process.env.NEXT_PUBLIC_SINDARIN_API_URL
export const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
export const NOTION_ROOT_PAGE = process.env.NEXT_PUBLIC_NOTION_ROOT_PAGE
export const NOTION_FAKE_ROOT_PAGE = process.env.NEXT_PUBLIC_NOTION_FAKE_ROOT_PAGE

// Client
export const NODE_ENV = process.env.NODE_ENV
export const IS_DEV = NODE_ENV === 'development' || !NODE_ENV
export const PORT = process.env.PORT
export const MONGODB_URI = process.env.MONGODB_URI
export const DB_NAME = process.env.DB_NAME
export const MASTER_API_KEY = process.env.SINDARIN_MASTER_API_KEY
export const NOTION_ROOT_PAGE_ID = process.env.NOTION_ROOT_PAGE_ID || '067dd719a912471ea9a3ac10710e7fdf'
export const NOTION_ROOT_SPACE_ID = process.env.NOTION_ROOT_SPACE_ID
