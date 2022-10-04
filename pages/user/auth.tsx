import { SigninForm } from '@/components/user/auth-form';
import { useSession } from '@/hooks/use-session';
import { useEffect } from 'react';
import Router from 'next/router';

export default function SigninPage() {
  const session = useSession()

  useEffect(() => {
    if (session) {
      Router.push('/')
    }
  })

  if (session) return null

  return <SigninForm />
}
