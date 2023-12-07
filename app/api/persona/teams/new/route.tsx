import {MASTER_API_KEY, SINDARIN_API_URL} from '@/lib/constants'

import axios from 'axios'
import {NextResponse} from 'next/server'


export const POST = async (request: Request) => {
  try {
    console.log('================================================== persona#teams#new#POST')
    const postData = await request.json()
    const apiUrl = `${SINDARIN_API_URL}/api/teams/new?apikey=${MASTER_API_KEY}`
    console.log('apiUrl: ', apiUrl)
    const res = await axios.post(apiUrl, postData)
    console.log('res: ', res)
    const success = res.status === 200
    // const token = success ? res.data.substring(36) : ''
    const token = success ? res.data.apiKey : ''
    return NextResponse.json({success, token})
  } catch (error: any) {
    return NextResponse.json({
      message: new Error(error).message,
      success: false,
    })
  }
}
