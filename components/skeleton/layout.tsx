import { useColorMode } from '@/context/color-mode.context'
import { PropsWithChildren } from 'react';
import Header from './header'
import Footer from './footer'
import Head from 'next/head'

export function Layout({ children }: PropsWithChildren) {
  const { colorMode } = useColorMode();
  return (
    <>
      <Head>
        <title>Bookabulary</title>
      </Head>
      <div className={colorMode === 'dark' ? colorMode : 'light'}>
        <div className="bg-white dark:bg-gray-600">
          <Header />
          <main className="max-w-screen-xl p-2 m-auto h-full min-h-screen">{children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
