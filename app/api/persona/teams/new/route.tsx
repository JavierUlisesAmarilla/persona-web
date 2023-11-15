import {MASTER_API_KEY} from '@/lib/constants'
import axios from 'axios'
import {NextResponse} from 'next/server'


export const POST = async (request: Request) => {
  try {
    const postData = await request.json()
    const res = await axios.post(`https://api.sindarin.tech/api/teams/new?apikey=${MASTER_API_KEY}`, postData)
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
