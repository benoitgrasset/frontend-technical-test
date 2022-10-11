import type { AppProps } from "next/app";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import "../styles/globals.css";
import { wrapper } from "../redux/store";

// Default way to get a logged user
export const loggedUserId = getLoggedUserId();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
