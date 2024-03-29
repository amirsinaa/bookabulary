import { useSessionContext } from "@supabase/auth-helpers-react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Tag } from '@/components/common/tag';
import { useState } from 'react';

export function SigninForm() {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { supabaseClient } = useSessionContext();
  const [email, setEmail] = useState<string>('');

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      const { error } = await supabaseClient.auth.signInWithOtp({ email: email })
      if (error) throw error
      setEmailSent(true)
    } catch (error: any) {
      console.error(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {emailSent ? (
          <div className="text-center lg:text-left">
            <h1 className="py-2 text-5xl font-bold">Almost done !</h1>
            <p>An e-mail has been sent to <Tag>{email}</Tag> address.</p>
            <p>Please click the link in this mail to sign in.</p>
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

              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                required
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Button type="submit" className="w-full btn" disabled={loading}>
                <span>{loading ? 'Processing…' : 'Send my magic link'}</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
