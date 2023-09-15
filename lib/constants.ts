export const IS_DEV_MODE = process.env.NODE_ENV === 'development'

export const DEPLOY_URL = `https://vercel.com/new/clone?repository-url=https://github.com/sindarin-ventures/persona-webapp&project-name=precedent&repository-name=precedent&demo-title=Precedent&demo-description=An%20opinionated%20collection%20of%20components%2C%20hooks%2C%20and%20utilities%20for%20your%20Next%20project.&demo-url=https://precedent.dev&demo-image=https://precedent.dev/opengraph-image&env=GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,NEXTAUTH_SECRET&envDescription=How%20to%20get%20these%20env%20variables:&envLink=https://github.com/steven-tey/precedent/blob/main/.env.example&stores=%5B%7B"type":"postgres"%7D%5D`;

export const API_KEY = 'abc'

export const BACKEND_URL = IS_DEV_MODE ? 'http://127.0.0.1:4000/main' : ''

export const menus: any = {
  setting: 'Setting',
  voiceChat: 'VoiceChat',
}

export const withoutSign = false
