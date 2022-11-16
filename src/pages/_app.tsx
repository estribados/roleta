import { SessionProvider } from 'next-auth/react';

import { AuthProvider } from 'hooks/useAuth';
import { ConfirmProvider } from 'hooks/useConfirm';
import { ToastProvider } from 'hooks/useToast';
import { WinProvider } from 'hooks/useWin';

import GlobalStyle from '../styles/global';

import '../styles/globals.css';

function MyApp({ Component,
   pageProps:{ session ,...pageProps} }: any) {
  return (
    <SessionProvider session={session}>
        <ToastProvider>
      <AuthProvider>
          <ConfirmProvider>
            <WinProvider>
              <GlobalStyle/>
              <Component {...pageProps} />
            </WinProvider>
          </ConfirmProvider>
      </AuthProvider>
        </ToastProvider>
    </SessionProvider>


  )
}

export default MyApp
