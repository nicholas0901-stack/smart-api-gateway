export default function StatusBadge({ method }) {
  const colors = {
    GET: 'bg-blue-500/20 text-blue-400',
    POST: 'bg-green-500/20 text-green-400',
    PUT: 'bg-amber-500/20 text-amber-400',
    DELETE: 'bg-red-500/20 text-red-400',
  }

  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${colors[method] || 'bg-gray-700 text-gray-300'}`}>
      {method}
    </span>
  )
}