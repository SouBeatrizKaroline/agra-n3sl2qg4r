import { Link } from 'react-router-dom'
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Store,
  Leaf,
  Zap,
  BarChart3,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-sky-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20">
            A
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white">
            Agra{' '}
            <span className="text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">
              AI
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#impact" className="hover:text-white transition-colors">
            Impact
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[90vh]">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Predictive Logistics
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Predict. Prevent. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              Profit.
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            Agra anticipates fresh produce waste before it happens — and tells you exactly what to
            do now. We don't track waste — we prevent it.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-base px-8 h-12 shadow-xl shadow-emerald-500/25"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 h-12"
              >
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 animate-float">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Live AI Batch Alert
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold">
                87% Spoilage Risk
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">250 Crates Strawberries</h3>
              <p className="text-xs text-slate-400">Fresno, CA • Loss window in 2 days</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 text-xs text-slate-300 space-y-2">
              <p>
                ⚡ <strong>AI Recommendation:</strong> Redirect inventory to Sonoma Grocery Co-op
                immediately.
              </p>
              <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold pt-1 border-t border-slate-800">
                <span>Revenue Protected: $8,400</span>
                <span>Match Fit: 94%</span>
              </div>
            </div>
            <Button
              size="sm"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold"
            >
              Redirect Inventory Now
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 px-6 lg:px-12 bg-slate-900/50 border-y border-slate-800"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-white">How Agra Prevents Produce Waste</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              An action-first decision engine operating in real-time across US & Canada supply
              chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Input Your Batch',
                desc: 'Specify produce type, harvest date, location, and crate quantity in seconds.',
                icon: PlusCircleIcon,
              },
              {
                step: '02',
                title: 'AI Analyzes Risk',
                desc: 'Predictive models evaluate shelf life, regional temperature corridors, and demand likelihood.',
                icon: Sparkles,
              },
              {
                step: '03',
                title: 'Act Within Seconds',
                desc: 'Execute one-click actions: Sell Now, Redirect to nearby buyers, or Apply fast discounts.',
                icon: ShieldCheck,
              },
            ].map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.step}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative"
                >
                  <span className="text-4xl font-black text-slate-800 absolute top-4 right-4">
                    {card.step}
                  </span>
                  <Icon className="w-8 h-8 text-emerald-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-400">{card.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact Counter */}
      <section id="impact" className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-emerald-950/40 via-slate-900 to-sky-950/30 border border-emerald-500/20 rounded-3xl p-8 lg:p-12 text-center space-y-8">
          <h2 className="text-3xl font-extrabold text-white">
            Measurable Environmental & Economic Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-1">
              <div className="text-4xl lg:text-5xl font-black text-emerald-400">14,250+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Tonnes Waste Prevented
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl lg:text-5xl font-black text-teal-300">32,800</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Kg CO₂ Reduced
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl lg:text-5xl font-black text-sky-400">$4.2M+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Revenue Protected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Start Preventing Agricultural Waste Today
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Join forward-thinking growers, distributors, and retailers across North America.
        </p>
        <Link to="/signup">
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 h-12 shadow-xl shadow-emerald-500/20"
          >
            Get Started Now
          </Button>
        </Link>
      </section>
    </div>
  )
}

function PlusCircleIcon(props: any) {
  return <Zap {...props} />
}
