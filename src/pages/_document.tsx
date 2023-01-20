import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import HeadConfiguration from '@components/molecules/HeadConfiguration';

import bodyDefaultClasses from '@data/bodyDefaultClasses';

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
          <HeadConfiguration />
        </Head>
        <script>
          {`
          function getInitialThemeScheme() {
            const persistedColorPreference = window.localStorage.getItem("color-mode");
            const hasPersistedPreference = typeof persistedColorPreference === "string";

            if (hasPersistedPreference) {
              return persistedColorPreference;
            }

          const mediaQueryPreference = window.matchMedia(
              "(prefers-color-scheme: dark)"
            );
            const hasMediaQueryPreference =
              typeof mediaQueryPreference.matches === "boolean";

            if (hasMediaQueryPreference) {
              return mediaQueryPreference.matches ? "dark" : "light";
            }

            return "light";
          }

          document.documentElement.style.setProperty(
            "--theme-color",
            getInitialThemeScheme() === "light" ? "#fbfbfb" : "#161b3f"
          );

          document.documentElement.style.setProperty(
            "--theme-color-light",
            getInitialThemeScheme() === "light" ? "#fbfbfb" : "#21285a"
          );
        `}
        </script>
        <body className={`initial ${bodyDefaultClasses}`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
