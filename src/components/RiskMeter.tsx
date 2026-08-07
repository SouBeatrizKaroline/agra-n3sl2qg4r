import { cn } from '@/lib/utils'

interface RiskMeterProps {
  score: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function RiskMeter({ score, size = 120, strokeWidth = 10, className }: RiskMeterProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  let colorClass = 'text-emerald-600'
  if (score >= 70) colorClass = 'text-rose-600'
  else if (score >= 35) colorClass = 'text-amber-500'

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="text-slate-200 dark:text-slate-800"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={cn('transition-all duration-1000 ease-out', colorClass)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-black text-slate-900 dark:text-slate-100">{score}%</span>
        <span className="text-[10px] font-medium uppercase text-slate-500">Risk Score</span>
      </div>
    </div>
  )
}
