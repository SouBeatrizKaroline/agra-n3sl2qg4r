import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function Settings() {
  const { user, requestEmailChange, signOut } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [newEmail, setNewEmail] = useState('')
  const [submittingEmail, setSubmittingEmail] = useState(false)

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittingEmail(true)
    const { error } = await requestEmailChange(newEmail)
    setSubmittingEmail(false)
    if (error) toast.error('Failed to request email change.')
    else toast.success('Confirmation link sent to your new email address!')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          Account & Settings
        </h2>
        <p className="text-xs text-slate-500">
          Manage user profile, security options, and platform preferences.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-subtle space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b pb-2">
          Profile Information
        </h3>
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-slate-500">Full Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-sm mt-1"
            />
          </div>
          <div>
            <Label className="text-xs text-slate-500">Current Email</Label>
            <Input
              value={user?.email || ''}
              disabled
              className="text-sm bg-slate-100 dark:bg-slate-800 mt-1"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-subtle space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b pb-2">
          Request Email Change
        </h3>
        <form onSubmit={handleEmailChange} className="space-y-3">
          <div>
            <Label className="text-xs text-slate-500">New Email Address</Label>
            <Input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="text-sm mt-1"
            />
          </div>
          <Button
            type="submit"
            disabled={submittingEmail}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
          >
            {submittingEmail ? 'Sending...' : 'Send Confirmation Email'}
          </Button>
        </form>
      </div>

      <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-xl p-6 space-y-3">
        <h3 className="text-base font-bold text-rose-800 dark:text-rose-400">Sign Out</h3>
        <p className="text-xs text-rose-600 dark:text-rose-300">
          End active session on this device.
        </p>
        <Button variant="destructive" size="sm" onClick={signOut}>
          Sign Out Now
        </Button>
      </div>
    </div>
  )
}
