import { useState } from 'react'

export default function JobForm({ onClose, onCreated }) {
  const [form, setForm] = useState({
    title: '',
    company_name: '',
    location: '',
    employment_type: 'full-time',
    salary_min: '',
    salary_max: '',
    description: '',
    tags: ''
  })
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
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
        requirements: [],
        tags: form.tags
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        is_active: true,
      }
      const res = await fetch(`${baseUrl}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create job')
      const data = await res.json()
      onCreated?.(data.id)
      onClose?.()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Post a Job</h3>
          <button onClick={onClose} className="text-slate-300 hover:text-white">Close</button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" value={form.title} onChange={handleChange} required placeholder="Job title" className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white" />
          <input name="company_name" value={form.company_name} onChange={handleChange} required placeholder="Company" className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white" />
          <input name="location" value={form.location} onChange={handleChange} required placeholder="Location" className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white" />
          <select name="employment_type" value={form.employment_type} onChange={handleChange} className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white">
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
          <input name="salary_min" value={form.salary_min} onChange={handleChange} placeholder="Salary min (optional)" className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white" />
          <input name="salary_max" value={form.salary_max} onChange={handleChange} placeholder="Salary max (optional)" className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white" />
          <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="md:col-span-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white" />
          <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Description" rows={5} className="md:col-span-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white" />
          <div className="md:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-slate-700 text-slate-300">Cancel</button>
            <button disabled={loading} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white">
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
