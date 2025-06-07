import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'

export async function POST() {
  const db = await connectDB()
  await db.collection('sessions').deleteOne({ userId: 'guest' })
  return NextResponse.json({ message: 'Session deleted' })
}
