import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import HeadConfiguration from '@components/molecules/HeadConfiguration';

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
          <HeadConfiguration />
        </Head>
        <body className="initial">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
