import type { AppProps } from 'next/app';
import { createContext, useState } from 'react';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '../components';
import { store } from '../redux/store';
import '../styles/globals.css';
import { getLoggedUserId } from '../utils/getLoggedUserId';
// Default way to get a logged user
export const loggedUserId = getLoggedUserId();

export const AppContext = createContext(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [conversationId, setConversationId] = useState(null);

  const context = {
    conversationId,
    loggedUserId,
    setConversationId,
  };

  return (
    <ErrorBoundary>
      <AppContext.Provider value={context}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </AppContext.Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
