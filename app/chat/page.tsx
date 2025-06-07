'use client'

import { useEffect, useRef, useState } from 'react'

type Message = {
  from: 'user' | 'ai'
  text: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [messages, loading])

  useEffect(() => {
    const loadHistory = async () => {
      const res = await fetch('/api/nyxelia')
      const data = await res.json()
      if (data.history) setMessages(data.history)
    }
    loadHistory()
  }, [])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const newMessages = [...messages, { from: 'user', text: trimmed }] as Message[]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const res = await fetch('/api/nyxelia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    })

    const data = await res.json()
    setMessages(prev => [...prev, { from: 'ai', text: data.reply }])
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend()
  }

  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<span style="font-family:serif">$1</span>')
      .replace(/\*(.*?)\*/g, '<b>$1</b>')
  }

  const handleDeleteSession = async () => {
    await fetch('/api/nyxelia/delete', { method: 'POST' })
    setMessages([])
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-white relative">
      <div className="absolute top-4 left-4 z-20">
        <button onClick={() => setShowMenu(!showMenu)} className="text-white text-2xl px-3 py-2">
          ☰
        </button>
        {showMenu && (
          <div className="bg-gray-900 text-white mt-2 rounded-lg p-4 space-y-2 shadow-xl w-48">

            <button
              onClick={handleDeleteSession}
              className="block w-full text-left text-red-400 hover:text-red-500"
            >
              Delete history
            </button>
          </div>
        )}
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <h1 className="text-3xl font-bold text-purple-400 animate-pulse tracking-wide transition duration-500">
          Nyxelia
        </h1>
      </div>

      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-6 pt-24 space-y-4 scrollbar-thin scrollbar-thumb-purple-700"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap px-6 py-4 rounded-2xl text-lg leading-relaxed w-fit max-w-[80%] ${
              msg.from === 'user' ? 'bg-purple-700 ml-auto' : 'bg-gray-800'
            }`}
            dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
          />
        ))}
        {loading && <div className="text-gray-400 italic text-base">Nyxelia sedang ngetik...</div>}
      </div>

      <div className="p-6 border-t border-white/10">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanya sesuatu..."
            className="flex-1 px-6 py-4 rounded-2xl bg-white/10 text-white placeholder-white/40 text-lg focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-4 rounded-2xl text-lg transition"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  )
}
