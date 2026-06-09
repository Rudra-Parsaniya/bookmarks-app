type StatCardProps = {
  label: string
  value: number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 transition-colors hover:border-zinc-700">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
        {value}
      </p>
    </div>
  )
}
