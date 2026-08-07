import { Leaf, Globe, TrendingUp, ShieldCheck } from 'lucide-react'

export default function Impact() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          Sustainability & Impact Tracker
        </h2>
        <p className="text-xs text-slate-500">
          Quantifiable ESG metrics & waste reduction across your supply chain nodes.
        </p>
      </div>

      {/* Animated Hero Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-6 text-center space-y-2 shadow-subtle">
          <Leaf className="w-8 h-8 text-emerald-600 mx-auto" />
          <div className="text-4xl font-black text-emerald-700 dark:text-emerald-400">
            14.2 Tonnes
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Food Waste Prevented
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-white dark:from-teal-950/40 dark:to-slate-900 border border-teal-200 dark:border-teal-800/60 rounded-2xl p-6 text-center space-y-2 shadow-subtle">
          <Globe className="w-8 h-8 text-teal-600 mx-auto" />
          <div className="text-4xl font-black text-teal-700 dark:text-teal-400">32.8 Tonnes</div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            CO₂ Emissions Avoided
          </div>
        </div>

        <div className="bg-gradient-to-br from-sky-50 to-white dark:from-sky-950/40 dark:to-slate-900 border border-sky-200 dark:border-sky-800/60 rounded-2xl p-6 text-center space-y-2 shadow-subtle">
          <TrendingUp className="w-8 h-8 text-sky-600 mx-auto" />
          <div className="text-4xl font-black text-sky-700 dark:text-sky-400">$24,800</div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Net Revenue Saved
          </div>
        </div>
      </div>

      {/* Narrative ESG Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            🚗 Carbon Offset Equivalent
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Equivalent to removing 7 passenger cars from the road for an entire year.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-600">
            🌲 Tree Planting Equivalent
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Equivalent to planting 1,540 mature trees in North American forests.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-600">
            🥗 Meals Preserved
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Over 28,400 individual fresh produce meals redirected to consumers.
          </p>
        </div>
      </div>
    </div>
  )
}
