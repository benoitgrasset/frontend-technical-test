import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '../components';
import { store } from '../redux/store';
import '../styles/globals.css';
import { getLoggedUserId } from '../utils/getLoggedUserId';
// Default way to get a logged user
export const loggedUserId = getLoggedUserId();

export const AppContext = createContext(null);

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
