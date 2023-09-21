import {ObjectId} from 'mongodb'
import {NextResponse} from 'next/server'
import {connectToDatabase} from '@/lib/mongodb/mongodb-server'


export const POST = async (request: Request) => {
  try {
    const postData = await request.json()
    console.log('api#mongodb#save: postData: ', postData)
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
    return NextResponse.json({
      message: new Error(error).message,
      success: false,
    })
  }
}
