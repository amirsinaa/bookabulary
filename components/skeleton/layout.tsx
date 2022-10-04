import { AuthSession } from '@supabase/supabase-js'
import Head from 'next/head'
import { PropsWithChildren } from 'react'
import Header from './header'
import Footer from './footer'

export interface Props {
  session: AuthSession | null
}

export function Layout({ session, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Head>
        <title>Bookabulary</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header session={session} />
        <main className="max-w-screen-xl p-2 m-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}
