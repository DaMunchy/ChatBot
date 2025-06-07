
import { MongoClient } from 'mongodb'

const uri = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(uri)

let cachedDb: any = null

export async function connectDB() {
  if (cachedDb) return cachedDb

  try {
    await client.connect()
    const db = client.db('nyxelia_db') 
    cachedDb = db
    return db
  } catch (err) {
    console.error('MongoDB connection error:', err)
    throw err
  }
}
