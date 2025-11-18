import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-slate-900/70 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
          <span className="font-semibold text-white text-lg">siapremote</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="text-slate-300 hover:text-white transition">Jobs</Link>
          <a href="/test" className="text-slate-300 hover:text-white transition">System Check</a>
          <a href="https://github.com" target="_blank" className="text-slate-300 hover:text-white transition" rel="noreferrer">About</a>
        </nav>
      </div>
    </header>
  )
}
