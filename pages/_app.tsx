import { Layout } from '@/components/skeleton/layout';
import { useSession } from '@/hooks/use-session';
import { AppProps } from 'next/app';
import '@/styles/globals.css';

function Bookabulary({ Component, pageProps }: AppProps) {
  const session = useSession();

  return (
    <Layout session={session}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default Bookabulary;
