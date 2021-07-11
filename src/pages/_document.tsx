import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <title>UmbraDex</title>
          <meta
            name="description"
            content="Find everything about the creatures you love!"
          />
          <meta name="robots" content="index, follow" />
          <meta charSet="UTF-8" />
          <meta name="author" content="Luan Sergio Damando" />
          <meta name="theme-color" content="#21285A" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
