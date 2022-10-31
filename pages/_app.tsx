import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Layout } from '@/components/skeleton/layout';
import { AppProps } from 'next/app';
import { useState } from 'react'
import '@/styles/globals.css';

function Bookabulary({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (

    <SessionContextProvider
      supabaseClient={supabaseClient}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  )
}

export default Bookabulary;
