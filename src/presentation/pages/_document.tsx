import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import HeadComponent from 'src/presentation/components/Head';

import bodyDefaultClasses from '@constants/bodyDefaultClasses';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html lang="en" translate="no">
        <Head>
          <HeadComponent />
        </Head>

        <body className={`initial ${bodyDefaultClasses}`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
