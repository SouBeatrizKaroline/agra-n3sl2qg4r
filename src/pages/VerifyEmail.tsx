import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { Button } from '@/components/ui/button'

export default function VerifyEmail() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      return
    }
    pb.collection('users')
      .confirmVerification(token)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
        <h2 className="text-2xl font-black text-white">Email Verification</h2>
        {status === 'loading' && (
          <p className="text-xs text-slate-400">Verifying your email token...</p>
        )}
        {status === 'success' && (
          <div className="space-y-4">
            <p className="text-sm text-emerald-400 font-semibold">
              Your email has been successfully verified!
            </p>
            <Link to="/dashboard">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        )}
        {status === 'error' && (
          <p className="text-sm text-rose-400">Verification link is invalid or has expired.</p>
        )}
      </div>
    </div>
  )
}
