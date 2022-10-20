import type { AppProps } from 'next/app';
import { ErrorBoundary } from '../components';
import { wrapper } from '../redux/store';
import '../styles/globals.css';
import { getLoggedUserId } from '../utils/getLoggedUserId';

// Default way to get a logged user
export const loggedUserId = getLoggedUserId();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />;
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(MyApp);
