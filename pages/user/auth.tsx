import { useSessionContext } from '@supabase/auth-helpers-react'
import { SigninForm } from '@/components/user/views/auth-form';
import type { NextPage } from "next";
import { useEffect } from 'react';
import Router from 'next/router';

const AuthPage: NextPage = () => {
  const { session } = useSessionContext();

  useEffect(() => {
    if (session) {
      Router.push('/user/profile')
    }
  });

  return (
    !session && <SigninForm />
  );
}

export default AuthPage;