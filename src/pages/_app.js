import { SessionProvider } from "next-auth/react";
import '../styles/Global.scss';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}