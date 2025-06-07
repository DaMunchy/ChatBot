export default function Documentation() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-20">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">Nyxelia Documentation</h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Learn how to use the Nyxelia chatbot effectively
          </p>
        </div>

      
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DocCard title="Getting Started" desc="Setup & usage instructions" />
          <DocCard title="Chat Commands" desc="All available chatbot commands" />
          <DocCard title="AI Modes" desc="Switch between AI personalities" />
          <DocCard title="Session Handling" desc="Persistent user session & context" />
          <DocCard title="Custom Prompting" desc="Custom instruction injection" />
          <DocCard title="Export & Share" desc="Share or save chat sessions" />
        </div>
      </div>
    </main>
  )
}

function DocCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:shadow-xl hover:border-white/20 transition backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-300 text-sm">{desc}</p>
    </div>
  )
}
