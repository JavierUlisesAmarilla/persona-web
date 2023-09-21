import {MongoClient, ServerApiVersion} from 'mongodb'
import {NEXT_PUBLIC_DB_NAME, NEXT_PUBLIC_MONGODB_URI} from '../constants'


let cachedClient: any = null
let cachedDb: any = null


export const connectToDatabase = async () => {
  // Check the cache
  if (cachedClient && cachedDb) {
    // Load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    }
  }

  // Connect to cluster
  const client = new MongoClient(NEXT_PUBLIC_MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })
  console.log('Before db connection')
  await client.connect()
  console.log('After db connection')
  const db = client.db(NEXT_PUBLIC_DB_NAME)

  // Set cache
  cachedClient = client
  cachedDb = db

  return {
    client: cachedClient,
    db: cachedDb,
  }
}
