import { Layout } from '@/components/skeleton/layout';
import { AppProps } from 'next/app';
import '@/styles/globals.css';

function Bookabulary({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default Bookabulary;
