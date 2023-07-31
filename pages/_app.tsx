
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from '@tanstack/react-query';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ColorModeProvider } from '@/context/color-mode.context'
import { PageProps, ExtendedAppProps } from '@/types/next';
import { Layout } from '@/components/skeleton/layout';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import '@/styles/globals.css';

const Bookabulary = ({ Component, pageProps }: ExtendedAppProps<PageProps>) => {
  const [supabaseClient] = useState(() => createPagesBrowserClient())
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionContextProvider
          supabaseClient={supabaseClient}
        >
          <ColorModeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ColorModeProvider>
        </SessionContextProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Bookabulary;
