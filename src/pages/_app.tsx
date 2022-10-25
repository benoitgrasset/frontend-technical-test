import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '../components';
import { store } from '../redux/store';
import '../styles/globals.css';
import { getLoggedUserId } from '../utils/getLoggedUserId';

// Default way to get a logged user
export const loggedUserId = getLoggedUserId();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
