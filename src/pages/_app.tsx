import { ConfirmProvider } from 'hooks/useConfirm';
import { ToastProvider } from 'hooks/useToast';
import { WinProvider } from 'hooks/useWin';

import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/global';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <WinProvider>
          <GlobalStyle/>
          <Component {...pageProps} />
        </WinProvider>
      </ConfirmProvider>
    </ToastProvider>

  )
}

export default MyApp
