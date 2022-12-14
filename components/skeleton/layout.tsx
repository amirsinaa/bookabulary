import { PropsWithChildren } from 'react'
import Header from './header'
import Footer from './footer'
import Head from 'next/head'

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>Bookabulary</title>
      </Head>
      <Header />
      <main className="max-w-screen-xl p-2 m-auto">{children}</main>
      <Footer />
    </>
  )
}
