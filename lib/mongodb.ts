import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!
const client = new MongoClient(uri)

let cachedDb: any = null

export async function connectDB() {
  if (cachedDb) return cachedDb

  try {
    await client.connect()
    const db = client.db() 
    cachedDb = db
    return db
  } catch (err) {
    console.error('MongoDB connection error:', err)
    throw err
  }
}
