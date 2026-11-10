import '@styles/global.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import { PwaContextProvider } from 'src/contexts/PwaContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <PwaContextProvider>
        <Component {...pageProps} />
      </PwaContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
