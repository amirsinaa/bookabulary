import { supabase } from '@/api/supabase-client';
import { useState } from 'react';

export function SigninForm() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      setEmailSent(true)
    } catch (error: any) {
      console.error(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {emailSent ? (
        <div className="prose">
          <p>An e-mail has been sent to your e-mail address.</p>
          <p>Please click the link in this mail to sign in.</p>
          <p>
            <button className="btn-link" onClick={() => setEmailSent(false)}>
              Retry
            </button>
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin(email)
          }}
          className="flex flex-col items-center space-y-4"
        >
          <p>
            To sign in or create an account, please enter your email address.
            You will receive a magic link in your mailbox.
          </p>
          <div className="w-full form-group">
            <label className="label" htmlFor="email">
              E-mail address
            </label>

            <input
              id="email"
              className="field "
              type="email"
              placeholder="Your email"
              value={email}
              required
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <button type="submit" className="w-full btn" disabled={loading}>
              <span>{loading ? 'Processing…' : 'Send magic link'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
