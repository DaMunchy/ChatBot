import { connectDB } from '@/lib/mongodb'
import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

export async function POST(req: Request) {
  const { userId, messages } = await req.json()
  const db = await connectDB()

  await db.collection('chats').updateOne(
    { userId: new ObjectId(userId) },
    { $set: { messages, updatedAt: new Date() } },
    { upsert: true }
  )

  return NextResponse.json({ success: true })
}
