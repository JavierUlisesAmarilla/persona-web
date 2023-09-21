import {ObjectId} from 'mongodb'
import {NextResponse} from 'next/server'
import {NextRequest} from 'next/server'
import {connectToDatabase} from '@/lib/mongodb/mongodb-server'


export const DELETE = async (request: NextRequest) => {
  try {
    const id = request.nextUrl.searchParams.get('id')
    console.log('api#mongodb#remove: id: ', id)

    if (!id) {
      return
    }

    const {db} = await connectToDatabase()
    const res = await db.collection('main').deleteOne({_id: new ObjectId(id)})
    return NextResponse.json(res)
  } catch (error: any) {
    return NextResponse.json({
      message: new Error(error).message,
      success: false,
    })
  }
}
