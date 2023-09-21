import {ObjectId} from 'mongodb'
import {NextResponse} from 'next/server'
import {NextRequest} from 'next/server'
import {connectToDatabase} from '@/lib/mongodb/mongodb-server'


export const GET = async (request: NextRequest) => {
  try {
    const id = request.nextUrl.searchParams.get('id')
    console.log('api#mongodb#get: id: ', id)
    const {db} = await connectToDatabase()
    let res = {}

    if (id) {
      res = await db.collection('main').findOne({_id: new ObjectId(id)})
    } else {
      res = await db.collection('main').find({}).toArray()
    }

    return NextResponse.json(res)
  } catch (error: any) {
    return NextResponse.json({
      message: new Error(error).message,
      success: false,
    })
  }
}
