import { cn } from '@/lib/utils'

interface RiskBadgeProps {
  score: number
  className?: string
}

export function RiskBadge({ score, className }: RiskBadgeProps) {
  let label = 'Low Risk'
  let styles =
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200'

  if (score >= 70) {
    label = 'High Risk'
    styles = 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200'
  } else if (score >= 35) {
    label = 'Medium Risk'
    styles = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        styles,
        className,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label} ({score}%)
    </span>
  )
}
