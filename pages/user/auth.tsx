import { useSessionContext } from '@supabase/auth-helpers-react'
import { SigninForm } from '@/components/user/auth-form';
import { useEffect } from 'react';
import Router from 'next/router';

export default function Auth() {
  const { session } = useSessionContext()

  useEffect(() => {
    if (session) {
      Router.push('/user/profile')
    }
  })

  return (
    !session && <SigninForm />
  )
}
