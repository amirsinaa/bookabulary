import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from '@vercel/analytics/react';

class MyDocument extends NextDocument {
  static async getInitialProps(ctx) {
    return await NextDocument.getInitialProps(ctx)
  }
  render() {
    return (
      <Html data-theme="garden" className="bg-white">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <Analytics />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
