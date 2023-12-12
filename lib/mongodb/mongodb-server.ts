import {MongoClient, ServerApiVersion} from 'mongodb'
import {DB_NAME, MONGODB_URI} from '../constants'


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

  if (MONGODB_URI) {
    // Connect to cluster
    const client = new MongoClient(MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })
    console.log('Before db connection')
    await client.connect()
    console.log('After db connection')
    const db = client.db(DB_NAME)

    // Set cache
    cachedClient = client
    cachedDb = db
  }

  return {
    client: cachedClient,
    db: cachedDb,
  }
}
