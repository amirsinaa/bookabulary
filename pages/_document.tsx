import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends NextDocument {
  static async getInitialProps(ctx) {
    return await NextDocument.getInitialProps(ctx)
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
