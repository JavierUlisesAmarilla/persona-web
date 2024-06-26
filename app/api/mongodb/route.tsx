import {NextRequest, NextResponse} from 'next/server'

import {emailCanAccess} from '@/lib/common'
import {ADMIN_EMAIL} from '@/lib/constants'
import {connectToDatabase} from '@/lib/mongodb/mongodb-server'
import {ObjectId} from 'mongodb'


export const GET = async (request: NextRequest) => {
  try {
    console.log('================================================== mongodb#GET')
    const id = request.nextUrl.searchParams.get('id')
    const email = request.nextUrl.searchParams.get('email')
    const canAccess = await emailCanAccess(email)

    if (!canAccess) {
      const message = 'You can\'t access this API'
      console.log('api#mongodb#GET: message: ', message)
      return NextResponse.json({message})
    }

    const {db} = await connectToDatabase()
    let res = {}
    const where: any = {}

    if (id) {
      where._id = new ObjectId(id)
    }

    // allow admin to see all data
    if (email && email !== ADMIN_EMAIL) {
      where['emailArr.name'] = email
    }

    res = await db.collection('main').find(where).toArray()
    return NextResponse.json(res)
  } catch (error: any) {
    const message = new Error(error).message
    console.log('api#mongodb#GET: message: ', message)
    return NextResponse.json({message})
  }
}


export const POST = async (request: NextRequest) => {
  try {
    const email = request.nextUrl.searchParams.get('email')
    const canAccess = await emailCanAccess(email)
    if (!canAccess) {
      const message = 'You can\'t access this API'
      console.log('api#mongodb#POST: message: ', message)
      return NextResponse.json({message})
    }

    const postData = await request.json()
    const id = postData._id
    const {db} = await connectToDatabase()
    let res = {}

    if (id) {
      delete postData._id
      res = await db.collection('main').updateOne({_id: new ObjectId(id)}, {$set: postData})
    } else {
      res = await db.collection('main').insertOne(postData)
    }

    return NextResponse.json(res)
  } catch (error: any) {
    const message = new Error(error).message
    console.log('api#mongodb#POST: message: ', message)
    return NextResponse.json({message})
  }
}


export const DELETE = async (request: NextRequest) => {
  try {
    const email = request.nextUrl.searchParams.get('email')
    const canAccess = await emailCanAccess(email)

    if (!canAccess) {
      const message = 'You can\'t access this API'
      console.log('api#mongodb#DELETE: message: ', message)
      return NextResponse.json({message})
    }

    const id = request.nextUrl.searchParams.get('id')

    if (!id) {
      return
    }

    const {db} = await connectToDatabase()
    const res = await db.collection('main').deleteOne({_id: new ObjectId(id)})
    return NextResponse.json(res)
  } catch (error: any) {
    const message = new Error(error).message
    console.log('api#mongodb#DELETE: message: ', message)
    return NextResponse.json({message})
  }
}
