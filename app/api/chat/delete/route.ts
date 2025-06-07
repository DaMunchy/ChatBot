import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    const db = await connectDB()

    // Aman: Eksekusi hanya terjadi saat endpoint POST dipanggil
    await db.collection('sessions').deleteOne({ userId: 'guest' })

    return NextResponse.json({ message: 'Session deleted' })
  } catch (error) {
    console.error('[DELETE SESSION ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to delete session', details: String(error) },
      { status: 500 }
    )
  }
}
