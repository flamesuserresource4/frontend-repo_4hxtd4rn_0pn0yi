export default function JobCard({ job, onApply }) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-800/40 p-5 hover:border-blue-500/40 transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold text-lg leading-tight">
            {job.title}
          </h3>
          <p className="text-slate-300 text-sm mt-1">
            {job.company_name} • {job.location}
          </p>
        </div>
        <span className="px-2 py-1 rounded bg-blue-500/15 text-blue-300 text-xs border border-blue-500/30">
          {job.employment_type}
        </span>
      </div>

      {job.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {job.tags.map((t) => (
            <span key={t} className="px-2 py-1 text-xs rounded border border-slate-700 text-slate-300">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => onApply(job)}
          className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium"
        >
          Apply
        </button>
        <a
          href={`#/jobs/${job._id}`}
          className="text-slate-300 hover:text-white text-sm"
        >
          View details
        </a>
      </div>
    </div>
  )
}
