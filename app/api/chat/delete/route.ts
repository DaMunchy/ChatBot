import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'

export async function POST() {
  try {
    const db = await connectDB()
    await db.collection('sessions').deleteOne({ userId: 'guest' })
    return NextResponse.json({ message: 'Session deleted' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete session', details: String(error) },
      { status: 500 }
    )
  }
}
