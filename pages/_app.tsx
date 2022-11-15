
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from '@tanstack/react-query';
import { PageProps, ExtendedAppProps } from '@/types/next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Layout } from '@/components/skeleton/layout';
import { useState } from 'react'
import '@/styles/globals.css';

const Bookabulary = ({ Component, pageProps }: ExtendedAppProps<PageProps>) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionContextProvider
          supabaseClient={supabaseClient}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionContextProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Bookabulary;
