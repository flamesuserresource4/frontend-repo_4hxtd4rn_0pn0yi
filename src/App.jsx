import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import JobCard from './components/JobCard'
import JobForm from './components/JobForm'
import ApplyModal from './components/ApplyModal'

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPost, setShowPost] = useState(false)
  const [applyJob, setApplyJob] = useState(null)
  const [query, setQuery] = useState({ q: '', location: '', tag: '' })

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (query.q) params.append('q', query.q)
      if (query.location) params.append('location', query.location)
      if (query.tag) params.append('tag', query.tag)
      const res = await fetch(`${baseUrl}/jobs?${params.toString()}`)
      const data = await res.json()
      setJobs(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight">Find your next role</h1>
          <p className="text-slate-300 mt-2">Search live openings and apply in seconds</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <input value={query.q} onChange={(e) => setQuery({ ...query, q: e.target.value })} placeholder="Search by title, company, keywords" className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white" />
          <input value={query.location} onChange={(e) => setQuery({ ...query, location: e.target.value })} placeholder="Location" className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white" />
          <input value={query.tag} onChange={(e) => setQuery({ ...query, tag: e.target.value })} placeholder="Tag/Skill" className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white" />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="text-slate-300 text-sm">{jobs.length} jobs</div>
          <button onClick={() => setShowPost(true)} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium">Post a job</button>
        </div>

        {loading ? (
          <div className="text-slate-300">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-slate-400">No jobs found. Try adjusting your filters or post the first job.</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} onApply={(j) => setApplyJob(j)} />
            ))}
          </div>
        )}
      </main>

      {showPost && (
        <JobForm onClose={() => { setShowPost(false); fetchJobs() }} onCreated={() => fetchJobs()} />
      )}

      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </div>
  )
}

export default App
