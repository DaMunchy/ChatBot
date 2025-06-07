import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'

const API_KEY = 'AIzaSyDVTB_CdV0dYk-hHxqm09GoXiPvOrUhAnY' 
export async function GET() {
  const db = await connectDB()
  const session = await db.collection('sessions').findOne({ userId: 'guest' })
  return NextResponse.json({ history: session?.history || [] })
}


export async function POST(req: NextRequest) {
  const { messages, userId = 'guest' } = await req.json()

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ reply: 'Gak ada pesan buat dibalasss' })
  }

  const userMessage = messages[messages.length - 1]?.text?.trim()
  if (!userMessage) {
    return NextResponse.json({ reply: 'Pesan ny kosong nih' })
  }

  const db = await connectDB()

  await db.collection('sessions').updateOne(
    { userId },
    { $set: { messages, updatedAt: new Date() } },
    { upsert: true }
  )

  const historyText = messages
  .map(msg => (msg.from === 'user' ? `User: ${msg.text}` : `Nyxelia: ${msg.text}`))
  .join('\n')

const prompt = `
Kamu adalah Nyxelia, AI cewek yang dibuat sama Munchy. Kamu santai, nggak kaku, jawab dengan gaya cewek yang akrab dan nggak terlalu formal. Jangan terlalu sering sebut nama sendiri.

Berikut ini adalah percakapan sejauh ini:
${historyText}

Lanjutkan respon untuk pesan terakhir dari user.
`


  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  )

  const data = await response.json()

  const reply =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
    'Hmm, aku belum bisa jawab itu 😅'

  return NextResponse.json({ reply })
}
