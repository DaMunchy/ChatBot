import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'

export async function GET(req: NextRequest) {
  const db = await connectDB()
  const session = await db.collection('sessions').findOne({ userId: 'guest' })

  return NextResponse.json({ session })
}
