import { useState } from 'react'

export default function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', resume_url: '', cover_letter: '' })
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        job_id: job._id,
        job_title: job.title,
        company_name: job.company_name,
      }
      const res = await fetch(`${baseUrl}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to submit application')
      alert('Application submitted!')
      onClose?.()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Apply for {job.title}</h3>
          <button onClick={onClose} className="text-slate-300 hover:text-white">Close</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white" />
          <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white" />
          <input name="resume_url" value={form.resume_url} onChange={handleChange} placeholder="Resume URL (optional)" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white" />
          <textarea name="cover_letter" value={form.cover_letter} onChange={handleChange} placeholder="Cover letter (optional)" rows={5} className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white" />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-slate-700 text-slate-300">Cancel</button>
            <button disabled={loading} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white">
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
