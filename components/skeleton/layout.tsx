import { useColorMode } from '@/context/color-mode.context';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/common/button';
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import Header from './header';
import Footer from './footer';
import Head from 'next/head';

export function Layout({ children }: PropsWithChildren) {
  const { colorMode, setColorMode } = useColorMode();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Bookabulary</title>
      </Head>
      <div className={colorMode === 'dark' ? colorMode : 'light'}>
        <div className="bg-white dark:bg-gray-600">
          <Header />
          <main className={`m-auto h-full min-h-screen relative ${router.pathname === "/" ? '' : 'p-2 max-w-screen-xl'}`}>
            {children}
            <Button onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')} classOverrides='ease-in-out duration-150 hover:drop-shadow-xl fixed bottom-10 left-10 rounded-full border-lime-100 bg-lime-200 drop-shadow-xl p-4 dark:text-black'>{colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}</Button>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
