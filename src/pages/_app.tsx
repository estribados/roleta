import { WinProvider } from 'hooks/useWin';
import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/global';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WinProvider>
      <GlobalStyle/>
      <Component {...pageProps} />
    </WinProvider>
  )
}

export default MyApp
