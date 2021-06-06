import '@styles/global.scss';
import { AppProps } from 'next/app';

function MyApp({ Component }: AppProps): JSX.Element {
  return <Component />;
}

export default MyApp;
